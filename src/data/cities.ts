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
  /** Meta description of the city page, read by the page (cityMeta in cityI18n.ts) AND by
   *  scripts/generate-prerender-meta.mjs for the prerendered HTML. 70-160 characters (CJK: 100-200 width
   *  units), whole sentences: outside that window the prerenderer would rewrite it and the browser would not.
   *  The build stops if any language is missing or out of the window. */
  metaDescription: string;
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
    { label: 'Population', value: '218 000' },
    { label: 'Closest airport', value: 'OUL · 15 min' },
    { label: 'Last call', value: '01:30 · max 04:00' },
    { label: 'Best season', value: 'Year-round · 2026 ECoC' },
  ],
  rovaniemi: [
    { label: 'Population', value: '64 000' },
    { label: 'Closest airport', value: 'RVN · 10 min' },
    { label: 'Last call', value: '04:00 (Roy Club)' },
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
    { label: 'Last call', value: '03:00 Fri–Sat (Panimo, Nov–Apr)' },
    { label: 'Best season', value: 'Sep–Mar (aurora)' },
  ],
  inari: [
    { label: 'Population', value: '6 800' },
    { label: 'Closest airport', value: 'IVL · 40 min' },
    { label: 'Last call', value: '23:00 (Aanaar)' },
    { label: 'Best season', value: 'Mid-Aug (Ijahis Idja) · Jan (Skábmagovat)' },
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
    { label: 'Last call', value: '04:00 (Karhu, spring)' },
    { label: 'Best season', value: 'Dec–Apr (skiing) · Sep–Mar (aurora)' },
  ],
  sodankyla: [
    { label: 'Population', value: '8 095' },
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
    { label: 'Last call', value: '04:00 Fri (Majan Pubi)' },
    { label: 'Best season', value: 'Dec–Apr (skiing · 2032 Olympics bid)' },
  ],
};

