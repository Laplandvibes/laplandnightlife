import { Link } from 'react-router-dom';
import { Music, AlertTriangle, Phone, Calendar, ArrowRight } from 'lucide-react';
import Hero from '../components/Hero';
import BookingSection from '../components/BookingSection';
import PrimeTime from '../components/PrimeTime';
import CityCard from '../components/CityCard';
import GygWidget from '../components/GygWidget';
import AiraloAd from '../components/AiraloAd';
import Newsletter from '../components/Newsletter';
import PageSeo from '../components/PageSeo';
import { CITIES } from '../data/cities';
import { localizeCity } from '../data/cityI18n';
import { useLang, useLocalePath, type Lang } from '../i18n/useLang';
import { COPY } from '../locales/copy';

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
      ],
    },
  ];

  const homeCities = CITIES.slice(0, 8).map((c) => localizeCity(c, lang));

  const events = [
    { name: c.events.e1Name, when: c.events.e1When, desc: c.events.e1Desc },
    { name: c.events.e2Name, when: c.events.e2When, desc: c.events.e2Desc },
    { name: c.events.e3Name, when: c.events.e3When, desc: c.events.e3Desc },
  ];

  const tips = [
    { h: c.tips.t1H, icon: AlertTriangle, body: c.tips.t1Body, to: to('/tips') },
    { h: c.tips.t2H, icon: Music, body: c.tips.t2Body, to: to('/city/rovaniemi') },
    { h: c.tips.t3H, icon: Phone, body: c.tips.t3Body, to: to('/tips') },
    { h: c.tips.t4H, icon: Calendar, body: c.tips.t4Body, to: to('/summer-nights') },
  ];

  const scenes = [
    { tag: c.scenes.c1Tag, h: c.scenes.c1H, body: c.scenes.c1Body, desc: c.scenes.c1Desc, tint: 'from-pink/20 to-night-light', to: to('/city/oulu') },
    { tag: c.scenes.c2Tag, h: c.scenes.c2H, body: c.scenes.c2Body, desc: c.scenes.c2Desc, tint: 'from-aurora-blue/20 to-night-light', to: to('/city/levi') },
    { tag: c.scenes.c3Tag, h: c.scenes.c3H, body: c.scenes.c3Body, desc: c.scenes.c3Desc, tint: 'from-purple/25 to-night-light', to: to('/aurora-bars') },
    { tag: c.scenes.c4Tag, h: c.scenes.c4H, body: c.scenes.c4Body, desc: c.scenes.c4Desc, tint: 'from-neon-yellow/15 to-night-light', to: to('/city/sodankyla') },
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
              <Link key={sc.h} to={sc.to} className={`group bg-gradient-to-br ${sc.tint} border border-white/15 rounded-2xl p-5 text-left hover:border-pink/40 hover:-translate-y-1 transition-all`}>
                <p className="text-[0.7rem] uppercase tracking-[0.18em] text-pink font-bold mb-2">{sc.tag}</p>
                <h3 className="font-heading text-2xl text-white tracking-tight mb-1">{sc.h}</h3>
                <p className="text-sm text-white mb-1 font-semibold">{sc.body}</p>
                <p className="text-sm text-white/85 mb-3">{sc.desc}</p>
                <span className="text-[0.65rem] uppercase tracking-[0.18em] text-pink font-bold inline-flex items-center gap-1">
                  {c.scenes.go} <ArrowRight size={12} />
                </span>
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
                className="group bg-night-light/60 border border-white/10 rounded-xl p-5 hover:border-pink/30 hover:-translate-y-0.5 transition-all"
              >
                <p className="text-[0.65rem] uppercase tracking-[0.18em] text-pink font-bold mb-2">{e.when}</p>
                <h3 className="font-heading text-xl text-white tracking-tight mb-2 group-hover:text-pink transition-colors">{e.name}</h3>
                <p className="text-sm text-white/85 leading-relaxed">{e.desc}</p>
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {tips.map((t) => (
              <Link key={t.h} to={t.to} className="group flex flex-col bg-night-light/40 border border-white/10 rounded-xl p-5 hover:border-pink/40 hover:-translate-y-0.5 transition-all">
                <t.icon size={22} className="text-pink mb-3" />
                <h3 className="font-heading text-lg text-white tracking-tight mb-2">{t.h}</h3>
                <p className="text-sm text-white/85 leading-relaxed">{t.body}</p>
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

      <Newsletter />
    </>
  );
}
