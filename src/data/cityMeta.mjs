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
//
// 19.10.2026: the title says what the page is. Until then it was "{name}: {tagline}." ("Rovaniemi: The Arctic
// capital.") with no word for bars or nightlife, a full stop at the end and a half-width colon in ja/zh. OpenSEO
// 19.10.2026: Finland is where the city searches are (oulun baarit 8 100/kk, hullu poro areena 4 400, levi baarit
// 590, rovaniemi baarit 480, ruka baarit 390); abroad every city + nightlife/bars form is 10–30/kk or no data.
// So fi carries a written seoTitle per city in cities.fi.ts, and the other languages use the pattern below.

/** "{name} bars & nightlife" in each language, before the tagline. */
const PATTERN = {
  en: (n) => `${n} bars & nightlife`,
  fi: (n) => `${n}: baarit ja yöelämä`,
  de: (n) => `Bars und Nachtleben in ${n}`,
  sv: (n) => `Barer och nattliv i ${n}`,
  fr: (n) => `Bars et vie nocturne à ${n}`,
  it: (n) => `Bar e vita notturna a ${n}`,
  nl: (n) => `Uitgaan in ${n}`,
  es: (n) => `Bares y vida nocturna en ${n}`,
  'pt-BR': (n) => `Bares e vida noturna em ${n}`,
  ja: (n) => `${n}のナイトライフ`,
  ko: (n) => `${n} 나이트라이프`,
  'zh-CN': (n) => `${n}夜生活与酒吧`,
};

/** After a colon these languages continue in lower case ("Bars et vie nocturne à Rovaniemi : la capitale
 *  arctique"); the tagline is written as a sentence of its own, so its first word is lowered here. Only the
 *  first words listed: a proper noun (Europas, Finlands, SnowCastle) or a German noun (Skigebiet) keeps its
 *  capital. */
const LOWER_AFTER_COLON = {
  de: ['Die', 'Der', 'Das', 'Mitten'],
  sv: ['Den', 'Det', 'Mitt', 'Porten', 'Skidort', 'Ametistfjällen', 'Samernas'],
  nl: ['De', 'Het', 'Middenin', 'Skiresort'],
  fr: ['La', 'Le', 'Les', 'Au', 'Un', 'Une'],
  it: ['La', 'Il', 'I', 'Le', 'Lo', 'In'],
  es: ['La', 'El', 'Los', 'Las', 'En'],
  'pt-BR': ['A', 'O', 'Os', 'As', 'No', 'Na'],
};
function continueAfterColon(tail, lang) {
  const first = tail.split(/[\s']/u)[0];
  return (LOWER_AFTER_COLON[lang] ?? []).includes(first) ? tail.charAt(0).toLowerCase() + tail.slice(1) : tail;
}

/** Width as Google cuts a title: a CJK/fullwidth character counts two. */
const WIDE = /[ᄀ-ᇿ⺀-꓏ꥠ-꥿가-퟿豈-﫿︰-﹏＀-｠￠-￦]/;
const width = (s) => [...s].reduce((n, c) => n + (WIDE.test(c) ? 2 : 1), 0);
export const TITLE_MAX_WIDTH = 60;

/**
 * Page title of /city/<slug>.
 * - `seoTitle` (a written title in the city's data) wins as such.
 * - Otherwise PATTERN[lang] + ": " + tagline without its closing full stop; ja/zh take the fullwidth colon "：".
 *   The tagline is left out when it has a colon of its own or the title would pass TITLE_MAX_WIDTH.
 * `name` is the overlay's localized name when it has one (ja, zh-CN, and Kittilä in nine languages), else the
 * English one; the visible h1 keeps the English name.
 * @param {string} name
 * @param {string} tagline
 * @param {string} lang
 * @param {string | null | undefined} [seoTitle]
 */
export function cityTitle(name, tagline, lang, seoTitle) {
  if (seoTitle) return seoTitle;
  const head = (PATTERN[lang] ?? PATTERN.en)(name);
  const tail = String(tagline ?? '').trim().replace(/[.。]+$/u, '');
  if (!tail || /[:：]/.test(tail)) return head;
  // fr: a space before the colon, as in the site's French copy (78 × " :" in copy.fr.ts, no U+00A0/U+202F).
  const sep = lang === 'ja' || lang === 'zh-CN' ? '：' : lang === 'fr' ? ' : ' : ': ';
  const full = `${head}${sep}${continueAfterColon(tail, lang)}`;
  return width(full) > TITLE_MAX_WIDTH ? head : full;
}
