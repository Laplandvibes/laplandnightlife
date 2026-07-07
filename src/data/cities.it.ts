import type { CityOverlay } from './cityI18n';

const overlay: Record<string, CityOverlay> = {
  oulu: {
    region: 'Ostrobotnia Settentrionale',
    blurb: 'Capitale Europea della Cultura 2026 — e l\'unica vera scena clubbing attiva tutto l\'anno nel nord.',
    pageTagline: 'Capitale Europea della Cultura 2026.',
    venues: {
      '45 Special': { type: 'Discoteca', note: 'Il club preferito dagli studenti. Aperto mer–sab, fino a tardi.' },
      'Never Grow Old': { type: 'Musica dal vivo + club', note: 'Programmazione indie / alternativa. Il più piccolo della strip ma con il pubblico più fedele.' },
      'St Michael': { type: 'Live + club', note: 'La sala più grande della strip. DJ in tour e serate tribute.' },
    },
    quickFacts: {
      'Population': { label: 'Popolazione', value: '210.000' },
      'Closest airport': { label: 'Aeroporto più vicino', value: 'OUL · 15 min' },
      'Last call': { label: 'Ultimo giro', value: '03:30' },
      'Best season': { label: 'Stagione migliore', value: 'Tutto l\'anno · ECoC 2026' },
    },
  },
  rovaniemi: {
    region: 'Lapponia',
    blurb: 'La capitale dell\'Artico — divisa tra i weekend turistici e le serate infrasettimanali solo per i locali.',
    pageTagline: 'La capitale dell\'Artico.',
    venues: {
      'Roy Club': { type: 'Discoteca', note: 'Aperto dal 1985. Tre sale — la pista da ballo più grande della città.' },
      'Bull Bar': { type: 'Sports bar', note: 'Chiassoso, pieno, terrazza per la Premier League, cucina fino a tardi.' },
      'Kauppayhtiö': { type: 'Caffè + bar', note: 'Estetica da salotto vintage; cocktail fino a tardi.' },
    },
    quickFacts: {
      'Population': { label: 'Popolazione', value: '64.000' },
      'Closest airport': { label: 'Aeroporto più vicino', value: 'RVN · 10 min' },
      'Last call': { label: 'Ultimo giro', value: '03:00' },
      'Best season': { label: 'Stagione migliore', value: 'set–mar (aurora) · dic (Babbo Natale)' },
    },
  },
  levi: {
    region: 'Comune di Kittilä',
    blurb: 'Hullu Poro Areena: 1.700 posti, 10 bar, 2 piani — la discoteca più grande della Lapponia.',
    pageTagline: 'La festa da stazione sciistica più grande della Finlandia.',
    venues: {
      'Hullu Poro Areena': { type: 'Mega-discoteca', note: '1.700 posti, 10 bar, 2 piani. Sala concerti mer–sab.' },
      'Ihku': { type: 'Après-ski', note: 'Baita in legno ai piedi della pista. Scarponi da sci sulla pista da ballo.' },
    },
    quickFacts: {
      'Beds in resort': { label: 'Posti letto nel resort', value: '24.000' },
      'Closest airport': { label: 'Aeroporto più vicino', value: 'KTT · 18 km' },
      'Last call': { label: 'Ultimo giro', value: '03:30' },
      'Best season': { label: 'Stagione migliore', value: 'nov–apr (neve + Hullu Poro)' },
    },
  },
  saariselka: {
    region: 'Comune di Inari',
    blurb: 'Igloo di vetro, l\'Igloo Bar di Kakslauttanen e un solo vero pub — Local Pub Panimo.',
    pageTagline: 'Wilderness premium — il villaggio dell\'igloo-bar.',
    intro: 'Saariselkä non è una meta da clubbing. È una meta da igloo di vetro — ed è proprio questo il punto. Il Kakslauttanen Arctic Resort ha il bar più fotografato del mondo (un igloo di vetro dove il soffitto è l\'aurora). Il villaggio in sé è una strada principale, due ristoranti in cui vale la pena mangiare e il Local Pub Panimo — un microbirrificio con la selezione artigianale alla spina più affidabile della Lapponia. Dopo il tramonto l\'azione è nei resort, non nel villaggio.',
    venues: {
      'Kakslauttanen Igloo Bar': { type: 'Bar con tetto di vetro', note: 'La foto famosa nel mondo. Aperto ai non ospiti su prenotazione.' },
      'Local Pub Panimo': { type: 'Pub-microbirrificio', note: 'Birre fatte in casa, l\'unico vero pub del villaggio.' },
      'Hotel Riekonlinna Bar': { type: 'Bar d\'hotel', note: 'Grande camino nella hall, DJ locale il venerdì sera.' },
    },
    knowList: [
      'Nessun club indipendente — la vita notturna ruota attorno agli hotel.',
      'L\'Igloo Bar richiede la prenotazione se non si alloggia al Kakslauttanen.',
      'La strada dall\'aeroporto (Ivalo) è di 25 minuti; prenota i transfer se bevi.',
      'L\'app delle previsioni dell\'aurora è indispensabile — lo staff sveglia gli ospiti alle 02:00 se è attiva.',
    ],
    quickFacts: {
      'Beds in village': { label: 'Posti letto nel villaggio', value: '7.500' },
      'Closest airport': { label: 'Aeroporto più vicino', value: 'IVL · 25 min' },
      'Last call': { label: 'Ultimo giro', value: '01:30 (hotel)' },
      'Best season': { label: 'Stagione migliore', value: 'set–mar (aurora)' },
    },
  },
  inari: {
    region: 'Comune di Inari',
    blurb: 'Capitale culturale Sámi — Sajos, Siida, il lago Inari e la chiesa selvaggia di Pielpajärvi.',
    pageTagline: 'La capitale culturale Sámi.',
    intro: 'Inari è la sede culturale del parlamento Sámi (Sajos) e ospita il Siida — il museo che ti spiega tutto ciò che non sapevi sulla Sápmi. Qui la "vita notturna" è culturale: il festival di cinema indigeno Skábmagovat a gennaio, il festival di musica Sámi Ijahis Idja ad agosto e una manciata di bar che servono soprattutto cene. Non venire per i club. Vieni per l\'acqua gelida del lago, i concerti di joik e un cielo che a dicembre diventa nero alle 14:00.',
    venues: {
      'Hotel Inari Bar': { type: 'Bar d\'hotel', note: 'Ristorante e bar con vista sul lago, aperto fino all\'01:00.' },
      'Sajos Café': { type: 'Diurno', note: 'Caffè del parlamento Sámi — caffè ed eventi culturali.' },
      'Tradiska': { type: 'Ristorante + bar', note: 'Cucina Sámi, piccolo bar, atmosfera intima.' },
    },
    knowList: [
      'Niente club. Due hotel con bar, tre ristoranti che servono alcolici.',
      'Il festival di cinema indigeno Skábmagovat si tiene a fine gennaio — gli alloggi vanno esauriti.',
      'Festival Ijahis Idja a metà agosto: la cosa più simile a una "scena" che Inari abbia.',
      'Sajos e Siida sono tappe culturali obbligate prima di bere ovunque.',
    ],
    quickFacts: {
      'Population': { label: 'Popolazione', value: '6.800' },
      'Closest airport': { label: 'Aeroporto più vicino', value: 'IVL · 40 min' },
      'Last call': { label: 'Ultimo giro', value: '01:00' },
      'Best season': { label: 'Stagione migliore', value: 'fine ago (Ijahis Idja) · gen (Skábmagovat)' },
    },
  },
  kemi: {
    region: 'Lapponia del Mare',
    blurb: 'SnowCastle, il rompighiaccio Sampo e il complesso di ristoranti su più livelli dell\'Hotel Merihovi.',
    pageTagline: 'SnowCastle, rompighiaccio, Lapponia del mare.',
    intro: 'Kemi è la porta tra la ferrovia di Helsinki e la Lapponia — e una cittadina con un asso nella manica: lo SnowCastle, ricostruito ogni inverno dal 1996, con cappella, hotel e un bar dalle pareti di ghiaccio. Le crociere del rompighiaccio Sampo da dicembre offrono tour serali che fanno anche da bar. La vita notturna sulla terraferma è piccola: l\'Hotel Merihovi gestisce un complesso a più livelli (lobby bar, terrazza sportiva, ristorante) ed è praticamente tutto. Cittadina portuale industriale che in inverno conta più del previsto.',
    venues: {
      'SnowCastle Ice Bar': { type: 'Ice bar', note: 'Aperto gen–apr. Shot di vodka in bicchieri di ghiaccio, pareti a –5°C.' },
      'Hotel Merihovi': { type: 'Complesso alberghiero', note: 'Lobby bar + terrazza sportiva + ristorante.' },
      'Sampo Icebreaker': { type: 'Bar a bordo', note: 'Crociere alle 12:00 e alle 18:00 in stagione; il bar è aperto per tutto il viaggio.' },
    },
    knowList: [
      'Da gennaio ad aprile quasi tutta l\'azione è allo SnowCastle.',
      'Il rompighiaccio Sampo va prenotato con 2–3 giorni di anticipo in alta stagione.',
      'Ultimo giro alle 02:00 in città; il bar dello SnowCastle chiude prima (di solito a mezzanotte).',
      'Treno da Helsinki: 8 ore diretto.',
    ],
    quickFacts: {
      'Population': { label: 'Popolazione', value: '20.800' },
      'Closest airport': { label: 'Aeroporto più vicino', value: 'KEM · 5 min · o treno da Helsinki' },
      'Last call': { label: 'Ultimo giro', value: '02:00' },
      'Best season': { label: 'Stagione migliore', value: 'gen–apr (SnowCastle + rompighiaccio)' },
    },
  },
  yllas: {
    region: 'Kolari / Muonio',
    blurb: 'La seconda area sciistica più grande della Finlandia.',
    pageTagline: 'La seconda area sciistica più grande della Finlandia.',
    venues: {
      'Sport Resort Ylläs': { type: 'Bar d\'hotel', note: 'Il bar après più affollato di Äkäslompolo.' },
    },
    quickFacts: {
      'Beds in resort': { label: 'Posti letto nel resort', value: '23.000' },
      'Closest airport': { label: 'Aeroporto più vicino', value: 'KTT · 50 min' },
      'Last call': { label: 'Ultimo giro', value: '02:00' },
      'Best season': { label: 'Stagione migliore', value: 'nov–apr (sci) · mar (giornate più lunghe)' },
    },
  },
  ruka: {
    region: 'Finlandia Nord-Orientale',
    blurb: 'La seconda stazione sciistica della Finlandia per giornate-sciatore.',
    pageTagline: 'Stazione sciistica nella terra degli orsi.',
    venues: {
      'Zone Bar': { type: 'Après-ski', note: 'Ai piedi della pista — la casa della festa d\'apertura della Coppa del Mondo FIS.' },
    },
    quickFacts: {
      'Beds in resort': { label: 'Posti letto nel resort', value: '15.000' },
      'Closest airport': { label: 'Aeroporto più vicino', value: 'KAO · 30 min' },
      'Last call': { label: 'Ultimo giro', value: '03:00 (in stagione)' },
      'Best season': { label: 'Stagione migliore', value: 'fine nov (apertura FIS) · dic–apr' },
    },
  },
  'pyha-luosto': {
    region: 'Pelkosenniemi / Sodankylä',
    blurb: 'Ametista, fells e lo sci più tranquillo della Lapponia.',
    pageTagline: 'I fells dell\'ametista.',
    intro: 'Due piccoli fells, a 35 km l\'uno dall\'altro, che condividono un parco nazionale. Pyhä ha l\'area sciistica più grande; Luosto ha la miniera di ametista che si può visitare a mezzanotte sotto l\'aurora. Nessuno dei due ha club. Entrambi hanno bar d\'hotel che valgono una serata davanti al camino — l\'Hotel Pyhätunturi per una cucina da ristorante, l\'Hotel Aurora a Luosto per il bar con vetrata sull\'aurora. La "meta sciistica" più tranquilla della Lapponia, e ne va fiera.',
    venues: {
      'Hotel Pyhätunturi Bar': { type: 'Bar d\'hotel', note: 'Ristorante e bar, camino, ai piedi della pista.' },
      'Hotel Aurora Luosto': { type: 'Bar con vetrata sull\'aurora', note: 'Bar con pareti di vetro rivolte a nord — servizio sveglia se l\'aurora è attiva.' },
      'Pyhän Asteli': { type: 'Ristorante + bar', note: 'Ristorante amato dai locali; l\'unica cena a tarda sera nel villaggio di Pyhä.' },
    },
    knowList: [
      'Nessuna discoteca in tutta Pyhä-Luosto.',
      'La miniera di ametista propone tour notturni sotto l\'aurora — prenota in anticipo.',
      'Il parco nazionale di Pyhä-Luosto è l\'attrazione silenziosa.',
      'Ultimo giro intorno all\'01:00 in entrambi i villaggi.',
    ],
    quickFacts: {
      'Beds in two villages': { label: 'Posti letto nei due villaggi', value: '5.000' },
      'Closest airport': { label: 'Aeroporto più vicino', value: 'RVN · 1h30 · o KTT · 2h30' },
      'Last call': { label: 'Ultimo giro', value: '01:00' },
      'Best season': { label: 'Stagione migliore', value: 'dic–apr (sci) · set–mar (aurora)' },
    },
  },
  sodankyla: {
    region: 'Lapponia Centrale',
    blurb: 'Midnight Sun Film Festival — proiettano film alle 03:00 in pieno giorno.',
    pageTagline: 'Midnight Sun Film Festival.',
    venues: {
    },
    quickFacts: {
      'Population': { label: 'Popolazione', value: '8.600' },
      'Closest airport': { label: 'Aeroporto più vicino', value: 'RVN · 1h45' },
      'Last call': { label: 'Ultimo giro', value: '01:00 / 04:00 durante il festival' },
      'Best season': { label: 'Stagione migliore', value: 'metà giu (Midnight Sun Film Festival)' },
    },
  },
  kittila: {
    region: 'Comune di Kittilä',
    blurb: 'Dove vivono davvero i locali (Levi è soprattutto turisti).',
    pageTagline: 'Dove vivono davvero i locali di Levi.',
    venues: {
    },
    quickFacts: {
      'Population': { label: 'Popolazione', value: '6.500' },
      'Closest airport': { label: 'Aeroporto più vicino', value: 'KTT · 5 min' },
      'Last call': { label: 'Ultimo giro', value: '02:00' },
      'Best season': { label: 'Stagione migliore', value: 'Tutto l\'anno (scena dello staff di Levi)' },
    },
  },
  ivalo: {
    region: 'Comune di Inari',
    blurb: 'Il Club Nord dell\'Hotel Ivalo + il pub dell\'Hotel Kultahippu.',
    pageTagline: 'L\'aeroporto più a nord con un club.',
    intro: 'Ivalo è l\'aeroporto più a nord della Finlandia e la porta d\'accesso a Inari, Saariselkä e alla Terra dei Sámi. La cittadina conta 4.000 persone. L\'Hotel Ivalo gestisce il Club Nord — il club più a nord della Finlandia continentale, aperto venerdì e sabato. L\'Hotel Kultahippu ha l\'unico vero pub del villaggio. Oltre a questo, bar d\'hotel e un chiosco di una stazione di servizio che vende birra.',
    venues: {
      'Club Nord (Hotel Ivalo)': { type: 'Discoteca', note: 'Aperto ven–sab. Il club più a nord della Finlandia continentale.' },
      'Hotel Kultahippu Pub': { type: 'Pub', note: 'Aperto tutti i giorni. Il punto di ritrovo locale del dopo-lavoro.' },
      'Hotel Ivalo Lobby Bar': { type: 'Bar d\'hotel', note: 'Più tranquillo, annesso al ristorante.' },
    },
    knowList: [
      'L\'aeroporto più a nord della Finlandia continentale.',
      'Saariselkä è a 25 minuti — molti visitatori di Saariselkä vengono qui per il Club Nord.',
      'Ultimo giro alle 02:00 nei giorni feriali, alle 03:00 nei weekend.',
      'Niente posteggio dei taxi — prenota tramite la reception dell\'hotel.',
    ],
    quickFacts: {
      'Population': { label: 'Popolazione', value: '4.000' },
      'Closest airport': { label: 'Aeroporto più vicino', value: 'IVL · 5 min' },
      'Last call': { label: 'Ultimo giro', value: '02:00 / 03:00 nei weekend' },
      'Best season': { label: 'Stagione migliore', value: 'set–mar (aurora) · ago (festival)' },
    },
  },
  muonio: {
    region: 'Lapponia Occidentale',
    blurb: 'Niente vita notturna. L\'attrazione è il parco nazionale di Pallas-Yllästunturi.',
    pageTagline: 'La porta del parco nazionale.',
    venues: {
      'Harriniva Wilderness Hotel': { type: 'Bar d\'hotel', note: 'Sauna e bar, soprattutto ospiti dei safari.' },
    },
    quickFacts: {
      'Population': { label: 'Popolazione', value: '2.300' },
      'Closest airport': { label: 'Aeroporto più vicino', value: 'KTT · 1h15' },
      'Last call': { label: 'Ultimo giro', value: '23:00 / 01:00 nei weekend' },
      'Best season': { label: 'Stagione migliore', value: 'set–mar (aurora · basso inquinamento luminoso)' },
    },
  },
  salla: {
    region: 'Lapponia Orientale',
    blurb: 'In mezzo al nulla. La stazione sciistica più tranquilla della Finlandia.',
    pageTagline: 'In mezzo al nulla.',
    venues: {
      'Hotel Revontuli Bar': { type: 'Bar d\'hotel', note: 'L\'unico locale a tarda sera. Ristorante e bar.' },
      'Salla Wilderness Park': { type: 'Locale diurno', note: 'Pranzo e caffè diurno per i visitatori del parco.' },
    },
    quickFacts: {
      'Population': { label: 'Popolazione', value: '3.300' },
      'Closest airport': { label: 'Aeroporto più vicino', value: 'KAO · 1h30' },
      'Last call': { label: 'Ultimo giro', value: '23:00 / 01:00 in stagione' },
      'Best season': { label: 'Stagione migliore', value: 'dic–apr (sci · candidatura Olimpiadi 2032)' },
    },
  },
};

export default overlay;
