import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const OUT = path.resolve('public/images/drive');
fs.mkdirSync(OUT, { recursive: true });

// key -> Drive FILE_ID. hf array flattened as hf0..hfN.
const MAP = {
  primeWindow: '1w_wyiGB8twYsVebUMptoN8bd58ZhPC9K',
  primeFilm: '1YBPdsNujvb7HHr728m33f8JUXfzRvGLj',
  primeJuhannus: '1_u_Tu4OVAELhB0Se_TfPCogEMwOY76cg',
  pillarAuroraBars: '1hYkCkHd9Bf7iY0d27uLxsyUE9En9pShI',
  pillarNightclubs: '1FfKnV6sf29CSkmMY840ImGMhcBwBpNaF',
  pillarEvents: '1P2I_5MfuF7Janbyq9n4h6mPEVZEFo_vz',
  pillarEventsAlt: '19cmjRI_gpKzQQZywd1PPwfpoVHtqsjlK',
  pillarPhotography: '1pnVznwTHmkBCkUhITxU-WGeuzv1hTjeb',
  pillarPhotographyAlt: '1Ye_69HaSOlFp351rU_TT4NUTBi0Rnz3w',
  pillarSummer: '1ccOY82hjI--T5FX0YPGaYF0yAqp4goCl',
  iceBar: '1pLfKQejXRhPgRokH8cL1COEaiXica5cO',
  iceCastle: '1ixu9wSyGpCPJ3zt0gq6yqocSVVRpn6wM',
  pubScene: '1ryuzLS-sGJObbfrqFY3kIcQrhBMYBkI5',
  summerHero: '14e-_k10wjJfGplUKbs49FS5Na380povc',
  summerSodankyla: '1sligbMB3qCfmuKr-EuMRUNu65aoa4Xev',
  summerJuhannus: '1jRFtBF7Y-HRELkxqh65swJU50P1yM6Ve',
  summerSwim: '1b7YoSHgdm_yhNrdI07VPXhlVfCzTnVr_',
  summerCycle: '1bgd8pg6Ip5vf1unBjgeA6vghEKKYQ4ne',
  summerOulu: '1DNay9fDsiATlapXU7jd213fHFhxiSLjr',
  summerRovaniemi: '1obl79w8mfxui7XEF0VLbdXyNw7_ZHYrk',
  summerJazz: '1k9SBAYQGu8t4oDfvI5H5grc7B3lFqEpq',
  summerAirGuitar: '1FODJfw9tp4AqTpPMncROvBSCooy6cmTA',
  summerNordkapp: '1iyfFpPTbowKlDKOz27MvLPuwNij5xdZj',
  summerSauna: '1kFtsrZNsZtmXqp5pncQgE04dC9mBvIy-',
  hf0: '1wOTH7QecJD9FVbMXfLOeN72y0xxZBPrV',
  hf1: '1i3RhsQYBTynDn0k-PnW8E28g1AEOtHVA',
  hf2: '1XFvvPt3KeWjk9xcgQPC9BaY1MOrJKQT7',
  hf3: '1lDwyoqdsQtQPxp32eT21bs6dS3Gx6_qS',
  hf4: '1WCTE50in8gVNEhuFAa5H743VN63Tq-Re',
  hf5: '19VrzyV-Cp1KlyR06GZVV94f-ovwLsaj0',
  hf6: '1aCvFzvSoC0gxHymSe42LiRrEJdT7ttHO',
  hf7: '1Z1C9kABXpeHxUoxKVkkE6GxF0qU_tPT2',
  hf8: '1dON1wtOz8YxxHinS2pJHYLWrLp4f0Ntg',
  hf9: '1y8EkLwFQXleqamwJhQk3FhsfS40cI1k1',
  hf10: '1h0JWb412MKkmNiDI9iardrrPRGf8G1rF',
  hf11: '1l5RRIqw15l-HaJiS__mw1HDMgZfWaVj4',
  hf12: '1hJou8g-dC-zNqPl5aq6w-jhPlH51z0PR',
  hf13: '1rsCW4Z5aAR7DW9cBW9MlIy9lZp_uwQi0',
  hf14: '12Ugx0Lp3OQqrhGQyBqIaacVxA9AaBhTe',
  hf15: '1RWbRYYS8VzXyS7SEWNC2NyFEy0EKFKQs',
  hf16: '1AaFi0UvnO7BtvZ5O54S10d977-wltJPn',
  hf17: '1UzSiS1K_Ns4XMkz1QpJio4cJyS8OKMfi',
  hf18: '1B264M90sSOAlY73oK0W0VxJWS7VpugYI',
  hf19: '1sq9KpwWrdeDLbxzrLzDXPNFklpmcGUsI',
  hf20: '11YXMJyOONbT6wYGUqS1Ia5cBpqdvBVO2',
  hf21: '1ps1dt-HfHVrKrtDhHVmV55bbmvppPfBb',
  hf22: '1cqxeIRugTO-4oXX6Tsc0ye06FsU3Snv-',
  hf23: '1PilPncFAxCoTGwfgImpq_6kPCKjDdE6y',
  hf24: '1zFTXj1LWeoEIK9iCkFZLEy22XPGhMMip',
  hf25: '1vQsOI-sgOCDuF-G0NJD6MxwcngncJuIM',
  hf26: '1YzuQdERhSlCwnRRWTBvyYQ9dbT-nHHXW',
  hf27: '1Rxezm7rxXTHtkuCiXO4S475ZDmUIQl4o',
};

const failures = [];
const results = [];

async function processOne(key, id) {
  const url = `https://lh3.googleusercontent.com/d/${id}=w1600-rw`;
  const isHero = key.startsWith('hero') || key.startsWith('pillar') || key === 'summerHero';
  const maxW = isHero ? 1600 : 1100;
  const quality = isHero ? 80 : 76;
  try {
    const res = await fetch(url, { redirect: 'follow' });
    if (!res.ok) { failures.push(`${key} (${id}): HTTP ${res.status}`); return; }
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 1000) { failures.push(`${key} (${id}): tiny response ${buf.length}b`); return; }
    const dest = path.join(OUT, `${key}.webp`);
    await sharp(buf)
      .resize({ width: maxW, withoutEnlargement: true })
      .webp({ quality, effort: 4 })
      .toFile(dest);
    const kb = Math.round(fs.statSync(dest).size / 1024);
    results.push(`${key}.webp ${kb}KB`);
    console.log(`OK ${key}.webp ${kb}KB`);
  } catch (e) {
    failures.push(`${key} (${id}): ${e.message}`);
    console.log(`FAIL ${key}: ${e.message}`);
  }
}

const entries = Object.entries(MAP);
for (let i = 0; i < entries.length; i += 6) {
  await Promise.all(entries.slice(i, i + 6).map(([k, id]) => processOne(k, id)));
}

console.log('\n=== DONE ===');
console.log(`localized: ${results.length}`);
console.log(`failures: ${failures.length}`);
if (failures.length) console.log(failures.join('\n'));
