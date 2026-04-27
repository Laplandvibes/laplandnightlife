import { Link } from 'react-router-dom';
import { Music, AlertTriangle, Phone, Calendar, ArrowRight } from 'lucide-react';
import Hero from '../components/Hero';
import BookingSection from '../components/BookingSection';
import PrimeTime from '../components/PrimeTime';
import CityCard from '../components/CityCard';
import GygWidget from '../components/GygWidget';
import Newsletter from '../components/Newsletter';
import PageSeo from '../components/PageSeo';
import { CITIES } from '../data/cities';

const homeJsonLd = [
  {
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Where is the biggest nightclub in Finnish Lapland?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Hullu Poro Areena in Levi: 1 700 capacity, 10 bars, 2 floors. Open Wed–Sat in ski season.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can you see the aurora from a bar in Lapland?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Yes — Kakslauttanen's Igloo Bar in Saariselkä has a glass roof for aurora viewing, and Hotel Aurora Luosto runs an aurora-window bar with wake-up service when the lights are active.",
        },
      },
      {
        '@type': 'Question',
        name: 'How late do bars stay open in Lapland?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Last call is 03:30 in city centres and ski-resort areas during peak season. Smaller towns close earlier — typically 01:00 or 02:00.',
        },
      },
    ],
  },
];

