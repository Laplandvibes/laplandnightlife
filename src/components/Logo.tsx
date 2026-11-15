import type { CSSProperties } from 'react';

import { LV_SANAMERKKI } from './lvSanamerkki';
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
    <span translate="no"
      className={`notranslate font-heading text-2xl xl:text-3xl tracking-wide leading-none drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)] ${nav ? ' lv-wm' : ''} ${className}`}
      data-lv-sanamerkki={nav ? '' : undefined}
      style={nav ? WM_STYLE : undefined}
    >
      {/* VIRALLINEN sanamerkki (Vesa 14.11.2026; yläpalkki 15.11.2026 "sama leveys kuin nyt"): piirros ./lvSanamerkki.ts,
          leveys = entisen tekstin leveys, osat perivät entiset värinsä (currentColor). Teksti ruudunlukijalle ja hakukoneelle. */}
      <svg viewBox={LV_SANAMERKKI.viewBox} aria-hidden="true" focusable="false" style={{ width: `${LV_SANAMERKKI.leveysEm}em`, height: 'auto', display: 'inline-block', verticalAlign: 'middle', overflow: 'visible' }}>
        <path className="text-pink" fill="currentColor" d={LV_SANAMERKKI.d[0]} />
        <path className="text-white" fill="currentColor" d={LV_SANAMERKKI.d[1]} />
        <path className="text-pink" fill="currentColor" d={LV_SANAMERKKI.d[2]} />
      </svg>
      <span className="sr-only">#LAPLANDNIGHTLIFE</span>
    </span>
  );
}
