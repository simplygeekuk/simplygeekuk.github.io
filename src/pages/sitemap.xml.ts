import type { APIContext } from "astro";
import { articles, POSTS_PER_PAGE } from "../lib/content";
import { allArchives } from "../lib/archives";

export async function GET({ site }: APIContext) {
  const entries = await articles();
  const archives = allArchives(entries);
  const totalPages = Math.ceil(entries.filter(({ data }) => data.kind === "post").length / POSTS_PER_PAGE);
  const paths = [
    "/",
    "/archive/",
    "/sitemap/",
    ...Array.from({ length: Math.max(0, totalPages - 1) }, (_, index) => `/page/${index + 2}/`),
    ...entries.map((entry) => entry.data.path),
    ...archives
      .filter((archive) => archive.postIds.length > 0)
      .map((archive) => archive.path),
  ];
  const escape = (value: string) =>
    value
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll('"', "&quot;");
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${[...new Set(paths)].map((path) => `<url><loc>${escape(new URL(path, site).href)}</loc></url>`).join("")}</urlset>`,
    { headers: { "Content-Type": "application/xml; charset=utf-8" } },
  );
}
