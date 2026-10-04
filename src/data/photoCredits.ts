/**
 * Avoimella lisenssillä käytettyjen valokuvien tekijätiedot JA lisenssikuitti.
 *
 * Vesa 4.10.2026: *"tee ne kaikki"* = verkoston tekoälykuvat aidoiksi valokuviksi.
 * Tämä sivusto oli lähes kokonaan tekoälykuvitusta (kaupunkiherot, tapahtumakortit,
 * kesäöiden kortit). Jokainen alla oleva tiedosto on Wikimedia Commonsin valokuva,
 * tarkistettu 4.10.2026:
 *   - Paikka ja aihe Commonsin kuvauksesta, luokista ja päiväyksestä (pikkukuva ja
 *     tiedostonimi eivät kerro aihetta, ohje 01-kuvat §6 3c).
 *   - Lisenssi ei NC eikä ND; tekijä ja lisenssi Commonsin rajapinnasta, tiedoston
 *     sha1 = rajapinnan sha1.
 *   - Ei käytössä toisella LV-sivustolla: _kuvavaihto-20261004/claim.mjs (varauskirja,
 *     git grep 29 repoon, 64×36-pikselivertailu) + saman kuvaussession sisarruudut
 *     katsottu käsin (Bufflerin Saariselkä-revontulet hylätty: weddingsin sarja).
 *
 * 🔴 Tiedostoa EI rajata eikä muokata: vain pienennys + WebP/AVIF. Rajaus tapahtuu
 * selaimessa (background-size: cover / object-cover). CC BY-SA -kuvan rajattu tiedosto
 * olisi muokattu teos (01-kuvat §6.6). Siksi `PillarHero` ei myöskään saturoi
 * krediteillistä kuvaa (filter: saturate oli tekoälykuvitusta varten).
 *
 * 🔴 Krediitti piirtyy kuvan päälle kuvan polun perusteella (`ImageMark`), ei
 * kutsupaikassa: sama tiedosto on usealla pinnalla, ja yhdestä unohtunut merkintä olisi
 * lisenssirikkomus juuri siellä. Linkin sisällä olevassa kortissa merkintä on pelkkää
 * tekstiä; linkit ovat sivun lopun kuvaluettelossa (`PhotoCreditList`).
 *
 * 🔴 BY-SA-kuva EI saa mennä jakokorttiin (lv_permanent_rules §34.2): korttien lähteet
 * `scripts/routes.json` ogCard.hero osoittavat CC0/PD-kuviin.
 *
 * Kuitti: lähde (Commons-tiedostosivu), tunniste (tiedostonimi), lisenssi, hakupäivä, 0 €.
 */
export type PhotoCredit = {
  /** Tekijä sanasta sanaan kuten Commonsissa. */
  author: string;
  license: string;
  /** Tyhjä vain public domain -kuvalla (ei lisenssitekstiä linkitettäväksi). */
  licenseUrl: string;
  /** Commonsin tiedostosivu. */
  sourceUrl: string;
  /** Tiedoston nimi Commonsissa. */
  title: string;
  /** Mitä kuvassa oikeasti on (alt). */
  alt: string;
  taken: string;
  changes: string;
  fetched: string;
  cost: '0 €';
};

