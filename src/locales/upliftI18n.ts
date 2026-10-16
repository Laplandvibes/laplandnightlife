import type { Lang } from '../i18n/useLang';

/**
 * Small UI strings for the 2026-07 visual uplift (skiresorts recipe):
 * - Nightclubs stat tiles + venue-table opening-hours values (were hardcoded EN,
 *   an i18n leak on 11 locales)
 * - Cities data-derived stat band (values computed from CITIES at render time,
 *   so the numbers can never drift from the data)
 * Kept out of copy.*.ts on purpose: dedicated file, no copy-blob bloat.
 */

export type OpenKey =
  | 'gigNights'
  | 'dailyLate'
  | 'weekends'
  | 'wedSat'
  | 'friSatDisco'
  | 'dailySeason'
  | 'seasonal';

export interface UpliftDict {
  open: Record<OpenKey, string>;
  clubStats: { capacity: string; venues: string; royClub: string; lastCall: string };
  cityStats: { cities: string; venues: string; scenes: string; ski: string };
}

export const UPLIFT: Record<Lang, UpliftDict> = {
  en: {
    open: {
      gigNights: 'Gig nights, until 03:30',
      dailyLate: 'Daily 22–04:30',
      weekends: 'Weekends',
      wedSat: 'Wed–Sat',
      friSatDisco: 'Fri–Sat disco',
      dailySeason: 'Daily in season',
      seasonal: 'Seasonal',
    },
    clubStats: {
      capacity: 'Biggest club capacity, Levi',
      venues: 'Venues listed across 14 cities',
      royClub: 'Year Roy Club opened, Rovaniemi',
      lastCall: 'Latest legal serving time',
    },
    cityStats: {
      cities: 'Cities, ranked honestly',
      venues: 'Venues listed',
      scenes: 'Year-round club scenes',
      ski: 'Ski-resort party scenes',
    },
  },
  fi: {
    open: {
      gigNights: 'Keikkailtoina, 03:30 asti',
      dailyLate: 'Joka päivä 22–04:30',
      weekends: 'Viikonloppuisin',
      wedSat: 'Ke–la',
      friSatDisco: 'Pe–la disko',
      dailySeason: 'Päivittäin sesongissa',
      seasonal: 'Sesonkiaikaan',
    },
    clubStats: {
      capacity: 'Suurimman klubin kapasiteetti, Levi',
      venues: 'Listattua paikkaa 14 kaupungissa',
      royClub: 'Roy Clubin avausvuosi, Rovaniemi',
      lastCall: 'Myöhäisin sallittu anniskeluaika',
    },
    cityStats: {
      cities: 'Kaupunkia, rehellisesti arvioituna',
      venues: 'Listattua paikkaa',
      scenes: 'Ympärivuotista klubiskeneä',
      ski: 'Hiihtokeskusskeneä',
    },
  },
  de: {
    open: {
      gigNights: 'An Konzertabenden, bis 03:30',
      dailyLate: 'Täglich 22–04:30',
      weekends: 'Wochenenden',
      wedSat: 'Mi–Sa',
      friSatDisco: 'Fr–Sa Disco',
      dailySeason: 'Täglich in der Saison',
      seasonal: 'Saisonal',
    },
    clubStats: {
      capacity: 'Kapazität des größten Clubs, Levi',
      venues: 'Gelistete Locations in 14 Städten',
      royClub: 'Gründungsjahr des Roy Club, Rovaniemi',
      lastCall: 'Späteste erlaubte Ausschankzeit',
    },
    cityStats: {
      cities: 'Städte, ehrlich bewertet',
      venues: 'Gelistete Locations',
      scenes: 'Ganzjährige Clubszenen',
      ski: 'Skigebiets-Partyszenen',
    },
  },
  ja: {
    open: {
      gigNights: 'ライブのある夜、03:30まで',
      dailyLate: '毎日22時〜04:30',
      weekends: '週末',
      wedSat: '水〜土',
      friSatDisco: '金・土はディスコ',
      dailySeason: 'シーズン中は毎日',
      seasonal: '季節営業',
    },
    clubStats: {
      capacity: '最大クラブの収容人数（レヴィ）',
      venues: '14都市の掲載ベニュー',
      royClub: 'Roy Club開業の年（ロヴァニエミ）',
      lastCall: '法律上の提供終了の上限',
    },
    cityStats: {
      cities: '都市を正直にランク付け',
      venues: '掲載ベニュー',
      scenes: '通年のクラブシーン',
      ski: 'スキーリゾートのパーティーシーン',
    },
  },
  es: {
    open: {
      gigNights: 'Noches de concierto, hasta las 03:30',
      dailyLate: 'Todos los días 22–04:30',
      weekends: 'Fines de semana',
      wedSat: 'Mié–sáb',
      friSatDisco: 'Vie–sáb disco',
      dailySeason: 'A diario en temporada',
      seasonal: 'Estacional',
    },
    clubStats: {
      capacity: 'Aforo del club más grande, Levi',
      venues: 'Locales listados en 14 ciudades',
      royClub: 'Año de apertura del Roy Club, Rovaniemi',
      lastCall: 'Hora límite legal de servicio',
    },
    cityStats: {
      cities: 'Ciudades, valoradas con honestidad',
      venues: 'Locales listados',
      scenes: 'Escenas de club todo el año',
      ski: 'Escenas de fiesta en estaciones de esquí',
    },
  },
  'pt-BR': {
    open: {
      gigNights: 'Noites de show, até as 03:30',
      dailyLate: 'Todos os dias 22–04:30',
      weekends: 'Fins de semana',
      wedSat: 'Qua–sáb',
      friSatDisco: 'Sex–sáb discoteca',
      dailySeason: 'Diariamente na temporada',
      seasonal: 'Sazonal',
    },
    clubStats: {
      capacity: 'Capacidade do maior clube, Levi',
      venues: 'Locais listados em 14 cidades',
      royClub: 'Ano de abertura do Roy Club, Rovaniemi',
      lastCall: 'Horário-limite legal de serviço',
    },
    cityStats: {
      cities: 'Cidades, avaliadas com honestidade',
      venues: 'Locais listados',
      scenes: 'Cenas de clube o ano todo',
      ski: 'Cenas de festa em estações de esqui',
    },
  },
  'zh-CN': {
    open: {
      gigNights: '演出之夜，至 03:30',
      dailyLate: '每天 22:00–04:30',
      weekends: '周末',
      wedSat: '周三至周六',
      friSatDisco: '周五、周六迪斯科',
      dailySeason: '雪季每天营业',
      seasonal: '季节性营业',
    },
    clubStats: {
      capacity: '最大夜店容量（莱维）',
      venues: '14 座城市的收录场所',
      royClub: 'Roy Club 开业年份，罗瓦涅米',
      lastCall: '法定最晚供酒时间',
    },
    cityStats: {
      cities: '城市，诚实排序',
      venues: '收录场所',
      scenes: '全年夜店场景',
      ski: '滑雪度假村派对场景',
    },
  },
  ko: {
    open: {
      gigNights: '공연이 있는 밤, 03:30까지',
      dailyLate: '매일 22시–04:30',
      weekends: '주말',
      wedSat: '수–토',
      friSatDisco: '금–토 디스코',
      dailySeason: '시즌 중 매일',
      seasonal: '시즌 한정',
    },
    clubStats: {
      capacity: '최대 클럽 수용 인원, 레비',
      venues: '14개 도시의 등재 베뉴',
      royClub: 'Roy Club 개업 연도, 로바니에미',
      lastCall: '법정 주류 판매 마감 시각',
    },
    cityStats: {
      cities: '도시, 솔직하게 평가',
      venues: '등재된 베뉴',
      scenes: '연중 클럽 신',
      ski: '스키 리조트 파티 신',
    },
  },
  fr: {
    open: {
      gigNights: "Soirs de concert, jusqu'à 3 h 30",
      dailyLate: 'Tous les jours 22 h – 4 h 30',
      weekends: 'Week-ends',
      wedSat: 'Mer–sam',
      friSatDisco: 'Ven–sam disco',
      dailySeason: 'Tous les jours en saison',
      seasonal: 'Saisonnier',
    },
    clubStats: {
      capacity: 'Capacité du plus grand club, Levi',
      venues: 'Adresses répertoriées dans 14 villes',
      royClub: "Année d'ouverture du Roy Club, Rovaniemi",
      lastCall: 'Heure légale maximale de service',
    },
    cityStats: {
      cities: 'Villes, classées honnêtement',
      venues: 'Lieux répertoriés',
      scenes: "Scènes club toute l'année",
      ski: 'Scènes de fête en station de ski',
    },
  },
  it: {
    open: {
      gigNights: 'Sere di concerto, fino alle 03:30',
      dailyLate: 'Tutti i giorni 22–04:30',
      weekends: 'Weekend',
      wedSat: 'Mer–sab',
      friSatDisco: 'Ven–sab disco',
      dailySeason: 'Tutti i giorni in stagione',
      seasonal: 'Stagionale',
    },
    clubStats: {
      capacity: 'Capienza del club più grande, Levi',
      venues: 'Locali elencati in 14 città',
      royClub: 'Anno di apertura del Roy Club, Rovaniemi',
      lastCall: 'Orario massimo di mescita per legge',
    },
    cityStats: {
      cities: 'Città, valutate con onestà',
      venues: 'Locali elencati',
      scenes: "Scene club tutto l'anno",
      ski: 'Scene di festa nelle stazioni sciistiche',
    },
  },
  nl: {
    open: {
      gigNights: 'Concertavonden, tot 03:30',
      dailyLate: 'Dagelijks 22–04:30',
      weekends: 'Weekenden',
      wedSat: 'Wo–za',
      friSatDisco: 'Vr–za disco',
      dailySeason: 'Dagelijks in het seizoen',
      seasonal: 'Seizoensgebonden',
    },
    clubStats: {
      capacity: 'Capaciteit grootste club, Levi',
      venues: 'Vermelde locaties in 14 steden',
      royClub: 'Openingsjaar van Roy Club, Rovaniemi',
      lastCall: 'Uiterste wettelijke schenktijd',
    },
    cityStats: {
      cities: 'Steden, eerlijk beoordeeld',
      venues: 'Vermelde locaties',
      scenes: 'Clubscenes het hele jaar',
      ski: 'Feestscenes in skiresorts',
    },
  },
  sv: {
    open: {
      gigNights: 'Spelningskvällar, till 03:30',
      dailyLate: 'Varje dag 22–04:30',
      weekends: 'Helger',
      wedSat: 'Ons–lör',
      friSatDisco: 'Fre–lör disco',
      dailySeason: 'Dagligen under säsongen',
      seasonal: 'Säsongsöppet',
    },
    clubStats: {
      capacity: 'Största klubbens kapacitet, Levi',
      venues: 'Listade ställen i 14 städer',
      royClub: 'Roy Clubs öppningsår, Rovaniemi',
      lastCall: 'Senaste tillåtna serveringstid',
    },
    cityStats: {
      cities: 'Städer, ärligt rankade',
      venues: 'Listade ställen',
      scenes: 'Klubbscener året runt',
      ski: 'Festscener i skidorter',
    },
  },
};
