import { useEffect } from 'react';
import SharedNotFound from '../shared/NotFound';
import { useLang, useLocalePath } from '../i18n/useLang';
import { COPY } from '../locales/copy';

// Thin wrapper around the shared network 404 (Vesa 2026-07-12 migration).
// SharedNotFound is the vendored copy in src/shared (sync-shared.mjs), matching
// how every other shared component is imported on this site.
//
// robots: SharedNotFound appends its own <meta name="robots" content="noindex">,
// but that alone leaves a window open here. scripts/prerender.mjs prerenders the
// route '' straight over dist/index.html, so the SPA fallback that Cloudflare
// Pages returns with 200 for EVERY nonexistent URL is the rendered home page —
// PageSeo's <meta name="robots" content="index, follow, max-image-preview:large">
// included. Until the app renders the 404, that is the only directive a crawler
// sees. The effect below flips every inherited robots meta to noindex while the
// 404 is mounted and restores the previous value on unmount, so client-side
// navigation back into a real page stays indexable.
export default function NotFound() {
  const lang = useLang();
  const to = useLocalePath();
  const c = COPY[lang].nav;

  useEffect(() => {
    const inherited = Array.from(
      document.querySelectorAll<HTMLMetaElement>('meta[name="robots"]'),
    );
    const previous = inherited.map((el) => el.getAttribute('content'));
    inherited.forEach((el) => el.setAttribute('content', 'noindex'));
    // landmark={false} because this site's app layout already renders the
    // page's <main>. Without it the 404 route shipped two nested landmarks --
    // measured from the rendered DOM 2026-08-13, invisible to grep.
    return () => {
      inherited.forEach((el, i) => {
        const prev = previous[i];
        if (prev === null) el.removeAttribute('content');
        else el.setAttribute('content', prev);
      });
    };
  }, []);

  return (
    <SharedNotFound
      landmark={false}
      lang={lang}
      siteName="LaplandNightlife"
      homeHref={to('/')}
      links={[
        { href: to('/cities'), label: c.cities },
        { href: to('/nightclubs'), label: c.nightclubs },
        { href: to('/aurora-bars'), label: c.auroraBars },
      ]}
    />
  );
}
