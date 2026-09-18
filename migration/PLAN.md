# WordPress migration progress

## Public content migrated with agreed screenshot placeholders

- Imported all **13 public posts and 7 pages**, matching the current WordPress post/page XML sitemaps.
- Preserved original article/page paths, publication dates, headings, code blocks, taxonomy labels, and media references.
- Saved **155 media files** locally: 154 from SimplyGeek plus one HttpRestClient image recovered from the Internet Archive, including responsive variants, thumbnails, and full-resolution featured photos.
- **17 screenshots in two articles remain unavailable** (Logger and Visual Studio Code Integration). Their old host, `blogs.thecloudstop.co.uk`, no longer resolves. At the owner's request, the preview shows clear placeholders. Original URLs and recovery details are recorded in [media-recovery.json](media-recovery.json), allowing restoration if a backup becomes available.
- Recreated **63 category, 138 tag, and 1 series archive** at their WordPress paths.
- Made the formerly empty topic pages into article indexes. VMware NSX has no currently published matching posts, so it shows an explicit empty state.
- Preserved **7 public comments** with authors, dates, replies, and original comment anchors. New comment submission is not enabled.
- Changed navigation and recognized internal links to local routes.
- Added XML and HTML sitemaps, the original second-page archive, and the legacy HTML sitemap entry.
- Kept the approved theme and automatic build-time lossless image optimization.

WordPress's comment API headers report 142 comments, but page 1 returns only 7 records and page 2 returns none, including when explicitly requesting approved comments. The 7 visible records match the article discussions (2 + 4 + 1). The migration records both the reported API totals and the actual returned counts; it does not invent or retrieve unpublished comments.

Read [report.json](report.json) for the latest import details. [inventory.json](inventory.json) contains all imported posts/pages. The source API snapshot and pre-import copies of the initial four articles are in the Git-ignored `.migration-cache/` directory.

## Review before publishing

- Review the full local preview, especially the new articles, series order, screenshots, and discussions.
- The About biography was last updated in WordPress in 2019 and has been preserved.
- The source author endpoint is restricted; embedded names are used when available, otherwise the displayed byline is SimplyGeek.
- WordPress categories and tags include historical terms with no currently published posts. Their routes are preserved as empty archives. This is not evidence that removed/private historical posts were migrated.
- A WordPress administrator export and full backup are still needed before retiring WordPress. Drafts, private/deleted posts, inaccessible comments, unused media, database/plugin settings, and server redirects are outside the public content export.
- Contact forms, analytics, login, and plugin execution are not reproduced. Site search works over article titles, summaries, and taxonomy labels.

## Publish the GitHub Pages preview

1. Review this migration locally.
2. Commit and push to `main` when publication is requested.
3. Choose **Settings > Pages > Source > GitHub Actions** and run the provided workflow.
4. Review `https://simplygeekuk.github.io` before making any domain changes.

Preview indexing remains disabled with a `noindex` meta tag and `robots.txt`. This does not make a published preview private.

## Move the custom domain later

1. Export WordPress and back up uploads, the database, redirects, and current DNS records outside this public repository.
2. Confirm the canonical hostname and update `site` in `astro.config.mjs`.
3. Configure the custom domain and HTTPS in GitHub Pages, then update only the appropriate web-hosting DNS records.
4. Remove the preview `noindex`, update `public/robots.txt`, and advertise `/sitemap.xml`.
5. Review historic URLs and query-string URLs such as `?p=...`. Imported internal links are normalized, but incoming query-string URLs still need a cutover redirect strategy.
6. RSS is served at `/feed.xml`. The legacy `/feed/` is an HTML browser redirect, which some feed readers do not follow. Arrange a real HTTP redirect where possible or communicate the new feed URL. `/sitemap.html` also uses a browser redirect to `/sitemap/`.
7. Check both hostnames, HTTPS, canonical tags, feeds, media, comments, and historical redirects. Keep WordPress available until the cutover is verified.

No push, deployment, GitHub Pages settings changes, or DNS changes have been performed during the full migration.
