import { useParams, Link } from 'react-router-dom';
import { MapPin, AlertTriangle, ArrowLeft, ArrowRight, ExternalLink, Sparkles, Sun, Camera, Music, BedDouble, CarFront, Beer, PawPrint, Trees, MountainSnow } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import PageSeo, { citySchema } from '../components/PageSeo';
import PageBreadcrumb from '../components/PageBreadcrumb';
import AffiliateCTA from '../components/AffiliateCTA';
import GygWidget from '../components/GygWidget';
import { CITIES, CITY_BY_SLUG } from '../data/cities';
import { localizeCity, localizeQuickFacts } from '../data/cityI18n';
import { getCrossLinks, NEARBY } from '../data/cityCrossLinks';
import { useLang, useLocalePath } from '../i18n/useLang';
import { COPY } from '../locales/copy';

const SHADOW = {
  textShadow:
    '0 2px 4px rgba(0,0,0,0.85), 0 4px 10px rgba(0,0,0,0.7), 0 8px 24px rgba(0,0,0,0.55)',
};

// GYG ranks by query relevance. "<City> Lapland" let the word "Lapland" pull
// Rovaniemi/Kemi bestsellers onto every city page (Vesa saw icebreaker cruises
// on /city/ivalo). Anchor each city to its own area; default = bare city name.
// Sister-site icons for the network cross-link cards.
const SISTER_ICON: Record<string, LucideIcon> = {
  LaplandStays: BedDouble,
  LaplandTransport: CarFront,
  LaplandBars: Beer,
  LaplandHuskySafaris: PawPrint,
  LaplandNature: Trees,
  LaplandSkiResorts: MountainSnow,
};

const GYG_CITY_Q: Record<string, string> = {
  ivalo: 'Ivalo Inari',
  inari: 'Inari Ivalo',
  saariselka: 'Saariselkä Ivalo',
  yllas: 'Ylläs Äkäslompolo',
  'pyha-luosto': 'Pyhä Luosto',
  kittila: 'Levi Kittilä',
  ruka: 'Ruka Kuusamo',
};

