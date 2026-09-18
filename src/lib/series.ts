import type { CollectionEntry } from "astro:content";
import seriesData from "../data/series.json";

interface SeriesDefinition {
  slug: string;
  title: string;
  description: string;
  wordpressIds?: number[];
}
const definitions: SeriesDefinition[] = seriesData;

type Article = CollectionEntry<"articles">;
export function seriesMembership(entry: Article) {
  if (entry.data.series) {
    if (!definitions.some(({ slug }) => slug === entry.data.series))
      throw new Error(`Unknown series ${entry.data.series} in ${entry.id}`);
    if (!entry.data.seriesOrder)
      throw new Error(`Missing seriesOrder in ${entry.id}`);
    return { slug: entry.data.series, order: entry.data.seriesOrder };
  }
  if (entry.data.seriesOrder !== undefined)
    throw new Error(`seriesOrder requires series in ${entry.id}`);
  const legacy = definitions.find((series) =>
    series.wordpressIds?.includes(entry.data.wordpressId ?? -1),
  );
  return legacy ? {
    slug: legacy.slug,
    order: legacy.wordpressIds!.indexOf(entry.data.wordpressId!) + 1,
  } : undefined;
}

export function articleSeries(entries: Article[]) {
  for (const definition of definitions)
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(definition.slug) || !definition.title.trim())
      throw new Error("Series must have a valid slug and title");
  const groups = definitions.map((definition) => ({
    ...definition,
    path: `/series/${definition.slug}/`,
    posts: [] as Article[],
  }));
  if (new Set(groups.map(({ slug }) => slug)).size !== groups.length)
    throw new Error("Series slugs must be unique");
  for (const entry of entries.filter(({ data }) => !data.draft)) {
    const member = seriesMembership(entry);
    if (!member) continue;
    if (entry.data.kind !== "post") throw new Error(`Only posts can join a series: ${entry.id}`);
    const group = groups.find(({ slug }) => slug === member.slug)!;
    if (group.posts.some((post) => seriesMembership(post)!.order === member.order))
      throw new Error(`Duplicate seriesOrder ${member.order} in ${member.slug}`);
    group.posts.push(entry);
  }
  for (const group of groups)
    group.posts.sort((a, b) => seriesMembership(a)!.order - seriesMembership(b)!.order);
  return groups.filter(({ posts }) => posts.length > 0);
}

export function relatedArticles(entry: Article, entries: Article[]) {
  const eligible = entries.filter(({ data }) => data.kind === "post" && !data.draft);
  if (entry.data.related !== undefined) {
    const paths = [...new Set(entry.data.related)];
    return paths.map((path) => {
      const post = eligible.find(({ data }) => data.path === path);
      if (!post || post.id === entry.id)
        throw new Error(`Related article must reference another published post: ${path} in ${entry.id}`);
      return post;
    });
  }
  const membership = seriesMembership(entry);
  const normalise = (values: string[]) => new Set(values.map((value) => value.trim().toLowerCase()));
  const tags = normalise(entry.data.tags);
  const categories = normalise(entry.data.categories);
  return eligible
    .filter((post) => post.id !== entry.id && (!membership || seriesMembership(post)?.slug !== membership.slug))
    .map((post) => ({
      post,
      score: [...normalise(post.data.tags)].filter((tag) => tags.has(tag)).length * 3
        + [...normalise(post.data.categories)].filter((category) => categories.has(category)).length,
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score
      || b.post.data.published.getTime() - a.post.data.published.getTime()
      || a.post.data.path.localeCompare(b.post.data.path))
    .slice(0, 3)
    .map(({ post }) => post);
}
