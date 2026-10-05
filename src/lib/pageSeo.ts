// Runtime accessor for legal-page SEO title/description.
//
// Single source of truth: src/locales/seo-meta.json — the SAME file read by
// scripts/generate-prerender-meta.mjs, so the prerendered first-byte <title> /
// <meta description> match what these page components render at runtime
// (no English fallback on /fi/, /de/, … legal pages).
//
// Titles carry no site-name suffix, and each description is already inside the
// prerenderer's 70-160 character window (CJK 100-200 width units), so neither
// side changes the text (gate:meta-hydraatio in lv-ops).

import seoMeta from '../locales/seo-meta.json';
import type { Lang } from '../i18n/useLang';

type Entry = { title: string; description: string };
type PageKey = 'privacy' | 'terms' | 'cookie-policy';

const MAP = seoMeta as unknown as Record<string, Record<string, Entry>>;

export function getPageSeo(page: PageKey, lang: Lang): Entry {
  const byLang = MAP[page];
  if (!byLang) return { title: '', description: '' };
  return byLang[lang] ?? byLang.en;
}
