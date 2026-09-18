# Full public-content migration validation

Verified locally on 18 September 2026 using Node.js 22.20.0.

- All 13 public posts and 7 pages match the current WordPress post/page XML sitemap inventories. Publication dates, paths, and taxonomy labels are preserved.
- The public API returned 7 approved comments; all are imported with reply relationships and original comment anchors. API-reported totals differ from returned records, as documented in PLAN.md.
- npm run check: passed with zero errors, warnings, or hints across 19 files.
- npm run build: passed, generating 229 HTML files (including the HTML sitemap compatibility endpoint), 13 RSS entries, and 54 XML sitemap URLs.
- Final output audit checked 6,947 local references, including 137 responsive-image candidates. Navigation/media targets and local fragments resolved. The 404 canonical metadata points to /404/ while its generated error document is /404.html; this metadata reference was excluded from the navigation audit.
- All 61 rendered code blocks match the public WordPress source exactly.
- Initial Chrome checks covered 27 routes at desktop and mobile widths (54 combinations). These caught extra source H1 headings and externally hosted missing screenshots. The importer now shifts body headings down one level where necessary, preserving their anchors.
- After fixing those findings, Chrome rechecked all 8 affected routes at 1440px and 390px (16 combinations), decoding 60 images. No browser errors, broken remaining images, horizontal page overflow, or duplicate/missing main headings were detected.
- Menu, theme switching, and archive search were checked during the broader browser pass. Desktop/mobile homepages, discussions, and mobile screenshot placeholders were visually inspected.
- 155 media files are stored locally. One HttpRestClient image was recovered from an Internet Archive snapshot; provenance is recorded in media-recovery.json. The other 17 external screenshots remain unavailable and have clear placeholders, as requested by the owner. No remote image dependencies remain in the rendered articles.
- Lossless optimization generated 142 WebP images, reducing their combined delivery size from 12.78 MB to 7.28 MB (43%). Each conversion passed an exact decoded-pixel comparison; originals remain available.
- Built site: 24,014,978 bytes (about 24 MB, 2.4% of a decimal 1 GB budget). Current repository source files total approximately 15.83 MB. Ignored local dependencies, caches, and build output are not included in the source size; this is not a measurement of future Git history growth.

Checks ran directly against generated output; no automated test files were added. Temporary browser tooling, screenshots, raw API snapshots, and build output are ignored by Git. The complete source-file manifest is in CHANGED-FILES.md.

Nothing has been pushed or published. GitHub Actions deployment and custom-domain cutover remain untested. Drafts, private/deleted content, unused media, inaccessible comments, plugins, and database settings require a WordPress administrator export or backup and are outside this public-content import. Third-party outbound links and accessibility beyond the checks above were not comprehensively audited.
