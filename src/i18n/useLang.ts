import { useLocation } from 'react-router-dom';

export type Lang = 'en' | 'fi' | 'de' | 'ja' | 'es' | 'pt-BR' | 'zh-CN' | 'ko' | 'fr' | 'it' | 'nl' | 'sv';

export const LANG_PREFIX: Record<Lang, string> = {
  en: '',
  fi: 'fi',
  de: 'de',
  ja: 'ja',
  es: 'es',
  'pt-BR': 'br',
  'zh-CN': 'cn',
  ko: 'kr',
  fr: 'fr',
  it: 'it',
  nl: 'nl',
  sv: 'sv',
};

const SEG_TO_LANG: Record<string, Lang> = {
  fi: 'fi',
  de: 'de',
  ja: 'ja',
  es: 'es',
  br: 'pt-BR',
  cn: 'zh-CN',
  kr: 'ko',
  fr: 'fr',
  it: 'it',
  nl: 'nl',
  sv: 'sv',
};

export function useLang(): Lang {
  const { pathname } = useLocation();
  const seg = pathname.split('/').filter(Boolean)[0];
  return SEG_TO_LANG[seg ?? ''] ?? 'en';
}

export function useLocalePath() {
  const lang = useLang();
  return (path: string): string => {
    if (lang === 'en') return path;
    const prefix = `/${LANG_PREFIX[lang]}`;
    if (path === '/') return prefix;
    return `${prefix}${path.startsWith('/') ? path : `/${path}`}`;
  };
}

export function stripLocale(path: string): string {
  const segs = path.split('/').filter(Boolean);
  if (segs.length && SEG_TO_LANG[segs[0]]) {
    return '/' + segs.slice(1).join('/');
  }
  return path === '' ? '/' : path;
}

export function useHtmlLang(): 'en-US' | 'fi-FI' | 'de-DE' | 'ja-JP' | 'es-ES' | 'pt-BR' | 'zh-CN' | 'ko-KR' | 'fr-FR' | 'it-IT' | 'nl-NL' | 'sv-SE' {
  const lang = useLang();
  if (lang === 'fi') return 'fi-FI';
  if (lang === 'de') return 'de-DE';
  if (lang === 'ja') return 'ja-JP';
  if (lang === 'es') return 'es-ES';
  if (lang === 'pt-BR') return 'pt-BR';
  if (lang === 'zh-CN') return 'zh-CN';
  if (lang === 'ko') return 'ko-KR';
  if (lang === 'fr') return 'fr-FR';
  if (lang === 'it') return 'it-IT';
  if (lang === 'nl') return 'nl-NL';
  if (lang === 'sv') return 'sv-SE';
  return 'en-US';
}