export const CITIES: City[] = [
  {
    slug: 'oulu',
    name: 'Oulu',
    tag: 'Real scene',
    region: 'North Ostrobothnia',
    blurb: 'European Capital of Culture 2026, and the only real year-round club scene in the north.',
    img: '/images/card/city-oulu.webp',
    pageTagline: 'European Capital of Culture 2026.',
    intro: '218 000 people, a student-driven club scene, and the Rotuaari pedestrian strip with most of the city\'s venues inside a short walk. Oulu is the only northern city with weeknights that actually run; the crowd moves between 45 Special, Kaarlenholvi and St Michael until late. 2026 adds the European Capital of Culture programme: 1 500 events including Air Guitar World Championships, Qstock, Elojazz and the Frozen People winter festival.',
    metaDescription: '218 000 people, a student-driven club scene, and the Rotuaari pedestrian strip with most of the city\'s venues inside a short walk.',
    venues: [
      { name: '45 Special', type: 'Nightclub', note: 'The student-favourite club. Open Wed–Sat, late.' },
      { name: 'St Michael', type: 'Irish pub + live', note: 'The Rotuaari anchor: Irish pub with touring acts and tribute nights.' },
      { name: 'Hemingway\'s', type: 'Bar', note: 'Whisky and craft-beer bar on Kirkkokatu: a quieter pint, open late.' },
      { name: 'Kaarlenholvi', type: 'Night bar', note: 'Night bar in Oulu\'s second-oldest stone building; weekend disco runs late, Jumpru Pub downstairs.' },
    ],
    knowList: [
      'Rotuaari is closed to traffic; most of the scene sits inside one short walk.',
      'European Capital of Culture programme runs Jan–Dec 2026: book accommodation early.',
      'Serving ends at 01:30 unless a venue has notified an extension; 04:00 is the latest any venue may serve.',
      'Oulu is the only city this far north with a real Sunday daytime café scene.',
    ],
    priority: 0.9,
  },
  {
    slug: 'rovaniemi',
    name: 'Rovaniemi',
    tag: 'Real scene',
    region: 'Lapland',
    blurb: 'The Arctic capital, split between tourist weekends and locals-only weekdays.',
    img: '/images/card/city-rovaniemi.webp',
    pageTagline: 'The Arctic capital.',
    intro: 'Two speeds inside one city. Weekend tourists queue around Koskikatu: Roy Club has thrown "the city\'s best parties since 1985", and Bull Bar is the loudest sports terrace. Locals spread along the pedestrian street: Cafe & Bar 21 for cocktails, Rovaniemen Oluthuone for beer, Oliver\'s Corner for whisky. Tourist weekends mean queues; weekdays are quiet and local.',
    metaDescription: 'Two speeds inside one city. The Arctic capital, split between tourist weekends and locals-only weekdays.',
    venues: [
      { name: 'Roy Club', type: 'Nightclub', note: 'Parties since 1985, in its own words. Open daily 22–04:30.' },
      { name: 'Bull Bar', type: 'Sports bar', note: 'Loud, packed, Premier League terrace, late food.' },
      { name: 'Cafe & Bar 21', type: 'Cocktail bar', note: 'Local-favourite cocktail bar in the city centre.' },
      { name: 'Rovaniemen Oluthuone', type: 'Beer pub', note: 'Beer restaurant on the pedestrian street: big garden, wide tap list.' },
      { name: 'Oliver\'s Corner', type: 'Pub', note: 'Pedestrian-street pub with an extensive whisky shelf.' },
      { name: 'Kansan Pubi', type: 'Karaoke pub', note: 'Pool tables, games and karaoke in the evenings. As local as it gets.' },
      { name: 'Kauppayhtiö', type: 'Cafe + bar', note: 'Vintage living-room aesthetic; cocktails late.' },
    ],
    knowList: [
      'Koskikatu and the pedestrian street hold most of the scene; everything is walkable.',
      'Roy Club is open daily 22–04:30 and serves until 04:00, the latest the Alcohol Act allows.',
      'No Uber: save the local taxi number 0100 84 84.',
      'Aurora season peaks October–March; check the forecast before committing to a dancefloor night.',
    ],
    priority: 0.9,
  },
  {
    slug: 'levi',
    name: 'Levi',
    tag: 'Ski resort',
    region: 'Kittilä municipality',
    blurb: 'Hullu Poro Areena: 1 700 capacity, 10 bars, 2 floors.',
    img: '/images/card/city-levi.webp',
    pageTagline: 'Finland\'s biggest ski-resort party.',
    intro: 'Hullu Poro Areena is the centrepiece: room for 1 700 across two floors, ten bars and a large dance floor, open on gig nights until 03:30. Around it: Ihku, the legendary après-ski cabin where boots are encouraged on the dancefloor, and Panorama Sky Bar up at Hotel Levi Panorama for the view drink. In mid-November the FIS Alpine World Cup brings a race weekend. February–April means stag groups, ski schools and full-throttle weekends. Off-peak, much of the village winds down early in the week.',
    metaDescription: 'Hullu Poro Areena is the centrepiece: room for 1 700 across two floors, ten bars and a large dance floor.',
    venues: [
      { name: 'Hullu Poro Areena', type: 'Mega-nightclub', note: '1 700 capacity, 10 bars, 2 floors. Open on gig nights until 03:30.' },
      { name: 'Ihku', type: 'Après-ski', note: 'Wooden cabin at the slope base. Ski boots on the dancefloor.' },
      { name: 'Panorama Sky Bar', type: 'View bar', note: 'Bar at Hotel Levi Panorama above the gondola: drinks with the fell view.' },
    ],
    knowList: [
      'Levi quietens outside ski season; check opening days before planning a big night.',
      'The FIS Alpine World Cup is a race weekend in mid-November: book accommodation early.',
      'Hullu Poro Areena opens on gig nights and runs until 03:30.',
      'Ski-boot policy varies by venue; Ihku famously says yes.',
    ],
    priority: 0.9,
  },
  {
    slug: 'saariselka',
    name: 'Saariselkä',
    tag: 'Wilderness premium',
    region: 'Inari municipality',
    blurb: 'Glass igloos, Kakslauttanen\'s Igloo Bar, Local Pub Panimo and the Teerenpesä nightclub.',
    img: '/images/card/city-saariselka.webp',
    pageTagline: 'Wilderness premium: the igloo-bar village.',
    intro: 'Saariselkä is a glass-igloo destination first. Kakslauttanen Arctic Resort\'s Igloo Bar sits inside its Aurora Restaurant in the West Village: a glass igloo where the ceiling is the aurora. In the village itself two places carry the late night: Local Pub Panimo, open until 03:00 on winter weekends, and Teerenpesä, with a restaurant, a pub and a nightclub in one building.',
    metaDescription: 'Kakslauttanen\'s Igloo Bar, Local Pub Panimo and the Teerenpesä nightclub.',
    venues: [
      { name: 'Igloo Bar', type: 'Glass-roof bar', note: 'Glass igloo inside the Aurora Restaurant in Kakslauttanen\'s West Village.' },
      { name: 'Local Pub Panimo', type: 'Local pub', note: 'The village\'s own pub: open until 02:00, and until 03:00 on Fridays and Saturdays, November to April.' },
      { name: 'Hotel Riekonlinna Bar', type: 'Hotel bar', note: 'Big lobby fireplace; evening programme in season.' },
      { name: 'Teerenpesä', type: 'Pub + nightclub', note: 'Restaurant, pub and nightclub in one building in the village centre.' },
    ],
    knowList: [
      'Not all of it is hotel-based: Teerenpesä runs its restaurant, pub and nightclub in its own building.',
      'Igloo Bar is inside Kakslauttanen\'s Aurora Restaurant in the West Village; ask the resort before you go.',
      'The road from the airport (Ivalo) is 25 minutes; book transfers if drinking.',
      'Aurora forecast App is essential; staff will wake guests at 02:00 if it\'s active.',
    ],
    priority: 0.8,
  },
  {
    slug: 'inari',
    name: 'Inari',
    tag: 'Cultural anchor',
    region: 'Inari municipality',
    blurb: 'Sámi cultural capital: Sajos, Siida, Lake Inari and the Pielpajärvi wilderness church.',
    img: '/images/card/city-inari.webp',
    pageTagline: 'The Sámi cultural capital.',
    intro: 'Inari is the cultural seat of the Sámi parliament (Sajos) and home to Siida, the museum that explains everything you didn\'t know about Sápmi. The "nightlife" here is cultural: Skábmagovat indigenous film festival in January, Ijahis Idja Sámi music festival in August, and hotel bars that close by 23:00. Don\'t come for clubs. Come for cold lake water, joik concerts and a sky that goes black at 14:00 in December.',
    metaDescription: 'Inari is the cultural seat of the Sámi parliament (Sajos) and home to Siida, the museum that explains everything you didn\'t know about Sápmi.',
    venues: [
      { name: 'Hotel Inari Bar', type: 'Hotel bar', note: 'Lounge bar at Hotel Inari: open 07–22, from 08 at weekends.' },
      { name: 'Wilderness Hotel Inari', type: 'Hotel bar', note: 'Bar next to Restaurant Ukko: open 09:00–22:30.' },
      { name: 'Aanaar', type: 'Restaurant + bar', note: 'Restaurant at Wilderness Hotel Juutua; its bar is open until 23:00.' },
      { name: 'Café Čaiju', type: 'Daytime', note: 'Café at Sajos, the Sámi cultural centre: open Mon–Fri 09–15.' },
    ],
    knowList: [
      'No clubs. Three hotel bars: Hotel Inari, Wilderness Hotel Inari and Aanaar at Wilderness Hotel Juutua, the last to close at 23:00.',
      'Skábmagovat indigenous film festival runs late January; accommodation books out.',
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
    intro: 'Kemi is the gateway between Helsinki rail and Lapland, and a town with one trick: the SnowCastle Area, building something from snow every winter since 1996. Today that means a winter snow park and the year-round SnowExperience365 indoor snow world with its ice-walled bar; the full castle with chapel and hotel is no longer built. Sampo Icebreaker cruises from December run nightly tours that double as bar venues. The mainland nightlife is small: Hotel Merihovi runs a layered complex (lobby bar, sports terrace, restaurant) and that\'s most of it. Industrial port town that punches above its weight in winter.',
    metaDescription: 'Kemi is the gateway between Helsinki rail and Lapland, and a town with one trick: the SnowCastle Area, building something from snow every winter since 1996.',
    venues: [
      { name: 'SnowCastle Ice Bar', type: 'Ice bar', note: 'Ice bar inside the year-round SnowExperience at about –5 °C: open Mon–Sat 07–17, Sun 08–17.' },
      { name: 'Hotel Merihovi', type: 'Hotel complex', note: 'Lobby bar + sports terrace + restaurant.' },
      { name: 'Sampo Icebreaker', type: 'Onboard bar', note: 'Cruises in season; the bar runs the whole trip.' },
    ],
    knowList: [
      'The snow castle itself is no longer built; the SnowCastle Winter Park runs from January to early April.',
      'Sampo Icebreaker requires booking 2–3 days ahead in peak season.',
      'The SnowExperience ice bar is a daytime stop: it closes at 17:00.',
      'Train from Helsinki: 8h direct.',
    ],
    priority: 0.8,
  },
  {
    slug: 'yllas',
    name: 'Ylläs',
    tag: 'Ski resort',
    region: 'Kolari / Muonio',
    blurb: 'One of Finland\'s biggest ski areas.',
    img: '/images/card/city-yllas.webp',
    pageTagline: 'One of Finland\'s biggest ski areas.',
    intro: 'Ylläs has 62 slopes split between two villages, Äkäslompolo (north) and Ylläsjärvi (south), connected by ski runs but separated by a 20-minute drive. Äkäslompolo has the livelier evening scene and the area\'s night club, Pirtukellari, in the basement of Pirtukirkko at Lapland Hotels Äkäshotelli. No mega-club. Quieter, older, more couples than Levi. Pallas-Yllästunturi National Park is the third-biggest in Finland.',
    metaDescription: 'Ylläs has 62 slopes split between two villages, Äkäslompolo (north) and Ylläsjärvi (south), connected by ski runs but separated by a 20-minute drive.',
    venues: [
      { name: 'Pirtukellari Night Club', type: 'Nightclub', note: 'In the basement of Pirtukirkko at Lapland Hotels Äkäshotelli, Äkäslompolo. No fixed hours published: check with the hotel.' },
      { name: 'Taiga Pub', type: 'Pub', note: 'Changing beer selection and live music on some nights.' },
      { name: 'Ravintola Otso', type: 'Restaurant + bar', note: 'Restaurant in both Äkäslompolo and Ylläsjärvi, open daily 12–22.' },
    ],
    knowList: [
      'Äkäs and Ylläsjärvi are 20 minutes apart by road; plan the taxi in advance.',
      'Last call is around 02:00, earlier than Levi.',
      'One night club: Pirtukellari at Lapland Hotels Äkäshotelli in Äkäslompolo.',
      'National Park covers 1 020 km²; silence is the actual draw.',
    ],
    priority: 0.8,
  },
  {
    slug: 'ruka',
    name: 'Ruka',
    tag: 'Ski resort',
    region: 'Northeast Finland',
    blurb: 'Finland\'s second ski resort by skier-days, just south of the Lapland border.',
    img: '/images/card/city-ruka.webp',
    pageTagline: 'Bear country ski resort.',
    intro: 'Ruka is technically Kuusamo, technically not in Lapland, but skiers don\'t care; it\'s one of the busiest resorts in Finland and the November opening week is the loudest. Zone is the centrepiece après venue at the slope base, with Piste and Colorado Bar carrying the evening on. Off-season the village is very quiet; November–April it runs at full depth.',
    metaDescription: 'Ruka is technically Kuusamo, technically not in Lapland, but skiers don\'t care; it\'s one of the busiest resorts in Finland.',
    venues: [
      { name: 'Restaurant Zone', type: 'Après-ski', note: 'At the slope base: live acts and the FIS opening-week party home.' },
      { name: 'Piste', type: 'Après + bar', note: 'Slope-village bar that runs from after-ski into the night.' },
      { name: 'Colorado Bar', type: 'Bar', note: 'American-style bar in the ski village: sports and late drinks.' },
      { name: 'Hanki Baari', type: 'Bar', note: 'Simple and good: coffee, a proper beer selection and food.' },
      { name: 'Scandic Rukahovi', type: 'Hotel bar', note: 'The big village hotel: live music weekends in peak season.' },
    ],
    knowList: [
      'Ruka opens for FIS Cross-Country World Cup late November; that week is the peak.',
      'Last call is 03:00 in season, earlier off-season.',
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
    intro: 'Two small fells, 35 km apart, sharing a national park. Pyhä has the bigger ski area; Luosto has the amethyst mine and the nightclub: Karhu at Lapland Hotels Luostotunturi, where spring dances to bands and guest artists run until 04:00. In Pyhä the latest bar on the resort\'s own list, SportBar Pyhä, closes at midnight. The quietest "ski destination" in Lapland and proud of it.',
    metaDescription: 'The amethyst fells. Two small fells, 35 km apart, sharing a national park.',
    venues: [
      { name: 'Nightclub Karhu', type: 'Nightclub', note: 'Lapland Hotels Luostotunturi\'s nightclub in Luosto: karaoke and live bands, and in spring dances that run until 04:00.' },
      { name: 'Santa\'s Hotel Aurora', type: 'Hotel bar', note: 'Lobby bar at the Luosto hotel.' },
      { name: 'SportBar Pyhä', type: 'Sports bar', note: 'Pyhä village bar, open daily 17:00–00:00.' },
    ],
    knowList: [
      'One nightclub: Karhu at Lapland Hotels Luostotunturi in Luosto.',
      'Amethyst Mine offers night tours under aurora; book in advance.',
      'Pyhä-Luosto National Park is the silent draw.',
      'Karhu runs until 04:00 on spring dance nights; in Pyhä, SportBar closes at midnight.',
    ],
    priority: 0.7,
  },
  {
    slug: 'sodankyla',
    name: 'Sodankylä',
    tag: 'Cultural anchor',
    region: 'Central Lapland',
    blurb: 'Midnight Sun Film Festival: they screen films at 03:00 in full daylight.',
    img: '/images/card/city-sodankyla.webp',
    pageTagline: 'Midnight Sun Film Festival.',
    intro: 'Sodankylä is a municipality of 8 095 people with its village on the Kitinen river, and once a year, in mid-June, it becomes the most surreal cinema festival in the world. The Midnight Sun Film Festival runs five days of screenings around the clock; nobody sleeps, because the sun doesn\'t set. Outside festival week the scene is a hotel bar and a couple of local pubs. Show up for the festival, or come for the quiet.',
    metaDescription: 'Sodankylä is a village on the Kitinen river, and once a year, in mid-June, it becomes the most surreal cinema festival in the world.',
    venues: [
      { name: 'Hotel Sodankylä Bar', type: 'Hotel bar', note: 'Hotel bar in the centre: open till 01:00.' },
      { name: 'Piitsi Pub', type: 'Pub', note: 'Terrace on the Kitinen riverbank; live performers in summer.' },
      { name: 'Olohuone Tähti', type: 'Café + pub', note: 'Living-room café-bar in the centre: the local hangout.' },
    ],
    knowList: [
      'Midnight Sun Film Festival runs mid-June; book accommodation 6 months ahead.',
      'Outside festival week: bar life is quiet, mostly hotel.',
      'The 17th-century wooden church is one of Finland\'s oldest.',
      'Last call 01:00 most of the year; later during festival week.',
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
    intro: 'Kittilä is the municipal seat: 6 500 residents, the airport, and the people who staff Levi 18 km away. Bar life is small and locals-only: a hotel bar and a couple of village pubs, no tourist programme. Most visitors drive straight through. If you want a quiet Finnish small-town evening without the Levi resort pricing, this is it.',
    metaDescription: 'Kittilä is the municipal seat: 6 500 residents, the airport, and the people who staff Levi 18 km away.',
    venues: [
      { name: 'Hotel Kittilä Bar', type: 'Hotel bar', note: 'The reliable option in town: quieter and cheaper than Levi.' },
    ],
    knowList: [
      'Many Levi workers live in Kittilä town; evenings here are local, not touristy.',
      'Last call 02:00.',
      'The airport (KTT) is 5 km outside town.',
      'Prices are village-level, clearly below Levi resort bars.',
    ],
    priority: 0.7,
  },
  {
    slug: 'ivalo',
    name: 'Ivalo',
    tag: 'Small town',
    region: 'Inari municipality',
    blurb: 'Hotel Ivalo\'s lobby bar + Hotel Kultahippu pub.',
    img: '/images/card/city-ivalo.webp',
    pageTagline: 'The northernmost airport, hotel bars only.',
    intro: 'Ivalo is the northernmost airport in Finland and the gateway to Inari, Saariselkä and the Sámi Homeland. Town itself is 4 000 people. Hotel Ivalo has a lobby bar and the Lapin Yö restaurant. Hotel Kultahippu has the only proper pub in the village. Beyond that, hotel bars and one petrol-station kiosk that sells beer.',
    metaDescription: 'Ivalo is the northernmost airport in Finland and the gateway to Inari, Saariselkä and the Sámi Homeland.',
    venues: [
      { name: 'Hotel Kultahippu Pub', type: 'Pub', note: 'Open daily. The local after-work spot.' },
      { name: 'Hotel Ivalo Lobby Bar', type: 'Hotel bar', note: 'Quieter, restaurant-attached.' },
    ],
    knowList: [
      'Northernmost airport on the Finnish mainland.',
      'Saariselkä is 25 minutes away; many Saariselkä visitors drive in for the hotel bars.',
      'Last call 02:00 weekdays, 03:00 weekends.',
      'No taxi rank: book through hotel reception.',
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
    intro: 'Muonio is 2 300 people and one of the gateways to Pallas-Yllästunturi National Park (1 020 km², third-biggest in Finland). There is no club, no pub crawl, and most evenings end early. Harriniva Wilderness Hotel runs an evening sauna + lobby-bar combo for safari guests, and Jeris Lakeside Resort does the same out by Lake Jerisjärvi. That\'s the Muonio "scene", honestly.',
    metaDescription: 'Muonio is 2 300 people and one of the gateways to Pallas-Yllästunturi National Park (1 020 km², third-biggest in Finland).',
    venues: [
      { name: 'Harriniva Wilderness Hotel', type: 'Hotel bar', note: 'Sauna + bar, mostly safari guests.' },
      { name: 'Jeris Lakeside Resort', type: 'Hotel bar', note: 'Lakeside hotel at Jerisjärvi: restaurant and bar for the evening.' },
    ],
    knowList: [
      'No nightlife scene: the park is the reason to come.',
      'Evenings end early on weekdays; a little later in holiday season.',
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
    intro: '3 300 residents and one ski slope. The town\'s tagline is literally "In the Middle of Nowhere" and they mean it as a compliment. The latest hours belong to Majan Pubi at Ravintola Sallan Maja: Fridays 22–04, Saturdays 22–02 and sometimes until 04. Outside winter: silence. The tongue-in-cheek "Salla 2032" Winter Games campaign put the town on the map, but the actual scene didn\'t change. Don\'t come for clubs.',
    metaDescription: 'In the middle of nowhere. 3 300 residents and one ski slope. Finland\'s quietest ski resort.',
    venues: [
      { name: 'Ravintola Sallan Maja', type: 'Restaurant + pub', note: 'Its Majan Pubi does karaoke and board games: open Fri 22–04 and Sat 22–02 (sometimes until 04), K-18 from 22:00.' },
      { name: 'Salla Wilderness Park', type: 'Day venue', note: 'Lunch + day-time café for park visitors.' },
    ],
    knowList: [
      'Closest airport: Kuusamo (KAO), 90 km.',
      'The Russian border is a few kilometres east. The crossing is closed; the wilderness is the point.',
      'Majan Pubi stays open until 04:00 on Fridays.',
      'The "Salla 2032" Winter Games bid was a tongue-in-cheek climate campaign; it fits the town\'s humour.',
    ],
    priority: 0.6,
  },
];

export const CITY_BY_SLUG = Object.fromEntries(CITIES.map((c) => [c.slug, c]));

/** Venues listed across all 14 city pages — computed from the data so no
 *  surface (home hero meta, nightclubs stat tile, booking stat card) can
 *  ever drift from what the site actually lists. */
export const VENUE_COUNT = CITIES.reduce((n, c) => n + c.venues.length, 0);
