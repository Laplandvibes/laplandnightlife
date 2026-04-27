import { Music } from 'lucide-react';
import PageSeo, { pillarBreadcrumb, articleSchema } from '../components/PageSeo';
import PillarHero from '../components/PillarHero';
import GygWidget from '../components/GygWidget';
import AffiliateCTA from '../components/AffiliateCTA';
import { IMG } from '../data/images';

const tiers = [
  {
    h: 'The mega-club',
    where: 'Levi',
    body: 'Hullu Poro Areena. 1 700 capacity, 10 bars, 2 floors. The biggest nightclub in Lapland, hands down. Concert venue Wed–Sat in ski season.',
    accent: 'from-pink/30 to-night-light',
  },
  {
    h: 'The real-scene clubs',
    where: 'Oulu · Rovaniemi',
    body: 'Roy Club, Tivoli, 45 Special, Never Grow Old, St Michael. Year-round programmes, touring DJs, queues at midnight. The Rotuaari strip in Oulu has 8 venues inside a 400-metre walk.',
    accent: 'from-purple/30 to-night-light',
  },
  {
    h: 'The northernmost club',
    where: 'Ivalo',
    body: 'Club Nord at Hotel Ivalo. Open Friday and Saturday. The northernmost mainland club in Finland — a logistical curiosity worth one Saturday.',
    accent: 'from-aurora-blue/25 to-night-light',
  },
  {
    h: 'The hotel-bar circuit',
    where: 'Saariselkä · Ylläs · Kemi · Pyhä-Luosto',
    body: "Wilderness destinations don't do clubs. They do hotel bars with fireplaces, aurora windows and one DJ slot a week. Different night out — same drink prices.",
    accent: 'from-neon-yellow/15 to-night-light',
  },
];

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
  return (
    <>
      <PageSeo
        title="Nightclubs & Live Music — Finnish Lapland"
        description="50+ verified nightclubs and live-music venues across Finnish Lapland. Hullu Poro Areena (1 700 cap), Roy Club, the Oulu Rotuaari strip, and the northernmost mainland club — Ivalo's Club Nord."
        path="/nightclubs"
        jsonLd={[
          articleSchema('Nightclubs & live music in Finnish Lapland', 'Verified nightclubs across all 14 Lapland cities.', '/nightclubs'),
          pillarBreadcrumb('Nightclubs', '/nightclubs'),
        ]}
      />

      <PillarHero
        icon={Music}
        eyebrow="50+ verified venues"
        title="Nightclubs & Live Music"
        subtitle="From 1 700-capacity to 250 — and the queue at the door."
        intro="Lapland nightclubs split into four tiers. Knowing which is which is the difference between a Friday in Levi and a Friday in Salla."
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
          <h2 className="font-heading text-3xl sm:text-4xl text-white tracking-tight text-center mb-10">The verified list</h2>
          <div className="bg-night/60 border border-white/10 rounded-2xl overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-night-light/60 text-white/60 text-[0.65rem] uppercase tracking-wider">
                <tr>
                  <th className="px-5 py-3">Venue</th>
                  <th className="px-5 py-3">City</th>
                  <th className="px-5 py-3">Capacity</th>
                  <th className="px-5 py-3">Open</th>
                </tr>
              </thead>
              <tbody>
                {top.map((v, i) => (
                  <tr key={v.name} className={i % 2 === 0 ? 'bg-night/30' : ''}>
                    <td className="px-5 py-3 font-heading text-lg text-white tracking-tight">{v.name}</td>
                    <td className="px-5 py-3 text-pink">{v.city}</td>
                    <td className="px-5 py-3 text-white/70">{v.cap}</td>
                    <td className="px-5 py-3 text-white/60">{v.open}</td>
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
            <p className="text-xs uppercase tracking-[0.25em] text-pink font-bold mb-3">Bookable now</p>
            <h2 className="font-heading text-3xl sm:text-4xl text-white tracking-tight mb-2">Combine the night with a tour</h2>
            <p className="text-white/60 max-w-xl mx-auto">Aurora chasing on the way home, snowmobile sunrise rides, husky-safari pre-game.</p>
          </div>
          <GygWidget query="Rovaniemi Levi tours nightlife" campaign="nightclubs_pillar" count={6} />
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-3xl text-white tracking-tight mb-3">Stay near the action</h2>
          <p className="text-white/65 mb-6">Hotels in walking distance of the clubs — Rovaniemi Koskikatu, Oulu Rotuaari, Levi slope-side.</p>
          <AffiliateCTA partner="hotels" sid="nightclubs_cta" destination="Rovaniemi" className="inline-flex items-center gap-2 bg-pink hover:bg-pink-dark text-white font-bold py-4 px-8 rounded-xl text-sm uppercase tracking-wider transition-all hover:-translate-y-0.5">
            Browse club-district hotels →
          </AffiliateCTA>
        </div>
      </section>
    </>
  );
}
