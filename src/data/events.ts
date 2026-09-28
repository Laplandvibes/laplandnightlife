import type { Lang } from '../i18n/useLang';
import { COPY } from '../locales/copy';

/* Tapahtumakalenterin data + apurit. Irrotettu `pages/Events.tsx`:sta 2026-09-09.
 *
 * Vesa 9.9.: *"edelleen jo menneitä juttuja etusivulla? talven tapahtumat? eikö
 * automaattisesti etsitä näitä ja lisäillä?"* — etusivun kolme nostoa olivat
 * käsin valittuja copy-kenttiä ILMAN koneluettavaa päivää, joten ne eivät voineet
 * vanheta itsestään. Kalenterilla sen sijaan ON `endsBy`, ja 25.8. rakennettu
 * mennyt/tuleva-erottelu toimi jo /events-sivulla. Nyt sama lähde ajaa myös
 * etusivun: `upcomingEvents()` palauttaa seuraavat tapahtumat lukijan kellon
 * mukaan, joten menneet putoavat pois ilman että kukaan muistaa poistaa niitä.
 */


/* endsBy = the day after which this event is definitely over, ISO. For events with an
   exact date it is the last day; for the ones the organiser only scopes to part of a
   month ("Late Jan") it is that month's last day — an honest upper bound, not a guess
   at the actual day. It lives ONLY on the EN list and is read by index for every other
   language (see pastFlags), so twelve locales can never disagree about what has
   already happened. `date` is translated prose and is not machine-readable. */
type Item = { name: string; date: string; city: string; body: string; endsBy?: string };
type MonthBlock = { monthKey: keyof typeof COPY.en.events.months; items: Item[] };

/* Every date here comes from the organiser's own site — no "Late August" guesses.
   Until 2026-08-24 the vague ones were wrong by up to three months: Jutajaiset sat
   in the July block but runs in October, and Simerock was billed "Late August"
   when it had already happened on 7–8 August.
     Qstock      24–25 Jul  qstock.fi (attendance below)
     Elojazz     30 Jul–2 Aug  elojazz.com "Vuonna 2026 Elojazz järjestetään 30.7.–2.8.2026."
     Simerock    7–8 Aug    simerock.com "Rovaniemen Simerock, Rovaniemellä 7.-8.8. 2026"
     Ijahis Idja 14–15 Aug  ijahisidja.fi
     Air Guitar  28–29 Aug  airguitarworldchampionships.com (event runs 26–29 Aug)
     Jutajaiset  22–25 Oct  jutajaiset.nuorisoseurat.fi "järjestetään Rovaniemellä 22.–25.10.2026"
   Qstock attendance = 40 000 over two days (2026 edition, sold out), from the
   operator's post-festival report 26.7.2026: "Tapahtuma keräsi yhteensä 40 000
   kävijää kahden päivän aikana."
   https://qstock.fi/uutiset/kiitos-40-000-kertaa-loppuunmyyty-qstock-sujui-mallikkaasti/
   Third-party write-ups quote other totals for other years; take the figure from
   qstock.fi for the edition being described. Dates and the attendance figure must
   stay in sync with copy.*.ts summer.e4–e8When/e8Body and home.events.e3Desc
   across all 12 languages. */
