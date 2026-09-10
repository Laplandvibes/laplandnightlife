import { useState, useEffect} from 'react';
import { Link, useLocation} from 'react-router-dom';
import { Menu, X} from 'lucide-react';
import Logo from './Logo';
import { useLang, useLocalePath } from '../i18n/useLang';
import { COPY } from '../locales/copy';
import EcosystemMenu from '../shared/EcosystemMenu';
import LanguageSwitcher from '../i18n/LanguageSwitcher';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const lang = useLang();
  const to = useLocalePath();
  const c = COPY[lang].nav;

  const navLinks = [
    { label: c.cities, to: to('/cities') },
    { label: c.nightclubs, to: to('/nightclubs') },
    { label: c.auroraBars, to: to('/aurora-bars') },
    { label: c.events, to: to('/events') },
    { label: c.photography, to: to('/photography') },
    { label: c.summer, to: to('/summer-nights') },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);





  const LangDropdown = () => (
    <div className="relative">
      <LanguageSwitcher tone={'dark'} />
    </div>
  );

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-night/95 backdrop-blur-md border-b border-white/10 shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16 gap-4">
          {/* Not `shrink-0`: the menu button is the last item in this row, so any
              overflow evicted it off a `fixed` bar — invisible to horizontal
              scroll, fatal to navigation on a 375px phone. The wordmark yields
              first now. */}
          <div className="flex items-center gap-2 sm:gap-5 min-w-0">
            <EcosystemMenu lang={lang} currentDomain="laplandnightlife.com" />
            <Link
              to={to('/')}
              className="no-underline flex items-center"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <Logo />
            </Link>
          </div>

          {/* Centered between logo and lang switch so the bar reads balanced
              instead of one right-packed cluster (Vesa 2026-07-06). */}
          <div className="hidden xl:flex flex-1 items-center justify-center gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`font-body font-medium text-xs uppercase tracking-[0.15em] leading-none whitespace-nowrap transition-colors duration-200 no-underline ${
                  location.pathname === link.to ? 'text-pink' : 'text-white/90 hover:text-pink'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden xl:flex items-center shrink-0">
            <LangDropdown />
          </div>

          <div className="xl:hidden ml-auto flex items-center gap-2 shrink-0">
            <div className="relative inline-flex items-center">
              <LanguageSwitcher tone={'dark'} />
            </div>
            <button
              onClick={() => setOpen(!open)}
              className="shrink-0 flex h-11 w-11 items-center justify-center text-white hover:text-pink transition-colors"
              aria-label={c.menu}
              aria-expanded={open}
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="xl:hidden bg-night/98 backdrop-blur-md border-t border-white/10">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`block font-body font-medium text-sm uppercase tracking-[0.15em] py-2 no-underline ${
                  location.pathname === link.to ? 'text-pink' : 'text-white/90 hover:text-pink'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
