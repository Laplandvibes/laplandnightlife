/**
 * hero-prompts.mjs — laplandnightlifen kuvapintojen kehotteet.
 *
 * Vesa 2026-09-09: *"kaikki tällä [gemini-3-pro-image], ja viilaa promptia
 * vielä, ja jokainen kuva pitää aidosti jotenkin liittyä aiheeseen."*
 *
 * ── 🔴🔴 MIKSI JOKAISELLA ON OMA KOHTAUS ────────────────────────────────
 *
 * Kehote per TYYPPI tuottaa identtisiä kuvia: GYG-erässä 23/40 oli sama kuva,
 * koska prompti oli kirjoitettu tuotetyypille eikä kohteelle. Siksi `scene`
 * on kirjoitettu jokaiselle pinnalle erikseen **sivuston oman datan pohjalta**
 * — Levin kohtauksessa on Hullu Poron mittakaava, Kemissä lumilinna, Sodankylässä
 * 1600-luvun puukirkko, Sallassa se yksi rinne keskellä ei-mitään. Jos lisäät
 * pinnan, lue ensin mitä `cities.ts` siitä paikasta sanoo.
 *
 * ── RESEPTI (lukittu 2026-09-09, mitattu kolmella koeajolla) ────────────
 *
 * `LOOK` on yhteinen valo- ja rakenneosa, `NEG` yhteinen kielto. Ne ovat samat
 * kaikille, jotta sivusto näyttää yhdeltä sivustolta; `scene` on se joka tekee
 * kuvista eri kuvia.
 *
 * Mitatut ansat jotka resepti kiertää:
 *  🔴 `-r 4K` yksin palautti 2048×2048 neliön ⇒ `--aspect-ratio` on pakko.
 *  🔴 "Five distinct layers of atmospheric haze" piirtyi kirjaimellisesti
 *     valkoisina portaina ⇒ kuvaile vaikutus, älä laske kerroksia.
 *  🔴 Tekstikielto pelkässä promptissa ei tehnyt mitään (kuvaan tuli "ROTUAR")
 *     ⇒ kielto NEG:iin ja korvaaja promptiin ("plain unlettered glass").
 *  🔴 Ensimmäinen gemini-ajo antoi sinisen hetken vaalean taivaan ⇒ LOOK sanoo
 *     nyt eksplisiittisesti "hours after sunset", ja NEG kieltää blue hourin.
 *
 * Malli: `gemini-3-pro-image` 4K = 8 cr/generointi (mitattu `gen-ai pricing`).
 * Ks. [[feedback_kerro_hinta_ennen_toteutusta]] — erää ei aloiteta ilman lupaa.
 */

/** Yhteinen valo, rakenne ja kuvaustapa. Ei adjektiiveja — rakennetta. */
export const LOOK = [
  'Deep winter NIGHT, hours after sunset: the sky is dark indigo overhead with only a faint warm sodium glow bleeding up from below at roof or horizon level.',
  'Extreme tonal separation: the snow directly under a light source is near white, everything beyond falls away to deep cold blue-black.',
  'Fine ice fog hangs in the air so each successive light is dimmer than the last and the far distance disappears entirely.',
  'Wind-packed snow with real texture — footprints, ski tracks, drift ridges — snow banked along every edge, snow on every ledge, no bare ground anywhere.',
  'Photographic, long exposure, documentary. Three depth planes. Not a beauty shot.',
].join(' ');

/** Kesäpinnoille oma valo-osa: keskiyön aurinko ei ole yö. */
export const LOOK_SUMMER = [
  'Midnight in high summer above the Arctic Circle: the sun sits just above the horizon and never sets, so the light is low, raking and golden from one side, with long soft shadows.',
  'Extreme tonal separation: lit surfaces warm and near white, shadows deep and cool.',
  'Haze over the water or the fells so the far distance fades progressively.',
  'Photographic, documentary. Three depth planes. Not a beauty shot.',
].join(' ');


/** 🔴🔴 SISÄTILAN oma valo-osa. Yhteinen `LOOK` vaatii lunta joka reunalle ja
 *  "no bare ground anywhere" — se on oikein ulkokuvissa mutta **työntää lunta
 *  sisätilan lattialle**. Yökerhosta tuli kaksi kertaa peräkkäin puoliavoin
 *  katos jonka lattialla oli nietoksia (mitattu 9.9.2026). Kemin lumilinna
 *  käyttää tarkoituksella tavallista `LOOK`ia, koska se ON lunta. */
