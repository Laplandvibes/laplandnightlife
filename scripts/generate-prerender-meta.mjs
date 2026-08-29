// scripts/generate-prerender-meta.mjs  (laplandnightlife)
//
// Emits scripts/prerender-meta.json — a per-route × per-locale meta map consumed
// by ../_prerender_routes.mjs via --meta. It localizes the DYNAMIC /city/:slug
// pages, whose <title>/<meta description> are built at RUNTIME in CityPage.tsx
// from per-locale city data (cities.ts + cities.<lang>.ts overlays), so the
// prerendered first-byte HTML matches the client render per locale.
//
// Runtime contract (CityPage.tsx):
//   title       = `${city.name} — ${city.pageTagline}`   // name not localized; pageTagline localized
//   description = `${city.pageTagline} ${city.intro.slice(0, 120)}`   // both localized, EN fallback
//
// localizeCity (cityI18n.ts) replaces pageTagline/intro field-by-field from the
// overlay, English fallback when a field/lang is absent. We replicate that here
// so prerender === runtime. Static content pages are handled by copyKey in
// routes.json.
//
// Legal pages (/privacy /terms /cookie-policy) are emitted here too (2026-08-03;
// before that they fell back to the EN routes.json fallbackTitle in all 11 non-EN
// locales — the "no-meta: <lang> /privacy" build lines). Their per-locale meta
// lives in src/locales/seo-meta.json, the SAME file the page components read at
// runtime via getPageSeo (src/lib/pageSeo.ts), so prerender === runtime with no
// drift. seo-meta.json holds the SHORT title; the " | LaplandNightlife" brand
// suffix is appended here to match what PageSeo.tsx renders on the client.
//
// Idempotent. Run from the site root (after or before vite build):
//   node scripts/generate-prerender-meta.mjs

import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const DATA = join(ROOT, 'src', 'data');
const OUT = join(ROOT, 'scripts', 'prerender-meta.json');

// Locales whose URL prefix → BCP/lang key in the prerenderer. Keys MUST match
// the `lang` values in _prerender_routes.mjs FULL_LOCALE_LIST.
const LANGS = ['en', 'fi', 'de', 'ja', 'es', 'pt-BR', 'zh-CN', 'ko', 'fr', 'it', 'nl', 'sv'];
// cities.<file>.ts overlay file suffix per lang.
const OVERLAY_FILE = {
  fi: 'cities.fi.ts', de: 'cities.de.ts', ja: 'cities.ja.ts', es: 'cities.es.ts',
  'pt-BR': 'cities.pt-BR.ts', 'zh-CN': 'cities.zh-CN.ts', ko: 'cities.ko.ts',
  fr: 'cities.fr.ts', it: 'cities.it.ts', nl: 'cities.nl.ts', sv: 'cities.sv.ts',
};

// ---- generic brace-matched block reader (same approach as _prerender_routes.mjs) ----
function sliceBlock(src, openIdx) {
  let depth = 0, start = -1, end = -1;
  for (let i = openIdx; i < src.length; i++) {
    const c = src[i];
    if (c === '{') { if (depth === 0) start = i + 1; depth++; }
    else if (c === '}') { depth--; if (depth === 0) { end = i; break; } }
  }
  if (start < 0 || end < 0) return null;
  return src.slice(start, end);
}

