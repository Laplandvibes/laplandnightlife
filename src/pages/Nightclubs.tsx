import { Music } from 'lucide-react';
import PageSeo, { pillarBreadcrumb, articleSchema } from '../components/PageSeo';
import PillarHero from '../components/PillarHero';
import GygWidget from '../components/GygWidget';
import AffiliateCTA from '../components/AffiliateCTA';
import { IMG } from '../data/images';
import { VENUE_COUNT } from '../data/cities';
import { useLang, useLocalePath } from '../i18n/useLang';
import { COPY } from '../locales/copy';
import { UPLIFT, type OpenKey } from '../locales/upliftI18n';

// Opening-hours values live in upliftI18n (were hardcoded EN — leaked on 11 locales).
const top: { name: string; city: string; cap: string; openKey: OpenKey }[] = [
  { name: 'Hullu Poro Areena', city: 'Levi', cap: '1 700', openKey: 'gigNights' },
  { name: 'Roy Club', city: 'Rovaniemi', cap: '-', openKey: 'dailyLate' },
  { name: '45 Special', city: 'Oulu', cap: '-', openKey: 'wedSat' },
  { name: 'St Michael', city: 'Oulu', cap: '-', openKey: 'wedSat' },
  { name: 'Kaarlenholvi', city: 'Oulu', cap: '-', openKey: 'friSatDisco' },
  { name: 'Restaurant Zone', city: 'Ruka', cap: '-', openKey: 'dailySeason' },
];

export default function Nightclubs() {
  const lang = useLang();
  const to = useLocalePath();
  const c = COPY[lang].nightclubs;
  const u = UPLIFT[lang];
  // useLocalePath maps pt-BR/zh-CN/ko to their real /br /cn /kr prefixes —
  // raw `/${lang}/…` produced double-prefixed client-side canonicals.
  const path = to('/nightclubs');

  // Stat tiles. 1 700 = Hullu Poro Areena (hulluporo.fi), 1985 = Roy Club ("bileet vuodesta 1985",
  // royclub.fi), 04:00 = the latest serving time the Alcohol Act allows (1102/2017, 44 §). The venue
  // count is computed from CITIES so it can never drift from the data.
  const stats = [
    { v: '1 700', l: u.clubStats.capacity },
    { v: String(VENUE_COUNT), l: u.clubStats.venues },
    { v: '1985', l: u.clubStats.royClub },
    { v: '04:00', l: u.clubStats.lastCall },
  ];

  const tiers = [
    { h: c.tier1H, where: c.tier1Where, body: c.tier1Body, accent: 'from-pink/30 to-night-light' },
    { h: c.tier2H, where: c.tier2Where, body: c.tier2Body, accent: 'from-purple/30 to-night-light' },
    { h: c.tier3H, where: c.tier3Where, body: c.tier3Body, accent: 'from-aurora-blue/25 to-night-light' },
    { h: c.tier4H, where: c.tier4Where, body: c.tier4Body, accent: 'from-neon-yellow/15 to-night-light' },
  ];

  return (
    <>
      <PageSeo
        title={c.seoTitle}
        description={c.seoDesc}
        path={path}
        jsonLd={[
          articleSchema(c.seoTitle, c.seoDesc, path),
          pillarBreadcrumb(c.heroTitle, path),
        ]}
      />

      <PillarHero
        icon={Music}
        eyebrow={c.heroEyebrow}
        title={c.heroTitle}
        subtitle={c.heroSub}
        intro={c.heroIntro}
        bgImage={IMG.pillarNightclubs}
        accentVia="via-pink/25"
      />

      {/* Stat glass tiles (skiresorts recipe) — real numbers only, all sourced
          from copy that already ships on this page. */}
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
        <div className="max-w-5xl mx-auto grid sm:grid-cols-2 gap-5">
          {tiers.map((t) => (
            <div
              key={t.h}
              className={`relative overflow-hidden rounded-2xl border border-white/10 hover:border-pink/40 transition-all duration-500 hover:-translate-y-1`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${t.accent} opacity-90`} />
              <div className="absolute inset-0 bg-gradient-to-t from-night-light to-transparent" />
              <div className="relative p-6">
                <p className="text-[0.65rem] uppercase tracking-[0.2em] text-pink font-bold mb-2">{t.where}</p>
                <h2 className="font-heading text-2xl text-white tracking-wide mb-2">{t.h}</h2>
                <p className="text-sm text-white/80 leading-relaxed">{t.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-night-light/30 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-heading text-3xl sm:text-4xl text-white tracking-wide text-center mb-10">{c.listH}</h2>
          {/* overflow-x-auto: the 4-column table must scroll inside its card at
              375 px instead of stretching the page. */}
          <div className="bg-night/60 border border-white/10 rounded-2xl overflow-hidden overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead className="bg-night-light/60 text-white/80 text-[0.65rem] uppercase tracking-wider">
                <tr>
                  <th className="px-5 py-3">{c.tVenue}</th>
                  <th className="px-5 py-3">{c.tCity}</th>
                  <th className="px-5 py-3">{c.tCap}</th>
                  <th className="px-5 py-3">{c.tOpen}</th>
                </tr>
              </thead>
              <tbody>
                {top.map((v, i) => (
                  <tr key={v.name} className={i % 2 === 0 ? 'bg-night/30' : ''}>
                    <td className="px-5 py-3 font-heading text-lg text-white tracking-wide">{v.name}</td>
                    <td className="px-5 py-3 text-pink">{v.city}</td>
                    <td className="px-5 py-3 text-white/70">{v.cap}</td>
                    <td className="px-5 py-3 text-white/80">{u.open[v.openKey]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-xs uppercase tracking-[0.25em] text-pink font-bold mb-3">{c.gygEyebrow}</p>
            <h2 className="font-heading text-3xl sm:text-4xl text-white tracking-wide mb-2">{c.gygH}</h2>
            <p className="text-white/80 max-w-xl mx-auto">{c.gygBody}</p>
          </div>
          <GygWidget query="Rovaniemi Levi tours nightlife" seeAllPath="lapland-finland-l2652" campaign="nightclubs_pillar" count={6} />
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-3xl text-white tracking-wide mb-3">{c.ctaH}</h2>
          <p className="text-white/65 mb-6">{c.ctaBody}</p>
          <AffiliateCTA partner="hotels" sid="nightclubs_cta" destination="Rovaniemi" className="inline-flex items-center gap-2 bg-[#DB2777] hover:bg-[#BE185D] text-white font-bold py-4 px-8 rounded-xl text-sm uppercase tracking-wider transition-all hover:-translate-y-0.5">
            {c.ctaBtn}
          </AffiliateCTA>
        </div>
      </section>
    </>
  );
}
