import { Calendar } from 'lucide-react';
import PageSeo, { pillarBreadcrumb, articleSchema } from '../components/PageSeo';
import PillarHero from '../components/PillarHero';
import GygWidget from '../components/GygWidget';
import AffiliateCTA from '../components/AffiliateCTA';
import { IMG } from '../data/images';
import { useLang, type Lang } from '../i18n/useLang';
import { COPY } from '../locales/copy';

type Item = { name: string; date: string; city: string; body: string };
type MonthBlock = { monthKey: keyof typeof COPY.en.events.months; items: Item[] };

const EVENTS_BASE: Record<'en' | 'fi' | 'de', MonthBlock[]> = {
  en: [
    { monthKey: 'January', items: [
      { name: 'Skábmagovat Indigenous Film Festival', date: 'Late Jan 2026', city: 'Inari', body: 'Indigenous film festival inside Sajos. Joik concerts, dark-time screenings, Sámi dinner programmes.' },
      { name: 'Arctic Lapland Rally', date: 'Jan 23–24, 2026', city: 'Rovaniemi', body: 'Two days. Roy Club + Half Moon sell out. The non-rally crowd treat it as Friday.' },
    ]},
    { monthKey: 'February', items: [
      { name: 'Sami Week / Sámi Soveeknaki', date: 'Early Feb', city: 'Rovaniemi', body: 'Reindeer races, Sámi music, joik concerts, evening cultural events.' },
      { name: 'Frozen People Festival', date: 'Feb 21, 2026', city: 'Oulu', body: 'European Capital of Culture winter electronic festival. Outdoor + indoor stages, –20 °C.' },
    ]},
    { monthKey: 'March', items: [
      { name: 'Peak Levi Concert Weeks', date: 'Mid-Feb – Mid-Apr', city: 'Levi', body: 'Hullu Poro Areena hosts Finnish touring acts every Wed–Sat. Tickets sell out a week ahead.' },
    ]},
    { monthKey: 'April', items: [
      { name: 'Yllas Soikoon Music Festival', date: 'Mid-April', city: 'Ylläs', body: 'End-of-season ski-festival. DJ sets on the slopes, outdoor concerts, spring sun.' },
      { name: 'SnowCastle final weeks', date: 'Through Apr', city: 'Kemi', body: 'Last chance for the ice bar before April thaw. Vodka shots in ice glasses.' },
    ]},
    { monthKey: 'June', items: [
      { name: 'Midnight Sun Window opens', date: 'Jun 6, 2026', city: 'Above Arctic Circle', body: 'Sun stops setting. Continues until July 7.' },
      { name: 'Midnight Sun Film Festival', date: 'Jun 10–14, 2026', city: 'Sodankylä', body: '80+ films. The 03:00 screening at the 17th-century wooden church is the most photographed.' },
      { name: 'Juhannus / Midsummer', date: 'Jun 19–21, 2026', city: 'Everywhere', body: 'Bonfires, sauna, lake swims, cabin weekends. Cities empty out — locals leave.' },
      { name: 'Air Guitar World Championships qualifier', date: 'Jun, Oulu', city: 'Oulu', body: 'Qualifier for the August Oulu finals. ECoC2026 expanded programme.' },
    ]},
    { monthKey: 'July', items: [
      { name: 'Qstock Festival 2026', date: 'Jul 24–26, 2026', city: 'Oulu', body: "Northern Finland's biggest rock festival. 60 000 visitors, three days, Kuusisaari park." },
      { name: 'Jutajaiset Folklore Festival', date: 'Mid-July', city: 'Rovaniemi', body: 'International folklore festival. Parades, performances, evening concerts.' },
      { name: 'Elojazz Festival', date: 'Late July', city: 'Oulu', body: 'Late-July jazz week — outdoor stages around Rotuaari.' },
    ]},
    { monthKey: 'August', items: [
      { name: 'Air Guitar World Championships Final', date: 'Late August', city: 'Oulu', body: 'The actual world finals. 40 countries, packed Rotuaari park, locals from age 8 to 80.' },
      { name: 'Ijahis Idja Sámi Music Festival', date: 'Mid-August', city: 'Inari', body: 'Indigenous music festival under the late-summer light. The closest thing to a club night Inari has.' },
      { name: 'Simerock', date: 'Late August', city: 'Rovaniemi', body: 'End-of-summer rock festival. Local Lapland crowd, smaller than Qstock but heavier.' },
    ]},
    { monthKey: 'November', items: [
      { name: 'Levi FIS Alpine Ski World Cup', date: 'Mid-November', city: 'Levi', body: 'World Cup weekend. Hullu Poro Areena hosts after-parties; book accommodation a year ahead.' },
      { name: 'Ruka FIS Cross-Country Opening', date: 'Late November', city: 'Ruka', body: 'World-cup season opener. Zone Bar at the slope base is the after-party home.' },
    ]},
    { monthKey: 'December', items: [
      { name: 'Christmas in Rovaniemi', date: 'Dec 1–24, 2026', city: 'Rovaniemi', body: 'Tourist peak. Bars run extended hours; Roy Club queues are 45 minutes deep on Saturdays.' },
      { name: "New Year's Eve fireworks", date: 'Dec 31, 2026', city: 'All cities', body: "Public fireworks at midnight — Rovaniemi central square, Oulu's market square, Levi slope." },
    ]},
  ],
  fi: [
    { monthKey: 'January', items: [
      { name: 'Skábmagovat-alkuperäiskansojen filmifestivaali', date: 'Tammikuun loppu 2026', city: 'Inari', body: 'Alkuperäiskansojen filmifestivaali Sajoksessa. Joikukonsertit, pimeän ajan näytökset, saamelaisateriaohjelmat.' },
      { name: 'Arctic Lapland Rally', date: '23.–24.1.2026', city: 'Rovaniemi', body: 'Kaksi päivää. Roy Club ja Half Moon myydään loppuun. Muutkin kuin rallikansa pitävät tätä perjantai-iltana.' },
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
      { name: 'Juhannus', date: '19.–21.6.2026', city: 'Kaikkialla', body: 'Kokot, sauna, järviuinnit, mökkiviikonloput. Kaupungit tyhjenevät — paikalliset lähtevät.' },
      { name: 'Ilmakitaransoiton MM-karsinta', date: 'Kesäkuu, Oulu', city: 'Oulu', body: 'Karsinta elokuun Oulun finaaleihin. ECoC2026:n laajennettu ohjelma.' },
    ]},
    { monthKey: 'July', items: [
      { name: 'Qstock-festivaali 2026', date: '24.–26.7.2026', city: 'Oulu', body: 'Pohjois-Suomen suurin rockfestivaali. 60 000 kävijää, kolme päivää, Kuusisaaren puisto.' },
      { name: 'Jutajaiset-folkloristifestivaali', date: 'Heinäkuun puoliväli', city: 'Rovaniemi', body: 'Kansainvälinen folkloristifestivaali. Paraatit, esitykset, iltakonsertit.' },
      { name: 'Elojazz-festivaali', date: 'Heinäkuun loppu', city: 'Oulu', body: 'Heinäkuun lopun jazz-viikko — ulkoilmalavat Rotuaarin ympärillä.' },
    ]},
    { monthKey: 'August', items: [
      { name: 'Ilmakitaransoiton MM-finaali', date: 'Elokuun loppu', city: 'Oulu', body: 'Varsinaiset MM-finaalit. 40 maata, täysi Rotuaarin puisto, paikalliset 8-vuotiaista 80-vuotiaisiin.' },
      { name: 'Ijahis Idja -saamelaismusiikkifestivaali', date: 'Elokuun puoliväli', city: 'Inari', body: 'Alkuperäiskansojen musiikkifestivaali loppukesän valossa. Lähimpänä klubi-iltaa, mitä Inarissa tarjotaan.' },
      { name: 'Simerock', date: 'Elokuun loppu', city: 'Rovaniemi', body: 'Loppukesän rockfestivaali. Paikallinen Lappi-yleisö, Qstockia pienempi mutta raskaampi.' },
    ]},
    { monthKey: 'November', items: [
      { name: 'Levi FIS Alpine Ski World Cup', date: 'Marraskuun puoliväli', city: 'Levi', body: 'Maailmancup-viikonloppu. Hullu Poro Areena isännöi jatkot; varaa majoitus vuotta etukäteen.' },
      { name: 'Rukan FIS-maastohiihdon avaus', date: 'Marraskuun loppu', city: 'Ruka', body: 'Maailmancup-kauden avaus. Zone Bar rinteen juurella on jatkojen koti.' },
    ]},
    { monthKey: 'December', items: [
      { name: 'Joulu Rovaniemellä', date: '1.–24.12.2026', city: 'Rovaniemi', body: 'Turistihuippu. Baarit pidentävät aukioloaikoja; Roy Clubin jonot 45 minuutin pituisia lauantaisin.' },
      { name: 'Uudenvuoden ilotulitukset', date: '31.12.2026', city: 'Kaikki kaupungit', body: 'Julkiset ilotulitukset keskiyöllä — Rovaniemen keskustaaukio, Oulun kauppatori, Levin rinne.' },
    ]},
  ],
  de: [
    { monthKey: 'January', items: [
      { name: 'Skábmagovat – Indigenes Filmfestival', date: 'Ende Januar 2026', city: 'Inari', body: 'Indigenes Filmfestival im Sajos. Joik-Konzerte, Vorführungen in der Dunkelzeit, samische Diner-Programme.' },
      { name: 'Arctic Lapland Rally', date: '23.–24. Jan 2026', city: 'Rovaniemi', body: 'Zwei Tage. Roy Club + Half Moon sind ausverkauft. Auch Nicht-Rallye-Gäste behandeln es als Freitagabend.' },
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
      { name: 'Juhannus / Mittsommer', date: '19.–21. Jun 2026', city: 'Überall', body: 'Lagerfeuer, Sauna, Seebaden, Hütten-Wochenenden. Die Städte leeren sich — die Einheimischen fahren raus.' },
      { name: 'Luftgitarren-WM-Qualifikation', date: 'Juni, Oulu', city: 'Oulu', body: 'Qualifikation für das August-Finale in Oulu. Erweitertes Programm zur Kulturhauptstadt 2026.' },
    ]},
    { monthKey: 'July', items: [
      { name: 'Qstock Festival 2026', date: '24.–26. Jul 2026', city: 'Oulu', body: 'Das größte Rockfestival Nordfinnlands. 60 000 Besucher, drei Tage, Kuusisaari-Park.' },
      { name: 'Jutajaiset Folklorefestival', date: 'Mitte Juli', city: 'Rovaniemi', body: 'Internationales Folklorefestival. Umzüge, Auftritte, Abendkonzerte.' },
      { name: 'Elojazz-Festival', date: 'Ende Juli', city: 'Oulu', body: 'Jazzwoche Ende Juli — Open-Air-Bühnen rund um den Rotuaari.' },
    ]},
    { monthKey: 'August', items: [
      { name: 'Luftgitarren-WM-Finale', date: 'Ende August', city: 'Oulu', body: 'Das eigentliche Weltfinale. 40 Nationen, voll besetzter Rotuaari-Park, Einheimische zwischen 8 und 80.' },
      { name: 'Ijahis Idja — Samisches Musikfestival', date: 'Mitte August', city: 'Inari', body: 'Indigenes Musikfestival im Spätsommerlicht. Das, was einem Clubabend in Inari am nächsten kommt.' },
      { name: 'Simerock', date: 'Ende August', city: 'Rovaniemi', body: 'Spätsommer-Rockfestival. Lokales Lappland-Publikum, kleiner als Qstock, aber härter.' },
    ]},
    { monthKey: 'November', items: [
      { name: 'Levi FIS Alpiner Ski-Weltcup', date: 'Mitte November', city: 'Levi', body: 'Weltcup-Wochenende. Hullu Poro Areena richtet die Aftershows aus; Unterkunft ein Jahr im Voraus buchen.' },
      { name: 'Ruka FIS Langlauf-Auftakt', date: 'Ende November', city: 'Ruka', body: 'Weltcup-Saisoneröffnung. Die Zone Bar an der Talstation ist das Aftershow-Zuhause.' },
    ]},
    { monthKey: 'December', items: [
      { name: 'Weihnachten in Rovaniemi', date: '1.–24. Dez 2026', city: 'Rovaniemi', body: 'Touristen-Hochsaison. Bars haben verlängerte Öffnungszeiten; samstags 45-minütige Schlangen vor dem Roy Club.' },
      { name: 'Silvester-Feuerwerk', date: '31. Dez 2026', city: 'Alle Städte', body: 'Öffentliches Feuerwerk um Mitternacht — Hauptplatz in Rovaniemi, Marktplatz in Oulu, Skihang in Levi.' },
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
};

export default function Events() {
  const lang = useLang();
  const c = COPY[lang].events;
  const langPrefix = lang === 'en' ? '' : `/${lang === 'pt-BR' ? 'br' : lang === 'zh-CN' ? 'cn' : lang}`;
  const path = `${langPrefix}/events`;
  const data = EVENTS[lang];

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
        eyebrow={c.heroEyebrow}
        title={c.heroTitle}
        subtitle={c.heroSub}
        intro={c.heroIntro}
        bgImage={IMG.pillarEvents}
        accentClass="from-pink/25 via-night/75 to-night"
      />

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-12">
          {data.map((m) => (
            <div key={m.monthKey}>
              <div className="flex items-center gap-3 mb-5 border-b border-white/10 pb-3">
                <h2 className="font-heading text-3xl text-white tracking-tight">{c.months[m.monthKey]}</h2>
                <span className="text-xs uppercase tracking-wider text-pink/70 font-semibold">2026</span>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {m.items.map((e) => (
                  <div key={e.name} className="bg-night-light/40 border border-white/10 rounded-xl p-5 hover:border-pink/30 hover:-translate-y-0.5 transition-all">
                    <p className="text-[0.65rem] uppercase tracking-[0.18em] text-pink font-bold mb-1">{e.date} · {e.city}</p>
                    <h3 className="font-heading text-xl text-white tracking-tight mb-2">{e.name}</h3>
                    <p className="text-sm text-white/70 leading-relaxed">{e.body}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
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
