import type { LucideIcon } from 'lucide-react';
import PageBreadcrumb from './PageBreadcrumb';

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
  /**
   * Accessible description of the background image. Defaults to a descriptive
   * label built from the (already-localized) page title so the primary visual
   * is exposed to screen readers and image search instead of being an
   * invisible CSS background.
   */
  imageAlt?: string;
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
  imageAlt,
}: PillarHeroProps) {
  return (
    <>
    <section className="relative min-h-[56vh] md:min-h-[62vh] pt-28 py-16 md:py-20 px-4 sm:px-6 lg:px-8 flex items-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgImage})`, filter: 'saturate(1.2)' }}
        role="img"
        aria-label={imageAlt ?? `${title} — Finnish Lapland nightlife`}
      />
      {/* Full dark wash + center radial scrim so the centered text stays legible
          even over the brightest pillar images. Sits under the neon accents. */}
      <div className="absolute inset-0 bg-night/35 pointer-events-none" aria-hidden="true" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 85% 60% at 50% 45%, rgba(8,10,22,0.62) 0%, transparent 72%)',
        }}
        aria-hidden="true"
      />
      {/* Neon glow accents — adds nightlife energy without obscuring image */}
      <div
        className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full pointer-events-none mix-blend-screen opacity-50"
        style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.55) 0%, transparent 70%)' }}
        aria-hidden="true"
      />
      <div
        className="absolute top-1/3 -right-32 w-[500px] h-[500px] rounded-full pointer-events-none mix-blend-screen opacity-45"
        style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.55) 0%, transparent 70%)' }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full pointer-events-none mix-blend-screen opacity-30 blur-2xl"
        style={{ background: 'radial-gradient(ellipse, rgba(6,182,212,0.5) 0%, transparent 70%)' }}
        aria-hidden="true"
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
          className="font-heading text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white tracking-tight leading-[0.95] mb-5 break-words hyphens-auto"
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
    <PageBreadcrumb />
    </>
  );
}
