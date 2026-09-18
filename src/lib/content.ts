import { getCollection } from "astro:content";

export async function articles() {
  const entries = await getCollection("articles", ({ data }) => !data.draft);
  const paths = new Set<string>();
  for (const entry of entries) {
    if (
      paths.has(entry.data.path) ||
      /^\/(archive|feed|404|sitemap)\//.test(entry.data.path) ||
      /^\/page\/\d+\//.test(entry.data.path)
    ) {
      throw new Error(`Duplicate or reserved article path: ${entry.data.path}`);
    }
    paths.add(entry.data.path);
  }
  return entries.sort(
    (a, b) => b.data.published.getTime() - a.data.published.getTime(),
  );
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Europe/London",
  }).format(date);
}
