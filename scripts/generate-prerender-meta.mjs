// scripts/generate-prerender-meta.mjs  (laplandnightlife)
//
// Emits scripts/prerender-meta.json — a per-route × per-locale meta map consumed
// by ./_prerender_routes.mjs via --meta, for the DYNAMIC /city/:slug pages and the
// legal pages. Both read the SAME fields the page components read in the browser,
// so the prerendered first-byte HTML and the hydrated page show one title and one
// description (gate:meta-hydraatio in lv-ops). Static content pages are handled by
// copyKey in routes.json.
//
// City pages (contract shared with src/data/cityI18n.ts cityMeta):
//   title       = cityTitle(overlay name ?? name, overlay pageTagline ?? pageTagline)
//                 — the function in src/data/cityMeta.mjs, imported by both sides
//   description = metaDescription of the city in that language (cities.ts for en,
//                 cities.<lang>.ts for the rest), word for word
// Until 2026-10-05 the description was composed here from tagline + intro and the
// browser composed its own (`tagline + intro.slice(0, 120)`), and the title took the
// overlay's localized name here but the English name in the browser.
//
// Legal pages (/privacy /terms /cookie-policy): per-locale meta in
// src/locales/seo-meta.json, the same file the page components read via getPageSeo
// (src/lib/pageSeo.ts).
//
// 🔴 Every description must already be inside the prerenderer's window: 70–160
// characters, or for CJK 100–200 width units (a CJK character counts two), whole
// sentences, no ellipsis. Outside it, ensureDescriptionLength()/clampDescription()
// in _prerender_routes.mjs rewrite the server text and the browser keeps the
// original. This script stops the build instead of letting that ship.
//
// Idempotent. Run from the site root (after or before vite build):
//   node scripts/generate-prerender-meta.mjs

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { cityTitle } from '../src/data/cityMeta.mjs';

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

/**
 * The value of a one-line string field `key: '…'` exactly as JavaScript reads it, or null when the block has
 * no such field. Only \' and \" escapes are accepted: any other escape ( , \n, \\) would need a JavaScript
 * parser to read the way the browser bundle reads it, so it stops the build instead of drifting.
 */
function exactField(block, key, where) {
  const m = new RegExp(`(?:^|[\\s,{])${key}\\s*:\\s*(['"])`).exec(block);
  if (!m) return null;
  const q = m[1];
  let out = '';
  for (let i = m.index + m[0].length; ; i++) {
    const c = block[i];
    if (c === undefined || c === '\n' || c === '\r') throw new Error(`${where}: ${key} ei pääty samalla rivillä`);
    if (c === q) return out;
    if (c === '\\') {
      const n = block[i + 1];
      if (n !== "'" && n !== '"') throw new Error(`${where}: ${key} sisältää escapen \\${n} — kirjoita merkki sellaisenaan`);
      out += n;
      i++;
      continue;
    }
    out += c;
  }
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
    const where = `cities.ts ${slug}`;
    // Only treat as a city if it has name + pageTagline + intro (skips nested venue objs).
    const name = exactField(block, 'name', where);
    const pageTagline = exactField(block, 'pageTagline', where);
    const intro = exactField(block, 'intro', where);
    if (name && pageTagline && intro && !out[slug]) {
      out[slug] = { name, pageTagline, metaDescription: exactField(block, 'metaDescription', where) };
    }
  }
  return out;
}

