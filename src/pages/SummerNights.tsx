import { Link } from 'react-router-dom';
import { Sun, Flame, Music, Camera, Waves, Bike, Compass, Film } from 'lucide-react';
import PageSeo, { pillarBreadcrumb, articleSchema } from '../components/PageSeo';
import PageBreadcrumb from '../components/PageBreadcrumb';
import GygWidget from '../components/GygWidget';
import AffiliateCTA from '../components/AffiliateCTA';
import { IMG } from '../data/images';
import { useLang, useLocalePath } from '../i18n/useLang';
import { COPY } from '../locales/copy';

const SHADOW = {
  textShadow:
    '0 2px 4px rgba(0,0,0,0.85), 0 4px 10px rgba(0,0,0,0.7), 0 8px 24px rgba(0,0,0,0.55)',
};

export default function SummerNights() {
  const lang = useLang();
  const to = useLocalePath();
  const c = COPY[lang].summer;
  // useLocalePath maps pt-BR/zh-CN/ko to /br /cn /kr — raw `/${lang}/…`
  // produced double-prefixed client-side canonicals on those three locales.
  const path = to('/summer-nights');

  const cityScenes = [
    { city: c.cs1City, when: c.cs1When, body: c.cs1Body, img: IMG.summerOulu, to: to('/city/oulu') },
    { city: c.cs2City, when: c.cs2When, body: c.cs2Body, img: IMG.summerRovaniemi, to: to('/city/rovaniemi') },
    { city: c.cs3City, when: c.cs3When, body: c.cs3Body, img: IMG.summerSodankyla, to: to('/city/sodankyla') },
  ];

  const events = [
    { h: c.e1H, when: c.e1When, body: c.e1Body, icon: Sun, img: IMG.summerHero, badge: c.e1Badge },
    { h: c.e2H, when: c.e2When, body: c.e2Body, icon: Film, img: IMG.summerSodankyla, badge: c.e2Badge },
    { h: c.e3H, when: c.e3When, body: c.e3Body, icon: Flame, img: IMG.summerJuhannus, badge: c.e3Badge },
    { h: c.e4H, when: c.e4When, body: c.e4Body, icon: Music, img: IMG.summerAirGuitar, badge: c.e4Badge },
    { h: c.e5H, when: c.e5When, body: c.e5Body, icon: Music, img: IMG.summerOulu, badge: c.e5Badge },
    { h: c.e6H, when: c.e6When, body: c.e6Body, icon: Music, img: IMG.summerJazz, badge: c.e6Badge },
    { h: c.e7H, when: c.e7When, body: c.e7Body, icon: Music, img: IMG.summerNordkapp, badge: c.e7Badge },
    { h: c.e8H, when: c.e8When, body: c.e8Body, icon: Music, img: IMG.summerRovaniemi, badge: c.e8Badge },
  ];

  const timeline = [
    { time: '18:00', label: c.t1L, body: c.t1Body },
    { time: '21:00', label: c.t2L, body: c.t2Body },
    { time: '00:00', label: c.t3L, body: c.t3Body },
    { time: '02:00', label: c.t4L, body: c.t4Body },
    { time: '05:00', label: c.t5L, body: c.t5Body },
  ];

  const localList = [
    { icon: Flame, h: c.l1H, body: c.l1Body, img: IMG.summerSauna },
    { icon: Sun, h: c.l2H, body: c.l2Body, img: IMG.summerJazz },
    { icon: Bike, h: c.l3H, body: c.l3Body, img: IMG.summerCycle },
    { icon: Compass, h: c.l4H, body: c.l4Body, img: IMG.summerNordkapp },
    { icon: Waves, h: c.l5H, body: c.l5Body, img: IMG.summerSwim },
  ];

  return (
    <>
      <PageSeo
        title={c.seoTitle}
        description={c.seoDesc}
        path={path}
        jsonLd={[
          articleSchema(c.seoTitle, c.seoDesc, path),
          pillarBreadcrumb(c.h1, path),
        ]}
      />

      <section className="relative">
        <div className="relative h-[55svh] sm:h-[60svh] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${IMG.summerHero})` }}
            role="img"
            aria-label="Midnight sun over a Finnish Lapland summer night, open-air bars and festivals"
          />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-night to-transparent pointer-events-none" />

          <div className="absolute top-24 right-4 sm:right-8">
            <div className="inline-flex items-center gap-2 bg-night/70 border border-neon-yellow/50 backdrop-blur-md rounded-full px-3.5 py-1.5">
              <Sun size={12} className="text-neon-yellow" />
              <span className="text-[0.6rem] uppercase tracking-[0.22em] text-neon-yellow font-bold">
                {c.badge}
              </span>
            </div>
          </div>
        </div>

        {/* overflow-hidden: the 700px blur circle extended the layout viewport
            to 538px on 375px mobile (zoom-out overflow) without it. */}
        <div className="relative bg-night px-4 sm:px-6 lg:px-8 py-14 sm:py-20 border-b border-white/5 overflow-hidden">
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-[700px] h-[200px] bg-amber-300/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="relative max-w-4xl mx-auto text-center">
            <p className="text-[0.65rem] uppercase tracking-[0.32em] text-neon-yellow font-bold mb-4">
              {c.pillar}
            </p>
            <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white tracking-tight leading-[0.95] mb-6">
              {c.h1}
            </h1>
            <p className="text-white/90 text-lg sm:text-xl md:text-2xl leading-snug font-light max-w-2xl mx-auto">
              {c.sub}
            </p>
          </div>
        </div>
      </section>

      <PageBreadcrumb />

      {/* Concrete stat strip — replaced the old three-paragraph editorial intro
          ("the opposite of what the brochures sell") that nobody read and that
          translated badly (Vesa 2026-07-06). */}
      <section className="relative py-14 sm:py-16 px-4 sm:px-6 lg:px-8 border-t border-white/5 overflow-hidden">
        <div className="absolute -top-20 left-1/4 w-[520px] h-[240px] bg-amber-400/10 rounded-full blur-[110px] pointer-events-none" />
        <div className="absolute -bottom-20 right-1/4 w-[420px] h-[200px] bg-pink/10 rounded-full blur-[110px] pointer-events-none" />
        <div className="relative max-w-5xl mx-auto">
          <p className="text-center text-xs uppercase tracking-[0.25em] text-neon-yellow font-bold mb-8 drop-shadow-[0_0_16px_rgba(250,204,21,0.45)]">
            {c.statsEyebrow}
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {[
              { v: c.stat1V, l: c.stat1L },
              { v: c.stat2V, l: c.stat2L },
              { v: c.stat3V, l: c.stat3L },
              { v: c.stat4V, l: c.stat4L },
            ].map((s) => (
              <div
                key={s.v}
                className="bg-night-light/40 border border-neon-yellow/20 hover:border-neon-yellow/50 rounded-2xl p-5 sm:p-6 text-center transition-colors"
              >
                <p className="font-heading text-4xl sm:text-5xl text-neon-yellow tracking-tight leading-none mb-2 drop-shadow-[0_0_24px_rgba(250,204,21,0.5)]">
                  {s.v}
                </p>
                <p className="text-xs sm:text-sm text-white/75 leading-snug">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-t border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 via-transparent to-pink/5 pointer-events-none" />
        <div className="relative max-w-5xl mx-auto">
          <div className="text-center mb-10 sm:mb-12">
            <p className="text-xs uppercase tracking-[0.25em] text-neon-yellow font-bold mb-3">{c.timeEyebrow}</p>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
              {c.timeH}
            </h2>
          </div>
          <ol className="relative border-l-2 border-neon-yellow/30 pl-6 sm:pl-8 space-y-6 sm:space-y-8 max-w-2xl mx-auto">
            {timeline.map((t) => (
              <li key={t.time} className="relative">
                <span className="absolute -left-[2.1rem] sm:-left-[2.6rem] top-1 w-4 h-4 rounded-full bg-neon-yellow shadow-[0_0_18px_rgba(250,204,21,0.7)]" />
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-4">
                  <p className="font-heading text-2xl sm:text-3xl text-neon-yellow tracking-tight w-24 shrink-0">{t.time}</p>
                  <div>
                    <h3 className="font-heading text-xl text-white tracking-tight mb-1">{t.label}</h3>
                    <p className="text-sm sm:text-base text-white/70 leading-relaxed">{t.body}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-night-light/30 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-[0.25em] text-pink font-bold mb-3">{c.csEyebrow}</p>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
              {c.csH}
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {cityScenes.map((s) => (
              <Link
                key={s.city}
                to={s.to}
                className="group relative overflow-hidden rounded-2xl border border-white/10 hover:border-neon-yellow/50 transition-all hover:-translate-y-1 min-h-[360px] flex"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                  style={{ backgroundImage: `url(${s.img})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-night via-night/80 to-night/20" />
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-transparent" />
                <div className="relative p-6 flex flex-col justify-end w-full">
                  <p className="text-[0.65rem] uppercase tracking-[0.22em] text-neon-yellow font-bold mb-2" style={SHADOW}>
                    {s.when}
                  </p>
                  <h3 className="font-heading text-3xl text-white tracking-tight mb-3 group-hover:text-neon-yellow transition-colors" style={SHADOW}>
                    {s.city}
                  </h3>
                  <p className="text-sm text-white/85 leading-relaxed mb-3" style={SHADOW}>{s.body}</p>
                  <span className="text-[0.65rem] uppercase tracking-[0.18em] text-neon-yellow font-bold">
                    {c.readCity}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-[0.25em] text-pink font-bold mb-3">{c.evEyebrow}</p>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
              {c.evH}
            </h2>
            <p className="text-white/65 max-w-2xl mx-auto mt-3">
              {c.evBody}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {events.map((e) => (
              <article
                key={e.h}
                className="group relative overflow-hidden rounded-2xl border border-white/10 hover:border-neon-yellow/50 transition-all hover:-translate-y-1 min-h-[340px] flex flex-col"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                  style={{ backgroundImage: `url(${e.img})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-night via-night/85 to-night/30" />
                <div className="relative p-5 flex flex-col h-full">
                  <div className="flex items-start justify-between mb-4">
                    <e.icon size={26} className="text-neon-yellow drop-shadow-[0_0_18px_rgba(250,204,21,0.6)]" strokeWidth={1.5} />
                    <span
                      className="text-[0.55rem] uppercase tracking-[0.22em] font-bold text-white bg-black/40 backdrop-blur-md border border-white/30 rounded-full px-2.5 py-1"
                      style={SHADOW}
                    >
                      {e.badge}
                    </span>
                  </div>
                  <div className="mt-auto">
                    <p className="text-[0.65rem] uppercase tracking-[0.2em] text-neon-yellow font-bold mb-2" style={SHADOW}>{e.when}</p>
                    <h3 className="font-heading text-xl text-white tracking-tight mb-2 leading-tight" style={SHADOW}>{e.h}</h3>
                    <p className="text-xs sm:text-sm text-white/85 leading-relaxed line-clamp-3" style={SHADOW}>{e.body}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-night-light/30 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-[0.25em] text-pink font-bold mb-3">{c.localEyebrow}</p>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
              {c.localH}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {localList.map((l, i) => (
              <article
                key={l.h}
                className="group relative overflow-hidden rounded-2xl border border-white/10 hover:border-neon-yellow/50 transition-all hover:-translate-y-1 min-h-[300px] flex"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                  style={{ backgroundImage: `url(${l.img})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-night via-night/75 to-night/20" />
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/15 via-transparent to-transparent" />
                <div className="relative p-5 flex flex-col w-full">
                  <div className="flex items-start gap-3 mb-3">
                    <span className="font-heading text-4xl text-neon-yellow leading-none drop-shadow-[0_0_18px_rgba(250,204,21,0.6)]" style={SHADOW}>0{i + 1}</span>
                    <l.icon size={22} className="text-neon-yellow mt-2 drop-shadow-[0_0_18px_rgba(250,204,21,0.6)]" strokeWidth={1.6} />
                  </div>
                  <div className="mt-auto">
                    <h3 className="font-heading text-xl text-white tracking-tight mb-2" style={SHADOW}>{l.h}</h3>
                    <p className="text-sm text-white/85 leading-relaxed" style={SHADOW}>{l.body}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-xs uppercase tracking-[0.25em] text-neon-yellow font-bold mb-3">{c.gygEyebrow}</p>
            <h2 className="font-heading text-3xl sm:text-4xl text-white tracking-tight mb-2">
              {c.gygH}
            </h2>
            <p className="text-white/65 max-w-xl mx-auto">
              {c.gygBody}
            </p>
          </div>
          {/* Query must title-match GYG tours ("Midnight Sun ...") with a city
              anchor. Generic words (Lapland/summer/activities) dilute the match
              and GYG falls back to destination bestsellers = winter tours
              (Vesa 2026-07-07; same failure class as the Ivalo city-page fix). */}
          <GygWidget query="midnight sun Rovaniemi" campaign="summer_pillar" count={6} />
        </div>
      </section>

      <section
        className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-t border-white/5 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, rgba(250,204,21,0.08) 0%, rgba(236,72,153,0.06) 100%)' }}
      >
        <div className="max-w-5xl mx-auto grid sm:grid-cols-2 gap-5">
          <div className="bg-night-light/50 border border-white/10 rounded-2xl p-7 flex flex-col">
            <Camera className="text-neon-yellow mb-3" size={26} />
            <h3 className="font-heading text-2xl text-white tracking-tight mb-3">
              {c.photoH}
            </h3>
            <p className="text-white/85 mb-5 flex-1">
              {c.photoBody}
            </p>
            <Link
              to={to('/photography')}
              className="inline-flex items-center gap-2 self-start bg-night/70 border border-neon-yellow/40 hover:border-neon-yellow text-white font-bold py-3 px-6 rounded-xl text-xs uppercase tracking-wider transition-all hover:-translate-y-0.5"
            >
              {c.photoBtn}
            </Link>
          </div>
          <div className="bg-gradient-to-br from-pink/15 to-purple/10 border border-pink/20 rounded-2xl p-7 flex flex-col">
            <Sun className="text-neon-yellow mb-3" size={26} />
            <h3 className="font-heading text-2xl text-white tracking-tight mb-3">
              {c.stayH}
            </h3>
            <p className="text-white/85 mb-5 flex-1">
              {c.stayBody}
            </p>
            <AffiliateCTA
              partner="hotels"
              sid="summer_nights_cta"
              destination="Lapland"
              className="inline-flex items-center gap-2 self-start bg-neon-yellow hover:bg-amber-300 text-night font-bold py-3 px-6 rounded-xl text-xs uppercase tracking-wider transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-neon-yellow/30"
            >
              {c.stayBtn}
            </AffiliateCTA>
          </div>
        </div>
      </section>
    </>
  );
}