// Read a single-line string field value `key: '…'` (handles \' escapes) from a block.
function field(block, key) {
  const m = block.match(new RegExp(`(?:^|[\\s,{])${key}\\s*:\\s*(['"\`])((?:\\\\.|(?!\\1).)*)\\1`, 's'));
  if (!m) return null;
  return m[2]
    .replace(/\\'/g, "'")
    .replace(/\\"/g, '"')
    .replace(/\\`/g, '`')
    .replace(/\\\\/g, '\\')
    .replace(/\s+/g, ' ')
    .trim();
}

// ---- parse base cities.ts: top-level array objects, scoped by `slug:` ----
function parseBaseCities() {
  const src = readFileSync(join(DATA, 'cities.ts'), 'utf-8');
  const out = {};
  // Each city object opens at a `{` that directly contains `slug:`. Find every
  // `slug:` then walk back to the enclosing `{` and slice the object block.
  const re = /slug:\s*(['"`])([a-z0-9-]+)\1/g;
  let m;
  while ((m = re.exec(src)) !== null) {
    const slug = m[2];
    // find the `{` that opens this object: nearest unmatched `{` before slug.
    let i = m.index, depth = 0, open = -1;
    while (i >= 0) {
      const c = src[i];
      if (c === '}') depth++;
      else if (c === '{') { if (depth === 0) { open = i; break; } depth--; }
      i--;
    }
    if (open < 0) continue;
    const block = sliceBlock(src, open);
    if (!block) continue;
    // Only treat as a city if it has name + pageTagline + intro (skips nested venue objs).
    const name = field(block, 'name');
    const pageTagline = field(block, 'pageTagline');
    const intro = field(block, 'intro');
    if (name && pageTagline && intro && !out[slug]) {
      out[slug] = { name, pageTagline, intro };
    }
  }
  return out;
}

// ---- parse an overlay cities.<lang>.ts: Record<slug, { pageTagline?, intro? }> ----
function parseOverlay(file) {
  let src;
  try { src = readFileSync(join(DATA, file), 'utf-8'); } catch { return {}; }
  const out = {};
  // Top-level overlay keys are `slug: {` inside the default export object.
  // 🔴 The quotes are NOT optional to the regex: a slug containing a hyphen has
  // to be written `'pyha-luosto': {`, and an unquoted-only pattern skipped it in
  // every overlay at once — so all eleven localized /city/pyha-luosto pages
  // silently served the ENGLISH title and description while their body copy
  // (read by the shared harvester, which does allow quotes) was localized.
  const re = /(?:^|[\s,{])['"]?([a-z0-9-]+)['"]?\s*:\s*\{/g;
  let m;
  while ((m = re.exec(src)) !== null) {
    const slug = m[1];
    // skip nested known sub-objects (venues/quickFacts) — only first occurrence
    // of a slug at overlay top level matters; guard via brace depth of match.
    const block = sliceBlock(src, m.index + m[0].length - 1);
    if (!block) continue;
    const pageTagline = field(block, 'pageTagline');
    const intro = field(block, 'intro');
    if ((pageTagline || intro) && !out[slug]) out[slug] = { pageTagline, intro };
  }
  return out;
}

// ---- description builder: faithful to runtime (tagline + intro slice) but
// trimmed to a clean word boundary for SERP quality (<=160 chars). ----
function buildDescription(tagline, intro) {
  let base = `${tagline} ${intro}`.replace(/\s+/g, ' ').trim();
  if ([...base].length <= 160) return base;
  // trim to <=158 chars at the last space, then add ellipsis.
  const chars = [...base];
  let cut = chars.slice(0, 158).join('');
  const lastSpace = cut.lastIndexOf(' ');
  if (lastSpace > 110) cut = cut.slice(0, lastSpace);
  return cut.replace(/[\s,;:–—-]+$/, '') + '…';
}

const base = parseBaseCities();
const overlays = {};
for (const [lang, file] of Object.entries(OVERLAY_FILE)) overlays[lang] = parseOverlay(file);

const slugs = Object.keys(base);
const meta = {};

// ---- static legal pages from src/locales/seo-meta.json (shared with runtime) ----
// 🔴 THIS MAP IS A META SOURCE IN ITS OWN RIGHT. Adding/renaming a legal page
// means editing seo-meta.json, this map AND scripts/routes.json. Miss this one
// and the route still prerenders — it just silently falls back to the EN
// fallbackTitle in all 11 other locales. The build prints
// "no-meta: <lang> <route>" when that happens; that line is the gate.
const STATIC_ROUTE_OF_KEY = {
  privacy: '/privacy',
  terms: '/terms',
  'cookie-policy': '/cookie-policy',
};
const seoMeta = JSON.parse(readFileSync(join(ROOT, 'src', 'locales', 'seo-meta.json'), 'utf-8'));
for (const [key, path] of Object.entries(STATIC_ROUTE_OF_KEY)) {
  const byLang = seoMeta[key];
  if (!byLang) {
    console.warn(`[gen-meta] WARN: seo-meta.json has no '${key}' — ${path} will ship EN fallback meta`);
    continue;
  }
  meta[path] = {};
  for (const lang of LANGS) {
    const e = byLang[lang] || byLang.en;
    meta[path][lang] = { title: `${e.title} | LaplandNightlife`, description: e.description };
  }
}
for (const slug of slugs) {
  const b = base[slug];
  const path = `/city/${slug}`;
  meta[path] = {};
  for (const lang of LANGS) {
    const ov = lang === 'en' ? null : overlays[lang]?.[slug];
    const tagline = (ov && ov.pageTagline) || b.pageTagline;
    const intro = (ov && ov.intro) || b.intro;
    // Overlay saa yliajaa myös nimen (fi: "Kittilän kirkonkylä", ei "Kittilä town").
    const name = (ov && ov.name) || b.name;
    const title = `${name}: ${tagline}`;
    const description = buildDescription(tagline, intro);
    meta[path][lang] = { title, description };
  }
}

writeFileSync(OUT, JSON.stringify(meta, null, 2), 'utf-8');
const langsCovered = new Set();
for (const p of Object.keys(meta)) for (const l of Object.keys(meta[p])) langsCovered.add(l);
console.log(
  `[gen-meta] wrote ${OUT.replace(ROOT + '\\', '').replace(ROOT + '/', '')}: ` +
    `${Object.keys(STATIC_ROUTE_OF_KEY).length} legal + ${slugs.length} cities × ${LANGS.length} locales ` +
    `(${[...langsCovered].length} langs covered)`
);
// Drift check against routes.json, the authoritative list of prerendered city
// routes — not a hardcoded count (an `expected 14 cities` would go stale the
// moment the list changed). Both directions matter: a route whose slug we
// failed to parse ships EN-fallback meta; a parsed city without a route never
// gets prerendered at all.
const routesJson = JSON.parse(readFileSync(join(ROOT, 'scripts', 'routes.json'), 'utf-8'));
const cityRouteSlugs = routesJson
  .map((r) => r.path)
  .filter((p) => p.startsWith('/city/'))
  .map((p) => p.slice('/city/'.length));
for (const slug of cityRouteSlugs) {
  if (!base[slug]) console.warn(`[gen-meta] WARN: routes.json lists /city/${slug} but no city parsed from src/data — route will prerender with EN fallback meta`);
}
for (const slug of slugs) {
  if (!cityRouteSlugs.includes(slug)) console.warn(`[gen-meta] WARN: city '${slug}' parsed from src/data has no /city/ route in routes.json — page will not be prerendered`);
}
