import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Menu, X } from 'lucide-react';
import joyWannaLogo from '@/assets/joywanna-logo.webp';

type NavLink = {
  /** href used by the rendered anchor / Link (for crawlers + middle-click) */
  href: string;
  /** stable id for active-state matching: section id ('home', 'about', …) or route ('/portfolio') */
  id: string;
  /** rendered label */
  label: string;
  /** true → in-page section anchor, false → real route */
  isSection: boolean;
};

export function Header() {
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeHash, setActiveHash] = useState<string>('');
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update html lang attribute when language changes
  useEffect(() => {
    document.documentElement.lang = language === 'de' ? 'de' : 'en';
  }, [language]);

  // Track current section via hash so we can highlight the active link.
  useEffect(() => {
    const sync = () => setActiveHash(window.location.hash.replace('#', ''));
    sync();
    window.addEventListener('hashchange', sync);
    // useHashNavigation also rewrites the hash on scroll via replaceState,
    // which doesn't fire hashchange — poll lightly so highlighting stays live.
    const id = window.setInterval(sync, 400);
    return () => {
      window.removeEventListener('hashchange', sync);
      window.clearInterval(id);
    };
  }, []);

  const navLinks: NavLink[] = [
    { id: 'home', href: '/#home', label: t('nav.home'), isSection: true },
    { id: 'gigs', href: '/#gigs', label: t('nav.gigs'), isSection: true },
    { id: 'about', href: '/#about', label: t('nav.about'), isSection: true },
    { id: 'lessons', href: '/#lessons', label: t('nav.lessons'), isSection: true },
    { id: '/portfolio', href: '/portfolio', label: t('nav.gallery'), isSection: false },
    { id: 'contact', href: '/#contact', label: t('nav.contact'), isSection: true },
  ];

  const isActive = (link: NavLink) => {
    if (!link.isSection) return pathname === link.id;
    if (!isHome) return false;
    if (link.id === 'home') return activeHash === '' || activeHash === 'home';
    return activeHash === link.id;
  };

  const handleSectionClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string,
  ) => {
    // If we're already on home, smooth-scroll without a route change/reload.
    if (isHome) {
      const el = document.getElementById(sectionId);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth' });
        window.history.replaceState(null, '', `#${sectionId}`);
        setActiveHash(sectionId);
      }
    } else {
      // Different route → use client-side navigation to '/' with the hash so
      // there is no full page reload.
      e.preventDefault();
      navigate(`/#${sectionId}`);
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
          {/* Logo → Home */}
          <a
            href="/#home"
            onClick={(e) => handleSectionClick(e, 'home')}
            className="flex items-center shrink-0 hover:opacity-80 transition-opacity"
            aria-label="JoyWanna – Home"
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
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const active = isActive(link);
              if (link.isSection) {
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={(e) => handleSectionClick(e, link.id)}
                    className={desktopLinkClass(active)}
                    aria-current={active ? 'page' : undefined}
                  >
                    {link.label}
                  </a>
                );
              }
              return (
                <Link
                  key={link.id}
                  to={link.href}
                  className={desktopLinkClass(active)}
                  aria-current={active ? 'page' : undefined}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Language Toggle & Mobile Menu Button */}
          <div className="flex items-center gap-4">
            <div className="lang-toggle" role="group" aria-label="Language selection">
              {/*
                Real <a> tags with absolute hrefs so Screaming Frog and other
                non-JS crawlers can follow the language switcher and so the
                URLs match what hreflang advertises. The onClick prevents a
                full reload and just flips the in-app language state.
              */}
              <a
                href={`${pathname}${pathname.includes('?') ? '&' : '?'}lang=de`}
                onClick={(e) => {
                  e.preventDefault();
                  setLanguage('de');
                  const url = new URL(window.location.href);
                  url.searchParams.delete('lang');
                  window.history.replaceState({}, '', url.toString());
                }}
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
                href={`${pathname}?lang=en`}
                onClick={(e) => {
                  e.preventDefault();
                  setLanguage('en');
                  const url = new URL(window.location.href);
                  url.searchParams.set('lang', 'en');
                  window.history.replaceState({}, '', url.toString());
                }}
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
            className="md:hidden absolute top-16 left-0 right-0 bg-background/98 backdrop-blur-lg border-b border-border animate-fade-in z-50"
          >
            <div className="flex flex-col py-6 px-6 gap-4">
              {navLinks.map((link) => {
                const active = isActive(link);
                if (link.isSection) {
                  return (
                    <a
                      key={link.id}
                      href={link.href}
                      onClick={(e) => handleSectionClick(e, link.id)}
                      className={mobileLinkClass(active)}
                      aria-current={active ? 'page' : undefined}
                    >
                      {link.label}
                    </a>
                  );
                }
                return (
                  <Link
                    key={link.id}
                    to={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={mobileLinkClass(active)}
                    aria-current={active ? 'page' : undefined}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
