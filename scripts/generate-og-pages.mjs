// Vite builds a single-page app, so every route serves the same dist/index.html —
// which means every route also carries the same Open Graph meta tags. Crawlers
// (WhatsApp, Facebook, Twitter) fetch the raw HTML and don't run JavaScript, so
// client-side, per-route <title>/meta updates never reach them.
//
// This script runs after `vite build` and writes real static HTML files for the
// routes we want distinct link previews for. Each copy is the built index.html
// (same JS/CSS bundle references) with just the <title> and og:/twitter: meta
// swapped in. Vercel serves a matching static file before falling back to the
// SPA rewrite (see vercel.json), so:
//   - a crawler hitting /reviews/qr gets this page's specific meta tags
//   - a real visitor hitting /reviews/qr gets the same bundle, mounts the same
//     React app, and React Router renders PrintReviewQr as normal
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, '..', 'dist');
const indexPath = join(distDir, 'index.html');

if (!existsSync(indexPath)) {
  console.error('generate-og-pages: dist/index.html not found — run `vite build` first.');
  process.exit(1);
}

const baseHtml = readFileSync(indexPath, 'utf8');

const pages = [
  {
    route: 'reviews',
    title: 'What Clients Are Saying — Alicia Hairline & Beauty',
    description: 'Read real client reviews and share your own Alicia Hairline & Beauty experience.',
  },
  {
    route: 'reviews/leave',
    title: 'Leave a Review — Alicia Hairline & Beauty',
    description: 'Loved your visit? Tell us about it — it only takes a minute.',
  },
  {
    route: 'reviews/qr',
    title: 'Scan to Leave a Review — Alicia Hairline & Beauty',
    description: 'Scan the QR code to tell us about your Alicia Hairline & Beauty experience.',
  },
];

const escapeHtml = (value) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const setMetaContent = (html, id, value) => {
  const pattern = new RegExp(`(id="${id}"[^>]*content=")[^"]*(")`);
  if (!pattern.test(html)) throw new Error(`generate-og-pages: could not find a meta tag with id="${id}"`);
  return html.replace(pattern, `$1${escapeHtml(value)}$2`);
};

for (const page of pages) {
  let html = baseHtml;
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(page.title)}</title>`);
  html = setMetaContent(html, 'meta-description', page.description);
  html = setMetaContent(html, 'og-title', page.title);
  html = setMetaContent(html, 'og-description', page.description);
  html = setMetaContent(html, 'twitter-title', page.title);
  html = setMetaContent(html, 'twitter-description', page.description);

  const outDir = join(distDir, ...page.route.split('/'));
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, 'index.html'), html);
  console.log(`generate-og-pages: wrote preview for /${page.route}`);
}
