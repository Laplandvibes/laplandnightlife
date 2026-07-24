// 2026-05-21: locale-aware — hreflang × 11 + og:locale + JSON-LD inLanguage.
import { useLang, LANG_PREFIX, stripLocale, type Lang } from '../i18n/useLang';

interface PageSeoProps {
  title: string;
  description: string;
  /** Site-relative path (no locale prefix), e.g. "/nightclubs". */
  path: string;
  ogImage?: string;
  jsonLd?: object | object[];
}

const ORIGIN = 'https://laplandnightlife.com';
const DEFAULT_OG = 'https://laplandnightlife.com/images/hero/aurora-bars-neon.webp';

const SUPPORTED: Lang[] = ['en', 'fi', 'de', 'ja', 'es', 'pt-BR', 'zh-CN', 'ko', 'fr', 'it', 'nl', 'sv'];

const BCP47: Record<Lang, string> = {
  en: 'en-US', fi: 'fi-FI', de: 'de-DE', ja: 'ja-JP', es: 'es-ES',
  'pt-BR': 'pt-BR', 'zh-CN': 'zh-CN', ko: 'ko-KR', fr: 'fr-FR', it: 'it-IT', nl: 'nl-NL', sv: 'sv-SE',
};
const OG_LOCALE: Record<Lang, string> = {
  en: 'en_US', fi: 'fi_FI', de: 'de_DE', ja: 'ja_JP', es: 'es_ES',
  'pt-BR': 'pt_BR', 'zh-CN': 'zh_CN', ko: 'ko_KR', fr: 'fr_FR', it: 'it_IT', nl: 'nl_NL', sv: 'sv_SE',
};

function localised(path: string, l: Lang): string {
  const clean = stripLocale(path);
  if (l === 'en') return clean === '/' ? '/' : clean;
  const prefix = `/${LANG_PREFIX[l]}`;
  return clean === '/' ? prefix : `${prefix}${clean}`;
}

function injectInLanguage(node: unknown, bcp47: string): unknown {
  if (Array.isArray(node)) return node.map((n) => injectInLanguage(n, bcp47));
  if (node && typeof node === 'object') {
    const o = node as Record<string, unknown>;
    if (o['@type'] && o.inLanguage === undefined) o.inLanguage = bcp47;
    if (Array.isArray(o['@graph'])) o['@graph'] = (o['@graph'] as unknown[]).map((n) => injectInLanguage(n, bcp47));
    return o;
  }
  return node;
}

export default function PageSeo({ title, description, path, ogImage, jsonLd }: PageSeoProps) {
  const lang = useLang();
  const cleanPath = stripLocale(path);
  // Trailing-slash form matches the prerendered static HTML (_prerender_routes.mjs)
  // and sitemap.xml: Cloudflare Pages serves /path/index.html at /path/ with 200;
  // the no-slash form 308-redirects. x-default = page's own EN URL.
  const enUrl = `${ORIGIN}${cleanPath === '/' ? '' : cleanPath}`.replace(/\/?$/, '/');
  const url = `${ORIGIN}${localised(cleanPath, lang)}`.replace(/\/?$/, '/');
  const og = ogImage ?? DEFAULT_OG;
  const fullTitle = cleanPath === '/' ? title : `${title} | LaplandNightlife`;
  const bcp47 = BCP47[lang];

  const graph = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : null;
  const localizedGraph = graph
    ? (injectInLanguage(JSON.parse(JSON.stringify(graph)), bcp47) as unknown[])
    : null;

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {/* Short hreflang codes (en, fi, pt-BR, …) — must match the prerenderer and sitemap.xml. */}
      {SUPPORTED.map((l) => (
        <link key={l} rel="alternate" hrefLang={l} href={`${ORIGIN}${localised(cleanPath, l)}`.replace(/\/?$/, '/')} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={enUrl} />
      <meta name="robots" content="index, follow, max-image-preview:large" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={og} />
      <meta property="og:site_name" content="LaplandNightlife" />
      <meta property="og:locale" content={OG_LOCALE[lang]} />
      {SUPPORTED.filter((l) => l !== lang).map((l) => (
        <meta key={l} property="og:locale:alternate" content={OG_LOCALE[l]} />
      ))}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@laplandvibes" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={og} />
      {localizedGraph && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ '@context': 'https://schema.org', '@graph': localizedGraph }),
          }}
        />
      )}
    </>
  );
}

export function pillarBreadcrumb(pillarName: string, path: string) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${ORIGIN}/` },
      { '@type': 'ListItem', position: 2, name: pillarName, item: `${ORIGIN}${path}` },
    ],
  };
}

export function articleSchema(headline: string, description: string, path: string) {
  return {
    '@type': 'Article',
    headline,
    description,
    url: `${ORIGIN}${path}`,
    inLanguage: 'en',
    author: { '@type': 'Organization', name: 'LaplandVibes editorial team', url: 'https://laplandvibes.com' },
    publisher: {
      '@type': 'Organization',
      name: 'LaplandNightlife',
      logo: { '@type': 'ImageObject', url: `${ORIGIN}/favicon.svg` },
    },
  };
}

export function citySchema(cityName: string, slug: string, description: string) {
  return [
    {
      '@type': 'TouristDestination',
      name: cityName,
      description,
      url: `${ORIGIN}/city/${slug}`,
      // Ruka/Kuusamo ja Oulu ovat Pohjois-Pohjanmaata, eivat Lapin maakuntaa - schema ei saa vaittaa toisin.
      containedInPlace: {
        '@type': 'Place',
        name: slug === 'ruka' ? 'Kuusamo, North Ostrobothnia, Finland'
          : slug === 'oulu' ? 'Oulu, North Ostrobothnia, Finland'
          : 'Finnish Lapland',
      },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${ORIGIN}/` },
        { '@type': 'ListItem', position: 2, name: 'Cities', item: `${ORIGIN}/cities` },
        { '@type': 'ListItem', position: 3, name: cityName, item: `${ORIGIN}/city/${slug}` },
      ],
    },
  ];
}
