import type { Lang } from '../i18n/useLang';
import { COPY } from '../locales/copy';
import { formatDays, labelSep } from './eventDates';

/* Tapahtumakalenterin data + apurit. Irrotettu `pages/Events.tsx`:sta 2026-09-09; sama lähde ajaa
 * etusivun nostot (`upcomingEvents`), joten menneet putoavat pois ilman että kukaan muistaa poistaa niitä.
 *
 * 16.10.2026: kalenteri uudelleen vuosille 2026–2027.
 * - Yksi tapahtuma = yksi rivi, jolla on ISO-päivät ja tekstit kaikilla 12 kielellä (`Record<Lang, Text>`
 *   kaataa buildin, jos kieli puuttuu). Ennen jokainen kieli oli oma rinnakkainen listansa, joka luettiin
 *   indeksillä EN-listaa vasten; nyt kuukausilohkot johdetaan samasta rivistä kaikille kielille.
 * - Päivämäärä muotoillaan kielelle `formatDays`illa, ei kirjoiteta käsin 12 kertaa.
 * - Päivä vain järjestäjän omalta sivulta (lähde ja lukupäivä rivin kommentissa). Tapahtuma, jonka seuraavaa
 *   päivää järjestäjä ei ole julkaissut, on `PENDING`-listassa edellisen kerran päivällä, ei arvattuna
 *   kuukautena.
 * - Pois: "Sami Week / Sámi Soveeknaki" (tapahtumaa ei ole), "Peak Levi Concert Weeks" (ei lähdettä),
 *   SnowCastle (lumilinnaa ei rakenneta; Winter Park ei ole tapahtuma), "Christmas in Rovaniemi" (ei
 *   järjestäjää eikä päivää), Air Guitarin kesäkuun Oulun karsinta (ei ole olemassa).
 * Lähdemuistiinpanot: side-session-notes/…/nightlife-tapahtumat-2027-{kevat,syksy}.md. */

