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
  | 'wedSatSeason'
  | 'weekendsLate'
  | 'weekends'
  | 'wedSat'
  | 'friSatDisco'
  | 'dailySeason'
  | 'seasonal';

export interface UpliftDict {
  open: Record<OpenKey, string>;
  clubStats: { capacity: string; venues: string; strip: string; lastCall: string };
  cityStats: { cities: string; venues: string; scenes: string; ski: string };
}

export const UPLIFT: Record<Lang, UpliftDict> = {
  en: {
    open: {
      wedSatSeason: 'Wed–Sat in season',
      weekendsLate: 'Weekends, late',
      weekends: 'Weekends',
      wedSat: 'Wed–Sat',
      friSatDisco: 'Fri–Sat disco',
      dailySeason: 'Daily in season',
      seasonal: 'Seasonal',
    },
    clubStats: {
      capacity: 'Biggest club capacity, Levi',
      venues: 'Verified venues',
      strip: 'Venues on the 400 m Rotuaari strip',
      lastCall: 'Last call in peak season',
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
      wedSatSeason: 'Ke–la sesongissa',
      weekendsLate: 'Viikonloppuisin, myöhään',
      weekends: 'Viikonloppuisin',
      wedSat: 'Ke–la',
      friSatDisco: 'Pe–la disko',
      dailySeason: 'Päivittäin sesongissa',
      seasonal: 'Sesonkiaikaan',
    },
    clubStats: {
      capacity: 'Suurimman klubin kapasiteetti, Levi',
      venues: 'Vahvistettua paikkaa',
      strip: 'Baaria Rotuaarin 400 metrillä',
      lastCall: 'Viimeinen anniskelu huippusesongissa',
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
      wedSatSeason: 'Mi–Sa in der Saison',
      weekendsLate: 'Wochenenden, bis spät',
      weekends: 'Wochenenden',
      wedSat: 'Mi–Sa',
      friSatDisco: 'Fr–Sa Disco',
      dailySeason: 'Täglich in der Saison',
      seasonal: 'Saisonal',
    },
    clubStats: {
      capacity: 'Kapazität des größten Clubs, Levi',
      venues: 'Verifizierte Locations',
      strip: 'Locations auf 400 m Rotuaari',
      lastCall: 'Letzte Runde in der Hochsaison',
    },
    cityStats: {
      cities: 'Städte, ehrlich bewertet',
      venues: 'Gelistete Locations',
      scenes: 'Ganzjährige Clubszenen',
      ski: 'Skiresort-Partyszenen',
    },
  },
  ja: {
    open: {
      wedSatSeason: 'シーズン中の水〜土',
      weekendsLate: '週末、深夜まで',
      weekends: '週末',
      wedSat: '水〜土',
      friSatDisco: '金・土はディスコ',
      dailySeason: 'シーズン中は毎日',
      seasonal: '季節営業',
    },
    clubStats: {
      capacity: '最大クラブの収容人数（レヴィ）',
      venues: '確認済みベニュー',
      strip: 'ロトゥアーリ400mのベニュー数',
      lastCall: 'ピークシーズンのラストオーダー',
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
      wedSatSeason: 'Mié–sáb en temporada',
      weekendsLate: 'Fines de semana, hasta tarde',
      weekends: 'Fines de semana',
      wedSat: 'Mié–sáb',
      friSatDisco: 'Vie–sáb disco',
      dailySeason: 'A diario en temporada',
      seasonal: 'Estacional',
    },
    clubStats: {
      capacity: 'Aforo del club más grande, Levi',
      venues: 'Locales verificados',
      strip: 'Locales en los 400 m de Rotuaari',
      lastCall: 'Última ronda en temporada alta',
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
      wedSatSeason: 'Qua–sáb na temporada',
      weekendsLate: 'Fins de semana, até tarde',
      weekends: 'Fins de semana',
      wedSat: 'Qua–sáb',
      friSatDisco: 'Sex–sáb discoteca',
      dailySeason: 'Diariamente na temporada',
      seasonal: 'Sazonal',
    },
    clubStats: {
      capacity: 'Capacidade do maior clube, Levi',
      venues: 'Locais verificados',
      strip: 'Locais nos 400 m da Rotuaari',
      lastCall: 'Última rodada na alta temporada',
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
      wedSatSeason: '雪季周三至周六',
      weekendsLate: '周末，营业到深夜',
      weekends: '周末',
      wedSat: '周三至周六',
      friSatDisco: '周五、周六迪斯科',
      dailySeason: '雪季每天营业',
      seasonal: '季节性营业',
    },
    clubStats: {
      capacity: '最大夜店容量（莱维）',
      venues: '经核实的场所',
      strip: '罗图阿里400米内的场所',
      lastCall: '旺季最后点单时间',
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
      wedSatSeason: '시즌 중 수–토',
      weekendsLate: '주말, 늦게까지',
      weekends: '주말',
      wedSat: '수–토',
      friSatDisco: '금–토 디스코',
      dailySeason: '시즌 중 매일',
      seasonal: '시즌 한정',
    },
    clubStats: {
      capacity: '최대 클럽 수용 인원, 레비',
      venues: '검증된 베뉴',
      strip: '로투아리 400m 구간의 베뉴',
      lastCall: '성수기 라스트 콜',
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
      wedSatSeason: 'Mer–sam en saison',
      weekendsLate: 'Week-ends, jusque tard',
      weekends: 'Week-ends',
      wedSat: 'Mer–sam',
      friSatDisco: 'Ven–sam disco',
      dailySeason: 'Tous les jours en saison',
      seasonal: 'Saisonnier',
    },
    clubStats: {
      capacity: 'Capacité du plus grand club, Levi',
      venues: 'Lieux vérifiés',
      strip: 'Lieux sur les 400 m de Rotuaari',
      lastCall: 'Dernière commande en haute saison',
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
      wedSatSeason: 'Mer–sab in stagione',
      weekendsLate: 'Weekend, fino a tardi',
      weekends: 'Weekend',
      wedSat: 'Mer–sab',
      friSatDisco: 'Ven–sab disco',
      dailySeason: 'Tutti i giorni in stagione',
      seasonal: 'Stagionale',
    },
    clubStats: {
      capacity: 'Capienza del club più grande, Levi',
      venues: 'Locali verificati',
      strip: 'Locali sui 400 m di Rotuaari',
      lastCall: 'Ultimo giro in alta stagione',
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
      wedSatSeason: 'Wo–za in het seizoen',
      weekendsLate: 'Weekenden, tot laat',
      weekends: 'Weekenden',
      wedSat: 'Wo–za',
      friSatDisco: 'Vr–za disco',
      dailySeason: 'Dagelijks in het seizoen',
      seasonal: 'Seizoensgebonden',
    },
    clubStats: {
      capacity: 'Capaciteit grootste club, Levi',
      venues: 'Geverifieerde locaties',
      strip: 'Locaties op 400 m Rotuaari',
      lastCall: 'Laatste ronde in het hoogseizoen',
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
      wedSatSeason: 'Ons–lör under säsongen',
      weekendsLate: 'Helger, till sent',
      weekends: 'Helger',
      wedSat: 'Ons–lör',
      friSatDisco: 'Fre–lör disco',
      dailySeason: 'Dagligen under säsongen',
      seasonal: 'Säsongsöppet',
    },
    clubStats: {
      capacity: 'Största klubbens kapacitet, Levi',
      venues: 'Verifierade ställen',
      strip: 'Ställen längs Rotuaaris 400 meter',
      lastCall: 'Sista beställning under högsäsong',
    },
    cityStats: {
      cities: 'Städer, ärligt rankade',
      venues: 'Listade ställen',
      scenes: 'Klubbscener året runt',
      ski: 'Festscener i skidorter',
    },
  },
};