export const LOOK_INDOOR = [
  'Interior at night: the only light sources are inside the room itself, and the space is fully enclosed — a ceiling overhead, solid walls on every side, no sky and no outdoors anywhere in the frame.',
  'Extreme tonal separation: surfaces directly under a light are near white, everything beyond falls away into deep shadow.',
  'Haze in the air so the beams are visible and the far end of the room fades.',
  'Dry indoor floor — no snow, no ice, no drifts, nothing weather-related inside.',
  'Photographic, long exposure, documentary. Three depth planes. Not a beauty shot.',
].join(' ');

/** 🔴 Kielto ilman korvaajaa riisuu kuvan tyhjäksi — korvaajat ovat scenessä. */
export const NEG = [
  'blue hour, twilight, dusk, pale sky, bright sky, daylight',
  // 🔴 Mitattu 9.9.2026: pelkka 'sign, text' paasti lapi seinakyltin (Kittila)
  // ja oveen teipatun lapun (Ivalo), molemmissa siansaksaa. Paperi ja kilpi piti
  // nimeta erikseen — malli ei lue niita 'kyltiksi'.
  'signboard, sign, shop sign, hanging sign, name plate, house number plate, lettering, letters, words, text, typography, painted name, menu board, price list, poster, billboard, logo, brand mark',
  'paper notice, printed notice, notice taped to glass, leaflet, flyer, document, newspaper',
  'faces, portrait, looking at camera, distorted hands, extra limbs',
  'snowflake sprites, star filter, sparkles, lens flare stars',
  'camera gear, tripod, staircase, floating structures, stacked bands',
].join(', ');

/**
 * kind: 'hero' = renderöityy täysleveänä (2560 px asti) · 'card' = 300–450 px ruudukossa.
 * out:  kohdetiedosto sivuston public/-puussa.
 */
