// Rich link previews (WhatsApp / Facebook / X / Slack), GitHub-style.
//
// Vite ships one dist/index.html for every route, and crawlers don't run JS — so
// per-route <title>/meta and per-route preview images have to be baked in as real
// static files. This script runs after `vite build` and, for each route below:
//   1. renders a branded 1200x630 PNG with satori + resvg -> dist/og/<slug>.png
//   2. writes dist/<route>/index.html with that route's <title>, description,
//      og:/twitter: tags and og:image pointing at the PNG.
// Vercel serves the matching static file to crawlers and falls back to the SPA
// for real visitors (see vercel.json).
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, '..', 'dist');
const assetsDir = join(__dirname, 'assets');
const indexPath = join(distDir, 'index.html');

const SITE_URL = (process.env.SITE_URL || 'https://aliciahairline.co.ke').replace(/\/$/, '');

if (!existsSync(indexPath)) {
  console.error('generate-og: dist/index.html not found — run `vite build` first.');
  process.exit(1);
}

const pages = [
  {
    route: '',
    slug: 'home',
    title: 'Alicia Hairline & Beauty',
    heading: 'Nairobi’s premier hair & beauty destination',
    description: 'Book appointments, browse services and products, and read client reviews.',
  },
  {
    route: 'services',
    slug: 'services',
    title: 'Services & Prices — Alicia Hairline & Beauty',
    heading: 'Our full price list',
    description: 'Know exactly what to expect before you book — every service, every price.',
  },
  {
    route: 'products',
    slug: 'products',
    title: 'Shop — Alicia Hairline & Beauty',
    heading: 'Premium wigs & hair products',
    description: 'Wigs, lace glue, sprays and styling tools — pay by card, delivered.',
  },
  {
    route: 'gallery',
    slug: 'gallery',
    title: 'Gallery — Alicia Hairline & Beauty',
    heading: 'The wigs we have in stock',
    description: 'Browse photos, lengths and prices of what’s available in the salon.',
  },
  {
    route: 'reviews',
    slug: 'reviews',
    title: 'Reviews — Alicia Hairline & Beauty',
    heading: 'What clients are saying',
    description: 'Read real client reviews and share your own Alicia Hairline & Beauty experience.',
  },
  {
    route: 'reviews/leave',
    slug: 'reviews-leave',
    title: 'Leave a Review — Alicia Hairline & Beauty',
    heading: 'Loved your visit?',
    description: 'Tell us about it — it only takes a minute.',
  },
  {
    route: 'reviews/qr',
    slug: 'reviews-qr',
    title: 'Scan to Leave a Review — Alicia Hairline & Beauty',
    heading: 'Scan to leave a review',
    description: 'Tell us about your Alicia Hairline & Beauty experience.',
  },
  {
    route: 'contact',
    slug: 'contact',
    title: 'Visit Us — Alicia Hairline & Beauty',
    heading: 'Come see us',
    description: 'Old Mutual Building, Kimathi Street, Nairobi. Open Mon–Sat, 9 AM – 7 PM.',
  },
];

// ---------------------------------------------------------------------------
// fonts + logo
// ---------------------------------------------------------------------------
const font = (file) => readFileSync(join(assetsDir, file));
const fonts = [
  { name: 'Inter', data: font('Inter-Regular.ttf'), weight: 400, style: 'normal' },
  { name: 'Inter', data: font('Inter-Bold.ttf'), weight: 700, style: 'normal' },
  { name: 'Yellowtail', data: font('Yellowtail-Regular.ttf'), weight: 400, style: 'normal' },
];

let logoDataUri = null;
try {
  const res = await fetch('https://alicia.boraerp.co.ke/files/logo.png');
  if (res.ok) {
    const buf = Buffer.from(await res.arrayBuffer());
    logoDataUri = `data:image/png;base64,${buf.toString('base64')}`;
  }
} catch {
  console.warn('generate-og: could not fetch logo, rendering without it');
}

