/**
 * Image registry — Drive-hosted via lh3.googleusercontent.com.
 * Vesa generated all of these in the Laplandnightlife.com Drive folder.
 *
 * URL pattern: `https://lh3.googleusercontent.com/d/{FILE_ID}=w{width}-rw`
 *  - `=w1600-rw`  → WebP, max 1600px wide, used for hero backgrounds
 *  - `=w800-rw`   → WebP, max 800px wide, used for cards
 *
 * The `-rw` suffix asks Google for WebP. Drop it for native format.
 */

const W = 'https://lh3.googleusercontent.com/d/';

export const IMG = {
  // Site hero (new dramatic image generated for the home)
  heroHome: `${W}1nJrdrErMj_gni2w_vbfJj0A4eMMQBTTJ=w1920-rw`,

  // Prime-time cards
  primeWindow: `${W}1w_wyiGB8twYsVebUMptoN8bd58ZhPC9K=w1200-rw`,
  primeFilm: `${W}1YBPdsNujvb7HHr728m33f8JUXfzRvGLj=w1200-rw`,
  primeJuhannus: `${W}1_u_Tu4OVAELhB0Se_TfPCogEMwOY76cg=w1200-rw`,

  // Pillar hero backgrounds (per pillar, on-brand images Vesa created)
  pillarAuroraBars: `${W}1hYkCkHd9Bf7iY0d27uLxsyUE9En9pShI=w1920-rw`,
  pillarNightclubs: `${W}1FfKnV6sf29CSkmMY840ImGMhcBwBpNaF=w1920-rw`,
  pillarEvents: `${W}1P2I_5MfuF7Janbyq9n4h6mPEVZEFo_vz=w1920-rw`,
  pillarEventsAlt: `${W}19cmjRI_gpKzQQZywd1PPwfpoVHtqsjlK=w1920-rw`,
  pillarPhotography: `${W}1pnVznwTHmkBCkUhITxU-WGeuzv1hTjeb=w1920-rw`,
  pillarPhotographyAlt: `${W}1Ye_69HaSOlFp351rU_TT4NUTBi0Rnz3w=w1920-rw`,
  pillarSummer: `${W}1ccOY82hjI--T5FX0YPGaYF0yAqp4goCl=w1920-rw`,

  // Atmospheric extras (HF-generated — moody venues + scenes)
  iceBar: `${W}1pLfKQejXRhPgRokH8cL1COEaiXica5cO=w1200-rw`,
  iceCastle: `${W}1ixu9wSyGpCPJ3zt0gq6yqocSVVRpn6wM=w1200-rw`,
  pubScene: `${W}1ryuzLS-sGJObbfrqFY3kIcQrhBMYBkI5=w1200-rw`,

  // Summer Nights pillar — bespoke set generated 2026-04-27 from prompts in
  // memory `lv_summer_marketing_gap.md`. Warm peach-gold palette, midnight-sun
  // window. These override the generic pillarSummer hero on /summer-nights.
  summerHero: `${W}14e-_k10wjJfGplUKbs49FS5Na380povc=w1920-rw`,
  summerSodankyla: `${W}1sligbMB3qCfmuKr-EuMRUNu65aoa4Xev=w1200-rw`,
  summerJuhannus: `${W}1jRFtBF7Y-HRELkxqh65swJU50P1yM6Ve=w1200-rw`,
  summerSwim: `${W}1b7YoSHgdm_yhNrdI07VPXhlVfCzTnVr_=w1200-rw`,
  summerCycle: `${W}1bgd8pg6Ip5vf1unBjgeA6vghEKKYQ4ne=w1200-rw`,
  summerOulu: `${W}1DNay9fDsiATlapXU7jd213fHFhxiSLjr=w1200-rw`,
  summerRovaniemi: `${W}1obl79w8mfxui7XEF0VLbdXyNw7_ZHYrk=w1200-rw`,
  summerJazz: `${W}1k9SBAYQGu8t4oDfvI5H5grc7B3lFqEpq=w1200-rw`,
  summerAirGuitar: `${W}1FODJfw9tp4AqTpPMncROvBSCooy6cmTA=w1200-rw`,
  summerNordkapp: `${W}1iyfFpPTbowKlDKOz27MvLPuwNij5xdZj=w1200-rw`,
  summerSauna: `${W}1kFtsrZNsZtmXqp5pncQgE04dC9mBvIy-=w1200-rw`,

  // HF-generated atmospheric library — usable as section backgrounds, parallax, city teasers
  hf: [
    `${W}1wOTH7QecJD9FVbMXfLOeN72y0xxZBPrV=w1200-rw`,
    `${W}1i3RhsQYBTynDn0k-PnW8E28g1AEOtHVA=w1200-rw`,
    `${W}1XFvvPt3KeWjk9xcgQPC9BaY1MOrJKQT7=w1200-rw`,
    `${W}1lDwyoqdsQtQPxp32eT21bs6dS3Gx6_qS=w1200-rw`,
    `${W}1WCTE50in8gVNEhuFAa5H743VN63Tq-Re=w1200-rw`,
    `${W}19VrzyV-Cp1KlyR06GZVV94f-ovwLsaj0=w1200-rw`,
    `${W}1aCvFzvSoC0gxHymSe42LiRrEJdT7ttHO=w1200-rw`,
    `${W}1Z1C9kABXpeHxUoxKVkkE6GxF0qU_tPT2=w1200-rw`,
    `${W}1dON1wtOz8YxxHinS2pJHYLWrLp4f0Ntg=w1200-rw`,
    `${W}1y8EkLwFQXleqamwJhQk3FhsfS40cI1k1=w1200-rw`,
    `${W}1h0JWb412MKkmNiDI9iardrrPRGf8G1rF=w1200-rw`,
    `${W}1l5RRIqw15l-HaJiS__mw1HDMgZfWaVj4=w1200-rw`,
    `${W}1hJou8g-dC-zNqPl5aq6w-jhPlH51z0PR=w1200-rw`,
    `${W}1rsCW4Z5aAR7DW9cBW9MlIy9lZp_uwQi0=w1200-rw`,
    `${W}12Ugx0Lp3OQqrhGQyBqIaacVxA9AaBhTe=w1200-rw`,
    `${W}1RWbRYYS8VzXyS7SEWNC2NyFEy0EKFKQs=w1200-rw`,
    `${W}1AaFi0UvnO7BtvZ5O54S10d977-wltJPn=w1200-rw`,
    `${W}1UzSiS1K_Ns4XMkz1QpJio4cJyS8OKMfi=w1200-rw`,
    `${W}1B264M90sSOAlY73oK0W0VxJWS7VpugYI=w1200-rw`,
    `${W}1sq9KpwWrdeDLbxzrLzDXPNFklpmcGUsI=w1200-rw`,
    `${W}11YXMJyOONbT6wYGUqS1Ia5cBpqdvBVO2=w1200-rw`,
    `${W}1ps1dt-HfHVrKrtDhHVmV55bbmvppPfBb=w1200-rw`,
    `${W}1cqxeIRugTO-4oXX6Tsc0ye06FsU3Snv-=w1200-rw`,
    `${W}1PilPncFAxCoTGwfgImpq_6kPCKjDdE6y=w1200-rw`,
    `${W}1zFTXj1LWeoEIK9iCkFZLEy22XPGhMMip=w1200-rw`,
    `${W}1vQsOI-sgOCDuF-G0NJD6MxwcngncJuIM=w1200-rw`,
    `${W}1YzuQdERhSlCwnRRWTBvyYQ9dbT-nHHXW=w1200-rw`,
    `${W}1Rxezm7rxXTHtkuCiXO4S475ZDmUIQl4o=w1200-rw`,
  ],
};
