# SimplyGeek

The SimplyGeek blog, built with Astro for GitHub Pages. Articles cover DevOps, automation and cloud infrastructure.

The configured site URL is `https://simplygeekuk.github.io`. See [Deployment](#deployment) for publishing and indexing settings, and [Migration notes](migration/README.md) for the WordPress import history and domain cutover plan.

## Site features

- Responsive light and dark themes with a terminal-style SimplyGeek logo.
- A carousel of the six most recent articles, with arrow controls, keyboard navigation and mobile swipe scrolling.
- Eight articles per homepage listing page, with year headings and previews capped at five lines.
- A searchable full article archive using the same cards and previews as the homepage.
- Topic pages, series reading lists, Previous/Next links and related-article suggestions.
- Featured images, card thumbnails and automatic lossless WebP generation for production builds.
- Preserved WordPress discussions and optional new comments; see [Comments](#comments) for configuration status.
- RSS at `/feed.xml`, an XML sitemap at `/sitemap.xml`, a readable site map at `/sitemap/`, and a custom 404 page.

Site builds use local content and do not contact WordPress.

## Run locally

Use Node.js 22.12 or newer (Node 22 is used in CI).

```powershell
npm ci
npm run dev
```

Open the URL printed by Astro, normally `http://localhost:4321`.

Before publishing, check and build the site, then inspect the production output:

```powershell
npm run check
npm run build
npm run preview
```

`npm run dev` serves source images. The production build generates optimised images. `npm run preview` serves the last build, so rebuild after changes before checking it.

If a restricted environment blocks Astro's per-user telemetry configuration, set `$env:ASTRO_TELEMETRY_DISABLED='1'` in PowerShell before running these commands.

## Project layout

| Location | Purpose |
| --- | --- |
| `src/content/articles/` | Blog posts and standalone pages |
| `templates/` | Starting points for new content |
| `src/components/`, `src/layouts/`, `src/styles/` | Shared presentation and styling |
| `src/data/` | Series definitions, image credits, imported archives and comments configuration |
| `public/images/` | Images added during ongoing authoring |
| `technical-writing/` | Writing profile and approved terminology |
| `migration/` | Import records, media recovery and domain cutover planning |

Article files contain YAML metadata followed by Markdown or imported HTML. Both formats are supported, including in homepage and archive previews. Imported articles have received local editorial updates; the importer is not part of routine authoring.

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

Set `draft: false` when ready for publication. Drafts are excluded from routes, listings and RSS. Paths must be unique and end in `/`. Existing system, taxonomy and pagination routes are reserved. Use fenced code blocks with a language for syntax highlighting.

The imported taxonomy membership in `src/data/archives.json` is a WordPress snapshot. Categories and tags alone do not add native posts to those topic archives; that requires a change to the archive implementation.

Write a concise description for metadata and RSS, and a useful opening paragraph for readers. Homepage and archive cards extract previews from rendered body paragraphs, falling back to the description when none are available. Five lines is a maximum, not a required preview length.

Follow [technical-writing/config.json](technical-writing/config.json) and the approved terms in [technical-writing/terms.json](technical-writing/terms.json). The project uses technical-readability with British spelling. Preserve exact commands, identifiers and historical version references unless the task includes a technical refresh.

## Images

Use local public URLs for images. Set `featuredImage` for the article's header image and `thumbnail` for its card image. The layout displays the featured image automatically; avoid repeating it in the body.

[src/data/article-images.json](src/data/article-images.json) stores curated images and their credits separately from imported content. It provides fallback images by article path. An explicit `featuredImage` overrides that fallback, so check the thumbnail as well.

The layout finds alternative text and credit information by featured-image URL. Keep the source, photographer and licence details accurate. The current attribution format is for Pexels; other sources need a suitable caption implementation.

Keep technical screenshots in the article body so readers can inspect them without the header image's crop. Preserve missing-image placeholders until the original screenshots or genuine replacements are available.

Production builds generate lossless WebP variants and verify that accepted conversions preserve the pixels. Original images remain available for downloads and historical URLs.

## Series and related articles

To join a series, add its slug and a positive order number to the article metadata:

```yaml
series: "build-tools-for-vmware-aria"
seriesOrder: 5
```

For a new series, first add a definition to `src/data/series.json` with `slug`, `title`, and `description`.
Use a unique lowercase slug with hyphens between words.
The site generates `/series/<slug>/` when the series has a published post.
The existing Build Tools series uses an ordered list of WordPress IDs in that file, so imports retain its reading order.
New posts use `series` and `seriesOrder`; they do not need a WordPress ID.

Each published post in a series shows its position, the reading list, and Previous/Next links.
Order numbers must be unique within the published series, but gaps are allowed.
The visible part number counts published posts only.
Drafts and standalone pages are excluded from the reading list.

Related articles appear below the series navigation, or below the article body when there is no series.
The site suggests up to three posts based on shared tags and categories, with tags receiving more weight.
Automatic suggestions exclude the current post, drafts, pages, and other posts in the same series.
No suggestions appear when there are no matching posts.

To choose the suggestions yourself, add up to three published article paths:

```yaml
related:
  - "/using-a-service-oriented-architecture-approach-to-vcf-operations-orchestrator-development/"
```

An explicit list replaces automatic suggestions and can include another post from the same series.
Use `related: []` to hide suggestions for that article.
The build rejects unknown series, duplicate published order numbers, and links to missing, draft, or standalone pages.
It also rejects links from an article to itself.

## Comments

Imported WordPress comments remain read-only, including replies and their original anchors.

The current working tree includes an optional Giscus component for new comments through GitHub Discussions. It is not configured yet: `repoId` and `categoryId` in `src/data/giscus.json` are empty. The component stays hidden until both values are supplied. This does not establish that comments are enabled on the deployed site.

## Deployment

[.github/workflows/pages.yml](.github/workflows/pages.yml) checks and builds pull requests without deploying them. Pushes to `main` also deploy to GitHub Pages once Pages is configured. The workflow can be run manually on `main`.

1. Review the site locally, including screenshots, code, topic pages, series navigation, discussions and the About page.
2. In repository settings, select **Pages → Build and deployment → Source → GitHub Actions**.
3. Commit and push the changes to `main` when ready to publish them.
4. Check the workflow's build and deployment results in the Actions tab. If it ran before Pages was configured, rerun it.

The deployment target is `https://simplygeekuk.github.io`, as configured in [astro.config.mjs](astro.config.mjs). A successful push alone does not confirm a successful deployment.

### Domain and indexing

The layout still includes a `noindex` meta tag, and [public/robots.txt](public/robots.txt) blocks crawlers. These settings discourage indexing during migration; they do not make the site private. No `CNAME` file is present.

The custom-domain cutover is a separate step. Follow [migration/PLAN.md](migration/PLAN.md), including changes to the site URL, domain configuration and both indexing settings.

RSS is served at `/feed.xml`. The browser redirect from `/feed/` is not an HTTP redirect for feed readers. Existing subscribers need the new URL or an HTTP redirect at domain cutover. `/sitemap.html` remains as a compatibility entry, and `/page/2/` is retained for pagination.

For import records, missing media and instructions for rerunning the importer, see [Migration notes](migration/README.md).