const EVENTS_BASE: Record<Lang, MonthBlock[]> = {
  en: [
    { monthKey: 'January', items: [
      { name: 'Skábmagovat Indigenous Film Festival', date: 'Late Jan 2026', city: 'Inari', body: 'Indigenous film festival inside Sajos. Joik concerts, dark-time screenings, Sámi dinner programmes.', endsBy: '2026-01-31' },
      { name: 'Arctic Lapland Rally', date: 'Jan 23–24, 2026', city: 'Rovaniemi', body: 'Two days. Roy Club sells out. The non-rally crowd treat it as Friday.', endsBy: '2026-01-24' },
    ]},
    { monthKey: 'February', items: [
      { name: 'Sami Week / Sámi Soveeknaki', date: 'Early Feb', city: 'Rovaniemi', body: 'Reindeer races, Sámi music, joik concerts, evening cultural events.', endsBy: '2026-02-28' },
      { name: 'Frozen People Festival', date: 'Feb 21, 2026', city: 'Oulu', body: 'European Capital of Culture winter electronic festival. Outdoor + indoor stages, –20 °C.', endsBy: '2026-02-21' },
    ]},
    { monthKey: 'March', items: [
      { name: 'Peak Levi Concert Weeks', date: 'Mid-Feb – Mid-Apr', city: 'Levi', body: 'Hullu Poro Areena hosts Finnish touring acts every Wed–Sat. Tickets sell out a week ahead.', endsBy: '2026-04-30' },
    ]},
    { monthKey: 'April', items: [
      { name: 'Yllas Soikoon Music Festival', date: 'Mid-April', city: 'Ylläs', body: 'End-of-season ski-festival. DJ sets on the slopes, outdoor concerts, spring sun.', endsBy: '2026-04-30' },
      { name: 'SnowCastle final weeks', date: 'Through Apr', city: 'Kemi', body: 'Last chance for the ice bar before April thaw. Vodka shots in ice glasses.', endsBy: '2026-04-30' },
    ]},
    { monthKey: 'June', items: [
      { name: 'Midnight Sun Window opens', date: 'Jun 6, 2026', city: 'Above Arctic Circle', body: 'Sun stops setting. Continues until July 7.', endsBy: '2026-07-07' },
      { name: 'Midnight Sun Film Festival', date: 'Jun 10–14, 2026', city: 'Sodankylä', body: '80+ films. The 03:00 screening at the 17th-century wooden church is the most photographed.', endsBy: '2026-06-14' },
      { name: 'Juhannus / Midsummer', date: 'Jun 19–21, 2026', city: 'Everywhere', body: 'Bonfires, sauna, lake swims, cabin weekends. Cities empty out; locals leave.', endsBy: '2026-06-21' },
      { name: 'Air Guitar World Championships qualifier', date: 'Jun, Oulu', city: 'Oulu', body: 'Qualifier for the August Oulu finals. ECoC2026 expanded programme.', endsBy: '2026-06-30' },
    ]},
    { monthKey: 'July', items: [
      { name: 'Qstock Festival 2026', date: 'Jul 24–25, 2026', city: 'Oulu', body: "Northern Finland's biggest rock festival. 40 000 visitors, two days, Kuusisaari park.", endsBy: '2026-07-25' },
      { name: 'Elojazz Festival', date: 'Jul 30 – Aug 2, 2026', city: 'Oulu', body: 'Four-day jazz week: outdoor stages around Rotuaari, main concerts at Tarkastamo.', endsBy: '2026-08-02' },
    ]},
    { monthKey: 'August', items: [
      { name: 'Simerock', date: 'Aug 7–8, 2026', city: 'Rovaniemi', body: 'Early-August rock festival at Ounaspaviljonki. Local Lapland crowd, smaller than Qstock but heavier.', endsBy: '2026-08-08' },
      { name: 'Ijahis Idja Sámi Music Festival', date: 'Aug 14–15, 2026', city: 'Inari', body: 'Indigenous music festival at Sajos. The closest thing to a club night Inari has.', endsBy: '2026-08-15' },
      { name: 'Air Guitar World Championships Final', date: 'Aug 28–29, 2026', city: 'Oulu', body: 'The actual world finals at Pokkinen park. 40 countries, locals from age 8 to 80.', endsBy: '2026-08-29' },
    ]},
    { monthKey: 'October', items: [
      { name: 'Jutajaiset Folklore Festival', date: 'Oct 22–25, 2026', city: 'Rovaniemi', body: 'International folklore festival. Parades, performances, evening concerts.', endsBy: '2026-10-25' },
    ]},
    { monthKey: 'November', items: [
      { name: 'Levi FIS Alpine Ski World Cup', date: 'Nov 14–15, 2026', city: 'Levi', body: 'World Cup weekend. Hullu Poro Areena hosts after-parties; book accommodation a year ahead.', endsBy: '2026-11-15' },
      { name: 'Ruka FIS Cross-Country Opening', date: 'Nov 27–29, 2026', city: 'Ruka', body: 'World-cup season opener. Restaurant Zone at the slope base is the after-party home.', endsBy: '2026-11-29' },
    ]},
    { monthKey: 'December', items: [
      { name: 'Christmas in Rovaniemi', date: 'Dec 1–24, 2026', city: 'Rovaniemi', body: 'Tourist peak. Bars run extended hours; Roy Club queues are 45 minutes deep on Saturdays.', endsBy: '2026-12-24' },
      { name: "New Year's Eve fireworks", date: 'Dec 31, 2026', city: 'All cities', body: "Public fireworks at midnight: Rovaniemi central square, Oulu's market square, Levi slope.", endsBy: '2026-12-31' },
    ]},
  ],
  fi: [
    { monthKey: 'January', items: [
      { name: 'Skábmagovat-alkuperäiskansojen filmifestivaali', date: 'Tammikuun loppu 2026', city: 'Inari', body: 'Alkuperäiskansojen filmifestivaali Sajoksessa. Joikukonsertit, pimeän ajan näytökset, saamelaisateriaohjelmat.' },
      { name: 'Arctic Lapland Rally', date: '23.–24.1.2026', city: 'Rovaniemi', body: 'Kaksi päivää. Roy Club myydään loppuun. Muutkin kuin rallikansa pitävät tätä perjantai-iltana.' },
    ]},
    { monthKey: 'February', items: [
      { name: 'Saamelaisten viikko / Sámi Soveeknaki', date: 'Helmikuun alku', city: 'Rovaniemi', body: 'Poroajot, saamelaismusiikkia, joikukonsertit, iltakulttuuritapahtumat.' },
      { name: 'Frozen People Festival', date: '21.2.2026', city: 'Oulu', body: 'Euroopan kulttuuripääkaupungin talvinen elektronisen musiikin festivaali. Ulko- ja sisälavat, –20 °C.' },
    ]},
    { monthKey: 'March', items: [
      { name: 'Levin huippukonserttiviikot', date: 'Helmi puolivälistä huhtikuun puoliväliin', city: 'Levi', body: 'Hullu Poro Areena isännöi suomalaisia kiertueartisteja joka keskiviikosta lauantaihin. Liput myydään loppuun viikkoa etukäteen.' },
    ]},
    { monthKey: 'April', items: [
      { name: 'Ylläs Soikoon -musiikkifestivaali', date: 'Huhtikuun puoliväli', city: 'Ylläs', body: 'Kauden lopun hiihtofestivaali. DJ-setit rinteillä, ulkoilmakonsertit, kevätaurinko.' },
      { name: 'LumiLinnan viimeiset viikot', date: 'Huhtikuu', city: 'Kemi', body: 'Viimeinen mahdollisuus jääbaariin ennen huhtikuun sulamista. Vodkashottina jäälaseissa.' },
    ]},
    { monthKey: 'June', items: [
      { name: 'Keskiyön auringon ikkuna avautuu', date: '6.6.2026', city: 'Napapiirin pohjoispuoli', body: 'Aurinko lakkaa laskemasta. Jatkuu 7. heinäkuuta saakka.' },
      { name: 'Keskiyön auringon filmifestivaali', date: '10.–14.6.2026', city: 'Sodankylä', body: 'Yli 80 elokuvaa. 03:00-näytös 1600-luvun puukirkossa on kuvatuin.' },
      { name: 'Juhannus', date: '19.–21.6.2026', city: 'Kaikkialla', body: 'Kokot, sauna, järviuinnit, mökkiviikonloput. Kaupungit tyhjenevät; paikalliset lähtevät.' },
      { name: 'Ilmakitaransoiton MM-karsinta', date: 'Kesäkuu, Oulu', city: 'Oulu', body: 'Karsinta elokuun Oulun finaaleihin. ECoC2026:n laajennettu ohjelma.' },
    ]},
    { monthKey: 'July', items: [
      { name: 'Qstock-festivaali 2026', date: '24.–25.7.2026', city: 'Oulu', body: 'Pohjois-Suomen suurin rockfestivaali. 40 000 kävijää, kaksi päivää, Kuusisaaren puisto.' },
      { name: 'Elojazz-festivaali', date: '30.7.–2.8.2026', city: 'Oulu', body: 'Nelipäiväinen jazz-viikko: ulkoilmalavat Rotuaarin ympärillä, pääkonsertit Tarkastamolla.' },
    ]},
    { monthKey: 'August', items: [
      { name: 'Simerock', date: '7.–8.8.2026', city: 'Rovaniemi', body: 'Elokuun alun rockfestivaali Ounaspaviljongilla. Paikallinen Lappi-yleisö, Qstockia pienempi mutta raskaampi.' },
      { name: 'Ijahis Idja -saamelaismusiikkifestivaali', date: '14.–15.8.2026', city: 'Inari', body: 'Alkuperäiskansojen musiikkifestivaali Sajoksessa. Lähimpänä klubi-iltaa, mitä Inarissa tarjotaan.' },
      { name: 'Ilmakitaransoiton MM-finaali', date: '28.–29.8.2026', city: 'Oulu', body: 'Varsinaiset MM-finaalit Pokkisen puistossa. 40 maata, paikalliset 8-vuotiaista 80-vuotiaisiin.' },
    ]},
    { monthKey: 'October', items: [
      { name: 'Jutajaiset-folkloristifestivaali', date: '22.–25.10.2026', city: 'Rovaniemi', body: 'Kansainvälinen folkloristifestivaali. Paraatit, esitykset, iltakonsertit.' },
    ]},
    { monthKey: 'November', items: [
      { name: 'Levi FIS Alpine Ski World Cup', date: '14.–15.11.2026', city: 'Levi', body: 'Maailmancup-viikonloppu. Hullu Poro Areena isännöi jatkot; varaa majoitus vuotta etukäteen.' },
      { name: 'Rukan FIS-maastohiihdon avaus', date: '27.–29.11.2026', city: 'Ruka', body: 'Maailmancup-kauden avaus. Restaurant Zone rinteen juurella on jatkojen koti.' },
    ]},
    { monthKey: 'December', items: [
      { name: 'Joulu Rovaniemellä', date: '1.–24.12.2026', city: 'Rovaniemi', body: 'Turistihuippu. Baarit pidentävät aukioloaikoja; Roy Clubin jonot 45 minuutin pituisia lauantaisin.' },
      { name: 'Uudenvuoden ilotulitukset', date: '31.12.2026', city: 'Kaikki kaupungit', body: 'Julkiset ilotulitukset keskiyöllä: Rovaniemen keskustaaukio, Oulun kauppatori, Levin rinne.' },
    ]},
  ],
  de: [
    { monthKey: 'January', items: [
      { name: 'Skábmagovat – Indigenes Filmfestival', date: 'Ende Januar 2026', city: 'Inari', body: 'Indigenes Filmfestival im Sajos. Joik-Konzerte, Vorführungen in der Dunkelzeit, samische Dinner-Programme.' },
      { name: 'Arctic Lapland Rally', date: '23.–24. Jan 2026', city: 'Rovaniemi', body: 'Zwei Tage. Der Roy Club ist ausverkauft. Auch Nicht-Rallye-Gäste behandeln es als Freitagabend.' },
    ]},
    { monthKey: 'February', items: [
      { name: 'Samische Woche / Sámi Soveeknaki', date: 'Anfang Februar', city: 'Rovaniemi', body: 'Rentierrennen, samische Musik, Joik-Konzerte, abendliche Kulturveranstaltungen.' },
      { name: 'Frozen People Festival', date: '21. Feb 2026', city: 'Oulu', body: 'Winterliches Electronic-Festival zur Kulturhauptstadt Europas. Open-Air- und Indoor-Bühnen, –20 °C.' },
    ]},
    { monthKey: 'March', items: [
      { name: 'Levi-Spitzen-Konzertwochen', date: 'Mitte Feb – Mitte Apr', city: 'Levi', body: 'Hullu Poro Areena empfängt finnische Tourneeacts jeden Mi–Sa. Tickets sind eine Woche im Voraus ausverkauft.' },
    ]},
    { monthKey: 'April', items: [
      { name: 'Ylläs Soikoon Musikfestival', date: 'Mitte April', city: 'Ylläs', body: 'Saisonabschluss-Skifestival. DJ-Sets an den Pisten, Open-Air-Konzerte, Frühlingssonne.' },
      { name: 'SnowCastle letzte Wochen', date: 'Durchgehend April', city: 'Kemi', body: 'Letzte Chance auf die Eisbar vor dem April-Tauwetter. Wodka-Shots in Eisgläsern.' },
    ]},
    { monthKey: 'June', items: [
      { name: 'Mitternachtssonnen-Fenster beginnt', date: '6. Jun 2026', city: 'Nördlich des Polarkreises', body: 'Die Sonne hört auf unterzugehen. Bis zum 7. Juli.' },
      { name: 'Filmfestival der Mitternachtssonne', date: '10.–14. Jun 2026', city: 'Sodankylä', body: 'Über 80 Filme. Die Vorführung um 03:00 Uhr in der Holzkirche aus dem 17. Jahrhundert ist die meistfotografierte.' },
      { name: 'Juhannus / Mittsommer', date: '19.–21. Jun 2026', city: 'Überall', body: 'Lagerfeuer, Sauna, Seebaden, Hütten-Wochenenden. Die Städte leeren sich; die Einheimischen fahren raus.' },
      { name: 'Luftgitarren-WM-Qualifikation', date: 'Juni 2026', city: 'Oulu', body: 'Qualifikation für das August-Finale in Oulu. Erweitertes Programm zur Kulturhauptstadt 2026.' },
    ]},
    { monthKey: 'July', items: [
      { name: 'Qstock Festival 2026', date: '24.–25. Jul 2026', city: 'Oulu', body: 'Das größte Rockfestival Nordfinnlands. 40 000 Besucher, zwei Tage, Kuusisaari-Park.' },
      { name: 'Elojazz-Festival', date: '30. Jul – 2. Aug 2026', city: 'Oulu', body: 'Viertägige Jazzwoche: Open-Air-Bühnen rund um den Rotuaari, Hauptkonzerte im Tarkastamo.' },
    ]},
    { monthKey: 'August', items: [
      { name: 'Simerock', date: '7.–8. Aug 2026', city: 'Rovaniemi', body: 'Rockfestival Anfang August im Ounaspaviljonki. Lokales Lappland-Publikum, kleiner als Qstock, aber härter.' },
      { name: 'Ijahis Idja: Samisches Musikfestival', date: '14.–15. Aug 2026', city: 'Inari', body: 'Indigenes Musikfestival im Sajos. Das, was einem Clubabend in Inari am nächsten kommt.' },
      { name: 'Luftgitarren-WM-Finale', date: '28.–29. Aug 2026', city: 'Oulu', body: 'Das eigentliche Weltfinale im Pokkinen-Park. 40 Nationen, Einheimische zwischen 8 und 80.' },
    ]},
    { monthKey: 'October', items: [
      { name: 'Jutajaiset Folklorefestival', date: '22.–25. Okt 2026', city: 'Rovaniemi', body: 'Internationales Folklorefestival. Umzüge, Auftritte, Abendkonzerte.' },
    ]},
    { monthKey: 'November', items: [
      { name: 'FIS Ski-Weltcup alpin in Levi', date: '14.–15. Nov 2026', city: 'Levi', body: 'Weltcup-Wochenende. Hullu Poro Areena richtet die Aftershows aus; Unterkunft ein Jahr im Voraus buchen.' },
      { name: 'FIS Langlauf-Weltcup-Auftakt in Ruka', date: '27.–29. Nov 2026', city: 'Ruka', body: 'Weltcup-Saisoneröffnung. Das Restaurant Zone an der Talstation ist das Aftershow-Zuhause.' },
    ]},
    { monthKey: 'December', items: [
      { name: 'Weihnachten in Rovaniemi', date: '1.–24. Dez 2026', city: 'Rovaniemi', body: 'Touristen-Hochsaison. Bars haben verlängerte Öffnungszeiten; samstags 45-minütige Schlangen vor dem Roy Club.' },
      { name: 'Silvester-Feuerwerk', date: '31. Dez 2026', city: 'Alle Städte', body: 'Öffentliches Feuerwerk um Mitternacht: Hauptplatz in Rovaniemi, Marktplatz in Oulu, Skihang in Levi.' },
    ]},
  ],
  it: [
    { monthKey: 'January', items: [
      { name: 'Skábmagovat, festival del cinema indigeno', date: 'Fine gen 2026', city: 'Inari', body: 'Festival del cinema indigeno dentro il Sajos. Concerti di joik, proiezioni nel periodo buio, programmi di cena sámi.' },
      { name: 'Arctic Lapland Rally', date: '23–24 gen 2026', city: 'Rovaniemi', body: 'Due giorni. Il Roy Club va esaurito. Anche chi non segue il rally lo tratta come un venerdì sera.' },
    ]},
    { monthKey: 'February', items: [
      { name: 'Settimana sámi / Sámi Soveeknaki', date: 'Inizio feb', city: 'Rovaniemi', body: 'Corse di renne, musica sámi, concerti di joik, eventi culturali serali.' },
      { name: 'Frozen People Festival', date: '21 feb 2026', city: 'Oulu', body: 'Festival invernale di musica elettronica della Capitale europea della cultura. Palchi all\'aperto e al chiuso, −20 °C.' },
    ]},
    { monthKey: 'March', items: [
      { name: 'Settimane dei concerti di punta a Levi', date: 'Metà feb – metà apr', city: 'Levi', body: 'L\'Hullu Poro Areena ospita artisti finlandesi in tour ogni mer–sab. I biglietti si esauriscono con una settimana di anticipo.' },
    ]},
    { monthKey: 'April', items: [
      { name: 'Ylläs Soikoon, festival musicale', date: 'Metà aprile', city: 'Ylläs', body: 'Festival sciistico di fine stagione. Set DJ sulle piste, concerti all\'aperto, sole di primavera.' },
      { name: 'Ultime settimane dello SnowCastle', date: 'Per tutto apr', city: 'Kemi', body: 'Ultima occasione per il bar di ghiaccio prima del disgelo di aprile. Shot di vodka in bicchieri di ghiaccio.' },
    ]},
    { monthKey: 'June', items: [
      { name: 'Si apre la finestra del sole di mezzanotte', date: '6 giu 2026', city: 'A nord del Circolo Polare Artico', body: 'Il sole smette di tramontare. Continua fino al 7 luglio.' },
      { name: 'Festival del cinema del sole di mezzanotte', date: '10–14 giu 2026', city: 'Sodankylä', body: 'Oltre 80 film. La proiezione delle 03:00 nella chiesa di legno del XVII secolo è la più fotografata.' },
      { name: 'Juhannus / Mezza estate', date: '19–21 giu 2026', city: 'Ovunque', body: 'Falò, sauna, bagni nel lago, weekend in baita. Le città si svuotano; i locali partono.' },
      { name: 'Qualificazione ai Campionati mondiali di air guitar', date: 'Giugno, Oulu', city: 'Oulu', body: 'Qualificazione per le finali di agosto a Oulu. Programma ampliato ECoC2026.' },
    ]},
    { monthKey: 'July', items: [
      { name: 'Festival Qstock 2026', date: '24–25 lug 2026', city: 'Oulu', body: 'Il più grande festival rock del nord della Finlandia. 40.000 visitatori, due giorni, parco Kuusisaari.' },
      { name: 'Festival Elojazz', date: '30 lug – 2 ago 2026', city: 'Oulu', body: 'Quattro giorni di jazz: palchi all\'aperto attorno alla Rotuaari, concerti principali al Tarkastamo.' },
    ]},
    { monthKey: 'August', items: [
      { name: 'Simerock', date: '7–8 ago 2026', city: 'Rovaniemi', body: 'Festival rock di inizio agosto all\'Ounaspaviljonki. Pubblico locale della Lapponia, più piccolo di Qstock ma più pesante.' },
      { name: 'Ijahis Idja, festival di musica sámi', date: '14–15 ago 2026', city: 'Inari', body: 'Festival di musica indigena al Sajos. La cosa più vicina a una serata in club che Inari abbia.' },
      { name: 'Finale dei Campionati mondiali di air guitar', date: '28–29 ago 2026', city: 'Oulu', body: 'Le vere finali mondiali nel parco Pokkinen. 40 nazioni, locali dagli 8 agli 80 anni.' },
    ]},
    { monthKey: 'October', items: [
      { name: 'Festival folkloristico Jutajaiset', date: '22–25 ott 2026', city: 'Rovaniemi', body: 'Festival folkloristico internazionale. Sfilate, spettacoli, concerti serali.' },
    ]},
    { monthKey: 'November', items: [
      { name: 'Coppa del Mondo FIS di sci alpino a Levi', date: '14–15 nov 2026', city: 'Levi', body: 'Weekend di Coppa del Mondo. L\'Hullu Poro Areena ospita gli after party; prenoti l\'alloggio con un anno di anticipo.' },
      { name: 'Apertura FIS di sci di fondo a Ruka', date: '27–29 nov 2026', city: 'Ruka', body: 'Apertura della stagione di Coppa del Mondo. Il Restaurant Zone ai piedi della pista è la casa degli after party.' },
    ]},
    { monthKey: 'December', items: [
      { name: 'Natale a Rovaniemi', date: '1–24 dic 2026', city: 'Rovaniemi', body: 'Picco turistico. I bar allungano gli orari; il sabato la coda al Roy Club è di 45 minuti.' },
      { name: 'Fuochi d\'artificio di Capodanno', date: '31 dic 2026', city: 'Tutte le città', body: 'Fuochi pubblici a mezzanotte: piazza centrale di Rovaniemi, piazza del mercato di Oulu, pista di Levi.' },
    ]},
  ],
  fr: [
    { monthKey: 'January', items: [
      { name: 'Festival du film autochtone Skábmagovat', date: 'Fin janvier 2026', city: 'Inari', body: 'Festival du film autochtone au Sajos. Concerts de joik, projections aux heures sombres, dîners sámi au programme.' },
      { name: 'Arctic Lapland Rally', date: '23–24 janv. 2026', city: 'Rovaniemi', body: 'Deux jours. Le Roy Club affiche complet. Ceux qui ne suivent pas le rallye le vivent comme un grand vendredi.' },
    ]},
    { monthKey: 'February', items: [
      { name: 'Semaine sámi / Sámi Soveeknaki', date: 'Début février', city: 'Rovaniemi', body: 'Courses de rennes, musique sámi, concerts de joik, soirées culturelles.' },
      { name: 'Frozen People Festival', date: '21 févr. 2026', city: 'Oulu', body: 'Le festival électro hivernal de la Capitale européenne de la culture. Scènes en plein air et en salle, par −20 °C.' },
    ]},
    { monthKey: 'March', items: [
      { name: 'Semaines de concerts du pic de Levi', date: 'Mi-févr. – mi-avr.', city: 'Levi', body: `Le Hullu Poro Areena reçoit les artistes finlandais en tournée du mercredi au samedi. Les billets partent une semaine à l'avance.` },
    ]},
    { monthKey: 'April', items: [
      { name: 'Festival Ylläs Soikoon', date: 'Mi-avril', city: 'Ylläs', body: 'Le festival de fin de saison de ski. DJ sets sur les pistes, concerts en plein air, soleil de printemps.' },
      { name: 'Dernières semaines du SnowCastle', date: `Jusqu'à fin avril`, city: 'Kemi', body: `Dernière chance pour le bar de glace avant le dégel d'avril. Shots de vodka en verres de glace.` },
    ]},
    { monthKey: 'June', items: [
      { name: 'Ouverture de la fenêtre du soleil de minuit', date: '6 juin 2026', city: 'Au nord du cercle polaire', body: `Le soleil cesse de se coucher. Jusqu'au 7 juillet.` },
      { name: 'Festival du film sous le soleil de minuit', date: '10–14 juin 2026', city: 'Sodankylä', body: `Plus de 80 films. La séance de 3 h à l'église en bois du XVIIe siècle est la plus photographiée.` },
      { name: 'Juhannus / Saint-Jean', date: '19–21 juin 2026', city: 'Partout', body: 'Feux de joie, sauna, baignades dans les lacs, week-ends au chalet. Les villes se vident ; les locaux partent.' },
      { name: 'Qualifications des Air Guitar World Championships', date: 'Juin, Oulu', city: 'Oulu', body: `Qualifications pour les finales d'août à Oulu. Programme élargi de la Capitale de la culture 2026.` },
    ]},
    { monthKey: 'July', items: [
      { name: 'Festival Qstock 2026', date: '24–25 juil. 2026', city: 'Oulu', body: 'Le plus grand festival rock du nord de la Finlande. 40 000 visiteurs, deux jours, parc de Kuusisaari.' },
      { name: 'Festival Elojazz', date: '30 juil. – 2 août 2026', city: 'Oulu', body: 'Quatre jours de jazz : scènes en plein air autour de Rotuaari, grands concerts au Tarkastamo.' },
    ]},
    { monthKey: 'August', items: [
      { name: 'Simerock', date: '7–8 août 2026', city: 'Rovaniemi', body: `Festival rock de début août à l'Ounaspaviljonki. Public local de Laponie, plus petit que Qstock mais plus lourd.` },
      { name: 'Festival de musique sámi Ijahis Idja', date: '14–15 août 2026', city: 'Inari', body: 'Festival de musique autochtone au Sajos. Ce qui ressemble le plus à une soirée club à Inari.' },
      { name: 'Finale des Air Guitar World Championships', date: '28–29 août 2026', city: 'Oulu', body: 'Les vraies finales mondiales au parc Pokkinen. 40 pays, des locaux de 8 à 80 ans.' },
    ]},
    { monthKey: 'October', items: [
      { name: 'Festival de folklore Jutajaiset', date: '22–25 oct. 2026', city: 'Rovaniemi', body: 'Festival international de folklore. Défilés, spectacles, concerts en soirée.' },
    ]},
    { monthKey: 'November', items: [
      { name: 'Coupe du monde FIS de ski alpin à Levi', date: '14–15 nov. 2026', city: 'Levi', body: `Week-end de Coupe du monde. Le Hullu Poro Areena accueille les after ; réservez l'hébergement un an à l'avance.` },
      { name: 'Ouverture FIS de ski de fond à Ruka', date: '27–29 nov. 2026', city: 'Ruka', body: 'Ouverture de la saison de Coupe du monde. Le Restaurant Zone, au pied des pistes, est le QG des after.' },
    ]},
    { monthKey: 'December', items: [
      { name: 'Noël à Rovaniemi', date: '1–24 déc. 2026', city: 'Rovaniemi', body: 'Pic touristique. Les bars prolongent leurs horaires ; le samedi, la file du Roy Club atteint 45 minutes.' },
      { name: `Feux d'artifice du Nouvel An`, date: '31 déc. 2026', city: 'Toutes les villes', body: `Feux publics à minuit : place centrale de Rovaniemi, place du marché d'Oulu, piste de Levi.` },
    ]},
  ],
  ja: [
    { monthKey: 'January', items: [
      { name: 'Skábmagovat先住民映画祭', date: '2026年1月下旬', city: 'イナリ', body: 'Sajos館内で開かれる先住民の映画祭です。ヨイクのコンサート、極夜の上映会、サーミ料理のディナープログラムがあります。' },
      { name: 'Arctic Lapland Rally', date: '2026年1月23〜24日', city: 'ロヴァニエミ', body: '二日間の開催です。Roy Clubは満員になります。ラリーに興味のない人たちも、金曜の夜のように楽しみます。' },
    ]},
    { monthKey: 'February', items: [
      { name: 'サーミ週間 / Sámi Soveeknaki', date: '2月上旬', city: 'ロヴァニエミ', body: 'トナカイレース、サーミ音楽、ヨイクのコンサート、夜の文化イベント。' },
      { name: 'Frozen People Festival', date: '2026年2月21日', city: 'オウル', body: '欧州文化首都の冬のエレクトロニック音楽フェスです。屋外と屋内にステージがあり、気温は−20℃です。' },
    ]},
    { monthKey: 'March', items: [
      { name: 'レヴィのハイシーズン・コンサート週間', date: '2月中旬〜4月中旬', city: 'レヴィ', body: 'Hullu Poro Areenaには、毎週水曜から土曜まで、ツアー中のフィンランドのアーティストが出演します。チケットは一週間前に売り切れます。' },
    ]},
    { monthKey: 'April', items: [
      { name: 'Ylläs Soikoon音楽フェスティバル', date: '4月中旬', city: 'ユッラス', body: 'シーズン終わりのスキーフェス。ゲレンデでのDJセット、野外コンサート、春の日差し。' },
      { name: 'SnowCastle最後の数週間', date: '4月いっぱい', city: 'ケミ', body: '4月の雪解け前に氷のバーを楽しめる最後のチャンスです。氷のグラスでウォッカのショットを。' },
    ]},
    { monthKey: 'June', items: [
      { name: '白夜の窓が開く', date: '2026年6月6日', city: '北極圏以北', body: '太陽が沈まなくなります。7月7日まで続きます。' },
      { name: 'ミッドナイトサン映画祭', date: '2026年6月10〜14日', city: 'ソダンキュラ', body: '80本以上の映画。17世紀の木造教会で行われる午前3時の上映が、最も多く写真に撮られています。' },
      { name: 'ユハンヌス（夏至祭）', date: '2026年6月19〜21日', city: '各地', body: 'かがり火、サウナ、湖での水浴び、コテージで過ごす週末。地元の人が出ていき、街は空っぽになります。' },
      { name: 'エアギター世界選手権・予選', date: '6月、オウル', city: 'オウル', body: '8月にオウルで開かれる決勝への予選です。欧州文化首都2026の拡大プログラムの一環です。' },
    ]},
    { monthKey: 'July', items: [
      { name: 'Qstockフェスティバル2026', date: '2026年7月24〜25日', city: 'オウル', body: '北フィンランド最大のロックフェス。来場者40,000人、二日間、会場はKuusisaari公園。' },
      { name: 'Elojazzフェスティバル', date: '2026年7月30日〜8月2日', city: 'オウル', body: '四日間のジャズウィーク。Rotuaari周辺に屋外ステージが並び、メインコンサートはTarkastamoで開かれます。' },
    ]},
    { monthKey: 'August', items: [
      { name: 'Simerock', date: '2026年8月7〜8日', city: 'ロヴァニエミ', body: '8月初旬にOunaspaviljonkiで開かれるロックフェス。ラップランドの地元客が中心で、Qstockより小規模ですが、よりヘヴィです。' },
      { name: 'Ijahis Idjaサーミ音楽フェスティバル', date: '2026年8月14〜15日', city: 'イナリ', body: 'Sajosで開かれる先住民の音楽フェス。イナリで最もクラブイベントに近い存在です。' },
      { name: 'エアギター世界選手権・決勝', date: '2026年8月28〜29日', city: 'オウル', body: 'Pokkinen公園で行われる、本番の世界決勝です。40か国が参加し、会場には8歳から80歳までの地元の人たちが集まります。' },
    ]},
    { monthKey: 'October', items: [
      { name: 'Jutajaisetフォークロア・フェスティバル', date: '2026年10月22〜25日', city: 'ロヴァニエミ', body: '国際フォークロア祭。パレード、パフォーマンス、夜のコンサート。' },
    ]},
    { monthKey: 'November', items: [
      { name: 'FISアルペンスキー・ワールドカップ（レヴィ）', date: '2026年11月14〜15日', city: 'レヴィ', body: 'ワールドカップの週末。Hullu Poro Areenaでアフターパーティーが開かれます。宿泊は一年前に予約してください。' },
      { name: 'FISクロスカントリースキー開幕戦（ルカ）', date: '2026年11月27〜29日', city: 'ルカ', body: 'ワールドカップシーズンの開幕戦。ゲレンデのふもとにあるRestaurant Zoneが、アフターパーティーの拠点です。' },
    ]},
    { monthKey: 'December', items: [
      { name: 'ロヴァニエミのクリスマス', date: '2026年12月1〜24日', city: 'ロヴァニエミ', body: '観光のピーク。バーは営業時間を延長し、土曜日のRoy Clubには45分待ちの行列ができます。' },
      { name: '大晦日の花火', date: '2026年12月31日', city: '各都市', body: '真夜中、ロヴァニエミの中央広場、オウルのマーケット広場、レヴィのゲレンデで、誰でも見られる花火が上がります。' },
    ]},
  ],
  es: [
    { monthKey: 'January', items: [
      { name: 'Festival de cine indígena Skábmagovat', date: 'Finales de enero de 2026', city: 'Inari', body: 'Festival de cine indígena en el Sajos. Conciertos de joik, proyecciones en la noche polar y cenas samis.' },
      { name: 'Arctic Lapland Rally', date: '23–24 ene de 2026', city: 'Rovaniemi', body: 'Dos días. El Roy Club se llena por completo. Incluso quienes no siguen el rally lo viven como un viernes por la noche.' },
    ]},
    { monthKey: 'February', items: [
      { name: 'Semana Sami / Sámi Soveeknaki', date: 'Principios de febrero', city: 'Rovaniemi', body: 'Carreras de renos, música sami, conciertos de joik y eventos culturales por la noche.' },
      { name: 'Frozen People Festival', date: '21 feb de 2026', city: 'Oulu', body: 'Festival invernal de música electrónica de la Capital Europea de la Cultura. Escenarios al aire libre y bajo techo, a −20 °C.' },
    ]},
    { monthKey: 'March', items: [
      { name: 'Semanas de conciertos de temporada alta en Levi', date: 'Mediados de feb – mediados de abr', city: 'Levi', body: 'El Hullu Poro Areena recibe a artistas finlandeses de gira cada semana, de miércoles a sábado. Las entradas se agotan con una semana de anticipación.' },
    ]},
    { monthKey: 'April', items: [
      { name: 'Festival de música Ylläs Soikoon', date: 'Mediados de abril', city: 'Ylläs', body: 'Festival de esquí de fin de temporada. Sesiones de DJ en las pistas, conciertos al aire libre y sol de primavera.' },
      { name: 'Últimas semanas del SnowCastle', date: 'Todo abril', city: 'Kemi', body: 'Última oportunidad para el bar de hielo antes del deshielo de abril. Shots de vodka en vasos de hielo.' },
    ]},
    { monthKey: 'June', items: [
      { name: 'Se abre la ventana del sol de medianoche', date: '6 jun de 2026', city: 'Al norte del Círculo Polar Ártico', body: 'El sol deja de ponerse. Sigue así hasta el 7 de julio.' },
      { name: 'Festival de cine del sol de medianoche', date: '10–14 jun de 2026', city: 'Sodankylä', body: 'Más de 80 películas. La proyección de las 03:00 en la iglesia de madera del siglo XVII es la más fotografiada.' },
      { name: 'Juhannus / San Juan', date: '19–21 jun de 2026', city: 'En todas partes', body: 'Fogatas, sauna, baños en lagos y fines de semana en la cabaña. Las ciudades se vacían y la gente local se marcha.' },
      { name: 'Clasificatoria de los Mundiales de Air Guitar', date: 'Junio, Oulu', city: 'Oulu', body: 'Clasificatoria para la final de agosto en Oulu. Programa ampliado de la Capital Europea de la Cultura 2026.' },
    ]},
    { monthKey: 'July', items: [
      { name: 'Festival Qstock 2026', date: '24–25 jul de 2026', city: 'Oulu', body: 'El mayor festival de rock del norte de Finlandia. 40.000 visitantes, dos días, parque Kuusisaari.' },
      { name: 'Festival Elojazz', date: '30 jul – 2 ago de 2026', city: 'Oulu', body: 'Cuatro días de jazz: escenarios al aire libre alrededor de Rotuaari y conciertos principales en Tarkastamo.' },
    ]},
    { monthKey: 'August', items: [
      { name: 'Simerock', date: '7–8 ago de 2026', city: 'Rovaniemi', body: 'Festival de rock de principios de agosto en el Ounaspaviljonki. Público local de Laponia. Más pequeño que Qstock, pero con música más pesada.' },
      { name: 'Festival de música sami Ijahis Idja', date: '14–15 ago de 2026', city: 'Inari', body: 'Festival de música indígena en el Sajos. Lo más parecido a una noche de club que tiene Inari.' },
      { name: 'Final de los Mundiales de Air Guitar', date: '28–29 ago de 2026', city: 'Oulu', body: 'La verdadera final mundial, en el parque Pokkinen. 40 países y gente local de 8 a 80 años.' },
    ]},
    { monthKey: 'October', items: [
      { name: 'Festival de folclore Jutajaiset', date: '22–25 oct de 2026', city: 'Rovaniemi', body: 'Festival internacional de folclore. Desfiles, espectáculos y conciertos nocturnos.' },
    ]},
    { monthKey: 'November', items: [
      { name: 'Copa del Mundo FIS de esquí alpino en Levi', date: '14–15 nov de 2026', city: 'Levi', body: 'Fin de semana de Copa del Mundo. El Hullu Poro Areena acoge las fiestas después de las carreras; reserve el alojamiento con un año de anticipación.' },
      { name: 'Apertura FIS de esquí de fondo en Ruka', date: '27–29 nov de 2026', city: 'Ruka', body: 'Inicio de la temporada de Copa del Mundo. El Restaurant Zone, al pie de las pistas, es donde se celebran las fiestas después de las carreras.' },
    ]},
    { monthKey: 'December', items: [
      { name: 'Navidad en Rovaniemi', date: '1–24 dic de 2026', city: 'Rovaniemi', body: 'Temporada alta turística. Los bares amplían su horario; los sábados, la fila del Roy Club llega a 45 minutos.' },
      { name: 'Fuegos artificiales de Año Nuevo', date: '31 dic de 2026', city: 'Todas las ciudades', body: 'Fuegos artificiales públicos a medianoche: plaza central de Rovaniemi, plaza del mercado de Oulu y pista de Levi.' },
    ]},
  ],
  'pt-BR': [
    { monthKey: 'January', items: [
      { name: 'Festival de cinema indígena Skábmagovat', date: 'Fim de janeiro de 2026', city: 'Inari', body: 'Festival de cinema indígena no Sajos. Shows de joik, sessões na noite polar e jantares sámi.' },
      { name: 'Arctic Lapland Rally', date: '23–24 jan de 2026', city: 'Rovaniemi', body: 'Dois dias. O Roy Club lota. Mesmo quem não liga para o rali sai como se fosse sexta à noite.' },
    ]},
    { monthKey: 'February', items: [
      { name: 'Semana Sámi / Sámi Soveeknaki', date: 'Início de fevereiro', city: 'Rovaniemi', body: 'Corridas de renas, música sámi, shows de joik e eventos culturais à noite.' },
      { name: 'Frozen People Festival', date: '21 fev de 2026', city: 'Oulu', body: 'Festival de inverno de música eletrônica da Capital Europeia da Cultura. Palcos ao ar livre e cobertos, a −20 °C.' },
    ]},
    { monthKey: 'March', items: [
      { name: 'Semanas de shows da alta temporada em Levi', date: 'Meados de fev – meados de abr', city: 'Levi', body: 'O Hullu Poro Areena recebe artistas finlandeses em turnê toda semana, de quarta a sábado. Os ingressos esgotam com uma semana de antecedência.' },
    ]},
    { monthKey: 'April', items: [
      { name: 'Festival de música Ylläs Soikoon', date: 'Meados de abril', city: 'Ylläs', body: 'Festival de esqui de fim de temporada. Sets de DJ nas pistas, shows ao ar livre e sol de primavera.' },
      { name: 'Últimas semanas do SnowCastle', date: 'Abril inteiro', city: 'Kemi', body: 'Última chance de curtir o bar de gelo antes do degelo de abril. Doses de vodca em copos de gelo.' },
    ]},
    { monthKey: 'June', items: [
      { name: 'A janela do sol da meia-noite se abre', date: '6 jun de 2026', city: 'Ao norte do Círculo Polar Ártico', body: 'O sol para de se pôr. Segue assim até 7 de julho.' },
      { name: 'Festival de cinema do sol da meia-noite', date: '10–14 jun de 2026', city: 'Sodankylä', body: 'Mais de 80 filmes. A sessão das 03:00 na igreja de madeira do século XVII é a mais fotografada.' },
      { name: 'Juhannus / Solstício de verão', date: '19–21 jun de 2026', city: 'Em toda parte', body: 'Fogueiras, sauna, banhos de lago e fins de semana na cabana. As cidades se esvaziam e os moradores vão embora.' },
      { name: 'Classificatória do Mundial de Air Guitar', date: 'Junho, Oulu', city: 'Oulu', body: 'Classificatória para a final de agosto em Oulu. Programação ampliada da Capital Europeia da Cultura 2026.' },
    ]},
    { monthKey: 'July', items: [
      { name: 'Festival Qstock 2026', date: '24–25 jul de 2026', city: 'Oulu', body: 'O maior festival de rock do norte da Finlândia. 40.000 visitantes, dois dias, parque Kuusisaari.' },
      { name: 'Festival Elojazz', date: '30 jul – 2 ago de 2026', city: 'Oulu', body: 'Quatro dias de jazz: palcos ao ar livre em volta do Rotuaari e shows principais no Tarkastamo.' },
    ]},
    { monthKey: 'August', items: [
      { name: 'Simerock', date: '7–8 ago de 2026', city: 'Rovaniemi', body: 'Festival de rock do início de agosto no Ounaspaviljonki. Público local da Lapônia. Menor que o Qstock, mas com som mais pesado.' },
      { name: 'Festival de música sámi Ijahis Idja', date: '14–15 ago de 2026', city: 'Inari', body: 'Festival de música indígena no Sajos. O mais perto de uma noite de balada que Inari tem.' },
      { name: 'Final do Mundial de Air Guitar', date: '28–29 ago de 2026', city: 'Oulu', body: 'A verdadeira final mundial, no parque Pokkinen. 40 países e moradores de 8 a 80 anos.' },
    ]},
    { monthKey: 'October', items: [
      { name: 'Festival de folclore Jutajaiset', date: '22–25 out de 2026', city: 'Rovaniemi', body: 'Festival internacional de folclore. Desfiles, apresentações e shows à noite.' },
    ]},
    { monthKey: 'November', items: [
      { name: 'Copa do Mundo FIS de esqui alpino em Levi', date: '14–15 nov de 2026', city: 'Levi', body: 'Fim de semana de Copa do Mundo. O Hullu Poro Areena recebe as festas pós-prova; reserve a hospedagem com um ano de antecedência.' },
      { name: 'Abertura FIS de esqui cross-country em Ruka', date: '27–29 nov de 2026', city: 'Ruka', body: 'Abertura da temporada da Copa do Mundo. O Restaurant Zone, ao pé das pistas, é onde rolam as festas pós-prova.' },
    ]},
    { monthKey: 'December', items: [
      { name: 'Natal em Rovaniemi', date: '1–24 dez de 2026', city: 'Rovaniemi', body: 'Pico do turismo. Os bares estendem o horário; aos sábados, a fila do Roy Club chega a 45 minutos.' },
      { name: 'Fogos de Ano-Novo', date: '31 dez de 2026', city: 'Todas as cidades', body: 'Fogos públicos à meia-noite: praça central de Rovaniemi, praça do mercado de Oulu e pista de Levi.' },
    ]},
  ],
  'zh-CN': [
    { monthKey: 'January', items: [
      { name: 'Skábmagovat 原住民电影节', date: '2026 年 1 月下旬', city: '伊纳里', body: '在 Sajos 举办的原住民电影节。约伊克（joik）音乐会、极夜放映和萨米晚餐活动。' },
      { name: 'Arctic Lapland Rally', date: '2026 年 1 月 23–24 日', city: '罗瓦涅米', body: '为期两天。Roy Club 爆满。不看拉力赛的人，也把这两天当周五晚上来过。' },
    ]},
    { monthKey: 'February', items: [
      { name: '萨米周 / Sámi Soveeknaki', date: '2 月上旬', city: '罗瓦涅米', body: '驯鹿赛跑、萨米音乐、约伊克音乐会和晚间文化活动。' },
      { name: 'Frozen People Festival', date: '2026 年 2 月 21 日', city: '奥卢', body: '欧洲文化之都的冬季电子音乐节。户外和室内都有舞台，气温零下 20 °C。' },
    ]},
    { monthKey: 'March', items: [
      { name: '莱维旺季音乐会周', date: '2 月中旬 – 4 月中旬', city: '莱维', body: 'Hullu Poro Areena 每周三至周六都有芬兰巡演艺人登台。门票提前一周售罄。' },
    ]},
    { monthKey: 'April', items: [
      { name: 'Ylläs Soikoon 音乐节', date: '4 月中旬', city: '于拉斯', body: '雪季收尾的滑雪音乐节。雪道上的 DJ 表演、户外音乐会和春日阳光。' },
      { name: 'SnowCastle 最后几周', date: '整个 4 月', city: '凯米', body: '4 月冰雪消融前体验冰吧的最后机会。用冰杯喝伏特加。' },
    ]},
    { monthKey: 'June', items: [
      { name: '午夜阳光窗口开启', date: '2026 年 6 月 6 日', city: '北极圈以北', body: '太阳不再落下，一直持续到 7 月 7 日。' },
      { name: '午夜阳光电影节', date: '2026 年 6 月 10–14 日', city: '索丹屈莱', body: '80 多部电影。在 17 世纪木教堂举行的凌晨 3 点放映，是被拍得最多的一场。' },
      { name: 'Juhannus / 仲夏节', date: '2026 年 6 月 19–21 日', city: '各地', body: '篝火、桑拿、湖中游泳，在小屋度周末。城市变得空荡，本地人纷纷离开。' },
      { name: '空气吉他世锦赛预选赛', date: '6 月，奥卢', city: '奥卢', body: '8 月奥卢决赛的预选赛。欧洲文化之都 2026 扩展项目之一。' },
    ]},
    { monthKey: 'July', items: [
      { name: 'Qstock 音乐节 2026', date: '2026 年 7 月 24–25 日', city: '奥卢', body: '北芬兰规模最大的摇滚音乐节。40,000 名观众，为期两天，地点在 Kuusisaari 公园。' },
      { name: 'Elojazz 音乐节', date: '2026 年 7 月 30 日 – 8 月 2 日', city: '奥卢', body: '为期四天的爵士周：Rotuaari 周边设有户外舞台，主要音乐会在 Tarkastamo 举行。' },
    ]},
    { monthKey: 'August', items: [
      { name: 'Simerock', date: '2026 年 8 月 7–8 日', city: '罗瓦涅米', body: '八月初在 Ounaspaviljonki 举办的摇滚音乐节。以拉普兰本地观众为主，规模比 Qstock 小，但风格更重。' },
      { name: 'Ijahis Idja 萨米音乐节', date: '2026 年 8 月 14–15 日', city: '伊纳里', body: '在 Sajos 举办的原住民音乐节，是伊纳里最接近夜店派对的活动。' },
      { name: '空气吉他世锦赛决赛', date: '2026 年 8 月 28–29 日', city: '奥卢', body: '在 Pokkinen 公园举行的正式世界决赛。40 个国家参赛，现场从 8 岁到 80 岁的本地人都有。' },
    ]},
    { monthKey: 'October', items: [
      { name: 'Jutajaiset 民间艺术节', date: '2026 年 10 月 22–25 日', city: '罗瓦涅米', body: '国际民间艺术节。游行、表演和晚间音乐会。' },
    ]},
    { monthKey: 'November', items: [
      { name: '莱维 FIS 高山滑雪世界杯', date: '2026 年 11 月 14–15 日', city: '莱维', body: '世界杯周末。Hullu Poro Areena 举办赛后派对；请提前一年预订住宿。' },
      { name: '鲁卡 FIS 越野滑雪揭幕战', date: '2026 年 11 月 27–29 日', city: '鲁卡', body: '世界杯赛季的揭幕战。雪道脚下的 Restaurant Zone 是赛后派对的大本营。' },
    ]},
    { monthKey: 'December', items: [
      { name: '罗瓦涅米的圣诞节', date: '2026 年 12 月 1–24 日', city: '罗瓦涅米', body: '旅游高峰期。酒吧延长营业时间；周六 Roy Club 门口要排队 45 分钟。' },
      { name: '跨年烟花', date: '2026 年 12 月 31 日', city: '所有城市', body: '午夜有面向公众的烟花表演：罗瓦涅米中央广场、奥卢集市广场和莱维雪道。' },
    ]},
  ],
  ko: [
    { monthKey: 'January', items: [
      { name: 'Skábmagovat 원주민 영화제', date: '2026년 1월 하순', city: '이나리', body: 'Sajos에서 열리는 원주민 영화제입니다. 요이크 콘서트, 극야 상영회, 사미 디너 프로그램이 이어집니다.' },
      { name: 'Arctic Lapland Rally', date: '2026년 1월 23–24일', city: '로바니에미', body: '이틀간 열립니다. Roy Club은 사람들로 가득 찹니다. 랠리 팬이 아닌 사람들도 금요일 밤처럼 즐깁니다.' },
    ]},
    { monthKey: 'February', items: [
      { name: '사미 주간 / Sámi Soveeknaki', date: '2월 초', city: '로바니에미', body: '순록 경주, 사미 음악, 요이크 콘서트, 저녁 문화 행사가 열립니다.' },
      { name: 'Frozen People Festival', date: '2026년 2월 21일', city: '오울루', body: '유럽 문화 수도의 겨울 전자음악 페스티벌입니다. 야외와 실내에 무대가 있으며, 기온은 영하 20°C입니다.' },
    ]},
    { monthKey: 'March', items: [
      { name: '레비 성수기 콘서트 주간', date: '2월 중순 – 4월 중순', city: '레비', body: 'Hullu Poro Areena에서 매주 수요일부터 토요일까지 투어 중인 핀란드 아티스트들이 공연합니다. 티켓은 일주일 전에 매진됩니다.' },
    ]},
    { monthKey: 'April', items: [
      { name: 'Ylläs Soikoon 음악 페스티벌', date: '4월 중순', city: '윌래스', body: '시즌을 마무리하는 스키 페스티벌입니다. 슬로프 위 DJ 세트, 야외 콘서트, 봄 햇살.' },
      { name: 'SnowCastle 마지막 몇 주', date: '4월 내내', city: '케미', body: '4월 해빙 전에 얼음 바를 즐길 수 있는 마지막 기회입니다. 얼음잔에 담긴 보드카 샷.' },
    ]},
    { monthKey: 'June', items: [
      { name: '백야의 창 시작', date: '2026년 6월 6일', city: '북극권 이북', body: '해가 더 이상 지지 않습니다. 7월 7일까지 이어집니다.' },
      { name: '백야 영화제', date: '2026년 6월 10–14일', city: '소단퀼래', body: '80편 이상의 영화. 17세기 목조 교회에서 열리는 03:00 상영이 가장 많이 사진에 담깁니다.' },
      { name: 'Juhannus / 하지절', date: '2026년 6월 19–21일', city: '전국 각지', body: '모닥불, 사우나, 호수 수영, 오두막에서 보내는 주말. 현지인들이 떠나면서 도시는 텅 빕니다.' },
      { name: '에어 기타 세계 선수권 예선', date: '6월, 오울루', city: '오울루', body: '8월 오울루 결승을 위한 예선입니다. 유럽 문화 수도 2026 확대 프로그램의 일부입니다.' },
    ]},
    { monthKey: 'July', items: [
      { name: 'Qstock 페스티벌 2026', date: '2026년 7월 24–25일', city: '오울루', body: '북부 핀란드 최대의 록 페스티벌입니다. 방문객 40,000명, 이틀간, Kuusisaari 공원.' },
      { name: 'Elojazz 페스티벌', date: '2026년 7월 30일 – 8월 2일', city: '오울루', body: '나흘간의 재즈 주간입니다. Rotuaari 주변에 야외 무대가 서고, 메인 콘서트는 Tarkastamo에서 열립니다.' },
    ]},
    { monthKey: 'August', items: [
      { name: 'Simerock', date: '2026년 8월 7–8일', city: '로바니에미', body: 'Ounaspaviljonki에서 열리는 8월 초 록 페스티벌입니다. 라플란드 현지 관객이 중심이며, Qstock보다 작지만 더 묵직합니다.' },
      { name: 'Ijahis Idja 사미 음악 페스티벌', date: '2026년 8월 14–15일', city: '이나리', body: 'Sajos에서 열리는 원주민 음악 페스티벌입니다. 이나리에서 클럽 분위기에 가장 가까운 행사입니다.' },
      { name: '에어 기타 세계 선수권 결승', date: '2026년 8월 28–29일', city: '오울루', body: 'Pokkinen 공원에서 열리는 진짜 세계 결승전입니다. 40개국이 참가하고, 현장에는 8세부터 80세까지의 현지인들이 모여듭니다.' },
    ]},
    { monthKey: 'October', items: [
      { name: 'Jutajaiset 민속 페스티벌', date: '2026년 10월 22–25일', city: '로바니에미', body: '국제 민속 페스티벌입니다. 퍼레이드, 공연, 저녁 콘서트가 열립니다.' },
    ]},
    { monthKey: 'November', items: [
      { name: '레비 FIS 알파인 스키 월드컵', date: '2026년 11월 14–15일', city: '레비', body: '월드컵 주말입니다. Hullu Poro Areena에서 애프터파티가 열립니다. 숙소는 일 년 전에 예약하세요.' },
      { name: '루카 FIS 크로스컨트리 스키 개막전', date: '2026년 11월 27–29일', city: '루카', body: '월드컵 시즌의 개막전입니다. 슬로프 아래의 Restaurant Zone이 애프터파티의 본거지입니다.' },
    ]},
    { monthKey: 'December', items: [
      { name: '로바니에미의 크리스마스', date: '2026년 12월 1–24일', city: '로바니에미', body: '관광 성수기입니다. 바들은 영업시간을 연장하고, 토요일 Roy Club 대기 줄은 45분에 달합니다.' },
      { name: '새해 전야 불꽃놀이', date: '2026년 12월 31일', city: '모든 도시', body: '자정에는 로바니에미 중앙 광장, 오울루 마켓 광장, 레비 슬로프에서 누구나 볼 수 있는 불꽃놀이가 열립니다.' },
    ]},
  ],
  nl: [
    { monthKey: 'January', items: [
      { name: 'Skábmagovat, festival voor inheemse film', date: 'Eind jan 2026', city: 'Inari', body: 'Festival voor inheemse film in het Sajos. Joikconcerten, voorstellingen in de poolnacht en Samische dinerprogramma’s.' },
      { name: 'Arctic Lapland Rally', date: '23–24 jan 2026', city: 'Rovaniemi', body: 'Twee dagen. De Roy Club zit bomvol. Ook wie niets met rally heeft, viert het als een vrijdagavond.' },
    ]},
    { monthKey: 'February', items: [
      { name: 'Samische week / Sámi Soveeknaki', date: 'Begin feb', city: 'Rovaniemi', body: 'Rendierraces, Samische muziek, joikconcerten en culturele avondprogramma’s.' },
      { name: 'Frozen People Festival', date: '21 feb 2026', city: 'Oulu', body: 'Winters elektronisch festival van de Culturele Hoofdstad van Europa. Podia buiten en binnen, bij −20 °C.' },
    ]},
    { monthKey: 'March', items: [
      { name: 'Concertweken in het hoogseizoen van Levi', date: 'Half feb – half apr', city: 'Levi', body: 'Hullu Poro Areena haalt elke week van woensdag tot en met zaterdag Finse artiesten op tournee binnen. Kaartjes zijn een week van tevoren uitverkocht.' },
    ]},
    { monthKey: 'April', items: [
      { name: 'Muziekfestival Ylläs Soikoon', date: 'Half april', city: 'Ylläs', body: 'Skifestival aan het eind van het seizoen. Dj-sets op de pistes, openluchtconcerten en voorjaarszon.' },
      { name: 'Laatste weken van het SnowCastle', date: 'Heel april', city: 'Kemi', body: 'Laatste kans om naar de ijsbar te gaan, vóór de dooi in april. Wodkashots in glazen van ijs.' },
    ]},
    { monthKey: 'June', items: [
      { name: 'Het middernachtzon-venster gaat open', date: '6 jun 2026', city: 'Ten noorden van de poolcirkel', body: 'De zon gaat niet meer onder. Dat duurt tot 7 juli.' },
      { name: 'Midnight Sun Film Festival', date: '10–14 jun 2026', city: 'Sodankylä', body: 'Meer dan 80 films. De vertoning om 03:00 in de houten kerk uit de 17e eeuw is de meest gefotografeerde.' },
      { name: 'Juhannus / Midzomer', date: '19–21 jun 2026', city: 'Overal', body: 'Vreugdevuren, sauna, zwemmen in meren en weekenden in de hut. De steden lopen leeg en de inwoners trekken erop uit.' },
      { name: 'Kwalificatie voor de Air Guitar World Championships', date: 'Juni, Oulu', city: 'Oulu', body: 'Kwalificatie voor de finales in augustus in Oulu. Uitgebreid programma van Culturele Hoofdstad 2026.' },
    ]},
    { monthKey: 'July', items: [
      { name: 'Qstock Festival 2026', date: '24–25 jul 2026', city: 'Oulu', body: 'Het grootste rockfestival van Noord-Finland. 40.000 bezoekers, twee dagen, park Kuusisaari.' },
      { name: 'Elojazz Festival', date: '30 jul – 2 aug 2026', city: 'Oulu', body: 'Vier dagen jazz: openluchtpodia rond de Rotuaari en de grote concerten in Tarkastamo.' },
    ]},
    { monthKey: 'August', items: [
      { name: 'Simerock', date: '7–8 aug 2026', city: 'Rovaniemi', body: 'Rockfestival begin augustus in Ounaspaviljonki. Lokaal publiek uit Lapland. Kleiner dan Qstock, maar met zwaardere muziek.' },
      { name: 'Ijahis Idja, Samisch muziekfestival', date: '14–15 aug 2026', city: 'Inari', body: 'Festival voor inheemse muziek in het Sajos. Wat in Inari het meest op een clubavond lijkt.' },
      { name: 'Finale van de Air Guitar World Championships', date: '28–29 aug 2026', city: 'Oulu', body: 'De echte wereldfinale, in park Pokkinen. 40 landen, inwoners van 8 tot 80 jaar.' },
    ]},
    { monthKey: 'October', items: [
      { name: 'Folklorefestival Jutajaiset', date: '22–25 okt 2026', city: 'Rovaniemi', body: 'Internationaal folklorefestival. Optochten, voorstellingen en avondconcerten.' },
    ]},
    { monthKey: 'November', items: [
      { name: 'FIS-wereldbeker alpineskiën in Levi', date: '14–15 nov 2026', city: 'Levi', body: 'Wereldbekerweekend. Hullu Poro Areena verzorgt de afterparty’s; boek uw accommodatie een jaar van tevoren.' },
      { name: 'FIS-seizoensopening langlaufen in Ruka', date: '27–29 nov 2026', city: 'Ruka', body: 'Opening van het wereldbekerseizoen. Restaurant Zone aan de voet van de piste is de thuisbasis van de afterparty’s.' },
    ]},
    { monthKey: 'December', items: [
      { name: 'Kerstmis in Rovaniemi', date: '1–24 dec 2026', city: 'Rovaniemi', body: 'Toeristische piek. Bars zijn langer open; op zaterdag staat u bij de Roy Club 45 minuten in de rij.' },
      { name: 'Oudejaarsvuurwerk', date: '31 dec 2026', city: 'Alle steden', body: 'Openbaar vuurwerk om middernacht: het centrale plein van Rovaniemi, de markt van Oulu en de piste van Levi.' },
    ]},
  ],
  sv: [
    { monthKey: 'January', items: [
      { name: 'Skábmagovat, urfolksfilmfestival', date: 'Slutet av jan 2026', city: 'Inari', body: 'Urfolksfilmfestival i Sajos. Jojkkonserter, visningar under polarnatten och samiska middagsprogram.' },
      { name: 'Arctic Lapland Rally', date: '23–24 jan 2026', city: 'Rovaniemi', body: 'Två dagar. Roy Club blir fullsatt. Även de som inte bryr sig om rallyt firar det som en fredagskväll.' },
    ]},
    { monthKey: 'February', items: [
      { name: 'Samiska veckan / Sámi Soveeknaki', date: 'Början av feb', city: 'Rovaniemi', body: 'Renkapplöpning, samisk musik, jojkkonserter och kulturevenemang på kvällarna.' },
      { name: 'Frozen People Festival', date: '21 feb 2026', city: 'Oulu', body: 'Europeiska kulturhuvudstadens elektroniska vinterfestival. Scener ute och inne, −20 °C.' },
    ]},
    { monthKey: 'March', items: [
      { name: 'Konsertveckor under högsäsongen i Levi', date: 'Mitten av feb – mitten av apr', city: 'Levi', body: 'Hullu Poro Areena tar emot turnerande finska artister varje vecka, onsdag till lördag. Biljetterna är slutsålda en vecka i förväg.' },
    ]},
    { monthKey: 'April', items: [
      { name: 'Musikfestivalen Ylläs Soikoon', date: 'Mitten av april', city: 'Ylläs', body: 'Skidfestival i slutet av säsongen. DJ-set i backarna, utomhuskonserter och vårsol.' },
      { name: 'SnowCastles sista veckor', date: 'Hela april', city: 'Kemi', body: 'Sista chansen att besöka isbaren innan den smälter i april. Vodkashots i glas av is.' },
    ]},
    { monthKey: 'June', items: [
      { name: 'Midnattssolsfönstret öppnar', date: '6 juni 2026', city: 'Norr om polcirkeln', body: 'Solen slutar gå ner. Det håller i sig till 7 juli.' },
      { name: 'Midnight Sun Film Festival', date: '10–14 juni 2026', city: 'Sodankylä', body: 'Fler än 80 filmer. Visningen klockan 03:00 i träkyrkan från 1600-talet är den mest fotograferade.' },
      { name: 'Juhannus / midsommar', date: '19–21 juni 2026', city: 'Överallt', body: 'Brasor, bastu, sjöbad och helger i stugan. Städerna töms och lokalborna åker därifrån.' },
      { name: 'Kval till Air Guitar World Championships', date: 'Juni, Oulu', city: 'Oulu', body: 'Kval till finalerna i Oulu i augusti. Utökat program under kulturhuvudstadsåret 2026.' },
    ]},
    { monthKey: 'July', items: [
      { name: 'Qstock Festival 2026', date: '24–25 juli 2026', city: 'Oulu', body: 'Norra Finlands största rockfestival. 40 000 besökare, två dagar, Kuusisaari-parken.' },
      { name: 'Elojazz Festival', date: '30 juli – 2 aug 2026', city: 'Oulu', body: 'Fyra dagars jazz: utomhusscener runt Rotuaari och huvudkonserterna på Tarkastamo.' },
    ]},
    { monthKey: 'August', items: [
      { name: 'Simerock', date: '7–8 aug 2026', city: 'Rovaniemi', body: 'Rockfestival i början av augusti i Ounaspaviljonki. Lokal publik från Lappland. Mindre än Qstock, men med tyngre musik.' },
      { name: 'Ijahis Idja, samisk musikfestival', date: '14–15 aug 2026', city: 'Inari', body: 'Urfolksmusikfestival i Sajos. Det närmaste en klubbkväll som Inari har.' },
      { name: 'Final i Air Guitar World Championships', date: '28–29 aug 2026', city: 'Oulu', body: 'De riktiga världsfinalerna, i Pokkinen-parken. 40 länder och lokalbor från 8 till 80 år.' },
    ]},
    { monthKey: 'October', items: [
      { name: 'Folklorefestivalen Jutajaiset', date: '22–25 okt 2026', city: 'Rovaniemi', body: 'Internationell folklorefestival. Parader, uppträdanden och kvällskonserter.' },
    ]},
    { monthKey: 'November', items: [
      { name: 'FIS-världscupen i alpint i Levi', date: '14–15 nov 2026', city: 'Levi', body: 'Världscuphelg. Hullu Poro Areena håller i efterfesterna; boka boende ett år i förväg.' },
      { name: 'FIS-premiären i längdskidåkning i Ruka', date: '27–29 nov 2026', city: 'Ruka', body: 'Världscupsäsongens första tävlingar. Restaurant Zone vid backens fot är där efterfesterna hålls.' },
    ]},
    { monthKey: 'December', items: [
      { name: 'Jul i Rovaniemi', date: '1–24 dec 2026', city: 'Rovaniemi', body: 'Högsäsong för turister. Barerna har förlängda öppettider; på lördagar är kön till Roy Club 45 minuter lång.' },
      { name: 'Nyårsfyrverkerier', date: '31 dec 2026', city: 'Alla städer', body: 'Offentliga fyrverkerier vid midnatt: Rovaniemis centrala torg, Oulus salutorg och backen i Levi.' },
    ]},
  ],
};

