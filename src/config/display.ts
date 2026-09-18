/** Display settings. Changes take effect after rebuilding and deploying the site. */
export const display = {
  // Maximum shared page width; mobile pages still fit within the viewport.
  pageWidthPx: 1200,
  // Total space outside the page (split equally between left and right).
  desktopGutterPx: 64,
  mobileGutterPx: 36,
  // Homepage pagination. The searchable archive continues to show all articles.
  articlesPerPage: 8,
  // Total recent articles in the homepage carousel, not the number visible at once.
  recentArticles: 6,
  // Maximum preview lines on homepage/archive cards and related-article cards.
  previewLines: 5,
  relatedPreviewLines: 3,
  // Maximum body text extracted for a card before applying the visual line limit.
  previewCharacters: 1500,
  // Article header image dimensions. Body screenshots are unaffected.
  featuredImageMaxHeightPx: 280,
  featuredImageAspectRatio: 3,
} as const;

// Reject invalid settings before pagination or generated styles can break.
for (const [name, value] of Object.entries(display)) {
  if (!Number.isFinite(value) || value <= 0) {
    throw new Error(`Display setting ${name} must be a positive number.`);
  }
  if (name !== "featuredImageAspectRatio" && !Number.isInteger(value)) {
    throw new Error(`Display setting ${name} must be a positive integer.`);
  }
}

export const displayStyles = {
  "--page-width": `${display.pageWidthPx}px`,
  "--desktop-gutter": `${display.desktopGutterPx}px`,
  "--mobile-gutter": `${display.mobileGutterPx}px`,
  "--preview-lines": display.previewLines,
  "--related-preview-lines": display.relatedPreviewLines,
  "--featured-image-max-height": `${display.featuredImageMaxHeightPx}px`,
  "--featured-image-aspect-ratio": display.featuredImageAspectRatio,
};
