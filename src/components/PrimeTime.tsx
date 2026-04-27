import { Link } from 'react-router-dom';
import { Sun, Film, Flame, ArrowRight } from 'lucide-react';
import { IMG } from '../data/images';

const SHADOW = {
  textShadow:
    '0 2px 4px rgba(0,0,0,0.85), 0 4px 10px rgba(0,0,0,0.7)',
};

const cards = [
  {
    when: 'Jun 6 – Jul 7, 2026',
    h: 'Midnight Sun Window',
    body: '32 days of unbroken daylight. Film festival, jazz, lake saunas till 03:00 in golden light.',
    icon: Sun,
    iconColor: 'text-neon-yellow',
    badge: 'SOLSTICE',
    img: IMG.primeWindow,
    href: '/summer-nights',
    cta: 'Read the summer guide',
  },
  {
    when: 'Jun 10 – 14, 2026',
    h: 'Midnight Sun Film Festival',
    body: '80+ films in Sodankylä. The 03:00 wooden-church screening in full daylight is the photo nobody fakes.',
    icon: Film,
    iconColor: 'text-purple-light',
    badge: 'CULTURAL',
    img: IMG.primeFilm,
    href: '/events',
    cta: 'See the 2026 calendar',
  },
  {
    when: 'Jun 19 – 21, 2026',
    h: 'Juhannus / Midsummer',
    body: 'Bonfires by lakes. Sauna at midnight. Lake swims at 18 °C. Cities empty out — locals leave for cabins.',
    icon: Flame,
    iconColor: 'text-pink',
    badge: 'NATIONAL',
    img: IMG.primeJuhannus,
    href: '/summer-nights',
    cta: 'How locals do Juhannus',
  },
];

export default function PrimeTime() {
  return (
    <section id="prime-time" className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden border-t border-white/5">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-pink/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.25em] text-pink font-bold mb-3">Next up in Lapland</p>
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl text-white tracking-tight">
            Don&rsquo;t miss the season window.
          </h2>
        </div>

        <div className="grid sm:grid-cols-3 gap-5">
          {cards.map((c) => (
            <Link
              key={c.h}
              to={c.href}
              className="group relative overflow-hidden rounded-3xl border border-white/10 hover:border-pink/40 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_-20px_rgba(236,72,153,0.4)] flex flex-col"
            >
              {/* Image — fully visible at top, slight darken at bottom */}
              <div
                className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                style={{ backgroundImage: `url(${c.img})` }}
              />
              {/* Bottom-only gradient — image visible top 60%, darken last 40% for text legibility */}
              <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-night via-night/85 to-transparent pointer-events-none" />

              <div className="relative p-7 min-h-[440px] flex flex-col">
                <div className="flex items-start justify-between mb-6">
                  <c.icon size={44} className={`${c.iconColor} drop-shadow-[0_0_18px_currentColor]`} strokeWidth={1.5} />
                  <span
                    className="text-[0.55rem] uppercase tracking-[0.25em] font-bold text-white bg-black/40 backdrop-blur-md border border-white/30 rounded-full px-2.5 py-1"
                    style={SHADOW}
                  >
                    {c.badge}
                  </span>
                </div>

                <div className="mt-auto">
                  <p className="text-[0.7rem] uppercase tracking-[0.2em] text-pink font-bold mb-2" style={SHADOW}>{c.when}</p>
                  <h3 className="font-heading text-2xl sm:text-3xl text-white tracking-tight leading-tight mb-3" style={SHADOW}>{c.h}</h3>
                  <p className="text-sm text-white leading-relaxed mb-5 line-clamp-3 font-medium" style={SHADOW}>{c.body}</p>

                  <div className="pt-3 border-t border-white/20 flex items-center justify-between">
                    <span className="text-xs uppercase tracking-[0.18em] text-pink font-bold" style={SHADOW}>{c.cta}</span>
                    <ArrowRight size={16} className="text-pink group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
