import CityCard from '../components/CityCard';
import PageBreadcrumb from '../components/PageBreadcrumb';
import PageSeo, { pillarBreadcrumb, articleSchema } from '../components/PageSeo';
import { CITIES } from '../data/cities';
import { localizeCity } from '../data/cityI18n';
import { useLang, useLocalePath } from '../i18n/useLang';
import { COPY } from '../locales/copy';
import { UPLIFT } from '../locales/upliftI18n';

export default function Cities() {
  const lang = useLang();
  const to = useLocalePath();
  const c = COPY[lang].cities;
  const u = UPLIFT[lang];
  // useLocalePath maps pt-BR/zh-CN/ko to /br /cn /kr — raw `/${lang}/…`
  // produced double-prefixed client-side canonicals on those three locales.
  const path = to('/cities');

  // Stat band computed from the CITIES data itself — the numbers can never
  // drift from what the page below actually lists.
  const stats = [
    { v: String(CITIES.length), l: u.cityStats.cities },
    { v: String(CITIES.reduce((n, city) => n + city.venues.length, 0)), l: u.cityStats.venues },
    { v: String(CITIES.filter((city) => city.tag === 'Real scene').length), l: u.cityStats.scenes },
    { v: String(CITIES.filter((city) => city.tag === 'Ski resort').length), l: u.cityStats.ski },
  ];

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
          aria-label={`${c.heroH}: nightlife bars and clubs across Lapland and the North`}
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

      {/* Stat glass tiles (skiresorts recipe) — values derive from CITIES data. */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 border-t border-white/5 bg-night-light/40">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {stats.map((s) => (
            <div
              key={s.l}
              className="rounded-2xl border border-white/10 bg-night/60 backdrop-blur-md p-4 md:p-5 text-center shadow-[0_8px_30px_rgba(0,0,0,0.35)]"
            >
              <p className="font-heading text-4xl md:text-5xl text-pink leading-none mb-2">{s.v}</p>
              <p className="text-xs sm:text-sm text-white/75 leading-snug">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {CITIES.map((city) => <CityCard key={city.slug} city={localizeCity(city, lang)} />)}
        </div>
      </section>
    </>
  );
}
