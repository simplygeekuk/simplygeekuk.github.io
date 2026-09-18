import { createHash } from "node:crypto";
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { load } from "cheerio";
import sharp from "sharp";

// Optimize the static output, including WordPress HTML and responsive srcsets.
// Keep source files and original public URLs intact for full-size downloads.
// Development serves the originals; `astro preview` serves optimized builds.
export default function optimizeImages() {
  return {
    name: "simplygeek-lossless-images",
    hooks: {
      "astro:build:done": async ({ dir, logger }) => {
        const output = fileURLToPath(dir);
        const files = await readdir(output, { recursive: true });
        const replacements = new Map();
        const report = { before: 0, after: 0, images: [], rewrittenPages: 0 };

        for (const file of files.filter((file) => /\.png$/i.test(file))) {
          const original = await readFile(path.join(output, file));
          const metadata = await sharp(original).metadata();
          report.before += original.length;
          report.after += original.length;
          // Animation, orientation, and high bit depth need separate handling.
          if (
            (metadata.pages ?? 1) > 1 ||
            (metadata.orientation ?? 1) !== 1 ||
            metadata.depth !== "uchar"
          )
            continue;
          const webp = await sharp(original)
            .webp({ lossless: true, effort: 6 })
            .toBuffer();
          if (webp.length >= original.length) continue;

          const [before, after] = await Promise.all([
            sharp(original)
              .ensureAlpha()
              .raw()
              .toBuffer({ resolveWithObject: true }),
            sharp(webp)
              .ensureAlpha()
              .raw()
              .toBuffer({ resolveWithObject: true }),
          ]);
          if (
            before.info.width !== after.info.width ||
            before.info.height !== after.info.height ||
            before.info.channels !== after.info.channels ||
            !before.data.equals(after.data)
          ) {
            logger.info(`Retaining original pixels: ${file}`);
            continue;
          }

          const hash = createHash("sha256")
            .update(webp)
            .digest("hex")
            .slice(0, 24);
          const optimizedPath = `_optimized-images/${hash}.webp`;
          await mkdir(path.join(output, "_optimized-images"), {
            recursive: true,
          });
          await writeFile(path.join(output, optimizedPath), webp);
          const originalPath = "/" + file.split(path.sep).join("/");
          replacements.set(originalPath, "/" + optimizedPath);
          report.after -= original.length - webp.length;
          report.images.push({
            original: originalPath,
            optimized: "/" + optimizedPath,
            before: original.length,
            after: webp.length,
          });
        }

        for (const file of files.filter((file) => /\.html$/i.test(file))) {
          const htmlPath = path.join(output, file);
          const html = await readFile(htmlPath, "utf8");
          const $ = load(html);
          let changed = false;
          // Root-relative asset URLs are emitted by this site's templates/importer.
          const replace = (value) => {
            if (!value?.startsWith("/") || value.startsWith("//")) return value;
            const match = value.match(/^([^?#]+)(.*)$/);
            let pathname;
            try {
              pathname = decodeURIComponent(match[1]);
            } catch {
              return value;
            }
            const optimized = replacements.get(pathname);
            if (!optimized) return value;
            changed = true;
            return optimized + match[2];
          };
          $("img[src]").each((_, element) => {
            $(element).attr("src", replace($(element).attr("src")));
          });
          $("img[srcset], source[srcset]").each((_, element) => {
            const value = $(element).attr("srcset");
            // Do not parse data URLs, whose commas are part of the image itself.
            if (/data:/i.test(value)) return;
            const converted = value
              .split(",")
              .map((candidate) => {
                const [url, ...descriptor] = candidate.trim().split(/\s+/);
                return [replace(url), ...descriptor].join(" ");
              })
              .join(", ");
            const allConverted = converted
              .split(",")
              .every((candidate) =>
                candidate.trim().startsWith("/_optimized-images/"),
              );
            // Mixed formats cannot share a picture source's single type hint.
            if (element.tagName === "source" && !allConverted) return;
            $(element).attr("srcset", converted);
            // A picture source must advertise the format it now supplies.
            if (element.tagName === "source" && allConverted) {
              $(element).attr("type", "image/webp");
            }
          });
          if (changed) {
            await writeFile(htmlPath, $.html());
            report.rewrittenPages++;
          }
        }

        const reportDir = new URL("../.astro/", import.meta.url);
        await mkdir(reportDir, { recursive: true });
        await writeFile(
          new URL("image-optimization.json", reportDir),
          JSON.stringify(report, null, 2) + "\n",
        );
        const saved = report.before - report.after;
        const percent = report.before
          ? ((saved / report.before) * 100).toFixed(1)
          : "0.0";
        logger.info(
          `${report.images.length} lossless WebP images; PNG delivery size ${(report.before / 1e6).toFixed(2)} MB -> ${(report.after / 1e6).toFixed(2)} MB (${percent}% smaller). Originals retained.`,
        );
      },
    },
  };
}
