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
  'Ijahis Idja Sámi Music Festival': IMG.eventIjahisIdja, // Sajos, Inari (paikka)
  'Frozen People Festival': IMG.eventFrozenPeople, // Oulun kauppatori helmikuussa 2026 (paikka)
  'Yllas Soikoon Music Festival': IMG.eventYllasSoikoon, // Ylläksen laki huhtikuussa
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
  // Talvitapahtumat, generoitu 9.9.2026 (Vesa: "enko tapahtumiin pyytanyt kuvia").
  'Jutajaiset Folklore Festival': IMG.eventJutajaiset,
  'Levi FIS Alpine Ski World Cup': IMG.eventLeviFis,
  'Ruka FIS Cross-Country Opening': IMG.eventRukaFis,
  'Christmas in Rovaniemi': IMG.eventChristmas,
  "New Year's Eve fireworks": IMG.eventNewYear,
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
export const eventImage = (enName: string): string | null => EVENT_IMG[enName] ?? null;
