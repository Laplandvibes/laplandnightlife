export type CityTag =
  | 'Real scene'
  | 'Ski resort'
  | 'Wilderness premium'
  | 'Cultural anchor'
  | 'Small town';

export interface City {
  slug: string;
  name: string;
  tag: CityTag;
  region: string;
  /** Short blurb for cards + city-list teasers. */
  blurb: string;
  /** Card image path (relative to /images/card/). */
  img: string;
  /** Page tagline shown under h1 on the city page. */
  pageTagline: string;
  /** Body intro: one paragraph describing the scene honestly. */
  intro: string;
  /** Verified venues at this city (the spine of each city page). */
  venues: { name: string; type: string; note: string }[];
  /** What to know — practical local rules / tips specific to this town. */
  knowList: string[];
  /** Priority in sitemap (1.0 = home, 0.6 = quietest town). */
  priority: number;
}

/** Quick facts shown at the top of each city page (4 short stats). */
export const CITY_QUICK_FACTS: Record<string, { label: string; value: string }[]> = {
  oulu: [
    { label: 'Population', value: '210 000' },
    { label: 'Closest airport', value: 'OUL · 15 min' },
    { label: 'Last call', value: '03:30' },
    { label: 'Best season', value: 'Year-round · 2026 ECoC' },
  ],
  rovaniemi: [
    { label: 'Population', value: '64 000' },
    { label: 'Closest airport', value: 'RVN · 10 min' },
    { label: 'Last call', value: '03:00' },
    { label: 'Best season', value: 'Sep–Mar (aurora) · Dec (Santa)' },
  ],
  levi: [
    { label: 'Beds in resort', value: '24 000' },
    { label: 'Closest airport', value: 'KTT · 18 km' },
    { label: 'Last call', value: '03:30' },
    { label: 'Best season', value: 'Nov–Apr (snow + Hullu Poro)' },
  ],
  saariselka: [
    { label: 'Beds in village', value: '7 500' },
    { label: 'Closest airport', value: 'IVL · 25 min' },
    { label: 'Last call', value: '01:30 (hotels)' },
    { label: 'Best season', value: 'Sep–Mar (aurora)' },
  ],
  inari: [
    { label: 'Population', value: '6 800' },
    { label: 'Closest airport', value: 'IVL · 40 min' },
    { label: 'Last call', value: '01:00' },
    { label: 'Best season', value: 'Late Aug (Ijahis Idja) · Jan (Skábmagovat)' },
  ],
  kemi: [
    { label: 'Population', value: '20 800' },
    { label: 'Closest airport', value: 'KEM · 5 min · or rail from Helsinki' },
    { label: 'Last call', value: '02:00' },
    { label: 'Best season', value: 'Jan–Apr (SnowCastle + icebreaker)' },
  ],
  yllas: [
    { label: 'Beds in resort', value: '23 000' },
    { label: 'Closest airport', value: 'KTT · 50 min' },
    { label: 'Last call', value: '02:00' },
    { label: 'Best season', value: 'Nov–Apr (skiing) · Mar (longer days)' },
  ],
  ruka: [
    { label: 'Beds in resort', value: '15 000' },
    { label: 'Closest airport', value: 'KAO · 30 min' },
    { label: 'Last call', value: '03:00 (in season)' },
    { label: 'Best season', value: 'Late Nov (FIS opening) · Dec–Apr' },
  ],
  'pyha-luosto': [
    { label: 'Beds in two villages', value: '5 000' },
    { label: 'Closest airport', value: 'RVN · 1h30 · or KTT · 2h30' },
    { label: 'Last call', value: '01:00' },
    { label: 'Best season', value: 'Dec–Apr (skiing) · Sep–Mar (aurora)' },
  ],
  sodankyla: [
    { label: 'Population', value: '8 600' },
    { label: 'Closest airport', value: 'RVN · 1h45' },
    { label: 'Last call', value: '01:00 / 04:00 in festival' },
    { label: 'Best season', value: 'Mid-Jun (Midnight Sun Film Festival)' },
  ],
  kittila: [
    { label: 'Population', value: '6 500' },
    { label: 'Closest airport', value: 'KTT · 5 min' },
    { label: 'Last call', value: '02:00' },
    { label: 'Best season', value: 'Year-round (Levi staff scene)' },
  ],
  ivalo: [
    { label: 'Population', value: '4 000' },
    { label: 'Closest airport', value: 'IVL · 5 min' },
    { label: 'Last call', value: '02:00 / 03:00 weekends' },
    { label: 'Best season', value: 'Sep–Mar (aurora) · Aug (festivals)' },
  ],
  muonio: [
    { label: 'Population', value: '2 300' },
    { label: 'Closest airport', value: 'KTT · 1h15' },
    { label: 'Last call', value: '23:00 / 01:00 weekends' },
    { label: 'Best season', value: 'Sep–Mar (aurora · low light pollution)' },
  ],
  salla: [
    { label: 'Population', value: '3 300' },
    { label: 'Closest airport', value: 'KAO · 1h30' },
    { label: 'Last call', value: '23:00 / 01:00 in season' },
    { label: 'Best season', value: 'Dec–Apr (skiing · 2032 Olympics bid)' },
  ],
};

