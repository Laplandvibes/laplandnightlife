import type { City } from './cities';
import type { Lang } from '../i18n/useLang';

/** Sister-LV-site ecosystem cross-links derived per city tag.
 *  Drives the "More in Lapland" section on each city page. */
export interface CrossLink {
  site: string;
  url: string;
  label: string;
  why: string;
  /** Category accent (hex) — same palette as shared EcosystemMenu dots. */
  accent: string;
}

/* Labelit ja perustelut lokalisoituina — kortit rakentuivat kovakoodatuista
 * englantilaisista literaaleista ilman i18n-kytkentää, joten ne olivat
 * englanniksi kaikilla 12 kielellä (auditti 4.8.). Kaksoispistemuoto
 * ("Rovaniemi: baarit …") välttää paikannimien sijataivutuksen. */
type CLDict = {
  ski: (c: string) => string; skiWhy: string;
  nature: (c: string) => string; natureWhy: string;
  husky: (c: string) => string; huskyWhy: string;
  stays: (c: string) => string; staysWhy: string;
  transport: (c: string) => string; transportWhy: string;
  bars: (c: string) => string; barsWhy: string;
};

const CL: Record<Lang, CLDict> = {
  en: {
    ski: (c) => `Ski ${c}: slopes, lifts, ski schools`, skiWhy: 'Slope counts, lift-map, ski-school comparisons.',
    nature: (c) => `${c} national-park access`, natureWhy: 'Hiking routes, wilderness lodges, viewpoint maps.',
    husky: (c) => `Husky safaris near ${c}`, huskyWhy: 'Day-tour vs multi-day, beginner vs advanced kennels.',
    stays: (c) => `Where to sleep in ${c}`, staysWhy: 'Hotels, cabins, igloos and wilderness lodges. Verified.',
    transport: (c) => `How to get to ${c}`, transportWhy: 'Airport transfers, train routes, car rental, taxis.',
    bars: (c) => `${c} bars: cocktails & craft beer`, barsWhy: 'The bar scene before the late-night clubs open.',
  },
  fi: {
    ski: (c) => `${c}: rinteet, hissit ja hiihtokoulut`, skiWhy: 'Rinnemäärät, hissikartta ja hiihtokouluvertailut.',
    nature: (c) => `${c}: kansallispuistot ja reitit`, natureWhy: 'Vaellusreitit, erämajat ja näköalapaikat.',
    husky: (c) => `${c}: huskysafarit lähistöllä`, huskyWhy: 'Päiväretki vai monta päivää, aloittelijan vai konkarin tarhat.',
    stays: (c) => `${c}: majoitus`, staysWhy: 'Hotellit, mökit, iglut ja erämajat. Tarkistettu.',
    transport: (c) => `${c}: näin pääset perille`, transportWhy: 'Lentokenttäkuljetukset, junat, autonvuokraus, taksit.',
    bars: (c) => `${c}: baarit, cocktailit ja pienpanimo-oluet`, barsWhy: 'Baarit ennen kuin yökerhot avaavat.',
  },
  de: {
    ski: (c) => `${c}: Pisten, Lifte, Skischulen`, skiWhy: 'Pistenzahlen, Liftkarte, Skischul-Vergleiche.',
    nature: (c) => `${c}: Nationalparks und Routen`, natureWhy: 'Wanderrouten, Wildnishütten, Aussichtspunkte.',
    husky: (c) => `${c}: Husky-Safaris in der Nähe`, huskyWhy: 'Tagestour oder mehrtägig, Anfänger- oder Profi-Zwinger.',
    stays: (c) => `${c}: Unterkünfte`, staysWhy: 'Hotels, Hütten, Iglus und Wildnis-Lodges. Geprüft.',
    transport: (c) => `${c}: Anreise`, transportWhy: 'Flughafentransfers, Zugverbindungen, Mietwagen, Taxis.',
    bars: (c) => `${c}: Bars, Cocktails und Craft-Bier`, barsWhy: 'Die Barszene, bevor die Clubs öffnen.',
  },
  ja: {
    ski: (c) => `${c}：スロープ・リフト・スキースクール`, skiWhy: 'コース数、リフトマップ、スキースクール比較。',
    nature: (c) => `${c}：国立公園とルート`, natureWhy: 'ハイキングルート、荒野ロッジ、展望スポット。',
    husky: (c) => `${c}：近郊のハスキーサファリ`, huskyWhy: '日帰りか数日か、初心者向けか上級者向けか。',
    stays: (c) => `${c}：宿泊`, staysWhy: 'ホテル、コテージ、イグルー、ロッジ。確認済み。',
    transport: (c) => `${c}：アクセス`, transportWhy: '空港送迎、鉄道、レンタカー、タクシー。',
    bars: (c) => `${c}：バー、カクテル、クラフトビール`, barsWhy: 'クラブが開く前のバーシーン。',
  },
  es: {
    ski: (c) => `${c}: pistas, remontes y escuelas de esquí`, skiWhy: 'Número de pistas, mapa de remontes, comparativas.',
    nature: (c) => `${c}: parques nacionales y rutas`, natureWhy: 'Rutas de senderismo, refugios, miradores.',
    husky: (c) => `${c}: safaris con huskies cerca`, huskyWhy: 'Excursión de un día o varios, criaderos para todos los niveles.',
    stays: (c) => `${c}: alojamiento`, staysWhy: 'Hoteles, cabañas, iglús y lodges. Verificado.',
    transport: (c) => `${c}: cómo llegar`, transportWhy: 'Traslados, trenes, alquiler de coches, taxis.',
    bars: (c) => `${c}: bares, cócteles y cerveza artesanal`, barsWhy: 'El ambiente de bares antes de que abran los clubes.',
  },
  'pt-BR': {
    ski: (c) => `${c}: pistas, teleféricos e escolas de esqui`, skiWhy: 'Número de pistas, mapa de teleféricos, comparativos.',
    nature: (c) => `${c}: parques nacionais e trilhas`, natureWhy: 'Trilhas, refúgios e mirantes.',
    husky: (c) => `${c}: safáris de husky por perto`, huskyWhy: 'Passeio de um dia ou vários, canis para todos os níveis.',
    stays: (c) => `${c}: onde ficar`, staysWhy: 'Hotéis, cabanas, iglus e lodges. Verificado.',
    transport: (c) => `${c}: como chegar`, transportWhy: 'Traslados, trens, aluguel de carro, táxis.',
    bars: (c) => `${c}: bares, coquetéis e cerveja artesanal`, barsWhy: 'A cena de bares antes de os clubes abrirem.',
  },
  'zh-CN': {
    ski: (c) => `${c}：雪道、缆车与滑雪学校`, skiWhy: '雪道数量、缆车图、滑雪学校对比。',
    nature: (c) => `${c}：国家公园与路线`, natureWhy: '徒步路线、荒野小屋、观景点。',
    husky: (c) => `${c}：附近的哈士奇雪橇`, huskyWhy: '一日游或多日游，各水平犬舍。',
    stays: (c) => `${c}：住宿`, staysWhy: '酒店、木屋、冰屋与荒野旅舍。已核实。',
    transport: (c) => `${c}：交通指南`, transportWhy: '机场接送、火车、租车、出租车。',
    bars: (c) => `${c}：酒吧、鸡尾酒与精酿啤酒`, barsWhy: '夜店开门前的酒吧场景。',
  },
  ko: {
    ski: (c) => `${c}: 슬로프·리프트·스키 스쿨`, skiWhy: '슬로프 수, 리프트 맵, 스키 스쿨 비교.',
    nature: (c) => `${c}: 국립공원과 코스`, natureWhy: '하이킹 코스, 야생 로지, 전망 포인트.',
    husky: (c) => `${c}: 인근 허스키 사파리`, huskyWhy: '당일 투어와 며칠 코스, 초보자·숙련자 켄넬.',
    stays: (c) => `${c}: 숙소`, staysWhy: '호텔, 캐빈, 이글루, 로지. 검증됨.',
    transport: (c) => `${c}: 가는 방법`, transportWhy: '공항 픽업, 기차, 렌터카, 택시.',
    bars: (c) => `${c}: 바, 칵테일, 크래프트 맥주`, barsWhy: '클럽이 열리기 전의 바 씬.',
  },
  fr: {
    ski: (c) => `${c} : pistes, remontées et écoles de ski`, skiWhy: 'Nombre de pistes, plan des remontées, comparatifs.',
    nature: (c) => `${c} : parcs nationaux et itinéraires`, natureWhy: 'Sentiers de randonnée, refuges, points de vue.',
    husky: (c) => `${c} : safaris en husky à proximité`, huskyWhy: 'Journée ou plusieurs jours, chenils tous niveaux.',
    stays: (c) => `${c} : hébergement`, staysWhy: 'Hôtels, chalets, igloos et lodges. Vérifié.',
    transport: (c) => `${c} : comment y aller`, transportWhy: 'Transferts, trains, location de voiture, taxis.',
    bars: (c) => `${c} : bars, cocktails et bières artisanales`, barsWhy: 'La scène des bars avant l\'ouverture des clubs.',
  },
  it: {
    ski: (c) => `${c}: piste, impianti e scuole di sci`, skiWhy: 'Numero di piste, mappa impianti, confronti.',
    nature: (c) => `${c}: parchi nazionali e sentieri`, natureWhy: 'Sentieri, rifugi e punti panoramici.',
    husky: (c) => `${c}: safari con husky nelle vicinanze`, huskyWhy: 'Gita di un giorno o più giorni, allevamenti per ogni livello.',
    stays: (c) => `${c}: dove dormire`, staysWhy: 'Hotel, chalet, igloo e lodge. Verificato.',
    transport: (c) => `${c}: come arrivare`, transportWhy: 'Transfer, treni, autonoleggio, taxi.',
    bars: (c) => `${c}: bar, cocktail e birra artigianale`, barsWhy: 'La scena dei bar prima dell\'apertura dei club.',
  },
  nl: {
    ski: (c) => `${c}: pistes, liften en skischolen`, skiWhy: 'Pisteaantallen, liftkaart, skischool-vergelijkingen.',
    nature: (c) => `${c}: nationale parken en routes`, natureWhy: 'Wandelroutes, wildernislodges, uitzichtpunten.',
    husky: (c) => `${c}: huskysafari's in de buurt`, huskyWhy: 'Dagtocht of meerdaags, kennels voor elk niveau.',
    stays: (c) => `${c}: overnachten`, staysWhy: 'Hotels, hutten, iglo\'s en lodges. Geverifieerd.',
    transport: (c) => `${c}: bereikbaarheid`, transportWhy: 'Luchthaventransfers, treinen, autohuur, taxi\'s.',
    bars: (c) => `${c}: bars, cocktails en craft beer`, barsWhy: 'De barscene voordat de clubs opengaan.',
  },
  sv: {
    ski: (c) => `${c}: pister, liftar och skidskolor`, skiWhy: 'Pistantal, liftkarta, skidskole-jämförelser.',
    nature: (c) => `${c}: nationalparker och leder`, natureWhy: 'Vandringsleder, vildmarksstugor, utsiktspunkter.',
    husky: (c) => `${c}: huskysafarier i närheten`, huskyWhy: 'Dagstur eller flera dagar, kennlar för alla nivåer.',
    stays: (c) => `${c}: boende`, staysWhy: 'Hotell, stugor, igloor och lodger. Verifierat.',
    transport: (c) => `${c}: så tar du dig dit`, transportWhy: 'Flygplatstransfer, tåg, hyrbil, taxi.',
    bars: (c) => `${c}: barer, cocktails och hantverksöl`, barsWhy: 'Barscenen innan klubbarna öppnar.',
  },
};

