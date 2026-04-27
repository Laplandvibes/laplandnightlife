import { Sparkles } from 'lucide-react';
import PageSeo, { pillarBreadcrumb, articleSchema } from '../components/PageSeo';
import PillarHero from '../components/PillarHero';
import GygWidget from '../components/GygWidget';
import AffiliateCTA from '../components/AffiliateCTA';
import { IMG } from '../data/images';

const venues = [
  {
    h: 'Kakslauttanen Igloo Bar',
    where: 'Saariselkä',
    body: "The world's most-photographed bar. Glass-roof igloo, vodka cocktails, ceiling is the aurora when active. Open to non-guests with reservation.",
    type: 'Glass-roof bar',
  },
  {
    h: 'Hotel Aurora Luosto',
    where: 'Luosto',
    body: 'Aurora-window bar facing north. Wake-up service when activity peaks. The quiet pick — fewer Instagram tripods than Kakslauttanen.',
    type: 'Aurora-window bar',
  },
  {
    h: 'SnowCastle Ice Bar',
    where: 'Kemi',
    body: 'Walls at –5 °C, bar built from ice, vodka served in ice glasses. Open Jan–Apr. The Kemi SnowCastle is rebuilt every winter since 1996.',
    type: 'Ice bar',
  },
  {
    h: 'Arctic Snow Hotel Ice Bar',
    where: 'Sinettä (Rovaniemi)',
    body: 'Snow-built ice bar 25 minutes from Rovaniemi. Reindeer-fur seating, ice glasses, the Lonely Planet shot.',
    type: 'Ice bar',
  },
  {
    h: 'Nova Skyland Hotel Aurora Lounge',
    where: 'Rovaniemi',
    body: 'Sky-bar with a north-facing terrace. Aurora-alert service for guests; cocktails until 01:00.',
    type: 'Aurora terrace',
  },
  {
    h: 'Hotel Riekonlinna Aurora Lobby',
    where: 'Saariselkä',
    body: 'Big lobby fireplace, north-facing window wall, local DJ on Friday nights in season.',
    type: 'Aurora lobby bar',
  },
];

export default function AuroraBars() {
  return (
    <>
      <PageSeo
        title="Aurora Bars & Ice Bars — Finnish Lapland"
        description="Glass-roof igloo bars, aurora-window cocktail rooms, and the SnowCastle ice bar. Six verified northern-lights drinking spots from Saariselkä to Kemi."
        path="/aurora-bars"
        jsonLd={[
          articleSchema('Aurora bars & ice bars in Finnish Lapland', 'Glass-roof igloos, aurora-window bars, and the SnowCastle.', '/aurora-bars'),
          pillarBreadcrumb('Aurora Bars', '/aurora-bars'),
        ]}
      />

      <PillarHero
        icon={Sparkles}
        iconColor="text-purple-light"
        eyebrow="6 verified spots"
        title="Aurora & Ice Bars"
        subtitle="Drink with the ceiling on fire."
        intro="Two categories. Aurora bars: glass roofs, north-facing windows, wake-up services. Ice bars: walls at –5 °C, vodka in ice glasses, snow-built every winter."
        bgImage={IMG.pillarAuroraBars}
        accentClass="from-purple/30 via-night/70 to-night"
      />

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {venues.map((v) => (
            <div key={v.h} className="relative overflow-hidden bg-night-light/40 border border-white/10 rounded-2xl p-6 hover:border-purple/40 hover:-translate-y-1 transition-all">
              <div className="absolute -top-20 -right-10 w-40 h-40 bg-purple/20 rounded-full blur-[60px]" />
              <div className="relative">
                <p className="text-[0.6rem] uppercase tracking-[0.2em] text-purple-light font-bold mb-2">{v.type}</p>
                <h2 className="font-heading text-xl text-white tracking-tight mb-1">{v.h}</h2>
                <p className="text-pink text-xs uppercase tracking-wider font-semibold mb-3">{v.where}</p>
                <p className="text-sm text-white/70 leading-relaxed">{v.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-night-light/30 border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading text-3xl text-white tracking-tight mb-6 text-center">Plan the night</h2>
          <ul className="space-y-3 text-sm text-white/75">
            <li className="bg-night-light/50 border border-white/10 rounded-lg p-4"><strong className="text-pink">Aurora season:</strong> September – March. Peak nights are clear, cold and around new moon.</li>
            <li className="bg-night-light/50 border border-white/10 rounded-lg p-4"><strong className="text-pink">Ice-bar season:</strong> January – April only. SnowCastle melts every spring.</li>
            <li className="bg-night-light/50 border border-white/10 rounded-lg p-4"><strong className="text-pink">Reservation rules:</strong> Kakslauttanen Igloo Bar requires booking if you&rsquo;re not a hotel guest.</li>
            <li className="bg-night-light/50 border border-white/10 rounded-lg p-4"><strong className="text-pink">Wake-up service:</strong> Most aurora-window hotels will knock at 02:00 if activity spikes — opt in at check-in.</li>
          </ul>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-xs uppercase tracking-[0.25em] text-purple-light font-bold mb-3">Bookable now</p>
            <h2 className="font-heading text-3xl sm:text-4xl text-white tracking-tight mb-2">Aurora chasing tonight</h2>
            <p className="text-white/60 max-w-xl mx-auto">Guided aurora hunts, glass-igloo dinners, photographer-led northern-lights tours.</p>
          </div>
          <GygWidget query="Lapland aurora hunt igloo" campaign="aurora_pillar" count={6} />
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-3xl text-white tracking-tight mb-3">Sleep where the aurora is</h2>
          <p className="text-white/65 mb-6">Glass igloos, aurora-window hotels, ice-themed cabins.</p>
          <AffiliateCTA partner="hotels" sid="aurora_bars_cta" destination="Saariselkä" className="inline-flex items-center gap-2 bg-pink hover:bg-pink-dark text-white font-bold py-4 px-8 rounded-xl text-sm uppercase tracking-wider transition-all hover:-translate-y-0.5">
            Browse aurora stays →
          </AffiliateCTA>
        </div>
      </section>
    </>
  );
}
