#!/usr/bin/env node
/**
 * gen-heroes.mjs — generoi kuvapinnat `hero-prompts.mjs`:n manifestista.
 *
 * Malli `gemini-3-pro-image` 4K = **8 cr/generointi** (Vesan päätös 9.9.2026).
 * Skripti EI aja mitään ilman `--apply`, ja `--only`/`--limit` rajaavat erän,
 * jotta hinta on aina tiedossa etukäteen — ks. [[feedback_kerro_hinta_ennen_toteutusta]].
 *
 * 🔴 `--download` on HAKEMISTO ja CLI nimeää tiedoston uuidilla. Onnistumista
 *    EI saa tarkistaa kohdetiedostonimestä: se on aina epätosi ja retry-silmukka
 *    generoi uudestaan täyteen hintaan (mitattu 6.9. laplandvisitissä, 12 kr).
 *    Siksi: luetaan hakemiston UUSIN tiedosto ja verrataan aikaleimaan.
 *
 * 🔴 Valmis kuva EI ole valmis ennen kuin se on KATSOTTU. Skripti jättää
 *    masterit `_hero-out/`iin; sijoitus `public/`iin on erillinen komento
 *    (`--place`) joka ajetaan vasta katselmoinnin jälkeen.
 *
 * Käyttö:
 *   node scripts/gen-heroes.mjs                       # listaa erän ja hinnan
 *   node scripts/gen-heroes.mjs --apply --limit 4     # generoi 4 (32 cr)
 *   node scripts/gen-heroes.mjs --apply --only city-levi,city-kemi
 *   node scripts/gen-heroes.mjs --place               # webp public/:iin
 */

import fs from 'node:fs';
import path from 'node:path';
import { promisify } from 'node:util';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { SURFACES, buildPrompt, NEG } from './hero-prompts.mjs';

import { exec } from 'node:child_process';
const run = promisify(exec);
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sharp = createRequire(path.join(ROOT, '..', 'laplandgifts', 'package.json'))('sharp');

const args = process.argv.slice(2);
const APPLY = args.includes('--apply');
const PLACE = args.includes('--place');
const flag = (n) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : null; };
const ONLY = (flag('--only') || '').split(',').filter(Boolean);
const LIMIT = parseInt(flag('--limit') || '0', 10);

const MODEL = 'gemini-3-pro-image';
const CR_PER_IMAGE = 8;
const OUT_DIR = path.join(ROOT, '_hero-out');
/** Hero renderöityy 2560 px:iin asti; kortti 450 px:iin. Masteri on 5504 px,
 *  mutta sitä ei tarjoilla sellaisenaan — 18 MB PNG ei kuulu sivulle. */
const WIDTH = { hero: 2560, card: 1200 };

fs.mkdirSync(OUT_DIR, { recursive: true });

const done = (key) => fs.existsSync(path.join(OUT_DIR, `${key}.png`));
let queue = SURFACES.filter((s) => (ONLY.length ? ONLY.includes(s.key) : !done(s.key)));
if (LIMIT > 0) queue = queue.slice(0, LIMIT);

/* ── sijoitus: master → webp → public/ ─────────────────────────────────── */
if (PLACE) {
  let n = 0;
  for (const s of SURFACES) {
    const master = path.join(OUT_DIR, `${s.key}.png`);
    if (!fs.existsSync(master)) continue;
    const dest = path.join(ROOT, 'public', s.out);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    await sharp(master)
      .resize({ width: WIDTH[s.kind], withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(dest);
    const m = await sharp(dest).metadata();
    console.log(`  ${s.out.padEnd(42)} ${m.width}x${m.height}  ${Math.round(fs.statSync(dest).size / 1024)} kt`);
    n++;
  }
  console.log(`\n${n} kuvaa sijoitettu public/:iin.`);
  process.exit(0);
}

/* ── generointi ────────────────────────────────────────────────────────── */
console.log(`\nMalli: ${MODEL} · 4K 16:9 · ${CR_PER_IMAGE} cr/kuva`);
console.log(`Jonossa: ${queue.length} kuvaa = ${queue.length * CR_PER_IMAGE} cr\n`);
for (const s of queue) console.log(`  ${s.key.padEnd(24)} ${s.kind.padEnd(5)} ${s.out}`);

if (!APPLY) {
  console.log(`\nKUIVAHARJOITUS — mitään ei generoitu, 0 cr. Aja --apply.\n`);
  process.exit(0);
}

const tmp = path.join(OUT_DIR, '_tmp');
fs.mkdirSync(tmp, { recursive: true });
let spent = 0;

for (const s of queue) {
  const before = new Set(fs.readdirSync(tmp));
  process.stdout.write(`  ${s.key.padEnd(24)} `);
  // 🔴 `shell: true` liittaa argumentit ESCAPAAMATTA yhteen: pitka prompti
  // hajosi sanoiksi ja CLI vastasi "Unexpected arguments: the, the, the...".
  // Prompti menee siksi tiedostona (`--prompt-file`), ja loput lainataan kasin.
  const pf = path.join(OUT_DIR, '_prompt.txt');
  fs.writeFileSync(pf, buildPrompt(s), 'utf8');
  const cmd = [
    'gen-ai image', '-m', MODEL, '-r 4K', '--aspect-ratio 16:9', '-n 1',
    `--download "${tmp}"`, `--negative-prompt "${NEG}"`, `--prompt-file "${pf}"`,
  ].join(' ');
  try {
    await run(cmd, { maxBuffer: 1024 * 1024 * 32, shell: true });
  } catch (e) {
    console.log(`✗ ${String(e.message).slice(0, 90)}`);
    continue;
  }
  // Uusin uusi tiedosto — EI kohdenimen olemassaolo.
  const fresh = fs.readdirSync(tmp).filter((f) => !before.has(f));
  if (!fresh.length) { console.log('✗ ei uutta tiedostoa (krediitti saattoi silti kulua)'); continue; }
  spent += CR_PER_IMAGE;
  const src = path.join(tmp, fresh[0]);
  const dst = path.join(OUT_DIR, `${s.key}.png`);
  fs.renameSync(src, dst);
  const m = await sharp(dst).metadata();
  console.log(`✓ ${m.width}x${m.height}  ${Math.round(fs.statSync(dst).size / 1024 / 1024)} MB`);
  await new Promise((r) => setTimeout(r, 3000));
}

console.log(`\nKäytetty: ${spent} cr. Masterit: _hero-out/`);
console.log(`🔴 Katso jokainen kuva ennen kuin ajat --place.\n`);
