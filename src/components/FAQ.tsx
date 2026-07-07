import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { useLang, useLocalePath } from '../i18n/useLang';
import { COPY } from '../locales/copy';

// Per-question deep links into the pages that actually back each answer
// (network rule 2026-07-07: FAQ answers must link to our own supporting
// content — labels reuse nav translations, so 0 new strings per locale).
const FAQ_ROUTE = {
  nightclubs: '/nightclubs',
  auroraBars: '/aurora-bars',
  cities: '/cities',
  summer: '/summer-nights',
} as const;
const FAQ_LINKS: (keyof typeof FAQ_ROUTE)[][] = [
  ['nightclubs'],           // 1 biggest nightclub → Hullu Poro tier list
  ['auroraBars'],           // 2 aurora from a bar → verified aurora bars
  ['cities'],               // 3 opening hours → per-city breakdowns
  ['summer'],               // 4 summer nightlife → midnight-sun page
  ['cities', 'nightclubs'], // 5 best city → city ranking + club tiers
];

export default function FAQ() {
  const lang = useLang();
  const to = useLocalePath();
  const c = COPY[lang].home;
  const nav = COPY[lang].nav;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const items = [
    { q: c.faq1Q, a: c.faq1A },
    { q: c.faq2Q, a: c.faq2A },
    { q: c.faq3Q, a: c.faq3A },
    { q: c.faq4Q, a: c.faq4A },
    { q: c.faq5Q, a: c.faq5A },
  ];

  return (
    <section className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-t border-white/5">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-[0.25em] text-pink font-bold mb-3">{c.faqEyebrow}</p>
          <h2 className="font-heading text-4xl sm:text-5xl text-white tracking-tight">{c.faqH}</h2>
        </div>
        <div className="space-y-3">
          {items.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`rounded-xl overflow-hidden border transition-colors ${
                  isOpen ? 'bg-night-light/60 border-pink/40' : 'bg-night-light/40 border-white/10 hover:border-white/25'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-start justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="flex items-start gap-3 flex-1 min-w-0">
                    <span className="font-heading text-lg text-pink/60 shrink-0 leading-tight pt-0.5">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="font-semibold text-white text-base sm:text-lg leading-snug">{faq.q}</span>
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 shrink-0 mt-1 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-pink' : 'text-white/60'
                    }`}
                    aria-hidden="true"
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pl-[3.25rem]">
                    <p className="text-sm sm:text-base text-white/85 leading-relaxed">{faq.a}</p>
                    <div className="flex flex-wrap gap-x-5 gap-y-2 mt-4">
                      {FAQ_LINKS[index].map((key) => (
                        <Link
                          key={key}
                          to={to(FAQ_ROUTE[key])}
                          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-pink hover:text-pink-dark transition-colors"
                        >
                          {nav[key]} <ArrowRight size={14} className="shrink-0" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