export const CITIES: City[] = [
  {
    slug: 'oulu',
    name: 'Oulu',
    tag: 'Real scene',
    region: 'North Ostrobothnia',
    blurb: 'European Capital of Culture 2026 — and the only real year-round club scene in the north.',
    img: '/images/card/city-oulu.webp',
    pageTagline: 'European Capital of Culture 2026.',
    intro: '200 000 people, a student-driven club scene, and the Rotuaari pedestrian strip with eight venues inside a 400-metre walk. Oulu is the only northern city with weeknights that actually run — Tuesday karaoke at 45 Special, Wednesday DJ sets at Never Grow Old, Friday queues at 45 Special and Tähtitorni. 2026 adds the European Capital of Culture programme: 1 500 events including Air Guitar World Championships, Qstock, Elojazz and the Frozen People winter festival.',
    venues: [
      { name: '45 Special', type: 'Nightclub', note: 'The student-favourite club. Open Wed–Sat, late.' },
      { name: 'Never Grow Old', type: 'Live music + club', note: 'Indie / alternative bookings. Smallest of the strip but the most loyal crowd.' },
      { name: 'Tähtitorni', type: 'Cocktail + club', note: 'Top-floor bar in the city centre — late-night cocktails into a packed dancefloor.' },
      { name: 'Tex Mex Cantina', type: 'Bar', note: 'Pre-club drinks, terrace in summer.' },
      { name: 'Bishop\'s Arms', type: 'Pub', note: 'Whisky pub, the Rotuaari anchor for a quieter pint.' },
      { name: 'St Michael', type: 'Live + club', note: 'The biggest room on the strip. Touring DJs and tribute nights.' },
      { name: 'Hemingway\'s', type: 'Cocktail bar', note: 'Speakeasy feel; mixology programme.' },
      { name: 'Kaarlenholvi', type: 'Beer hall', note: 'Cellar bar with a long Finnish-craft tap list.' },
    ],
    knowList: [
      'Rotuaari is closed to traffic — eight venues inside one walk.',
      'European Capital of Culture programme runs Jan–Dec 2026: book accommodation early.',
      'Last call is 03:30 in city-centre venues; doors close 04:00.',
      'Oulu is the only Lapland city with a real Sunday daytime scene (Hospoda Plzeň, Cafe Bisketti).',
    ],
    priority: 0.9,
  },
  {
    slug: 'rovaniemi',
    name: 'Rovaniemi',
    tag: 'Real scene',
    region: 'Lapland',
    blurb: 'The Arctic capital — split between tourist weekends and locals-only weekdays.',
    img: '/images/card/city-rovaniemi.webp',
    pageTagline: 'The Arctic capital.',
    intro: 'Two scenes inside one city. Koskikatu is the tourist strip — Roy Club has thrown "the city\'s best parties since 1985", Tivoli pulls international DJ tours, and Bull Bar is the loudest sports terrace. Maakuntakatu is where locals drink — Cafe & Bar 21 for cocktails, Three Cats for indie, Oluthuone for whisky. Tourist weekends mean Koskikatu queues; weekdays mean Maakuntakatu is the only thing open.',
    venues: [
      { name: 'Roy Club', type: 'Nightclub', note: 'Open since 1985. Three rooms — the city\'s biggest dancefloor.' },
      { name: 'Tivoli', type: 'Nightclub', note: 'International DJ bookings; the Friday queue is real.' },
      { name: 'Bull Bar', type: 'Sports bar', note: 'Loud, packed, Premier League terrace, late food.' },
      { name: 'Cafe & Bar 21', type: 'Cocktail bar', note: 'Local-favourite mixology bar on Maakuntakatu.' },
      { name: 'Three Cats', type: 'Indie / live', note: 'Small-room live music — Finnish indie + jazz.' },
      { name: 'Oluthuone', type: 'Whisky pub', note: 'Single-malt selection that beats most Helsinki pubs.' },
      { name: 'Half Past Nine', type: 'Karaoke', note: 'The karaoke bar locals send tourists to (with a smirk).' },
      { name: 'Kauppayhtiö', type: 'Cafe + bar', note: 'Vintage living-room aesthetic; cocktails late.' },
    ],
    knowList: [
      'Koskikatu is the tourist strip; Maakuntakatu is where locals actually go.',
      'Last call is 03:00; clubs close 03:30 in winter, sometimes 04:00 in peak season.',
      'No Uber — save the local taxi number 0100 84 84.',
      'Aurora forecast peaks October–March — Roy Club has a smoking terrace facing north.',
    ],
    priority: 0.9,
  },
  {
    slug: 'levi',
    name: 'Levi',
    tag: 'Ski resort',
    region: 'Kittilä municipality',
    blurb: 'Hullu Poro Areena: 1 700 capacity, 10 bars, 2 floors — the biggest nightclub in Lapland.',
    img: '/images/card/city-levi.webp',
    pageTagline: 'Finland\'s biggest ski-resort party.',
    intro: 'Hullu Poro Areena is the centrepiece — 1 700 capacity, two floors, ten bars, and the biggest dancefloor north of Helsinki. Around it: Ihku, the legendary après-ski cabin where boots are encouraged on the dancefloor; Jenny Wolf for cocktails; Pasaati for late-night locals. November means the FIS World Cup brings a 10-day party. February–April means stag groups, ski schools and full-throttle weekends. Off-peak: closed Mon/Tue, half the venues hibernating.',
    venues: [
      { name: 'Hullu Poro Areena', type: 'Mega-nightclub', note: '1 700 capacity, 10 bars, 2 floors. Concert venue Wed–Sat.' },
      { name: 'Ihku', type: 'Après-ski', note: 'Wooden cabin at the slope base. Ski boots on the dancefloor.' },
      { name: 'Jenny Wolf', type: 'Cocktail bar', note: 'The grown-up option — fireplace, full mixology bar.' },
      { name: 'Pasaati', type: 'Late-night bar', note: 'Where locals end up after the tourists leave.' },
      { name: 'Crazy Reindeer Bar', type: 'Hotel bar', note: 'Hullu Poro Hotel\'s in-house — open every day in season.' },
      { name: 'Tuikku', type: 'Lounge', note: 'Quieter cocktails; live acoustic on Sundays.' },
      { name: 'Donkey Bar', type: 'Pub', note: 'Long Finnish-tap list; the only proper pub on the slope.' },
    ],
    knowList: [
      'Levi is closed Mon/Tue outside ski season — even Hullu Poro.',
      'FIS World Cup mid-November sells out a year ahead.',
      'Last call 03:30 in season; some venues run all-night during World Cup week.',
      'Ski-boot policy varies — Ihku says yes, Jenny Wolf says no.',
    ],
    priority: 0.9,
  },
  {
    slug: 'saariselka',
    name: 'Saariselkä',
    tag: 'Wilderness premium',
    region: 'Inari municipality',
    blurb: 'Glass igloos, Kakslauttanen\'s Igloo Bar, and one real pub — Local Pub Panimo.',
    img: '/images/card/city-saariselka.webp',
    pageTagline: 'Wilderness premium — the igloo-bar village.',
    intro: 'Saariselkä is not a club destination. It\'s a glass-igloo destination — and that\'s the point. Kakslauttanen Arctic Resort has the world\'s most-photographed bar (a glass igloo where the ceiling is the aurora). The village itself is one main street, two restaurants worth eating in, and Local Pub Panimo — a microbrewery with the most reliable craft tap list in Lapland. After dark, the action is at the resorts, not the village.',
    venues: [
      { name: 'Kakslauttanen Igloo Bar', type: 'Glass-roof bar', note: 'World-famous photo. Open to non-guests with reservation.' },
      { name: 'Local Pub Panimo', type: 'Microbrewery pub', note: 'In-house brews, the village\'s only proper pub.' },
      { name: 'Hotel Riekonlinna Bar', type: 'Hotel bar', note: 'Big lobby fireplace, local DJ on Friday nights.' },
      { name: 'Tunturi Aurora Lobby', type: 'Lounge', note: 'Mocktails + heavy snow boots welcome.' },
    ],
    knowList: [
      'No standalone clubs — nightlife is hotel-based.',
      'Igloo Bar requires a reservation if you\'re not staying at Kakslauttanen.',
      'The road from the airport (Ivalo) is 25 minutes; book transfers if drinking.',
      'Aurora forecast App is essential — staff will wake guests at 02:00 if it\'s active.',
    ],
    priority: 0.8,
  },
  {
    slug: 'inari',
    name: 'Inari',
    tag: 'Cultural anchor',
    region: 'Inari municipality',
    blurb: 'Sámi cultural capital — Sajos, Siida, Lake Inari and the Pielpajärvi wilderness church.',
    img: '/images/card/city-inari.webp',
    pageTagline: 'The Sámi cultural capital.',
    intro: 'Inari is the cultural seat of the Sámi parliament (Sajos) and home to Siida — the museum that explains everything you didn\'t know about Sápmi. The "nightlife" here is cultural: Skábmagovat indigenous film festival in January, Ijahis Idja Sámi music festival in August, and a handful of bars that mostly serve dinners. Don\'t come for clubs. Come for cold lake water, joik concerts and a sky that goes black at 14:00 in December.',
    venues: [
      { name: 'Hotel Inari Bar', type: 'Hotel bar', note: 'Lake-view restaurant + bar, open till 01:00.' },
      { name: 'Sajos Café', type: 'Daytime', note: 'Sámi parliament café — coffee + cultural events.' },
      { name: 'Tradiska', type: 'Restaurant + bar', note: 'Sámi cuisine, small bar, intimate.' },
    ],
    knowList: [
      'No clubs. Two hotels with bars, three restaurants serving alcohol.',
      'Skábmagovat indigenous film festival runs late January — accommodation books out.',
      'Ijahis Idja festival mid-August: the closest thing Inari has to a "scene".',
      'Sajos and Siida are required cultural visits before you drink anywhere.',
    ],
    priority: 0.8,
  },
  {
    slug: 'kemi',
    name: 'Kemi',
    tag: 'Cultural anchor',
    region: 'Sea Lapland',
    blurb: 'SnowCastle, Sampo Icebreaker, and Hotel Merihovi\'s stacked restaurant complex.',
    img: '/images/card/city-kemi.webp',
    pageTagline: 'SnowCastle, icebreaker, sea Lapland.',
    intro: 'Kemi is the gateway between Helsinki rail and Lapland — and a town with one trick: the SnowCastle, rebuilt every winter since 1996, with a chapel, hotel, and an ice-walled bar. Sampo Icebreaker cruises from December run nightly tours that double as bar venues. The mainland nightlife is small: Hotel Merihovi runs a layered complex (lobby bar, sports terrace, restaurant) and that\'s most of it. Industrial port town that punches above its weight in winter.',
    venues: [
      { name: 'SnowCastle Ice Bar', type: 'Ice bar', note: 'Open Jan–Apr. Vodka shots in ice glasses, walls at –5°C.' },
      { name: 'Hotel Merihovi', type: 'Hotel complex', note: 'Lobby bar + sports terrace + restaurant.' },
      { name: 'Sampo Icebreaker', type: 'Onboard bar', note: 'Cruises 12:00 + 18:00 in season; the bar runs the whole trip.' },
      { name: 'Restaurant Otso', type: 'Restaurant + bar', note: 'Local-favourite for late dinner with wine.' },
    ],
    knowList: [
      'Most action is in the SnowCastle from January to April.',
      'Sampo Icebreaker requires booking 2–3 days ahead in peak season.',
      'Last call 02:00 in town; SnowCastle bar closes earlier (24:00 typically).',
      'Train from Helsinki: 8h direct.',
    ],
    priority: 0.8,
  },
  {
    slug: 'yllas',
    name: 'Ylläs',
    tag: 'Ski resort',
    region: 'Kolari / Muonio',
    blurb: 'Finland\'s second-biggest ski area.',
    img: '/images/card/city-yllas.webp',
    pageTagline: 'Finland\'s second-biggest ski area.',
    intro: 'Ylläs has 63 slopes split between two villages — Äkäslompolo (north) and Ylläsjärvi (south) — connected by ski runs but separated by a 20-minute drive. Äkäs has the louder après scene (Sport Resort Ylläs, Kotahovi terrace). Ylläsjärvi has Lapin Eräherrat — the only proper bar/restaurant on that side. No mega-club. Quieter, older, more couples than Levi. Pallas-Yllästunturi National Park is the second-biggest in Finland.',
    venues: [
      { name: 'Sport Resort Ylläs', type: 'Hotel bar', note: 'Äkäslompolo\'s busiest après bar.' },
      { name: 'Kotahovi', type: 'Wooden lodge', note: 'Open fireplace, late hot drinks, the terrace après crowd.' },
      { name: 'Lapin Eräherrat', type: 'Restaurant + bar', note: 'The only "going out" option in Ylläsjärvi — late dinners + wine.' },
      { name: 'Saagan Kelo', type: 'Hotel bar', note: 'Cocktails, fireplace, quieter.' },
    ],
    knowList: [
      'Äkäs and Ylläsjärvi are 20 minutes apart by road — taxi between is ~€25.',
      'Last call is around 02:00 — earlier than Levi.',
      'No clubs. Bars only.',
      'National Park covers 1 020 km² — silence is the actual draw.',
    ],
    priority: 0.8,
  },
  {
    slug: 'ruka',
    name: 'Ruka',
    tag: 'Ski resort',
    region: 'Northeast Finland',
    blurb: 'Finland\'s second ski resort by skier-days.',
    img: '/images/card/city-ruka.webp',
    pageTagline: 'Bear country ski resort.',
    intro: 'Ruka is technically Kuusamo, technically not in Lapland, but skiers don\'t care — it\'s the second-busiest resort in Finland and the November opening week is the loudest. Zone Bar is the centrepiece après venue at the slope base. Pyörre is the late-night dance option. Off-season is brutal: town drops to 1 200 people. November–April it\'s 30 000 visitors deep.',
    venues: [
      { name: 'Zone Bar', type: 'Après-ski', note: 'At the slope base — the FIS World Cup opening party home.' },
      { name: 'Pyörre', type: 'Late-night club', note: 'The only proper club — open Thu–Sat in season.' },
      { name: 'Cabin Bar', type: 'Pub', note: 'Whisky pub, fireplace, the calm option.' },
      { name: 'Hotel Rantasipi Lobby', type: 'Hotel bar', note: 'Live music Friday + Saturday in peak.' },
    ],
    knowList: [
      'Ruka opens for FIS Cross-Country World Cup late November — that week is the peak.',
      'Last call is 03:00 in season, 01:00 off-season.',
      'Closest airport: Kuusamo (KAO), 30 minutes away.',
      'It\'s technically not Lapland but everyone treats it as one.',
    ],
    priority: 0.8,
  },
  {
    slug: 'pyha-luosto',
    name: 'Pyhä & Luosto',
    tag: 'Wilderness premium',
    region: 'Pelkosenniemi / Sodankylä',
    blurb: 'Amethyst, fells, and the quietest skiing in Lapland.',
    img: '/images/card/city-pyha.webp',
    pageTagline: 'The amethyst fells.',
    intro: 'Two small fells, 35 km apart, sharing a national park. Pyhä has the bigger ski area; Luosto has the amethyst mine you can visit at midnight under the aurora. Neither has clubs. Both have hotel bars worth a fireplace evening — Hotel Pyhätunturi for restaurant-grade dining, Hotel Aurora at Luosto for the aurora-window bar. The quietest "ski destination" in Lapland and proud of it.',
    venues: [
      { name: 'Hotel Pyhätunturi Bar', type: 'Hotel bar', note: 'Restaurant + bar, fireplace, slope-side.' },
      { name: 'Hotel Aurora Luosto', type: 'Aurora-window bar', note: 'Glass-walled bar facing north — wake-up service if aurora is active.' },
      { name: 'Pyhän Asteli', type: 'Restaurant + bar', note: 'Local-favourite restaurant; the only late-evening dining in Pyhä village.' },
    ],
    knowList: [
      'No nightclubs anywhere in Pyhä-Luosto.',
      'Amethyst Mine offers night tours under aurora — book in advance.',
      'Pyhä-Luosto National Park is the silent draw.',
      'Last call is around 01:00 in both villages.',
    ],
    priority: 0.7,
  },
  {
    slug: 'sodankyla',
    name: 'Sodankylä',
    tag: 'Cultural anchor',
    region: 'Central Lapland',
    blurb: 'Midnight Sun Film Festival — they screen films at 03:00 in full daylight.',
    img: '/images/card/city-sodankyla.webp',
    pageTagline: 'Midnight Sun Film Festival.',
    intro: 'Sodankylä is a 9 000-person village on the Kemijoki river — and once a year, in mid-June, it becomes the most surreal cinema festival in the world. The Midnight Sun Film Festival runs four days, screens 80+ films, and the 03:00 screening at the 17th-century wooden church (Vanha kirkko) is the most photographed slot. The town outside the festival has one bar (Hotel Sodankylä) and one shop. Show up for the festival or not at all.',
    venues: [
      { name: 'Hotel Sodankylä Bar', type: 'Hotel bar', note: 'The only "evening" venue. Open till 01:00.' },
      { name: 'Vanha Kirkko (Old Church)', type: 'Festival venue', note: '17th-century wooden church. 03:00 screenings during MSFF only.' },
      { name: 'Lapinland Pub', type: 'Pub', note: 'Local-favourite — quiet most of the year, packed during the festival.' },
    ],
    knowList: [
      'Midnight Sun Film Festival runs mid-June — book accommodation 6 months ahead.',
      'Outside festival week: bar life is quiet, mostly hotel.',
      'The 17th-century wooden church is one of Finland\'s oldest.',
      'Last call 01:00 most of the year; 04:00 during festival.',
    ],
    priority: 0.7,
  },
  {
    slug: 'kittila',
    name: 'Kittilä town',
    tag: 'Small town',
    region: 'Kittilä municipality',
    blurb: 'Where locals actually live (Levi is mostly tourists).',
    img: '/images/card/venue-street-bar.webp',
    pageTagline: 'Where Levi locals actually live.',
    intro: 'Kittilä is the municipal seat — 6 500 residents, the airport, and the people who staff Levi 18 km away. Bar life is locals-only: Bar Skol is the after-shift pub, Aurora is the karaoke option, and that\'s about it. Most tourists drive straight through. If you want a Finnish small-town pub night without the Levi tourist surcharge, this is it.',
    venues: [
      { name: 'Bar Skol', type: 'Local pub', note: 'After-shift drinks for Levi staff. Proper smoke terrace.' },
      { name: 'Aurora Karaoke', type: 'Karaoke', note: 'Open Thu–Sat. Finnish-language regulars.' },
      { name: 'Hotel Kittilä Bar', type: 'Hotel bar', note: 'Quieter — the option for visitors avoiding Levi prices.' },
    ],
    knowList: [
      'Most Levi staff live in Kittilä town and drink here, not on the slopes.',
      'Last call 02:00.',
      'The airport (KTT) is 5 km outside town.',
      'Beer prices are 30–40% cheaper than Levi.',
    ],
    priority: 0.7,
  },
  {
    slug: 'ivalo',
    name: 'Ivalo',
    tag: 'Small town',
    region: 'Inari municipality',
    blurb: 'Hotel Ivalo\'s Club Nord + Hotel Kultahippu pub.',
    img: '/images/card/city-ivalo.webp',
    pageTagline: 'The northernmost airport with a club.',
    intro: 'Ivalo is the northernmost airport in Finland and the gateway to Inari, Saariselkä and the Sámi Homeland. Town itself is 4 000 people. Hotel Ivalo runs Club Nord — the northernmost club in mainland Finland, open Friday and Saturday. Hotel Kultahippu has the only proper pub in the village. Beyond that, hotel bars and one petrol-station kiosk that sells beer.',
    venues: [
      { name: 'Club Nord (Hotel Ivalo)', type: 'Nightclub', note: 'Open Fri–Sat. The northernmost club in mainland Finland.' },
      { name: 'Hotel Kultahippu Pub', type: 'Pub', note: 'Open daily. The local after-work spot.' },
      { name: 'Hotel Ivalo Lobby Bar', type: 'Hotel bar', note: 'Quieter, restaurant-attached.' },
    ],
    knowList: [
      'Northernmost airport on the Finnish mainland.',
      'Saariselkä is 25 minutes away — many Saariselkä visitors drive in for Club Nord.',
      'Last call 02:00 weekdays, 03:00 weekends.',
      'No taxi rank — book through hotel reception.',
    ],
    priority: 0.7,
  },
  {
    slug: 'muonio',
    name: 'Muonio',
    tag: 'Small town',
    region: 'Western Lapland',
    blurb: 'No nightlife. Pallas-Yllästunturi National Park is the draw.',
    img: '/images/card/city-muonio.webp',
    pageTagline: 'The national-park gateway.',
    intro: 'Muonio is 2 300 people and one of the gateways to Pallas-Yllästunturi National Park (1 020 km², second-biggest in Finland). There is no club, no pub crawl, and most evenings end at 22:00. Harriniva Wilderness Hotel runs an evening sauna + lobby-bar combo for husky-safari guests. That\'s the Muonio "scene" honestly.',
    venues: [
      { name: 'Harriniva Wilderness Hotel', type: 'Hotel bar', note: 'Sauna + bar, mostly safari guests.' },
      { name: 'Hotelli Muonion Jeti', type: 'Hotel bar', note: 'Restaurant attached, late-evening only.' },
      { name: 'Pakkahuone', type: 'Local pub', note: 'The one local pub. Closes 23:00.' },
    ],
    knowList: [
      'No nightlife scene — the park is the reason to come.',
      'Last call 23:00 weekdays, 01:00 weekends in summer.',
      'Closest airport: Kittilä (KTT), 80 km.',
      'Aurora-viewing is excellent here precisely because there is no light pollution.',
    ],
    priority: 0.6,
  },
  {
    slug: 'salla',
    name: 'Salla',
    tag: 'Small town',
    region: 'Eastern Lapland',
    blurb: 'In the middle of nowhere. Finland\'s quietest ski resort.',
    img: '/images/card/city-salla.webp',
    pageTagline: 'In the middle of nowhere.',
    intro: '3 300 residents and one ski slope. The town\'s tagline is literally "In the Middle of Nowhere" and they mean it as a compliment. Hotel Revontuli has the only bar that runs late. The ski village has Aurora Bar (open Wed–Sat in season). Outside winter: silence. The 2032 Winter Olympics bid put Salla on the map — but the actual scene didn\'t change. Don\'t come for clubs.',
    venues: [
      { name: 'Hotel Revontuli Bar', type: 'Hotel bar', note: 'The only late-evening venue. Restaurant + bar.' },
      { name: 'Aurora Bar (ski village)', type: 'Slope bar', note: 'Open Wed–Sat in ski season. Closes 01:00.' },
      { name: 'Salla Wilderness Park', type: 'Day venue', note: 'Lunch + day-time café for park visitors.' },
    ],
    knowList: [
      'Closest airport: Kuusamo (KAO), 90 km.',
      'Russian border is 9 km — most of the town speaks Russian as a second language.',
      'Last call 01:00 in season, 23:00 off-season.',
      'The 2032 Winter Olympics bid is real — Salla applied with three other Lapland resorts.',
    ],
    priority: 0.6,
  },
];

export const CITY_BY_SLUG = Object.fromEntries(CITIES.map((c) => [c.slug, c]));
