import archiveData from "../data/archives.json";
import type { CollectionEntry } from "astro:content";

export const archives = archiveData;

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
  const posts = entries.filter(
    (entry) =>
      entry.data.kind === "post" &&
      archive.postIds.includes(entry.data.wordpressId ?? -1),
  );
  // A series is read in publication order; topic archives show newest first.
  return archive.kind === "series" ? posts.toReversed() : posts;
}