export const SURFACES = [
  /* ── 14 kaupunkiheroa. Sama tiedosto on sekä kortti etusivulla että
        kaupunkisivun täysleveä hero ⇒ kaikki hero-tasoa. ───────────────── */
  { key: 'city-oulu', kind: 'hero', out: 'images/card/city-oulu.webp',
    scene: 'The Rotuaari pedestrian street in the centre of Oulu, a real northern city of 218 000 people. Two-storey nineteenth-century brick and painted-timber facades on both sides, ground-floor windows of bars and shops glowing warm amber with plain unlettered glass and nothing written anywhere. One tall cast-iron street lamp as the vertical anchor, a row of dimmer lamps receding into the fog behind it. An out-of-focus snow-laden spruce branch across the very bottom edge.' },

  { key: 'city-rovaniemi', kind: 'hero', out: 'images/card/city-rovaniemi.webp',
    scene: 'The Kemijoki river at Rovaniemi on a winter night, seen from the snow-covered bank. The lit bridge with its tall illuminated pylon rises as the single vertical anchor across black open water that steams in the cold; the low town skyline beyond shows scattered warm windows and one arc of green aurora very faint above the roofline. Broken river ice in the foreground.' },

  { key: 'city-levi', kind: 'hero', out: 'images/card/city-levi.webp',
    scene: 'The base of the Levi fell at night in Finland\'s biggest ski resort. A wide floodlit piste comes down out of darkness from the top left; at its foot stands a large timber resort building, every window lit warm, big enough to hold a thousand people. The floodlight mast on the piste is the vertical anchor. Groomer corduroy tracks in the snow, a chairlift cable disappearing up into the fog.' },

  { key: 'city-saariselka', kind: 'hero', out: 'images/card/city-saariselka.webp',
    scene: 'A row of glass-roofed igloos in deep snow outside Saariselkä, seen from outside at night. The curved glass domes glow warm from within against the snow; above them a broad green aurora arc fills the dark sky and is reflected in the glass. A single bare pine trunk at the left as the vertical anchor. Untouched drifted snow between the igloos.' },

  { key: 'city-inari', kind: 'hero', out: 'images/card/city-inari.webp',
    scene: 'A low modern Sámi cultural building of pale timber and glass on the shore of a frozen lake at Inari on a winter night, its long windows glowing warm across the snow. A traditional lavvu tent frame stands beside it as the vertical anchor with a small fire inside throwing orange light on the snow. Aurora faint and green over the far treeline across the ice.' },

  { key: 'city-kemi', kind: 'hero', out: 'images/card/city-kemi.webp',
    scene: 'Inside the Kemi SnowCastle at night: a corridor of carved snow and clear ice blocks lit from within by deep blue and cold white light, the tool marks of the carving still visible in the snow walls. An ice bar counter of thick translucent ice runs along the right with a single glass of clear liquid on it. One carved snow archway as the vertical anchor, the passage receding into cold blue darkness.' },

  { key: 'city-yllas', kind: 'hero', out: 'images/card/city-yllas.webp',
    scene: 'The village of Äkäslompolo at Ylläs on a still winter night, seen from the snow across the frozen lake. Scattered warm house and lodge windows along the far shore under the long low silhouette of the Ylläs fell; heavily snow-laden spruces stand along the near shore, one of them the vertical anchor. Quiet, no crowd, no resort scale — a village.' },

  { key: 'city-ruka', kind: 'hero', out: 'images/card/city-ruka.webp',
    scene: 'The slope base at Ruka on an opening-week night: a floodlit piste runs straight down to a broad timber lodge terrace with outdoor heaters glowing orange and warm light spilling from the windows onto trodden snow. The floodlight mast is the vertical anchor. Skis stacked upright in a snowbank in the foreground, out of focus.' },

  { key: 'city-pyha-luosto', kind: 'hero', out: 'images/card/city-pyha.webp',
    scene: 'A low hotel building of dark timber at the foot of the Pyhä fell, with a wall of tall glass aurora windows facing the sky, warm light inside and a green aurora band overhead reflected across the glass. A single tall snow-crusted spruce as the vertical anchor. Deep untouched snow, no other buildings, the fell shoulder rising black behind.' },

  { key: 'city-sodankyla', kind: 'hero', out: 'images/card/city-sodankyla.webp',
    scene: 'The old wooden church of Sodankylä, a small dark tarred-timber building from the seventeenth century, standing alone in deep snow on the riverbank at night. Warm light in its small windows, its steeple the vertical anchor against a dark indigo sky. Old snow-covered gravestones and a few bare birches around it, the frozen Kemijoki behind.' },

  { key: 'city-kittila', kind: 'hero', out: 'images/card/city-kittila.webp',
    scene: 'The main street of Kittilä village on an ordinary winter night: a short row of low buildings, one hotel with a warmly lit ground-floor bar window, a single street lamp as the vertical anchor and almost no other light. A parked snow-covered car at the kerb. This is a working municipal seat of 6 500 people, not a resort — plain, quiet, dark at the edges.' },

  { key: 'city-ivalo', kind: 'hero', out: 'images/card/city-ivalo.webp',
    scene: 'A hotel entrance in the small town of Ivalo at night, deep snow banked to either side of a shovelled path, a warm lit lobby visible through the glass doors, a single lamp above the door as the vertical anchor. Beyond, darkness and a low aurora glow over flat forest — the northernmost airport town, four thousand people, nothing else lit.' },

  { key: 'city-muonio', kind: 'hero', out: 'images/card/city-muonio.webp',
    scene: 'A wilderness lodge of dark log timber on the shore of a frozen lake near Muonio at night, one warm window and a lantern by the door, smoke rising straight from the chimney in still cold air. A tall snow-laden spruce at the left is the vertical anchor. Absolute darkness beyond, the national park treeline black against a faint aurora.' },

  { key: 'city-salla', kind: 'hero', out: 'images/card/city-salla.webp',
    scene: 'One floodlit ski slope cut into black forest at Salla, seen from below at night, with a single small lodge at its foot showing two warm windows. The floodlight mast is the vertical anchor and its light is the only light for kilometres; the darkness on all sides is total. Deep untracked snow in the foreground.' },

  /* ── etusivun ja osioiden herot ───────────────────────────────────────── */
  { key: 'hero-home-winter', kind: 'hero', out: 'images/hero/aurora-bars-neon.webp',
    scene: 'A Lapland town seen from a snowy rise on a clear winter night: warm bar and restaurant windows in a cluster of low buildings below, and above them a full green aurora curtain filling the upper two thirds of the sky, its hem hanging down over the roofs. One tall bare pine at the right as the vertical anchor. This is the sky the site promises and the bar lights under it.' },

  { key: 'hero-cities', kind: 'hero', out: 'images/hero/cities-rovaniemi-bridge.webp',
    scene: 'A wide view along a frozen Lapland river at night with a lit road bridge crossing it, the town lights of both banks strung out low on either side and a faint aurora over the far end. The bridge pylon is the vertical anchor. This image stands for "fourteen towns" — it must read as a region seen whole, not one venue.' },

  { key: 'pillar-aurora-bars', kind: 'hero', out: 'images/drive/pillarAuroraBars.webp',
    scene: 'The inside of a glass-roofed bar at night looking up and out: a heavy timber bar counter with two glasses on it in the near foreground, and through the whole curved glass roof above, a bright green aurora band across a black sky. Warm low lamplight inside, snow piled on the outside edges of the glass. The roof beam is the vertical anchor.' },

  { key: 'pillar-nightclubs', kind: 'hero', indoor: true, out: 'images/drive/pillarNightclubs.webp',
    /* 🔴 1. yritys antoi avoimen ulkokatoksen, ei yökerhoa — "timber ski-resort
       building" luettiin rakennuksen ULKOPUOLEKSI. Nyt sanotaan eksplisiittisesti
       sisätila, katto, seinät ja ettei ulkoilmaa näy. */
    scene: 'INSIDE a large nightclub, an enclosed interior room with a low dark ceiling and solid walls — no sky, no snow, no outdoors visible anywhere in the frame. A long empty dancefloor of dark boards runs away from the camera; along the left a lit bar counter with backlit bottle shelves; overhead a metal lighting truss with magenta and cyan beams cutting down through heavy haze; one thick timber pillar in the middle distance as the vertical anchor. Coloured light pools reflect on the floor. A few people at the far bar seen only as dark silhouettes from behind, small and out of focus.' },

  { key: 'pillar-events', kind: 'hero', out: 'images/drive/pillarEvents.webp',
    scene: 'An outdoor winter festival stage in a snowfield at night, seen from behind and above the crowd: the stage is a lit rectangle of white and magenta light in the distance, breath and stage haze hanging in the freezing air, a forest of dark spruce silhouetted behind it. A single tall light mast as the vertical anchor. The crowd is a dark mass of shoulders and hoods, no faces.' },

  { key: 'pillar-photography', kind: 'hero', out: 'images/drive/pillarPhotography.webp',
    scene: 'A long-exposure night view over a frozen lake with a full green and faint violet aurora reflected in a patch of open water, a snow-covered shoreline in the foreground and a single dead pine standing as the vertical anchor. Nothing standing in the snow except the tree; no equipment of any kind in the frame. The scene itself is the photograph the page is about.' },

  { key: 'pillar-summer', kind: 'hero', out: 'images/drive/pillarSummer.webp', summer: true,
    scene: 'A lakeside terrace in Lapland at one in the morning under the midnight sun: wooden decking, a long table, empty glasses catching the low gold light, and the sun sitting just above the far treeline across still water. A tall birch at the left as the vertical anchor. Nobody in frame, but the table has clearly just been left.' },

  { key: 'summer-hero', kind: 'hero', out: 'images/drive/summerHero.webp', summer: true,
    scene: 'A midsummer bonfire built on a raft or a point of land at the edge of a Lapland lake, burning at midnight under a sun that has not set: tall orange flames doubled in the mirror-still water, a low golden sky, dark spruce shore on both sides. The column of fire is the vertical anchor. Nobody in frame.' },

  { key: 'hero-home-summer', kind: 'hero', out: 'images/drive/summerJuhannus.webp', summer: true,
    scene: 'A wooden jetty running out into a Lapland lake at midnight in high summer, a sauna with a lit window at its landward end and smoke rising from the chimney, the low gold sun on the far shore. Towels over the rail, the water absolutely still. The sauna chimney is the vertical anchor. Nobody in frame.' },

  { key: 'venue-street-bar', kind: 'hero', out: 'images/card/venue-street-bar.webp',
    scene: 'A single bar on the ground floor of an old timber town building at night in Lapland, seen from across the snowy street: one big warm window with plain unlettered glass, the interior deep and amber, a shovelled path to the door and snow banked either side. The door lamp is the vertical anchor. One lit window in an otherwise dark street.' },
];

export const HERO_COUNT = SURFACES.filter((s) => s.kind === 'hero').length;

export function buildPrompt(s) {
  const look = s.indoor ? LOOK_INDOOR : s.summer ? LOOK_SUMMER : LOOK;
  return `${s.scene} ${look}`;
}
