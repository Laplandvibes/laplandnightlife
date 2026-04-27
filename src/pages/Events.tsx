import { Calendar } from 'lucide-react';
import PageSeo, { pillarBreadcrumb, articleSchema } from '../components/PageSeo';
import PillarHero from '../components/PillarHero';
import GygWidget from '../components/GygWidget';
import AffiliateCTA from '../components/AffiliateCTA';
import { IMG } from '../data/images';

const events2026 = [
  { month: 'January', items: [
    { name: 'Skábmagovat Indigenous Film Festival', date: 'Late Jan 2026', city: 'Inari', body: 'Indigenous film festival inside Sajos. Joik concerts, dark-time screenings, Sámi dinner programmes.' },
    { name: 'Arctic Lapland Rally', date: 'Jan 23–24, 2026', city: 'Rovaniemi', body: 'Two days. Roy Club + Tivoli sell out. The non-rally crowd treat it as Friday.' },
  ]},
  { month: 'February', items: [
    { name: 'Sami Week / Sámi Soveeknaki', date: 'Early Feb', city: 'Rovaniemi', body: 'Reindeer races, Sámi music, joik concerts, evening cultural events.' },
    { name: 'Frozen People Festival', date: 'Feb 21, 2026', city: 'Oulu', body: 'European Capital of Culture winter electronic festival. Outdoor + indoor stages, –20 °C.' },
  ]},
  { month: 'March', items: [
    { name: 'Peak Levi Concert Weeks', date: 'Mid-Feb – Mid-Apr', city: 'Levi', body: 'Hullu Poro Areena hosts Finnish touring acts every Wed–Sat. Tickets sell out a week ahead.' },
  ]},
  { month: 'April', items: [
    { name: 'Yllas Soikoon Music Festival', date: 'Mid-April', city: 'Ylläs', body: 'End-of-season ski-festival. DJ sets on the slopes, outdoor concerts, spring sun.' },
    { name: 'SnowCastle final weeks', date: 'Through Apr', city: 'Kemi', body: 'Last chance for the ice bar before April thaw. Vodka shots in ice glasses.' },
  ]},
  { month: 'June', items: [
    { name: 'Midnight Sun Window opens', date: 'Jun 6, 2026', city: 'Above Arctic Circle', body: 'Sun stops setting. Continues until July 7.' },
    { name: 'Midnight Sun Film Festival', date: 'Jun 10–14, 2026', city: 'Sodankylä', body: '80+ films. The 03:00 screening at the 17th-century wooden church is the most photographed.' },
    { name: 'Juhannus / Midsummer', date: 'Jun 19–21, 2026', city: 'Everywhere', body: 'Bonfires, sauna, lake swims, cabin weekends. Cities empty out — locals leave.' },
    { name: 'Air Guitar World Championships qualifier', date: 'Jun, Oulu', city: 'Oulu', body: 'Qualifier for the August Oulu finals. ECoC2026 expanded programme.' },
  ]},
  { month: 'July', items: [
    { name: 'Qstock Festival 2026', date: 'Jul 24–26, 2026', city: 'Oulu', body: "Northern Finland's biggest rock festival. 60 000 visitors, three days, Kuusisaari park." },
    { name: 'Jutajaiset Folklore Festival', date: 'Mid-July', city: 'Rovaniemi', body: 'International folklore festival. Parades, performances, evening concerts.' },
    { name: 'Elojazz Festival', date: 'Late July', city: 'Oulu', body: 'Late-July jazz week — outdoor stages around Rotuaari.' },
  ]},
  { month: 'August', items: [
    { name: 'Air Guitar World Championships Final', date: 'Late August', city: 'Oulu', body: 'The actual world finals. 40 countries, packed Rotuaari park, locals from age 8 to 80.' },
    { name: 'Ijahis Idja Sámi Music Festival', date: 'Mid-August', city: 'Inari', body: 'Indigenous music festival under the late-summer light. The closest thing to a club night Inari has.' },
    { name: 'Simerock', date: 'Late August', city: 'Rovaniemi', body: 'End-of-summer rock festival. Local Lapland crowd, smaller than Qstock but heavier.' },
  ]},
  { month: 'November', items: [
    { name: 'Levi FIS Alpine Ski World Cup', date: 'Mid-November', city: 'Levi', body: 'World Cup weekend. Hullu Poro Areena hosts after-parties; book accommodation a year ahead.' },
    { name: 'Ruka FIS Cross-Country Opening', date: 'Late November', city: 'Ruka', body: 'World-cup season opener. Zone Bar at the slope base is the after-party home.' },
  ]},
  { month: 'December', items: [
    { name: 'Christmas in Rovaniemi', date: 'Dec 1–24, 2026', city: 'Rovaniemi', body: 'Tourist peak. Bars run extended hours; Roy Club queues are 45 minutes deep on Saturdays.' },
    { name: "New Year's Eve fireworks", date: 'Dec 31, 2026', city: 'All cities', body: "Public fireworks at midnight — Rovaniemi central square, Oulu's market square, Levi slope." },
  ]},
];

export default function Events() {
  return (
    <>
      <PageSeo
        title="2026 Events Calendar — Finnish Lapland Nightlife"
        description="20 headline 2026 nightlife events across Finnish Lapland. Oulu European Capital of Culture, Midnight Sun Film Festival, FIS World Cup, Qstock, Air Guitar World Championships, Frozen People."
        path="/events"
        jsonLd={[
          articleSchema('2026 Lapland nightlife events calendar', '20 headline events across Finnish Lapland.', '/events'),
          pillarBreadcrumb('Events 2026', '/events'),
        ]}
      />

      <PillarHero
        icon={Calendar}
        eyebrow="20 headline weekends"
        title="2026 Events Calendar"
        subtitle="Twenty headline weekends. One European Capital of Culture."
        intro="Oulu wears the European Capital of Culture badge in 2026 and the calendar reflects it. Below: every weekend worth flying for, ranked by month."
        bgImage={IMG.pillarEvents}
        accentClass="from-pink/25 via-night/75 to-night"
      />

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-12">
          {events2026.map((m) => (
            <div key={m.month}>
              <div className="flex items-center gap-3 mb-5 border-b border-white/10 pb-3">
                <h2 className="font-heading text-3xl text-white tracking-tight">{m.month}</h2>
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
            <p className="text-xs uppercase tracking-[0.25em] text-pink font-bold mb-3">Bookable now</p>
            <h2 className="font-heading text-3xl sm:text-4xl text-white tracking-tight mb-2">Combine the festival with a tour</h2>
            <p className="text-white/60 max-w-xl mx-auto">Aurora hunts during festival nights, husky safaris between shows, the Sámi cultural day in Inari.</p>
          </div>
          <GygWidget query="Lapland festivals tours 2026" campaign="events_pillar" count={6} />
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-3xl text-white tracking-tight mb-3">Plan the trip around the date</h2>
          <p className="text-white/65 mb-6">Festival weekends sell out months ahead. Hotels go 60–80 % capacity 4–6 weeks before.</p>
          <AffiliateCTA partner="hotels" sid="events_cta" destination="Lapland" className="inline-flex items-center gap-2 bg-pink hover:bg-pink-dark text-white font-bold py-4 px-8 rounded-xl text-sm uppercase tracking-wider transition-all hover:-translate-y-0.5">
            Search hotels by date →
          </AffiliateCTA>
        </div>
      </section>
    </>
  );
}
