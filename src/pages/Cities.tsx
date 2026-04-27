import CityCard from '../components/CityCard';
import PageSeo, { pillarBreadcrumb, articleSchema } from '../components/PageSeo';
import { CITIES } from '../data/cities';

export default function Cities() {
  return (
    <>
      <PageSeo
        title="All 14 Lapland Nightlife Cities"
        description="From Oulu's 8-club Rotuaari strip to Salla's 3 300 residents. Every Finnish Lapland town with a nightlife claim — ranked honestly. Real scenes, ski resorts, igloo-bar villages, and the small towns in between."
        path="/cities"
        ogImage="https://laplandnightlife.com/images/hero/cities-rovaniemi-bridge.webp"
        jsonLd={[
          articleSchema('All 14 Lapland nightlife cities', 'Honest ranking of every Lapland town with a nightlife claim.', '/cities'),
          pillarBreadcrumb('Cities', '/cities'),
        ]}
      />

      <section className="relative pt-32 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: 'url(/images/hero/cities-rovaniemi-bridge.webp)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-night/60 via-night/80 to-night" />
        <div className="relative max-w-5xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-pink font-bold mb-3">Destinations</p>
          <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl text-white tracking-tight mb-5">All 14 Cities</h1>
          <p className="text-white/75 text-lg max-w-2xl mx-auto leading-relaxed">
            From Oulu&rsquo;s 8-club Rotuaari strip to Salla&rsquo;s 3 300 residents and one ski slope.
            Every Lapland town with a nightlife claim — ranked honestly.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {CITIES.map((c) => <CityCard key={c.slug} city={c} />)}
        </div>
      </section>
    </>
  );
}
