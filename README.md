# SimplyGeek

An Astro static blog for `https://simplygeekuk.github.io`, preparing the migration from [SimplyGeek on WordPress](https://simplygeek.co.uk/).

This is a **local migration preview of all currently public content**: 13 posts, 7 pages, and 7 visible comments. WordPress and the custom domain have not been changed. Publication is a separate next step.

17 screenshots in two older articles could not be recovered from their unavailable external host. Clear placeholders mark those gaps, as requested by the owner. One additional image was recovered from the Internet Archive. See [migration/media-recovery.json](migration/media-recovery.json) for original URLs and recovery details.

## Run locally

Use Node.js 22.12 or newer (Node 22 is used in CI).

```powershell
npm ci
npm run dev
```

Open the URL printed by Astro, normally `http://localhost:4321`.

```powershell
npm run check
npm run build
npm run preview
```

If a restricted environment blocks Astro's per-user telemetry configuration, set `$env:ASTRO_TELEMETRY_DISABLED='1'` in PowerShell before running these commands.

## What is included

- A responsive dark/light theme, searchable article archive, topic pages, About page, and custom 404 page.
- All 13 public posts and 7 pages, checked against the WordPress post/page sitemaps.
- 63 category, 138 tag, and 1 series archive, preserving their original paths. Empty historical taxonomy archives remain available with an explicit empty state.
- The 7 comments actually returned by the public API, including replies and comment anchors, preserved as read-only discussions.
- WordPress publication dates, categories, tags, heading anchors, and original article paths.
- Local copies of 154 referenced images, responsive variants, thumbnails, and full-resolution featured photos under `public/wp-content/uploads/`.
- One recovered HttpRestClient image under `public/media/recovered/`, with archive provenance recorded in the migration manifest.
- Automatic lossless WebP generation during production builds; every accepted conversion passes a pixel-equality check. Originals are retained for downloads and historical image URLs. `npm run dev` serves source images; `npm run build` followed by `npm run preview` serves optimized images.
- RSS at `/feed.xml`, with a browser redirect from `/feed/`. Existing feed readers need the new URL or a real HTTP redirect at domain cutover.
- A GitHub Actions workflow that checks and builds pull requests and deploys `main` to GitHub Pages once Pages is configured.
- A public-content inventory and a repeatable importer. Site builds work without contacting WordPress.
- XML sitemap at `/sitemap.xml`, human-readable site map at `/sitemap/`, compatibility entry at `/sitemap.html`, and the original `/page/2/` archive path.

Imported articles live in `src/content/articles/`. Their `.md` files contain YAML metadata and the original rendered HTML, lightly cleaned of WordPress scripts and empty spacer paragraphs. This preserves code and image markup for review. New articles can use normal Markdown; conversion of the historical HTML to idiomatic Markdown is a later editorial step.

## Write an article

For a complete starting structure, copy [templates/article.md](templates/article.md) into `src/content/articles/` with a unique filename.
For a standalone page, use [templates/page.md](templates/page.md).
The article template includes an introduction, prerequisites, setup, code, verification, troubleshooting, references, and a summary.
Remove sections that your topic does not need.

1. Update the title, description, unique path, and publication date in the copied file.
2. Write the content below the metadata. Use `##` for sections and `###` for subsections; the layout supplies the page title.
3. Put screenshots in `public/images/your-slug/` and reference them as `/images/your-slug/filename.webp`. Add useful alternative text.
4. Keep `draft: true` while writing. Drafts have no preview route. To view the page locally, temporarily set `draft: false` and run `npm run dev`.
5. Open the configured path locally, then restore `draft: true` if the content is not ready for publication.

New Markdown articles and pages automatically display **Page Contents** above the introduction, using headings from `##` through `######`.
Nested headings become nested links. A page without these headings has no TOC.
Set `toc: false` in the metadata to hide the generated TOC.
Imported WordPress articles retain their existing contents navigation.

Standalone pages use `kind: "page"` and do not appear in the homepage post list or RSS feed.
Add a navigation link separately if a page needs one.
Template files remain outside the content collection and are never published directly.

For a minimal article, use this example:

Create `src/content/articles/my-new-post.md`:

```markdown
---
title: "My new post"
description: "A short summary for the journal and RSS feed."
path: "/my-new-post/"
published: "2026-09-18T09:00:00Z"
author: "Gavin Stephens"
categories: ["Automation"]
tags: ["Ansible"]
draft: true
---

Write the article here using Markdown.
```

Set `draft: false` when ready. Drafts are excluded from routes, listings, and RSS. Paths must be unique and end in `/`. Existing system, taxonomy, and pagination routes are reserved. Use fenced code blocks with a language for syntax highlighting in new Markdown posts. The imported taxonomy membership in `src/data/archives.json` is a snapshot of WordPress; new native Markdown posts need their taxonomy membership added to the archive implementation if they should appear in those topic pages.

## Re-run the import

```powershell
# Refresh all public content after backing up any local article edits.
npm run import:wordpress -- --all --overwrite
```

The importer is fixed to your public WordPress site. It needs network access but no credentials. `--overwrite` replaces the selected generated article files and refreshes imported archive/comment data; commit or back up edits first. It does not delete older imports, import drafts, or synchronize deletions. Media already on disk is reused; if WordPress replaces an image at the same URL, review and remove that specific local image before importing again. The original three-post sample mode remains available when `--all` is omitted, but should not be used to refresh this full import.

Read [migration/report.json](migration/report.json) for imported and remaining items, media, unavailable or externally hosted images, links still pointing to WordPress, and embeds needing review. [migration/inventory.json](migration/inventory.json) lists the public posts and pages seen during this import. Raw API responses are kept locally in the gitignored `.migration-cache/` directory; they are not a full WordPress backup.

## Publish the preview later

1. Review the complete site locally, especially screenshots, code blocks, topic pages, discussions, and the About page.
2. Commit and push this project to the repository's `main` branch when ready to publish.
3. In the GitHub repository, choose **Settings → Pages → Build and deployment → Source → GitHub Actions**. If the initial workflow ran before Pages was configured, rerun it from the Actions tab.
4. The workflow deploys to `https://simplygeekuk.github.io`. Pull requests only check/build and do not deploy.

The preview deliberately has a `noindex` meta tag and a restrictive `public/robots.txt` to discourage search indexing while content is duplicated. This does not make the preview private. The final domain migration needs the steps in [migration/PLAN.md](migration/PLAN.md), including changing both indexing settings. No `CNAME` file has been added.

Platform references: [Astro GitHub Pages guide](https://docs.astro.build/en/guides/deploy/github/), [GitHub Pages custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages), and [WordPress posts API](https://developer.wordpress.org/rest-api/reference/posts/).
