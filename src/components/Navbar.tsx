import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import Logo from './Logo';
import { useLang, useLocalePath } from '../i18n/useLang';
import { COPY } from '../locales/copy';
import EcosystemMenu from '../shared/EcosystemMenu';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langWrapRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
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

  useEffect(() => { setOpen(false); setLangOpen(false); }, [location.pathname]);

  useEffect(() => {
    if (!langOpen) return;
    const onClick = (e: MouseEvent) => {
      if (!langWrapRef.current?.contains(e.target as Node)) setLangOpen(false);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setLangOpen(false); };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [langOpen]);

  type LangCode = 'en' | 'fi' | 'de' | 'ja' | 'es' | 'pt-BR' | 'zh-CN' | 'ko' | 'fr' | 'it' | 'nl';
  const URL_PREFIX_OF: Record<LangCode, string> = {
    en: '', fi: 'fi', de: 'de', ja: 'ja', es: 'es', 'pt-BR': 'br', 'zh-CN': 'cn',
    ko: 'kr', fr: 'fr', it: 'it', nl: 'nl',
  };
  const ALL_LANGS: { code: LangCode; label: string; native: string }[] = [
    { code: 'en', label: 'EN', native: 'English' },
    { code: 'fi', label: 'FI', native: 'Suomi' },
    { code: 'de', label: 'DE', native: 'Deutsch' },
    { code: 'ja', label: 'JA', native: '日本語' },
    { code: 'es', label: 'ES', native: 'Español' },
    { code: 'pt-BR', label: 'BR', native: 'Português' },
    { code: 'zh-CN', label: 'CN', native: '简体中文' },
    { code: 'ko', label: 'KR', native: '한국어' },
    { code: 'fr', label: 'FR', native: 'Français' },
    { code: 'it', label: 'IT', native: 'Italiano' },
    { code: 'nl', label: 'NL', native: 'Nederlands' },
  ];

  const switchTo = (target: LangCode) => {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem('lv_locale_choice', target);
    }
    const path = location.pathname;
    const bare = path.replace(/^\/(fi|de|ja|es|br|cn|kr|fr|it|nl)(?=\/|$)/, '') || '/';
    const prefix = URL_PREFIX_OF[target];
    if (!prefix) {
      navigate(bare);
    } else {
      navigate(bare === '/' ? `/${prefix}` : `/${prefix}${bare}`);
    }
  };

  const currentLangLabel = ALL_LANGS.find((l) => l.code === lang)?.label ?? 'EN';

  const LangDropdown = () => (
    <div className="relative" ref={langWrapRef}>
      <button
        type="button"
        onClick={() => setLangOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={langOpen}
        aria-label="Switch language"
        className="flex items-center gap-1.5 rounded px-2 py-1 text-xs font-bold tracking-wide transition-colors text-white hover:text-pink bg-slate-900/40 backdrop-blur-sm [text-shadow:0_1px_6px_rgba(0,0,0,0.7)]"
      >
        <Globe className="w-3.5 h-3.5" />
        {currentLangLabel}
        <ChevronDown className={`w-3 h-3 transition-transform ${langOpen ? 'rotate-180' : ''}`} />
      </button>
      {langOpen && (
        <ul
          role="listbox"
          aria-label="Language"
          className="absolute right-0 top-full mt-2 min-w-[180px] py-1 bg-night/95 backdrop-blur-md border border-white/15 rounded-lg shadow-xl z-50 max-h-[80vh] overflow-y-auto"
        >
          {ALL_LANGS.map((item) => {
            const isActive = item.code === lang;
            return (
              <li key={item.code} role="option" aria-selected={isActive}>
                <button
                  type="button"
                  onClick={() => { switchTo(item.code); setLangOpen(false); }}
                  aria-current={isActive ? 'page' : undefined}
                  className={`w-full flex items-center gap-2 px-3 py-2 text-left text-sm transition-colors ${
                    isActive
                      ? 'bg-pink/15 text-pink font-semibold'
                      : 'text-white/85 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span className="w-8 font-semibold text-xs tracking-wider">{item.label}</span>
                  <span>{item.native}</span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-night/95 backdrop-blur-md border-b border-white/10 shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16 gap-4">
          <div className="flex items-center gap-3 sm:gap-5 shrink-0">
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

          <div className="xl:hidden ml-auto flex items-center gap-2">
            <div className="relative inline-flex items-center">
              <select
                value={lang}
                onChange={(e) => switchTo(e.target.value as LangCode)}
                aria-label={c.langLabel}
                className="appearance-none bg-slate-900/85 backdrop-blur-sm border border-white/50 rounded pl-2 pr-6 py-1 text-xs font-semibold uppercase text-white"
              >
                {ALL_LANGS.map((l) => (
                  <option key={l.code} value={l.code} className="bg-night text-white">
                    {l.label}
                  </option>
                ))}
              </select>
              <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-white" />
            </div>
            <button
              onClick={() => setOpen(!open)}
              className="p-2 text-white hover:text-pink transition-colors"
              aria-label={c.menu}
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
