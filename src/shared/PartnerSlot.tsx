/**
 * PartnerSlot, shared kumppanikortti/-banneri/-listaus
 *
 * Käyttö kaikissa LaplandVibes-ekosysteemisivustoissa.
 *
 * SURFACE-TYYLI -huomio:
 *   Perusrakenne käyttää Tailwind-utilityja jotka toimivat dark-sivustoilla
 *   (hub, skiresorts, husky, dining…). Kevyet/lämpimät teemat (laplandchristmas,
 *   laplandstays) voivat ylikirjoittaa pintatyylit `className`-propilla, 
 *   esim. className="bg-white border-black/10 text-gray-900".
 *   Oletuspinta: bg-white/5 backdrop-blur-sm border border-white/15
 *   (toimii dark-sivustoilla; light-sivustot ohittavat className:lla).
 *
 * DOM-tunniste: jokainen renderöity slot saa data-partner-slot-attribuutin,
 *   jolla voi varmentaa että tyhjällä datalla DOM-muutoksia ei tapahdu:
 *   document.querySelectorAll('[data-partner-slot]').length === 0
 *
 * Affiliate-huomio: kumppanilinkki EI kulje go.laplandvibes.com-Workerin
 *   kautta (ei CJ-attribuutiota → ei noreferrer-kieltoa). Käytetään vain
 *   rel="sponsored noopener".
 */

export type Partner = {
  name: string;
  tagline?: string;
  taglineEn?: string;
  url: string;
  imageSrc?: string;
  /** Lifestyle/mood photo for ad units that show both a photo and the logo. */
  photoSrc?: string;
  badgeLabel?: string;
};

export type PartnerSlotProps = {
  partner: Partner | null;
  variant: 'card' | 'banner' | 'listing';
  locale?: string;
  className?: string;
};

function getBadgeLabel(partner: Partner, locale?: string): string {
  if (partner.badgeLabel) return partner.badgeLabel;
  // EN: locale === 'en' tai alkaa 'en'
  if (locale && (locale === 'en' || locale.startsWith('en'))) return 'Partner';
  return 'Kumppani';
}

