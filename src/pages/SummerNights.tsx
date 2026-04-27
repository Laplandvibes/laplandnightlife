import { Link } from 'react-router-dom';
import { Sun, Flame, Music, Camera, Waves, Bike, Compass, Film } from 'lucide-react';
import PageSeo, { pillarBreadcrumb, articleSchema } from '../components/PageSeo';
import GygWidget from '../components/GygWidget';
import AffiliateCTA from '../components/AffiliateCTA';
import { IMG } from '../data/images';

const SHADOW = {
  textShadow:
    '0 2px 4px rgba(0,0,0,0.85), 0 4px 10px rgba(0,0,0,0.7), 0 8px 24px rgba(0,0,0,0.55)',
};

const cityScenes = [
  {
    city: 'Oulu',
    when: 'Capital of Culture year',
    body: 'Kuusisaari outdoor concerts, Air Guitar finals at Rotuaari, midnight-sun jazz at Elojazz. The summer scene rivals winter — and rivals Helsinki.',
    img: IMG.summerOulu,
    to: '/city/oulu',
  },
  {
    city: 'Rovaniemi',
    when: 'Terraces till 02:00',
    body: 'Koskikatu terraces stay open in full daylight. Lakeside saunas at Ounaskoski. Jutajaiset folklore festival mid-July.',
    img: IMG.summerRovaniemi,
    to: '/city/rovaniemi',
  },
  {
    city: 'Sodankylä',
    when: 'Mid-June film week',
    body: 'Midnight Sun Film Festival. The 03:00 screening at the 17th-century wooden church is the photo nobody fakes.',
    img: IMG.summerSodankyla,
    to: '/city/sodankyla',
  },
];

const events = [
  {
    h: 'Midnight Sun Window',
    when: 'Jun 6 – Jul 7, 2026',
    body: 'Sun never crosses the horizon north of the Arctic Circle. 32 days of continuous daylight.',
    icon: Sun,
    img: IMG.summerHero,
    badge: 'SOLSTICE',
  },
  {
    h: 'Midnight Sun Film Festival',
    when: 'Jun 10–14, 2026',
    body: '80+ films in Sodankylä. The 03:00 screening at the wooden church is mythical. Volunteer crew is half the experience.',
    icon: Film,
    img: IMG.summerSodankyla,
    badge: 'CULTURAL',
  },
  {
    h: 'Juhannus / Midsummer',
    when: 'Jun 19–21, 2026',
    body: 'Bonfires by lakes. Sauna at midnight. Lake swims at 18 °C. Cities empty out — locals leave for cabins.',
    icon: Flame,
    img: IMG.summerJuhannus,
    badge: 'NATIONAL',
  },
  {
    h: 'Air Guitar World Championships',
    when: 'Late August',
    body: 'Oulu finals. 40 nationalities, free outdoor stage, packed Rotuaari. The world\'s most absurd serious-sport.',
    icon: Music,
    img: IMG.summerAirGuitar,
    badge: 'OULU',
  },
  {
    h: 'Qstock Festival',
    when: 'Jul 24–26, 2026',
    body: "Northern Finland's biggest rock festival. 60 000 visitors over three days. Kuusisaari park.",
    icon: Music,
    img: IMG.summerOulu,
    badge: 'ROCK',
  },
  {
    h: 'Elojazz',
    when: 'Late July',
    body: 'Late-July jazz week — outdoor stages around Oulu Rotuaari. Headliners play till 02:00 in golden light.',
    icon: Music,
    img: IMG.summerJazz,
    badge: 'JAZZ',
  },
  {
    h: 'Ijahis Idja',
    when: 'Mid-August',
    body: "Inari's Sámi music festival under the late-summer light. Indigenous artists, all-night yoik sessions.",
    icon: Music,
    img: IMG.summerNordkapp,
    badge: 'SÁMI',
  },
  {
    h: 'Simerock',
    when: 'Late August',
    body: "Rovaniemi's end-of-summer rock festival. Local crowd, heavier line-up than Qstock. Closes the season.",
    icon: Music,
    img: IMG.summerRovaniemi,
    badge: 'ROCK',
  },
];

