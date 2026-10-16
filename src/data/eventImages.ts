import { IMG } from './images';

/**
 * Tapahtuma → kuva. Avain on tapahtuman tunniste (`data/events.ts` CALENDAR[].id), joka ei käänny.
 *
 * 🔴 **Puuttuva kuva ei saa tarkoittaa väärää kuvaa.** Jos tapahtumalle ei ole
 * omaa kuvaa, käytetään neutraalia tapahtumakuvaa — ei lähintä sinne päin
 * olevaa. Väärä kuva on katteeton lupaus tapahtumasta, samaa lajia kuin väärä
 * arvio nimetystä yrityksestä.
 *
 * 🔴🔴 **Talvitapahtumilta puuttuu kuva kokonaan** (mitattu 2026-09-09): Levi
 * FIS, Ruka FIS ja Rovaniemen joulu ovat seuraavat kolme tapahtumaa kalenterissa
 * eikä yhdelläkään ole omaa kuvaa — sivustolla on 21 kesäkuvaa ja nolla
 * kilpailu- tai jouluaiheista. Ne generoidaan Picsartilla (4K) omana eränään;
 * siihen asti ne näyttävät varakuvaa.
 */
export const EVENT_IMG: Record<string, string> = {
  skabmagovat: IMG.eventFilmFestival, // Skábmagovatin lumiteatteri, Inari 2024 (tapahtuma)
  'ijahis-idja': IMG.eventIjahisIdja, // Sajos, Inari (paikka)
  'midnight-sun': IMG.primeWindow,
  msff: IMG.primeFilm,
  juhannus: IMG.primeJuhannus,
  qstock: IMG.eventRockFestival, // Qstockin ilotulitus 2012 (tapahtuma)
  simerock: IMG.eventCityRock, // Ounaspaviljongin lava (paikka)
  'air-guitar': IMG.summerAirGuitar, // AGWC Oulu 2019 (tapahtuma)
  jutajaiset: IMG.eventJutajaiset,
  'levi-fis': IMG.eventLeviFis,
  'ruka-nordic': IMG.eventRukaFis,
  // Ei kuvaa: new-year (ainoa ilotulituskuva on Oulusta 2008, ja Oulun kaupunki ei enää järjestä
  // ilotulitusta), sami-day (Sajoksen kuva on jo Ijahis Idjalla samalla sivulla), sekä 2027-kalenterin
  // uudet tapahtumat, joista ei ole omaa vapaata valokuvaa.
};

/** 🔴🔴 EI VARAVALOKUVAA (Vesa 2026-09-09: *"sama kuva kaikissa?"*).
 *
 *  Ensimmäinen versio palautti yhden neutraalin tapahtumakuvan kaikille joilta
 *  kuva puuttuu. Koska seuraavat kolme tapahtumaa ovat KAIKKI talvitapahtumia
 *  joilta kuva puuttuu, etusivulle tuli **kolme identtistä konserttilava-kuvaa**
 *  vierekkäin — ja ne väittivät kolmen eri tapahtuman näyttävän samalta
 *  rock-festivaalilta. Jutajaiset on folkloristifestivaali ja Levi FIS on
 *  laskettelukilpailu.
 *
 *  ⇒ `null` = tälle tapahtumalle EI ole kuvaa. Kortti renderöi silloin
 *  tummanpuhuvan taustan eikä lainaa toisen tapahtuman valokuvaa. Puuttuva kuva
 *  näyttää puuttuvalta; väärä kuva näyttää väitteeltä.
 *
 *  Oikea korjaus on generoida talvitapahtumille omat kuvat — se on maksullista
 *  työtä ja odottaa Vesan hyväksyntää kustannukselle.
 *
 *  🟢 4.10.2026: tapahtumakuvat ovat nyt Wikimedia Commonsin valokuvia tapahtumasta
 *  tai sen paikasta (data/photoCredits.ts). Yksi kuva = yksi tapahtuma: entiset
 *  yhteiskuvat (jazz, rock, saamelaismusiikki) jaettiin, koska Ylläksen rinnefestivaalin
 *  kuva ei kelpaa Oulun jazzviikolle. */
export const eventImage = (id: string): string | null => EVENT_IMG[id] ?? null;
