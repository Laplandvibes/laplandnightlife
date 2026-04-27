import { useEffect, useRef } from 'react';

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

  useEffect(() => {
    const w = window as unknown as { GYG?: { trigger?: () => void } };
    if (typeof w.GYG?.trigger === 'function') w.GYG.trigger();
  }, [query]);

  return (
    <div className="bg-night-light/40 border border-white/10 rounded-2xl p-4 sm:p-6">
      <div
        ref={ref}
        key={query}
        data-gyg-href="https://widget.getyourguide.com/default/activities.frame"
        data-gyg-locale-code="en-US"
        data-gyg-widget="activities"
        data-gyg-number-of-items={String(count)}
        data-gyg-currency={currency}
        data-gyg-cmp={campaign}
        data-gyg-partner-id="VRMKD7N"
        data-gyg-q={query}
      >
        <span className="sr-only">Powered by GetYourGuide</span>
      </div>
    </div>
  );
}
