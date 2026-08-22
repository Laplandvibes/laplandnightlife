// Trip.com booking links - reitittyvat go.laplandvibes.com-Workerin kautta.
//
// MUUTOS 2026-08-22 (Vesan paatos). Tassa luki aiemmin: "Trip.com URLs DO NOT
// route through go.laplandvibes.com (that worker is CJ-only)." Se piti paikkansa
// 30.4.2026, mutta vanheni CJ-exitissa 23.7. Kommentti jai korjaamatta ja
// OPETTI OHITUSTA seuraaville: sama kuvio kopioitui koko verkostoon, joten
// lentoklikit eivat koskaan paatyneet D1-lokiin eivatka Command Centeriin,
// vaikka komissio kulki.
//
// Nyt kaikki menee /go/flights- ja /go/trains-reittien kautta:
//   - klikki kirjautuu D1:een (kumppani, sid, sivusto, maa, laite)
//   - kumppanitunnukset asetetaan Workerissa, joten ne eivat voi pudota pois
//     sivuston linkista huomaamatta
//   - kohde-URL on tavulleen sama kuin ennen (verifioitu livena)
//
// w         = lahdesivusto. Worker paattelisi sen muuten Referer-otsakkeesta,
//             joka katoaa some-sovellusselaimissa ja tiukalla referrer-policylla.
// trip_sid  = TAMAN sivuston oma Trip.com-SID. SID ei ole verkostossa yksi:
//             neljalla sivustolla on oma (Vesa lisannyt ne Trip.comin Sites-
//             hallintaan), muilla jaettu. Ilman tata parametria neljan sivuston
//             tuotto sulaisi Trip.comin raportissa yhdeksi riviksi.
//
// Paivamaarat jatetaan pois kun kutsuja ei niita anna: Worker tayttaa oletukset
// (+30/+34 vrk lennoille, +14 juna/bussille) KLIKIN hetkella. Ennen ne
// laskettiin renderoinnissa, joten prerenderoity sivu tarjosi vanhetessaan yha
// lahempana olevaa - pahimmillaan mennytta - paivaa.

const GO = 'https://go.laplandvibes.com/go';
const SITE_TAG = 'laplandnightlife.com';
const TRIP_SID = '309472136';

/** Rakentaa Worker-linkin: tyhjat parametrit jatetaan pois, sid + w aina mukaan. */
function goUrl(route: 'flights' | 'trains' | 'hotels', params: Record<string, string>, sid: string): string {
  const u = new URL(`${GO}/${route}`);
  for (const [k, v] of Object.entries(params)) if (v) u.searchParams.set(k, v);
  u.searchParams.set('sid', sid);
  u.searchParams.set('w', SITE_TAG);
  if (route !== 'hotels') u.searchParams.set('trip_sid', TRIP_SID);
  return u.toString();
}

// LOCALE: 2026-05-16 — pass user locale to Trip.com so DE/FI users land on the
// local Trip.com flow (locale=de-DE / fi-FI). EN defaults to en-XX (multi-lang EN).
export type TripLang = 'en' | 'fi' | 'de' | 'ja' | 'es' | 'pt-BR' | 'zh-CN' | 'ko' | 'fr' | 'it' | 'nl' | 'sv';
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
  sv: 'sv-SE',
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
  const triptype = o.triptype ?? 'rt';
  return goUrl('flights', {
    dcity: o.from.toLowerCase(),
    acity: o.to.toLowerCase(),
    ddate: o.depart ?? '',
    triptype,
    rdate: triptype === 'rt' ? (o.returnDate ?? '') : '',
    class: 'y',
    quantity: '1',
    curr: 'EUR',
    locale: TRIP_LOCALE[o.lang ?? 'en'],
  }, o.sid);
}

/** Generic Trip.com flight homepage (affiliate-tagged). */
export function buildTripFlightHome(sid: string, lang: TripLang = 'en'): string {
  return goUrl('flights', { locale: TRIP_LOCALE[lang] }, sid);
}