export default function Home() {
  const homeCities = CITIES.slice(0, 8);

  // Three teaser events on home; full calendar on /events
  const events = [
    { name: 'Kemi SnowCastle 2026', when: 'Jan – Apr', desc: 'Ice-walled bar, snow-built chapel, vodka in ice glasses. Rebuilt every winter since 1996.' },
    { name: 'Midnight Sun Film Festival', when: 'Jun 10–14, 2026', desc: 'Sodankylä — 80+ films, the 03:00 screening at the wooden church is the photo.' },
    { name: 'Qstock Festival 2026', when: 'Jul 24–26, 2026', desc: "Oulu's biggest rock festival. 60 000 visitors over the weekend." },
  ];

  // Four teaser tips on home; full seven on /tips
  const tips = [
    { h: 'Last call — everywhere.', icon: AlertTriangle, body: "Last call is 03:30 in cities, earlier in small towns. There's no late-licence culture.", to: '/tips' },
    { h: 'Bar, club, Roy Club.', icon: Music, body: 'Rovaniemi locals say "we\'ll start at the bar, then a club, then Roy Club" — Roy is always last.', to: '/city/rovaniemi' },
    { h: 'No Uber. Save this number.', icon: Phone, body: "Uber doesn't exist in Lapland. Save Lähitaksi 0100 84 84.", to: '/tips' },
    { h: 'Three windows. One surprise.', icon: Calendar, body: 'Aurora season is Sept–Apr. Midnight sun is Jun 6 – Jul 7. Summer is busier than winter in Oulu.', to: '/summer-nights' },
  ];

  return (
    <>
      <PageSeo
        title="LaplandNightlife — Finnish Lapland After Dark & Midnight Sun"
        description="The honest guide to Finnish Lapland nightlife. 14 cities, 50+ verified nightclubs, aurora bars, live music, film festivals and 2026 Oulu European Capital of Culture events. From Hullu Poro Areena to Kakslauttanen Igloo Bar."
        path="/"
        jsonLd={homeJsonLd}
      />

      <Hero />

      <PrimeTime />

      {/* GYG widget — bookable inventory in the top-3 viewports */}
      <section className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-[0.25em] text-pink font-bold mb-3">Bookable now · live availability</p>
            <h2 className="font-heading text-4xl sm:text-5xl text-white tracking-tight mb-3">Tonight&rsquo;s and tomorrow&rsquo;s tours</h2>
            <p className="text-white/65 max-w-xl mx-auto">Aurora chasing, igloo dinners, snowmobile safaris. Real prices, instant confirmation, no fluff between you and the guide.</p>
          </div>
          <GygWidget query="Rovaniemi nightlife aurora" campaign="home_tours_top" count={6} />
        </div>
      </section>

      {/* Five scenes / one region — 4 cards routing to cities + pillars */}
      <section className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="font-heading text-4xl sm:text-5xl text-white mb-4 tracking-tight">
            There is no single &ldquo;Lapland nightlife&rdquo;.
          </h2>
          <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto mb-10 sm:mb-12">
            Five distinct scenes inside one region. Knowing which is which is the difference
            between a night out and a wasted flight.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { tag: 'Five scenes · one region', h: 'Real scene', body: '8 clubs · 1 strip', desc: 'Oulu Rotuaari, Rovaniemi Koskikatu', tint: 'from-pink/20 to-night-light', to: '/city/oulu' },
              { tag: 'Ski-resort party', h: 'Levi', body: 'Hullu Poro · 1 700 cap', desc: 'The biggest nightclub in Lapland', tint: 'from-aurora-blue/20 to-night-light', to: '/city/levi' },
              { tag: 'Wilderness premium', h: 'Igloo Bars', body: 'Glass igloo bars', desc: 'Kakslauttanen, Aurora Luosto', tint: 'from-purple/25 to-night-light', to: '/aurora-bars' },
              { tag: 'Cultural anchor', h: 'Sodankylä', body: 'Midnight sun film fest', desc: '03:00 screening at a 17th-century church', tint: 'from-neon-yellow/15 to-night-light', to: '/city/sodankyla' },
            ].map((c) => (
              <Link key={c.h} to={c.to} className={`group bg-gradient-to-br ${c.tint} border border-white/10 rounded-2xl p-5 text-left hover:border-pink/40 hover:-translate-y-1 transition-all`}>
                <p className="text-[0.6rem] uppercase tracking-[0.2em] text-purple-light font-bold mb-2">{c.tag}</p>
                <h3 className="font-heading text-2xl text-white tracking-tight mb-1">{c.h}</h3>
                <p className="text-sm text-pink mb-1 font-semibold">{c.body}</p>
                <p className="text-xs text-white/60 mb-3">{c.desc}</p>
                <span className="text-[0.65rem] uppercase tracking-[0.18em] text-pink font-bold inline-flex items-center gap-1">
                  Go <ArrowRight size={12} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <BookingSection />

      {/* Nightlife by City */}
      <section className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-12">
            <p className="text-xs uppercase tracking-[0.25em] text-pink font-bold mb-3">Destinations</p>
            <h2 className="font-heading text-4xl sm:text-5xl text-white tracking-tight mb-3">Nightlife by City</h2>
            <p className="text-white/60 max-w-2xl mx-auto">Eight cities to know. Six more to skip — or to find on purpose.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {homeCities.map((c) => <CityCard key={c.slug} city={c} />)}
          </div>
          <div className="text-center mt-10">
            <Link to="/cities" className="inline-flex items-center gap-2 text-pink hover:text-pink-dark font-semibold uppercase tracking-wider text-sm">
              See all 14 cities →
            </Link>
          </div>
        </div>
      </section>

      {/* Three teaser events → /events */}
      <section className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-night-light/30 border-t border-white/5 overflow-hidden">
        <div className="absolute top-1/2 -right-20 w-[400px] h-[400px] bg-pink/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-[0.25em] text-purple-light font-bold mb-3">2026 Calendar</p>
            <h2 className="font-heading text-4xl sm:text-5xl text-white tracking-tight">The Nights That Matter</h2>
          </div>
          <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-4">
            {events.map((e) => (
              <Link
                key={e.name}
                to="/events"
                className="group bg-night-light/60 border border-white/10 rounded-xl p-5 hover:border-pink/30 hover:-translate-y-0.5 transition-all"
              >
                <p className="text-[0.65rem] uppercase tracking-[0.18em] text-pink font-bold mb-2">{e.when}</p>
                <h3 className="font-heading text-xl text-white tracking-tight mb-2 group-hover:text-pink transition-colors">{e.name}</h3>
                <p className="text-sm text-white/70 leading-relaxed">{e.desc}</p>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/events" className="inline-flex items-center gap-2 text-pink hover:text-pink-dark font-semibold uppercase tracking-wider text-sm">
              Full 2026 calendar →
            </Link>
          </div>
        </div>
      </section>

      {/* Four teaser tips → /tips */}
      <section className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-[0.25em] text-pink font-bold mb-3">Local intel</p>
            <h2 className="font-heading text-4xl sm:text-5xl text-white tracking-tight">Things nobody tells you.</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {tips.map((t) => (
              <Link key={t.h} to={t.to} className="group flex flex-col bg-night-light/40 border border-white/10 rounded-xl p-5 hover:border-pink/40 hover:-translate-y-0.5 transition-all">
                <t.icon size={22} className="text-pink mb-3" />
                <h3 className="font-heading text-lg text-white tracking-tight mb-2">{t.h}</h3>
                <p className="text-sm text-white/70 leading-relaxed">{t.body}</p>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/tips" className="inline-flex items-center gap-2 text-pink hover:text-pink-dark font-semibold uppercase tracking-wider text-sm">
              All seven tips + Finnish drinking laws →
            </Link>
          </div>
        </div>
      </section>

      {/* Working newsletter band */}
      <Newsletter />
    </>
  );
}
