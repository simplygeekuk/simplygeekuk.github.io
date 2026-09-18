import { mkdir, readFile, writeFile, access } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { load } from "cheerio";

// Explicitly run this importer; builds never depend on the WordPress server.
const root = fileURLToPath(new URL("../", import.meta.url));
const source = "https://simplygeek.co.uk";
const hosts = new Set(["simplygeek.co.uk", "www.simplygeek.co.uk"]);
const args = process.argv.slice(2);
if (args.some((arg) => !["--all", "--overwrite"].includes(arg))) {
  throw new Error("Usage: npm run import:wordpress -- [--all] [--overwrite]");
}
const all = args.includes("--all");
const overwrite = args.includes("--overwrite");
const report = {
  source,
  importedAt: new Date().toISOString(),
  mode: all ? "all-public" : "sample",
  totals: {},
  imported: [],
  remaining: [],
  media: [],
  unavailableImages: [],
  externalImages: [],
  unresolvedLinks: [],
  review: [],
};
const apiReportedTotals = {};
const exists = async (file) =>
  access(file).then(
    () => true,
    () => false,
  );
const plain = (html) =>
  load(html ?? "")
    .text()
    .replace(/\s+/g, " ")
    .trim();
const localPath = (url) => new URL(url, source).pathname;
const contentDir = path.join(root, "src/content/articles");
const cacheDir = path.join(root, ".migration-cache");
await mkdir(contentDir, { recursive: true });
await mkdir(cacheDir, { recursive: true });

async function request(url) {
  const response = await fetch(url, { signal: AbortSignal.timeout(30000) });
  if (!response.ok) throw new Error(`${response.status} fetching ${url}`);
  return response;
}

async function collection(type) {
  const items = [];
  let totalPages = 1;
  for (let page = 1; page <= totalPages; page++) {
    const url = new URL(`/wp-json/wp/v2/${type}`, source);
    url.search = new URLSearchParams({
      per_page: "100",
      page: String(page),
      ...(type === "posts" || type === "pages"
        ? { status: "publish", orderby: "date", order: "desc", _embed: "1" }
        : {}),
      ...(type === "comments"
        ? {
            status: "approve",
            _fields: "id,post,parent,author_name,date_gmt,content,link,type",
          }
        : {}),
    });
    const response = await request(url);
    if (page === 1)
      apiReportedTotals[type] = Number(response.headers.get("x-wp-total") ?? 0);
    totalPages = Number(response.headers.get("x-wp-totalpages") ?? 1);
    items.push(...(await response.json()));
  }
  return items;
}

const [posts, pages, categories, tags, series, comments] = await Promise.all(
  ["posts", "pages", "categories", "tags", "series", "comments"].map(
    collection,
  ),
);
await writeFile(
  path.join(cacheDir, "wordpress-public.json"),
  JSON.stringify({ posts, pages, categories, tags, series, comments }, null, 2),
);
const selected = all
  ? [...posts, ...pages]
  : [...posts.slice(0, 3), ...pages.filter((page) => page.slug === "about")];
const selectedIds = new Set(selected.map((item) => item.id));
const inventory = [...posts, ...pages].map((item) => ({
  id: item.id,
  type: item.type,
  title: plain(item.title.rendered),
  url: item.link,
  path: localPath(item.link),
}));
report.totals = {
  posts: posts.length,
  pages: pages.length,
  comments: comments.length,
};
report.apiReportedTotals = apiReportedTotals;
report.remaining = inventory.filter((item) => !selectedIds.has(item.id));
const knownPaths = new Set(selected.map((item) => localPath(item.link)));
const archives = [];
for (const [kind, terms] of [
  ["category", categories],
  ["tag", tags],
  ["series", series],
]) {
  for (const term of terms) {
    const ids = new Set([term.id]);
    if (kind === "category") {
      let previous;
      do {
        previous = ids.size;
        for (const child of terms) if (ids.has(child.parent)) ids.add(child.id);
      } while (ids.size !== previous);
    }
    const field =
      kind === "category" ? "categories" : kind === "tag" ? "tags" : "series";
    archives.push({
      id: term.id,
      kind,
      title: plain(term.name),
      description: plain(term.description),
      path: localPath(term.link),
      postIds: posts
        .filter(
          (post) =>
            selectedIds.has(post.id) &&
            (post[field] ?? []).some((id) => ids.has(id)),
        )
        .map((post) => post.id),
    });
    knownPaths.add(localPath(term.link));
  }
}
knownPaths.add("/archive/");
knownPaths.add("/feed/");
const byId = new Map(
  selected.map((item) => [String(item.id), localPath(item.link)]),
);
const termNames = (ids, terms) =>
  (ids ?? [])
    .map((id) => terms.find((term) => term.id === id)?.name)
    .filter(Boolean)
    .map(plain);

