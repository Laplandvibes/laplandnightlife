import { Link } from 'react-router-dom';
import { Music, AlertTriangle, Phone, Calendar, ArrowRight } from 'lucide-react';
import Hero from '../components/Hero';
import BookingSection from '../components/BookingSection';
import PrimeTime from '../components/PrimeTime';
import CityCard from '../components/CityCard';
import GygWidget from '../components/GygWidget';
import AiraloAd from '../components/AiraloAd';
import Newsletter from '../components/Newsletter';
import FAQ from '../components/FAQ';
import PageSeo from '../components/PageSeo';
import { CITIES } from '../data/cities';
import { localizeCity } from '../data/cityI18n';
import { IMG } from '../data/images';
import { useLang, useLocalePath, type Lang } from '../i18n/useLang';
import { COPY } from '../locales/copy';

// Text-shadow for copy that sits over a photo (same recipe as PrimeTime).
const OVERLAY_SHADOW = { textShadow: '0 2px 4px rgba(0,0,0,0.85), 0 4px 10px rgba(0,0,0,0.7)' };

// Localized lead for the "before you go" connectivity strip that frames the
// Airalo ad. Kept inline (not in copy.ts) so the ad placement is self-contained.
const CONNECT_LEAD: Record<Lang, { eyebrow: string; h: string }> = {
  en: { eyebrow: 'Before you go', h: 'Sort your data before the night starts' },
  fi: { eyebrow: 'Ennen lähtöä', h: 'Hoida netti kuntoon ennen kuin ilta alkaa' },
  de: { eyebrow: 'Vor der Reise', h: 'Regle deine Daten, bevor die Nacht beginnt' },
  ja: { eyebrow: '出発前に', h: '夜が始まる前に、データの準備を' },
  es: { eyebrow: 'Antes de salir', h: 'Resuelve tus datos antes de que empiece la noche' },
  'pt-BR': { eyebrow: 'Antes de ir', h: 'Resolva sua internet antes de a noite começar' },
  'zh-CN': { eyebrow: '出发之前', h: '夜生活开始前,先把流量准备好' },
  ko: { eyebrow: '떠나기 전에', h: '밤이 시작되기 전에 데이터부터 챙기세요' },
  fr: { eyebrow: 'Avant de partir', h: 'Réglez votre data avant que la nuit commence' },
  it: { eyebrow: 'Prima di partire', h: 'Sistema i dati prima che inizi la notte' },
  nl: { eyebrow: 'Voordat je gaat', h: 'Regel je data voordat de nacht begint' },
};

