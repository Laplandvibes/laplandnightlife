// /city/<slug> <title>: ONE rule for both sides (gate:meta-hydraatio in lv-ops). scripts/generate-prerender-meta.mjs
// writes the prerendered HTML with it and src/data/cityI18n.ts (cityMeta) calls the same function in the browser.
// Plain .mjs because the build script runs under Node 20 in CI and cannot import a .ts module; the types are in
// cityMeta.d.mts.
//
// The description is not composed at all: it is the city's own field, metaDescription, next to its other text in
// cities.ts (en) and cities.<lang>.ts. Until 2026-10-05 both sides built it from pageTagline and intro, each in its
// own way: the prerender cut at a sentence and _prerender_routes.mjs then extended or clamped the result, while the
// browser took `tagline + intro.slice(0, 120)` and the English name. Every one of the 168 city pages showed a
// different title or description once the page had loaded.

/**
 * "{name}: {tagline}". `name` is the overlay's localized name when it has one (ja, zh-CN, and Kittilä in nine
 * languages), else the English one; the visible h1 keeps the English name.
 * @param {string} name
 * @param {string} tagline
 */
export function cityTitle(name, tagline) {
  return `${name}: ${tagline}`;
}
