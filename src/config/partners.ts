// Affiliate partner link builders for LaplandNightlife.
//
// Source of truth: _affiliate/affiliate-links.json (generated 2026-06-25).
// These are TRAVELPAYOUTS deep links. The marker/trs are PUBLIC (they ship in
// client code by design); NO API secret keys live here. Attribution is handled
// by Travelpayouts itself — these do NOT route through go.laplandvibes.com
// (that Worker is CJ-only, for Hotels.com / EconomyBookings).
//
// Per-placement tracking uses the Travelpayouts `sub_id` parameter, set to a
// snake_case SID so every placement is measurable in the TP dashboard.
//
// Required affiliate <a> attributes (LV spec):
//   target="_blank" rel="sponsored nofollow noopener"   — NO `noreferrer`.

const TP_MARKER = '723794';
const TP_TRS = '524131';

/** Build a Travelpayouts deep link for a program + destination + placement. */
function tpLink(programId: number, dest: string, sid: string): string {
  const u = encodeURIComponent(dest);
  return `https://tp.media/r?marker=${TP_MARKER}&trs=${TP_TRS}&p=${programId}&u=${u}&campaign_id=1&sub_id=${encodeURIComponent(
    sid,
  )}`;
}

// ── Airalo — global travel eSIM ──────────────────────────────────────────────
// Program p=8310. International audience (11 languages) → a data eSIM you set up
// before you land. Ships everywhere, no physical SIM, no roaming bill. Evergreen
// positioning only (no time-limited % → never goes stale).
export const AIRALO = {
  slug: 'airalo',
  logo: '/images/partners/airalo.png',
  programId: 8310,
} as const;
export const airaloLink = (sid = 'connectivity') =>
  tpLink(AIRALO.programId, 'https://www.airalo.com/', sid);

// ── Welcome Pickups — private airport transfers ──────────────────────────────
// Program p=8919. A pre-booked driver who meets you at arrivals and takes you
// straight into town — useful at −20 °C with no late taxi rank, and the safe
// ride back to the hotel after a night out. Evergreen positioning.
export const WELCOME_PICKUPS = {
  slug: 'welcome_pickups',
  logo: '/images/partners/welcomepickups.png',
  programId: 8919,
} as const;
export const welcomePickupsLink = (sid = 'transfer') =>
  tpLink(WELCOME_PICKUPS.programId, 'https://www.welcomepickups.com/', sid);

// ── EKTA — travel insurance (any-GEO) ────────────────────────────────────────
// Program p=5869. Any-residence cover (no Nordic-residence wall), so it works
// for the whole international audience. Note the correct brand domain is
// ektatraveling.com (not ekta.com) per affiliate-links.json flags. Evergreen.
export const EKTA = {
  slug: 'ekta',
  /** Dark wordmark for light card surfaces. */
  logo: '/images/partners/ekta.svg',
  /** White wordmark for dark card surfaces. */
  logoWhite: '/images/partners/ekta-white.svg',
  programId: 5869,
} as const;
export const ektaLink = (sid = 'insurance') =>
  tpLink(EKTA.programId, 'https://ektatraveling.com/', sid);
