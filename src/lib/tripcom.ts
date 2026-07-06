// Trip.com affiliate deep-link builders.
//
// Account approved by Trip.com (Vesa, 2026-04-30):
//   Allianceid = 8175308
//   SID        = 309472136  (currently the laplandvibes.com site ID; will be
//                            swapped to a laplandnightlife.com-specific SID
//                            once Vesa adds the site in the Trip.com Sites
//                            dashboard. Until then everything still tracks —
//                            we just can't split clicks per LV domain.)
//
// All builders attach four affiliate params so revenue attribution works:
//   Allianceid   - account
//   SID          - per-site
//   trip_sub1    - source domain ("laplandnightlife.com")
//   trip_sub2    - placement tag, snake_case (e.g. "hero_flight_search")
//
// Trip.com URLs DO NOT route through go.laplandvibes.com (that worker is CJ-
// only). Trip.com is on Impact / direct, so links go straight to trip.com.

const TRIP_CONFIG = {
  allianceId: '8175308',
  defaultSiteId: '309472136',
  sourceTag: 'laplandnightlife.com',
} as const;

function defaultDate(daysFromNow: number): string {
  const d = new Date();
  d.setDate(d.getDate() + daysFromNow);
  return d.toISOString().slice(0, 10);
}

function attachAffiliateParams(url: URL, sid: string): void {
  url.searchParams.set('Allianceid', TRIP_CONFIG.allianceId);
  url.searchParams.set('SID', TRIP_CONFIG.defaultSiteId);
  url.searchParams.set('trip_sub1', TRIP_CONFIG.sourceTag);
  url.searchParams.set('trip_sub2', sid);
}

// LOCALE: 2026-05-16 — pass user locale to Trip.com so DE/FI users land on the
// local Trip.com flow (locale=de-DE / fi-FI). EN defaults to en-XX (multi-lang EN).
export type TripLang = 'en' | 'fi' | 'de' | 'ja' | 'es' | 'pt-BR' | 'zh-CN' | 'ko' | 'fr' | 'it' | 'nl';
const TRIP_LOCALE: Record<TripLang, string> = {
  en: 'en-XX',
  fi: 'fi-FI',
  de: 'de-DE',
  ja: 'ja-JP',
  es: 'es-ES',
  'pt-BR': 'pt-BR',
  'zh-CN': 'zh-CN',
  ko: 'ko-KR',
  fr: 'fr-FR',
  it: 'it-IT',
  nl: 'nl-NL',
};

// ─── Flights ────────────────────────────────────────────────────────────

export interface TripFlightOpts {
  /** IATA code, lowercase. e.g. 'hel', 'rvn', 'ktt' */
  from: string;
  /** IATA code, lowercase. */
  to: string;
  /** snake_case placement tag */
  sid: string;
  /** YYYY-MM-DD; default = today + 30 */
  depart?: string;
  /** YYYY-MM-DD; default = depart + 4 */
  returnDate?: string;
  /** 'rt' (default round-trip) or 'ow' (one-way) */
  triptype?: 'rt' | 'ow';
  /** Site language — sets Trip.com locale param. */
  lang?: TripLang;
}

/**
 * Deep link straight into a Trip.com flight search RESULTS page with the
 * user's origin, destination and dates pre-filled.
 */
export function buildTripFlightUrl(o: TripFlightOpts): string {
  const url = new URL('https://www.trip.com/flights/showfarefirst');
  const triptype = o.triptype ?? 'rt';
  const depart = o.depart ?? defaultDate(30);
  url.searchParams.set('dcity', o.from.toLowerCase());
  url.searchParams.set('acity', o.to.toLowerCase());
  url.searchParams.set('ddate', depart);
  url.searchParams.set('triptype', triptype);
  if (triptype === 'rt') {
    url.searchParams.set('rdate', o.returnDate ?? defaultDate(34));
  }
  url.searchParams.set('class', 'y');
  url.searchParams.set('quantity', '1');
  url.searchParams.set('curr', 'EUR');
  url.searchParams.set('locale', TRIP_LOCALE[o.lang ?? 'en']);
  attachAffiliateParams(url, o.sid);
  return url.toString();
}

/** Generic Trip.com flight homepage (affiliate-tagged). */
export function buildTripFlightHome(sid: string, lang: TripLang = 'en'): string {
  const url = new URL('https://www.trip.com/flights');
  url.searchParams.set('locale', TRIP_LOCALE[lang]);
  attachAffiliateParams(url, sid);
  return url.toString();
}
