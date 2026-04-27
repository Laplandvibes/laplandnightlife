import { useParams, Link } from 'react-router-dom';
import { MapPin, AlertTriangle, ArrowLeft, ArrowRight, ExternalLink, Sparkles, Sun, Camera, Music } from 'lucide-react';
import PageSeo, { citySchema } from '../components/PageSeo';
import AffiliateCTA from '../components/AffiliateCTA';
import GygWidget from '../components/GygWidget';
import { CITIES, CITY_BY_SLUG, CITY_QUICK_FACTS } from '../data/cities';
import { getCrossLinks, NEARBY } from '../data/cityCrossLinks';

const SHADOW = {
  textShadow:
    '0 2px 4px rgba(0,0,0,0.85), 0 4px 10px rgba(0,0,0,0.7), 0 8px 24px rgba(0,0,0,0.55)',
};

const PILLAR_LINKS = [
  { to: '/aurora-bars', label: 'Aurora bars', icon: Sparkles, why: 'Where the ceiling does the work.' },
  { to: '/nightclubs', label: 'Nightclubs & dance', icon: Music, why: 'The 1 700-capacity superclub and its rivals.' },
  { to: '/summer-nights', label: 'Summer nights', icon: Sun, why: 'When the sun forgets to set.' },
  { to: '/photography', label: 'Aurora photography', icon: Camera, why: 'The dark hours that pay the camera back.' },
];

