#!/usr/bin/env node
/**
 * verify-venues.mjs — fact-check every named venue in `src/data/cities.ts`
 * against Google Places API (New).
 *
 * Run:
 *   cd laplandnightlife-new && node scripts/verify-venues.mjs
 *
 * Cost: Places API (New) Text Search, **Pro** SKU = $0.032 / request, one per
 * named venue. The field mask is deliberately minimal — `reviews`,
 * `regularOpeningHours`, `websiteUri` and `priceLevel` are Enterprise-tier and
 * would multiply the bill.
 *
 * Writes exactly one file:
 *   src/data/generated/venues-from-maps.json
 *
 * It NEVER writes src/data/cities.ts — that is the hand-maintained editorial
 * layer, so a re-run can never clobber editorial work.
 *
 * ── FAIL CLOSED ──────────────────────────────────────────────────────────────
 * Gate set is the union of the hardening learned on laplandhoteldeals,
 * laplandstays and laplandweddings: NAME (word-boundary containment, or
 * compacted containment / Dice >= 0.72 both guarded by the chain-sibling rule),
 * NOT-THE-PLACE, HEAD TOKEN, SUB-UNIT (`rejectNames`), PLACE, BBOX, and a
 * post-pass UNIQUE PLACE check.
 *
 * 🔴 Site-specific risk: nightlife venues turn over fast, and most of the
 * entries here are bars INSIDE a hotel ("Hotel Ivalo Lobby Bar"). Two failure
 * modes follow:
 *   1. A hotel's identity must not be published as the bar's, so the parent
 *      hotel listing is rejected by name and recorded separately.
 *   2. A venue that has closed is the single most valuable finding, so
 *      businessStatus is RECORDED rather than silently dropped.
 * 🔴 Seasonal caveat: this site's ski-resort and winter-attraction venues
 * legitimately return CLOSED_TEMPORARILY in summer. A July run cannot tell
 * "shut for the season" from "shut for good" — treat CLOSED_TEMPORARILY as a
 * re-check flag, never as grounds for deletion.
 *
 * Geography note: this site is NOT Lapland-only. Oulu (65.01 N) is North
 * Ostrobothnia and Ruka/Kuusamo (66.17 N) is Kuusamo, not Lapland, so the box
 * below is "northern Finland", wider than the Lapland box used on sister sites.
 *
 * The API key is read from .env.local (gitignored), never printed, never
 * written to any output file, never committed.
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const PLACES_BASE = 'https://places.googleapis.com/v1';

async function loadApiKey() {
  const envPath = path.join(ROOT, '.env.local');
  let envText;
  try {
    envText = await fs.readFile(envPath, 'utf-8');
  } catch {
    console.error(`FATAL: ${envPath} not found. Add GOOGLE_MAPS_API_KEY=... to it.`);
    process.exit(1);
  }
  const m = envText.match(/^GOOGLE_MAPS_API_KEY\s*=\s*(.+?)\s*$/m);
  if (!m) {
    console.error('FATAL: GOOGLE_MAPS_API_KEY missing from .env.local');
    process.exit(1);
  }
  return m[1].replace(/^["']|["']$/g, '');
}

/** Localities each city slug may legitimately resolve to, folded. */
const CITY = {
  oulu: { q: 'Oulu, Finland', loc: ['oulu'] },
  rovaniemi: { q: 'Rovaniemi, Lapland, Finland', loc: ['rovaniemi', 'sinetta', 'lehtojarvi'] },
  levi: { q: 'Levi, Kittilä, Lapland, Finland', loc: ['levi', 'sirkka', 'kittila', 'kongas'] },
  saariselka: { q: 'Saariselkä, Inari, Lapland, Finland', loc: ['saariselka', 'inari', 'ivalo', 'kakslauttanen'] },
  inari: { q: 'Inari, Lapland, Finland', loc: ['inari', 'ivalo'] },
  kemi: { q: 'Kemi, Lapland, Finland', loc: ['kemi'] },
  yllas: { q: 'Ylläs, Kolari, Lapland, Finland', loc: ['yllas', 'yllasjarvi', 'akaslompolo', 'kolari'] },
  // Ruka is in Kuusamo, North Ostrobothnia — NOT Lapland. Kept distinct on purpose.
  ruka: { q: 'Ruka, Kuusamo, Finland', loc: ['ruka', 'kuusamo'] },
  'pyha-luosto': { q: 'Pyhätunturi, Pelkosenniemi, Finland', loc: ['pyha', 'pyhatunturi', 'luosto', 'pelkosenniemi', 'sodankyla'] },
  sodankyla: { q: 'Sodankylä, Lapland, Finland', loc: ['sodankyla'] },
  kittila: { q: 'Kittilä, Lapland, Finland', loc: ['kittila', 'levi', 'sirkka'] },
  ivalo: { q: 'Ivalo, Inari, Lapland, Finland', loc: ['ivalo', 'inari'] },
  muonio: { q: 'Muonio, Lapland, Finland', loc: ['muonio', 'jeris', 'harriniva', 'olos'] },
  salla: { q: 'Salla, Lapland, Finland', loc: ['salla'] },
};

