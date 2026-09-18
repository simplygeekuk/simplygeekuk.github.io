import archiveData from "../data/archives.json";
import type { CollectionEntry } from "astro:content";
import { articleSeries } from "./series";

export const archives = archiveData;

export function allArchives(entries: CollectionEntry<"articles">[]) {
  const series = articleSeries(entries);
  return [
    ...archives.filter((archive) => archive.kind !== "series" || !series.some(({ path }) => path === archive.path)),
    ...series.map((group, index) => ({
      id: -(index + 1), kind: "series", title: group.title,
      description: group.description, path: group.path,
      postIds: group.posts.map((post) => post.data.wordpressId ?? -1),
    })),
  ];
}

const topicArchives: Record<string, string> = {
  "/ansible/": "/category/devops/ansible/",
  "/vmware-aria/": "/category/broadcom-vmware/vmware-cloud-foundation/",
  "/aria-automation/":
    "/category/broadcom-vmware/vmware-cloud-foundation/vcf-automation/",
  "/aria-automation-orchestrator/":
    "/category/broadcom-vmware/vmware-cloud-foundation/vcf-operations-orchestrator/",
  "/nsx/": "/category/vmware/nsx-t/",
  "/build-tools-for-vmware-aria/": "/series/build-tools-for-vmware-aria/",
};

export function topicArchive(path: string) {
  return archives.find((archive) => archive.path === topicArchives[path]);
}

export function archivePosts(
  archive: (typeof archives)[number],
  entries: CollectionEntry<"articles">[],
) {
  if (archive.kind === "series")
    return articleSeries(entries).find(({ path }) => path === archive.path)?.posts ?? [];
  const posts = entries.filter(
    (entry) =>
      entry.data.kind === "post" &&
      archive.postIds.includes(entry.data.wordpressId ?? -1),
  );
  // Category and tag archives retain the newest-first article order.
  return posts;
}