export default function CityPage() {
  const { slug } = useParams<{ slug: string }>();
  const city = slug ? CITY_BY_SLUG[slug] : undefined;

  if (!city) {
    return (
      <section className="min-h-screen pt-32 px-4 text-center">
        <h1 className="font-heading text-5xl text-white mb-4">City not found</h1>
        <p className="text-white/70 mb-6">We don&rsquo;t cover this town yet.</p>
        <Link to="/cities" className="text-pink underline">Back to all cities →</Link>
      </section>
    );
  }

  const description = `${city.pageTagline} ${city.intro.slice(0, 120)}`;
  const quickFacts = CITY_QUICK_FACTS[city.slug] ?? [];
  const crossLinks = getCrossLinks(city);
  const nearbySlugs = NEARBY[city.slug] ?? [];
  const nearbyCities = nearbySlugs
    .map((s) => CITIES.find((c) => c.slug === s))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  return (
    <>
      <PageSeo
        title={`${city.name} Nightlife — ${city.pageTagline}`}
        description={description}
        path={`/city/${city.slug}`}
        ogImage={`https://laplandnightlife.com${city.img}`}
        jsonLd={citySchema(city.name, city.slug, city.intro)}
      />

      {/* Hero — taller, image-forward, light overlay only */}
      <section className="relative min-h-[70svh] pt-28 pb-16 sm:pt-36 sm:pb-20 px-4 sm:px-6 lg:px-8 flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${city.img})` }}
        />
        {/* Thin bottom vignette only — keep image visible */}
        <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-night via-night/60 to-transparent pointer-events-none" />

        <div className="relative w-full max-w-5xl mx-auto">
          <Link
            to="/cities"
            className="inline-flex items-center gap-2 text-white hover:text-pink mb-5 text-xs sm:text-sm uppercase tracking-wider font-bold"
            style={SHADOW}
          >
            <ArrowLeft size={14} /> All cities
          </Link>
          <p
            className="text-[0.7rem] sm:text-xs uppercase tracking-[0.25em] text-pink font-bold mb-3"
            style={SHADOW}
          >
            {city.tag} · {city.region}
          </p>
          <h1
            className="font-heading text-5xl sm:text-7xl md:text-8xl text-white tracking-tight leading-[0.95] mb-4"
            style={SHADOW}
          >
            {city.name}
          </h1>
          <p
            className="text-white italic text-xl sm:text-2xl md:text-3xl max-w-2xl leading-tight font-medium"
            style={SHADOW}
          >
            {city.pageTagline}
          </p>
        </div>
      </section>

      {/* Quick facts strip */}
      {quickFacts.length > 0 && (
        <section className="py-8 px-4 sm:px-6 lg:px-8 border-t border-white/5 bg-night-light/40">
          <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {quickFacts.map((f) => (
              <div
                key={f.label}
                className="bg-night-light/60 border border-white/10 rounded-xl p-3 sm:p-4 text-center sm:text-left"
              >
                <p className="text-[0.6rem] sm:text-[0.65rem] uppercase tracking-[0.18em] text-pink font-bold mb-1">
                  {f.label}
                </p>
                <p className="font-heading text-base sm:text-lg text-white tracking-tight leading-tight">
                  {f.value}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Intro */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <p className="text-white/85 text-base sm:text-lg leading-relaxed">{city.intro}</p>
        </div>
      </section>

      {/* Verified venues */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-xs uppercase tracking-[0.25em] text-pink font-bold mb-3">Verified by us</p>
            <h2 className="font-heading text-3xl sm:text-4xl text-white tracking-tight">
              Where {city.name} actually goes out
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {city.venues.map((v) => (
              <div
                key={v.name}
                className="bg-night-light/40 border border-white/10 rounded-xl p-5 hover:border-pink/30 hover:-translate-y-0.5 transition-all"
              >
                <p className="text-[0.6rem] uppercase tracking-[0.2em] text-pink font-bold mb-1">{v.type}</p>
                <h3 className="font-heading text-xl text-white tracking-tight mb-2">{v.name}</h3>
                <p className="text-sm text-white/70 leading-relaxed">{v.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Local intel */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-night-light/30 border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle className="text-neon-yellow" size={20} />
            <h2 className="font-heading text-3xl text-white tracking-tight">Local intel</h2>
          </div>
          <ul className="space-y-3">
            {city.knowList.map((k, i) => (
              <li key={i} className="flex gap-3 bg-night-light/40 border border-white/10 rounded-lg p-4">
                <span className="text-pink font-heading text-xl leading-none">·</span>
                <span className="text-sm text-white/80 leading-relaxed">{k}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Tonight's tours — bookable */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-xs uppercase tracking-[0.25em] text-pink font-bold mb-3">Bookable now</p>
            <h2 className="font-heading text-3xl sm:text-4xl text-white tracking-tight mb-2">
              Tonight&rsquo;s tours in {city.name}
            </h2>
            <p className="text-white/65 max-w-xl mx-auto">
              Live availability, instant confirmation. Book the activity that matches the night you&rsquo;re planning.
            </p>
          </div>
          <GygWidget query={`${city.name} Lapland`} campaign={`city_${city.slug}`} count={6} />
        </div>
      </section>

      {/* Topical pillars — internal links */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-xs uppercase tracking-[0.25em] text-pink font-bold mb-3">Go deeper</p>
            <h2 className="font-heading text-3xl sm:text-4xl text-white tracking-tight">
              {city.name} by night, by theme
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {PILLAR_LINKS.map((p) => (
              <Link
                key={p.to}
                to={p.to}
                className="group bg-night-light/40 border border-white/10 rounded-xl p-5 hover:border-pink/40 hover:-translate-y-0.5 transition-all"
              >
                <p.icon size={22} className="text-pink mb-3" strokeWidth={1.6} />
                <p className="font-heading text-lg text-white tracking-tight mb-1.5 group-hover:text-pink transition-colors">
                  {p.label}
                </p>
                <p className="text-xs text-white/60 leading-relaxed mb-3">{p.why}</p>
                <span className="text-[0.65rem] uppercase tracking-[0.18em] text-pink font-bold inline-flex items-center gap-1">
                  Read <ArrowRight size={12} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* More in Lapland — ecosystem cross-links */}
      {crossLinks.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-night-light/30 border-t border-white/5">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <p className="text-xs uppercase tracking-[0.25em] text-pink font-bold mb-3">Sister sites</p>
              <h2 className="font-heading text-3xl sm:text-4xl text-white tracking-tight mb-2">
                More of {city.name} in the LaplandVibes network
              </h2>
              <p className="text-white/60 max-w-xl mx-auto">
                Beyond the bars — sleep, transport, ski, nature, husky safaris. All curated by the same team.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {crossLinks.map((l) => (
                <a
                  key={l.url}
                  href={l.url}
                  target="_blank"
                  rel="noopener"
                  className="group bg-night-light/40 border border-white/10 rounded-xl p-5 hover:border-pink/40 hover:-translate-y-0.5 transition-all flex flex-col"
                >
                  <div className="flex items-start justify-between mb-2">
                    <p className="text-[0.6rem] uppercase tracking-[0.18em] text-pink font-bold">{l.site}</p>
                    <ExternalLink size={12} className="text-white/40 group-hover:text-pink transition-colors" />
                  </div>
                  <p className="font-heading text-base text-white tracking-tight mb-2 group-hover:text-pink transition-colors leading-snug">
                    {l.label}
                  </p>
                  <p className="text-xs text-white/55 leading-relaxed">{l.why}</p>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Nearby cities */}
      {nearbyCities.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/5">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <p className="text-xs uppercase tracking-[0.25em] text-pink font-bold mb-3">Nearby in Lapland</p>
              <h2 className="font-heading text-3xl sm:text-4xl text-white tracking-tight">
                Pair {city.name} with another night
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {nearbyCities.map((c) => (
                <Link
                  key={c.slug}
                  to={`/city/${c.slug}`}
                  className="group relative overflow-hidden rounded-xl border border-white/10 hover:border-pink/40 transition-all hover:-translate-y-0.5"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                    style={{ backgroundImage: `url(${c.img})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-night via-night/70 to-transparent" />
                  <div className="relative p-4 min-h-[160px] flex flex-col justify-end">
                    <p className="text-[0.6rem] uppercase tracking-[0.18em] text-pink font-bold mb-1" style={SHADOW}>
                      {c.tag}
                    </p>
                    <h3 className="font-heading text-xl text-white tracking-tight mb-1" style={SHADOW}>
                      {c.name}
                    </h3>
                    <p className="text-xs text-white/80 line-clamp-2" style={SHADOW}>{c.blurb}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Stay in {city} CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <MapPin className="text-pink mx-auto mb-3" size={26} />
          <h2 className="font-heading text-3xl text-white tracking-tight mb-3">Stay in {city.name}</h2>
          <p className="text-white/65 mb-6 max-w-xl mx-auto">
            Hotel, cabin or igloo — book through Expedia partners. Search runs through our affiliate redirect; the price you see is the price you pay.
          </p>
          <AffiliateCTA
            partner="hotels"
            sid={`city_${city.slug}_cta`}
            destination={city.name}
            className="inline-flex items-center gap-2 bg-pink hover:bg-pink-dark text-white font-bold py-4 px-8 rounded-xl text-sm uppercase tracking-wider transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-pink/30"
          >
            Browse {city.name} stays →
          </AffiliateCTA>
        </div>
      </section>
    </>
  );
}
