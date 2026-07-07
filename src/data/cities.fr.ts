import type { CityOverlay } from './cityI18n';

const overlay: Record<string, CityOverlay> = {
  oulu: {
    region: 'Ostrobotnie du Nord',
    blurb: 'Capitale européenne de la culture 2026 — et la seule vraie scène club ouverte toute l\'année dans le Nord.',
    pageTagline: 'Capitale européenne de la culture 2026.',
    venues: {
      '45 Special': { type: 'Boîte de nuit', note: 'Le club préféré des étudiants. Ouvert du mercredi au samedi, jusque tard.' },
      'Never Grow Old': { type: 'Concerts + club', note: 'Programmation indie / alternative. La plus petite salle de la rue, mais le public le plus fidèle.' },
      'St Michael': { type: 'Concerts + club', note: 'La plus grande salle de la rue. DJ en tournée et soirées tribute.' },
    },
    quickFacts: {
      'Population': { label: 'Population', value: '210 000' },
      'Closest airport': { label: 'Aéroport le plus proche', value: 'OUL · 15 min' },
      'Last call': { label: 'Dernier service', value: '03:30' },
      'Best season': { label: 'Meilleure saison', value: 'Toute l\'année · CEC 2026' },
    },
  },
  rovaniemi: {
    region: 'Laponie',
    blurb: 'La capitale arctique — partagée entre week-ends touristiques et soirées de semaine réservées aux locaux.',
    pageTagline: 'La capitale arctique.',
    venues: {
      'Roy Club': { type: 'Boîte de nuit', note: 'Ouvert depuis 1985. Trois salles — la plus grande piste de danse de la ville.' },
      'Bull Bar': { type: 'Bar sportif', note: 'Bruyant, bondé, terrasse Premier League, cuisine tardive.' },
      'Kauppayhtiö': { type: 'Café + bar', note: 'Esthétique salon vintage ; cocktails jusque tard.' },
    },
    quickFacts: {
      'Population': { label: 'Population', value: '64 000' },
      'Closest airport': { label: 'Aéroport le plus proche', value: 'RVN · 10 min' },
      'Last call': { label: 'Dernier service', value: '03:00' },
      'Best season': { label: 'Meilleure saison', value: 'Sep–Mar (aurores) · Déc (Père Noël)' },
    },
  },
  levi: {
    region: 'Commune de Kittilä',
    blurb: 'Hullu Poro Areena : 1 700 places, 10 bars, 2 étages — la plus grande boîte de nuit de Laponie.',
    pageTagline: 'La plus grosse fête de station de ski de Finlande.',
    venues: {
      'Hullu Poro Areena': { type: 'Méga-boîte de nuit', note: '1 700 places, 10 bars, 2 étages. Salle de concert du mercredi au samedi.' },
      'Ihku': { type: 'Après-ski', note: 'Cabane en bois au pied des pistes. Chaussures de ski sur la piste de danse.' },
    },
    quickFacts: {
      'Beds in resort': { label: 'Lits dans la station', value: '24 000' },
      'Closest airport': { label: 'Aéroport le plus proche', value: 'KTT · 18 km' },
      'Last call': { label: 'Dernier service', value: '03:30' },
      'Best season': { label: 'Meilleure saison', value: 'Nov–Avr (neige + Hullu Poro)' },
    },
  },
  saariselka: {
    region: 'Commune d\'Inari',
    blurb: 'Igloos de verre, l\'Igloo Bar de Kakslauttanen et un seul vrai pub — le Local Pub Panimo.',
    pageTagline: 'Le luxe sauvage — le village des bars-igloos.',
    intro: 'Saariselkä n\'est pas une destination club. C\'est une destination igloos de verre — et c\'est tout l\'intérêt. Le Kakslauttanen Arctic Resort abrite le bar le plus photographié au monde (un igloo de verre dont le plafond, c\'est l\'aurore boréale). Le village lui-même, c\'est une rue principale, deux restaurants qui valent le détour et le Local Pub Panimo — une microbrasserie avec la carte de bières artisanales à la pression la plus fiable de Laponie. À la nuit tombée, l\'action se passe dans les resorts, pas dans le village.',
    venues: {
      'Kakslauttanen Igloo Bar': { type: 'Bar à toit de verre', note: 'La photo de renommée mondiale. Ouvert aux non-résidents sur réservation.' },
      'Local Pub Panimo': { type: 'Pub-microbrasserie', note: 'Bières maison, le seul vrai pub du village.' },
      'Hotel Riekonlinna Bar': { type: 'Bar d\'hôtel', note: 'Grande cheminée dans le hall, DJ local le vendredi soir.' },
    },
    knowList: [
      'Pas de club indépendant — la vie nocturne se passe dans les hôtels.',
      'L\'Igloo Bar exige une réservation si vous ne logez pas au Kakslauttanen.',
      'La route depuis l\'aéroport (Ivalo) prend 25 minutes ; réservez un transfert si vous buvez.',
      'L\'appli de prévision des aurores est indispensable — le personnel réveille les clients à 02:00 si elles sont actives.',
    ],
    quickFacts: {
      'Beds in village': { label: 'Lits dans le village', value: '7 500' },
      'Closest airport': { label: 'Aéroport le plus proche', value: 'IVL · 25 min' },
      'Last call': { label: 'Dernier service', value: '01:30 (hôtels)' },
      'Best season': { label: 'Meilleure saison', value: 'Sep–Mar (aurores)' },
    },
  },
  inari: {
    region: 'Commune d\'Inari',
    blurb: 'Capitale culturelle sámi — Sajos, Siida, le lac Inari et l\'église sauvage de Pielpajärvi.',
    pageTagline: 'La capitale culturelle sámi.',
    intro: 'Inari est le siège culturel du parlement sámi (Sajos) et abrite Siida — le musée qui explique tout ce que vous ignoriez du Sápmi. Ici, la « vie nocturne » est culturelle : le festival de cinéma autochtone Skábmagovat en janvier, le festival de musique sámi Ijahis Idja en août, et une poignée de bars qui servent surtout des dîners. Ne venez pas pour les clubs. Venez pour l\'eau froide du lac, les concerts de joik et un ciel qui vire au noir dès 14:00 en décembre.',
    venues: {
      'Hotel Inari Bar': { type: 'Bar d\'hôtel', note: 'Restaurant + bar avec vue sur le lac, ouvert jusqu\'à 01:00.' },
      'Sajos Café': { type: 'En journée', note: 'Café du parlement sámi — café + événements culturels.' },
      'Tradiska': { type: 'Restaurant + bar', note: 'Cuisine sámi, petit bar, ambiance intime.' },
    },
    knowList: [
      'Aucun club. Deux hôtels avec bar, trois restaurants servant de l\'alcool.',
      'Le festival de cinéma autochtone Skábmagovat se tient fin janvier — l\'hébergement affiche complet.',
      'Le festival Ijahis Idja, mi-août : ce qui ressemble le plus à une « scène » à Inari.',
      'Sajos et Siida sont des visites culturelles incontournables avant de boire un verre où que ce soit.',
    ],
    quickFacts: {
      'Population': { label: 'Population', value: '6 800' },
      'Closest airport': { label: 'Aéroport le plus proche', value: 'IVL · 40 min' },
      'Last call': { label: 'Dernier service', value: '01:00' },
      'Best season': { label: 'Meilleure saison', value: 'Fin août (Ijahis Idja) · Jan (Skábmagovat)' },
    },
  },
  kemi: {
    region: 'Laponie maritime',
    blurb: 'Le SnowCastle, le brise-glace Sampo et le complexe de restaurants empilés de l\'Hotel Merihovi.',
    pageTagline: 'SnowCastle, brise-glace, Laponie maritime.',
    intro: 'Kemi est la porte d\'entrée entre le rail d\'Helsinki et la Laponie — une ville avec un seul tour de magie : le SnowCastle, reconstruit chaque hiver depuis 1996, avec sa chapelle, son hôtel et un bar aux murs de glace. Les croisières du brise-glace Sampo, à partir de décembre, proposent des sorties nocturnes qui font aussi office de bars. La vie nocturne sur le continent est modeste : l\'Hotel Merihovi gère un complexe à plusieurs niveaux (bar du hall, terrasse sport, restaurant) et c\'est à peu près tout. Une ville portuaire industrielle qui joue au-dessus de sa catégorie en hiver.',
    venues: {
      'SnowCastle Ice Bar': { type: 'Bar de glace', note: 'Ouvert de jan à avr. Shots de vodka dans des verres de glace, murs à –5 °C.' },
      'Hotel Merihovi': { type: 'Complexe hôtelier', note: 'Bar du hall + terrasse sport + restaurant.' },
      'Sampo Icebreaker': { type: 'Bar à bord', note: 'Croisières à 12:00 et 18:00 en saison ; le bar tourne pendant toute la sortie.' },
    },
    knowList: [
      'L\'essentiel de l\'action se passe au SnowCastle, de janvier à avril.',
      'Le brise-glace Sampo demande une réservation 2 à 3 jours à l\'avance en haute saison.',
      'Dernier service à 02:00 en ville ; le bar du SnowCastle ferme plus tôt (24:00 en général).',
      'Train depuis Helsinki : 8 h en direct.',
    ],
    quickFacts: {
      'Population': { label: 'Population', value: '20 800' },
      'Closest airport': { label: 'Aéroport le plus proche', value: 'KEM · 5 min · ou train depuis Helsinki' },
      'Last call': { label: 'Dernier service', value: '02:00' },
      'Best season': { label: 'Meilleure saison', value: 'Jan–Avr (SnowCastle + brise-glace)' },
    },
  },
  yllas: {
    region: 'Kolari / Muonio',
    blurb: 'Le deuxième plus grand domaine skiable de Finlande.',
    pageTagline: 'Le deuxième plus grand domaine skiable de Finlande.',
    venues: {
      'Sport Resort Ylläs': { type: 'Bar d\'hôtel', note: 'Le bar d\'après-ski le plus fréquenté d\'Äkäslompolo.' },
    },
    quickFacts: {
      'Beds in resort': { label: 'Lits dans la station', value: '23 000' },
      'Closest airport': { label: 'Aéroport le plus proche', value: 'KTT · 50 min' },
      'Last call': { label: 'Dernier service', value: '02:00' },
      'Best season': { label: 'Meilleure saison', value: 'Nov–Avr (ski) · Mar (journées plus longues)' },
    },
  },
  ruka: {
    region: 'Nord-Est de la Finlande',
    blurb: 'La deuxième station de ski de Finlande en journées-skieur.',
    pageTagline: 'La station de ski au pays de l\'ours.',
    venues: {
      'Zone Bar': { type: 'Après-ski', note: 'Au pied des pistes — le QG de la fête d\'ouverture de la Coupe du monde FIS.' },
    },
    quickFacts: {
      'Beds in resort': { label: 'Lits dans la station', value: '15 000' },
      'Closest airport': { label: 'Aéroport le plus proche', value: 'KAO · 30 min' },
      'Last call': { label: 'Dernier service', value: '03:00 (en saison)' },
      'Best season': { label: 'Meilleure saison', value: 'Fin nov (ouverture FIS) · Déc–Avr' },
    },
  },
  'pyha-luosto': {
    region: 'Pelkosenniemi / Sodankylä',
    blurb: 'Améthyste, fells et le ski le plus tranquille de Laponie.',
    pageTagline: 'Les fells d\'améthyste.',
    intro: 'Deux petits fells, à 35 km l\'un de l\'autre, partageant un parc national. Pyhä a le plus grand domaine skiable ; Luosto a la mine d\'améthyste que l\'on peut visiter à minuit sous l\'aurore boréale. Ni l\'un ni l\'autre n\'a de club. Tous deux ont des bars d\'hôtel qui valent une soirée près du feu — l\'Hotel Pyhätunturi pour une table de qualité restaurant, l\'Hotel Aurora à Luosto pour son bar aux baies vitrées tournées vers l\'aurore. La « destination ski » la plus tranquille de Laponie, et elle en est fière.',
    venues: {
      'Hotel Pyhätunturi Bar': { type: 'Bar d\'hôtel', note: 'Restaurant + bar, cheminée, au pied des pistes.' },
      'Hotel Aurora Luosto': { type: 'Bar à baies vitrées sur l\'aurore', note: 'Bar aux parois de verre orienté nord — réveil par le personnel si l\'aurore est active.' },
      'Pyhän Asteli': { type: 'Restaurant + bar', note: 'Restaurant préféré des locaux ; la seule table tardive du village de Pyhä.' },
    },
    knowList: [
      'Aucune boîte de nuit nulle part à Pyhä-Luosto.',
      'La mine d\'améthyste propose des visites de nuit sous l\'aurore — à réserver à l\'avance.',
      'Le parc national de Pyhä-Luosto est l\'attrait silencieux.',
      'Dernier service autour de 01:00 dans les deux villages.',
    ],
    quickFacts: {
      'Beds in two villages': { label: 'Lits dans les deux villages', value: '5 000' },
      'Closest airport': { label: 'Aéroport le plus proche', value: 'RVN · 1h30 · ou KTT · 2h30' },
      'Last call': { label: 'Dernier service', value: '01:00' },
      'Best season': { label: 'Meilleure saison', value: 'Déc–Avr (ski) · Sep–Mar (aurores)' },
    },
  },
  sodankyla: {
    region: 'Laponie centrale',
    blurb: 'Le Midnight Sun Film Festival — on y projette des films à 03:00 en plein jour.',
    pageTagline: 'Midnight Sun Film Festival.',
    venues: {
    },
    quickFacts: {
      'Population': { label: 'Population', value: '8 600' },
      'Closest airport': { label: 'Aéroport le plus proche', value: 'RVN · 1h45' },
      'Last call': { label: 'Dernier service', value: '01:00 / 04:00 pendant le festival' },
      'Best season': { label: 'Meilleure saison', value: 'Mi-juin (Midnight Sun Film Festival)' },
    },
  },
  kittila: {
    region: 'Commune de Kittilä',
    blurb: 'Là où vivent vraiment les locaux (Levi, c\'est surtout des touristes).',
    pageTagline: 'Là où vivent vraiment les locaux de Levi.',
    venues: {
    },
    quickFacts: {
      'Population': { label: 'Population', value: '6 500' },
      'Closest airport': { label: 'Aéroport le plus proche', value: 'KTT · 5 min' },
      'Last call': { label: 'Dernier service', value: '02:00' },
      'Best season': { label: 'Meilleure saison', value: 'Toute l\'année (scène du personnel de Levi)' },
    },
  },
  ivalo: {
    region: 'Commune d\'Inari',
    blurb: 'Le Club Nord de l\'Hotel Ivalo + le pub de l\'Hotel Kultahippu.',
    pageTagline: 'L\'aéroport le plus au nord à avoir un club.',
    intro: 'Ivalo est l\'aéroport le plus au nord de Finlande et la porte d\'entrée vers Inari, Saariselkä et le Pays sámi. La ville elle-même compte 4 000 habitants. L\'Hotel Ivalo gère le Club Nord — le club le plus septentrional de la Finlande continentale, ouvert le vendredi et le samedi. L\'Hotel Kultahippu a le seul vrai pub du village. Au-delà, ce sont des bars d\'hôtel et un kiosque de station-service qui vend de la bière.',
    venues: {
      'Club Nord (Hotel Ivalo)': { type: 'Boîte de nuit', note: 'Ouvert ven–sam. Le club le plus septentrional de la Finlande continentale.' },
      'Hotel Kultahippu Pub': { type: 'Pub', note: 'Ouvert tous les jours. Le repaire local d\'après le travail.' },
      'Hotel Ivalo Lobby Bar': { type: 'Bar d\'hôtel', note: 'Plus tranquille, attenant au restaurant.' },
    },
    knowList: [
      'L\'aéroport le plus septentrional de la Finlande continentale.',
      'Saariselkä est à 25 minutes — beaucoup de visiteurs de Saariselkä viennent en voiture pour le Club Nord.',
      'Dernier service à 02:00 en semaine, 03:00 le week-end.',
      'Pas de station de taxis — réservez via la réception de l\'hôtel.',
    ],
    quickFacts: {
      'Population': { label: 'Population', value: '4 000' },
      'Closest airport': { label: 'Aéroport le plus proche', value: 'IVL · 5 min' },
      'Last call': { label: 'Dernier service', value: '02:00 / 03:00 le week-end' },
      'Best season': { label: 'Meilleure saison', value: 'Sep–Mar (aurores) · Août (festivals)' },
    },
  },
  muonio: {
    region: 'Laponie occidentale',
    blurb: 'Pas de vie nocturne. C\'est le parc national de Pallas-Yllästunturi qui attire.',
    pageTagline: 'La porte d\'entrée du parc national.',
    venues: {
      'Harriniva Wilderness Hotel': { type: 'Bar d\'hôtel', note: 'Sauna + bar, surtout des clients de safari.' },
    },
    quickFacts: {
      'Population': { label: 'Population', value: '2 300' },
      'Closest airport': { label: 'Aéroport le plus proche', value: 'KTT · 1h15' },
      'Last call': { label: 'Dernier service', value: '23:00 / 01:00 le week-end' },
      'Best season': { label: 'Meilleure saison', value: 'Sep–Mar (aurores · faible pollution lumineuse)' },
    },
  },
  salla: {
    region: 'Laponie orientale',
    blurb: 'Au milieu de nulle part. La station de ski la plus tranquille de Finlande.',
    pageTagline: 'Au milieu de nulle part.',
    venues: {
      'Hotel Revontuli Bar': { type: 'Bar d\'hôtel', note: 'Le seul lieu de fin de soirée. Restaurant + bar.' },
      'Salla Wilderness Park': { type: 'Lieu de jour', note: 'Déjeuner + café de jour pour les visiteurs du parc.' },
    },
    quickFacts: {
      'Population': { label: 'Population', value: '3 300' },
      'Closest airport': { label: 'Aéroport le plus proche', value: 'KAO · 1h30' },
      'Last call': { label: 'Dernier service', value: '23:00 / 01:00 en saison' },
      'Best season': { label: 'Meilleure saison', value: 'Déc–Avr (ski · candidature JO 2032)' },
    },
  },
};

export default overlay;
