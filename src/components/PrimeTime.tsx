import { Link } from 'react-router-dom';
import { CalendarDays, ArrowRight } from 'lucide-react';
import { upcomingEvents } from '../data/events';
import { eventImage } from '../data/eventImages';
import { useLang, useLocalePath } from '../i18n/useLang';
import { COPY } from '../locales/copy';

const SHADOW = {
  textShadow:
    '0 2px 4px rgba(0,0,0,0.85), 0 4px 10px rgba(0,0,0,0.7)',
};

export default function PrimeTime() {
  const lang = useLang();
  const to = useLocalePath();
  const c = COPY[lang].primeTime;

  /* 🔴🔴 EI ENÄÄ KÄSIN VALITTUJA NOSTOJA (Vesa 2026-09-09: *"edelleen jo menneitä
     juttuja etusivulla? … eikö automaattisesti etsitä näitä ja lisäillä?"*).
     Kortit olivat kolme kovakoodattua copy-kenttää ILMAN koneluettavaa päivää,
     joten ne eivät voineet vanheta itsestään: syyskuussa etusivu myi juhannusta.
     Nyt lähde on sama tapahtumakalenteri jolla on `endsBy`, ja valinta tehdään
     LUKIJAN kellosta. Menneet putoavat pois ilman että kukaan muistaa poistaa.

     🔴 Jos kalenteri loppuu (2026-kalenteri tyhjenee joulukuun jälkeen), osio ei
     renderöi tyhjää ruudukkoa vaan katoaa kokonaan. Tyhjä "Seuraavaksi Lapissa"
     olisi pahempi kuin ei osiota. */
  const cards = upcomingEvents(lang, 3);
  if (cards.length === 0) return null;
  return (
    <section id="prime-time" className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden border-t border-white/5">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-pink/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.25em] text-pink font-bold mb-3">{c.eyebrow}</p>
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl text-white tracking-wide">
            {c.h}
          </h2>
        </div>

        <div className="grid sm:grid-cols-3 gap-5">
          {cards.map((card) => (
            <Link
              key={card.enName}
              to={to('/events')}
              className="group relative overflow-hidden rounded-3xl border border-white/10 hover:border-pink/40 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_-20px_rgba(236,72,153,0.4)] flex flex-col"
            >
              {eventImage(card.enName) ? (
                <div
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                  style={{ backgroundImage: `url(${eventImage(card.enName)!})` }}
                />
              ) : (
                /* Ei kuvaa talle tapahtumalle: tumma pohja, ei lainattua valokuvaa. */
                <div className="absolute inset-0 bg-gradient-to-br from-night-light via-night to-night" />
              )}
              {/* Scrim must reach the date eyebrow (~120px from card top =
                  ~70% up), not just the bottom 3/5 — otherwise the small pink
                  date floats on the bare image and vanishes on bright shots
                  like the sunset card (Vesa 2026-07-07). */}
              <div className="absolute inset-0 bg-gradient-to-t from-night from-3% via-night/55 via-[45%] to-transparent pointer-events-none" />

              <div className="relative p-7 min-h-[440px] flex flex-col">
                <div className="flex items-start justify-between mb-6">
                  <CalendarDays size={44} className="text-pink drop-shadow-[0_0_18px_currentColor]" strokeWidth={1.5} />
                  <span
                    className="text-[0.55rem] uppercase tracking-[0.25em] font-bold text-white bg-black/40 backdrop-blur-md border border-white/30 rounded-full px-2.5 py-1"
                    style={SHADOW}
                  >
                    {card.city}
                  </span>
                </div>

                <div className="mt-auto">
                  <p className="text-sm sm:text-base font-heading tracking-wide text-white mb-2" style={SHADOW}>{card.date}</p>
                  {/* Kiintea rivimaara: ilman clampia otsikon 1 vs. 2 riviä siirsi
                      koko tekstilohkon eri korkeudelle naapurikorttiin nahden
                      (Vesa 9.9.: "tekstit ihan eri korkeudella"). */}
                  <h3 className="font-heading text-2xl sm:text-3xl text-white tracking-wide leading-tight mb-3 line-clamp-2 min-h-[2.4em]" style={SHADOW}>{card.name}</h3>
                  <p className="text-sm text-white leading-relaxed mb-5 line-clamp-3 min-h-[3.9em] font-medium" style={SHADOW}>{card.body}</p>

                  <div className="pt-3 border-t border-white/20 flex items-center justify-between">
                    <span className="text-xs uppercase tracking-[0.18em] text-pink font-bold" style={SHADOW}>{COPY[lang].home.events.full}</span>
                    <ArrowRight size={16} className="text-pink group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
