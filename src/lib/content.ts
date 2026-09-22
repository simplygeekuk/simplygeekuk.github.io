import { getCollection } from "astro:content";
import articleImages from "../data/article-images.json";

import { display } from "../config/display";

export const POSTS_PER_PAGE = display.articlesPerPage;

export async function articles() {
  const entries = await getCollection(
    "articles",
    ({ data }) => import.meta.env.DEV || !data.draft,
  );
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
  // Keep curated images separate from imported content; explicit article images win.
  const illustratedEntries = entries.map((entry) => {
    const image = articleImages.find((image) => image.path === entry.data.path);
    if (!image || entry.data.featuredImage) return entry;
    return {
      ...entry,
      data: {
        ...entry.data,
        featuredImage: image.featuredImage,
        thumbnail: entry.data.thumbnail ?? image.thumbnail,
      },
    };
  });
  return illustratedEntries.sort(
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
