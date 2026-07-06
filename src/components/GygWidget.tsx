import { useEffect, useRef } from 'react';
import { ExternalLink } from 'lucide-react';
import { useLang } from '../i18n/useLang';
import AffiliateCTA from './AffiliateCTA';

// Map the page language → GetYourGuide widget locale code, so the embedded tour
// cards render in the visitor's language. Without this the GYG SDK geo-defaults
// to Finnish (the partner's home market), regardless of the page language.
const GYG_LOCALE: Record<string, string> = {
  en: 'en-US', fi: 'fi-FI', de: 'de-DE', ja: 'ja-JP', es: 'es-ES',
  'pt-BR': 'pt-BR', 'zh-CN': 'zh-CN', ko: 'ko-KR', fr: 'fr-FR', it: 'it-IT', nl: 'nl-NL',
};

// Ad-block fallback: uBlock/Brave/ETP block widget.getyourguide.com (the
// embedded iframe), but a top-level link to getyourguide.com is never blocked.
// Always rendered under the widget — for blocked viewers it's the only booking
// path, for everyone else it's a "see more" CTA. Same pattern as wellness.
const SEE_ALL: Record<string, string> = {
  en: 'See all experiences on GetYourGuide',
  fi: 'Katso kaikki elämykset GetYourGuidessa',
  de: 'Alle Erlebnisse auf GetYourGuide ansehen',
  ja: 'GetYourGuideですべての体験を見る',
  es: 'Ver todas las experiencias en GetYourGuide',
  'pt-BR': 'Veja todas as experiências no GetYourGuide',
  'zh-CN': '在 GetYourGuide 查看所有体验',
  ko: 'GetYourGuide에서 모든 체험 보기',
  fr: 'Voir toutes les expériences sur GetYourGuide',
  it: 'Vedi tutte le esperienze su GetYourGuide',
  nl: 'Bekijk alle ervaringen op GetYourGuide',
};

interface GygWidgetProps {
  /** GYG search query (e.g. "Rovaniemi nightlife", "Lapland aurora", "Levi tours"). */
  query: string;
  /** Number of items to render (default 6). */
  count?: number;
  /** Optional campaign tag — appears in CJ click attribution. */
  campaign?: string;
  /** Currency code shown on prices (default EUR). */
  currency?: string;
}

/**
 * GetYourGuide activities widget. Picked up by the Integration Analyzer
 * script in `index.html` (data-gyg-partner-id="VRMKD7N").
 *
 * Full-info mode: prices, ratings, durations all rendered. The previous
 * `data-gyg-partial-view` mode hid prices, which kills perceived value.
 */
export default function GygWidget({ query, count = 6, campaign = 'laplandnightlife', currency = 'EUR' }: GygWidgetProps) {
  const ref = useRef<HTMLDivElement>(null);
  const lang = useLang();

  useEffect(() => {
    const w = window as unknown as { GYG?: { trigger?: () => void } };
    if (typeof w.GYG?.trigger === 'function') w.GYG.trigger();
  }, [query, lang]);

  return (
    <div className="bg-night-light/40 border border-white/10 rounded-2xl p-4 sm:p-6">
      <div
        ref={ref}
        key={`gyg-${lang}-${query}`}
        data-gyg-href="https://widget.getyourguide.com/default/activities.frame"
        data-gyg-locale-code={GYG_LOCALE[lang] ?? 'en-US'}
        data-gyg-widget="activities"
        data-gyg-number-of-items={String(count)}
        data-gyg-currency={currency}
        data-gyg-cmp={campaign}
        data-gyg-partner-id="VRMKD7N"
        data-gyg-q={query}
      >
        <span className="sr-only">Powered by GetYourGuide</span>
      </div>
      <div className="mt-4 text-center">
        <AffiliateCTA
          partner="activities"
          sid={`${campaign.replace(/[^a-z0-9_]/g, '_')}_see_all`}
          destination="s"
          query={{ q: query }}
          className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.18em] font-bold text-white/70 hover:text-pink transition-colors"
        >
          {SEE_ALL[lang] ?? SEE_ALL.en} <ExternalLink size={12} />
        </AffiliateCTA>
      </div>
    </div>
  );
}
