import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Menu, X } from 'lucide-react';
import joyWannaLogo from '@/assets/joywanna-logo.webp';
import {
  buildSectionPath,
  buildPortfolioPath,
  localizedCounterpart,
  parseRoute,
  type SectionId,
} from '@/lib/site-routes';

type NavItem =
  | { kind: 'section'; section: SectionId; label: string }
  | { kind: 'portfolio'; label: string }
  | { kind: 'page'; section: SectionId; label: string }
  | { kind: 'custom'; key: string; href: string; label: string };

export function Header() {
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeHash, setActiveHash] = useState<string>('');
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const parsed = parseRoute(pathname);
  const isHome = parsed.kind === 'home' || parsed.kind === 'section';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keep <html lang> in sync with active language
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  // Track current section via hash so we can highlight the active link.
  useEffect(() => {
    const sync = () => setActiveHash(window.location.hash.replace('#', ''));
    sync();
    window.addEventListener('hashchange', sync);
    const id = window.setInterval(sync, 400);
    return () => {
      window.removeEventListener('hashchange', sync);
      window.clearInterval(id);
    };
  }, []);

  const navItems: NavItem[] = [
    { kind: 'section', section: 'home', label: t('nav.home') },
    { kind: 'section', section: 'about', label: t('nav.about') },
    { kind: 'page', section: 'lessons', label: t('nav.lessons') },
    { kind: 'portfolio', label: t('nav.gallery') },
    { kind: 'custom', key: 'reimagined', href: `/${language}/reimagined`, label: 'Reimagined' },
    { kind: 'section', section: 'contact', label: t('nav.contact') },
  ];

  const isActive = (item: NavItem): boolean => {
    if (item.kind === 'portfolio') {
      return parsed.kind === 'portfolio' || parsed.kind === 'portfolio-category';
    }
    if (item.kind === 'page') {
      return parsed.kind === 'section' && parsed.section === item.section;
    }
    if (item.kind === 'custom') {
      return pathname === item.href;
    }
    if (parsed.kind === 'section') return parsed.section === item.section;
    if (parsed.kind === 'home') {
      if (item.section === 'home') return activeHash === '' || activeHash === 'home';
      return activeHash === item.section;
    }
    return false;
  };

  const hrefFor = (item: NavItem): string => {
    if (item.kind === 'portfolio') return buildPortfolioPath(language);
    if (item.kind === 'custom') return item.href;
    return buildSectionPath(item.section, language);
  };

  const handleSectionClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    item: Extract<NavItem, { kind: 'section' }>,
  ) => {
    const targetPath = hrefFor(item);
    // Already on the homepage shell → smooth-scroll without remounting.
    if (isHome) {
      const el = document.getElementById(item.section);
      if (el) {
        e.preventDefault();
        if (item.section === 'home') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          el.scrollIntoView({ behavior: 'smooth' });
        }
        // Reflect the localized URL in the address bar.
        window.history.replaceState(null, '', targetPath);
      }
    } else {
      // Different page (e.g. /portfolio) → client-side navigate.
      e.preventDefault();
      navigate(targetPath);
    }
    setIsMobileMenuOpen(false);
  };

  const desktopLinkClass = (active: boolean) =>
    `text-sm font-medium link-underline transition-colors ${
      active ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
    }`;

  const mobileLinkClass = (active: boolean) =>
    `text-lg font-medium py-2 transition-colors ${
      active ? 'text-primary' : 'text-foreground hover:text-primary'
    }`;

  // Language switcher hrefs: equivalent localized URL in the other language.
  const dePath = localizedCounterpart(pathname, 'de');
  const enPath = localizedCounterpart(pathname, 'en');
  const homeHref = buildSectionPath('home', language);

  const handleLangSwitch = (
    e: React.MouseEvent<HTMLAnchorElement>,
    target: 'de' | 'en',
    targetPath: string,
  ) => {
    e.preventDefault();
    setLanguage(target);
    navigate(targetPath);
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-background/95 backdrop-blur-md border-b border-border/50'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12">
        <nav
          className="flex items-center justify-between h-16 md:h-20 gap-6"
          aria-label="Main navigation"
        >
          {/* Logo → localized Home */}
          <Link
            to={homeHref}
            className="flex items-center shrink-0 hover:opacity-80 transition-opacity"
            aria-label="JoyWanna – Home"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <img
              src={joyWannaLogo}
              alt="JoyWanna Official Logo"
              width={540}
              height={360}
              decoding="async"
              fetchPriority="high"
              className="h-20 md:h-32 w-auto object-contain -my-6 md:-my-10"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const active = isActive(item);
              const href = hrefFor(item);
              if (item.kind === 'portfolio') {
                return (
                  <Link
                    key="portfolio"
                    to={href}
                    className={desktopLinkClass(active)}
                    aria-current={active ? 'page' : undefined}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              }
              if (item.kind === 'page' || item.kind === 'custom') {
                return (
                  <Link
                    key={item.kind === 'custom' ? item.key : item.section}
                    to={href}
                    className={desktopLinkClass(active)}
                    aria-current={active ? 'page' : undefined}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              }
              return (
                <a
                  key={item.section}
                  href={href}
                  onClick={(e) => handleSectionClick(e, item)}
                  className={desktopLinkClass(active)}
                  aria-current={active ? 'page' : undefined}
                >
                  {item.label}
                </a>
              );
            })}
          </div>

          {/* Language Toggle & Mobile Menu Button */}
          <div className="flex items-center gap-4">
            <div className="lang-toggle" role="group" aria-label="Language selection">
              <a
                href={dePath}
                onClick={(e) => handleLangSwitch(e, 'de', dePath)}
                className={language === 'de' ? 'active' : ''}
                aria-label="Sprache: Deutsch"
                aria-current={language === 'de' ? 'true' : undefined}
                hrefLang="de"
                rel="alternate"
              >
                DE
              </a>
              <span className="text-border" aria-hidden="true">|</span>
              <a
                href={enPath}
                onClick={(e) => handleLangSwitch(e, 'en', enPath)}
                className={language === 'en' ? 'active' : ''}
                aria-label="Language: English"
                aria-current={language === 'en' ? 'true' : undefined}
                hrefLang="en"
                rel="alternate"
              >
                EN
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className="md:hidden p-2 text-foreground relative z-[60]"
              onClick={() => setIsMobileMenuOpen((v) => !v)}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-nav"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div
  id="mobile-nav"
  className="
    md:hidden
    absolute
    top-16
    left-0
    right-0
    bg-black/95
    backdrop-blur-xl
    border-b
    border-border
    z-50
    shadow-2xl
    animate-fade-in
  "
>
           <div className="flex flex-col py-8 px-6 gap-6">
              {navItems.map((item) => {
                const active = isActive(item);
                const href = hrefFor(item);
                if (item.kind === 'portfolio') {
                  return (
                    <Link
                      key="portfolio"
                      to={href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={mobileLinkClass(active)}
                      aria-current={active ? 'page' : undefined}
                    >
                      {item.label}
                    </Link>
                  );
                }
                if (item.kind === 'page' || item.kind === 'custom') {
                  return (
                    <Link
                      key={item.kind === 'custom' ? item.key : item.section}
                      to={href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={mobileLinkClass(active)}
                      aria-current={active ? 'page' : undefined}
                    >
                      {item.label}
                    </Link>
                  );
                }
                return (
                  <a
                    key={item.section}
                    href={href}
                    onClick={(e) => handleSectionClick(e, item)}
                    className={mobileLinkClass(active)}
                    aria-current={active ? 'page' : undefined}
                  >
                    {item.label}
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
