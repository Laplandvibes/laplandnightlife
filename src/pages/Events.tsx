import { Calendar } from 'lucide-react';
import PageSeo, { pillarBreadcrumb, articleSchema } from '../components/PageSeo';
import PillarHero from '../components/PillarHero';
import GygWidget from '../components/GygWidget';
import AffiliateCTA from '../components/AffiliateCTA';
import { IMG } from '../data/images';
import { useLang, useLocalePath, type Lang } from '../i18n/useLang';
import { COPY } from '../locales/copy';

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
const EVENTS_BASE: Record<'en' | 'fi' | 'de', MonthBlock[]> = {
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
      { name: 'Keskiyön auringon filmifestivaali', date: '10.–14.6.2026', city: 'Sodankylä', body: '80+ elokuvaa. 03:00-näytös 1600-luvun puukirkossa on kuvatuin.' },
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
      { name: 'Skábmagovat – Indigenes Filmfestival', date: 'Ende Januar 2026', city: 'Inari', body: 'Indigenes Filmfestival im Sajos. Joik-Konzerte, Vorführungen in der Dunkelzeit, samische Diner-Programme.' },
      { name: 'Arctic Lapland Rally', date: '23.–24. Jan 2026', city: 'Rovaniemi', body: 'Zwei Tage. Das Roy Club ist ausverkauft. Auch Nicht-Rallye-Gäste behandeln es als Freitagabend.' },
    ]},
    { monthKey: 'February', items: [
      { name: 'Samische Woche / Sámi Soveeknaki', date: 'Anfang Februar', city: 'Rovaniemi', body: 'Rentierrennen, samische Musik, Joik-Konzerte, abendliche Kulturveranstaltungen.' },
      { name: 'Frozen People Festival', date: '21. Feb 2026', city: 'Oulu', body: 'Winterliches Electronic-Festival zur Kulturhauptstadt Europas. Open-Air- und Indoor-Bühnen, –20 °C.' },
    ]},
    { monthKey: 'March', items: [
      { name: 'Levi-Spitzen-Konzertwochen', date: 'Mitte Feb – Mitte Apr', city: 'Levi', body: 'Hullu Poro Areena empfängt finnische Tourneeacts jeden Mi–Sa. Tickets sind eine Woche im Voraus ausverkauft.' },
    ]},
    { monthKey: 'April', items: [
      { name: 'Yllas Soikoon Musikfestival', date: 'Mitte April', city: 'Ylläs', body: 'Saisonabschluss-Skifestival. DJ-Sets an den Pisten, Open-Air-Konzerte, Frühlingssonne.' },
      { name: 'SnowCastle letzte Wochen', date: 'Durchgehend April', city: 'Kemi', body: 'Letzte Chance auf die Eisbar vor dem April-Tauwetter. Wodka-Shots in Eisgläsern.' },
    ]},
    { monthKey: 'June', items: [
      { name: 'Mitternachtssonnen-Fenster beginnt', date: '6. Jun 2026', city: 'Nördlich des Polarkreises', body: 'Die Sonne hört auf unterzugehen. Bis zum 7. Juli.' },
      { name: 'Filmfestival der Mitternachtssonne', date: '10.–14. Jun 2026', city: 'Sodankylä', body: 'Über 80 Filme. Die Vorführung um 03:00 Uhr in der Holzkirche aus dem 17. Jahrhundert ist die meistfotografierte.' },
      { name: 'Juhannus / Mittsommer', date: '19.–21. Jun 2026', city: 'Überall', body: 'Lagerfeuer, Sauna, Seebaden, Hütten-Wochenenden. Die Städte leeren sich; die Einheimischen fahren raus.' },
      { name: 'Luftgitarren-WM-Qualifikation', date: 'Juni, Oulu', city: 'Oulu', body: 'Qualifikation für das August-Finale in Oulu. Erweitertes Programm zur Kulturhauptstadt 2026.' },
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
      { name: 'Levi FIS Alpiner Ski-Weltcup', date: '14.–15. Nov 2026', city: 'Levi', body: 'Weltcup-Wochenende. Hullu Poro Areena richtet die Aftershows aus; Unterkunft ein Jahr im Voraus buchen.' },
      { name: 'Ruka FIS Langlauf-Auftakt', date: '27.–29. Nov 2026', city: 'Ruka', body: 'Weltcup-Saisoneröffnung. Die Restaurant Zone an der Talstation ist das Aftershow-Zuhause.' },
    ]},
    { monthKey: 'December', items: [
      { name: 'Weihnachten in Rovaniemi', date: '1.–24. Dez 2026', city: 'Rovaniemi', body: 'Touristen-Hochsaison. Bars haben verlängerte Öffnungszeiten; samstags 45-minütige Schlangen vor dem Roy Club.' },
      { name: 'Silvester-Feuerwerk', date: '31. Dez 2026', city: 'Alle Städte', body: 'Öffentliches Feuerwerk um Mitternacht: Hauptplatz in Rovaniemi, Marktplatz in Oulu, Skihang in Levi.' },
    ]},
  ],
};

// JA Phase 2B: reuse EN events under /ja until native polish.
const EVENTS: Record<Lang, MonthBlock[]> = {
  ...EVENTS_BASE,
  ja: EVENTS_BASE.en,
  es: EVENTS_BASE.en,
  'pt-BR': EVENTS_BASE.en,
  'zh-CN': EVENTS_BASE.en,
  ko: EVENTS_BASE.en,
  fr: EVENTS_BASE.en,
  it: EVENTS_BASE.en,
  nl: EVENTS_BASE.en,
  sv: EVENTS_BASE.en,
};

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

