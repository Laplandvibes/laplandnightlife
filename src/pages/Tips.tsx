import { Link } from 'react-router-dom';
import { AlertTriangle, Phone, Sparkles, Music, Sun, Star, Calendar, ShieldAlert } from 'lucide-react';
import PageSeo from '../components/PageSeo';
import PillarHero from '../components/PillarHero';

const tips = [
  {
    h: 'Last call — everywhere.',
    icon: AlertTriangle,
    body: "Last call is 03:30 in city centres and ski resorts during peak season — earlier in small towns. There's no late-licence culture: when the bell rings, the night ends. Plan the order of bars; don't trust that one will stay open later than another.",
    to: '/nightclubs',
  },
  {
    h: 'Beer to igloo-bar cocktail.',
    icon: Sparkles,
    body: 'A €6 lager in a Rovaniemi pub and a €18 cocktail at Kakslauttanen Igloo Bar can be the same night. Just plan the order: pub first, igloo last. Most igloo bars are 30–40 min outside the city — taxi or hotel transfer required.',
    to: '/aurora-bars',
  },
  {
    h: 'Bar, club, Roy Club.',
    icon: Music,
    body: 'Rovaniemi locals say "we\'ll start at the bar, then a club, then Roy Club." Roy is always last because it closes latest (03:30). Saturday queues form by 23:00. ID always.',
    to: '/city/rovaniemi',
  },
  {
    h: 'No Uber. Save this number.',
    icon: Phone,
    body: "Uber doesn't exist in Lapland. Save Lähitaksi (0100 84 84) or your hotel's reception number. Taxis are reliable but can be 20+ min wait on Friday/Saturday — book ahead, especially out of ski resorts.",
    to: '/city/rovaniemi',
  },
  {
    h: 'A normal Saturday in February.',
    icon: Sun,
    body: '14:30 sunset, –22 °C outside, Roy Club queue at 23:00. The cold closes the after-party, not the bar. Layer up: a thin coat for the queue is misery. The walk between bars is part of the experience.',
    to: '/city/rovaniemi',
  },
  {
    h: 'Then a salmiakki shot.',
    icon: Star,
    body: "Salmiakki Koskenkorva (salt-liquorice vodka) is the local rite of passage. You'll be offered one. Take it. It's harsh on the first try, mythical on the third. €5–7 per shot at most bars.",
    to: '/aurora-bars',
  },
  {
    h: 'Three real windows. One surprise.',
    icon: Calendar,
    body: 'Aurora season runs Sept–Apr. Midnight sun is Jun 6 – Jul 7. The Midnight Sun Film Festival is mid-June. The surprise: summer is busier than winter in Oulu — Qstock + Frozen People + the bar terraces stay open till 03:00 in 24-hour daylight.',
    to: '/summer-nights',
  },
];

const rules = [
  {
    h: 'All recreational drugs are illegal — even cannabis.',
    body: "Finland is strict on this. Possession of any recreational drug is a crime, and police don't differentiate. Don't carry, don't buy, don't risk it — fines start at 100s of euros, deportation is possible for tourists.",
  },
  {
    h: 'BAC limit is 0.5 ‰ — roughly half a beer.',
    body: 'About half a pint of lager will put an average adult over the limit. Lapland has more random breath-tests per capita than Helsinki. Police set up checkpoints leaving ski resorts on weekend mornings.',
  },
  {
    h: 'If it moves, the limit applies.',
    body: 'The same 0.5 ‰ limit applies to snowmobiles, e-scooters and bicycles — not just cars. A drunk snowmobile crash on resort property is a criminal offence, not a fine.',
  },
  {
    h: 'The street is not a terrace.',
    body: 'Drinking alcohol in public spaces is technically prohibited (with park-festival exceptions in summer). Police enforce it loosely — but they do enforce, especially in Rovaniemi centre and around Levi resort.',
  },
];

export default function Tips() {
  return (
    <>
      <PageSeo
        title="Tips & Local Rules — Lapland Nightlife"
        description="Seven things nobody tells you about Lapland nightlife — last call, taxi numbers, salmiakki shots — plus the four Finnish drinking laws you need to know before you go out."
        path="/tips"
      />

      <PillarHero
        icon={ShieldAlert}
        iconColor="text-neon-yellow"
        eyebrow="Local intel"
        title="Things nobody tells you."
        subtitle="The seven habits that separate locals from tourists — plus the four laws that turn a good night into a problem."
        intro="Read this once before you fly. We're not a city-break guide; we live here. The rules are stricter than you think and the fixes are simple."
      />

      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-[0.25em] text-pink font-bold mb-3">Seven habits</p>
            <h2 className="font-heading text-3xl sm:text-4xl text-white tracking-tight">
              Seven things nobody tells you.
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tips.map((t) => (
              <Link
                key={t.h}
                to={t.to}
                className="group flex flex-col bg-night-light/40 border border-white/10 rounded-xl p-5 hover:border-pink/40 hover:-translate-y-0.5 transition-all"
              >
                <t.icon size={22} className="text-pink mb-3" />
                <h3 className="font-heading text-lg text-white tracking-tight mb-2">{t.h}</h3>
                <p className="text-sm text-white/70 leading-relaxed mb-3">{t.body}</p>
                <span className="mt-auto pt-2 text-[0.65rem] uppercase tracking-[0.18em] text-pink font-bold">
                  More →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-night-light/30 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-[0.25em] text-neon-yellow font-bold mb-3">Read this once</p>
            <h2 className="font-heading text-3xl sm:text-4xl text-white tracking-tight">
              Finland is strict. Very strict.
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {rules.map((r) => (
              <div key={r.h} className="bg-night-light/60 border border-neon-yellow/20 rounded-xl p-5">
                <h3 className="font-heading text-lg text-white tracking-tight mb-2">{r.h}</h3>
                <p className="text-sm text-white/75 leading-relaxed">{r.body}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-white/50 mt-8">
            Editorial standards + advertising disclosures:{' '}
            <Link to="/terms" className="text-pink hover:text-pink-dark underline underline-offset-4">
              Terms of Service →
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
