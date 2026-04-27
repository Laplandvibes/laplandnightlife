import { Hotel, Plane, Car } from 'lucide-react';
import BookingWidget from './BookingWidget';

export default function BookingSection() {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden border-t border-white/5">
      {/* Subtle backdrop */}
      <div className="absolute inset-0 bg-gradient-to-b from-night via-night-light/50 to-night" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-purple/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-pink/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-xs uppercase tracking-[0.25em] text-pink font-bold mb-3">Plan the trip</p>
          <h2 className="font-heading text-4xl sm:text-5xl text-white tracking-tight mb-3">Book the bed before the bar.</h2>
          <p className="text-white/65 max-w-xl mx-auto">
            Hotels and cabins in walking distance of Roy Club, Hullu Poro, Kakslauttanen Igloo Bar, the Rotuaari strip — searched on Expedia partners.
          </p>
        </div>

        <BookingWidget />

        <div className="mt-10 grid sm:grid-cols-3 gap-3 text-center">
          {[
            { icon: Hotel, h: '50+ verified venues', body: 'Bars, clubs, igloo bars — every city covered' },
            { icon: Plane, h: '5 Lapland airports', body: 'RVN, IVL, KTT, KEM, KAO + Helsinki rail' },
            { icon: Car, h: 'No Uber up here', body: 'Car rental at every airport, return to any city' },
          ].map((s) => (
            <div key={s.h} className="bg-night-light/40 border border-white/10 rounded-xl p-4">
              <s.icon size={18} className="text-purple-light mx-auto mb-2" />
              <p className="font-heading text-base text-white tracking-tight">{s.h}</p>
              <p className="text-xs text-white/55 mt-1">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
