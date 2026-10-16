import { Link } from 'react-router-dom';
import { Sparkles, Clock, Moon, ShieldAlert, Store, Car, MapPin } from 'lucide-react';
import PageSeo, { articleSchema, pillarBreadcrumb } from '../components/PageSeo';
import PillarHero from '../components/PillarHero';
import GygWidget from '../components/GygWidget';
import AffiliateCTA from '../components/AffiliateCTA';
import { IMG } from '../data/images';
import { useLang, useLocalePath } from '../i18n/useLang';
import { COPY } from '../locales/copy';

/* Uudenvuodenaatto Lapissa (16.10.2026). Kysynta OpenSEO 16.10.: it "capodanno in
   lapponia" 390/kk, de "silvester lappland" 260, en-UK "new year in lapland" 170,
   fr 140, nl 110, es 70 (memory/_liiketoiminta/02-LaplandVibes/SEO/LAPLANDNIGHTLIFE-AUDIT-20261016.md).
   Jokainen fakta on copyssa lahteen vuoden kanssa; lahteet: side-session-notes
   uusivuosi-rovaniemi-oulu.md, uusivuosi-keskukset.md, uusivuosi-kaytanto.md.
   🔴 Vuoden 2026 ohjelmat julkaistaan yleensa 17.–30.12.: paivita kortit silloin
   ja vaihda copyn `checked`-rivi. */

// Kortin jarjestys + kaupunkisivu, jolle kortti linkittaa (null = ei omaa sivua).
const TOWNS: { id: string; slug: string | null }[] = [
  { id: 'rovaniemi', slug: 'rovaniemi' },
  { id: 'levi', slug: 'levi' },
  { id: 'yllas', slug: 'yllas' },
  { id: 'pyha', slug: 'pyha-luosto' },
  { id: 'ruka', slug: 'ruka' },
  { id: 'saariselka', slug: 'saariselka' },
  { id: 'kemi', slug: 'kemi' },
  { id: 'tornio', slug: null },
  { id: 'oulu', slug: 'oulu' },
];

type Town = { name: string; when: string; body: string; note: string };