/* Every language has its own list. Until 2026-09-28 ja, es, pt-BR, zh-CN, ko, nl
   and sv fell back to EVENTS_BASE.en, so readers of seven languages saw the event
   calendar and the homepage event cards in English (measured on the live site:
   /kr/events/, /ja/, /cn/, /br/ …). The Record<Lang, …> type now fails the build
   if a language is missing, instead of silently showing English. */
const EVENTS: Record<Lang, MonthBlock[]> = EVENTS_BASE;

// Real count of events on this page, derived from the EN source list so the
// hero eyebrow can never drift from the calendar below (was a hardcoded "20"
// while the list held 21).
const EVENT_COUNT = EVENTS_BASE.en.reduce((n, m) => n + m.items.length, 0);

/* Local calendar day as YYYY-MM-DD. Deliberately the READER's clock, not build time:
   a static page stamped at deploy would call August events "past" for the rest of the
   year and go stale the moment it shipped. toISOString() is wrong here — it converts
   to UTC, so before 02:00 Finnish time it reports yesterday. */
function todayLocalIso(d: Date): string {
  const p = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

/* Which entries are over, keyed by [month index][item index] against the EN list.
   The fi/de lists are parallel to it — same months, same events, same order — so the
   index is the join key. If that ever stops being true the lengths diverge and we fall
   back to "not past", which shows a real event rather than mislabelling a live one. */
function pastFlags(today: string): boolean[][] {
  return EVENTS_BASE.en.map((m) =>
    m.items.map((e) => !!e.endsBy && e.endsBy < today),
  );
}

/* Litteä lista tapahtumia aikajärjestyksessä, menneet pudotettuna.
 *
 * 🔴 Lukijan kello, ei build-aika — sama sääntö kuin `pastFlags`issa: deployssa
 * leimattu päivä vanhenisi heti julkaisuhetkellä.
 * 🔴 `endsBy` elää vain EN-listalla ja luetaan indeksillä muille kielille. Jos
 * listat ajautuvat erilleen (eri pituus), palautetaan EN-lista sellaisenaan
 * eikä yritetä arvata pareja.
 * 🔴 Tapahtuma ilman `endsBy`:tä EI putoa pois: tuntematon päättymispäivä ei ole
 * peruste piilottaa elävää tapahtumaa. Se järjestetään listan loppuun.
 */
export function upcomingEvents(lang: Lang, count: number, skip = 0) {
  const today = todayLocalIso(new Date());
  const base = EVENTS_BASE.en;
  const loc = EVENTS[lang] ?? base;
  const parallel =
    loc.length === base.length && loc.every((m, i) => m.items.length === base[i].items.length);

  // enName = EN-listan nimi. Se on ainoa avain joka ei kaanny, ja kuvakartta
  // (data/eventImages.ts) on avaimitettu silla.
  const out: (Item & { monthKey: MonthBlock['monthKey']; enName: string })[] = [];
  base.forEach((m, mi) => {
    m.items.forEach((e, ii) => {
      if (e.endsBy && e.endsBy < today) return;
      const shown = parallel ? loc[mi].items[ii] : e;
      out.push({ ...shown, endsBy: e.endsBy, monthKey: m.monthKey, enName: e.name });
    });
  });
  out.sort((a, b) => (a.endsBy ?? '9999-99-99').localeCompare(b.endsBy ?? '9999-99-99'));
  return out.slice(skip, skip + count);
}

export { EVENTS, EVENTS_BASE, EVENT_COUNT, todayLocalIso, pastFlags };
export type { Item, MonthBlock };