export default function CityPage() {
  const lang = useLang();
  const to = useLocalePath();
  const c = COPY[lang].cityPage;

  const { slug } = useParams<{ slug: string }>();
  const baseCity = slug ? CITY_BY_SLUG[slug] : undefined;

  if (!baseCity) {
    return (
      <section className="min-h-screen pt-32 px-4 text-center">
        <h1 className="font-heading text-5xl text-white mb-4">{c.notFoundH}</h1>
        <p className="text-white/70 mb-6">{c.notFoundBody}</p>
        <Link to={to('/cities')} className="text-pink underline">{c.notFoundLink}</Link>
      </section>
    );
  }

  const city = localizeCity(baseCity, lang);

  const PILLAR_LINKS = [
    { to: to('/aurora-bars'), label: c.pillar1, icon: Sparkles, why: c.pillar1Why },
    { to: to('/nightclubs'), label: c.pillar2, icon: Music, why: c.pillar2Why },
    { to: to('/summer-nights'), label: c.pillar3, icon: Sun, why: c.pillar3Why },
    { to: to('/photography'), label: c.pillar4, icon: Camera, why: c.pillar4Why },
  ];

  const description = `${city.pageTagline} ${city.intro.slice(0, 120)}`;
  const quickFacts = localizeQuickFacts(city.slug, lang);
  const crossLinks = getCrossLinks(city);
  const nearbySlugs = NEARBY[city.slug] ?? [];
  const nearbyCities = nearbySlugs
    .map((s) => CITIES.find((cc) => cc.slug === s))
    .filter((cc): cc is NonNullable<typeof cc> => Boolean(cc))
    .map((cc) => localizeCity(cc, lang));

  const path = lang === 'en' ? `/city/${city.slug}` : `/${lang}/city/${city.slug}`;

  return (
    <>
      <PageSeo
        title={`${city.name}: ${city.pageTagline}`}
        description={description}
        path={path}
        ogImage={`https://laplandnightlife.com${city.img}`}
        jsonLd={citySchema(city.name, city.slug, city.intro)}
      />

      <section className="relative min-h-[56vh] md:min-h-[62vh] pt-28 py-16 md:py-20 px-4 sm:px-6 lg:px-8 flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${city.img})` }}
          role="img"
          aria-label={`Aurora over a rooftop bar in ${city.name}: Lapland nightlife`}
        />
        {/* Left-weighted scrim darkens the upper-left headline zone over bright
            city photos; top fade + bottom fade keep the rest readable. */}
        <div className="absolute inset-0 bg-gradient-to-r from-night/85 via-night/40 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-night/70 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-night via-night/60 to-transparent pointer-events-none" />

        <div className="relative w-full max-w-5xl mx-auto">
          <Link
            to={to('/cities')}
            className="inline-flex items-center gap-2 text-white hover:text-pink mb-5 text-xs sm:text-sm uppercase tracking-wider font-bold"
            style={SHADOW}
          >
            <ArrowLeft size={14} /> {c.back}
          </Link>
          <p
            className="text-[0.7rem] sm:text-xs uppercase tracking-[0.25em] text-pink font-bold mb-3"
            style={SHADOW}
          >
            {city.tag} · {city.region}
          </p>
          <h1
            className="font-heading text-5xl sm:text-7xl md:text-8xl text-white tracking-tight leading-[0.95] mb-4"
            style={SHADOW}
          >
            {city.name}
          </h1>
          <p
            className="text-white italic text-xl sm:text-2xl md:text-3xl max-w-2xl leading-tight font-medium"
            style={SHADOW}
          >
            {city.pageTagline}
          </p>
        </div>
      </section>

      <PageBreadcrumb />

      {quickFacts.length > 0 && (
        <section className="py-8 px-4 sm:px-6 lg:px-8 border-t border-white/5 bg-night-light/40">
          <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {quickFacts.map((f) => (
              <div
                key={f.label}
                className="bg-night-light/60 border border-white/10 rounded-xl p-3 sm:p-4 text-center sm:text-left"
              >
                <p className="text-[0.6rem] sm:text-[0.65rem] uppercase tracking-[0.18em] text-pink font-bold mb-1">
                  {f.label}
                </p>
                <p className="font-heading text-base sm:text-lg text-white tracking-tight leading-tight">
                  {f.value}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <p className="text-white/85 text-base sm:text-lg leading-relaxed">{city.intro}</p>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-xs uppercase tracking-[0.25em] text-pink font-bold mb-3">{c.verifiedEyebrow}</p>
            <h2 className="font-heading text-3xl sm:text-4xl text-white tracking-tight">
              {c.verifiedH(city.name)}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {city.venues.map((v) => (
              <div
                key={v.name}
                className="bg-night-light/40 border border-white/10 rounded-xl p-5 hover:border-pink/30 hover:-translate-y-0.5 transition-all"
              >
                <p className="text-[0.6rem] uppercase tracking-[0.2em] text-pink font-bold mb-1">{v.type}</p>
                <h3 className="font-heading text-xl text-white tracking-tight mb-2">{v.name}</h3>
                <p className="text-sm text-white/70 leading-relaxed">{v.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-night-light/30 border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle className="text-neon-yellow" size={20} />
            <h2 className="font-heading text-3xl text-white tracking-tight">{c.intel}</h2>
          </div>
          <ul className="space-y-3">
            {city.knowList.map((k, i) => (
              <li key={i} className="flex gap-3 bg-night-light/40 border border-white/10 rounded-lg p-4">
                <span className="text-pink font-heading text-xl leading-none">·</span>
                <span className="text-sm text-white/80 leading-relaxed">{k}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-xs uppercase tracking-[0.25em] text-pink font-bold mb-3">{c.gygEyebrow}</p>
            <h2 className="font-heading text-3xl sm:text-4xl text-white tracking-tight mb-2">
              {c.gygH(city.name)}
            </h2>
            <p className="text-white/65 max-w-xl mx-auto">
              {c.gygBody}
            </p>
          </div>
          <GygWidget query={GYG_CITY_Q[city.slug] ?? city.name} campaign={`city_${city.slug}`} count={6} />
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-xs uppercase tracking-[0.25em] text-pink font-bold mb-3">{c.deeperEyebrow}</p>
            <h2 className="font-heading text-3xl sm:text-4xl text-white tracking-tight">
              {c.deeperH(city.name)}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {PILLAR_LINKS.map((p) => (
              <Link
                key={p.to}
                to={p.to}
                className="group bg-night-light/40 border border-white/10 rounded-xl p-5 hover:border-pink/40 hover:-translate-y-0.5 transition-all"
              >
                <p.icon size={22} className="text-pink mb-3" strokeWidth={1.6} />
                <p className="font-heading text-lg text-white tracking-tight mb-1.5 group-hover:text-pink transition-colors">
                  {p.label}
                </p>
                <p className="text-xs text-white/80 leading-relaxed mb-3">{p.why}</p>
                <span className="text-[0.65rem] uppercase tracking-[0.18em] text-pink font-bold inline-flex items-center gap-1">
                  {c.read} <ArrowRight size={12} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {crossLinks.length > 0 && (
        <section className="relative py-16 px-4 sm:px-6 lg:px-8 bg-night-light/30 border-t border-white/5 overflow-hidden">
          {/* Ambient warmth — this section was a wall of identical dark cards
              (Vesa 2026-07-06: "väriä ja valoa"). */}
          <div className="absolute -top-24 left-1/4 w-[560px] h-[240px] bg-amber-400/10 rounded-full blur-[110px] pointer-events-none" />
          <div className="absolute -bottom-24 right-1/5 w-[460px] h-[220px] bg-pink/10 rounded-full blur-[110px] pointer-events-none" />
          <div className="relative max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <p className="text-xs uppercase tracking-[0.25em] text-neon-yellow font-bold mb-3 drop-shadow-[0_0_16px_rgba(250,204,21,0.45)]">{c.sisterEyebrow}</p>
              <h2 className="font-heading text-3xl sm:text-4xl text-white tracking-tight mb-2">
                {c.sisterH(city.name)}
              </h2>
              <p className="text-white/80 max-w-xl mx-auto">
                {c.sisterBody}
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {crossLinks.map((l) => {
                const Icon = SISTER_ICON[l.site] ?? ExternalLink;
                return (
                  <a
                    key={l.url}
                    href={l.url}
                    target="_blank"
                    rel="noopener"
                    className="group relative overflow-hidden bg-night-light/40 border rounded-xl p-5 hover:-translate-y-1 transition-all flex flex-col"
                    style={{ borderColor: `${l.accent}45` }}
                  >
                    <span
                      className="absolute inset-x-0 top-0 h-[3px]"
                      style={{ background: `linear-gradient(90deg, ${l.accent}, transparent)` }}
                      aria-hidden="true"
                    />
                    <span
                      className="absolute -top-10 -left-10 w-40 h-40 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity pointer-events-none"
                      style={{ background: `${l.accent}2E` }}
                      aria-hidden="true"
                    />
                    <div className="relative flex items-start justify-between mb-3">
                      <span
                        className="inline-flex items-center justify-center w-9 h-9 rounded-lg"
                        style={{ background: `${l.accent}1F`, color: l.accent, boxShadow: `0 0 18px ${l.accent}40` }}
                      >
                        <Icon size={18} strokeWidth={1.8} />
                      </span>
                      <ExternalLink size={13} style={{ color: l.accent }} />
                    </div>
                    <p className="relative text-[0.6rem] uppercase tracking-[0.18em] font-bold mb-1.5" style={{ color: l.accent }}>{l.site}</p>
                    <p className="relative font-heading text-base text-white tracking-tight mb-2 leading-snug">
                      {l.label}
                    </p>
                    <p className="relative text-xs text-white/80 leading-relaxed">{l.why}</p>
                  </a>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {nearbyCities.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/5">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <p className="text-xs uppercase tracking-[0.25em] text-pink font-bold mb-3">{c.nearbyEyebrow}</p>
              <h2 className="font-heading text-3xl sm:text-4xl text-white tracking-tight">
                {c.nearbyH(city.name)}
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {nearbyCities.map((cc) => (
                <Link
                  key={cc.slug}
                  to={to(`/city/${cc.slug}`)}
                  className="group relative overflow-hidden rounded-xl border border-white/10 hover:border-pink/40 transition-all hover:-translate-y-0.5"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                    style={{ backgroundImage: `url(${cc.img})` }}
                    aria-hidden="true"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-night via-night/70 to-transparent" />
                  <div className="relative p-4 min-h-[160px] flex flex-col justify-end">
                    <p className="text-[0.6rem] uppercase tracking-[0.18em] text-pink font-bold mb-1" style={SHADOW}>
                      {cc.tag}
                    </p>
                    <h3 className="font-heading text-xl text-white tracking-tight mb-1" style={SHADOW}>
                      {cc.name}
                    </h3>
                    <p className="text-xs text-white/80 line-clamp-2" style={SHADOW}>{cc.blurb}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <MapPin className="text-pink mx-auto mb-3" size={26} />
          <h2 className="font-heading text-3xl text-white tracking-tight mb-3">{c.stayH(city.name)}</h2>
          <p className="text-white/65 mb-6 max-w-xl mx-auto">
            {c.stayBody}
          </p>
          <AffiliateCTA
            partner="hotels"
            sid={`city_${city.slug}_cta`}
            destination={city.name}
            className="inline-flex items-center gap-2 bg-pink hover:bg-pink-dark text-white font-bold py-4 px-8 rounded-xl text-sm uppercase tracking-wider transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-pink/30"
          >
            {c.stayBtn(city.name)}
          </AffiliateCTA>
        </div>
      </section>
    </>
  );
}
