import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { articles } from "../lib/content";

export async function GET(context: APIContext) {
  return rss({
    title: "SimplyGeek",
    description: "A vAdmin’s journey into the world of DevOps & Automation.",
    site: context.site!,
    items: (await articles())
      .filter(({ data }) => data.kind === "post")
      .map(({ data }) => ({
        title: data.title,
        description: data.description,
        pubDate: data.published,
        link: data.path,
        categories: data.categories,
      })),
    customData: "<language>en-gb</language>",
  });
}
