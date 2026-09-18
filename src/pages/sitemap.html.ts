// Preserve the WordPress HTML sitemap address as a browser redirect.
export function GET() {
  return new Response(
    '<!doctype html><html lang="en-GB"><head><meta charset="utf-8"><meta name="robots" content="noindex"><meta http-equiv="refresh" content="0;url=/sitemap/"><title>SimplyGeek site map</title></head><body><p><a href="/sitemap/">View the SimplyGeek site map</a></p></body></html>',
    { headers: { "Content-Type": "text/html; charset=utf-8" } },
  );
}
