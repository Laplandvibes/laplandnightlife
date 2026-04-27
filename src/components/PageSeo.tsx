interface PageSeoProps {
  title: string;
  description: string;
  /** Site-relative path, e.g. "/nightclubs". Used to build canonical + og:url. */
  path: string;
  /** Optional OG image URL override. Falls back to site default. */
  ogImage?: string;
  /** Optional structured-data graph(s). Pass a single object or an array; we'll wrap in @graph. */
  jsonLd?: object | object[];
}

const ORIGIN = 'https://laplandnightlife.com';
const DEFAULT_OG = 'https://laplandnightlife.com/images/hero/aurora-bars-neon.webp';

export default function PageSeo({ title, description, path, ogImage, jsonLd }: PageSeoProps) {
  const url = `${ORIGIN}${path === '/' ? '' : path}`;
  const og = ogImage ?? DEFAULT_OG;
  const fullTitle = path === '/' ? title : `${title} | LaplandNightlife`;

  const graph = jsonLd
    ? Array.isArray(jsonLd)
      ? jsonLd
      : [jsonLd]
    : null;

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta name="robots" content="index, follow, max-image-preview:large" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={og} />
      <meta property="og:site_name" content="LaplandNightlife" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@laplandvibes" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={og} />
      {graph && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }),
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
      containedInPlace: { '@type': 'Place', name: 'Finnish Lapland' },
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
