/**
 * Image registry — self-hosted under /images/drive/.
 *
 * 2026-06-09: migrated every Google Drive (lh3.googleusercontent.com) hotlink
 * to a locally-hosted, sharp-optimized WebP under public/images/drive/. Drive
 * was throttling real mobile traffic, leaving blank/dark blocks. Source Drive
 * file IDs are preserved in scripts/dl-drive.mjs for re-fetch if needed.
 */

/**
 * Seasonal switch — true May–Sep (months 5–9), false Oct–Apr.
 * Drives the home hero so the site shows midnight-sun summer nightlife in
 * summer and the aurora/neon winter scene the rest of the year.
 */
export const isSummerSeason = () => {
  const m = new Date().getMonth() + 1;
  return m >= 5 && m <= 9;
};

export const IMG = {
  // Site hero — local file so index.html <link rel="preload"> matches the fetch.
  // Winter (Oct–Apr) default; summer hero is selected at runtime in Hero.tsx
  // via isSummerSeason() + heroHomeSeasonal().
  heroHome: '/images/hero/aurora-bars-neon.webp',

  // Prime-time cards
  primeWindow: '/images/drive/primeWindow.webp',
  primeFilm: '/images/drive/primeFilm.webp',
  primeJuhannus: '/images/drive/primeJuhannus.webp',

  // Pillar hero backgrounds (per pillar, on-brand images Vesa created)
  pillarAuroraBars: '/images/drive/pillarAuroraBars.webp',
  pillarNightclubs: '/images/drive/pillarNightclubs.webp',
  pillarEvents: '/images/drive/pillarEvents.webp',
  pillarEventsAlt: '/images/drive/pillarEventsAlt.webp',
  pillarPhotography: '/images/drive/pillarPhotography.webp',
  pillarPhotographyAlt: '/images/drive/pillarPhotographyAlt.webp',
  pillarSummer: '/images/drive/pillarSummer.webp',

  // Atmospheric extras (HF-generated — moody venues + scenes)
  iceBar: '/images/drive/iceBar.webp',
  iceCastle: '/images/drive/iceCastle.webp',
  pubScene: '/images/drive/pubScene.webp',

  // Summer Nights pillar — bespoke set. Warm peach-gold palette, midnight-sun
  // window. These override the generic pillarSummer hero on /summer-nights.
  summerHero: '/images/drive/summerHero.webp',
  summerSodankyla: '/images/drive/summerSodankyla.webp',
  summerJuhannus: '/images/drive/summerJuhannus.webp',
  summerSwim: '/images/drive/summerSwim.webp',
  summerCycle: '/images/drive/summerCycle.webp',
  summerOulu: '/images/drive/summerOulu.webp',
  summerRovaniemi: '/images/drive/summerRovaniemi.webp',
  summerJazz: '/images/drive/summerJazz.webp',
  summerAirGuitar: '/images/drive/summerAirGuitar.webp',
  summerNordkapp: '/images/drive/summerNordkapp.webp',
  summerSauna: '/images/drive/summerSauna.webp',

  // HF-generated atmospheric library — section backgrounds, parallax, city teasers
  hf: [
    '/images/drive/hf0.webp',
    '/images/drive/hf1.webp',
    '/images/drive/hf2.webp',
    '/images/drive/hf3.webp',
    '/images/drive/hf4.webp',
    '/images/drive/hf5.webp',
    '/images/drive/hf6.webp',
    '/images/drive/hf7.webp',
    '/images/drive/hf8.webp',
    '/images/drive/hf9.webp',
    '/images/drive/hf10.webp',
    '/images/drive/hf11.webp',
    '/images/drive/hf12.webp',
    '/images/drive/hf13.webp',
    '/images/drive/hf14.webp',
    '/images/drive/hf15.webp',
    '/images/drive/hf16.webp',
    '/images/drive/hf17.webp',
    '/images/drive/hf18.webp',
    '/images/drive/hf19.webp',
    '/images/drive/hf20.webp',
    '/images/drive/hf21.webp',
    '/images/drive/hf22.webp',
    '/images/drive/hf23.webp',
    '/images/drive/hf24.webp',
    '/images/drive/hf25.webp',
    '/images/drive/hf26.webp',
    '/images/drive/hf27.webp',
  ],
};

/**
 * Home hero background, resolved by season at call time.
 * Summer (May–Sep): warm midnight-sun summer-nights scene.
 * Winter (Oct–Apr): aurora/neon bars scene.
 */
export const heroHomeSeasonal = () =>
  // Summer home hero = the Midsummer-bonfire night scene (a real "Lapland summer
  // night": people, warm twilight). Less washed-out than the old generic lake →
  // better text contrast, and on-theme for a nightlife site. (/summer-nights still
  // uses IMG.summerHero, unchanged.)
  isSummerSeason() ? '/images/drive/summerJuhannus.webp' : IMG.heroHome;