// Check the entire selection before writing any content. Re-imports require an explicit opt-in.
for (const item of selected) {
  const route = localPath(item.link);
  if (
    !/^\/[a-z0-9\-/]+\/$/.test(route) ||
    /^\/(archive|feed|404|sitemap)\//.test(route) ||
    /^\/page\/\d+\//.test(route)
  )
    throw new Error(`Unsupported or reserved route: ${route}`);
  const filename = path.join(contentDir, `${item.id}-${item.slug}.md`);
  if (!overwrite && (await exists(filename)))
    throw new Error(
      `Preserving existing content: ${filename}. Review local edits before using --overwrite.`,
    );
}

const mediaCache = new Map();
const recoveryEntries = JSON.parse(
  await readFile(path.join(root, "migration/media-recovery.json"), "utf8"),
);
const recoveries = new Map(recoveryEntries.map((entry) => [entry.source, entry]));
async function migrateMedia(value) {
  const recovered = recoveries.get(value);
  if (recovered?.status === "recovered") {
    if (!mediaCache.has(value)) {
      const bytes = await readFile(path.join(root, "public", recovered.local));
      report.media.push({ source: value, local: recovered.local, bytes: bytes.length, archiveUrl: recovered.archiveUrl });
      mediaCache.set(value, recovered.local);
    }
    return recovered.local;
  }
  let url;
  try {
    url = new URL(value, source);
  } catch {
    return value;
  }
  if (
    !hosts.has(url.hostname) ||
    !url.pathname.startsWith("/wp-content/uploads/")
  )
    return value;
  if (!["https:", "http:"].includes(url.protocol)) return value;
  url.protocol = "https:";
  url.hostname = "simplygeek.co.uk";
  const key = url.href;
  if (mediaCache.has(key)) return mediaCache.get(key);
  const decoded = decodeURIComponent(url.pathname);
  const publicRoot = path.join(root, "public");
  const destination = path.resolve(publicRoot, `.${decoded}`);
  if (
    !destination.startsWith(publicRoot + path.sep) ||
    decoded.includes("\\") ||
    decoded.includes(":")
  )
    throw new Error(`Unsafe media path: ${decoded}`);
  const local = url.pathname;
  if (!(await exists(destination))) {
    const response = await request(url);
    if (/text\/html/i.test(response.headers.get("content-type") ?? ""))
      throw new Error(`Expected media, received HTML: ${url}`);
    const bytes = Buffer.from(await response.arrayBuffer());
    await mkdir(path.dirname(destination), { recursive: true });
    await writeFile(destination, bytes, { flag: "wx" });
  }
  report.media.push({
    source: key,
    local,
    bytes: (await readFile(destination)).length,
  });
  mediaCache.set(key, local);
  return local;
}

function migrateLink(value, item) {
  let url;
  try {
    url = new URL(value, item.link);
  } catch {
    return value;
  }
  if (!hosts.has(url.hostname)) return value;
  const id = url.searchParams.get("p") ?? url.searchParams.get("page_id");
  if (id && byId.has(id)) return byId.get(id) + url.hash;
  if (url.pathname === "/" && !url.search) return "/" + url.hash;
  const normalized = url.pathname.endsWith("/")
    ? url.pathname
    : url.pathname + "/";
  if (knownPaths.has(normalized)) return normalized + url.search + url.hash;
  report.unresolvedLinks.push({ from: localPath(item.link), to: url.href });
  return url.href;
}