const timeline = [
  { time: '18:00', label: 'Sun is high', body: 'Lakeside terraces fill. The lake at 18 °C is officially "warm".' },
  { time: '21:00', label: 'Golden hour', body: 'Light goes peachy-warm and stays that way. Photographers stop chasing.' },
  { time: '00:00', label: 'Sun touches horizon', body: 'Doesn\'t go below. Hovers. Bars are open. Sauna heats up.' },
  { time: '02:00', label: 'Pink light', body: 'Sky goes salmon-pink. Locals go for a swim. Tourists run out of memory cards.' },
  { time: '05:00', label: 'Sun rising again', body: 'It never set. The bar bell rings. The lake is glass.' },
];

const localList = [
  { icon: Flame, h: 'Sauna at midnight', body: 'By a lake, naked, without irony. The temperature shock is the point.', img: IMG.summerSauna },
  { icon: Sun, h: 'Outdoor terrace until 03:00', body: 'The sun stays up, so does the bar. Bring sunglasses for a 1 AM beer.', img: IMG.summerJazz },
  { icon: Bike, h: 'Cycle the Oulu archipelago', body: 'Bridges connect 12 islands inside the city — flat, lit, all night.', img: IMG.summerCycle },
  { icon: Compass, h: 'Drive to Nordkapp at 02:00', body: '4 hours from Inari. Sun on the steering wheel. No traffic.', img: IMG.summerNordkapp },
  { icon: Waves, h: 'Lake swim at 18 °C', body: 'Yes, it gets that warm in July, even up here. The dip is the rite.', img: IMG.summerSwim },
];

