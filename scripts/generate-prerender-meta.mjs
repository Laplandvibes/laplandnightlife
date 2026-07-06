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
// routes.json; this generator only emits /city/:slug entries.
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
const LANGS = ['en', 'fi', 'de', 'ja', 'es', 'pt-BR', 'zh-CN', 'ko', 'fr', 'it', 'nl'];
// cities.<file>.ts overlay file suffix per lang.
const OVERLAY_FILE = {
  fi: 'cities.fi.ts', de: 'cities.de.ts', ja: 'cities.ja.ts', es: 'cities.es.ts',
  'pt-BR': 'cities.pt-BR.ts', 'zh-CN': 'cities.zh-CN.ts', ko: 'cities.ko.ts',
  fr: 'cities.fr.ts', it: 'cities.it.ts', nl: 'cities.nl.ts',
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
  const re = /(?:^|[\s,{])([a-z0-9-]+)\s*:\s*\{/g;
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
for (const slug of slugs) {
  const b = base[slug];
  const path = `/city/${slug}`;
  meta[path] = {};
  for (const lang of LANGS) {
    const ov = lang === 'en' ? null : overlays[lang]?.[slug];
    const tagline = (ov && ov.pageTagline) || b.pageTagline;
    const intro = (ov && ov.intro) || b.intro;
    const title = `${b.name} — ${tagline}`;
    const description = buildDescription(tagline, intro);
    meta[path][lang] = { title, description };
  }
}

writeFileSync(OUT, JSON.stringify(meta, null, 2), 'utf-8');
const langsCovered = new Set();
for (const p of Object.keys(meta)) for (const l of Object.keys(meta[p])) langsCovered.add(l);
console.log(
  `[gen-meta] wrote ${OUT.replace(ROOT + '\\', '').replace(ROOT + '/', '')}: ` +
    `${slugs.length} cities × ${LANGS.length} locales (${[...langsCovered].length} langs covered)`
);
if (slugs.length !== 14) console.warn(`[gen-meta] WARN: expected 14 cities, parsed ${slugs.length}`);