// Category colours mirrored from shared/EcosystemMenu CAT_RGB so the network
// reads colour-coded everywhere, not as a wall of identical dark cards.
export const ACCENT = {
  stay: '#EC4899',      // vibe pink
  activity: '#06B6D4',  // arctic cyan
  food: '#F97316',      // orange
  transport: '#93C5FD', // sky blue
  guide: '#34D399',     // aurora green
  ski: '#38BDF8',       // aurora blue
} as const;

export function getCrossLinks(city: City, lang: Lang = 'en'): CrossLink[] {
  const t = CL[lang] ?? CL.en;
  const links: CrossLink[] = [];

  // Ski-resort cities → ski-resort spoke
  if (city.tag === 'Ski resort' || ['levi', 'yllas', 'ruka', 'pyha-luosto', 'saariselka', 'salla'].includes(city.slug)) {
    links.push({
      site: 'LaplandSkiResorts',
      url: 'https://laplandskiresorts.com',
      label: t.ski(city.name),
      why: t.skiWhy,
      accent: ACCENT.ski,
    });
  }

  // Wilderness / cultural-anchor → nature spoke
  if (city.tag === 'Wilderness premium' || city.tag === 'Cultural anchor' || ['muonio', 'salla', 'pyha-luosto', 'saariselka'].includes(city.slug)) {
    links.push({
      site: 'LaplandNature',
      url: 'https://laplandnature.com',
      label: t.nature(city.name),
      why: t.natureWhy,
      accent: ACCENT.guide,
    });
  }

  // Husky safaris are everywhere — anchor cities especially
  if (['rovaniemi', 'levi', 'saariselka', 'yllas', 'kittila', 'ivalo', 'inari'].includes(city.slug)) {
    links.push({
      site: 'LaplandHuskySafaris',
      url: 'https://laplandhuskysafaris.com',
      label: t.husky(city.name),
      why: t.huskyWhy,
      accent: ACCENT.activity,
    });
  }

  // Always present:
  links.push(
    {
      site: 'LaplandStays',
      url: 'https://laplandstays.com',
      label: t.stays(city.name),
      why: t.staysWhy,
      accent: ACCENT.stay,
    },
    {
      site: 'LaplandTransport',
      url: 'https://laplandtransport.com',
      label: t.transport(city.name),
      why: t.transportWhy,
      accent: ACCENT.transport,
    },
    {
      site: 'LaplandBars',
      url: 'https://laplandbars.com',
      label: t.bars(city.name),
      why: t.barsWhy,
      accent: ACCENT.food,
    }
  );

  return links;
}

/** Adjacent / nearby cities by region + drive time.
 *  Drives the "Nearby in the North" section on each city page. */
export const NEARBY: Record<string, string[]> = {
  oulu: ['kemi', 'ruka'],
  rovaniemi: ['kemi', 'levi', 'sodankyla', 'pyha-luosto'],
  levi: ['kittila', 'yllas', 'muonio', 'rovaniemi'],
  saariselka: ['inari', 'ivalo', 'sodankyla'],
  inari: ['ivalo', 'saariselka'],
  kemi: ['rovaniemi', 'oulu'],
  yllas: ['kittila', 'levi', 'muonio'],
  ruka: ['oulu', 'rovaniemi'],
  'pyha-luosto': ['sodankyla', 'rovaniemi'],
  sodankyla: ['pyha-luosto', 'rovaniemi', 'saariselka'],
  kittila: ['levi', 'yllas', 'muonio'],
  ivalo: ['saariselka', 'inari'],
  muonio: ['yllas', 'levi', 'kittila'],
  salla: ['ruka'],
};
