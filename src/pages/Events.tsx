import { Calendar } from 'lucide-react';
import PageSeo, { pillarBreadcrumb, articleSchema } from '../components/PageSeo';
import PillarHero from '../components/PillarHero';
import GygWidget from '../components/GygWidget';
import AffiliateCTA from '../components/AffiliateCTA';
import { IMG } from '../data/images';
import { useLang, useLocalePath } from '../i18n/useLang';
import { COPY } from '../locales/copy';
import { eventImage } from '../data/eventImages';
import IllustrationMark from '../components/IllustrationMark';
import TicketmasterCard from '../components/TicketmasterCard';
import {
  EVENTS, EVENTS_BASE, EVENT_COUNT, todayLocalIso, pastFlags,
} from '../data/events';

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

  /* 🔴🔴 TULEVAT ENSIN (Vesa 2026-09-09: *"tapahtumataulu pitää tottakai olla
     ylösalaisin, seuraavaksi tuleva ylimpänä. nyt joutuu scrollaa jo menneet
     tapahtumat ennen kuin näkee uudet"*).

     Kalenteri oli tammikuusta joulukuuhun, joten syyskuussa lukija joutui
     ohittamaan yhdeksän kuukautta mennyttä ennen ensimmäistä asiaa johon voi
     ostaa lipun. Kuukausijärjestys EI ole sama asia kuin hyödyllinen järjestys.

     Kuukaudet, joissa on vähintään yksi tuleva tapahtuma, nousevat ylös omassa
     aikajärjestyksessään; kokonaan menneet jäävät alle. Alkuperäinen indeksi
     kulkee mukana, koska `past` on indeksoitu sillä. */
  const ordered = data
    .map((m, mi) => ({ m, mi, upcoming: m.items.some((_, ii) => !past[mi]?.[ii]) }))
    .sort((a, b) => (a.upcoming === b.upcoming ? a.mi - b.mi : a.upcoming ? -1 : 1));
  const firstPast = ordered.findIndex((x) => !x.upcoming);
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
        accentVia="via-pink/25"
      />

      {/* 🔴 Lipunmyynti sivun YLAOSAAN (Vesa 9.9.: "sivun ylaosaan tottakai").
          Se oli kalenterin ALAPUOLELLA tekstilohkona, eli lukija loysi sen vasta
          selattuaan kaikki kuukaudet lapi. */}
      <section className="px-4 sm:px-6 lg:px-8 pt-12">
        <div className="max-w-5xl mx-auto">
          <TicketmasterCard sid="events_tickets_top" />
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-12">
          {next && (
            <p className="text-sm text-white/70">
              <span className="text-[0.65rem] uppercase tracking-[0.18em] text-pink font-bold mr-2">{c.nextUp}</span>
              <span className="text-white font-semibold">{next.name}</span>
              <span className="text-white/50"> · {next.date} · {next.city}</span>
            </p>
          )}

          {ordered.map(({ m, mi }, oi) => (
            <div key={m.monthKey}>
              {oi === firstPast && firstPast > 0 && (
                <div className="flex items-center gap-4 mb-8 mt-4">
                  <span className="h-px flex-1 bg-white/10" />
                  <span className="text-[0.65rem] uppercase tracking-[0.25em] text-white/40 font-bold">
                    {c.pastLabel}
                  </span>
                  <span className="h-px flex-1 bg-white/10" />
                </div>
              )}
              <div className="flex items-center gap-3 mb-5 border-b border-white/10 pb-3">
                <h2 className="font-heading text-3xl text-white tracking-wide">{c.months[m.monthKey]}</h2>
                <span className="text-xs uppercase tracking-wider text-pink/70 font-semibold">2026</span>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {m.items.map((e, ii) => {
                  const isPast = past[mi]?.[ii] ?? false;
                  /* 🔴 Kuva haetaan EN-nimella indeksilla, ei kaannetylla nimella:
                     `EVENTS_BASE.en` on kuvakartan ainoa vakaa avain (12 lokaalia
                     ei voi olla eri mielta siita mika kuva kuuluu tapahtumaan). */
                  const img = eventImage(EVENTS_BASE.en[mi]?.items[ii]?.name ?? '');
                  return (
                    <div
                      key={e.name}
                      className={
                        'overflow-hidden rounded-xl border transition-all ' +
                        (isPast
                          ? 'bg-night-light/20 border-white/5 opacity-60'
                          : 'bg-night-light/40 border-white/10 hover:border-pink/30 hover:-translate-y-0.5')
                      }
                    >
                      {img && (
                        <div className="relative h-36 sm:h-40">
                          <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: `url(${img})` }}
                            role="img"
                            aria-label={e.name}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-night-light/90 via-night-light/20 to-transparent" />
                          <IllustrationMark />
                        </div>
                      )}
                      <div className="p-5">
                      <p className={`text-[0.65rem] uppercase tracking-[0.18em] font-bold mb-1 ${isPast ? 'text-white/45' : 'text-pink'}`}>
                        {e.date} · {e.city}
                        {isPast && (
                          <span className="ml-2 border border-white/20 rounded px-1.5 py-0.5 text-white/55 tracking-normal">
                            {c.pastLabel}
                          </span>
                        )}
                      </p>
                      <h3 className={`font-heading text-xl tracking-wide mb-2 ${isPast ? 'text-white/70' : 'text-white'}`}>{e.name}</h3>
                      <p className={`text-sm leading-relaxed ${isPast ? 'text-white/50' : 'text-white/70'}`}>{e.body}</p>
                      </div>
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
            <h2 className="font-heading text-2xl text-white tracking-wide mb-2">{c.ticketsH}</h2>
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
            <h2 className="font-heading text-3xl sm:text-4xl text-white tracking-wide mb-2">{c.gygH}</h2>
            <p className="text-white/80 max-w-xl mx-auto">{c.gygBody}</p>
          </div>
          <GygWidget query="Lapland festivals tours 2026" campaign="events_pillar" count={6} />
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-3xl text-white tracking-wide mb-3">{c.ctaH}</h2>
          <p className="text-white/65 mb-6">{c.ctaBody}</p>
          <AffiliateCTA partner="hotels" sid="events_cta" destination="Lapland" className="inline-flex items-center gap-2 bg-pink hover:bg-pink-dark text-white font-bold py-4 px-8 rounded-xl text-sm uppercase tracking-wider transition-all hover:-translate-y-0.5">
            {c.ctaBtn}
          </AffiliateCTA>
        </div>
      </section>
    </>
  );
}
