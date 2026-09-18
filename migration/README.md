# WordPress migration notes

These records describe the import from [SimplyGeek on WordPress](https://simplygeek.co.uk/). They are a historical snapshot, not a live inventory of the maintained site.

For local development, authoring and deployment, use the [project README](../README.md). The [cutover plan](PLAN.md) covers the custom domain, redirects and indexing.

## Imported content and media

The completed import recorded:

- 13 public posts and 7 pages, checked against the WordPress post and page sitemaps.
- 63 category archives, 138 tag archives and 1 series archive with their original paths. Empty historical taxonomy archives remain available with an explicit empty state.
- 7 comments returned by the public API, including replies and comment anchors, preserved as read-only discussions.
- WordPress publication dates, categories, tags, heading anchors and article paths.
- Local copies of 154 referenced images, including responsive variants, thumbnails and full-resolution featured photos, under `public/wp-content/uploads/`.

Seventeen screenshots in two older articles could not be recovered from their unavailable external host. Clear placeholders mark those gaps. One additional HttpRestClient image was recovered from the Internet Archive and stored under `public/media/recovered/`.

Imported files initially contained YAML metadata and rendered HTML, with WordPress scripts and empty spacer paragraphs removed. Articles have since received local writing improvements, and the Ansible guide has been refreshed in Markdown. Reimporting can replace those edits.

At the end of the local import, WordPress and the custom domain were unchanged. Pushing this repository to GitHub is separate from the domain cutover and does not establish the current deployment status.

## Import records

| Record | Contents |
| --- | --- |
| [inventory.json](inventory.json) | Public posts and pages observed during import |
| [report.json](report.json) | Import results, remaining items, media, external images, WordPress links and embeds needing review |
| [media-recovery.json](media-recovery.json) | Original image URLs and recovery provenance |
| [VALIDATION.md](VALIDATION.md) | Migration validation notes |
| [PLAN.md](PLAN.md) | Domain cutover and publication plan |

Raw API responses are stored locally in the gitignored `.migration-cache/` directory. They are not a full WordPress backup.

## Re-run the import

Run the importer only when intentionally refreshing WordPress content. It is not part of routine authoring or site builds.

Commit or back up local article edits first. From the repository root, run:

```powershell
# Refresh all public content after backing up any local article edits.
npm run import:wordpress -- --all --overwrite
```

The importer targets the original public WordPress site. It needs network access but no credentials.

- `--overwrite` replaces the selected generated article files and refreshes imported archive and comment data.
- It does not delete older imports, import drafts or synchronise deletions.
- Media already on disk is reused. If WordPress replaces an image at the same URL, review and remove that specific local image before importing again.
- Omitting `--all` uses the original three-post sample mode. Do not use that mode to refresh the full import.

Review the generated report and content diff before accepting an import. Check local editorial changes, series membership, image credits and missing-image placeholders.

## Platform references

- [Astro GitHub Pages guide](https://docs.astro.build/en/guides/deploy/github/)
- [GitHub Pages custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
- [WordPress posts API](https://developer.wordpress.org/rest-api/reference/posts/)
