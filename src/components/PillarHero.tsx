import type { LucideIcon } from 'lucide-react';

interface PillarHeroProps {
  icon: LucideIcon;
  iconColor?: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  intro: string;
  bgImage?: string;
  /** Optional accent gradient. Defaults to a subtle bottom-only vignette. */
  accentClass?: string;
}

const SHADOW = {
  textShadow:
    '0 2px 4px rgba(0,0,0,0.85), 0 4px 10px rgba(0,0,0,0.7), 0 8px 24px rgba(0,0,0,0.55)',
};

export default function PillarHero({
  icon: Icon,
  iconColor = 'text-pink',
  eyebrow,
  title,
  subtitle,
  intro,
  bgImage = '/images/hero/aurora-bars-neon.webp',
  accentClass,
}: PillarHeroProps) {
  return (
    <section className="relative min-h-[70svh] pt-32 pb-20 sm:pt-36 sm:pb-24 px-4 sm:px-6 lg:px-8 flex items-end overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      {/* Thin bottom vignette only — keep the image visible. */}
      <div
        className={`absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t ${
          accentClass ?? 'from-night to-transparent'
        } pointer-events-none`}
      />

      <div className="relative w-full max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-white/15 border border-white/30 backdrop-blur-md rounded-full px-4 py-1.5 mb-6">
          <Icon size={14} className={iconColor} />
          <span className="text-[0.65rem] uppercase tracking-[0.25em] text-white font-bold" style={SHADOW}>{eyebrow}</span>
        </div>
        <h1
          className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white tracking-tight leading-[0.95] mb-5"
          style={SHADOW}
        >
          {title}
        </h1>
        <p
          className="text-xl sm:text-2xl text-white italic mb-6 max-w-2xl mx-auto leading-tight font-medium"
          style={SHADOW}
        >
          {subtitle}
        </p>
        <p
          className="text-white text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-medium"
          style={SHADOW}
        >
          {intro}
        </p>
      </div>
    </section>
  );
}
