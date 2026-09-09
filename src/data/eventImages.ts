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

/** Neutraali varakuva: tapahtumapinta ilman väitettä yksittäisestä tapahtumasta. */
export const EVENT_IMG_FALLBACK = IMG.pillarEvents;

export const eventImage = (enName: string) => EVENT_IMG[enName] ?? EVENT_IMG_FALLBACK;