for (const item of selected) {
  console.log(`Importing ${plain(item.title.rendered)}`);
  const $ = load(item.content.rendered, {}, false);
  // Place the imported contents navigation immediately below the article header.
  const contents = $("#ez-toc-container").first();
  if (contents.length) $.root().prepend(contents);
  $(
    "script, style, link, form, noscript, .sharedaddy, .jp-relatedposts",
  ).remove();
  // Reserve H1 for the article title while preserving source heading anchors.
  if ($("h1").length) {
    $("h1, h2, h3, h4, h5").each((_, element) => {
      element.tagName = `h${Number(element.tagName.slice(1)) + 1}`;
    });
  }
  for (const element of $("img").toArray()) {
    const original = $(element).attr("src");
    const recovery = recoveries.get(original);
    if (recovery?.status === "unavailable") {
      const alt = $(element).attr("alt")?.trim();
      const note = $("<span></span>")
        .attr("class", "missing-image")
        .attr("role", "note")
        .text(`Screenshot unavailable${alt ? `: ${alt}` : "."} This image could not be recovered from the original blog.`);
      const parent = $(element).parent("a");
      if (parent.length && recoveries.get(parent.attr("href"))?.status === "unavailable") parent.replaceWith(parent.contents());
      $(element).replaceWith(note);
      report.unavailableImages.push({ from: item.link, source: original, alt: alt ?? "", reason: recovery.reason });
    } else if (original && !hosts.has(new URL(original, source).hostname) && !recovery) {
      report.externalImages.push({ from: item.link, source: original });
    }
  }
  $("p").each((_, element) => {
    if (!$(element).text().trim() && !$(element).children().length)
      $(element).remove();
  });
  // Remove empty editor links, but retain named anchors and linked images.
  $('a[href^="#"]:not([id]):not([name])').each((_, element) => {
    if (!$(element).text().trim() && !$(element).children().length)
      $(element).remove();
  });
  $("*").each((_, element) => {
    for (const attr of Object.keys(element.attribs ?? {})) {
      if (/^on/i.test(attr) || ["style", "srcdoc"].includes(attr))
        $(element).removeAttr(attr);
    }
  });
  for (const element of $("[src], [poster], a[href]").toArray()) {
    for (const attr of ["src", "poster", "href"]) {
      const value = $(element).attr(attr);
      if (!value) continue;
      if (/^\s*(javascript|vbscript):/i.test(value)) {
        $(element).removeAttr(attr);
        continue;
      }
      const media = await migrateMedia(value);
      $(element).attr(
        attr,
        media !== value
          ? media
          : attr === "href"
            ? migrateLink(value, item)
            : value,
      );
    }
  }
  for (const element of $("[srcset]").toArray()) {
    const candidates = $(element).attr("srcset").split(",");
    const converted = [];
    for (const candidate of candidates) {
      const [url, ...descriptor] = candidate.trim().split(/\s+/);
      converted.push([await migrateMedia(url), ...descriptor].join(" "));
    }
    $(element).attr("srcset", converted.join(", "));
  }
  $("img").attr("loading", "lazy").attr("decoding", "async");
  $('a[target="_blank"]').attr("rel", "noopener noreferrer");
  // Native pre/code blocks retain the literal code without requiring the Enlighter plugin.
  $("pre.EnlighterJSRAW").each((_, element) => {
    const block = $(element);
    const code = $("<code></code>").text(block.text());
    block.empty().append(code);
  });
  for (const element of $("iframe, object, embed, audio, video").toArray()) {
    report.review.push({
      from: item.link,
      reason: `Review ${element.tagName} embed`,
      source: $(element).attr("src") ?? "",
    });
  }
  const excerpt = plain(item.excerpt?.rendered).replace(/\s*\[?…\]?$/, "");
  const description =
    (excerpt || plain($("p").first().html()))
      .slice(0, 240)
      .replace(/\s+\S*$/, "") + "…";
  const featured = item._embedded?.["wp:featuredmedia"]?.[0];
  const thumbnailUrl =
    featured?.media_details?.sizes?.thumbnail?.source_url ??
    featured?.source_url;
  const metadata = {
    title: plain(item.title.rendered),
    description:
      description === "…"
        ? `${plain(item.title.rendered)} articles and guides from SimplyGeek.`
        : description,
    path: localPath(item.link),
    kind: item.type === "post" ? "post" : "page",
    published: `${item.date_gmt}Z`,
    updated: `${item.modified_gmt}Z`,
    author: item._embedded?.author?.[0]?.name ?? "SimplyGeek",
    categories: termNames(item.categories, categories),
    tags: termNames(item.tags, tags),
    wordpressId: item.id,
    originalUrl: item.link,
    ...(thumbnailUrl ? { thumbnail: await migrateMedia(thumbnailUrl) } : {}),
    ...(featured?.source_url
      ? { featuredImage: await migrateMedia(featured.source_url) }
      : {}),
  };
  const frontmatter = Object.entries(metadata)
    .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
    .join("\n");
  const filename = `src/content/articles/${item.id}-${item.slug}.md`;
  await writeFile(
    path.join(root, filename),
    `---\n${frontmatter}\n---\n\n${$.html()}\n`,
  );
  report.imported.push({
    ...inventory.find((entry) => entry.id === item.id),
    file: filename,
  });
}

