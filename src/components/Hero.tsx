import { ChevronDown } from 'lucide-react';
import { IMG } from '../data/images';

/** Strong multi-layer text shadow so white/purple text stays readable
 *  WITHOUT darkening the underlying image. */
const SHADOW = {
  textShadow:
    '0 2px 4px rgba(0,0,0,0.85), 0 4px 10px rgba(0,0,0,0.7), 0 8px 24px rgba(0,0,0,0.55)',
};

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] pt-24 pb-20 flex items-center overflow-hidden">
      {/* Background image — fully visible */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${IMG.heroHome})` }}
      />
      {/* No full-section overlay. Only a thin bottom vignette so the section transition isn't a hard line. */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-night to-transparent pointer-events-none" />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span
          className="inline-block bg-pink/25 border border-pink/60 text-white text-xs uppercase tracking-[0.25em] font-bold px-4 py-1.5 rounded-full mb-7 backdrop-blur-md"
          style={SHADOW}
        >
          #LaplandNightlife
        </span>

        <h1
          className="font-heading text-6xl sm:text-7xl md:text-8xl lg:text-[8.5rem] font-bold text-white leading-[0.95] tracking-tight mb-7"
          style={SHADOW}
        >
          Lapland<br />Nightlife
        </h1>

        <p
          className="text-xl sm:text-2xl md:text-3xl text-white italic mb-7 max-w-2xl mx-auto leading-tight font-medium"
          style={SHADOW}
        >
          The sky glows green. The bars stay open. The sun forgets to set.
        </p>

        <p
          className="text-base sm:text-lg text-white max-w-2xl mx-auto mb-10 leading-relaxed font-medium"
          style={SHADOW}
        >
          Finnish Lapland has a 1 700-capacity superclub on a ski slope, a 17th-century church
          where they screen films at 03:00 in full daylight, and a glass igloo bar where the
          ceiling is the aurora.
        </p>

        <div
          className="text-center text-xs text-white uppercase tracking-[0.22em] font-bold"
          style={SHADOW}
        >
          Part of the LaplandVibes network · 14 cities · 50+ verified venues · 20 events
        </div>

        <a
          href="#prime-time"
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white hover:text-pink transition-colors"
          aria-label="Scroll to content"
          style={SHADOW}
        >
          <ChevronDown size={32} className="animate-bounce" />
        </a>
      </div>
    </section>
  );
}
