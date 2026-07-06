import CityCard from '../components/CityCard';
import PageBreadcrumb from '../components/PageBreadcrumb';
import PageSeo, { pillarBreadcrumb, articleSchema } from '../components/PageSeo';
import { CITIES } from '../data/cities';
import { localizeCity } from '../data/cityI18n';
import { useLang } from '../i18n/useLang';
import { COPY } from '../locales/copy';

export default function Cities() {
  const lang = useLang();
  const c = COPY[lang].cities;
  const path = lang === 'en' ? '/cities' : `/${lang}/cities`;

  return (
    <>
      <PageSeo
        title={c.seoTitle}
        description={c.seoDesc}
        path={path}
        ogImage="https://laplandnightlife.com/images/hero/cities-rovaniemi-bridge.webp"
        jsonLd={[
          articleSchema(c.seoTitle, c.seoDesc, path),
          pillarBreadcrumb(c.heroH, path),
        ]}
      />

      <section className="relative pt-32 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: 'url(/images/hero/cities-rovaniemi-bridge.webp)' }}
          role="img"
          aria-label={`${c.heroH} — nightlife bars and clubs across Finnish Lapland`}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-night/60 via-night/80 to-night" />
        <div className="relative max-w-5xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-pink font-bold mb-3">{c.heroEyebrow}</p>
          <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl text-white tracking-tight mb-5">{c.heroH}</h1>
          <p className="text-white/75 text-lg max-w-2xl mx-auto leading-relaxed">
            {c.heroBody}
          </p>
        </div>
      </section>

      <PageBreadcrumb />

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {CITIES.map((city) => <CityCard key={city.slug} city={localizeCity(city, lang)} />)}
        </div>
      </section>
    </>
  );
}
