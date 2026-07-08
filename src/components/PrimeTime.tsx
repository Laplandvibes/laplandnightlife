import { Link } from 'react-router-dom';
import { Sun, Film, Flame, ArrowRight } from 'lucide-react';
import { IMG } from '../data/images';
import { useLang, useLocalePath } from '../i18n/useLang';
import { COPY } from '../locales/copy';

const SHADOW = {
  textShadow:
    '0 2px 4px rgba(0,0,0,0.85), 0 4px 10px rgba(0,0,0,0.7)',
};

export default function PrimeTime() {
  const lang = useLang();
  const to = useLocalePath();
  const c = COPY[lang].primeTime;

  const cards = [
    {
      when: c.c1When, h: c.c1H, body: c.c1Body, badge: c.c1Badge, cta: c.c1Cta,
      icon: Sun, iconColor: 'text-neon-yellow', img: IMG.primeWindow, href: to('/summer-nights'),
    },
    {
      when: c.c2When, h: c.c2H, body: c.c2Body, badge: c.c2Badge, cta: c.c2Cta,
      icon: Film, iconColor: 'text-purple-light', img: IMG.primeFilm, href: to('/events'),
    },
    {
      when: c.c3When, h: c.c3H, body: c.c3Body, badge: c.c3Badge, cta: c.c3Cta,
      icon: Flame, iconColor: 'text-pink', img: IMG.primeJuhannus, href: to('/summer-nights'),
    },
  ];

  return (
    <section id="prime-time" className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden border-t border-white/5">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-pink/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.25em] text-pink font-bold mb-3">{c.eyebrow}</p>
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl text-white tracking-tight">
            {c.h}
          </h2>
        </div>

        <div className="grid sm:grid-cols-3 gap-5">
          {cards.map((card) => (
            <Link
              key={card.h}
              to={card.href}
              className="group relative overflow-hidden rounded-3xl border border-white/10 hover:border-pink/40 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_-20px_rgba(236,72,153,0.4)] flex flex-col"
            >
              <div
                className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                style={{ backgroundImage: `url(${card.img})` }}
              />
              {/* Scrim must reach the date eyebrow (~120px from card top =
                  ~70% up), not just the bottom 3/5 — otherwise the small pink
                  date floats on the bare image and vanishes on bright shots
                  like the sunset card (Vesa 2026-07-07). */}
              <div className="absolute inset-0 bg-gradient-to-t from-night from-5% via-night/85 via-[65%] to-transparent pointer-events-none" />

              <div className="relative p-7 min-h-[440px] flex flex-col">
                <div className="flex items-start justify-between mb-6">
                  <card.icon size={44} className={`${card.iconColor} drop-shadow-[0_0_18px_currentColor]`} strokeWidth={1.5} />
                  <span
                    className="text-[0.55rem] uppercase tracking-[0.25em] font-bold text-white bg-black/40 backdrop-blur-md border border-white/30 rounded-full px-2.5 py-1"
                    style={SHADOW}
                  >
                    {card.badge}
                  </span>
                </div>

                <div className="mt-auto">
                  <p className="text-[0.7rem] uppercase tracking-[0.2em] text-pink font-bold mb-2" style={SHADOW}>{card.when}</p>
                  <h3 className="font-heading text-2xl sm:text-3xl text-white tracking-tight leading-tight mb-3" style={SHADOW}>{card.h}</h3>
                  <p className="text-sm text-white leading-relaxed mb-5 line-clamp-3 font-medium" style={SHADOW}>{card.body}</p>

                  <div className="pt-3 border-t border-white/20 flex items-center justify-between">
                    <span className="text-xs uppercase tracking-[0.18em] text-pink font-bold" style={SHADOW}>{card.cta}</span>
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
