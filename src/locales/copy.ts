import type { Lang } from '../i18n/useLang';
import en from './copy.en';
import type { CopyShape } from './types';

export type { CopyShape } from './types';

// English ships in the main bundle; every other language is a lazy chunk
// fetched by CopyGate in App.tsx before any consumer renders. getCopy()
// falls back to EN until the chunk is registered, so nothing can crash.
const loaders: Record<Lang, () => Promise<{ default: CopyShape }>> = {
  en: () => import('./copy.en').then((m) => ({ default: m.default as CopyShape })),
  fi: () => import('./copy.fi'),
  de: () => import('./copy.de'),
  ja: () => import('./copy.ja'),
  es: () => import('./copy.es'),
  'pt-BR': () => import('./copy.ptBR'),
  'zh-CN': () => import('./copy.zhCN'),
  ko: () => import('./copy.ko'),
  fr: () => import('./copy.fr'),
  it: () => import('./copy.it'),
  nl: () => import('./copy.nl'),
  sv: () => import('./copy.sv'),
};

export const COPY = { en } as Record<Lang, CopyShape>;

export const getCopy = (lang: Lang): CopyShape => COPY[lang] ?? COPY.en;

export function isCopyLoaded(lang: Lang): boolean {
  return !!COPY[lang];
}

export function loadCopy(lang: Lang): Promise<void> {
  if (COPY[lang]) return Promise.resolve();
  return loaders[lang]().then((m) => {
    COPY[lang] = m.default;
  });
}

export async function loadAllCopy(): Promise<void> {
  await Promise.all((Object.keys(loaders) as Lang[]).map((l) => loadCopy(l)));
}
