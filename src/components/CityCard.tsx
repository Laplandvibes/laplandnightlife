import { Link } from 'react-router-dom';
import type { City } from '../data/cities';
import { useLang } from '../i18n/useLang';
import { COPY } from '../locales/copy';

const tagColor: Record<City['tag'], string> = {
  'Real scene': 'bg-pink/15 text-pink border-pink/30',
  'Ski resort': 'bg-aurora-blue/15 text-aurora-blue border-aurora-blue/30',
  'Wilderness premium': 'bg-purple/15 text-purple-light border-purple/30',
  'Cultural anchor': 'bg-neon-yellow/15 text-neon-yellow border-neon-yellow/30',
  'Small town': 'bg-white/10 text-white/70 border-white/20',
};

export default function CityCard({ city }: { city: City }) {
  const lang = useLang();
  const explore = COPY[lang].cities.explore;
  return (
    <Link
      to={`/city/${city.slug}`}
      className="group relative block overflow-hidden rounded-2xl bg-night-light border border-white/10 hover:border-pink/40 transition-all duration-300 hover:-translate-y-1"
    >
      <div className="aspect-[4/3] relative overflow-hidden">
        <img
          src={city.img}
          alt={city.slug === 'ruka'
            ? `${city.name} nightlife: bars and clubs in Kuusamo, just south of the Lapland border`
            : city.slug === 'oulu'
              ? `${city.name} nightlife: bars and clubs in North Ostrobothnia, gateway to Lapland`
              : `${city.name} nightlife: bars and clubs in Finnish Lapland`}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-night via-night/75 to-night/20" />
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <span className={`text-[0.6rem] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full border ${tagColor[city.tag]}`}>
            {city.tag}
          </span>
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-[0.7rem] uppercase tracking-[0.2em] text-white/85 mb-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">{city.region}</p>
          <h3 className="font-heading text-2xl text-white tracking-tight leading-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">{city.name}</h3>
        </div>
      </div>
      <div className="p-5">
        <p className="text-sm text-white/85 leading-relaxed">{city.blurb}</p>
        <span className="inline-block mt-3 text-xs uppercase tracking-wider font-semibold text-pink group-hover:text-pink-dark">
          {explore} →
        </span>
      </div>
    </Link>
  );
}