export default function SummerNights() {
  return (
    <>
      <PageSeo
        title="Summer Nights in Finnish Lapland — The Midnight Sun Window 2026"
        description="32 days of unbroken daylight: Jun 6 – Jul 7. Midnight Sun Film Festival, Qstock, Elojazz, Air Guitar, Juhannus bonfires. The Lapland summer scene that rivals Helsinki."
        path="/summer-nights"
        jsonLd={[
          articleSchema(
            'Summer Nights in Finnish Lapland',
            'The 32-day midnight sun window — film festivals, lake saunas, terraces till 03:00.',
            '/summer-nights',
          ),
          pillarBreadcrumb('Summer Nights', '/summer-nights'),
        ]}
      />

      {/* Split hero — image on top (clean, no text overlay on the sky),
          editorial title block below on a solid dark band. White text only
          appears against night-dark, never against the peach-gold sky. */}
      <section className="relative">
        {/* Top half — pure image, no text, no readability fight */}
        <div className="relative h-[55svh] sm:h-[60svh] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${IMG.summerHero})` }}
          />
          {/* Soft fade only at the very bottom edge so transition isn't a hard line */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-night to-transparent pointer-events-none" />

          {/* Floating date badge — pinned top-right, on its own */}
          <div className="absolute top-24 right-4 sm:right-8">
            <div className="inline-flex items-center gap-2 bg-night/70 border border-neon-yellow/50 backdrop-blur-md rounded-full px-3.5 py-1.5">
              <Sun size={12} className="text-neon-yellow" />
              <span className="text-[0.6rem] uppercase tracking-[0.22em] text-neon-yellow font-bold">
                Jun 6 – Jul 7, 2026 · 32 days
              </span>
            </div>
          </div>
        </div>

        {/* Editorial title band — centered, matches the rest of the page rhythm */}
        <div className="relative bg-night px-4 sm:px-6 lg:px-8 py-14 sm:py-20 border-b border-white/5">
          {/* Subtle warm-amber glow drifting up from the image transition */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-[700px] h-[200px] bg-amber-300/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="relative max-w-4xl mx-auto text-center">
            <p className="text-[0.65rem] uppercase tracking-[0.32em] text-neon-yellow font-bold mb-4">
              Pillar 05 / Summer Nights
            </p>
            <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white tracking-tight leading-[0.95] mb-6">
              The other Lapland.
            </h1>
            <p className="text-white/90 text-lg sm:text-xl md:text-2xl leading-snug mb-5 font-light max-w-2xl mx-auto">
              Thirty-two days when the sun doesn&rsquo;t cross the horizon. No aurora,
              no snow, no Santa — the summer no brochure puts on the cover.
            </p>
            <p className="text-white/65 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Film festivals, lake saunas at midnight, terraces till 03:00 in full
              daylight, jazz that runs till sunrise — except the sun never went down.
            </p>
          </div>
        </div>
      </section>

      {/* Opposite-of-brochures intro */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-neon-yellow font-bold mb-4">The summer they don&rsquo;t advertise</p>
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl text-white tracking-tight mb-6 leading-[1.05]">
            Summer in Lapland is the opposite of what the brochures sell.
          </h2>
          <p className="text-white/75 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
            Tour operators print Santa, snow and reindeer. Locals know the secret: 24-hour daylight, wild green forests,
            lakes at 18 °C, outdoor jazz festivals, midnight cycling, and a cultural calendar that genuinely rivals
            Helsinki — at half the price and twice the daylight.
          </p>
        </div>
      </section>

      {/* 24-hour timeline — visual story of a midnight-sun day */}
      <section className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-t border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 via-transparent to-pink/5 pointer-events-none" />
        <div className="relative max-w-5xl mx-auto">
          <div className="text-center mb-10 sm:mb-12">
            <p className="text-xs uppercase tracking-[0.25em] text-neon-yellow font-bold mb-3">A day that doesn&rsquo;t end</p>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
              From 18:00 to 05:00 — same sky.
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

      {/* Midnight sun by city — image-forward */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-night-light/30 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-[0.25em] text-pink font-bold mb-3">Three cities · three scenes</p>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
              Midnight sun by city
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
                    Read the city page →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 8 headliner events — image cards */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-[0.25em] text-pink font-bold mb-3">The cultural calendar</p>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
              Summer 2026 headliners
            </h2>
            <p className="text-white/65 max-w-2xl mx-auto mt-3">
              Eight festivals between the May ice-melt and the August aurora-return. Plan around these — every Lapland
              summer trip orbits one of them.
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

      {/* Five things locals do — image-forward cards */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-night-light/30 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-[0.25em] text-pink font-bold mb-3">What locals actually do</p>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
              Five things at midnight in June.
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

      {/* GYG widget — bookable summer activities */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-xs uppercase tracking-[0.25em] text-neon-yellow font-bold mb-3">Bookable now</p>
            <h2 className="font-heading text-3xl sm:text-4xl text-white tracking-tight mb-2">
              Summer activities at midnight
            </h2>
            <p className="text-white/65 max-w-xl mx-auto">
              Lake-sauna evenings, midnight kayak tours, sunset photography (when the sun never sets).
            </p>
          </div>
          <GygWidget query="Lapland midnight sun summer activities" campaign="summer_pillar" count={6} />
        </div>
      </section>

      {/* Photography sister-CTA */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <Camera className="text-neon-yellow mx-auto mb-3" size={26} />
          <h2 className="font-heading text-2xl sm:text-3xl text-white tracking-tight mb-3">
            The 03:00 photo nobody fakes.
          </h2>
          <p className="text-white/65 mb-5 max-w-xl mx-auto">
            The midnight-sun shot only works inside this 32-day window. Settings, locations, and the wooden church.
          </p>
          <Link
            to="/photography"
            className="inline-flex items-center gap-2 bg-night-light/60 border border-neon-yellow/30 hover:border-neon-yellow text-white font-bold py-3 px-6 rounded-xl text-xs uppercase tracking-wider transition-all hover:-translate-y-0.5"
          >
            Read the photography guide →
          </Link>
        </div>
      </section>

      {/* Stay during midnight sun */}
      <section
        className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-t border-white/5 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, rgba(250,204,21,0.08) 0%, rgba(236,72,153,0.06) 100%)' }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-3xl sm:text-4xl text-white tracking-tight mb-3">
            Stay during the midnight sun.
          </h2>
          <p className="text-white/75 mb-6 max-w-xl mx-auto">
            Cabins by lakes. Hotels with terraces facing north. Festival accommodation in Sodankylä or Oulu — book
            6–8 weeks ahead, the locals do.
          </p>
          <AffiliateCTA
            partner="hotels"
            sid="summer_nights_cta"
            destination="Lapland"
            className="inline-flex items-center gap-2 bg-neon-yellow hover:bg-amber-300 text-night font-bold py-4 px-8 rounded-xl text-sm uppercase tracking-wider transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-neon-yellow/30"
          >
            Browse summer stays →
          </AffiliateCTA>
        </div>
      </section>
    </>
  );
}
