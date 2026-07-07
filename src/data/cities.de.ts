import type { CityOverlay } from './cityI18n';

const overlay: Record<string, CityOverlay> = {
  oulu: {
    region: 'Nordösterbotten',
    blurb: 'Kulturhauptstadt Europas 2026 — und die einzige echte Clubszene im Norden, die das ganze Jahr läuft.',
    pageTagline: 'Kulturhauptstadt Europas 2026.',
    venues: {
      '45 Special': { type: 'Nachtclub', note: 'Der Lieblingsclub der Studenten. Mittwoch bis Samstag geöffnet, bis spät.' },
      'Never Grow Old': { type: 'Livemusik + Club', note: 'Indie- und Alternative-Bookings. Der kleinste Laden der Meile, aber mit dem treuesten Publikum.' },
      'St Michael': { type: 'Live + Club', note: 'Der größte Saal der Meile. Gastierende DJs und Tribute-Nächte.' },
    },
    quickFacts: {
      'Population': { label: 'Einwohner', value: '210.000' },
      'Closest airport': { label: 'Nächster Flughafen', value: 'OUL · 15 Min.' },
      'Last call': { label: 'Letzte Runde', value: '03:30' },
      'Best season': { label: 'Beste Saison', value: 'Ganzjährig · Kulturhauptstadt 2026' },
    },
  },
  rovaniemi: {
    region: 'Lappland',
    blurb: 'Die arktische Hauptstadt — gespalten zwischen Touristenwochenenden und Werktagen, die nur den Einheimischen gehören.',
    pageTagline: 'Die arktische Hauptstadt.',
    venues: {
      'Roy Club': { type: 'Nachtclub', note: 'Seit 1985 geöffnet. Drei Räume — die größte Tanzfläche der Stadt.' },
      'Bull Bar': { type: 'Sportbar', note: 'Laut, voll, Premier-League-Terrasse, Essen bis spät.' },
      'Kauppayhtiö': { type: 'Café + Bar', note: 'Vintage-Wohnzimmer-Ästhetik; Cocktails bis spät.' },
    },
    quickFacts: {
      'Population': { label: 'Einwohner', value: '64.000' },
      'Closest airport': { label: 'Nächster Flughafen', value: 'RVN · 10 Min.' },
      'Last call': { label: 'Letzte Runde', value: '03:00' },
      'Best season': { label: 'Beste Saison', value: 'Sep–März (Polarlicht) · Dez (Weihnachtsmann)' },
    },
  },
  levi: {
    region: 'Gemeinde Kittilä',
    blurb: 'Hullu Poro Areena: 1.700 Plätze, 10 Bars, 2 Etagen — der größte Nachtclub Lapplands.',
    pageTagline: 'Die größte Skigebiets-Party Finnlands.',
    venues: {
      'Hullu Poro Areena': { type: 'Mega-Nachtclub', note: '1.700 Plätze, 10 Bars, 2 Etagen. Konzert-Location von Mittwoch bis Samstag.' },
      'Ihku': { type: 'Après-Ski', note: 'Holzhütte am Hangfuß. Skischuhe auf der Tanzfläche.' },
    },
    quickFacts: {
      'Beds in resort': { label: 'Betten im Resort', value: '24.000' },
      'Closest airport': { label: 'Nächster Flughafen', value: 'KTT · 18 km' },
      'Last call': { label: 'Letzte Runde', value: '03:30' },
      'Best season': { label: 'Beste Saison', value: 'Nov–Apr (Schnee + Hullu Poro)' },
    },
  },
  saariselka: {
    region: 'Gemeinde Inari',
    blurb: 'Glas-Iglus, die Igloo Bar von Kakslauttanen und ein einziger echter Pub — das Local Pub Panimo.',
    pageTagline: 'Wilderness-Premium — das Dorf der Iglu-Bar.',
    intro: 'Saariselkä ist kein Ziel für Clubs. Es ist ein Ziel für Glas-Iglus — und genau darum geht es. Das Kakslauttanen Arctic Resort hat die meistfotografierte Bar der Welt (ein Glas-Iglu, dessen Decke das Polarlicht ist). Das Dorf selbst besteht aus einer Hauptstraße, zwei Restaurants, in denen sich das Essen lohnt, und dem Local Pub Panimo — einer Mikrobrauerei mit der zuverlässigsten Craft-Bier-Auswahl Lapplands. Nach Einbruch der Dunkelheit spielt sich alles in den Resorts ab, nicht im Dorf.',
    venues: {
      'Kakslauttanen Igloo Bar': { type: 'Bar unter Glasdach', note: 'Weltberühmtes Fotomotiv. Für Nicht-Gäste mit Reservierung zugänglich.' },
      'Local Pub Panimo': { type: 'Mikrobrauerei-Pub', note: 'Hausgebraute Biere, der einzige richtige Pub im Dorf.' },
      'Hotel Riekonlinna Bar': { type: 'Hotelbar', note: 'Großer Kamin in der Lobby, freitagabends lokaler DJ.' },
    },
    knowList: [
      'Keine eigenständigen Clubs — das Nachtleben spielt sich in den Hotels ab.',
      'Für die Igloo Bar ist eine Reservierung nötig, wenn man nicht im Kakslauttanen wohnt.',
      'Die Straße vom Flughafen (Ivalo) dauert 25 Minuten; buche Transfers, wenn du trinkst.',
      'Eine Polarlicht-Prognose-App ist unverzichtbar — das Personal weckt die Gäste um 02:00, wenn es aktiv ist.',
    ],
    quickFacts: {
      'Beds in village': { label: 'Betten im Dorf', value: '7.500' },
      'Closest airport': { label: 'Nächster Flughafen', value: 'IVL · 25 Min.' },
      'Last call': { label: 'Letzte Runde', value: '01:30 (Hotels)' },
      'Best season': { label: 'Beste Saison', value: 'Sep–März (Polarlicht)' },
    },
  },
  inari: {
    region: 'Gemeinde Inari',
    blurb: 'Kulturelle Hauptstadt der Samen — Sajos, Siida, der Inarisee und die Wildniskirche von Pielpajärvi.',
    pageTagline: 'Die kulturelle Hauptstadt der Samen.',
    intro: 'Inari ist der kulturelle Sitz des samischen Parlaments (Sajos) und Heimat des Siida — des Museums, das alles erklärt, was man über Sápmi nicht wusste. Das „Nachtleben“ ist hier kulturell: das indigene Filmfestival Skábmagovat im Januar, das samische Musikfestival Ijahis Idja im August und eine Handvoll Bars, die meist Abendessen servieren. Komm nicht wegen der Clubs. Komm wegen kaltem Seewasser, Joik-Konzerten und einem Himmel, der im Dezember um 14:00 schwarz wird.',
    venues: {
      'Hotel Inari Bar': { type: 'Hotelbar', note: 'Restaurant + Bar mit Seeblick, bis 01:00 geöffnet.' },
      'Sajos Café': { type: 'Tagsüber', note: 'Café des samischen Parlaments — Kaffee + kulturelle Veranstaltungen.' },
      'Tradiska': { type: 'Restaurant + Bar', note: 'Samische Küche, kleine Bar, intim.' },
    },
    knowList: [
      'Keine Clubs. Zwei Hotels mit Bars, drei Restaurants mit Alkoholausschank.',
      'Das indigene Filmfestival Skábmagovat läuft Ende Januar — die Unterkünfte sind dann ausgebucht.',
      'Das Festival Ijahis Idja Mitte August: das, was einer „Szene“ in Inari am nächsten kommt.',
      'Sajos und Siida sind kulturelle Pflichtbesuche, bevor du irgendwo trinkst.',
    ],
    quickFacts: {
      'Population': { label: 'Einwohner', value: '6.800' },
      'Closest airport': { label: 'Nächster Flughafen', value: 'IVL · 40 Min.' },
      'Last call': { label: 'Letzte Runde', value: '01:00' },
      'Best season': { label: 'Beste Saison', value: 'Ende Aug (Ijahis Idja) · Jan (Skábmagovat)' },
    },
  },
  kemi: {
    region: 'Meereslappland',
    blurb: 'SnowCastle, der Eisbrecher Sampo und der gestapelte Restaurantkomplex des Hotel Merihovi.',
    pageTagline: 'SnowCastle, Eisbrecher, Meereslappland.',
    intro: 'Kemi ist das Tor zwischen der Bahn aus Helsinki und Lappland — und eine Stadt mit einem Trick: dem SnowCastle, das seit 1996 jeden Winter neu gebaut wird, mit einer Kapelle, einem Hotel und einer Bar mit Wänden aus Eis. Der Eisbrecher Sampo bietet ab Dezember nächtliche Touren, die zugleich als Bar-Location dienen. Das Nachtleben an Land ist klein: Das Hotel Merihovi betreibt einen mehrschichtigen Komplex (Lobbybar, Sportterrasse, Restaurant) und das war es im Wesentlichen. Eine industrielle Hafenstadt, die im Winter über ihrem Gewicht boxt.',
    venues: {
      'SnowCastle Ice Bar': { type: 'Eisbar', note: 'Geöffnet von Jan–Apr. Wodka-Shots in Eisgläsern, Wände bei –5 °C.' },
      'Hotel Merihovi': { type: 'Hotelkomplex', note: 'Lobbybar + Sportterrasse + Restaurant.' },
      'Sampo Icebreaker': { type: 'Bar an Bord', note: 'Fahrten um 12:00 + 18:00 in der Saison; die Bar läuft die ganze Fahrt über.' },
    },
    knowList: [
      'Das meiste spielt sich von Januar bis April im SnowCastle ab.',
      'Für den Eisbrecher Sampo ist in der Hochsaison eine Buchung 2–3 Tage im Voraus nötig.',
      'Letzte Runde um 02:00 in der Stadt; die Bar im SnowCastle schließt früher (in der Regel um 24:00).',
      'Zug aus Helsinki: 8 Std. ohne Umsteigen.',
    ],
    quickFacts: {
      'Population': { label: 'Einwohner', value: '20.800' },
      'Closest airport': { label: 'Nächster Flughafen', value: 'KEM · 5 Min. · oder Bahn aus Helsinki' },
      'Last call': { label: 'Letzte Runde', value: '02:00' },
      'Best season': { label: 'Beste Saison', value: 'Jan–Apr (SnowCastle + Eisbrecher)' },
    },
  },
  yllas: {
    region: 'Kolari / Muonio',
    blurb: 'Finnlands zweitgrößtes Skigebiet.',
    pageTagline: 'Finnlands zweitgrößtes Skigebiet.',
    venues: {
      'Sport Resort Ylläs': { type: 'Hotelbar', note: 'Die belebteste Après-Bar von Äkäslompolo.' },
    },
    quickFacts: {
      'Beds in resort': { label: 'Betten im Resort', value: '23.000' },
      'Closest airport': { label: 'Nächster Flughafen', value: 'KTT · 50 Min.' },
      'Last call': { label: 'Letzte Runde', value: '02:00' },
      'Best season': { label: 'Beste Saison', value: 'Nov–Apr (Skifahren) · März (längere Tage)' },
    },
  },
  ruka: {
    region: 'Nordostfinnland',
    blurb: 'Finnlands zweitgrößtes Skigebiet nach Skitagen.',
    pageTagline: 'Skigebiet im Bärenland.',
    venues: {
      'Zone Bar': { type: 'Après-Ski', note: 'Am Hangfuß — die Heimat der FIS-Weltcup-Eröffnungsparty.' },
    },
    quickFacts: {
      'Beds in resort': { label: 'Betten im Resort', value: '15.000' },
      'Closest airport': { label: 'Nächster Flughafen', value: 'KAO · 30 Min.' },
      'Last call': { label: 'Letzte Runde', value: '03:00 (in der Saison)' },
      'Best season': { label: 'Beste Saison', value: 'Ende Nov (FIS-Eröffnung) · Dez–Apr' },
    },
  },
  'pyha-luosto': {
    region: 'Pelkosenniemi / Sodankylä',
    blurb: 'Amethyst, Fjells und das ruhigste Skifahren Lapplands.',
    pageTagline: 'Die Amethyst-Fjells.',
    intro: 'Zwei kleine Fjells, 35 km voneinander entfernt, die sich einen Nationalpark teilen. Pyhä hat das größere Skigebiet; Luosto hat das Amethyst-Bergwerk, das man um Mitternacht unter dem Polarlicht besuchen kann. Keines hat Clubs. Beide haben Hotelbars, die einen Kaminabend wert sind — das Hotel Pyhätunturi für Essen auf Restaurantniveau, das Hotel Aurora in Luosto für die Bar mit Polarlicht-Fenster. Das ruhigste „Skiziel“ Lapplands und stolz darauf.',
    venues: {
      'Hotel Pyhätunturi Bar': { type: 'Hotelbar', note: 'Restaurant + Bar, Kamin, direkt am Hang.' },
      'Hotel Aurora Luosto': { type: 'Bar mit Polarlicht-Fenster', note: 'Bar mit Glaswänden nach Norden — Weckdienst, wenn das Polarlicht aktiv ist.' },
      'Pyhän Asteli': { type: 'Restaurant + Bar', note: 'Bei Einheimischen beliebtes Restaurant; die einzige spätabendliche Speisemöglichkeit im Dorf Pyhä.' },
    },
    knowList: [
      'Nirgends in Pyhä-Luosto gibt es Nachtclubs.',
      'Das Amethyst-Bergwerk bietet Nachttouren unter dem Polarlicht — im Voraus buchen.',
      'Der Pyhä-Luosto-Nationalpark ist die stille Attraktion.',
      'Letzte Runde gegen 01:00 in beiden Dörfern.',
    ],
    quickFacts: {
      'Beds in two villages': { label: 'Betten in zwei Dörfern', value: '5.000' },
      'Closest airport': { label: 'Nächster Flughafen', value: 'RVN · 1 Std. 30 · oder KTT · 2 Std. 30' },
      'Last call': { label: 'Letzte Runde', value: '01:00' },
      'Best season': { label: 'Beste Saison', value: 'Dez–Apr (Skifahren) · Sep–März (Polarlicht)' },
    },
  },
  sodankyla: {
    region: 'Mittellappland',
    blurb: 'Midnight Sun Film Festival — hier werden Filme um 03:00 bei vollem Tageslicht gezeigt.',
    pageTagline: 'Midnight Sun Film Festival.',
    venues: {
    },
    quickFacts: {
      'Population': { label: 'Einwohner', value: '8.600' },
      'Closest airport': { label: 'Nächster Flughafen', value: 'RVN · 1 Std. 45' },
      'Last call': { label: 'Letzte Runde', value: '01:00 / 04:00 im Festival' },
      'Best season': { label: 'Beste Saison', value: 'Mitte Juni (Midnight Sun Film Festival)' },
    },
  },
  kittila: {
    region: 'Gemeinde Kittilä',
    blurb: 'Wo die Einheimischen wirklich wohnen (Levi ist überwiegend Touristen).',
    pageTagline: 'Wo die Einheimischen von Levi wirklich wohnen.',
    venues: {
    },
    quickFacts: {
      'Population': { label: 'Einwohner', value: '6.500' },
      'Closest airport': { label: 'Nächster Flughafen', value: 'KTT · 5 Min.' },
      'Last call': { label: 'Letzte Runde', value: '02:00' },
      'Best season': { label: 'Beste Saison', value: 'Ganzjährig (Levi-Personalszene)' },
    },
  },
  ivalo: {
    region: 'Gemeinde Inari',
    blurb: 'Das Club Nord des Hotel Ivalo + der Pub des Hotel Kultahippu.',
    pageTagline: 'Der nördlichste Flughafen mit einem Club.',
    intro: 'Ivalo ist der nördlichste Flughafen Finnlands und das Tor zu Inari, Saariselkä und dem Heimatgebiet der Samen. Die Stadt selbst hat 4.000 Einwohner. Das Hotel Ivalo betreibt das Club Nord — den nördlichsten Club im finnischen Festland, freitags und samstags geöffnet. Das Hotel Kultahippu hat den einzigen richtigen Pub im Dorf. Darüber hinaus: Hotelbars und ein Tankstellenkiosk, der Bier verkauft.',
    venues: {
      'Club Nord (Hotel Ivalo)': { type: 'Nachtclub', note: 'Fr–Sa geöffnet. Der nördlichste Club auf dem finnischen Festland.' },
      'Hotel Kultahippu Pub': { type: 'Pub', note: 'Täglich geöffnet. Der Feierabend-Treff der Einheimischen.' },
      'Hotel Ivalo Lobby Bar': { type: 'Hotelbar', note: 'Ruhiger, mit angeschlossenem Restaurant.' },
    },
    knowList: [
      'Der nördlichste Flughafen auf dem finnischen Festland.',
      'Saariselkä ist 25 Minuten entfernt — viele Saariselkä-Besucher fahren für das Club Nord herein.',
      'Letzte Runde um 02:00 werktags, um 03:00 am Wochenende.',
      'Kein Taxistand — über die Hotelrezeption buchen.',
    ],
    quickFacts: {
      'Population': { label: 'Einwohner', value: '4.000' },
      'Closest airport': { label: 'Nächster Flughafen', value: 'IVL · 5 Min.' },
      'Last call': { label: 'Letzte Runde', value: '02:00 / 03:00 am Wochenende' },
      'Best season': { label: 'Beste Saison', value: 'Sep–März (Polarlicht) · Aug (Festivals)' },
    },
  },
  muonio: {
    region: 'Westlappland',
    blurb: 'Kein Nachtleben. Der Pallas-Yllästunturi-Nationalpark ist die Attraktion.',
    pageTagline: 'Das Tor zum Nationalpark.',
    venues: {
      'Harriniva Wilderness Hotel': { type: 'Hotelbar', note: 'Sauna + Bar, überwiegend Safari-Gäste.' },
    },
    quickFacts: {
      'Population': { label: 'Einwohner', value: '2.300' },
      'Closest airport': { label: 'Nächster Flughafen', value: 'KTT · 1 Std. 15' },
      'Last call': { label: 'Letzte Runde', value: '23:00 / 01:00 am Wochenende' },
      'Best season': { label: 'Beste Saison', value: 'Sep–März (Polarlicht · geringe Lichtverschmutzung)' },
    },
  },
  salla: {
    region: 'Ostlappland',
    blurb: 'Mitten im Nirgendwo. Finnlands ruhigstes Skigebiet.',
    pageTagline: 'Mitten im Nirgendwo.',
    venues: {
      'Hotel Revontuli Bar': { type: 'Hotelbar', note: 'Die einzige spätabendliche Location. Restaurant + Bar.' },
      'Salla Wilderness Park': { type: 'Tages-Location', note: 'Mittagessen + Tagescafé für Parkbesucher.' },
    },
    quickFacts: {
      'Population': { label: 'Einwohner', value: '3.300' },
      'Closest airport': { label: 'Nächster Flughafen', value: 'KAO · 1 Std. 30' },
      'Last call': { label: 'Letzte Runde', value: '23:00 / 01:00 in der Saison' },
      'Best season': { label: 'Beste Saison', value: 'Dez–Apr (Skifahren · Olympia-Bewerbung 2032)' },
    },
  },
};

export default overlay;
