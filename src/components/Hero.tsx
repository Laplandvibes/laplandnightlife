import { ChevronDown } from 'lucide-react';
import { heroHomeSeasonal, isSummerSeason } from '../data/images';
import { useLang } from '../i18n/useLang';
import { COPY } from '../locales/copy';

const SHADOW = {
  textShadow:
    '0 2px 4px rgba(0,0,0,0.85), 0 4px 10px rgba(0,0,0,0.7), 0 8px 24px rgba(0,0,0,0.55)',
};

export default function Hero() {
  const lang = useLang();
  const c = COPY[lang].home.hero;
  const heroImage = heroHomeSeasonal();
  // Same season check that drives heroHomeSeasonal(), so the hero TEXT matches
  // the hero IMAGE: summer (May–Sep) = midnight-sun copy, winter = aurora copy.
  const isSummer = isSummerSeason();
  const tagline = isSummer ? c.taglineSummer ?? c.tagline : c.tagline;
  const sub = isSummer ? c.subSummer ?? c.sub : c.sub;

  return (
    <section className="relative min-h-[100svh] pt-24 pb-20 flex items-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
        role="img"
        aria-label={isSummer ? 'A midsummer bonfire on a Lapland lake under the midnight sun' : 'Aurora glowing over a Finnish Lapland nightlife scene: bars and the night sky'}
      />
      {/* Center scrim — darkens behind the headline block so white text stays legible
          even over a bright midnight-sun image (Vesa: "liian kirkas, tekstit pitää tulla esiin"). */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 90% 70% at 50% 46%, rgba(8,10,22,0.64) 0%, rgba(8,10,22,0.34) 46%, rgba(8,10,22,0.10) 74%, transparent 90%)' }}
      />
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-night/80 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-night to-transparent pointer-events-none" />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span
          className="inline-block bg-pink/25 border border-pink/60 text-white text-xs uppercase tracking-[0.25em] font-bold px-4 py-1.5 rounded-full mb-7 backdrop-blur-md"
          style={SHADOW}
        >
          {c.badge}
        </span>

        <h1
          className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.95] tracking-tight mb-7 break-words"
          style={SHADOW}
        >
          {c.h1Line1}<br />{c.h1Line2}
        </h1>

        <p
          className="text-xl sm:text-2xl md:text-3xl text-white italic mb-7 max-w-2xl mx-auto leading-tight font-medium"
          style={SHADOW}
        >
          {tagline}
        </p>

        <p
          className="text-base sm:text-lg text-white max-w-2xl mx-auto mb-10 leading-relaxed font-medium"
          style={SHADOW}
        >
          {sub}
        </p>

        <div
          className="text-center text-xs text-white uppercase tracking-[0.22em] font-bold"
          style={SHADOW}
        >
          {c.meta}
        </div>

        <a
          href="#prime-time"
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white hover:text-pink transition-colors"
          aria-label={c.scroll}
          style={SHADOW}
        >
          <ChevronDown size={32} className="animate-bounce" />
        </a>
      </div>
    </section>
  );
}
