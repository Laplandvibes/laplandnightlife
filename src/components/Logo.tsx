import type { CSSProperties } from 'react';

// Sanamerkin leveys 1 px:n fontilla (Bebas Neue + tracking-wide). Puhelin- ja tablettinavissa koko lasketaan
// tästä ja vapaasta tilasta (index.css LV-NAV-SANAMERKKI): 24 px, pienempi vain kun ei mahdu.
const WM_STYLE = { '--lv-wm-k': 6.6 } as CSSProperties;

interface LogoProps {
  className?: string;
  /** Navin sanamerkki: koko puhelin- ja tablettinavissa vapaan tilan mukaan (index.css LV-NAV-SANAMERKKI). */
  nav?: boolean;
}

/**
 * #LAPLANDNIGHTLIFE: verkoston sanamerkki samassa muodossa kuin #LAPLANDVIBES (CLAUDE.md, NETWORK RULE):
 * pinkki #, valkoinen LAPLAND, pinkki brändisana, Bebas Neue, tracking-wide. Aiempi #Lapland·Nightlife
 * (violetti erotin, valkoinen brändisana) oli dokumentoimaton poikkeama.
 */
export default function Logo({ className = '', nav = false }: LogoProps) {
  return (
    <span
      className={`font-heading text-2xl tracking-wide leading-none drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)] ${nav ? ' lv-wm' : ''} ${className}`}
      data-lv-sanamerkki={nav ? '' : undefined}
      style={nav ? WM_STYLE : undefined}
    >
      <span className="text-pink">#</span>
      <span className="text-white">LAPLAND</span>
      <span className="text-pink">NIGHTLIFE</span>
    </span>
  );
}