/**
 * Per-venue listing exclusions. 🔴 Every entry here is a bar that lives inside
 * a hotel: the parent hotel's listing must not stand in for the bar.
 */
const REJECT_NAMES = {
  'Panorama Sky Bar': ['lapland hotels levi panorama'],
  'Club Nord (Hotel Ivalo)': [],
  'Kakslauttanen Igloo Bar': ['east village', 'west village'],
  'SnowCastle Ice Bar': ['seaside glass villas'],
};

/** Northern Finland bounding box (Oulu 65.01 N in the south, Nuorgam 70.09 N). */
const NORTH_BBOX = { minLat: 64.6, maxLat: 70.2, minLng: 20.0, maxLng: 31.0 };

// ── Registry reader ────────────────────────────────────────────────────────
async function readRegistry() {
  const src = (await fs.readFile(path.join(ROOT, 'src/data/cities.ts'), 'utf-8')).replace(/\r\n/g, '\n');
  const out = [];
  const cityRe = /slug:\s*'([^']+)'[\s\S]*?venues:\s*\[([\s\S]*?)\n {4}\]/g;
  let m;
  while ((m = cityRe.exec(src)) !== null) {
    const slug = m[1];
    // name may be single- or double-quoted and may contain escaped quotes.
    const vRe = /name:\s*(?:'((?:[^'\\]|\\.)*)'|"((?:[^"\\]|\\.)*)")\s*,\s*type:\s*'((?:[^'\\]|\\.)*)'/g;
    let v;
    while ((v = vRe.exec(m[2])) !== null) {
      const name = (v[1] !== undefined ? v[1] : v[2]).replace(/\\(['"\\])/g, '$1');
      out.push({ slug, name, type: v[3].replace(/\\(['"\\])/g, '$1') });
    }
  }
  if (out.length === 0) {
    console.error('FATAL: could not parse any venues out of src/data/cities.ts.');
    console.error('       The registry format changed — fix the parser before trusting a run.');
    process.exit(1);
  }
  return out;
}

// ── Name matching ──────────────────────────────────────────────────────────
const fold = (s) =>
  s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const compact = (s) => fold(s).replace(/ /g, '');

function bigrams(s) {
  const out = new Set();
  for (let i = 0; i < s.length - 1; i++) out.add(s.slice(i, i + 2));
  return out;
}
function dice(a, b) {
  const A = bigrams(a), B = bigrams(b);
  if (A.size === 0 || B.size === 0) return 0;
  let shared = 0;
  for (const g of A) if (B.has(g)) shared++;
  return (2 * shared) / (A.size + B.size);
}
const NAME_MIN_DICE = 0.72;

const GENERIC_TOKENS = new Set([
  'hotel', 'hotels', 'resort', 'resorts', 'inn', 'lodge', 'spa', 'suites',
  'apartments', 'chalets', 'cabins', 'igloos', 'glass', 'activities', 'safaris',
  'oy', 'ab', 'oyj', 'ltd', 'the', 'and',
  'bar', 'bars', 'pub', 'pubs', 'club', 'nightclub', 'lounge', 'cafe',
  'restaurant', 'ravintola', 'baari', 'grill', 'kitchen', 'night', 'baari',
]);
const CHAIN_GUARD_MIN_LEN = 5;

function chainSiblingGate(expected, candidate) {
  const exp = new Set(fold(expected).split(' ').filter(Boolean));
  const intruders = fold(candidate).split(' ')
    .filter((t) => t.length >= CHAIN_GUARD_MIN_LEN && !GENERIC_TOKENS.has(t) && !exp.has(t));
  return { ok: intruders.length === 0, intruders };
}

function boundaryContains(hay, needle) {
  if (!hay || !needle) return false;
  let from = 0;
  for (;;) {
    const i = hay.indexOf(needle, from);
    if (i === -1) return false;
    const end = i + needle.length;
    if ((i === 0 || hay[i - 1] === ' ') && (end === hay.length || hay[end] === ' ')) return true;
    from = i + 1;
  }
}

function nameGate(expected, candidate) {
  const a = compact(expected), b = compact(candidate);
  if (!a || !b) return { ok: false, score: 0, how: 'empty' };
  const af = fold(expected), bf = fold(candidate);
  if (boundaryContains(bf, af) || boundaryContains(af, bf)) return { ok: true, score: 1, how: 'containment' };
  if (b.includes(a) || a.includes(b)) {
    const chain = chainSiblingGate(expected, candidate);
    if (chain.ok) return { ok: true, score: 1, how: 'containment (compacted)' };
    return { ok: false, score: 1, how: `compacted containment but chain sibling — adds "${chain.intruders.join('", "')}"` };
  }
  const d = dice(a, b);
  if (d < NAME_MIN_DICE) return { ok: false, score: d, how: `dice ${d.toFixed(2)}` };
  const chain = chainSiblingGate(expected, candidate);
  if (!chain.ok) return { ok: false, score: d, how: `dice ${d.toFixed(2)} but chain sibling — adds "${chain.intruders.join('", "')}"` };
  return { ok: true, score: d, how: `dice ${d.toFixed(2)}` };
}

function genericNameGate(candidate, localities) {
  const c = compact(candidate);
  if (c.length < 5) return { ok: false, why: `candidate name "${candidate}" too short to identify a business` };
  if (localities.some((l) => compact(l) === c)) return { ok: false, why: `candidate "${candidate}" is the locality itself, not the venue` };
  return { ok: true };
}

function headTokenGate(expected, candidate) {
  const tokens = fold(expected).split(' ').filter(Boolean);
  const head = tokens[tokens.length - 1];
  if (!head) return { ok: true };
  const ok = compact(candidate).includes(head);
  return { ok, why: ok ? '' : `"${candidate}" is missing the identifying word "${head}" — likely a sibling property or the parent hotel` };
}

function rejectListGate(candidate, rejectNames = []) {
  const c = compact(candidate);
  const hit = rejectNames.find((r) => c.includes(compact(r)));
  return { ok: !hit, why: hit ? `"${candidate}" is a sub-unit / parent listing ("${hit}"), not the venue as published` : '' };
}

function placeGate(address, localities) {
  const a = fold(address || '');
  const hit = localities.find((l) => a.includes(l));
  return { ok: Boolean(hit), hit };
}

function bboxGate(loc) {
  if (!loc || typeof loc.latitude !== 'number' || typeof loc.longitude !== 'number') return { ok: false, why: 'no coordinate' };
  const { latitude: lat, longitude: lng } = loc;
  const ok = lat >= NORTH_BBOX.minLat && lat <= NORTH_BBOX.maxLat && lng >= NORTH_BBOX.minLng && lng <= NORTH_BBOX.maxLng;
  return { ok, why: ok ? '' : `outside northern Finland (${lat.toFixed(3)}, ${lng.toFixed(3)})` };
}

const FIELD_MASK = [
  'places.id', 'places.displayName', 'places.formattedAddress', 'places.location',
  'places.rating', 'places.userRatingCount', 'places.businessStatus',
].join(',');

async function textSearch(apiKey, textQuery) {
  const res = await fetch(`${PLACES_BASE}/places:searchText`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Goog-Api-Key': apiKey, 'X-Goog-FieldMask': FIELD_MASK },
    body: JSON.stringify({ textQuery, languageCode: 'en', regionCode: 'FI', maxResultCount: 5 }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`HTTP ${res.status}: ${body.slice(0, 400)}`);
  }
  const data = await res.json();
  return data.places || [];
}

// ── Main ───────────────────────────────────────────────────────────────────
async function main() {
  const apiKey = await loadApiKey();
  const registry = await readRegistry();
  const today = new Date().toISOString().slice(0, 10);

  console.log(`Registry: ${registry.length} venues parsed from src/data/cities.ts`);
  console.log('Places API (New) Text Search · Pro SKU · ~$0.032/request\n');

  const matched = {};
  const unmatched = [];
  const closed = [];
  let requests = 0;

  for (const venue of registry) {
    const key = `${venue.slug}/${venue.name}`;
    const city = CITY[venue.slug];
    if (!city) {
      unmatched.push({ key, name: venue.name, slug: venue.slug, reason: `no CITY entry for slug "${venue.slug}"` });
      console.log(`  x ${key.padEnd(42)} no CITY entry — skipped (fail closed)`);
      continue;
    }

    // The registry writes descriptive labels ("Hotel Ivalo Lobby Bar"). Search
    // the label as written; if that finds nothing, the label is our invention
    // and the UNMATCHED entry says so.
    let places;
    try {
      places = await textSearch(apiKey, `${venue.name}, ${city.q}`);
      requests++;
    } catch (e) {
      unmatched.push({ key, name: venue.name, slug: venue.slug, reason: `API error: ${e.message}` });
      console.log(`  x ${key.padEnd(42)} API error: ${e.message}`);
      continue;
    }

    const rejected = [];
    let accepted = null;

    for (const p of places) {
      const candName = p.displayName?.text || '';
      const n = nameGate(venue.name, candName);
      if (!n.ok) { rejected.push(`"${candName}" name mismatch (${n.how})`); continue; }
      const g = genericNameGate(candName, city.loc);
      if (!g.ok) { rejected.push(g.why); continue; }
      const h = headTokenGate(venue.name, candName);
      if (!h.ok) { rejected.push(h.why); continue; }
      const rj = rejectListGate(candName, REJECT_NAMES[venue.name]);
      if (!rj.ok) { rejected.push(rj.why); continue; }
      const pl = placeGate(p.formattedAddress, city.loc);
      if (!pl.ok) { rejected.push(`"${candName}" wrong place — address "${p.formattedAddress}" has none of [${city.loc.join(', ')}]`); continue; }
      const bb = bboxGate(p.location);
      if (!bb.ok) { rejected.push(`"${candName}" ${bb.why}`); continue; }
      if (p.businessStatus && p.businessStatus !== 'OPERATIONAL') {
        closed.push({ key, name: venue.name, slug: venue.slug, matchedName: candName, businessStatus: p.businessStatus, address: p.formattedAddress, googlePlaceId: p.id });
        rejected.push(`"${candName}" businessStatus=${p.businessStatus} (RECORDED as closed finding)`);
        continue;
      }
      accepted = { p, nameHow: n.how, localityHit: pl.hit };
      break;
    }

    if (!accepted) {
      unmatched.push({
        key, name: venue.name, slug: venue.slug, type: venue.type,
        candidates: places.map((p) => `${p.displayName?.text} @ ${p.formattedAddress}${p.businessStatus && p.businessStatus !== 'OPERATIONAL' ? ` [${p.businessStatus}]` : ''}`),
        reason: rejected.length ? rejected.join(' | ') : 'Text Search returned no candidates',
      });
      console.log(`  x ${key.padEnd(42)} NO SAFE MATCH${places.length ? '' : '  (ZERO RESULTS)'}`);
      for (const r of rejected) console.log(`       · ${r}`);
      continue;
    }

    const { p } = accepted;
    matched[key] = {
      matchedName: p.displayName.text, rating: p.rating, reviewCount: p.userRatingCount,
      googlePlaceId: p.id, address: p.formattedAddress, location: p.location, lastVerified: today,
    };
    console.log(`  v ${key.padEnd(42)} ${String(p.rating ?? '-').padEnd(4)} · ${String(p.userRatingCount ?? '-').padStart(5)}  [${accepted.nameHow}]  ${p.displayName.text}`);
  }

  // UNIQUE PLACE post-pass
  const byPlaceId = new Map();
  for (const [key, rec] of Object.entries(matched)) {
    const list = byPlaceId.get(rec.googlePlaceId) || [];
    list.push(key);
    byPlaceId.set(rec.googlePlaceId, list);
  }
  for (const [placeId, keys] of byPlaceId) {
    if (keys.length < 2) continue;
    console.log(`\n  ! DUPLICATE PLACE ${placeId} claimed by ${keys.length} venues — dropping all (fail closed):`);
    for (const key of keys) {
      const rec = matched[key];
      console.log(`       · ${key} → "${rec.matchedName}"`);
      unmatched.push({ key, name: key, reason: `duplicate Google place ${placeId} ("${rec.matchedName}") also claimed by ${keys.filter((k) => k !== key).join(', ')}` });
      delete matched[key];
    }
  }

  const generatedDir = path.join(ROOT, 'src/data/generated');
  await fs.mkdir(generatedDir, { recursive: true });
  await fs.writeFile(path.join(generatedDir, 'venues-from-maps.json'),
    JSON.stringify({
      _README: 'GENERATED by scripts/verify-venues.mjs from Google Places API (New) Text Search. Do not hand-edit: re-run the script. Editorial data lives in src/data/cities.ts and is never written by this script.',
      _syncedAt: today, venues: matched, closed, unmatched,
    }, null, 2) + '\n');

  console.log('');
  console.log(`v ${Object.keys(matched).length}/${registry.length} venues verified against Google`);
  if (closed.length) {
    console.log(`\n! ${closed.length} matched but NOT OPERATIONAL — investigate (July run: may be seasonal):`);
    for (const c of closed) console.log(`    ${c.key}: ${c.businessStatus} ("${c.matchedName}" @ ${c.address})`);
  }
  if (unmatched.length) {
    console.log(`\n! ${unmatched.length} UNMATCHED (fail closed) — investigate each:`);
    for (const u of unmatched) {
      console.log(`    ${u.key}`);
      console.log(`        reason: ${u.reason}`);
      if (u.candidates?.length) for (const c of u.candidates) console.log(`        cand: ${c}`);
    }
  }
  console.log(`\nv ${requests} API requests ~ $${(requests * 0.032).toFixed(2)}`);
  console.log('v wrote src/data/generated/venues-from-maps.json');
}

main().catch((e) => { console.error('FATAL:', e.message); process.exit(1); });
