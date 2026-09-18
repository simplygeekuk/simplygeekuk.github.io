import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const articles = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/articles" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    path: z.string().regex(/^\/[a-z0-9\-/]+\/$/),
    kind: z.enum(["post", "page"]).default("post"),
    published: z.coerce.date(),
    updated: z.coerce.date().optional(),
    author: z.string().default("SimplyGeek"),
    categories: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    toc: z.boolean().default(true),
    series: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).optional(),
    seriesOrder: z.number().int().positive().optional(),
    related: z.array(z.string().regex(/^\/[a-z0-9\-/]+\/$/)).max(3).optional(),
    wordpressId: z.number().optional(),
    originalUrl: z.url().optional(),
    thumbnail: z.string().startsWith("/").optional(),
    featuredImage: z.string().startsWith("/").optional(),
  }),
});

export const collections = { articles };
