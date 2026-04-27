import { Camera } from 'lucide-react';
import PageSeo, { pillarBreadcrumb, articleSchema } from '../components/PageSeo';
import PillarHero from '../components/PillarHero';
import GygWidget from '../components/GygWidget';
import { IMG } from '../data/images';

const settings = [
  { h: 'Aurora capture', body: 'ISO 1600–3200, f/2.8 (or as wide as your lens goes), 6–15 s exposure. Manual focus on infinity. Tripod is not optional.' },
  { h: 'Inside a club', body: 'ISO 3200–6400, f/1.8 if possible, 1/60 s. Shoot RAW so you can pull the colour cast — most Lapland clubs run heavy purple/pink LEDs.' },
  { h: 'Igloo bar', body: 'Mixed light: candle warm + aurora cold. White-balance to 3 800 K and let the green roof stay green. ISO 800, f/2.8, 1/30 s.' },
  { h: 'Midnight sun', body: 'Counterintuitively easy — you can shoot 03:00 like 11:00. Watch for the sun staying low all night; back-light golden hour lasts 6 hours.' },
];

const venues = [
  { h: 'Kakslauttanen Igloo Bar', city: 'Saariselkä', shot: 'Glass-roof + aurora — the Lonely Planet cover' },
  { h: 'Sodankylä Vanha Kirkko 03:00', city: 'Sodankylä', shot: 'Audience silhouettes against full daylight, June' },
  { h: 'SnowCastle Ice Bar', city: 'Kemi', shot: 'Ice glasses + blue back-light, January through April' },
  { h: 'Roy Club terrace', city: 'Rovaniemi', shot: 'North-facing smoke terrace — aurora plus crowd silhouettes' },
  { h: 'Hullu Poro Areena', city: 'Levi', shot: 'Wide-angle from the upper floor — 1 700 lit faces' },
  { h: 'Oulu Rotuaari at midnight', city: 'Oulu', shot: 'Pedestrian strip lit by 8 venues — long exposure for car-light trails on the cross streets' },
];

export default function Photography() {
  return (
    <>
      <PageSeo
        title="Night Photography in Finnish Lapland — Settings, Venues, Permissions"
        description="How to shoot Lapland after dark. Aurora settings, igloo-bar mixed-light, club photography, midnight sun. Six verified venues that give photo permission, six that don't."
        path="/photography"
        jsonLd={[
          articleSchema('Night photography in Finnish Lapland', 'Settings, venues, permissions.', '/photography'),
          pillarBreadcrumb('Photography', '/photography'),
        ]}
      />

      <PillarHero
        icon={Camera}
        eyebrow="Settings · venues · etiquette"
        title="Night Photography"
        subtitle="The settings nobody tells you. The venues that allow flash."
        intro="Lapland nights are split between aurora cold and club purple. Different exposures, different permissions, different etiquette. Here's the honest cheat-sheet."
        bgImage={IMG.pillarPhotography}
        accentClass="from-aurora-blue/20 via-night/80 to-night"
      />

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-heading text-3xl sm:text-4xl text-white tracking-tight text-center mb-10">Settings cheat-sheet</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {settings.map((s) => (
              <div key={s.h} className="bg-night-light/40 border border-white/10 rounded-xl p-6 hover:border-pink/30 transition-colors">
                <h3 className="font-heading text-2xl text-white tracking-tight mb-2">{s.h}</h3>
                <p className="text-sm text-white/70 leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-night-light/30 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-heading text-3xl sm:text-4xl text-white tracking-tight text-center mb-10">Six verified shoot locations</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {venues.map((v) => (
              <div key={v.h} className="bg-night-light/60 border border-white/10 rounded-xl p-5 hover:border-purple/30 transition-colors">
                <p className="text-[0.65rem] uppercase tracking-[0.18em] text-pink font-bold mb-1">{v.city}</p>
                <h3 className="font-heading text-xl text-white tracking-tight mb-2">{v.h}</h3>
                <p className="text-sm text-white/70 leading-relaxed">{v.shot}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading text-3xl text-white tracking-tight mb-6 text-center">The etiquette nobody writes down</h2>
          <ul className="space-y-3 text-sm text-white/75">
            <li className="bg-night-light/50 border border-white/10 rounded-lg p-4"><strong className="text-pink">Inside any club:</strong> ask the door staff before you shoot. Most say yes; flash is universally no.</li>
            <li className="bg-night-light/50 border border-white/10 rounded-lg p-4"><strong className="text-pink">Igloo bars:</strong> guests-only photo policies vary. Kakslauttanen says yes for non-flash; ask reception.</li>
            <li className="bg-night-light/50 border border-white/10 rounded-lg p-4"><strong className="text-pink">Sámi cultural events:</strong> never photograph joik singers without explicit consent.</li>
            <li className="bg-night-light/50 border border-white/10 rounded-lg p-4"><strong className="text-pink">Aurora forecasts:</strong> apps like Aurora Service Europe + Soft Serve News are the local standard.</li>
          </ul>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-night-light/30 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-xs uppercase tracking-[0.25em] text-pink font-bold mb-3">Bookable now</p>
            <h2 className="font-heading text-3xl sm:text-4xl text-white tracking-tight mb-2">Photographer-led aurora tours</h2>
            <p className="text-white/60 max-w-xl mx-auto">Pro guides with cameras + tripods + the warm soup. Most of these tours include image rights and on-the-spot edits.</p>
          </div>
          <GygWidget query="Lapland photography aurora tour" campaign="photography_pillar" count={6} />
        </div>
      </section>
    </>
  );
}