export default function Home() {
  const lang = useLang();
  const to = useLocalePath();
  const c = COPY[lang].home;
  const connect = CONNECT_LEAD[lang];

  const homeJsonLd = [
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: c.faq1Q, acceptedAnswer: { '@type': 'Answer', text: c.faq1A } },
        { '@type': 'Question', name: c.faq2Q, acceptedAnswer: { '@type': 'Answer', text: c.faq2A } },
        { '@type': 'Question', name: c.faq3Q, acceptedAnswer: { '@type': 'Answer', text: c.faq3A } },
        { '@type': 'Question', name: c.faq4Q, acceptedAnswer: { '@type': 'Answer', text: c.faq4A } },
        { '@type': 'Question', name: c.faq5Q, acceptedAnswer: { '@type': 'Answer', text: c.faq5A } },
      ],
    },
  ];

  const homeCities = CITIES.slice(0, 8).map((c) => localizeCity(c, lang));

  const events = [
    { name: c.events.e1Name, when: c.events.e1When, desc: c.events.e1Desc, img: IMG.iceCastle },
    { name: c.events.e2Name, when: c.events.e2When, desc: c.events.e2Desc, img: IMG.primeFilm },
    { name: c.events.e3Name, when: c.events.e3When, desc: c.events.e3Desc, img: IMG.pillarEvents },
  ];

  const tips = [
    { h: c.tips.t1H, icon: AlertTriangle, body: c.tips.t1Body, to: to('/tips') },
    { h: c.tips.t2H, icon: Music, body: c.tips.t2Body, to: to('/city/rovaniemi') },
    { h: c.tips.t3H, icon: Phone, body: c.tips.t3Body, to: to('/tips') },
    { h: c.tips.t4H, icon: Calendar, body: c.tips.t4Body, to: to('/summer-nights') },
  ];

  const scenes = [
    { tag: c.scenes.c1Tag, h: c.scenes.c1H, body: c.scenes.c1Body, desc: c.scenes.c1Desc, img: IMG.pubScene, accent: '#EC4899', to: to('/city/oulu') },
    { tag: c.scenes.c2Tag, h: c.scenes.c2H, body: c.scenes.c2Body, desc: c.scenes.c2Desc, img: IMG.pillarNightclubs, accent: '#38BDF8', to: to('/city/levi') },
    { tag: c.scenes.c3Tag, h: c.scenes.c3H, body: c.scenes.c3Body, desc: c.scenes.c3Desc, img: IMG.pillarAuroraBars, accent: '#A78BFA', to: to('/aurora-bars') },
    { tag: c.scenes.c4Tag, h: c.scenes.c4H, body: c.scenes.c4Body, desc: c.scenes.c4Desc, img: IMG.pillarSummer, accent: '#FACC15', to: to('/city/sodankyla') },
  ];

  return (
    <>
      <PageSeo
        title={c.seoTitle}
        description={c.seoDesc}
        path={lang === 'en' ? '/' : `/${lang}`}
        jsonLd={homeJsonLd}
      />

      <Hero />

      <PrimeTime />

      <section className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-[0.25em] text-pink font-bold mb-3">{c.tours.eyebrow}</p>
            <h2 className="font-heading text-4xl sm:text-5xl text-white tracking-tight mb-3">{c.tours.h}</h2>
            <p className="text-white/85 max-w-xl mx-auto">{c.tours.body}</p>
          </div>
          <GygWidget query="Rovaniemi nightlife aurora" campaign="home_tours_top" count={6} />
        </div>
      </section>

      <section className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="font-heading text-4xl sm:text-5xl text-white mb-4 tracking-tight">
            {c.scenes.h}
          </h2>
          <p className="text-white/85 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto mb-10 sm:mb-12">
            {c.scenes.body}
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {scenes.map((sc) => (
              <Link
                key={sc.h}
                to={sc.to}
                className="group relative flex flex-col min-h-[260px] overflow-hidden rounded-2xl border border-white/10 hover:border-white/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_50px_-20px_rgba(236,72,153,0.35)] text-left"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                  style={{ backgroundImage: `url(${sc.img})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-night from-8% via-night/85 via-[58%] to-night/25 pointer-events-none" />
                <div className="relative mt-auto p-5">
                  <p className="text-[0.62rem] uppercase tracking-[0.2em] font-bold mb-1.5" style={{ ...OVERLAY_SHADOW, color: sc.accent }}>{sc.tag}</p>
                  <h3 className="font-heading text-2xl text-white tracking-tight mb-1" style={OVERLAY_SHADOW}>{sc.h}</h3>
                  <p className="text-sm text-white font-semibold mb-0.5" style={OVERLAY_SHADOW}>{sc.body}</p>
                  <p className="text-xs text-white/75 mb-3 leading-snug" style={OVERLAY_SHADOW}>{sc.desc}</p>
                  <span className="text-[0.62rem] uppercase tracking-[0.18em] font-bold inline-flex items-center gap-1" style={{ ...OVERLAY_SHADOW, color: sc.accent }}>
                    {c.scenes.go} <ArrowRight size={12} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <BookingSection />

      <section className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8 sm:mb-10">
            <p className="text-xs uppercase tracking-[0.25em] text-pink font-bold mb-3">{connect.eyebrow}</p>
            <h2 className="font-heading text-3xl sm:text-4xl text-white tracking-tight text-balance">{connect.h}</h2>
          </div>
          <AiraloAd sid="home_connectivity" />
        </div>
      </section>

      <section className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-12">
            <p className="text-xs uppercase tracking-[0.25em] text-pink font-bold mb-3">{c.cities.eyebrow}</p>
            <h2 className="font-heading text-4xl sm:text-5xl text-white tracking-tight mb-3">{c.cities.h}</h2>
            <p className="text-white/85 max-w-2xl mx-auto">{c.cities.body}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {homeCities.map((city) => <CityCard key={city.slug} city={city} />)}
          </div>
          <div className="text-center mt-10">
            <Link to={to('/cities')} className="inline-flex items-center gap-2 text-pink hover:text-pink-dark font-semibold uppercase tracking-wider text-sm">
              {c.cities.all}
            </Link>
          </div>
        </div>
      </section>

      <section className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-night-light/30 border-t border-white/5 overflow-hidden">
        <div className="absolute top-1/2 -right-20 w-[400px] h-[400px] bg-pink/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-[0.25em] text-pink font-bold mb-3">{c.events.eyebrow}</p>
            <h2 className="font-heading text-4xl sm:text-5xl text-white tracking-tight">{c.events.h}</h2>
          </div>
          <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-4">
            {events.map((e) => (
              <Link
                key={e.name}
                to={to('/events')}
                className="group relative flex flex-col min-h-[320px] overflow-hidden rounded-2xl border border-white/10 hover:border-pink/40 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_-20px_rgba(236,72,153,0.4)]"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                  style={{ backgroundImage: `url(${e.img})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-night from-5% via-night/80 via-[60%] to-night/20 pointer-events-none" />
                {/* Date as a top pill (own dark backing) so it stays legible on any
                    image regardless of how tall the body copy below runs. */}
                <div className="relative p-5">
                  <span
                    className="inline-block text-[0.6rem] uppercase tracking-[0.2em] font-bold text-white bg-black/45 backdrop-blur-md border border-white/25 rounded-full px-2.5 py-1"
                    style={OVERLAY_SHADOW}
                  >
                    {e.when}
                  </span>
                </div>
                <div className="relative mt-auto p-6 pt-0">
                  <h3 className="font-heading text-2xl text-white tracking-tight mb-2 group-hover:text-pink transition-colors" style={OVERLAY_SHADOW}>{e.name}</h3>
                  <p className="text-sm text-white/90 leading-relaxed line-clamp-4" style={OVERLAY_SHADOW}>{e.desc}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to={to('/events')} className="inline-flex items-center gap-2 text-pink hover:text-pink-dark font-semibold uppercase tracking-wider text-sm">
              {c.events.full}
            </Link>
          </div>
        </div>
      </section>

      <section className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-[0.25em] text-pink font-bold mb-3">{c.tips.eyebrow}</p>
            <h2 className="font-heading text-4xl sm:text-5xl text-white tracking-tight">{c.tips.h}</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {tips.map((t) => (
              <Link key={t.h} to={t.to} className="group flex items-start gap-3.5 bg-night-light/40 border border-white/10 rounded-xl p-4 hover:border-pink/40 transition-all">
                <span className="shrink-0 grid place-items-center w-9 h-9 rounded-lg bg-pink/10 text-pink">
                  <t.icon size={18} />
                </span>
                <div className="min-w-0">
                  <h3 className="font-heading text-base text-white tracking-tight mb-0.5 group-hover:text-pink transition-colors">{t.h}</h3>
                  <p className="text-[0.8rem] text-white/80 leading-snug">{t.body}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to={to('/tips')} className="inline-flex items-center gap-2 text-pink hover:text-pink-dark font-semibold uppercase tracking-wider text-sm">
              {c.tips.all}
            </Link>
          </div>
        </div>
      </section>

      <FAQ />

      <Newsletter />
    </>
  );
}