export default function PartnerSlot({ partner, variant, locale, className }: PartnerSlotProps) {
  // Tyhjä paikka ei renderöidy lainkaan, ei wrapper-diviä, ei spacing-vaikutusta
  if (partner === null) return null;

  const badge = getBadgeLabel(partner, locale);

  // Gradient-placeholder kuvattomille kumppaneille (LV brand-palette)
  const gradientBg = 'bg-gradient-to-br from-[#0d2818] via-[#0F172A] to-[#1e1b4b]';

  /** Pieni badge-pilleri, aina näkyvissä kuluttajansuojalain edellyttämänä */
  function Badge() {
    return (
      <span className="absolute top-2 left-2 z-10 inline-flex items-center gap-1 rounded-full bg-vibe-pink/90 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-white shadow-sm">
        {badge}
      </span>
    );
  }

  // ────────────────────────────────────────────────────────────────────────────
  // CARD variant, kuva (tai gradient) + nimi + tagline
  // ────────────────────────────────────────────────────────────────────────────
  if (variant === 'card') {
    return (
      <a
        data-partner-slot="card"
        href={partner.url}
        target="_blank"
        rel="sponsored noopener"
        className={[
          'group relative flex flex-col overflow-hidden rounded-2xl border',
          'border-white/15 bg-white/5 backdrop-blur-sm',
          'hover:border-vibe-pink/40 transition-all duration-300',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        aria-label={`${badge}: ${partner.name}`}
      >
        {/* Kuva tai gradient-placeholder */}
        <div className="relative aspect-[16/10] overflow-hidden">
          {partner.imageSrc ? (
            <img
              src={partner.imageSrc}
              alt={partner.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            />
          ) : (
            <div className={`w-full h-full ${gradientBg}`} />
          )}
          <Badge />
        </div>

        {/* Teksti */}
        <div className="flex flex-col gap-1 p-4 sm:p-5">
          <p className="font-heading text-xl text-snow tracking-wide leading-tight group-hover:text-vibe-pink transition-colors">
            {partner.name}
          </p>
          {partner.tagline && (
            <p className="text-snow/65 text-sm leading-snug">{partner.tagline}</p>
          )}
        </div>
      </a>
    );
  }

  // ────────────────────────────────────────────────────────────────────────────
  // BANNER variant, leveä matala (koko-leveys CTA-banneri)
  // ────────────────────────────────────────────────────────────────────────────
  if (variant === 'banner') {
    return (
      <a
        data-partner-slot="banner"
        href={partner.url}
        target="_blank"
        rel="sponsored noopener"
        className={[
          'group relative flex items-center gap-4 overflow-hidden rounded-2xl border',
          'border-white/15 bg-white/5 backdrop-blur-sm px-5 py-4 sm:px-8 sm:py-5',
          'hover:border-vibe-pink/40 transition-all duration-300 w-full',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        aria-label={`${badge}: ${partner.name}`}
      >
        {/* Pieni kuva/thumbnail tai väripilkku */}
        {partner.imageSrc ? (
          <div className="shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden">
            <img
              src={partner.imageSrc}
              alt={partner.name}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className={`shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-xl ${gradientBg}`} />
        )}

        {/* Teksti */}
        <div className="flex flex-col gap-0.5 min-w-0">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-vibe-pink/90 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-white shadow-sm">
              {badge}
            </span>
          </div>
          <p className="font-heading text-lg sm:text-xl text-snow tracking-wide leading-tight group-hover:text-vibe-pink transition-colors truncate">
            {partner.name}
          </p>
          {partner.tagline && (
            <p className="text-snow/65 text-xs sm:text-sm leading-snug truncate">{partner.tagline}</p>
          )}
        </div>

        {/* Nuoli */}
        <span
          aria-hidden="true"
          className="ml-auto shrink-0 text-vibe-pink opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200 text-xl"
        >
          →
        </span>
      </a>
    );
  }

  // ────────────────────────────────────────────────────────────────────────────
  // LISTING variant, rivimuoto (esim. ravintola/aktiviteettilistan korostus)
  // ────────────────────────────────────────────────────────────────────────────
  // variant === 'listing'
  return (
    <a
      data-partner-slot="listing"
      href={partner.url}
      target="_blank"
      rel="sponsored noopener"
      className={[
        'group relative flex items-center gap-3 overflow-hidden rounded-xl border',
        'border-vibe-pink/30 bg-vibe-pink/5 px-4 py-3',
        'hover:bg-vibe-pink/10 hover:border-vibe-pink/50 transition-all duration-200 w-full',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      aria-label={`${badge}: ${partner.name}`}
    >
      {/* Väripilkku tai pikkukuva */}
      {partner.imageSrc ? (
        <div className="shrink-0 w-10 h-10 rounded-lg overflow-hidden">
          <img
            src={partner.imageSrc}
            alt={partner.name}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className={`shrink-0 w-10 h-10 rounded-lg ${gradientBg}`} />
      )}

      {/* Teksti */}
      <div className="flex flex-col gap-0.5 min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="inline-flex items-center rounded-full bg-vibe-pink/90 px-1.5 py-px text-[9px] font-semibold uppercase tracking-widest text-white shadow-sm">
            {badge}
          </span>
          <p className="font-body font-semibold text-sm text-snow group-hover:text-vibe-pink transition-colors truncate">
            {partner.name}
          </p>
        </div>
        {partner.tagline && (
          <p className="text-snow/55 text-xs leading-snug truncate">{partner.tagline}</p>
        )}
      </div>

      <span
        aria-hidden="true"
        className="ml-auto shrink-0 text-vibe-pink/60 group-hover:text-vibe-pink group-hover:translate-x-0.5 transition-all duration-200 text-sm"
      >
        →
      </span>
    </a>
  );
}
