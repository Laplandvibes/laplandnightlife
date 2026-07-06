import { Hotel, Plane, Car } from 'lucide-react';
import BookingWidget from './BookingWidget';
import { useLang } from '../i18n/useLang';
import { COPY } from '../locales/copy';

export default function BookingSection() {
  const lang = useLang();
  const c = COPY[lang].booking;

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 bg-gradient-to-b from-night via-night-light/50 to-night" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-purple/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-pink/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-xs uppercase tracking-[0.25em] text-pink font-bold mb-3">{c.eyebrow}</p>
          <h2 className="font-heading text-4xl sm:text-5xl text-white tracking-tight mb-3">{c.h}</h2>
          <p className="text-white/85 max-w-xl mx-auto">
            {c.body}
          </p>
        </div>

        <BookingWidget />

        <div className="mt-10 grid sm:grid-cols-3 gap-3 text-center">
          {[
            { icon: Hotel, h: c.s1H, body: c.s1Body },
            { icon: Plane, h: c.s2H, body: c.s2Body },
            { icon: Car, h: c.s3H, body: c.s3Body },
          ].map((s) => (
            <div key={s.h} className="bg-night-light/40 border border-white/10 rounded-xl p-4">
              <s.icon size={18} className="text-purple-light mx-auto mb-2" />
              <p className="font-heading text-base text-white tracking-tight">{s.h}</p>
              <p className="text-xs text-white/80 mt-1">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
