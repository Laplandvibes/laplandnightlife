// Data-layer i18n for city detail pages.
// Base content lives in cities.ts (English). Native translations live in
// per-language overlay files cities.<lang>.ts (e.g. cities.fi.ts), each exporting
// a default Record<slug, CityOverlay>. Missing fields/langs fall back to English,
// so the site NEVER breaks if a translation is absent.

import type { City } from './cities';
import { CITY_QUICK_FACTS } from './cities';
import type { Lang } from '../i18n/useLang';

/** Translatable fields of a city. venues/quickFacts are keyed by their English
 *  value (venue name / fact label) so array order can never drift. */
export interface CityOverlay {
  tag?: string;
  region?: string;
  blurb?: string;
  pageTagline?: string;
  intro?: string;
  /** venue English name -> { type?, note? } */
  venues?: Record<string, { type?: string; note?: string }>;
  knowList?: string[];
  /** English fact label -> { label?, value? } */
  quickFacts?: Record<string, { label?: string; value?: string }>;
}

type OverlayMap = Record<string, CityOverlay>; // slug -> overlay

// Lazy glob: each cities.<lang>.ts overlay is its own chunk, fetched by the
// App-level CopyGate alongside the copy chunk. Was `eager: true`, which
// bundled all 10 overlay languages into the main bundle.
const modules = import.meta.glob<{ default: OverlayMap }>('./cities.*.ts');

const OVERLAYS: Partial<Record<Lang, OverlayMap>> = {};
const loaded = new Set<string>(['en']);

export function isCityOverlayLoaded(lang: Lang): boolean {
  return loaded.has(lang);
}

export function loadCityOverlays(lang: Lang): Promise<void> {
  if (!lang || loaded.has(lang)) return Promise.resolve();
  const entry = Object.keys(modules).find((p) => p.endsWith(`cities.${lang}.ts`));
  if (!entry) { loaded.add(lang); return Promise.resolve(); }
  return modules[entry]().then((mod) => {
    if (mod && mod.default) OVERLAYS[lang] = mod.default;
    loaded.add(lang);
  });
}

/** Return a city with its translatable fields replaced by the locale overlay
 *  (field-by-field, English fallback). Proper-noun fields (name, slug, img) untouched. */
export function localizeCity(city: City, lang: Lang): City {
  if (lang === 'en') return city;
  const ov = OVERLAYS[lang]?.[city.slug];
  if (!ov) return city;
  return {
    ...city,
    // tag intentionally NOT localized here: it doubles as a color-lookup key
    // (tagColor[tag]) in CityCard. Tag-chip label localization is handled separately.
    region: ov.region ?? city.region,
    blurb: ov.blurb ?? city.blurb,
    pageTagline: ov.pageTagline ?? city.pageTagline,
    intro: ov.intro ?? city.intro,
    venues: city.venues.map((v) => {
      const vo = ov.venues?.[v.name];
      return vo ? { ...v, type: vo.type ?? v.type, note: vo.note ?? v.note } : v;
    }),
    knowList:
      ov.knowList && ov.knowList.length === city.knowList.length ? ov.knowList : city.knowList,
  };
}

/** Localized quick-facts for a slug (English fallback per field). */
export function localizeQuickFacts(slug: string, lang: Lang): { label: string; value: string }[] {
  const base = CITY_QUICK_FACTS[slug] ?? [];
  if (lang === 'en') return base;
  const ov = OVERLAYS[lang]?.[slug]?.quickFacts;
  if (!ov) return base;
  return base.map((f) => {
    const o = ov[f.label];
    return o ? { label: o.label ?? f.label, value: o.value ?? f.value } : f;
  });
}