export default function NewYear() {
  const lang = useLang();
  const to = useLocalePath();
  const c = COPY[lang].newYear;
  const path = to('/new-year');
  const townCopy = c.towns as Record<string, Town | undefined>;

  const towns = TOWNS.flatMap((t) => {
    const tx = townCopy[t.id];
    return tx ? [{ ...t, ...tx }] : [];
  });

  const jsonLd = [
    articleSchema(c.seoTitle, c.seoDesc, path),
    pillarBreadcrumb(c.heroTitle, path),
    {
      '@type': 'FAQPage',
      mainEntity: c.faq.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ];

  return (
    <>
      <PageSeo title={c.seoTitle} description={c.seoDesc} path={path} jsonLd={jsonLd} />

      <PillarHero
        icon={Sparkles}
        eyebrow={c.heroEyebrow}
        title={c.heroTitle}
        subtitle={c.heroSub}
        intro={c.heroIntro}
        bgImage={IMG.eventNewYear}
        imageAlt={c.heroAlt}
        accentVia="via-night/60"
        wash="bg-night/55"
      />

      <section className="px-4 sm:px-6 lg:px-8 pt-10">
        <p className="max-w-3xl mx-auto text-sm text-white/80 border-l-2 border-neon-yellow/60 pl-4">{c.checked}</p>
      </section>

      {/* Ilotulitukset paikkakunnittain */}
      <section className="py-14 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-[0.25em] text-pink font-bold mb-3">{c.fwEyebrow}</p>
            <h2 className="font-heading text-3xl sm:text-4xl text-white tracking-wide mb-3">{c.fwH}</h2>
            <p className="text-white/80 max-w-2xl mx-auto">{c.fwBody}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {towns.map((t) => (
              <article key={t.id} className="flex flex-col bg-night-light/40 border border-white/10 rounded-xl p-5">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="font-heading text-xl text-white tracking-wide flex items-center gap-2">
                    <MapPin size={18} className="text-pink shrink-0" aria-hidden="true" />
                    {t.name}
                  </h3>
                  <span className="shrink-0 text-xs font-bold text-neon-yellow bg-neon-yellow/10 rounded-full px-2.5 py-1">
                    {t.when}
                  </span>
                </div>
                <p className="text-sm text-white/80 leading-relaxed mb-3">{t.body}</p>
                <p className="mt-auto text-xs text-white/75 leading-relaxed">{t.note}</p>
                {t.slug && (
                  <Link to={to(`/city/${t.slug}`)} className="mt-3 text-xs uppercase tracking-[0.18em] text-pink font-bold hover:text-pink-dark">
                    {c.cityLink(t.name)}
                  </Link>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Anniskelu ja juhlat */}
      <section className="py-14 sm:py-16 px-4 sm:px-6 lg:px-8 bg-night-light/30 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-[0.25em] text-pink font-bold mb-3">{c.barsEyebrow}</p>
            <h2 className="font-heading text-3xl sm:text-4xl text-white tracking-wide mb-3">{c.barsH}</h2>
            <p className="text-white/80 max-w-2xl mx-auto">{c.barsBody}</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {c.bars.map((b) => (
              <div key={b.h} className="bg-night-light/60 border border-white/10 rounded-xl p-5">
                <h3 className="font-heading text-lg text-white tracking-wide mb-2 flex items-center gap-2">
                  <Clock size={16} className="text-pink shrink-0" aria-hidden="true" />
                  {b.h}
                </h3>
                <p className="text-sm text-white/80 leading-relaxed">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pimea ja pakkanen */}
      <section className="py-14 sm:py-16 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-xs uppercase tracking-[0.25em] text-pink font-bold mb-3">{c.darkEyebrow}</p>
            <h2 className="font-heading text-3xl sm:text-4xl text-white tracking-wide mb-3">{c.darkH}</h2>
            <p className="text-white/80 max-w-2xl mx-auto">{c.darkBody}</p>
          </div>
          <div className="overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full text-sm text-left">
              <caption className="sr-only">{c.sunCaption}</caption>
              <thead className="bg-night-light/60 text-white/85">
                <tr>
                  <th scope="col" className="px-4 py-3 font-bold">{c.sunPlace}</th>
                  <th scope="col" className="px-4 py-3 font-bold">{c.sunTimes}</th>
                </tr>
              </thead>
              <tbody>
                {c.sun.map((s) => (
                  <tr key={s.place} className="border-t border-white/10">
                    <th scope="row" className="px-4 py-3 font-semibold text-white">{s.place}</th>
                    <td className="px-4 py-3 text-white/80">{s.times}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-base text-white/80 mt-3">{c.sunSource}</p>
          <div className="grid sm:grid-cols-2 gap-4 mt-8">
            <div className="bg-night-light/40 border border-white/10 rounded-xl p-5">
              <h3 className="font-heading text-lg text-white tracking-wide mb-2 flex items-center gap-2">
                <Moon size={16} className="text-pink shrink-0" aria-hidden="true" />
                {c.coldH}
              </h3>
              <p className="text-sm text-white/80 leading-relaxed">{c.coldBody}</p>
            </div>
            <div className="bg-night-light/40 border border-white/10 rounded-xl p-5">
              <h3 className="font-heading text-lg text-white tracking-wide mb-2 flex items-center gap-2">
                <Sparkles size={16} className="text-pink shrink-0" aria-hidden="true" />
                {c.auroraH}
              </h3>
              <p className="text-sm text-white/80 leading-relaxed">
                {c.auroraBody}{' '}
                <Link to={to('/aurora-bars')} className="text-pink hover:text-pink-dark underline underline-offset-4">{c.auroraLink}</Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Omat ilotulitteet */}
      <section className="py-14 sm:py-16 px-4 sm:px-6 lg:px-8 bg-night-light/30 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-[0.25em] text-neon-yellow font-bold mb-3">{c.rulesEyebrow}</p>
            <h2 className="font-heading text-3xl sm:text-4xl text-white tracking-wide">{c.rulesH}</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {c.rules.map((r) => (
              <div key={r.h} className="bg-night-light/60 border border-neon-yellow/20 rounded-xl p-5">
                <h3 className="font-heading text-lg text-white tracking-wide mb-2 flex items-center gap-2">
                  <ShieldAlert size={16} className="text-neon-yellow shrink-0" aria-hidden="true" />
                  {r.h}
                </h3>
                <p className="text-sm text-white/80 leading-relaxed">{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 1.1. ja kotiinpaasy */}
      <section className="py-14 sm:py-16 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-8">
          <div>
            <h2 className="font-heading text-3xl text-white tracking-wide mb-5 flex items-center gap-3">
              <Store size={22} className="text-pink shrink-0" aria-hidden="true" />
              {c.openH}
            </h2>
            <ul className="space-y-4">
              {c.open.map((o) => (
                <li key={o.h} className="bg-night-light/40 border border-white/10 rounded-xl p-4">
                  <h3 className="font-heading text-base text-white tracking-wide mb-1">{o.h}</h3>
                  <p className="text-sm text-white/80 leading-relaxed">{o.body}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-heading text-3xl text-white tracking-wide mb-5 flex items-center gap-3">
              <Car size={22} className="text-pink shrink-0" aria-hidden="true" />
              {c.homeH}
            </h2>
            <ul className="space-y-4">
              {c.home.map((o) => (
                <li key={o.h} className="bg-night-light/40 border border-white/10 rounded-xl p-4">
                  <h3 className="font-heading text-base text-white tracking-wide mb-1">{o.h}</h3>
                  <p className="text-sm text-white/80 leading-relaxed">{o.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* UKK (sama sisalto FAQPage-skeemassa yllä) */}
      <section className="py-14 sm:py-16 px-4 sm:px-6 lg:px-8 bg-night-light/30 border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading text-3xl sm:text-4xl text-white tracking-wide text-center mb-8">{c.faqH}</h2>
          <div className="space-y-3">
            {c.faq.map((f) => (
              <details key={f.q} className="group rounded-xl border border-white/10 bg-night-light/40 open:border-pink/40">
                <summary className="cursor-pointer list-none px-5 py-4 font-semibold text-white flex items-start justify-between gap-4">
                  <span>{f.q}</span>
                  <span aria-hidden="true" className="text-pink transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="px-5 pb-5 text-sm text-white/80 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-16 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-xs uppercase tracking-[0.25em] text-pink font-bold mb-3">{c.gygEyebrow}</p>
            <h2 className="font-heading text-3xl sm:text-4xl text-white tracking-wide mb-2">{c.gygH}</h2>
            <p className="text-white/80 max-w-xl mx-auto">{c.gygBody}</p>
          </div>
          <GygWidget query="Rovaniemi New Year" seeAllPath="rovaniemi-l2653" campaign="newyear_pillar" count={6} fallbackImage={IMG.eventNewYear} />
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-3xl text-white tracking-wide mb-3">{c.ctaH}</h2>
          <p className="text-white/80 mb-6">{c.ctaBody}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <AffiliateCTA partner="hotels" sid="newyear_rovaniemi" destination="Rovaniemi" className="inline-flex items-center gap-2 bg-[#DB2777] hover:bg-[#BE185D] text-white font-bold py-4 px-7 rounded-xl text-sm uppercase tracking-wider transition-all hover:-translate-y-0.5">
              {c.ctaRov}
            </AffiliateCTA>
            <AffiliateCTA partner="hotels" sid="newyear_levi" destination="Levi" className="inline-flex items-center gap-2 bg-[#DB2777] hover:bg-[#BE185D] text-white font-bold py-4 px-7 rounded-xl text-sm uppercase tracking-wider transition-all hover:-translate-y-0.5">
              {c.ctaLevi}
            </AffiliateCTA>
          </div>
          <p className="text-sm text-white/80 mt-6">
            <Link to={to('/events')} className="text-pink hover:text-pink-dark underline underline-offset-4">{c.eventsLink}</Link>
          </p>
        </div>
      </section>
    </>
  );
}