report.unresolvedLinks = [
  ...new Map(
    report.unresolvedLinks.map((link) => [JSON.stringify(link), link]),
  ).values(),
];
const importedComments = [];
const allowed = new Set([
  "p",
  "br",
  "a",
  "strong",
  "em",
  "b",
  "i",
  "code",
  "pre",
  "blockquote",
  "ul",
  "ol",
  "li",
  "del",
]);
for (const comment of comments.filter((comment) =>
  selectedIds.has(comment.post),
)) {
  const $ = load(comment.content.rendered, {}, false);
  $("script,style,iframe,object,embed,form,input,img,svg,video,audio").remove();
  for (const element of $("*").toArray()) {
    if (!allowed.has(element.tagName)) {
      $(element).replaceWith($(element).contents());
      continue;
    }
    const href = element.tagName === "a" ? $(element).attr("href") : undefined;
    for (const attr of Object.keys(element.attribs ?? {}))
      $(element).removeAttr(attr);
    if (href) {
      const item = selected.find((item) => item.id === comment.post);
      const url = new URL(href, item.link);
      if (["https:", "http:", "mailto:"].includes(url.protocol))
        $(element)
          .attr("href", migrateLink(url.href, item))
          .attr("rel", "nofollow noopener noreferrer");
    }
  }
  importedComments.push({
    id: comment.id,
    post: comment.post,
    parent: comment.parent,
    author: plain(comment.author_name),
    date: comment.date_gmt + "Z",
    html: $.html(),
  });
}
importedComments.sort((a, b) => a.date.localeCompare(b.date) || a.id - b.id);
report.importedComments = importedComments.length;
report.archives = archives.length;
report.unresolvedLinks = [
  ...new Map(
    report.unresolvedLinks.map((link) => [JSON.stringify(link), link]),
  ).values(),
];
await mkdir(path.join(root, "src/data"), { recursive: true });
await writeFile(
  path.join(root, "src/data/archives.json"),
  JSON.stringify(archives, null, 2) + "\n",
);
await writeFile(
  path.join(root, "src/data/comments.json"),
  JSON.stringify(importedComments, null, 2) + "\n",
);
await mkdir(path.join(root, "migration"), { recursive: true });
await writeFile(
  path.join(root, "migration/inventory.json"),
  JSON.stringify(inventory, null, 2) + "\n",
);
await writeFile(
  path.join(root, "migration/report.json"),
  JSON.stringify(report, null, 2) + "\n",
);
console.log(
  `Imported ${report.imported.length} items and ${report.media.length} media files. ${report.remaining.length} items remain. See migration/report.json.`,
);
