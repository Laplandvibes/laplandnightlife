import type { CityOverlay } from './cityI18n';

const overlay: Record<string, CityOverlay> = {
  oulu: {
    region: 'Noord-Pohjanmaa',
    blurb: 'Culturele Hoofdstad van Europa 2026 — en de enige echte clubscene die het hele jaar door draait in het noorden.',
    pageTagline: 'Culturele Hoofdstad van Europa 2026.',
    venues: {
      '45 Special': { type: 'Nachtclub', note: 'De favoriete club van studenten. Open woe–za, tot laat.' },
      'Never Grow Old': { type: 'Livemuziek + club', note: 'Indie / alternatieve boekingen. De kleinste van de strook, maar het meest trouwe publiek.' },
      'St Michael': { type: 'Live + club', note: 'De grootste zaal van de strook. Reizende DJ\'s en tributeavonden.' },
    },
    quickFacts: {
      'Population': { label: 'Inwoners', value: '210.000' },
      'Closest airport': { label: 'Dichtstbijzijnde luchthaven', value: 'OUL · 15 min' },
      'Last call': { label: 'Laatste ronde', value: '03:30' },
      'Best season': { label: 'Beste seizoen', value: 'Hele jaar · CHvE 2026' },
    },
  },
  rovaniemi: {
    region: 'Lapland',
    blurb: 'De arctische hoofdstad — verdeeld tussen toeristenweekends en doordeweekse avonden voor locals.',
    pageTagline: 'De arctische hoofdstad.',
    venues: {
      'Roy Club': { type: 'Nachtclub', note: 'Open sinds 1985. Drie zalen — de grootste dansvloer van de stad.' },
      'Bull Bar': { type: 'Sportbar', note: 'Luid, vol, Premier League-terras, eten tot laat.' },
      'Kauppayhtiö': { type: 'Café + bar', note: 'Vintage huiskamersfeer; cocktails tot laat.' },
    },
    quickFacts: {
      'Population': { label: 'Inwoners', value: '64.000' },
      'Closest airport': { label: 'Dichtstbijzijnde luchthaven', value: 'RVN · 10 min' },
      'Last call': { label: 'Laatste ronde', value: '03:00' },
      'Best season': { label: 'Beste seizoen', value: 'sep–mrt (aurora) · dec (Kerstman)' },
    },
  },
  levi: {
    region: 'Gemeente Kittilä',
    blurb: 'Hullu Poro Areena: capaciteit van 1.700, 10 bars, 2 verdiepingen — de grootste nachtclub van Lapland.',
    pageTagline: 'Het grootste skigebiedsfeest van Finland.',
    venues: {
      'Hullu Poro Areena': { type: 'Megaclub', note: 'Capaciteit van 1.700, 10 bars, 2 verdiepingen. Concertzaal woe–za.' },
      'Ihku': { type: 'Après-ski', note: 'Houten hut aan de voet van de piste. Skischoenen welkom op de dansvloer.' },
    },
    quickFacts: {
      'Beds in resort': { label: 'Bedden in het resort', value: '24.000' },
      'Closest airport': { label: 'Dichtstbijzijnde luchthaven', value: 'KTT · 18 km' },
      'Last call': { label: 'Laatste ronde', value: '03:30' },
      'Best season': { label: 'Beste seizoen', value: 'nov–apr (sneeuw + Hullu Poro)' },
    },
  },
  saariselka: {
    region: 'Gemeente Inari',
    blurb: 'Glazen iglo\'s, de Igloo Bar van Kakslauttanen en één echte pub — Local Pub Panimo.',
    pageTagline: 'Wildernis-premium — het iglobar-dorp.',
    intro: 'Saariselkä is geen clubbestemming. Het is een glaziglo-bestemming — en dat is precies de bedoeling. Kakslauttanen Arctic Resort heeft \'s werelds meest gefotografeerde bar (een glazen iglo waar het plafond de aurora is). Het dorp zelf is één hoofdstraat, twee restaurants waar je echt moet eten, en Local Pub Panimo — een microbrouwerij met de betrouwbaarste craftlijst op de tap van heel Lapland. Na het donker speelt het zich af bij de resorts, niet in het dorp.',
    venues: {
      'Kakslauttanen Igloo Bar': { type: 'Bar met glazen dak', note: 'Wereldberoemde foto. Open voor niet-gasten met reservering.' },
      'Local Pub Panimo': { type: 'Microbrouwerijpub', note: 'Eigen brouwsels, de enige echte pub van het dorp.' },
      'Hotel Riekonlinna Bar': { type: 'Hotelbar', note: 'Grote open haard in de lobby, lokale DJ op vrijdagavond.' },
    },
    knowList: [
      'Geen losse clubs — het nachtleven draait om de hotels.',
      'Voor de Igloo Bar is een reservering nodig als je niet bij Kakslauttanen verblijft.',
      'De weg vanaf de luchthaven (Ivalo) duurt 25 minuten; boek een transfer als je drinkt.',
      'Een aurora-app is onmisbaar — het personeel wekt gasten om 02:00 als ze actief is.',
    ],
    quickFacts: {
      'Beds in village': { label: 'Bedden in het dorp', value: '7.500' },
      'Closest airport': { label: 'Dichtstbijzijnde luchthaven', value: 'IVL · 25 min' },
      'Last call': { label: 'Laatste ronde', value: '01:30 (hotels)' },
      'Best season': { label: 'Beste seizoen', value: 'sep–mrt (aurora)' },
    },
  },
  inari: {
    region: 'Gemeente Inari',
    blurb: 'Culturele hoofdstad van de Sámi — Sajos, Siida, het Inarimeer en de wilderniskerk van Pielpajärvi.',
    pageTagline: 'De culturele hoofdstad van de Sámi.',
    intro: 'Inari is de culturele zetel van het Sámi-parlement (Sajos) en de thuisbasis van Siida — het museum dat alles uitlegt wat je niet wist over Sápmi. Het "nachtleven" is hier cultureel: het inheemse filmfestival Skábmagovat in januari, het Sámi-muziekfestival Ijahis Idja in augustus, en een handvol bars die vooral diners serveren. Kom hier niet voor clubs. Kom voor koud meerwater, joik-concerten en een hemel die in december om 14:00 zwart wordt.',
    venues: {
      'Hotel Inari Bar': { type: 'Hotelbar', note: 'Restaurant + bar met uitzicht op het meer, open tot 01:00.' },
      'Sajos Café': { type: 'Overdag', note: 'Café van het Sámi-parlement — koffie + culturele evenementen.' },
      'Tradiska': { type: 'Restaurant + bar', note: 'Sámi-keuken, kleine bar, intiem.' },
    },
    knowList: [
      'Geen clubs. Twee hotels met een bar, drie restaurants die alcohol schenken.',
      'Het inheemse filmfestival Skábmagovat loopt eind januari — overnachtingen raken uitverkocht.',
      'Festival Ijahis Idja half augustus: het dichtst bij een "scene" dat Inari heeft.',
      'Sajos en Siida zijn verplichte culturele bezoeken voordat je ergens gaat drinken.',
    ],
    quickFacts: {
      'Population': { label: 'Inwoners', value: '6.800' },
      'Closest airport': { label: 'Dichtstbijzijnde luchthaven', value: 'IVL · 40 min' },
      'Last call': { label: 'Laatste ronde', value: '01:00' },
      'Best season': { label: 'Beste seizoen', value: 'eind aug (Ijahis Idja) · jan (Skábmagovat)' },
    },
  },
  kemi: {
    region: 'Zee-Lapland',
    blurb: 'SnowCastle, ijsbreker Sampo en het gelaagde restaurantcomplex van Hotel Merihovi.',
    pageTagline: 'SnowCastle, ijsbreker, Zee-Lapland.',
    intro: 'Kemi is de toegangspoort tussen de trein uit Helsinki en Lapland — en een stad met één troef: het SnowCastle, elke winter opnieuw opgebouwd sinds 1996, met een kapel, een hotel en een bar met ijzen wanden. Ijsbreker Sampo vaart vanaf december en doet nachtelijke tochten die ook als barlocatie dienen. Het nachtleven op het vasteland is klein: Hotel Merihovi runt een gelaagd complex (lobbybar, sportterras, restaurant) en daar blijft het zo\'n beetje bij. Industriële havenstad die in de winter boven haar gewicht bokst.',
    venues: {
      'SnowCastle Ice Bar': { type: 'IJsbar', note: 'Open jan–apr. Wodkashots in ijzen glaasjes, wanden op –5 °C.' },
      'Hotel Merihovi': { type: 'Hotelcomplex', note: 'Lobbybar + sportterras + restaurant.' },
      'Sampo Icebreaker': { type: 'Bar aan boord', note: 'Vaart 12:00 + 18:00 in het seizoen; de bar draait de hele tocht door.' },
    },
    knowList: [
      'Het meeste speelt zich af in het SnowCastle van januari tot april.',
      'Voor ijsbreker Sampo moet je in het hoogseizoen 2–3 dagen vooraf boeken.',
      'Laatste ronde 02:00 in de stad; de bar van het SnowCastle sluit eerder (meestal om 24:00).',
      'Trein vanuit Helsinki: 8 uur rechtstreeks.',
    ],
    quickFacts: {
      'Population': { label: 'Inwoners', value: '20.800' },
      'Closest airport': { label: 'Dichtstbijzijnde luchthaven', value: 'KEM · 5 min · of trein vanuit Helsinki' },
      'Last call': { label: 'Laatste ronde', value: '02:00' },
      'Best season': { label: 'Beste seizoen', value: 'jan–apr (SnowCastle + ijsbreker)' },
    },
  },
  yllas: {
    region: 'Kolari / Muonio',
    blurb: 'Het op een na grootste skigebied van Finland.',
    pageTagline: 'Het op een na grootste skigebied van Finland.',
    venues: {
      'Sport Resort Ylläs': { type: 'Hotelbar', note: 'De drukste après-bar van Äkäslompolo.' },
    },
    quickFacts: {
      'Beds in resort': { label: 'Bedden in het resort', value: '23.000' },
      'Closest airport': { label: 'Dichtstbijzijnde luchthaven', value: 'KTT · 50 min' },
      'Last call': { label: 'Laatste ronde', value: '02:00' },
      'Best season': { label: 'Beste seizoen', value: 'nov–apr (skiën) · mrt (langere dagen)' },
    },
  },
  ruka: {
    region: 'Noordoost-Finland',
    blurb: 'Finlands op een na grootste skiresort gemeten in skidagen.',
    pageTagline: 'Skiresort in berenland.',
    venues: {
      'Zone Bar': { type: 'Après-ski', note: 'Aan de voet van de piste — de thuisbasis van het openingsfeest van de FIS-wereldbeker.' },
    },
    quickFacts: {
      'Beds in resort': { label: 'Bedden in het resort', value: '15.000' },
      'Closest airport': { label: 'Dichtstbijzijnde luchthaven', value: 'KAO · 30 min' },
      'Last call': { label: 'Laatste ronde', value: '03:00 (in het seizoen)' },
      'Best season': { label: 'Beste seizoen', value: 'eind nov (FIS-opening) · dec–apr' },
    },
  },
  'pyha-luosto': {
    region: 'Pelkosenniemi / Sodankylä',
    blurb: 'Amethist, fjellen en de rustigste ski-ervaring van Lapland.',
    pageTagline: 'De amethistfjellen.',
    intro: 'Twee kleine fjellen, 35 km uit elkaar, samen één nationaal park. Pyhä heeft het grotere skigebied; Luosto heeft de amethistmijn die je om middernacht onder de aurora kunt bezoeken. Geen van beide heeft clubs. Beide hebben hotelbars die een avond bij de open haard waard zijn — Hotel Pyhätunturi voor dineren op restaurantniveau, Hotel Aurora in Luosto voor de bar met aurora-raam. De rustigste "skibestemming" van Lapland, en trots daarop.',
    venues: {
      'Hotel Pyhätunturi Bar': { type: 'Hotelbar', note: 'Restaurant + bar, open haard, aan de piste.' },
      'Hotel Aurora Luosto': { type: 'Bar met aurora-raam', note: 'Bar met glazen wand op het noorden — wekservice als de aurora actief is.' },
      'Pyhän Asteli': { type: 'Restaurant + bar', note: 'Geliefd bij locals; het enige late diner in het dorp Pyhä.' },
    },
    knowList: [
      'Nergens in Pyhä-Luosto zijn er nachtclubs.',
      'De amethistmijn biedt nachttochten onder de aurora — boek van tevoren.',
      'Nationaal Park Pyhä-Luosto is de stille trekpleister.',
      'Laatste ronde rond 01:00 in beide dorpen.',
    ],
    quickFacts: {
      'Beds in two villages': { label: 'Bedden in twee dorpen', value: '5.000' },
      'Closest airport': { label: 'Dichtstbijzijnde luchthaven', value: 'RVN · 1u30 · of KTT · 2u30' },
      'Last call': { label: 'Laatste ronde', value: '01:00' },
      'Best season': { label: 'Beste seizoen', value: 'dec–apr (skiën) · sep–mrt (aurora)' },
    },
  },
  sodankyla: {
    region: 'Centraal-Lapland',
    blurb: 'Midnight Sun Film Festival — ze draaien films om 03:00 in vol daglicht.',
    pageTagline: 'Midnight Sun Film Festival.',
    venues: {
    },
    quickFacts: {
      'Population': { label: 'Inwoners', value: '8.600' },
      'Closest airport': { label: 'Dichtstbijzijnde luchthaven', value: 'RVN · 1u45' },
      'Last call': { label: 'Laatste ronde', value: '01:00 / 04:00 tijdens festival' },
      'Best season': { label: 'Beste seizoen', value: 'half juni (Midnight Sun Film Festival)' },
    },
  },
  kittila: {
    region: 'Gemeente Kittilä',
    blurb: 'Waar de locals echt wonen (Levi is vooral toeristen).',
    pageTagline: 'Waar de locals van Levi echt wonen.',
    venues: {
    },
    quickFacts: {
      'Population': { label: 'Inwoners', value: '6.500' },
      'Closest airport': { label: 'Dichtstbijzijnde luchthaven', value: 'KTT · 5 min' },
      'Last call': { label: 'Laatste ronde', value: '02:00' },
      'Best season': { label: 'Beste seizoen', value: 'Hele jaar (personeelsscene van Levi)' },
    },
  },
  ivalo: {
    region: 'Gemeente Inari',
    blurb: 'Club Nord van Hotel Ivalo + de pub van Hotel Kultahippu.',
    pageTagline: 'De noordelijkste luchthaven met een club.',
    intro: 'Ivalo is de noordelijkste luchthaven van Finland en de toegangspoort tot Inari, Saariselkä en het Sámi-thuisland. De plaats zelf telt 4.000 inwoners. Hotel Ivalo runt Club Nord — de noordelijkste club op het Finse vasteland, open op vrijdag en zaterdag. Hotel Kultahippu heeft de enige echte pub van het dorp. Verder zijn er hotelbars en één tankstationkiosk die bier verkoopt.',
    venues: {
      'Club Nord (Hotel Ivalo)': { type: 'Nachtclub', note: 'Open vrij–za. De noordelijkste club op het Finse vasteland.' },
      'Hotel Kultahippu Pub': { type: 'Pub', note: 'Dagelijks open. De lokale borrelplek na het werk.' },
      'Hotel Ivalo Lobby Bar': { type: 'Hotelbar', note: 'Rustiger, aan het restaurant gekoppeld.' },
    },
    knowList: [
      'Noordelijkste luchthaven op het Finse vasteland.',
      'Saariselkä ligt 25 minuten weg — veel bezoekers van Saariselkä rijden in voor Club Nord.',
      'Laatste ronde 02:00 doordeweeks, 03:00 in het weekend.',
      'Geen taxistandplaats — boek via de hotelreceptie.',
    ],
    quickFacts: {
      'Population': { label: 'Inwoners', value: '4.000' },
      'Closest airport': { label: 'Dichtstbijzijnde luchthaven', value: 'IVL · 5 min' },
      'Last call': { label: 'Laatste ronde', value: '02:00 / 03:00 in het weekend' },
      'Best season': { label: 'Beste seizoen', value: 'sep–mrt (aurora) · aug (festivals)' },
    },
  },
  muonio: {
    region: 'West-Lapland',
    blurb: 'Geen nachtleven. Nationaal Park Pallas-Yllästunturi is de trekpleister.',
    pageTagline: 'De toegangspoort tot het nationaal park.',
    venues: {
      'Harriniva Wilderness Hotel': { type: 'Hotelbar', note: 'Sauna + bar, vooral safarigasten.' },
    },
    quickFacts: {
      'Population': { label: 'Inwoners', value: '2.300' },
      'Closest airport': { label: 'Dichtstbijzijnde luchthaven', value: 'KTT · 1u15' },
      'Last call': { label: 'Laatste ronde', value: '23:00 / 01:00 in het weekend' },
      'Best season': { label: 'Beste seizoen', value: 'sep–mrt (aurora · weinig lichtvervuiling)' },
    },
  },
  salla: {
    region: 'Oost-Lapland',
    blurb: 'Midden in the middle of nowhere. Het rustigste skiresort van Finland.',
    pageTagline: 'In the middle of nowhere.',
    venues: {
      'Hotel Revontuli Bar': { type: 'Hotelbar', note: 'De enige locatie tot \'s avonds laat. Restaurant + bar.' },
      'Salla Wilderness Park': { type: 'Daglocatie', note: 'Lunch + dagcafé voor bezoekers van het park.' },
    },
    quickFacts: {
      'Population': { label: 'Inwoners', value: '3.300' },
      'Closest airport': { label: 'Dichtstbijzijnde luchthaven', value: 'KAO · 1u30' },
      'Last call': { label: 'Laatste ronde', value: '23:00 / 01:00 in het seizoen' },
      'Best season': { label: 'Beste seizoen', value: 'dec–apr (skiën · bid Spelen 2032)' },
    },
  },
};

export default overlay;