// ---- parse an overlay cities.<lang>.ts: Record<slug, { name?, pageTagline?, metaDescription?, … }> ----
function parseOverlay(file, citySlugs) {
  let src;
  try { src = readFileSync(join(DATA, file), 'utf-8'); } catch { return {}; }
  const out = {};
  // Top-level overlay keys are `slug: {` inside the default export object.
  // 🔴 The quotes are NOT optional to the regex: a slug containing a hyphen has
  // to be written `'pyha-luosto': {`, and an unquoted-only pattern skipped it in
  // every overlay at once — so all eleven localized /city/pyha-luosto pages
  // silently served the ENGLISH title and description while their body copy
  // (read by the shared harvester, which does allow quotes) was localized.
  // Nested objects (venues, quickFacts) match the pattern too: only city slugs
  // count, and only their first occurrence.
  const re = /(?:^|[\s,{])['"]?([a-z0-9-]+)['"]?\s*:\s*\{/g;
  let m;
  while ((m = re.exec(src)) !== null) {
    const slug = m[1];
    if (!citySlugs.has(slug) || out[slug]) continue;
    const block = sliceBlock(src, m.index + m[0].length - 1);
    if (!block) continue;
    const where = `${file} ${slug}`;
    out[slug] = {
      name: exactField(block, 'name', where), // overlayn lokalisoitu näyttönimi (valinnainen)
      pageTagline: exactField(block, 'pageTagline', where),
      metaDescription: exactField(block, 'metaDescription', where),
    };
  }
  return out;
}

// ---- the prerenderer's description window (ensureDescriptionLength + clampDescription) ----
const WIDE = /[\u1100-\u11FF\u2E80-\uA4CF\uA960-\uA97F\uAC00-\uD7FF\uF900-\uFAFF\uFE30-\uFE4F\uFF00-\uFF60\uFFE0-\uFFE6]/;
const width = (s) => [...s].reduce((n, c) => n + (WIDE.test(c) ? 2 : 1), 0);
/** '' when the prerenderer leaves the description exactly as it is, else why it would not. */
function descriptionProblem(d) {
  if (typeof d !== 'string' || !d) return 'puuttuu';
  if (d !== d.replace(/\s+/g, ' ').trim()) return 'tupla- tai sitova välilyönti tai reunavälilyönti (esirenderöinti tiivistää ne)';
  if (d.length > 160 || width(d) > 200) return `liian pitkä: ${d.length} merkkiä / ${width(d)} leveysyksikköä (raja 160 / 200)`;
  if (d.length < 70 && width(d) < 100) return `liian lyhyt: ${d.length} merkkiä / ${width(d)} leveysyksikköä (raja 70 / 100)`;
  if (/(…|\.\.\.)$/.test(d) || !/[.!?。！？]["'”’」』）)]*$/u.test(d)) return 'ei pääty kokonaiseen virkkeeseen';
  return '';
}

const base = parseBaseCities();
const slugs = Object.keys(base);
const overlays = {};
for (const [lang, file] of Object.entries(OVERLAY_FILE)) overlays[lang] = parseOverlay(file, new Set(slugs));

const meta = {};
const problems = [];

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
    const p = descriptionProblem(e.description);
    if (p) problems.push(`${path} ${lang} (src/locales/seo-meta.json): ${p}`);
    meta[path][lang] = { title: `${e.title}`, description: e.description };
  }
}
for (const slug of slugs) {
  const b = base[slug];
  const path = `/city/${slug}`;
  meta[path] = {};
  for (const lang of LANGS) {
    const ov = lang === 'en' ? null : overlays[lang]?.[slug];
    // Overlay saa yliajaa myös nimen (fi: "Kittilän kirkonkylä", ei "Kittilä town").
    const title = cityTitle(ov?.name ?? b.name, ov?.pageTagline ?? b.pageTagline);
    // Ei englantia varalle: puuttuva kieli pysäyttää buildin (alla).
    const description = lang === 'en' ? b.metaDescription : ov?.metaDescription;
    const p = descriptionProblem(description);
    if (p) problems.push(`${path} ${lang} (src/data/${lang === 'en' ? 'cities.ts' : OVERLAY_FILE[lang]} metaDescription): ${p}`);
    meta[path][lang] = { title, description };
  }
}

if (problems.length) {
  console.error(`[gen-meta] ❌ ${problems.length} kuvausta, jotka esirenderöinti muuttaisi (selain näyttäisi eri tekstin):`);
  for (const p of problems) console.error(`  ${p}`);
  process.exit(1);
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
