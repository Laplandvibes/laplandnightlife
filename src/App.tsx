import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import SharedFooter from '../../shared/Footer';
import SharedCookieBanner from '../../shared/CookieBanner';
import NewsletterPopup from './components/NewsletterPopup';
import Home from './pages/Home';
import Cities from './pages/Cities';
import CityPage from './pages/CityPage';
import Nightclubs from './pages/Nightclubs';
import AuroraBars from './pages/AuroraBars';
import Events from './pages/Events';
import Photography from './pages/Photography';
import SummerNights from './pages/SummerNights';
import Tips from './pages/Tips';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import CookiePolicy from './pages/CookiePolicy';
import NotFound from './pages/NotFound';
import { trackPageView } from './lib/analytics';

const pillarLinks = [
  { name: 'Cities', href: '/cities' },
  { name: 'Nightclubs', href: '/nightclubs' },
  { name: 'Aurora Bars', href: '/aurora-bars' },
  { name: 'Events 2026', href: '/events' },
  { name: 'Photography', href: '/photography' },
  { name: 'Summer Nights', href: '/summer-nights' },
];

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    trackPageView(pathname);
  }, [pathname]);
  return null;
}

function AppLayout() {
  return (
    <div className="min-h-screen bg-night text-white">
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cities" element={<Cities />} />
          <Route path="/city/:slug" element={<CityPage />} />
          <Route path="/nightclubs" element={<Nightclubs />} />
          <Route path="/aurora-bars" element={<AuroraBars />} />
          <Route path="/events" element={<Events />} />
          <Route path="/photography" element={<Photography />} />
          <Route path="/summer-nights" element={<SummerNights />} />
          <Route path="/tips" element={<Tips />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <SharedFooter pillarLinks={pillarLinks} />
      <SharedCookieBanner consentKey="laplandnightlife_cookie_consent" />
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