export default function Events() {
  const lang = useLang();
  const to = useLocalePath();
  const c = COPY[lang].events;
  // useLocalePath maps ALL non-EN prefixes correctly — the old inline mapping
  // handled br/cn but forgot ko→kr, producing a bad client-side canonical.
  const path = to('/events');
  const data = EVENTS[lang];

  const today = todayLocalIso(new Date());
  const past = pastFlags(today);
  // First entry that has not finished yet — the one a reader can still act on.
  const next = (() => {
    for (let mi = 0; mi < EVENTS_BASE.en.length; mi++) {
      for (let ii = 0; ii < EVENTS_BASE.en[mi].items.length; ii++) {
        if (!past[mi]?.[ii]) return data[mi]?.items[ii];
      }
    }
    return undefined;
  })();

  return (
    <>
      <PageSeo
        title={c.seoTitle}
        description={c.seoDesc}
        path={path}
        jsonLd={[
          articleSchema(c.seoTitle, c.seoDesc, path),
          pillarBreadcrumb(c.heroTitle, path),
        ]}
      />

      <PillarHero
        icon={Calendar}
        eyebrow={c.heroEyebrow(String(EVENT_COUNT))}
        title={c.heroTitle}
        subtitle={c.heroSub}
        intro={c.heroIntro}
        bgImage={IMG.pillarEvents}
        accentClass="from-pink/25 via-night/75 to-night"
      />

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-12">
          {next && (
            <p className="text-sm text-white/70">
              <span className="text-[0.65rem] uppercase tracking-[0.18em] text-pink font-bold mr-2">{c.nextUp}</span>
              <span className="text-white font-semibold">{next.name}</span>
              <span className="text-white/50"> · {next.date} · {next.city}</span>
            </p>
          )}

          {data.map((m, mi) => (
            <div key={m.monthKey}>
              <div className="flex items-center gap-3 mb-5 border-b border-white/10 pb-3">
                <h2 className="font-heading text-3xl text-white tracking-tight">{c.months[m.monthKey]}</h2>
                <span className="text-xs uppercase tracking-wider text-pink/70 font-semibold">2026</span>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {m.items.map((e, ii) => {
                  const isPast = past[mi]?.[ii] ?? false;
                  return (
                    <div
                      key={e.name}
                      className={
                        isPast
                          ? 'bg-night-light/20 border border-white/5 rounded-xl p-5 opacity-60'
                          : 'bg-night-light/40 border border-white/10 rounded-xl p-5 hover:border-pink/30 hover:-translate-y-0.5 transition-all'
                      }
                    >
                      <p className={`text-[0.65rem] uppercase tracking-[0.18em] font-bold mb-1 ${isPast ? 'text-white/45' : 'text-pink'}`}>
                        {e.date} · {e.city}
                        {isPast && (
                          <span className="ml-2 border border-white/20 rounded px-1.5 py-0.5 text-white/55 tracking-normal">
                            {c.pastLabel}
                          </span>
                        )}
                      </p>
                      <h3 className={`font-heading text-xl tracking-tight mb-2 ${isPast ? 'text-white/70' : 'text-white'}`}>{e.name}</h3>
                      <p className={`text-sm leading-relaxed ${isPast ? 'text-white/50' : 'text-white/70'}`}>{e.body}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Ticketmaster FI — Vesa's documented exception (CLAUDE.md 2026-08-17):
              TP provides ONLY a ready-made front-page link for this programme, so
              no per-event deep link is possible. Reader-service, not a revenue
              play (0,40 €/online sale) — which is why this is one modest block,
              not a CTA on every event card. Qstock exclusivity verified from
              qstock.fi's own ticket-info page 2026-08-23. */}
          <div className="bg-night-light/40 border border-white/10 rounded-xl p-6 sm:p-7">
            <h2 className="font-heading text-2xl text-white tracking-tight mb-2">{c.ticketsH}</h2>
            <p className="text-sm text-white/70 leading-relaxed mb-4 max-w-3xl">{c.ticketsBody}</p>
            <a
              href="https://go.laplandvibes.com/go/ticketmaster?sid=events_tickets_fi"
              target="_blank"
              rel="sponsored nofollow noopener"
              className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-pink hover:text-white transition-colors"
            >
              {c.ticketsCta} →
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-night-light/30 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-xs uppercase tracking-[0.25em] text-pink font-bold mb-3">{c.gygEyebrow}</p>
            <h2 className="font-heading text-3xl sm:text-4xl text-white tracking-tight mb-2">{c.gygH}</h2>
            <p className="text-white/80 max-w-xl mx-auto">{c.gygBody}</p>
          </div>
          <GygWidget query="Lapland festivals tours 2026" campaign="events_pillar" count={6} />
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-3xl text-white tracking-tight mb-3">{c.ctaH}</h2>
          <p className="text-white/65 mb-6">{c.ctaBody}</p>
          <AffiliateCTA partner="hotels" sid="events_cta" destination="Lapland" className="inline-flex items-center gap-2 bg-pink hover:bg-pink-dark text-white font-bold py-4 px-8 rounded-xl text-sm uppercase tracking-wider transition-all hover:-translate-y-0.5">
            {c.ctaBtn}
          </AffiliateCTA>
        </div>
      </section>
    </>
  );
}
