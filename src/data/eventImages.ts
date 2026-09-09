import { IMG } from './images';

/**
 * Tapahtuma → kuva. Avain on EN-listan nimi, koska se on ainoa joka ei
 * käänny (`data/events.ts` lukee lokalisoinnin indeksillä samasta listasta).
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
  'Skábmagovat Indigenous Film Festival': IMG.eventFilmFestival,
  'Sami Week / Sámi Soveeknaki': IMG.eventSamiMusic,
  'Ijahis Idja Sámi Music Festival': IMG.eventSamiMusic,
  'Frozen People Festival': IMG.eventCityRock,
  'Yllas Soikoon Music Festival': IMG.eventJazz,
  'SnowCastle final weeks': IMG.iceCastle,
  'Midnight Sun Window opens': IMG.primeWindow,
  'Midnight Sun Film Festival': IMG.primeFilm,
  'Juhannus / Midsummer': IMG.primeJuhannus,
  'Qstock Festival 2026': IMG.eventRockFestival,
  'Elojazz Festival': IMG.eventJazz,
  Simerock: IMG.eventCityRock,
  'Air Guitar World Championships qualifier': IMG.summerAirGuitar,
  'Air Guitar World Championships Final': IMG.summerAirGuitar,
  'Midnight Sun Window closes': IMG.eventMidnightSun,
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
 *  työtä ja odottaa Vesan hyväksyntää kustannukselle. */
export const eventImage = (enName: string): string | null => EVENT_IMG[enName] ?? null;