type Text = { name: string; city: string; body: string };
type MonthKey = keyof typeof COPY.en.events.months;
const MONTH_KEYS: MonthKey[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const LANGS: Lang[] = ['en', 'fi', 'de', 'ja', 'es', 'pt-BR', 'zh-CN', 'ko', 'fr', 'it', 'nl', 'sv'];

type CalendarEvent = {
  /** Pysyvä tunniste (kuvakartta, kesäsivu). Ei käänny. */
  id: string;
  /** Ensimmäinen ja viimeinen päivä, ISO. `end` puuttuu = yksipäiväinen. */
  start: string;
  end?: string;
  t: Record<Lang, Text>;
};

/** Palaava tapahtuma, jonka seuraavaa päivää järjestäjä ei ole vielä julkaissut. */
type PendingEvent = { id: string; lastStart: string; lastEnd?: string; t: Record<Lang, Omit<Text, 'body'>> };

const CALENDAR: CalendarEvent[] = [
  // jutajaiset.nuorisoseurat.fi: "Jutajaiset järjestetään 53:n kerran 22.-25.10.2026"; ohjelma: pe 23.10.
  // "Konsertti Pakkasfolk klo 18.00-21.00 … pelimannitanssit" (luettu 16.10.2026).
  { id: 'jutajaiset', start: '2026-10-22', end: '2026-10-25', t: {
    en: { name: 'Jutajaiset Folk Festival', city: 'Rovaniemi', body: "Northern folk festival, held for the 53rd time. Most of the programme is daytime workshops; on Friday evening a concert turns into fiddlers' dances." },
    fi: { name: 'Jutajaiset-folkfestivaali', city: 'Rovaniemi', body: 'Pohjoisen folkin festivaali, nyt 53. kertaa. Suurin osa ohjelmasta on päiväkursseja; perjantai-iltana konsertti vaihtuu pelimannitansseiksi.' },
    de: { name: 'Jutajaiset Folkfestival', city: 'Rovaniemi', body: 'Festival für Folkmusik aus dem Norden, zum 53. Mal. Das meiste sind Workshops am Tag; am Freitagabend geht ein Konzert in Spielmannstänze über.' },
    ja: { name: 'Jutajaisetフォーク・フェスティバル', city: 'ロヴァニエミ', body: '北のフォークの祭典で、今回が53回目。プログラムの多くは昼間のワークショップで、金曜の夜はコンサートからフィドル奏者の演奏によるダンスへと続きます。' },
    es: { name: 'Festival de folk Jutajaiset', city: 'Rovaniemi', body: 'Festival de folk del norte, en su 53.ª edición. La mayor parte del programa son talleres de día; el viernes por la noche, un concierto se convierte en baile tradicional.' },
    'pt-BR': { name: 'Festival de folk Jutajaiset', city: 'Rovaniemi', body: 'Festival de folk do norte, na 53ª edição. A maior parte da programação são oficinas durante o dia; na sexta à noite, um show vira baile tradicional.' },
    'zh-CN': { name: 'Jutajaiset 民谣节', city: '罗瓦涅米', body: '北方民谣节，今年是第 53 届。大部分节目是白天的工作坊；周五晚上，一场音乐会会接着变成民间乐手伴奏的舞会。' },
    ko: { name: 'Jutajaiset 포크 페스티벌', city: '로바니에미', body: '북부 포크 음악 축제로, 올해 53회째입니다. 프로그램 대부분은 낮 워크숍이고, 금요일 밤에는 콘서트가 전통 악사들의 댄스로 이어집니다.' },
    fr: { name: 'Festival folk Jutajaiset', city: 'Rovaniemi', body: "Festival de folk du Nord, dans sa 53e édition. L'essentiel du programme, ce sont des ateliers en journée ; le vendredi soir, un concert se termine en bal de ménétriers." },
    it: { name: 'Festival folk Jutajaiset', city: 'Rovaniemi', body: 'Festival di folk del Nord, alla 53ª edizione. Il programma è fatto soprattutto di laboratori diurni; il venerdì sera un concerto si trasforma in balli tradizionali.' },
    nl: { name: 'Folkfestival Jutajaiset', city: 'Rovaniemi', body: 'Festival voor noordelijke folkmuziek, voor de 53e keer. Het programma bestaat vooral uit workshops overdag; op vrijdagavond gaat een concert over in volksdansen.' },
    sv: { name: 'Folkfestivalen Jutajaiset', city: 'Rovaniemi', body: 'Festival för nordlig folkmusik, för 53:e gången. Det mesta av programmet är workshops på dagen; på fredagskvällen övergår en konsert i spelmansdanser.' },
  } },
  // levi.fi + FIS: "14–15 November 2026", 2xSL. hulluporo.fi: "Apulanta 13.11.2026", "Steve 'n' Seagulls 14.11.2026" (16.10.2026).
  { id: 'levi-fis', start: '2026-11-14', end: '2026-11-15', t: {
    en: { name: 'Levi FIS Alpine Ski World Cup', city: 'Levi', body: "Slalom World Cup weekend at the start of the season. Hullu Poro Areena has gigs the same weekend: Apulanta on Friday 13 November and Steve 'n' Seagulls on Saturday." },
    fi: { name: 'Levin FIS-alppihiihdon maailmancup', city: 'Levi', body: "Kauden alun pujottelun maailmancup-viikonloppu. Hullu Poro Areenalla on samana viikonloppuna keikat: Apulanta perjantaina 13.11. ja Steve 'n' Seagulls lauantaina." },
    de: { name: 'FIS Ski-Weltcup alpin in Levi', city: 'Levi', body: "Slalom-Weltcup-Wochenende zum Saisonauftakt. In der Hullu Poro Areena gibt es am selben Wochenende Konzerte: Apulanta am Freitag, 13. November, und Steve 'n' Seagulls am Samstag." },
    ja: { name: 'FISアルペンスキー・ワールドカップ（レヴィ）', city: 'レヴィ', body: "シーズン序盤のスラローム・ワールドカップの週末。同じ週末にHullu Poro Areenaではライブがあり、11月13日（金）はApulanta、土曜はSteve 'n' Seagullsです。" },
    es: { name: 'Copa del Mundo FIS de esquí alpino en Levi', city: 'Levi', body: "Fin de semana de Copa del Mundo de eslalon al inicio de la temporada. El Hullu Poro Areena tiene conciertos ese mismo fin de semana: Apulanta el viernes 13 de noviembre y Steve 'n' Seagulls el sábado." },
    'pt-BR': { name: 'Copa do Mundo FIS de esqui alpino em Levi', city: 'Levi', body: "Fim de semana de Copa do Mundo de slalom no início da temporada. O Hullu Poro Areena tem shows no mesmo fim de semana: Apulanta na sexta, 13 de novembro, e Steve 'n' Seagulls no sábado." },
    'zh-CN': { name: '莱维 FIS 高山滑雪世界杯', city: '莱维', body: "赛季初的回转世界杯周末。同一个周末 Hullu Poro Areena 有演出：11 月 13 日周五是 Apulanta，周六是 Steve 'n' Seagulls。" },
    ko: { name: '레비 FIS 알파인 스키 월드컵', city: '레비', body: "시즌 초반 회전 종목 월드컵 주말입니다. 같은 주말 Hullu Poro Areena에서는 11월 13일 금요일 Apulanta, 토요일 Steve 'n' Seagulls 공연이 있습니다." },
    fr: { name: 'Coupe du monde FIS de ski alpin à Levi', city: 'Levi', body: "Week-end de Coupe du monde de slalom en début de saison. Le Hullu Poro Areena a des concerts le même week-end : Apulanta le vendredi 13 novembre et Steve 'n' Seagulls le samedi." },
    it: { name: 'Coppa del Mondo FIS di sci alpino a Levi', city: 'Levi', body: "Weekend di Coppa del Mondo di slalom a inizio stagione. L'Hullu Poro Areena ha concerti lo stesso weekend: Apulanta venerdì 13 novembre e Steve 'n' Seagulls sabato." },
    nl: { name: 'FIS-wereldbeker alpineskiën in Levi', city: 'Levi', body: "Wereldbekerweekend slalom aan het begin van het seizoen. In Hullu Poro Areena zijn hetzelfde weekend concerten: Apulanta op vrijdag 13 november en Steve 'n' Seagulls op zaterdag." },
    sv: { name: 'FIS-världscupen i alpint i Levi', city: 'Levi', body: "Världscuphelg i slalom i början av säsongen. På Hullu Poro Areena blir det spelningar samma helg: Apulanta fredagen den 13 november och Steve 'n' Seagulls på lördagen." },
  } },
  // laplandnorth.fi (alueen matkailusivu): "Saariselkä Christmas Festival", "21.11.2026", "10:00 - 23:00",
  // "Saariselän tori", järjestäjä "Inarin kunta", "Ailu Valle will perform at the anniversary year's closing event" (16.10.2026).
  { id: 'saariselka-christmas', start: '2026-11-21', t: {
    en: { name: 'Saariselkä Christmas Festival', city: 'Saariselkä', body: "Inari municipality closes its 150th anniversary year on the Saariselkä square, from 10:00 to 23:00, with Ailu Valle performing." },
    fi: { name: 'Saariselän joulufestivaali', city: 'Saariselkä', body: 'Inarin kunta päättää 150-vuotisjuhlavuotensa Saariselän torilla klo 10–23, ja esiintymässä on Ailu Valle.' },
    de: { name: 'Weihnachtsfestival Saariselkä', city: 'Saariselkä', body: 'Die Gemeinde Inari beschließt ihr 150-jähriges Jubiläumsjahr auf dem Marktplatz von Saariselkä, von 10:00 bis 23:00 Uhr, mit einem Auftritt von Ailu Valle.' },
    ja: { name: 'サーリセルカ・クリスマスフェスティバル', city: 'サーリセルカ', body: 'イナリ自治体の150周年の締めくくりとして、サーリセルカの広場で10:00〜23:00に開催。Ailu Valleが出演します。' },
    es: { name: 'Festival de Navidad de Saariselkä', city: 'Saariselkä', body: 'El municipio de Inari cierra su año del 150.º aniversario en la plaza de Saariselkä, de 10:00 a 23:00, con actuación de Ailu Valle.' },
    'pt-BR': { name: 'Festival de Natal de Saariselkä', city: 'Saariselkä', body: 'O município de Inari encerra o ano do seu 150º aniversário na praça de Saariselkä, das 10:00 às 23:00, com show de Ailu Valle.' },
    'zh-CN': { name: 'Saariselkä 圣诞庆典', city: 'Saariselkä', body: '伊纳里市在 Saariselkä 广场为建市 150 周年画上句号，10:00 至 23:00，Ailu Valle 登台演出。' },
    ko: { name: '사리셀카 크리스마스 페스티벌', city: '사리셀카', body: '이나리 지자체가 150주년 기념의 해를 사리셀카 광장에서 마무리합니다. 10:00–23:00, Ailu Valle가 공연합니다.' },
    fr: { name: 'Festival de Noël de Saariselkä', city: 'Saariselkä', body: "La commune d'Inari clôt l'année de ses 150 ans sur la place de Saariselkä, de 10 h à 23 h, avec un concert d'Ailu Valle." },
    it: { name: 'Festival di Natale di Saariselkä', city: 'Saariselkä', body: 'Il comune di Inari chiude il suo anno del 150º anniversario sulla piazza di Saariselkä, dalle 10:00 alle 23:00, con Ailu Valle sul palco.' },
    nl: { name: 'Kerstfestival Saariselkä', city: 'Saariselkä', body: 'De gemeente Inari sluit haar 150-jarige jubileumjaar af op het plein van Saariselkä, van 10:00 tot 23:00, met een optreden van Ailu Valle.' },
    sv: { name: 'Julfestivalen i Saariselkä', city: 'Saariselkä', body: 'Inari kommun avslutar sitt 150-årsjubileum på torget i Saariselkä, 10:00–23:00, och Ailu Valle uppträder.' },
  } },
  // rukanordic.com: "Ruka Nordic - 27.-29.11.2026", "juhlii 25-vuotista taivaltaan"; aikataulu pe 18:15, la 17:30;
  // "Alueella on useita anniskelupisteitä" (16.10.2026).
  { id: 'ruka-nordic', start: '2026-11-27', end: '2026-11-29', t: {
    en: { name: 'Ruka Nordic World Cup opening', city: 'Ruka', body: 'The World Cup season opener in cross-country, Nordic combined and ski jumping, for the 25th year. Ski jumping runs into the evening (Friday 18:15, Saturday 17:30), and the stadium has several bars.' },
    fi: { name: 'Ruka Nordic, maailmancupin avaus', city: 'Ruka', body: 'Maastohiihdon, yhdistetyn ja mäkihypyn maailmancup-kauden avaus, 25. kerran. Mäkihyppy jatkuu iltaan (perjantaina 18:15, lauantaina 17:30), ja stadionilla on useita anniskelupisteitä.' },
    de: { name: 'Ruka Nordic, Weltcup-Auftakt', city: 'Ruka', body: 'Weltcup-Saisonauftakt in Langlauf, Nordischer Kombination und Skispringen, zum 25. Mal. Das Skispringen geht bis in den Abend (Freitag 18:15, Samstag 17:30 Uhr), und im Stadion gibt es mehrere Bars.' },
    ja: { name: 'ルカ・ノルディック（ワールドカップ開幕戦）', city: 'ルカ', body: 'クロスカントリー、ノルディック複合、スキージャンプのワールドカップ開幕戦で、今年が25年目。ジャンプは夜まで続き（金曜18:15、土曜17:30）、スタジアムにはバーが複数あります。' },
    es: { name: 'Ruka Nordic, apertura de la Copa del Mundo', city: 'Ruka', body: 'Apertura de la Copa del Mundo de esquí de fondo, combinada nórdica y saltos, en su 25.ª edición. Los saltos siguen hasta la noche (viernes 18:15, sábado 17:30) y el estadio tiene varios bares.' },
    'pt-BR': { name: 'Ruka Nordic, abertura da Copa do Mundo', city: 'Ruka', body: 'Abertura da Copa do Mundo de esqui cross-country, combinado nórdico e saltos, pelo 25º ano. Os saltos vão até a noite (sexta 18:15, sábado 17:30), e o estádio tem vários bares.' },
    'zh-CN': { name: '鲁卡北欧滑雪世界杯揭幕战', city: '鲁卡', body: '越野滑雪、北欧两项和跳台滑雪的世界杯赛季揭幕战，今年是第 25 年。跳台滑雪一直进行到晚上（周五 18:15，周六 17:30），赛场内有多个酒水供应点。' },
    ko: { name: '루카 노르딕 월드컵 개막전', city: '루카', body: '크로스컨트리, 노르딕 복합, 스키점프 월드컵 시즌 개막전으로, 올해로 25년째입니다. 스키점프는 저녁까지 이어지고(금요일 18:15, 토요일 17:30), 경기장에는 주류 판매대가 여러 곳 있습니다.' },
    fr: { name: "Ruka Nordic, ouverture de la Coupe du monde", city: 'Ruka', body: "Ouverture de la saison de Coupe du monde en ski de fond, combiné nordique et saut à ski, pour la 25e année. Le saut se prolonge en soirée (vendredi 18 h 15, samedi 17 h 30) et le stade compte plusieurs bars." },
    it: { name: 'Ruka Nordic, apertura della Coppa del Mondo', city: 'Ruka', body: "Apertura della stagione di Coppa del Mondo di fondo, combinata nordica e salto, per il 25º anno. Il salto va avanti fino a sera (venerdì 18:15, sabato 17:30) e lo stadio ha diversi bar." },
    nl: { name: 'Ruka Nordic, opening van de wereldbeker', city: 'Ruka', body: 'Seizoensopening van de wereldbeker langlaufen, noordse combinatie en schansspringen, voor het 25e jaar. Het schansspringen loopt door tot in de avond (vrijdag 18:15, zaterdag 17:30), en in het stadion zijn meerdere bars.' },
    sv: { name: 'Ruka Nordic, världscuppremiär', city: 'Ruka', body: 'Världscuppremiär i längdskidåkning, nordisk kombination och backhoppning, för 25:e året. Backhoppningen pågår in på kvällen (fredag 18:15, lördag 17:30), och på stadion finns flera barer.' },
  } },
  // levi.fi 22.12.2025: "Levi's traditional New Year's fireworks are organized near the front slope on New Year's Eve at
  // midnight." rovaniemi.fi 30.12.2024: "Ilotulitus jokirannassa klo 24". ouka.fi 30.12.2025: "The city of Oulu does not
  // organize a firework display." Vuoden 2026/27 ohjelmaa ei vielä julkaistu (16.10.2026).
  { id: 'new-year', start: '2026-12-31', t: {
    en: { name: "New Year's Eve fireworks", city: 'Levi · Rovaniemi', body: "Levi's traditional fireworks go up at midnight by the Front Slopes, and Rovaniemi has held its city fireworks on the riverside at midnight. The City of Oulu does not organise a display." },
    fi: { name: 'Uudenvuoden ilotulitukset', city: 'Levi · Rovaniemi', body: 'Levin perinteinen ilotulitus ammutaan keskiyöllä eturinteen lähellä, ja Rovaniemen kaupungin ilotulitus on ollut jokirannassa keskiyöllä. Oulun kaupunki ei järjestä ilotulitusta.' },
    de: { name: 'Silvester-Feuerwerk', city: 'Levi · Rovaniemi', body: 'Das traditionelle Feuerwerk in Levi steigt um Mitternacht an den Front Slopes, und Rovaniemi hat sein städtisches Feuerwerk um Mitternacht am Flussufer gezündet. Die Stadt Oulu veranstaltet kein Feuerwerk.' },
    ja: { name: '大晦日の花火', city: 'レヴィ · ロヴァニエミ', body: 'レヴィでは恒例の花火が真夜中にフロントスロープ近くで打ち上げられ、ロヴァニエミでは市の花火が真夜中に川岸で行われてきました。オウル市は花火を主催していません。' },
    es: { name: 'Fuegos artificiales de Año Nuevo', city: 'Levi · Rovaniemi', body: 'Los fuegos artificiales tradicionales de Levi se lanzan a medianoche junto a las Front Slopes, y Rovaniemi ha celebrado sus fuegos artificiales municipales a medianoche junto al río. El Ayuntamiento de Oulu no organiza fuegos artificiales.' },
    'pt-BR': { name: 'Fogos de Ano-Novo', city: 'Levi · Rovaniemi', body: 'Os fogos tradicionais de Levi sobem à meia-noite perto das Front Slopes, e Rovaniemi tem feito sua queima de fogos à meia-noite na beira do rio. A prefeitura de Oulu não organiza queima de fogos.' },
    'zh-CN': { name: '跨年烟花', city: '莱维 · 罗瓦涅米', body: '莱维的传统烟花在午夜于正面雪坡附近燃放，罗瓦涅米市的烟花一直是午夜在河岸燃放。奥卢市不组织烟花表演。' },
    ko: { name: '새해 전야 불꽃놀이', city: '레비 · 로바니에미', body: '레비의 전통 불꽃놀이는 자정에 프런트 슬로프 근처에서 열리고, 로바니에미는 시 불꽃놀이를 자정에 강변에서 열어 왔습니다. 오울루시는 불꽃놀이를 열지 않습니다.' },
    fr: { name: "Feux d'artifice du Nouvel An", city: 'Levi · Rovaniemi', body: "Le feu d'artifice traditionnel de Levi est tiré à minuit près des Front Slopes, et Rovaniemi a tiré son feu d'artifice municipal à minuit au bord de la rivière. La ville d'Oulu n'organise pas de feu d'artifice." },
    it: { name: "Fuochi d'artificio di Capodanno", city: 'Levi · Rovaniemi', body: "I fuochi tradizionali di Levi partono a mezzanotte vicino alle Front Slopes, e Rovaniemi ha fatto i fuochi cittadini a mezzanotte sulla riva del fiume. Il comune di Oulu non organizza fuochi d'artificio." },
    nl: { name: 'Oudejaarsvuurwerk', city: 'Levi · Rovaniemi', body: 'Het traditionele vuurwerk van Levi gaat om middernacht de lucht in bij de Front Slopes, en Rovaniemi hield het stadsvuurwerk om middernacht aan de rivieroever. De stad Oulu organiseert geen vuurwerk.' },
    sv: { name: 'Nyårsfyrverkerier', city: 'Levi · Rovaniemi', body: 'Levis traditionella fyrverkeri skjuts upp vid midnatt nära Front Slopes, och Rovaniemi har haft sitt stadsfyrverkeri vid midnatt på älvstranden. Oulu stad ordnar inget fyrverkeri.' },
  } },
  // skabmagovat.fi: "Inari, Aanaar, Finland 28.1.-31.1.2027"; paikat Siida, Sajos, Lumiteatteri; 2026 Skábmaklubba
  // K-18 pe ja la Sajoksessa (16.10.2026).
  { id: 'skabmagovat', start: '2027-01-28', end: '2027-01-31', t: {
    en: { name: 'Skábmagovat Indigenous Film Festival', city: 'Inari', body: 'Indigenous film festival in the polar-night dark, with films at Siida, Sajos and an open-air snow theatre. In 2026 the festival club Skábmaklubba ran on Friday and Saturday nights at Sajos.' },
    fi: { name: 'Alkuperäiskansojen elokuvafestivaali Skábmagovat', city: 'Inari', body: 'Alkuperäiskansojen elokuvafestivaali kaamoksen pimeydessä: elokuvia Siidassa, Sajoksessa ja ulkoilman lumiteatterissa. Vuonna 2026 festivaaliklubi Skábmaklubba järjestettiin Sajoksessa perjantai- ja lauantai-iltana.' },
    de: { name: 'Skábmagovat: Indigenes Filmfestival', city: 'Inari', body: 'Indigenes Filmfestival in der Dunkelheit der Polarnacht: Filme im Siida, im Sajos und in einem Schneetheater unter freiem Himmel. 2026 lief der Festivalclub Skábmaklubba am Freitag- und Samstagabend im Sajos.' },
    ja: { name: 'Skábmagovat先住民映画祭', city: 'イナリ', body: '極夜の暗さの中で開かれる先住民の映画祭。上映はSiida、Sajos、屋外の雪の劇場で行われます。2026年はフェスティバルクラブ「Skábmaklubba」が金曜と土曜の夜にSajosで開かれました。' },
    es: { name: 'Festival de cine indígena Skábmagovat', city: 'Inari', body: 'Festival de cine indígena en la oscuridad de la noche polar, con proyecciones en el Siida, el Sajos y un teatro de nieve al aire libre. En 2026, el club del festival, Skábmaklubba, abrió el viernes y el sábado por la noche en el Sajos.' },
    'pt-BR': { name: 'Festival de cinema indígena Skábmagovat', city: 'Inari', body: 'Festival de cinema indígena no escuro da noite polar, com sessões no Siida, no Sajos e num teatro de neve ao ar livre. Em 2026, o clube do festival, Skábmaklubba, abriu na sexta e no sábado à noite no Sajos.' },
    'zh-CN': { name: 'Skábmagovat 原住民电影节', city: '伊纳里', body: '在极夜的黑暗中举办的原住民电影节，放映地点包括 Siida、Sajos 和一座露天雪剧场。2026 年，电影节俱乐部 Skábmaklubba 于周五和周六晚上在 Sajos 开放。' },
    ko: { name: 'Skábmagovat 원주민 영화제', city: '이나리', body: '극야의 어둠 속에서 열리는 원주민 영화제로, Siida와 Sajos, 야외 눈 극장에서 상영합니다. 2026년에는 페스티벌 클럽 Skábmaklubba가 금요일과 토요일 밤 Sajos에서 열렸습니다.' },
    fr: { name: 'Festival du film autochtone Skábmagovat', city: 'Inari', body: "Festival du film autochtone dans l'obscurité de la nuit polaire, avec des projections au Siida, au Sajos et dans un théâtre de neige en plein air. En 2026, le club du festival, Skábmaklubba, a ouvert le vendredi et le samedi soir au Sajos." },
    it: { name: 'Skábmagovat, festival del cinema indigeno', city: 'Inari', body: "Festival del cinema indigeno nel buio della notte polare, con proiezioni al Siida, al Sajos e in un teatro di neve all'aperto. Nel 2026 il club del festival, Skábmaklubba, ha aperto il venerdì e il sabato sera al Sajos." },
    nl: { name: 'Skábmagovat, festival voor inheemse film', city: 'Inari', body: 'Festival voor inheemse film in het donker van de poolnacht, met voorstellingen in het Siida, het Sajos en een sneeuwtheater in de open lucht. In 2026 draaide de festivalclub Skábmaklubba op vrijdag- en zaterdagavond in het Sajos.' },
    sv: { name: 'Skábmagovat, urfolksfilmfestival', city: 'Inari', body: 'Urfolksfilmfestival i polarnattens mörker, med visningar på Siida, Sajos och i en snöteater under bar himmel. 2026 höll festivalklubben Skábmaklubba öppet fredag och lördag kväll på Sajos.' },
  } },
  // arcticrally.fi: "62. Arctic Lapland Rally 28.-30.1.2027"; reittisivun luonnosaikataulu: to 28.1. klo 19 seremoniallinen
  // lähtö ja la 30.1. podium Lordin aukiolla (16.10.2026).
  { id: 'arctic-rally', start: '2027-01-28', end: '2027-01-30', t: {
    en: { name: 'Arctic Lapland Rally', city: 'Rovaniemi', body: "A round of the Finnish Rally Championship. The ceremonial start is on Thursday evening and the podium on Saturday evening, both on Lordi's Square in central Rovaniemi." },
    fi: { name: 'Arctic Lapland Rally', city: 'Rovaniemi', body: 'Rallin SM-sarjan osakilpailu. Seremoniallinen lähtö on torstai-iltana ja palkintojenjako lauantai-iltana, molemmat Rovaniemen keskustassa Lordin aukiolla.' },
    de: { name: 'Arctic Lapland Rally', city: 'Rovaniemi', body: 'Lauf der Finnischen Rallye-Meisterschaft. Der zeremonielle Start ist am Donnerstagabend, die Siegerehrung am Samstagabend, beide auf dem Lordi-Platz im Zentrum von Rovaniemi.' },
    ja: { name: 'Arctic Lapland Rally', city: 'ロヴァニエミ', body: 'フィンランド・ラリー選手権の一戦。セレモニアルスタートは木曜の夜、表彰式は土曜の夜で、どちらもロヴァニエミ中心部のローディ広場（Lordin aukio）で行われます。' },
    es: { name: 'Arctic Lapland Rally', city: 'Rovaniemi', body: 'Prueba del Campeonato de Finlandia de Rally. La salida ceremonial es el jueves por la noche y el podio, el sábado por la noche, ambos en la plaza Lordi del centro de Rovaniemi.' },
    'pt-BR': { name: 'Arctic Lapland Rally', city: 'Rovaniemi', body: 'Etapa do Campeonato Finlandês de Rali. A largada cerimonial é na quinta à noite e o pódio no sábado à noite, ambos na praça Lordi, no centro de Rovaniemi.' },
    'zh-CN': { name: 'Arctic Lapland Rally', city: '罗瓦涅米', body: '芬兰拉力锦标赛分站赛。仪式发车在周四晚上，颁奖在周六晚上，都在罗瓦涅米市中心的 Lordi 广场（Lordin aukio）举行。' },
    ko: { name: 'Arctic Lapland Rally', city: '로바니에미', body: '핀란드 랠리 선수권의 한 라운드입니다. 세리머니 출발은 목요일 저녁, 시상식은 토요일 저녁이며 모두 로바니에미 중심가의 로르디 광장(Lordin aukio)에서 열립니다.' },
    fr: { name: 'Arctic Lapland Rally', city: 'Rovaniemi', body: 'Manche du championnat de Finlande des rallyes. Le départ fictif a lieu le jeudi soir et le podium le samedi soir, tous deux sur la place Lordi, au centre de Rovaniemi.' },
    it: { name: 'Arctic Lapland Rally', city: 'Rovaniemi', body: 'Prova del campionato finlandese di rally. La partenza cerimoniale è il giovedì sera e il podio il sabato sera, entrambi in piazza Lordi, nel centro di Rovaniemi.' },
    nl: { name: 'Arctic Lapland Rally', city: 'Rovaniemi', body: 'Ronde van het Finse rallykampioenschap. De ceremoniële start is op donderdagavond en de podiumceremonie op zaterdagavond, allebei op het Lordiplein in het centrum van Rovaniemi.' },
    sv: { name: 'Arctic Lapland Rally', city: 'Rovaniemi', body: 'Deltävling i finska rallymästerskapet. Den ceremoniella starten är på torsdagskvällen och prisutdelningen på lördagskvällen, båda på Lordis torg i centrala Rovaniemi.' },
  } },
  // almanakka.helsinki.fi liputuspäivät 2027: "6.2. Saamelaisten kansallispäivä"; sajos.fi: "Saamelaisten kansallispäivä
  // Sajoksessa 6.2.2026" + koko perheen konsertti 7.2.2026. Vuoden 2027 ohjelmaa ei vielä julkaistu (16.10.2026).
  { id: 'sami-day', start: '2027-02-06', t: {
    en: { name: 'Sámi National Day', city: 'Inari', body: 'The Sámi flag is flown across Finland. Sajos, the Sámi cultural centre in Inari, marked the day in 2026 with a celebration and a family concert.' },
    fi: { name: 'Saamelaisten kansallispäivä', city: 'Inari', body: 'Saamelaisten lippu liehuu kautta Suomen. Inarin saamelaiskulttuurikeskus Sajos juhli päivää vuonna 2026 juhlalla ja koko perheen konsertilla.' },
    de: { name: 'Nationalfeiertag der Samen', city: 'Inari', body: 'In ganz Finnland weht die samische Flagge. Das samische Kulturzentrum Sajos in Inari feierte den Tag 2026 mit einer Feier und einem Familienkonzert.' },
    ja: { name: 'サーミ・ナショナルデー', city: 'イナリ', body: 'フィンランド各地でサーミの旗が掲げられます。イナリのサーミ文化センターSajosでは、2026年に記念の催しと家族向けコンサートが開かれました。' },
    es: { name: 'Día Nacional Sami', city: 'Inari', body: 'La bandera sami ondea en toda Finlandia. El centro cultural sami Sajos, en Inari, celebró el día en 2026 con un acto y un concierto familiar.' },
    'pt-BR': { name: 'Dia Nacional Sámi', city: 'Inari', body: 'A bandeira sámi é hasteada em toda a Finlândia. O centro cultural sámi Sajos, em Inari, celebrou a data em 2026 com uma festa e um show para toda a família.' },
    'zh-CN': { name: '萨米民族日', city: '伊纳里', body: '萨米旗在芬兰各地飘扬。2026 年，伊纳里的萨米文化中心 Sajos 以庆祝活动和一场家庭音乐会纪念这一天。' },
    ko: { name: '사미 민족의 날', city: '이나리', body: '핀란드 곳곳에 사미 깃발이 걸립니다. 이나리의 사미 문화센터 Sajos는 2026년에 기념 행사와 가족 콘서트로 이날을 기렸습니다.' },
    fr: { name: 'Fête nationale sámi', city: 'Inari', body: 'Le drapeau sámi flotte dans toute la Finlande. Le centre culturel sámi Sajos, à Inari, a marqué la journée en 2026 par une célébration et un concert familial.' },
    it: { name: 'Giornata nazionale sámi', city: 'Inari', body: 'La bandiera sámi sventola in tutta la Finlandia. Il centro culturale sámi Sajos, a Inari, ha celebrato la giornata nel 2026 con una festa e un concerto per famiglie.' },
    nl: { name: 'Samische nationale feestdag', city: 'Inari', body: 'In heel Finland wappert de Samische vlag. Het Samische cultuurcentrum Sajos in Inari vierde de dag in 2026 met een viering en een familieconcert.' },
    sv: { name: 'Samernas nationaldag', city: 'Inari', body: 'Den samiska flaggan hissas i hela Finland. Det samiska kulturcentret Sajos i Inari firade dagen 2026 med en fest och en familjekonsert.' },
  } },
  // porokilpailijat.fi: "ROVANIEMI 27.2.-28.2.2027 Järjestäjä: Lions Club Rovaniemi / Ounasvaara ry" (16.10.2026).
  { id: 'porocup-rovaniemi', start: '2027-02-27', end: '2027-02-28', t: {
    en: { name: 'Reindeer racing in Rovaniemi', city: 'Rovaniemi', body: 'A round of the Porocup reindeer-racing series, organised by Lions Club Rovaniemi / Ounasvaara ry. Racing runs in the daytime.' },
    fi: { name: 'Rovaniemen porokilpailut', city: 'Rovaniemi', body: 'Porocup-sarjan osakilpailu, järjestäjänä Lions Club Rovaniemi / Ounasvaara ry. Kilpailut ajetaan päiväsaikaan.' },
    de: { name: 'Rentierrennen in Rovaniemi', city: 'Rovaniemi', body: 'Lauf der Rentierrennserie Porocup, ausgerichtet vom Lions Club Rovaniemi / Ounasvaara ry. Gefahren wird tagsüber.' },
    ja: { name: 'ロヴァニエミのトナカイレース', city: 'ロヴァニエミ', body: 'トナカイレースのシリーズ「Porocup」の一戦で、主催はLions Club Rovaniemi / Ounasvaara ry。レースは日中に行われます。' },
    es: { name: 'Carreras de renos en Rovaniemi', city: 'Rovaniemi', body: 'Prueba de la serie de carreras de renos Porocup, organizada por el Lions Club Rovaniemi / Ounasvaara ry. Las carreras son de día.' },
    'pt-BR': { name: 'Corridas de renas em Rovaniemi', city: 'Rovaniemi', body: 'Etapa da série de corridas de renas Porocup, organizada pelo Lions Club Rovaniemi / Ounasvaara ry. As corridas são durante o dia.' },
    'zh-CN': { name: '罗瓦涅米驯鹿赛', city: '罗瓦涅米', body: '驯鹿赛系列 Porocup 的分站赛，由 Lions Club Rovaniemi / Ounasvaara ry 主办。比赛在白天进行。' },
    ko: { name: '로바니에미 순록 경주', city: '로바니에미', body: '순록 경주 시리즈 Porocup의 한 라운드로, Lions Club Rovaniemi / Ounasvaara ry가 주최합니다. 경주는 낮에 열립니다.' },
    fr: { name: 'Courses de rennes à Rovaniemi', city: 'Rovaniemi', body: 'Manche de la série de courses de rennes Porocup, organisée par le Lions Club Rovaniemi / Ounasvaara ry. Les courses ont lieu en journée.' },
    it: { name: 'Corse di renne a Rovaniemi', city: 'Rovaniemi', body: 'Tappa della serie di corse di renne Porocup, organizzata dal Lions Club Rovaniemi / Ounasvaara ry. Le gare si corrono di giorno.' },
    nl: { name: 'Rendierraces in Rovaniemi', city: 'Rovaniemi', body: 'Ronde van de rendierraceserie Porocup, georganiseerd door Lions Club Rovaniemi / Ounasvaara ry. Er wordt overdag gereden.' },
    sv: { name: 'Renkapplöpning i Rovaniemi', city: 'Rovaniemi', body: 'Deltävling i renkapplöpningsserien Porocup, arrangerad av Lions Club Rovaniemi / Ounasvaara ry. Loppen körs dagtid.' },
  } },
  // omj.fi: "Festivaali järjestetään uudelleen 15.–25.3.2027"; avajaiskonsertti Madetojan salissa (16.10.2026).
  { id: 'oulu-music-festival', start: '2027-03-15', end: '2027-03-25', t: {
    en: { name: 'Oulu Music Festival', city: 'Oulu', body: 'Eleven days of concerts in Oulu; the 2027 opening concert is at Madetoja Hall.' },
    fi: { name: 'Oulun Musiikkijuhlat', city: 'Oulu', body: 'Yksitoista päivää konsertteja Oulussa; vuoden 2027 avajaiskonsertti on Madetojan salissa.' },
    de: { name: 'Musikfestspiele Oulu', city: 'Oulu', body: 'Elf Tage Konzerte in Oulu; das Eröffnungskonzert 2027 findet im Madetoja-Saal statt.' },
    ja: { name: 'オウル音楽祭', city: 'オウル', body: 'オウルで11日間にわたるコンサート。2027年の開幕コンサートはマデトヤ・ホールで行われます。' },
    es: { name: 'Festival de Música de Oulu', city: 'Oulu', body: 'Once días de conciertos en Oulu; el concierto inaugural de 2027 es en la sala Madetoja.' },
    'pt-BR': { name: 'Festival de Música de Oulu', city: 'Oulu', body: 'Onze dias de shows em Oulu; o concerto de abertura de 2027 é na sala Madetoja.' },
    'zh-CN': { name: '奥卢音乐节', city: '奥卢', body: '在奥卢连续 11 天的音乐会；2027 年的开幕音乐会在 Madetoja 音乐厅举行。' },
    ko: { name: '오울루 음악 축제', city: '오울루', body: '오울루에서 열하루 동안 이어지는 콘서트로, 2027년 개막 공연은 마데토야 홀에서 열립니다.' },
    fr: { name: "Festival de musique d'Oulu", city: 'Oulu', body: "Onze jours de concerts à Oulu ; le concert d'ouverture 2027 a lieu à la salle Madetoja." },
    it: { name: 'Festival musicale di Oulu', city: 'Oulu', body: "Undici giorni di concerti a Oulu; il concerto d'apertura 2027 è nella sala Madetoja." },
    nl: { name: 'Muziekfestival Oulu', city: 'Oulu', body: 'Elf dagen concerten in Oulu; het openingsconcert van 2027 is in de Madetoja-zaal.' },
    sv: { name: 'Musikfestspelen i Oulu', city: 'Oulu', body: 'Elva dagar med konserter i Oulu; öppningskonserten 2027 är i Madetojasalen.' },
  } },
  // porokilpailijat.fi: "porokuninkuusajot inari 20.-21.3.2027 Järjestäjä: Suomen Porokilpailijat ry"; visitinari.fi: "ajetaan
  // joka kevättalvi Inarijärven jäällä Lomakylä Inarin rannassa" (16.10.2026).
  { id: 'kuninkuusajot', start: '2027-03-20', end: '2027-03-21', t: {
    en: { name: "Reindeer Racing King's Cup (Porokuninkuusajot)", city: 'Inari', body: "The King's Cup of reindeer racing, run every late winter on the ice of Lake Inari by Lomakylä Inari. Organised by Suomen Porokilpailijat ry." },
    fi: { name: 'Porokuninkuusajot', city: 'Inari', body: 'Porokuninkuusajot ajetaan joka kevättalvi Inarijärven jäällä Lomakylä Inarin rannassa. Järjestäjä on Suomen Porokilpailijat ry.' },
    de: { name: 'Rentier-Königsrennen (Porokuninkuusajot)', city: 'Inari', body: 'Das Königsrennen der Rentierrennen wird jeden Spätwinter auf dem Eis des Inarisees beim Lomakylä Inari gefahren. Veranstalter ist Suomen Porokilpailijat ry.' },
    ja: { name: 'トナカイレース王座決定戦（Porokuninkuusajot）', city: 'イナリ', body: 'トナカイレースの王座決定戦。毎年晩冬、イナリ湖の氷上、Lomakylä Inariのそばで行われます。主催はSuomen Porokilpailijat ry。' },
    es: { name: 'Carrera real de renos (Porokuninkuusajot)', city: 'Inari', body: 'La carrera real de renos se corre cada final de invierno sobre el hielo del lago Inari, junto a Lomakylä Inari. La organiza Suomen Porokilpailijat ry.' },
    'pt-BR': { name: 'Corrida real de renas (Porokuninkuusajot)', city: 'Inari', body: 'A corrida real de renas acontece todo fim de inverno sobre o gelo do lago Inari, junto ao Lomakylä Inari. A organização é da Suomen Porokilpailijat ry.' },
    'zh-CN': { name: '驯鹿赛王者赛（Porokuninkuusajot）', city: '伊纳里', body: '驯鹿赛王者赛每年冬末在伊纳里湖冰面上举行，地点在 Lomakylä Inari 岸边。主办方为 Suomen Porokilpailijat ry。' },
    ko: { name: '순록 경주 왕좌전(Porokuninkuusajot)', city: '이나리', body: '순록 경주 왕좌전은 매년 늦겨울 Lomakylä Inari 앞 이나리 호수 얼음 위에서 열립니다. 주최는 Suomen Porokilpailijat ry입니다.' },
    fr: { name: 'Courses royales de rennes (Porokuninkuusajot)', city: 'Inari', body: "Les courses royales de rennes se disputent chaque fin d'hiver sur la glace du lac Inari, devant le Lomakylä Inari. Organisation : Suomen Porokilpailijat ry." },
    it: { name: 'Corse reali delle renne (Porokuninkuusajot)', city: 'Inari', body: 'Le corse reali delle renne si disputano ogni fine inverno sul ghiaccio del lago Inari, davanti al Lomakylä Inari. Le organizza la Suomen Porokilpailijat ry.' },
    nl: { name: 'Koningsrace voor rendieren (Porokuninkuusajot)', city: 'Inari', body: 'De koningsrace voor rendieren wordt elke late winter gereden op het ijs van het Inarimeer, bij Lomakylä Inari. Organisator is Suomen Porokilpailijat ry.' },
    sv: { name: 'Kungsloppet i renkapplöpning (Porokuninkuusajot)', city: 'Inari', body: 'Kungsloppet i renkapplöpning körs varje senvinter på isen på Enare träsk vid Lomakylä Inari. Arrangör är Suomen Porokilpailijat ry.' },
  } },
  // Visit Rovaniemi: "the Midnight Sun period in Rovaniemi lasts for a month, from 6th June to 7th July". Sama joka vuosi.
  { id: 'midnight-sun', start: '2027-06-06', end: '2027-07-07', t: {
    en: { name: 'Midnight sun in Rovaniemi', city: 'Rovaniemi', body: 'The sun stays above the horizon around the clock. Further north the period is longer.' },
    fi: { name: 'Yötön yö Rovaniemellä', city: 'Rovaniemi', body: 'Aurinko pysyy horisontin yläpuolella vuorokauden ympäri. Pohjoisempana jakso on pidempi.' },
    de: { name: 'Mitternachtssonne in Rovaniemi', city: 'Rovaniemi', body: 'Die Sonne bleibt rund um die Uhr über dem Horizont. Weiter nördlich ist der Zeitraum länger.' },
    ja: { name: 'ロヴァニエミの白夜', city: 'ロヴァニエミ', body: '太陽が一日中地平線の上にとどまります。さらに北では、この期間がもっと長くなります。' },
    es: { name: 'Sol de medianoche en Rovaniemi', city: 'Rovaniemi', body: 'El sol permanece sobre el horizonte las 24 horas. Más al norte, el periodo es más largo.' },
    'pt-BR': { name: 'Sol da meia-noite em Rovaniemi', city: 'Rovaniemi', body: 'O sol não desce abaixo do horizonte o dia inteiro. Mais ao norte, o período é mais longo.' },
    'zh-CN': { name: '罗瓦涅米的午夜阳光', city: '罗瓦涅米', body: '太阳全天停留在地平线之上。越往北，这段时间越长。' },
    ko: { name: '로바니에미의 백야', city: '로바니에미', body: '해가 하루 종일 지평선 위에 머뭅니다. 더 북쪽으로 갈수록 이 기간이 깁니다.' },
    fr: { name: 'Soleil de minuit à Rovaniemi', city: 'Rovaniemi', body: "Le soleil reste au-dessus de l'horizon jour et nuit. Plus au nord, la période est plus longue." },
    it: { name: 'Sole di mezzanotte a Rovaniemi', city: 'Rovaniemi', body: "Il sole resta sopra l'orizzonte giorno e notte. Più a nord il periodo è più lungo." },
    nl: { name: 'Middernachtszon in Rovaniemi', city: 'Rovaniemi', body: 'De zon blijft dag en nacht boven de horizon. Verder naar het noorden duurt de periode langer.' },
    sv: { name: 'Midnattssol i Rovaniemi', city: 'Rovaniemi', body: 'Solen stannar ovanför horisonten dygnet runt. Längre norrut varar perioden längre.' },
  } },
  // msfilmfestival.fi: "16. - 20. Kesäkuuta 2027"; esityspaikat Lapinsuu, iso teltta, punainen teltta, koulu, Kitisen
  // keidas, pubiteltta; 2026: "32000 kävijää"; ohjelmakartassa näytöksiä klo 03:00 (16.10.2026). Ei kirkkoa.
  { id: 'msff', start: '2027-06-16', end: '2027-06-20', t: {
    en: { name: 'Midnight Sun Film Festival', city: 'Sodankylä', body: 'Five days of films around the clock, with screenings at 03:00 in full daylight. Venues include the Lapinsuu cinema, the big tent and the school; the 2026 festival drew 32 000 visitors.' },
    fi: { name: 'Sodankylän elokuvajuhlat', city: 'Sodankylä', body: 'Viisi päivää elokuvia kellon ympäri, näytöksiä myös 03:00 täydessä päivänvalossa. Esityspaikkoja ovat muun muassa elokuvateatteri Lapinsuu, iso teltta ja koulu; vuoden 2026 elokuvajuhlat keräsivät 32 000 kävijää.' },
    de: { name: 'Midnight Sun Film Festival', city: 'Sodankylä', body: 'Fünf Tage Kino rund um die Uhr, mit Vorführungen um 03:00 Uhr bei vollem Tageslicht. Gespielt wird unter anderem im Kino Lapinsuu, im großen Zelt und in der Schule; 2026 kamen 32 000 Besucher.' },
    ja: { name: 'ミッドナイトサン映画祭', city: 'ソダンキュラ', body: '5日間、昼夜を問わず映画を上映。午前3時の回も真昼のような明るさの中で行われます。会場は映画館ラピンスー、大テント、学校など。2026年の来場者は32,000人でした。' },
    es: { name: 'Midnight Sun Film Festival', city: 'Sodankylä', body: 'Cinco días de cine a todas horas, con sesiones a las 03:00 a plena luz del día. Entre las sedes están el cine Lapinsuu, la gran carpa y la escuela; la edición de 2026 reunió a 32.000 visitantes.' },
    'pt-BR': { name: 'Midnight Sun Film Festival', city: 'Sodankylä', body: 'Cinco dias de cinema a qualquer hora, com sessões às 03:00 em plena luz do dia. Entre os locais estão o cinema Lapinsuu, a grande tenda e a escola; a edição de 2026 reuniu 32.000 visitantes.' },
    'zh-CN': { name: '午夜阳光电影节', city: '索丹屈莱', body: '连续五天全天候放映电影，凌晨 3 点的场次也在明亮的日光中进行。放映地点包括 Lapinsuu 电影院、大帐篷和学校；2026 年的电影节吸引了 32,000 名观众。' },
    ko: { name: '백야 영화제', city: '소단퀼래', body: '닷새 동안 밤낮없이 영화를 상영하며, 새벽 3시 상영도 환한 햇빛 속에서 열립니다. 상영관은 Lapinsuu 영화관, 대형 텐트, 학교 등이며, 2026년 영화제에는 32,000명이 찾았습니다.' },
    fr: { name: 'Midnight Sun Film Festival', city: 'Sodankylä', body: "Cinq jours de cinéma jour et nuit, avec des séances à 3 h du matin en plein jour. Parmi les lieux : le cinéma Lapinsuu, le grand chapiteau et l'école ; l'édition 2026 a attiré 32 000 visiteurs." },
    it: { name: 'Midnight Sun Film Festival', city: 'Sodankylä', body: "Cinque giorni di cinema a tutte le ore, con proiezioni alle 3 di notte in piena luce. Tra le sedi ci sono il cinema Lapinsuu, il tendone grande e la scuola; l'edizione 2026 ha richiamato 32.000 visitatori." },
    nl: { name: 'Midnight Sun Film Festival', city: 'Sodankylä', body: 'Vijf dagen film rond de klok, met voorstellingen om 03:00 uur bij vol daglicht. Locaties zijn onder meer bioscoop Lapinsuu, de grote tent en de school; de editie van 2026 trok 32.000 bezoekers.' },
    sv: { name: 'Midnight Sun Film Festival', city: 'Sodankylä', body: 'Fem dagar med film dygnet runt, med visningar klockan tre på natten i fullt dagsljus. Visningsplatserna är bland annat biografen Lapinsuu, det stora tältet och skolan; 2026 kom 32 000 besökare.' },
  } },
  // almanakka.helsinki.fi: juhannuspäivä la 26.6.2027; aatto = sitä edeltävä perjantai 25.6.2027.
  { id: 'juhannus', start: '2027-06-25', end: '2027-06-26', t: {
    en: { name: 'Juhannus / Midsummer', city: 'Everywhere', body: 'Bonfires, sauna, lake swims, cabin weekends. Cities empty out; locals leave.' },
    fi: { name: 'Juhannus', city: 'Kaikkialla', body: 'Kokot, sauna, järviuinnit, mökkiviikonloput. Kaupungit tyhjenevät; paikalliset lähtevät.' },
    de: { name: 'Juhannus / Mittsommer', city: 'Überall', body: 'Lagerfeuer, Sauna, Seebaden, Hütten-Wochenenden. Die Städte leeren sich; die Einheimischen fahren raus.' },
    ja: { name: 'ユハンヌス（夏至祭）', city: '各地', body: 'かがり火、サウナ、湖での水浴び、コテージで過ごす週末。地元の人が出ていき、街は空っぽになります。' },
    es: { name: 'Juhannus / San Juan', city: 'En todas partes', body: 'Fogatas, sauna, baños en lagos y fines de semana en la cabaña. Las ciudades se vacían y la gente local se marcha.' },
    'pt-BR': { name: 'Juhannus / Solstício de verão', city: 'Em toda parte', body: 'Fogueiras, sauna, banhos de lago e fins de semana na cabana. As cidades se esvaziam e os moradores vão embora.' },
    'zh-CN': { name: 'Juhannus / 仲夏节', city: '各地', body: '篝火、桑拿、湖中游泳，在小屋度周末。城市变得空荡，本地人纷纷离开。' },
    ko: { name: 'Juhannus / 하지절', city: '전국 각지', body: '모닥불, 사우나, 호수 수영, 오두막에서 보내는 주말. 현지인들이 떠나면서 도시는 텅 빕니다.' },
    fr: { name: 'Juhannus / Saint-Jean', city: 'Partout', body: 'Feux de joie, sauna, baignades dans les lacs, week-ends au chalet. Les villes se vident ; les habitants partent.' },
    it: { name: 'Juhannus / Mezza estate', city: 'Ovunque', body: 'Falò, sauna, bagni nel lago, weekend in baita. Le città si svuotano; gli abitanti partono.' },
    nl: { name: 'Juhannus / Midzomer', city: 'Overal', body: 'Vreugdevuren, sauna, zwemmen in meren en weekenden in de hut. De steden lopen leeg en de inwoners trekken erop uit.' },
    sv: { name: 'Juhannus / midsommar', city: 'Överallt', body: 'Brasor, bastu, sjöbad och helger i stugan. Städerna töms och lokalborna åker därifrån.' },
  } },
  // inariviikot.fi: "kesätapahtumat järjestetään jälleen 23.7.–1.8.2027"; ohjelma perinteisesti "kyläjuhlia, kultakisoja,
  // lastentapahtumia, markkinatunnelmaa, konsertteja"; järjestäjä Inarin kunnan kulttuuritoimi (16.10.2026).
  { id: 'inariviikot', start: '2027-07-23', end: '2027-08-01', t: {
    en: { name: 'Inari Weeks (Inariviikot)', city: 'Inari', body: "Ten days of summer events across Inari municipality: village festivals, gold-panning contests, markets and concerts. Organised by the municipality's cultural services." },
    fi: { name: 'Inariviikot', city: 'Inari', body: 'Kymmenen päivää kesätapahtumia eri puolilla Inarin kuntaa: kyläjuhlia, kullanhuuhdontakisoja, markkinoita ja konsertteja. Järjestäjä on Inarin kunnan kulttuuritoimi.' },
    de: { name: 'Inari-Wochen (Inariviikot)', city: 'Inari', body: 'Zehn Tage Sommerveranstaltungen in der ganzen Gemeinde Inari: Dorffeste, Goldwasch-Wettbewerbe, Märkte und Konzerte. Veranstalter ist das Kulturamt der Gemeinde.' },
    ja: { name: 'イナリ・ウィークス（Inariviikot）', city: 'イナリ', body: '10日間にわたり、イナリ自治体の各地で夏のイベントが開かれます。村祭り、砂金掘り大会、マーケット、コンサートなど。主催はイナリ自治体の文化部門です。' },
    es: { name: 'Semanas de Inari (Inariviikot)', city: 'Inari', body: 'Diez días de eventos de verano por todo el municipio de Inari: fiestas de pueblo, concursos de bateo de oro, mercados y conciertos. Los organiza el departamento de cultura del municipio.' },
    'pt-BR': { name: 'Semanas de Inari (Inariviikot)', city: 'Inari', body: 'Dez dias de eventos de verão em todo o município de Inari: festas de vilarejo, competições de garimpo de ouro, feiras e shows. A organização é do departamento de cultura do município.' },
    'zh-CN': { name: '伊纳里周（Inariviikot）', city: '伊纳里', body: '为期十天的夏季活动遍布伊纳里市各地：村庄节庆、淘金比赛、集市和音乐会。由伊纳里市文化部门主办。' },
    ko: { name: '이나리 위크(Inariviikot)', city: '이나리', body: '이나리 지역 곳곳에서 열흘간 여름 행사가 이어집니다. 마을 축제, 사금 채취 대회, 장터, 콘서트 등이 열리며, 이나리 지자체 문화과가 주최합니다.' },
    fr: { name: "Semaines d'Inari (Inariviikot)", city: 'Inari', body: "Dix jours d'événements estivaux dans toute la commune d'Inari : fêtes de village, concours d'orpaillage, marchés et concerts. Organisation : le service culturel de la commune." },
    it: { name: 'Settimane di Inari (Inariviikot)', city: 'Inari', body: "Dieci giorni di eventi estivi in tutto il comune di Inari: feste di paese, gare di ricerca dell'oro, mercati e concerti. Li organizza l'ufficio cultura del comune." },
    nl: { name: 'Inari-weken (Inariviikot)', city: 'Inari', body: 'Tien dagen zomerevenementen in de hele gemeente Inari: dorpsfeesten, goudwaswedstrijden, markten en concerten. Georganiseerd door de culturele dienst van de gemeente.' },
    sv: { name: 'Inariveckorna (Inariviikot)', city: 'Inari', body: 'Tio dagar med sommarevenemang i hela Inari kommun: byfester, guldvaskningstävlingar, marknader och konserter. Arrangör är kommunens kulturförvaltning.' },
  } },
  // qstock.fi: "Nähdään jälleen Qstockissa 30.–31.7.2027"; 2026: "40 000 kävijää", "loppuunmyyty jo kolmattatoista kertaa
  // peräkkäin"; alueet "Kuusisaari, Raatti and Linnansaari" (16.10.2026).
  { id: 'qstock', start: '2027-07-30', end: '2027-07-31', t: {
    en: { name: 'Qstock Festival', city: 'Oulu', body: 'Two-day rock festival on Kuusisaari, Raatti and Linnansaari. The 2026 festival sold out for the 13th year running, with 40 000 visitors.' },
    fi: { name: 'Qstock-festivaali', city: 'Oulu', body: 'Kaksipäiväinen rockfestivaali Kuusisaaressa, Raatissa ja Linnansaaressa. Vuonna 2026 festivaali myytiin loppuun 13. kertaa peräkkäin, ja kävijöitä oli 40 000.' },
    de: { name: 'Qstock Festival', city: 'Oulu', body: 'Zweitägiges Rockfestival auf Kuusisaari, Raatti und Linnansaari. 2026 war es zum 13. Mal in Folge ausverkauft, mit 40 000 Besuchern.' },
    ja: { name: 'Qstockフェスティバル', city: 'オウル', body: 'クーシサーリ、ラーッティ、リンナンサーリで開かれる2日間のロックフェス。2026年は13年連続で完売し、40,000人が来場しました。' },
    es: { name: 'Festival Qstock', city: 'Oulu', body: 'Festival de rock de dos días en Kuusisaari, Raatti y Linnansaari. En 2026 agotó las entradas por 13.º año seguido, con 40.000 visitantes.' },
    'pt-BR': { name: 'Festival Qstock', city: 'Oulu', body: 'Festival de rock de dois dias em Kuusisaari, Raatti e Linnansaari. Em 2026 esgotou pelo 13º ano seguido, com 40.000 visitantes.' },
    'zh-CN': { name: 'Qstock 音乐节', city: '奥卢', body: '在 Kuusisaari、Raatti 和 Linnansaari 举办的两天摇滚音乐节。2026 年连续第 13 年门票售罄，共有 40,000 名观众。' },
    ko: { name: 'Qstock 페스티벌', city: '오울루', body: '쿠시사리, 라티, 린난사리에서 열리는 이틀간의 록 페스티벌. 2026년에는 13년 연속 매진됐고 40,000명이 찾았습니다.' },
    fr: { name: 'Festival Qstock', city: 'Oulu', body: 'Festival rock de deux jours à Kuusisaari, Raatti et Linnansaari. En 2026, il a affiché complet pour la 13e année consécutive, avec 40 000 visiteurs.' },
    it: { name: 'Festival Qstock', city: 'Oulu', body: 'Festival rock di due giorni a Kuusisaari, Raatti e Linnansaari. Nel 2026 ha fatto il tutto esaurito per il 13º anno di fila, con 40.000 visitatori.' },
    nl: { name: 'Qstock Festival', city: 'Oulu', body: 'Tweedaags rockfestival op Kuusisaari, Raatti en Linnansaari. In 2026 was het voor het 13e jaar op rij uitverkocht, met 40.000 bezoekers.' },
    sv: { name: 'Qstock Festival', city: 'Oulu', body: 'Tvådagars rockfestival på Kuusisaari, Raatti och Linnansaari. 2026 blev den utsåld för 13:e året i rad, med 40 000 besökare.' },
  } },
  // simerock.com: "Simerock 25V. ROVANIEMELLÄ 13.-14.8.2027"; Tiketti: "Ounaspaviljonki, Rovaniemi"; uutinen 4.2.2026:
  // "Lapin suurin tapahtuma, Simerock" (16.10.2026).
  { id: 'simerock', start: '2027-08-13', end: '2027-08-14', t: {
    en: { name: 'Simerock', city: 'Rovaniemi', body: "Rovaniemi's rock festival at Ounaspaviljonki. Simerock turns 25 in 2027, and the organiser calls it Lapland's biggest event." },
    fi: { name: 'Simerock', city: 'Rovaniemi', body: 'Rovaniemen rockfestivaali Ounaspaviljongilla. Vuonna 2027 Simerock täyttää 25 vuotta, ja järjestäjä kutsuu sitä Lapin suurimmaksi tapahtumaksi.' },
    de: { name: 'Simerock', city: 'Rovaniemi', body: 'Rovaniemis Rockfestival im Ounaspaviljonki. 2027 wird Simerock 25 Jahre alt, und der Veranstalter nennt es die größte Veranstaltung Lapplands.' },
    ja: { name: 'Simerock', city: 'ロヴァニエミ', body: 'Ounaspaviljonkiで開かれるロヴァニエミのロックフェス。2027年に25周年を迎え、主催者はラップランド最大のイベントとうたっています。' },
    es: { name: 'Simerock', city: 'Rovaniemi', body: 'El festival de rock de Rovaniemi, en el Ounaspaviljonki. En 2027 Simerock cumple 25 años, y la organización lo llama el mayor evento de Laponia.' },
    'pt-BR': { name: 'Simerock', city: 'Rovaniemi', body: 'O festival de rock de Rovaniemi, no Ounaspaviljonki. Em 2027 o Simerock completa 25 anos, e a organização o chama de maior evento da Lapônia.' },
    'zh-CN': { name: 'Simerock', city: '罗瓦涅米', body: '罗瓦涅米的摇滚音乐节，在 Ounaspaviljonki 举行。2027 年 Simerock 迎来 25 周年，主办方称其为拉普兰最大的活动。' },
    ko: { name: 'Simerock', city: '로바니에미', body: 'Ounaspaviljonki에서 열리는 로바니에미의 록 페스티벌입니다. 2027년에 25주년을 맞으며, 주최 측은 라플란드 최대의 행사라고 소개합니다.' },
    fr: { name: 'Simerock', city: 'Rovaniemi', body: "Le festival rock de Rovaniemi, à l'Ounaspaviljonki. En 2027, Simerock fête ses 25 ans, et l'organisateur le présente comme le plus grand événement de Laponie." },
    it: { name: 'Simerock', city: 'Rovaniemi', body: "Il festival rock di Rovaniemi, all'Ounaspaviljonki. Nel 2027 Simerock compie 25 anni, e gli organizzatori lo definiscono il più grande evento della Lapponia." },
    nl: { name: 'Simerock', city: 'Rovaniemi', body: 'Het rockfestival van Rovaniemi in Ounaspaviljonki. In 2027 bestaat Simerock 25 jaar, en de organisator noemt het het grootste evenement van Lapland.' },
    sv: { name: 'Simerock', city: 'Rovaniemi', body: 'Rovaniemis rockfestival på Ounaspaviljonki. 2027 fyller Simerock 25 år, och arrangören kallar den Lapplands största evenemang.' },
  } },
  // ijahisidja.fi: "Ijahis idja 20.-21.8.2027"; 2026: "Ijahis idjassa 2800 kävijää", etkot to 13.8. Wilderness Hotel
  // Juutua klo 22, ohjelma Sajoksessa (16.10.2026).
  { id: 'ijahis-idja', start: '2027-08-20', end: '2027-08-21', t: {
    en: { name: 'Ijahis Idja Sámi Music Festival', city: 'Inari', body: 'Indigenous music festival at Sajos, the Sámi cultural centre. The 2026 festival drew 2 800 visitors; its pre-party was a Thursday-night concert at Wilderness Hotel Juutua.' },
    fi: { name: 'Ijahis Idja -saamelaismusiikkifestivaali', city: 'Inari', body: 'Alkuperäiskansojen musiikkifestivaali saamelaiskulttuurikeskus Sajoksessa. Vuonna 2026 kävijöitä oli 2 800, ja etkoina oli torstai-illan konsertti Wilderness Hotel Juutuassa.' },
    de: { name: 'Ijahis Idja: Samisches Musikfestival', city: 'Inari', body: 'Indigenes Musikfestival im samischen Kulturzentrum Sajos. 2026 kamen 2 800 Besucher; zum Auftakt gab es am Donnerstagabend ein Konzert im Wilderness Hotel Juutua.' },
    ja: { name: 'Ijahis Idjaサーミ音楽フェスティバル', city: 'イナリ', body: 'サーミ文化センターSajosで開かれる先住民の音楽フェス。2026年の来場者は2,800人で、木曜の夜にはWilderness Hotel Juutuaで前夜祭コンサートがありました。' },
    es: { name: 'Festival de música sami Ijahis Idja', city: 'Inari', body: 'Festival de música indígena en el Sajos, el centro cultural sami. La edición de 2026 reunió a 2.800 visitantes; la fiesta previa fue un concierto el jueves por la noche en el Wilderness Hotel Juutua.' },
    'pt-BR': { name: 'Festival de música sámi Ijahis Idja', city: 'Inari', body: 'Festival de música indígena no Sajos, o centro cultural sámi. A edição de 2026 reuniu 2.800 visitantes; o esquenta foi um show na quinta à noite no Wilderness Hotel Juutua.' },
    'zh-CN': { name: 'Ijahis Idja 萨米音乐节', city: '伊纳里', body: '在萨米文化中心 Sajos 举办的原住民音乐节。2026 年有 2,800 名观众；前夜派对是周四晚上在 Wilderness Hotel Juutua 的音乐会。' },
    ko: { name: 'Ijahis Idja 사미 음악 페스티벌', city: '이나리', body: '사미 문화센터 Sajos에서 열리는 원주민 음악 페스티벌입니다. 2026년에는 2,800명이 찾았고, 목요일 밤 Wilderness Hotel Juutua에서 전야 콘서트가 열렸습니다.' },
    fr: { name: 'Festival de musique sámi Ijahis Idja', city: 'Inari', body: "Festival de musique autochtone au Sajos, le centre culturel sámi. L'édition 2026 a attiré 2 800 visiteurs ; l'avant-soirée était un concert le jeudi soir au Wilderness Hotel Juutua." },
    it: { name: 'Ijahis Idja, festival di musica sámi', city: 'Inari', body: "Festival di musica indigena al Sajos, il centro culturale sámi. L'edizione 2026 ha richiamato 2.800 visitatori; la festa d'apertura è stata un concerto il giovedì sera al Wilderness Hotel Juutua." },
    nl: { name: 'Ijahis Idja, Samisch muziekfestival', city: 'Inari', body: 'Festival voor inheemse muziek in het Sajos, het Samische cultuurcentrum. De editie van 2026 trok 2.800 bezoekers; het voorfeest was een concert op donderdagavond in Wilderness Hotel Juutua.' },
    sv: { name: 'Ijahis Idja, samisk musikfestival', city: 'Inari', body: 'Urfolksmusikfestival på Sajos, det samiska kulturcentret. 2026 kom 2 800 besökare; förfesten var en konsert på torsdagskvällen på Wilderness Hotel Juutua.' },
  } },
  // airguitarworldchampionships.com: "Ilmakitaransoiton MM-kisat 2027 järjestetään 25. – 27. elokuuta"; 2026: finaali Delta
  // Life -lavalla suistossa, "ikärajaton ja pääsymaksuton"; kansallisia osakilpailuja "yli kymmenessä maassa" (16.10.2026).
  { id: 'air-guitar', start: '2027-08-25', end: '2027-08-27', t: {
    en: { name: 'Air Guitar World Championships', city: 'Oulu', body: "The world championships of air guitar. National qualifiers run in more than ten countries; in 2026 the finals were free, open to all ages and held on a stage in Oulu's river delta." },
    fi: { name: 'Ilmakitaransoiton MM-kisat', city: 'Oulu', body: 'Ilmakitaransoiton maailmanmestaruuskisat. Kansallisia karsintoja järjestetään yli kymmenessä maassa; vuonna 2026 finaalit olivat ilmaiset, ikärajattomat ja Oulujoen suistoon rakennetulla lavalla.' },
    de: { name: 'Luftgitarren-WM', city: 'Oulu', body: 'Die Weltmeisterschaft im Luftgitarrespielen. Nationale Vorentscheide gibt es in mehr als zehn Ländern; 2026 war das Finale kostenlos, ohne Altersgrenze und auf einer Bühne im Flussdelta von Oulu.' },
    ja: { name: 'エアギター世界選手権', city: 'オウル', body: 'エアギターの世界選手権。各国の予選は10か国以上で開かれ、2026年の決勝は入場無料、年齢制限なしで、オウルの河口デルタに設けられたステージで行われました。' },
    es: { name: 'Mundiales de Air Guitar', city: 'Oulu', body: 'El campeonato mundial de guitarra imaginaria. Hay clasificatorias nacionales en más de diez países; en 2026 las finales fueron gratuitas, para todas las edades y en un escenario en el delta del río de Oulu.' },
    'pt-BR': { name: 'Mundial de Air Guitar', city: 'Oulu', body: 'O campeonato mundial de guitarra imaginária. Há seletivas nacionais em mais de dez países; em 2026 as finais foram gratuitas, para todas as idades e num palco no delta do rio, em Oulu.' },
    'zh-CN': { name: '空气吉他世锦赛', city: '奥卢', body: '空气吉他世界锦标赛。各国预选赛在十多个国家举行；2026 年决赛免费、不限年龄，舞台搭在奥卢的河口三角洲上。' },
    ko: { name: '에어 기타 세계 선수권', city: '오울루', body: '에어 기타 세계 선수권 대회입니다. 국가별 예선은 10개국 이상에서 열리며, 2026년 결승은 무료에 나이 제한 없이 오울루 강 하구 삼각주의 무대에서 열렸습니다.' },
    fr: { name: 'Air Guitar World Championships', city: 'Oulu', body: "Le championnat du monde d'air guitar. Des sélections nationales ont lieu dans plus de dix pays ; en 2026, les finales étaient gratuites, ouvertes à tous les âges et sur une scène dans le delta du fleuve, à Oulu." },
    it: { name: 'Campionati mondiali di air guitar', city: 'Oulu', body: "Il campionato del mondo di chitarra immaginaria. Le selezioni nazionali si tengono in più di dieci paesi; nel 2026 le finali erano gratuite, aperte a tutte le età e su un palco nel delta del fiume a Oulu." },
    nl: { name: 'Air Guitar World Championships', city: 'Oulu', body: 'Het wereldkampioenschap luchtgitaar. Nationale voorrondes worden in meer dan tien landen gehouden; in 2026 waren de finales gratis, voor alle leeftijden en op een podium in de rivierdelta van Oulu.' },
    sv: { name: 'Air Guitar World Championships', city: 'Oulu', body: 'VM i luftgitarr. Nationella uttagningar hålls i mer än tio länder; 2026 var finalerna gratis, utan åldersgräns och på en scen i älvdeltat i Oulu.' },
  } },
];

/* Palaavat tapahtumat ilman julkaistua seuraavaa päivää (tarkistettu 16.10.2026):
 *   Frozen People: frozenpeople.fi yhä "Feb 28, 2026 · Oulu".
 *   Elojazz: elojazz.com "Nähdään jälleen Elojazzeilla 2027!" ilman päivää; 2026 "30.7.–2.8.2026".
 *   Ylläs Soikoon: yllassoikoon.fi "Ylläs Soikoon 2026 järjestetään 8.-11.7.2026", 2027 ei julkaistu.
 * Tapahtuma siirtyy CALENDARiin heti kun järjestäjä julkaisee päivän. */
const PENDING: PendingEvent[] = [
  { id: 'frozen-people', lastStart: '2026-02-28', t: {
    en: { name: 'Frozen People Festival', city: 'Oulu' }, fi: { name: 'Frozen People Festival', city: 'Oulu' },
    de: { name: 'Frozen People Festival', city: 'Oulu' }, ja: { name: 'Frozen People Festival', city: 'オウル' },
    es: { name: 'Frozen People Festival', city: 'Oulu' }, 'pt-BR': { name: 'Frozen People Festival', city: 'Oulu' },
    'zh-CN': { name: 'Frozen People Festival', city: '奥卢' }, ko: { name: 'Frozen People Festival', city: '오울루' },
    fr: { name: 'Frozen People Festival', city: 'Oulu' }, it: { name: 'Frozen People Festival', city: 'Oulu' },
    nl: { name: 'Frozen People Festival', city: 'Oulu' }, sv: { name: 'Frozen People Festival', city: 'Oulu' },
  } },
  { id: 'yllas-soikoon', lastStart: '2026-07-08', lastEnd: '2026-07-11', t: {
    en: { name: 'Ylläs Soikoon dance festival', city: 'Ylläs' }, fi: { name: 'Ylläs Soikoon -tanssitapahtuma', city: 'Ylläs' },
    de: { name: 'Ylläs Soikoon, Tanzfestival', city: 'Ylläs' }, ja: { name: 'Ylläs Soikoonダンスフェスティバル', city: 'ユッラス' },
    es: { name: 'Festival de baile Ylläs Soikoon', city: 'Ylläs' }, 'pt-BR': { name: 'Festival de dança Ylläs Soikoon', city: 'Ylläs' },
    'zh-CN': { name: 'Ylläs Soikoon 舞蹈节', city: '于拉斯' }, ko: { name: 'Ylläs Soikoon 댄스 페스티벌', city: '윌래스' },
    fr: { name: 'Festival de danse Ylläs Soikoon', city: 'Ylläs' }, it: { name: 'Ylläs Soikoon, festival di ballo', city: 'Ylläs' },
    nl: { name: 'Dansfestival Ylläs Soikoon', city: 'Ylläs' }, sv: { name: 'Dansfestivalen Ylläs Soikoon', city: 'Ylläs' },
  } },
  { id: 'elojazz', lastStart: '2026-07-30', lastEnd: '2026-08-02', t: {
    en: { name: 'Elojazz Festival', city: 'Oulu' }, fi: { name: 'Elojazz-festivaali', city: 'Oulu' },
    de: { name: 'Elojazz-Festival', city: 'Oulu' }, ja: { name: 'Elojazzフェスティバル', city: 'オウル' },
    es: { name: 'Festival Elojazz', city: 'Oulu' }, 'pt-BR': { name: 'Festival Elojazz', city: 'Oulu' },
    'zh-CN': { name: 'Elojazz 音乐节', city: '奥卢' }, ko: { name: 'Elojazz 페스티벌', city: '오울루' },
    fr: { name: 'Festival Elojazz', city: 'Oulu' }, it: { name: 'Festival Elojazz', city: 'Oulu' },
    nl: { name: 'Elojazz Festival', city: 'Oulu' }, sv: { name: 'Elojazz Festival', city: 'Oulu' },
  } },
];

/* `endsBy` = viimeinen päivä, jonka jälkeen tapahtuma on varmasti ohi (ISO). */
type Item = { id: string; name: string; date: string; city: string; body: string; endsBy: string };
type MonthBlock = { year: number; monthKey: MonthKey; items: Item[] };

const SORTED = [...CALENDAR].sort((a, b) =>
  a.start.localeCompare(b.start) || (a.end ?? a.start).localeCompare(b.end ?? b.start));

/* Kuukausilohkot johdetaan samasta järjestetystä listasta jokaiselle kielelle, joten lohkot ja niiden
   rivit ovat kaikilla kielillä samassa järjestyksessä rakenteen vuoksi, ei sopimuksen. */
function blocksFor(lang: Lang): MonthBlock[] {
  const out: MonthBlock[] = [];
  for (const e of SORTED) {
    const [y, m] = e.start.split('-').map(Number);
    const monthKey = MONTH_KEYS[m - 1];
    let blk = out[out.length - 1];
    if (!blk || blk.year !== y || blk.monthKey !== monthKey) {
      blk = { year: y, monthKey, items: [] };
      out.push(blk);
    }
    const tx = e.t[lang];
    blk.items.push({ id: e.id, name: tx.name, city: tx.city, body: tx.body, date: formatDays(lang, e.start, e.end), endsBy: e.end ?? e.start });
  }
  return out;
}

const EVENTS = Object.fromEntries(LANGS.map((l) => [l, blocksFor(l)])) as Record<Lang, MonthBlock[]>;

const EVENT_COUNT = CALENDAR.length;

/* Local calendar day as YYYY-MM-DD. Deliberately the READER's clock, not build time:
   a static page stamped at deploy would call events "past" too early or too late and go stale the
   moment it shipped. toISOString() is wrong here — it converts to UTC, so before 02:00 Finnish time
   it reports yesterday. */
function todayLocalIso(d: Date): string {
  const p = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

/* Which entries are over, keyed by [month block][item]. The blocks are the same for every language. */
function pastFlags(today: string): boolean[][] {
  return EVENTS.en.map((m) => m.items.map((e) => e.endsBy < today));
}

/* Litteä lista tulevista tapahtumista aikajärjestyksessä (etusivu, PrimeTime). Lukijan kello, ei build-aika. */
export function upcomingEvents(lang: Lang, count: number, skip = 0) {
  const today = todayLocalIso(new Date());
  const out: (Item & { monthKey: MonthKey })[] = [];
  for (const m of EVENTS[lang] ?? EVENTS.en) {
    for (const e of m.items) if (e.endsBy >= today) out.push({ ...e, monthKey: m.monthKey });
  }
  out.sort((a, b) => a.endsBy.localeCompare(b.endsBy));
  return out.slice(skip, skip + count);
}

/* Kesäsivun tapahtumakortin aika: seuraava kalenterissa oleva kerta, tai jos järjestäjä ei ole julkaissut
   päivää, merkintä "päivä ei vielä julkinen" ja edellisen kerran päivä. */
export function eventWhen(lang: Lang, id: string): string {
  const today = todayLocalIso(new Date());
  const runs = SORTED.filter((e) => e.id === id);
  const next = runs.find((e) => (e.end ?? e.start) >= today) ?? runs[runs.length - 1];
  if (next) return formatDays(lang, next.start, next.end);
  const p = PENDING.find((e) => e.id === id);
  const c = COPY[lang]?.events ?? COPY.en.events;
  return p ? `${c.pendingH} · ${c.lastEdition}${labelSep(lang)}${formatDays(lang, p.lastStart, p.lastEnd)}` : '';
}

export { EVENTS, EVENT_COUNT, PENDING, todayLocalIso, pastFlags };
export type { Item, MonthBlock, PendingEvent };
