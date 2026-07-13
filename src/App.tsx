import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import React, { useEffect, useReducer, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import SharedFooter from './shared/Footer';
import SharedCookieBanner from './shared/CookieBanner';
import NewsletterPopup from './components/NewsletterPopup';
const Home = lazy(() => import('./pages/Home'))
const Cities = lazy(() => import('./pages/Cities'))
const CityPage = lazy(() => import('./pages/CityPage'))
const Nightclubs = lazy(() => import('./pages/Nightclubs'))
const AuroraBars = lazy(() => import('./pages/AuroraBars'))
const Events = lazy(() => import('./pages/Events'))
const Photography = lazy(() => import('./pages/Photography'))
const SummerNights = lazy(() => import('./pages/SummerNights'))
const Tips = lazy(() => import('./pages/Tips'))
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'))
const Terms = lazy(() => import('./pages/Terms'))
const CookiePolicy = lazy(() => import('./pages/CookiePolicy'))
const NotFound = lazy(() => import('./pages/NotFound'))
import { trackPageView } from './lib/analytics';
import { useHtmlLang, useLocalePath, useLang } from './i18n/useLang';
import { COPY, loadCopy, isCopyLoaded } from './locales/copy';
import { isCityOverlayLoaded, loadCityOverlays } from './data/cityI18n';
import LocaleAutoRedirect from './i18n/LocaleAutoRedirect';

/**
 * Non-EN copy + city overlays live in per-language lazy chunks (see
 * locales/copy.ts + data/cityI18n.ts). Gate the UI until both chunks for
 * the active language are registered, so every consumer keeps reading
 * synchronously. EN is bundled eagerly — English visitors never wait.
 */
function CopyGate({ children }: { children: React.ReactNode }) {
  const lang = useLang();
  const [, bump] = useReducer((x: number) => x + 1, 0);
  const ready = isCopyLoaded(lang) && isCityOverlayLoaded(lang);
  useEffect(() => {
    let alive = true;
    if (!ready) Promise.all([loadCopy(lang), loadCityOverlays(lang)]).then(() => { if (alive) bump(); });
    return () => { alive = false; };
  }, [lang, ready]);
  if (!ready) return <div className="min-h-screen bg-night" />;
  return <>{children}</>;
}

function LocaleSync() {
  const lang = useHtmlLang();
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  return null;
}

function usePillarLinks() {
  const lang = useLang();
  const to = useLocalePath();
  const c = COPY[lang].nav;
  return [
    { name: c.cities, href: to('/cities') },
    { name: c.nightclubs, href: to('/nightclubs') },
    { name: c.auroraBars, href: to('/aurora-bars') },
    { name: c.events, href: to('/events') },
    { name: c.photography, href: to('/photography') },
    { name: c.summer, href: to('/summer-nights') },
  ];
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    trackPageView(pathname);
  }, [pathname]);
  return null;
}

function FooterWithLocale() {
  const pillarLinks = usePillarLinks();
  return <SharedFooter pillarLinks={pillarLinks} />;
}

function AppLayout() {
  const lang = useLang();
  return (
    <div className="min-h-screen bg-night text-white">
      <ScrollToTop />
      <LocaleAutoRedirect />
      <LocaleSync />
      <CopyGate>
      <Navbar />
      <main>
        <Suspense fallback={<div className="min-h-screen" />}>
          <Routes>
          {(() => {
            const LOCALE_PREFIXES = ['', 'fi', 'de', 'ja', 'es', 'br', 'cn', 'kr', 'fr', 'it', 'nl', 'sv'];
            const ROUTE_DEFS: { path: string; element: React.ReactElement }[] = [
              { path: '', element: <Home /> },
              { path: 'cities', element: <Cities /> },
              { path: 'city/:slug', element: <CityPage /> },
              { path: 'nightclubs', element: <Nightclubs /> },
              { path: 'aurora-bars', element: <AuroraBars /> },
              { path: 'events', element: <Events /> },
              { path: 'photography', element: <Photography /> },
              { path: 'summer-nights', element: <SummerNights /> },
              { path: 'tips', element: <Tips /> },
              { path: 'privacy', element: <PrivacyPolicy /> },
              { path: 'terms', element: <Terms /> },
              { path: 'cookie-policy', element: <CookiePolicy /> },
            ];
            const routes: React.ReactElement[] = [];
            for (const prefix of LOCALE_PREFIXES) {
              for (const { path, element } of ROUTE_DEFS) {
                const full =
                  path === ''
                    ? prefix === '' ? '/' : `/${prefix}`
                    : prefix === '' ? `/${path}` : `/${prefix}/${path}`;
                routes.push(<Route key={full} path={full} element={element} />);
              }
            }
            routes.push(<Route key="*" path="*" element={<NotFound />} />);
            return routes;
          })()}
        </Routes>
        </Suspense>
      </main>
      <FooterWithLocale />
      </CopyGate>
      <SharedCookieBanner consentKey="laplandnightlife_cookie_consent" lang={lang} />
      <NewsletterPopup />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}