export const PHOTO_CREDITS: Record<string, PhotoCredit> = {
  "/images/card/city-rovaniemi.webp": {
    author: "Xepheid", license: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Koskikatu_and_Pohjanhovi.JPG", title: "Koskikatu and Pohjanhovi.JPG",
    alt: "Koskikatu and Hotel Pohjanhovi in Rovaniemi on a December night",
    taken: "2012-12-28 23:34:42", changes: "Pienennetty 3648×2736 → .webp 2560x1920, .avif 2560x1920; ei rajausta, ei muita muutoksia.", fetched: '2026-10-04', cost: '0 €',
  },
  "/images/card/city-levi.webp": {
    author: "Arkke", license: "CC BY 4.0", licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Levi_Center_2.jpg", title: "Levi Center 2.jpg",
    alt: "The pedestrian street in Levi village centre at dusk in March, ski slopes behind",
    taken: "2023-03-01 18:23:59", changes: "Pienennetty 4000×3000 → .webp 2560x1920, .avif 2560x1920; ei rajausta, ei muita muutoksia.", fetched: '2026-10-04', cost: '0 €',
  },
  "/images/card/city-saariselka.webp": {
    author: "Ximonic (Simo Räsänen)", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Saariselk%C3%A4_Inn_and_Panimo_Pub_in_Saariselk%C3%A4,_Inari,_Lapland,_Finland,_2021_September.jpg", title: "Saariselkä Inn and Panimo Pub in Saariselkä, Inari, Lapland, Finland, 2021 September.jpg",
    alt: "Saariselkä Inn and Local Pub Panimo in Saariselkä village in September",
    taken: "2021-09-18 11:28:02", changes: "Pienennetty 3000×1822 → .webp 2560x1555, .avif 2560x1555; ei rajausta, ei muita muutoksia.", fetched: '2026-10-04', cost: '0 €',
  },
  "/images/card/city-yllas.webp": {
    author: "Tatiana Bashinskaya", license: "CC BY 3.0", licenseUrl: "https://creativecommons.org/licenses/by/3.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Lapland,_Finland_-_panoramio_(9).jpg", title: "Lapland, Finland - panoramio (9).jpg",
    alt: "Skiers and gondola lifts against a low January sun on Ylläs fell",
    taken: "5 January 2013", changes: "Pienennetty 4256×2832 → .webp 2560x1703, .avif 2560x1703; ei rajausta, ei muita muutoksia.", fetched: '2026-10-04', cost: '0 €',
  },
  "/images/card/city-oulu.webp": {
    author: "Estormiz", license: "CC0", licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Kirkkokatu_Oulu_20131221_02.JPG", title: "Kirkkokatu Oulu 20131221 02.JPG",
    alt: "Kirkkokatu on the Rotuaari pedestrian street in Oulu under December lights",
    taken: "21 December 2013, 06:39:2", changes: "Pienennetty 4325×3215 → .webp 2560x1903, .avif 2560x1903; ei rajausta, ei muita muutoksia.", fetched: '2026-10-04', cost: '0 €',
  },
  "/images/card/city-inari.webp": {
    author: "Kat1100", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Inari-sreetscene_20200203141555.jpg", title: "Inari-sreetscene 20200203141555.jpg",
    alt: "The snowy main road through Inari village in February",
    taken: "2020-02-03 14:15:55", changes: "Pienennetty 3264×1836 → .webp 2560x1440, .avif 2560x1440; ei rajausta, ei muita muutoksia.", fetched: '2026-10-04', cost: '0 €',
  },
  "/images/card/city-kemi.webp": {
    author: "Estormiz", license: "CC0", licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Lumilinna_Kemi_20120218.JPG", title: "Lumilinna Kemi 20120218.JPG",
    alt: "The entrance to the LumiLinna SnowCastle snow hotel in Kemi in February",
    taken: "18 February 2012", changes: "Pienennetty 3500×2283 → .webp 2560x1670, .avif 2560x1670; ei rajausta, ei muita muutoksia.", fetched: '2026-10-04', cost: '0 €',
  },
  "/images/card/city-ruka.webp": {
    author: "Timo Newton-Syms", license: "CC BY-SA 2.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Ruka_Village_(8361909910).jpg", title: "Ruka Village (8361909910).jpg",
    alt: "Ruka village centre in the January blue hour, seen from the lookout tower",
    taken: "2013-01-04 12:41", changes: "Pienennetty 1600×1067 → .webp 1600x1067, .avif 1600x1067; ei rajausta, ei muita muutoksia.", fetched: '2026-10-04', cost: '0 €',
  },
  "/images/card/city-sodankyla.webp": {
    author: "Ultsi", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Sodankyl%C3%A4n_vanha_kirkko_kes%C3%A4kuussa.jpg", title: "Sodankylän vanha kirkko kesäkuussa.jpg",
    alt: "The 17th-century old wooden church of Sodankylä",
    taken: "2011-12-08 00:09:37", changes: "Pienennetty 4562×3049 → .webp 2560x1711, .avif 2560x1711; ei rajausta, ei muita muutoksia.", fetched: '2026-10-04', cost: '0 €',
  },
  "/images/card/venue-street-bar.webp": {
    author: "Htm", license: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Kittil%C3%A4_kirkonkyl%C3%A4_1.jpg", title: "Kittilä kirkonkylä 1.jpg",
    alt: "The main street of Kittilä village on a sunny March day",
    taken: "2013-03-30", changes: "Pienennetty 4064×2709 → .webp 2560x1706, .avif 2560x1706; ei rajausta, ei muita muutoksia.", fetched: '2026-10-04', cost: '0 €',
  },
  "/images/card/city-muonio.webp": {
    author: "Ximonic (Simo Räsänen)", license: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Aurora_arch_over_Pallastunturi_in_Muonio,_Finland,_2019_January.jpg", title: "Aurora arch over Pallastunturi in Muonio, Finland, 2019 January.jpg",
    alt: "An aurora arch over the Pallastunturi fells in Muonio on a January night",
    taken: "2019-01-20", changes: "Pienennetty 4000×1491 → .webp 2560x954, .avif 2560x954; ei rajausta, ei muita muutoksia.", fetched: '2026-10-04', cost: '0 €',
  },
  "/images/card/city-ivalo.webp": {
    author: "Nemo bis", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:2018-07_Ivalo_063.jpg", title: "2018-07 Ivalo 063.jpg",
    alt: "The sun low over a misty pond in Ivalo on a July night",
    taken: "2018-07-26 22:05:49", changes: "Pienennetty 4000×3000 → .webp 2560x1920, .avif 2560x1920; ei rajausta, ei muita muutoksia.", fetched: '2026-10-04', cost: '0 €',
  },
  "/images/card/city-salla.webp": {
    author: "Arto häkkilä", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Revontulentie_Salla_0015-2.jpg", title: "Revontulentie Salla 0015-2.jpg",
    alt: "The road to the Salla ski resort with Sallatunturi fell behind, in August",
    taken: "21 August 2019", changes: "Pienennetty 4500×2998 → .webp 2560x1706, .avif 2560x1706; ei rajausta, ei muita muutoksia.", fetched: '2026-10-04', cost: '0 €',
  },
  "/images/hero/cities-rovaniemi-bridge.webp": {
    author: "Estormiz", license: "CC0", licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Kirkkokatu_Oulu_20191229_02.jpg", title: "Kirkkokatu Oulu 20191229 02.jpg",
    alt: "People walking on the Rotuaari pedestrian street in Oulu on a December night",
    taken: "29 December 2019", changes: "Pienennetty 4500×2814 → .webp 2560x1601, .avif 2560x1601; ei rajausta, ei muita muutoksia.", fetched: '2026-10-04', cost: '0 €',
  },
  "/images/hero/aurora-bars-neon.webp": {
    author: "YosemiteYamper", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Aurora_borealis,_Juoksenki.jpg", title: "Aurora borealis, Juoksenki.jpg",
    alt: "Green and red northern lights over a forest in Juoksenki, Pello, in October",
    taken: "2024-10-04 23:26:38", changes: "Pienennetty 4032×3024 → .webp 2560x1920, .avif 2560x1920; ei rajausta, ei muita muutoksia.", fetched: '2026-10-04', cost: '0 €',
  },
  "/images/drive/pillarAuroraBars.webp": {
    author: "Ximonic (Simo Räsänen)", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Gentle_but_wide_green_aurora_display_over_Tuikku,_Kittil%C3%A4,_Lapland,_Finland,_2023_September.jpg", title: "Gentle but wide green aurora display over Tuikku, Kittilä, Lapland, Finland, 2023 September.jpg",
    alt: "Northern lights over the fell-top restaurant Tuikku on Levi",
    taken: "2023-09-15", changes: "Pienennetty 4200×2801 → .webp 2560x1707; ei rajausta, ei muita muutoksia.", fetched: '2026-10-04', cost: '0 €',
  },
  "/images/drive/pillarNightclubs.webp": {
    author: "Santeri Viinamäki", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Nightclub_20170423.jpg", title: "Nightclub 20170423.jpg",
    alt: "People on a dance floor under blue lights in a Finnish nightclub",
    taken: "2017-04-23 00:41:04", changes: "Pienennetty 4640×2610 → .webp 2560x1440; ei rajausta, ei muita muutoksia.", fetched: '2026-10-04', cost: '0 €',
  },
  "/images/drive/pillarEvents.webp": {
    author: "Binta.jabbi", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Qstock2023_fiilikset_teemuliikanen-59.jpg", title: "Qstock2023 fiilikset teemuliikanen-59.jpg",
    alt: "Sparklers above a stage and the crowd at Qstock festival in Oulu",
    taken: "2023-09-05", changes: "Pienennetty 6048×4024 → .webp 2560x1703; ei rajausta, ei muita muutoksia.", fetched: '2026-10-04', cost: '0 €',
  },
  "/images/drive/pillarPhotography.webp": {
    author: "Ximonic (Simo Räsänen)", license: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Lunar_eclipse_and_light_pillars_as_seen_from_S%C3%A4rkij%C3%A4rvi_in_Muonio,_Lapland,_Finland,_2019_January_-_2.jpg", title: "Lunar eclipse and light pillars as seen from Särkijärvi in Muonio, Lapland, Finland, 2019 January - 2.jpg",
    alt: "Light pillars and a lunar eclipse over lake Särkijärvi in Muonio, January night",
    taken: "2019-01-21", changes: "Pienennetty 5000×2221 → .webp 2560x1137; ei rajausta, ei muita muutoksia.", fetched: '2026-10-04', cost: '0 €',
  },
  "/images/drive/summerHero.webp": {
    author: "Ninara", license: "CC BY 2.0", licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Sunset_in_Kuusamo,_Finland_2022.jpg", title: "Sunset in Kuusamo, Finland 2022.jpg",
    alt: "A lake glowing through birches, seen from a cabin porch at half past midnight in Kuusamo in July",
    taken: "2022-07-09 00:33:07", changes: "Pienennetty 6198×4032 → .webp 2560x1665; ei rajausta, ei muita muutoksia.", fetched: '2026-10-04', cost: '0 €',
  },
  "/images/drive/sceneLevi.webp": {
    author: "Евгений Гранат", license: "Public domain", licenseUrl: "",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Levi_-_Hullu_Poro_Hotel.JPG", title: "Levi - Hullu Poro Hotel.JPG",
    alt: "Hotel Hullu Poro in Levi village in winter",
    taken: "2007-12-30", changes: "Pienennetty 2560×1920 → .webp 1600x1200; ei rajausta, ei muita muutoksia.", fetched: '2026-10-04', cost: '0 €',
  },
  "/images/drive/pubScene.webp": {
    author: "Estormiz", license: "CC0", licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Kirkkokatu_10_Oulu_20111224.JPG", title: "Kirkkokatu 10 Oulu 20111224.JPG",
    alt: "Pub Oluthuone Leskinen on the Rotuaari pedestrian street in Oulu at night",
    taken: "24 December 2011", changes: "Pienennetty 3000×2369 → .webp 1600x1263; ei rajausta, ei muita muutoksia.", fetched: '2026-10-04', cost: '0 €',
  },
  "/images/drive/pillarSummer.webp": {
    author: "Tetz98", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Sodankyl%C3%A4%C2%B4s_old_church_in_Finland%C2%B4s_Lapland.jpg", title: "Sodankylä´s old church in Finland´s Lapland.jpg",
    alt: "The old wooden church of Sodankylä, built in 1689",
    taken: "2024-07-30 14:03:19", changes: "Pienennetty 3888×2592 → .webp 1600x1067; ei rajausta, ei muita muutoksia.", fetched: '2026-10-04', cost: '0 €',
  },
  "/images/drive/eventLeviFis.webp": {
    author: "Hansjoerg Eberle", license: "CC BY 3.0", licenseUrl: "https://creativecommons.org/licenses/by/3.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Kittil%C3%A4,_Finland_-_panoramio_(54).jpg", title: "Kittilä, Finland - panoramio (54).jpg",
    alt: "A snow cannon making snow on a Levi slope in early November",
    taken: "5 November 2015", changes: "Pienennetty 5184×3456 → .webp 1600x1067; ei rajausta, ei muita muutoksia.", fetched: '2026-10-04', cost: '0 €',
  },
  "/images/drive/eventRukaFis.webp": {
    author: "Timo Newton-Syms", license: "CC BY-SA 2.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Ruka_(25484194716).jpg", title: "Ruka (25484194716).jpg",
    alt: "A lit cross-country ski track at night in Ruka, ski slopes behind",
    taken: "2016-02-27 18:40", changes: "Pienennetty 3072×1728 → .webp 1600x900; ei rajausta, ei muita muutoksia.", fetched: '2026-10-04', cost: '0 €',
  },
  "/images/drive/eventChristmas.webp": {
    author: "Ulla", license: "Public domain", licenseUrl: "",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Rovaniemi_pajakyla.jpg", title: "Rovaniemi pajakyla.jpg",
    alt: "Santa Claus Village in Rovaniemi under snow in late December",
    taken: "December 2005", changes: "Pienennetty 2816×2112 → .webp 1600x1200; ei rajausta, ei muita muutoksia.", fetched: '2026-10-04', cost: '0 €',
  },
  "/images/drive/eventNewYear.webp": {
    author: "Estormiz", license: "Public domain", licenseUrl: "",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:New_year_fireworks_Oulu_2008.JPG", title: "New year fireworks Oulu 2008.JPG",
    alt: "New Year's Eve fireworks in Oulu",
    taken: "31 December 2007", changes: "Pienennetty 2048×1797 → .webp 1600x1404; ei rajausta, ei muita muutoksia.", fetched: '2026-10-04', cost: '0 €',
  },
  "/images/drive/iceCastle.webp": {
    author: "Estormiz", license: "CC0", licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Lumilinna_Kemi_20160409.JPG", title: "Lumilinna Kemi 20160409.JPG",
    alt: "The walls of the LumiLinna SnowCastle in Kemi in April",
    taken: "9 April 2016", changes: "Pienennetty 4500×3085 → .webp 1600x1097; ei rajausta, ei muita muutoksia.", fetched: '2026-10-04', cost: '0 €',
  },
  "/images/drive/eventFilmFestival.webp": {
    author: "Kimberli Mäkäräinen", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Sk%C3%A1bmagovat_2024_Muot%C3%A2teatter_olgoseini.jpg", title: "Skábmagovat 2024 Muotâteatter olgoseini.jpg",
    alt: "The lit snow wall of the Skábmagovat film festival snow theatre in Inari",
    taken: "2024-01-26 19:35:45", changes: "Pienennetty 3121×2099 → .webp 1600x1076; ei rajausta, ei muita muutoksia.", fetched: '2026-10-04', cost: '0 €',
  },
  "/images/drive/eventIjahisIdja.webp": {
    author: "Tevfik Teker", license: "CC BY 3.0", licenseUrl: "https://creativecommons.org/licenses/by/3.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Sajos_-_panoramio.jpg", title: "Sajos - panoramio.jpg",
    alt: "Sajos, the Sámi cultural centre in Inari, on a June evening",
    taken: "15 June 2013", changes: "Pienennetty 3888×2592 → .webp 1600x1067; ei rajausta, ei muita muutoksia.", fetched: '2026-10-04', cost: '0 €',
  },
  "/images/drive/eventFrozenPeople.webp": {
    author: "Estormiz", license: "CC0", licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Cityl%C3%A4tk%C3%A4_Oulu_Market_Square_20260204_02.jpg", title: "Citylätkä Oulu Market Square 20260204 02.jpg",
    alt: "Oulu Market Square on a February night in 2026",
    taken: "4 February 2026", changes: "Pienennetty 3800×2536 → .webp 1600x1068; ei rajausta, ei muita muutoksia.", fetched: '2026-10-04', cost: '0 €',
  },
  "/images/drive/eventCityRock.webp": {
    author: "Xepheid", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Ounaspaviljonki1.JPG", title: "Ounaspaviljonki1.JPG",
    alt: "The Ounaspaviljonki outdoor stage by the river in Rovaniemi",
    taken: "2014-08-16 15:56:39", changes: "Pienennetty 2272×1704 → .webp 1600x1200; ei rajausta, ei muita muutoksia.", fetched: '2026-10-04', cost: '0 €',
  },
  "/images/drive/eventYllasSoikoon.webp": {
    author: "dr.eros", license: "CC BY 3.0", licenseUrl: "https://creativecommons.org/licenses/by/3.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Yll%C3%A4skammi_718_-_panoramio.jpg", title: "Ylläskammi 718 - panoramio.jpg",
    alt: "Skiers at restaurant Ylläskammi 718 on top of Ylläs on an April day",
    taken: "7 April 2007", changes: "Pienennetty 2592×1944 → .webp 1600x1200; ei rajausta, ei muita muutoksia.", fetched: '2026-10-04', cost: '0 €',
  },
  "/images/drive/eventJazz.webp": {
    author: "Estormiz", license: "CC0", licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Kauppurienkatu_Oulu_20150722.jpg", title: "Kauppurienkatu Oulu 20150722.jpg",
    alt: "The Rotuaari pedestrian street in Oulu in July",
    taken: "22 July 2015", changes: "Pienennetty 3300×1859 → .webp 1600x901; ei rajausta, ei muita muutoksia.", fetched: '2026-10-04', cost: '0 €',
  },
  "/images/drive/summerAirGuitar.webp": {
    author: "Juuso Haarala / AGWC", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:AGWC_crowd_and_media.jpg", title: "AGWC crowd and media.jpg",
    alt: "The crowd and photographers at the Air Guitar World Championships in Oulu, 2019",
    taken: "2019-08-23", changes: "Pienennetty 3543×2365 → .webp 1600x1068; ei rajausta, ei muita muutoksia.", fetched: '2026-10-04', cost: '0 €',
  },
  "/images/drive/eventRockFestival.webp": {
    author: "Estormiz", license: "CC0", licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Fireworks_in_Qstock_20120729.JPG", title: "Fireworks in Qstock 20120729.JPG",
    alt: "Fireworks closing the Qstock festival in Oulu",
    taken: "29 July 2012", changes: "Pienennetty 2452×2348 → .webp 1600x1532; ei rajausta, ei muita muutoksia.", fetched: '2026-10-04', cost: '0 €',
  },
  "/images/drive/primeWindow.webp": {
    author: "Catrin1000", license: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Polaarp%C3%A4ev.jpg", title: "Polaarpäev.jpg",
    alt: "The sun just above the horizon over a still lake five minutes after midnight",
    taken: "2011-06-13 00:05", changes: "Pienennetty 3648×2736 → .webp 1600x1200; ei rajausta, ei muita muutoksia.", fetched: '2026-10-04', cost: '0 €',
  },
  "/images/drive/primeFilm.webp": {
    author: "Pallarim (Finnish Wikipedia)", license: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Jono_Rosetta-elokuvaan_Sodankyl%C3%A4ss%C3%A4_2005.jpg", title: "Jono Rosetta-elokuvaan Sodankylässä 2005.jpg",
    alt: "A queue outside a screening at the Midnight Sun Film Festival in Sodankylä, 2005",
    taken: "2005-06-17", changes: "Pienennetty 1046×592 → .webp 1046x592; ei rajausta, ei muita muutoksia.", fetched: '2026-10-04', cost: '0 €',
  },
  "/images/drive/primeJuhannus.webp": {
    author: "Ninara", license: "CC BY 2.0", licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Midsummer_in_Kilpisj%C3%A4rvi,_Lapland_(52222783881).jpg", title: "Midsummer in Kilpisjärvi, Lapland (52222783881).jpg",
    alt: "A Midsummer bonfire by lake Kilpisjärvi under the evening sun",
    taken: "2022-06-24 21:09", changes: "Pienennetty 6123×4082 → .webp 1600x1067; ei rajausta, ei muita muutoksia.", fetched: '2026-10-04', cost: '0 €',
  },
  "/images/drive/eventMidnightSun.webp": {
    author: "Gouwenaar", license: "CC0", licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:1972_Midzomernacht_Kemij%C3%A4rvi.jpg", title: "1972 Midzomernacht Kemijärvi.jpg",
    alt: "Midsummer night in Kemijärvi, photographed in June 1972",
    taken: "1972-06", changes: "Pienennetty 3055×1109 → .webp 1600x581; ei rajausta, ei muita muutoksia.", fetched: '2026-10-04', cost: '0 €',
  },
  "/images/drive/summerOulu.webp": {
    author: "Estormiz", license: "CC0", licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Kuusisaari_Oulu_20220522.jpg", title: "Kuusisaari Oulu 20220522.jpg",
    alt: "The beach at Kuusisaari island in Oulu in late May",
    taken: "22 May 2022", changes: "Pienennetty 4500×2533 → .webp 1600x901; ei rajausta, ei muita muutoksia.", fetched: '2026-10-04', cost: '0 €',
  },
  "/images/drive/summerRovaniemi.webp": {
    author: "Leonhard Lenz", license: "CC0", licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Koskikatu_Rovaniemi_2022-09-15_05.jpg", title: "Koskikatu Rovaniemi 2022-09-15 05.jpg",
    alt: "Koskikatu pedestrian street in central Rovaniemi",
    taken: "2022-09-15 16:33:33", changes: "Pienennetty 8384×5612 → .webp 1600x1071; ei rajausta, ei muita muutoksia.", fetched: '2026-10-04', cost: '0 €',
  },
  "/images/drive/summerSodankyla.webp": {
    author: "BishkekRocks", license: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Sodankyl%C3%A4_vanha_kirkko.JPG", title: "Sodankylä vanha kirkko.JPG",
    alt: "The old church of Sodankylä in August",
    taken: "2007-08-29", changes: "Pienennetty 2304×1728 → .webp 1600x1200; ei rajausta, ei muita muutoksia.", fetched: '2026-10-04', cost: '0 €',
  },
  "/images/drive/summerJuhannus.webp": {
    author: "Ninara", license: "CC BY 2.0", licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Midsummer_in_Kilpisj%C3%A4rvi,_Lapland_(52222783091).jpg", title: "Midsummer in Kilpisjärvi, Lapland (52222783091).jpg",
    alt: "A Midsummer bonfire burning by lake Kilpisjärvi, fells across the water",
    taken: "2022-06-24 21:04", changes: "Pienennetty 5368×3894 → .webp 2560x1857; ei rajausta, ei muita muutoksia.", fetched: '2026-10-04', cost: '0 €',
  },
  "/images/drive/summerJazz.webp": {
    author: "Estormiz", license: "CC0", licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Kauppurienkatu_Oulu_20160626.jpg", title: "Kauppurienkatu Oulu 20160626.jpg",
    alt: "Restaurant terraces on Kauppurienkatu in Oulu in June",
    taken: "26 June 2016", changes: "Pienennetty 4500×3169 → .webp 1600x1127; ei rajausta, ei muita muutoksia.", fetched: '2026-10-04', cost: '0 €',
  },
  "/images/drive/summerCycle.webp": {
    author: "Estormiz", license: "CC0", licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Hupisaaret_Bridge_Oulu_20150517.jpg", title: "Hupisaaret Bridge Oulu 20150517.jpg",
    alt: "A white footbridge in Hupisaaret park, Oulu",
    taken: "17 May 2015", changes: "Pienennetty 3500×2332 → .webp 1600x1066; ei rajausta, ei muita muutoksia.", fetched: '2026-10-04', cost: '0 €',
  },
  "/images/drive/summerNordkapp.webp": {
    author: "Ninara", license: "CC BY 2.0", licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Teno_Road_in_Utsjoki_Finland.jpg", title: "Teno Road in Utsjoki Finland.jpg",
    alt: "Teno Road, national road 970, along the river in Utsjoki",
    taken: "2021-05-17 17:18:50", changes: "Pienennetty 5049×3366 → .webp 1600x1067; ei rajausta, ei muita muutoksia.", fetched: '2026-10-04', cost: '0 €',
  },
  "/images/drive/summerSwim.webp": {
    author: "Xepheid", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Vaaranlampi_20200620.jpg", title: "Vaaranlampi 20200620.jpg",
    alt: "Vaaranlampi pond in Rovaniemi on a June night",
    taken: "2020-06-20 23:10:33", changes: "Pienennetty 4128×3096 → .webp 1600x1200; ei rajausta, ei muita muutoksia.", fetched: '2026-10-04', cost: '0 €',
  },
};

/** Polku ilman `?v=`-versiota ja origin-etuliitettä (version-images.mjs lisää version distissä). */
export function photoKey(src?: string | null): string {
  if (!src) return '';
  return src.replace(/^https?:\/\/[^/]+/, '').replace(/\?.*$/, '');
}

/** 🔴 Avaimet normalisoidaan myös: version-images.mjs kirjoittaa `?v=` JS-nipun
 *  merkkijonoihin, joten distissä taulun avain on `…webp?v=abc`. */
const BY_KEY: Record<string, PhotoCredit> = Object.fromEntries(
  Object.entries(PHOTO_CREDITS).map(([k, v]) => [photoKey(k), v]),
);

export function creditFor(src?: string | null): PhotoCredit | undefined {
  return BY_KEY[photoKey(src)];
}
