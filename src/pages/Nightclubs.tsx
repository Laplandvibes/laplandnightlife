import { Music } from 'lucide-react';
import PageSeo, { pillarBreadcrumb, articleSchema } from '../components/PageSeo';
import PillarHero from '../components/PillarHero';
import GygWidget from '../components/GygWidget';
import AffiliateCTA from '../components/AffiliateCTA';
import AirportRideAd from '../components/AirportRideAd';
import { IMG } from '../data/images';
import { useLang, type Lang } from '../i18n/useLang';
import { COPY } from '../locales/copy';

// Localized lead for the airport-transfer ad (getting to and from the clubs).
const RIDE_LEAD: Record<Lang, { eyebrow: string; h: string }> = {
  en: { eyebrow: 'Getting there & home', h: 'The ride to the door, and back' },
  fi: { eyebrow: 'Meno ja paluu', h: 'Kyyti ovelle, ja takaisin' },
  de: { eyebrow: 'Hin und zurück', h: 'Die Fahrt bis vor die Tür, und zurück' },
  ja: { eyebrow: '行きも帰りも', h: '入口までの足、そして帰りの足' },
  es: { eyebrow: 'Ida y vuelta', h: 'El viaje hasta la puerta, y de vuelta' },
  'pt-BR': { eyebrow: 'Ida e volta', h: 'A corrida até a porta, e de volta' },
  'zh-CN': { eyebrow: '往返接送', h: '送到门口的车,以及回程' },
  ko: { eyebrow: '갈 때와 올 때', h: '문 앞까지, 그리고 돌아오는 길' },
  fr: { eyebrow: 'Aller et retour', h: 'La course jusqu’à la porte, et le retour' },
  it: { eyebrow: 'Andata e ritorno', h: 'La corsa fino alla porta, e ritorno' },
  nl: { eyebrow: 'Heen en terug', h: 'De rit tot de deur, en terug' },
};

const top = [
  { name: 'Hullu Poro Areena', city: 'Levi', cap: '1 700', open: 'Wed–Sat in season' },
  { name: 'Roy Club', city: 'Rovaniemi', cap: '600', open: 'Daily, late' },
  { name: 'Tivoli', city: 'Rovaniemi', cap: '500', open: 'Wed–Sat' },
  { name: '45 Special', city: 'Oulu', cap: '500', open: 'Wed–Sat' },
  { name: 'St Michael', city: 'Oulu', cap: '600', open: 'Wed–Sat' },
  { name: 'Never Grow Old', city: 'Oulu', cap: '300', open: 'Wed–Sat' },
  { name: 'Tähtitorni', city: 'Oulu', cap: '350', open: 'Thu–Sat' },
  { name: 'Pyörre', city: 'Ruka', cap: '400', open: 'Thu–Sat in season' },
  { name: 'Club Nord', city: 'Ivalo', cap: '250', open: 'Fri–Sat' },
];

export default function Nightclubs() {
  const lang = useLang();
  const c = COPY[lang].nightclubs;
  const path = lang === 'en' ? '/nightclubs' : `/${lang}/nightclubs`;

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
        accentClass="from-pink/25 via-night/75 to-night"
      />

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
                <h2 className="font-heading text-2xl text-white tracking-tight mb-2">{t.h}</h2>
                <p className="text-sm text-white/80 leading-relaxed">{t.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-night-light/30 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-heading text-3xl sm:text-4xl text-white tracking-tight text-center mb-10">{c.listH}</h2>
          <div className="bg-night/60 border border-white/10 rounded-2xl overflow-hidden">
            <table className="w-full text-left text-sm">
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
                    <td className="px-5 py-3 font-heading text-lg text-white tracking-tight">{v.name}</td>
                    <td className="px-5 py-3 text-pink">{v.city}</td>
                    <td className="px-5 py-3 text-white/70">{v.cap}</td>
                    <td className="px-5 py-3 text-white/80">{v.open}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-xs uppercase tracking-[0.25em] text-pink font-bold mb-3">{RIDE_LEAD[lang].eyebrow}</p>
            <h2 className="font-heading text-3xl sm:text-4xl text-white tracking-tight" style={{ textWrap: 'balance' }}>{RIDE_LEAD[lang].h}</h2>
          </div>
          <AirportRideAd sid="nightclubs_airport_ride" />
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-xs uppercase tracking-[0.25em] text-pink font-bold mb-3">{c.gygEyebrow}</p>
            <h2 className="font-heading text-3xl sm:text-4xl text-white tracking-tight mb-2">{c.gygH}</h2>
            <p className="text-white/80 max-w-xl mx-auto">{c.gygBody}</p>
          </div>
          <GygWidget query="Rovaniemi Levi tours nightlife" campaign="nightclubs_pillar" count={6} />
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-3xl text-white tracking-tight mb-3">{c.ctaH}</h2>
          <p className="text-white/65 mb-6">{c.ctaBody}</p>
          <AffiliateCTA partner="hotels" sid="nightclubs_cta" destination="Rovaniemi" className="inline-flex items-center gap-2 bg-pink hover:bg-pink-dark text-white font-bold py-4 px-8 rounded-xl text-sm uppercase tracking-wider transition-all hover:-translate-y-0.5">
            {c.ctaBtn}
          </AffiliateCTA>
        </div>
      </section>
    </>
  );
}