// ---------------------------------------------------------------------------
// image template (plain element tree — no JSX in .mjs)
// ---------------------------------------------------------------------------
const h = (type, props, ...children) => ({
  type,
  props: { ...props, children: children.length <= 1 ? children[0] : children },
});

const GOLD = '#fcd34d';
const STONE_300 = '#d6d3d1';

const template = (page) =>
  h(
    'div',
    {
      style: {
        width: '1200px',
        height: '630px',
        display: 'flex',
        flexDirection: 'column',
        padding: '64px',
        backgroundColor: '#0c0a09',
        backgroundImage:
          'radial-gradient(circle at 85% 15%, rgba(202,138,4,0.45), rgba(12,10,9,0) 45%)',
        fontFamily: 'Inter',
      },
    },
    h(
      'div',
      { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' } },
      h(
        'div',
        {
          style: {
            display: 'flex',
            fontSize: '22px',
            fontWeight: 700,
            letterSpacing: '4px',
            color: GOLD,
          },
        },
        'ALICIA HAIRLINE & BEAUTY',
      ),
      logoDataUri
        ? h('img', {
            src: logoDataUri,
            width: 84,
            height: 84,
            style: { borderRadius: '18px', backgroundColor: '#fff', objectFit: 'contain' },
          })
        : h('div', { style: { display: 'flex' } }, ''),
    ),
    h(
      'div',
      {
        style: {
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'center',
        },
      },
      h(
        'div',
        {
          style: {
            display: 'flex',
            fontSize: '62px',
            fontWeight: 700,
            lineHeight: 1.12,
            color: '#ffffff',
            maxWidth: '960px',
          },
        },
        page.heading,
      ),
      h(
        'div',
        {
          style: {
            display: 'flex',
            marginTop: '24px',
            fontSize: '28px',
            lineHeight: 1.4,
            color: STONE_300,
            maxWidth: '900px',
          },
        },
        page.description,
      ),
    ),
    h(
      'div',
      { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' } },
      h(
        'div',
        { style: { display: 'flex', fontSize: '24px', fontWeight: 700, color: GOLD } },
        'aliciahairline.co.ke',
      ),
      h(
        'div',
        { style: { display: 'flex', fontSize: '44px', color: GOLD, fontFamily: 'Yellowtail' } },
        'alicia',
      ),
    ),
  );

async function renderImage(page) {
  const svg = await satori(template(page), { width: 1200, height: 630, fonts });
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
  const ogDir = join(distDir, 'og');
  mkdirSync(ogDir, { recursive: true });
  writeFileSync(join(ogDir, `${page.slug}.png`), png);
}

// ---------------------------------------------------------------------------
// html meta
// ---------------------------------------------------------------------------
const escapeHtml = (value) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const setMeta = (html, id, value) => {
  const pattern = new RegExp(`(id="${id}"[^>]*content=")[^"]*(")`);
  if (!pattern.test(html)) throw new Error(`generate-og: no meta tag with id="${id}"`);
  return html.replace(pattern, `$1${escapeHtml(value)}$2`);
};

const baseHtml = readFileSync(indexPath, 'utf8');

for (const page of pages) {
  await renderImage(page);

  const url = page.route ? `${SITE_URL}/${page.route}` : `${SITE_URL}/`;
  const image = `${SITE_URL}/og/${page.slug}.png`;

  let html = baseHtml;
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(page.title)}</title>`);
  html = setMeta(html, 'meta-description', page.description);
  html = setMeta(html, 'og-title', page.title);
  html = setMeta(html, 'og-description', page.description);
  html = setMeta(html, 'og-url', url);
  html = setMeta(html, 'og-image', image);
  html = setMeta(html, 'twitter-title', page.title);
  html = setMeta(html, 'twitter-description', page.description);
  html = setMeta(html, 'twitter-image', image);

  const outDir = page.route ? join(distDir, ...page.route.split('/')) : distDir;
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, 'index.html'), html);
  console.log(`generate-og: ${page.route || '/'} -> og/${page.slug}.png`);
}
