import { useEffect, useRef, useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { useLang } from '../i18n/useLang';
import AffiliateCTA from './AffiliateCTA';

// Map the page language → GetYourGuide widget locale code, so the embedded tour
// cards render in the visitor's language. Without this the GYG SDK geo-defaults
// to Finnish (the partner's home market), regardless of the page language.
const GYG_LOCALE: Record<string, string> = {
  en: 'en-US', fi: 'fi-FI', de: 'de-DE', ja: 'ja-JP', es: 'es-ES',
  'pt-BR': 'pt-BR', 'zh-CN': 'zh-CN', ko: 'ko-KR', fr: 'fr-FR', it: 'it-IT', nl: 'nl-NL', sv: 'sv-SE',
};

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
  sv: 'Se alla upplevelser på GetYourGuide',
};

// Shown only when the embed is blocked (ad-block / tracking-protection) — turns
// what was a bare empty box + link into an enticing image panel with a CTA.
const FALLBACK_LEAD: Record<string, string> = {
  en: 'Live prices and instant confirmation — open the bookable tours on GetYourGuide.',
  fi: 'Live-hinnat ja välitön vahvistus — avaa varattavat retket GetYourGuidessa.',
  de: 'Live-Preise und sofortige Bestätigung — buchbare Touren auf GetYourGuide öffnen.',
  ja: 'リアルタイムの料金と即時確認 — 予約可能なツアーを GetYourGuide で開く。',
  es: 'Precios en tiempo real y confirmación inmediata: abre las excursiones reservables en GetYourGuide.',
  'pt-BR': 'Preços em tempo real e confirmação imediata — abra os passeios reserváveis no GetYourGuide.',
  'zh-CN': '实时价格、即时确认——在 GetYourGuide 打开可预订的行程。',
  ko: '실시간 가격과 즉시 확정 — GetYourGuide에서 예약 가능한 투어를 확인하세요.',
  fr: 'Prix en temps réel et confirmation immédiate — ouvrez les excursions réservables sur GetYourGuide.',
  it: 'Prezzi in tempo reale e conferma immediata: apri le escursioni prenotabili su GetYourGuide.',
  nl: 'Actuele prijzen en directe bevestiging — open de boekbare tours op GetYourGuide.',
  sv: 'Aktuella priser och direkt bekräftelse — öppna de bokningsbara turerna på GetYourGuide.',
};

const SHADOW = { textShadow: '0 2px 4px rgba(0,0,0,0.85), 0 4px 10px rgba(0,0,0,0.7)' };

interface GygWidgetProps {
  /** GYG search query (e.g. "Rovaniemi nightlife", "Lapland aurora", "Levi tours"). */
  query: string;
  /** Number of items to render (default 6). */
  count?: number;
  /** Optional campaign tag — appears in CJ click attribution. */
  campaign?: string;
  /** Currency code shown on prices (default EUR). */
  currency?: string;
  /** Background image for the ad-block fallback panel (on-theme per placement). */
  fallbackImage?: string;
}

/**
 * GetYourGuide activities widget. Picked up by the Integration Analyzer
 * script in `index.html` (data-gyg-partner-id="VRMKD7N").
 *
 * Ad-block resilience: uBlock/Brave/ETP block widget.getyourguide.com, which
 * left the section as an empty bordered box with a bare link. If no iframe has
 * mounted shortly after render we treat the embed as blocked and swap in a
 * designed image panel + booking CTA instead (Vesa 2026-07-08).
 */
export default function GygWidget({
  query,
  count = 6,
  campaign = 'laplandnightlife',
  currency = 'EUR',
  fallbackImage = '/images/drive/pillarAuroraBars.webp',
}: GygWidgetProps) {
  const ref = useRef<HTMLDivElement>(null);
  const lang = useLang();
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    const w = window as unknown as { GYG?: { trigger?: () => void } };
    if (typeof w.GYG?.trigger === 'function') w.GYG.trigger();
    // Poll until the iframe mounts (slow loads mount well after 2.5 s) — a
    // one-shot check left the fallback stuck on (Vesa 2026-07-12). Fallback
    // stays only if the embed is truly blocked (ad-block etc.).
    setBlocked(false);
    let cancelled = false;
    let waited = 0;
    const FIRST_CHECK = 2500;
    const STEP = 1000;
    const MAX_WAIT = 12000;
    const tick = (delay: number): ReturnType<typeof setTimeout> =>
      setTimeout(() => {
        if (cancelled) return;
        waited += delay;
        if (ref.current?.querySelector('iframe')) {
          setBlocked(false);
          return;
        }
        setBlocked(true);
        if (waited < MAX_WAIT) tick(STEP);
      }, delay);
    const t = tick(FIRST_CHECK);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [query, lang]);

  return (
    <div className={blocked ? '' : 'bg-night-light/40 border border-white/10 rounded-2xl p-4 sm:p-6'}>
      {/* Embed target — kept mounted (just hidden when blocked) so the SDK can populate it. */}
      <div
        ref={ref}
        className={blocked ? 'h-0 overflow-hidden' : ''}
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

      {blocked ? (
        <div className="relative flex items-end overflow-hidden rounded-2xl border border-white/10 min-h-[240px]">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${fallbackImage})` }} />
          <div className="absolute inset-0 bg-gradient-to-t from-night from-5% via-night/80 via-[55%] to-night/30 pointer-events-none" />
          <div className="relative w-full p-6 sm:p-8">
            <p className="text-sm text-white/90 leading-relaxed max-w-md mb-5" style={SHADOW}>
              {FALLBACK_LEAD[lang] ?? FALLBACK_LEAD.en}
            </p>
            <AffiliateCTA
              partner="activities"
              sid={`${campaign.replace(/[^a-z0-9_]/g, '_')}_fallback`}
              destination="s"
              query={{ q: query }}
              className="inline-flex items-center gap-2 bg-pink hover:bg-pink-dark text-white font-bold px-6 py-3 rounded-xl text-xs sm:text-sm uppercase tracking-wider transition-colors"
            >
              {SEE_ALL[lang] ?? SEE_ALL.en} <ExternalLink size={14} />
            </AffiliateCTA>
          </div>
        </div>
      ) : (
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
      )}
    </div>
  );
}
