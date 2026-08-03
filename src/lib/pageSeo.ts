// Runtime accessor for legal-page SEO title/description.
//
// Single source of truth: src/locales/seo-meta.json — the SAME file read by
// scripts/generate-prerender-meta.mjs, so the prerendered first-byte <title> /
// <meta description> match what these page components render at runtime
// (no English fallback on /fi/, /de/, … legal pages).
//
// Entries hold the SHORT title (no brand): PageSeo.tsx appends
// " | LaplandNightlife" at runtime, and the prerender generator appends the
// same suffix when emitting prerender-meta.json.

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
