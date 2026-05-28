import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Menu, X } from 'lucide-react';
import joyWannaLogo from '@/assets/joywanna-logo.webp';
import {
  buildPagePath,
  localizedCounterpart,
  parseRoute,
  type Lang,
} from '@/lib/site-routes';

type NavItem =
  | { kind: 'scroll'; sectionId: 'home' | 'about'; label: string }
  | { kind: 'page'; page: 'contact' | 'lessons' | 'projects'; label: string }
  | { kind: 'custom'; key: string; href: string; label: string };

export function Header() {
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const parsed = parseRoute(pathname);
  const isHome = parsed.kind === 'home';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const navItems: NavItem[] = [
    { kind: 'scroll', sectionId: 'home', label: t('nav.home') },
    { kind: 'scroll', sectionId: 'about', label: t('nav.about') },
    { kind: 'page', page: 'lessons', label: t('nav.lessons') },
    { kind: 'page', page: 'projects', label: t('nav.gallery') },
    { kind: 'custom', key: 'reimagined', href: language === 'en' ? '/en/reimagined' : '/reimagined', label: 'Reimagined' },
    { kind: 'page', page: 'contact', label: t('nav.contact') },
  ];

  const isActive = (item: NavItem): boolean => {
    if (item.kind === 'page') {
      if (item.page === 'projects') {
        return parsed.kind === 'portfolio' || parsed.kind === 'portfolio-category';
      }
      return parsed.kind === item.page;
    }
    if (item.kind === 'custom') return pathname === item.href;
    return false;
  };

  const homeHref = buildPagePath('home', language);

  const scrollToSection = (sectionId: 'home' | 'about') => {
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: 'home' | 'about',
  ) => {
    e.preventDefault();
    if (isHome) {
      scrollToSection(sectionId);
    } else {
      // Navigate to home then scroll once mounted.
      navigate(homeHref);
      setTimeout(() => scrollToSection(sectionId), 300);
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

  // Language switcher hrefs
  const dePath = localizedCounterpart(pathname, 'de');
  const enPath = localizedCounterpart(pathname, 'en');

  const handleLangSwitch = (
    e: React.MouseEvent<HTMLAnchorElement>,
    target: Lang,
    targetPath: string,
  ) => {
    e.preventDefault();
    setLanguage(target);
    navigate(targetPath);
    setIsMobileMenuOpen(false);
  };

  const renderItem = (item: NavItem, linkClass: (active: boolean) => string) => {
    const active = isActive(item);
    if (item.kind === 'scroll') {
      return (
        <a
          key={item.sectionId}
          href={homeHref}
          onClick={(e) => handleScrollClick(e, item.sectionId)}
          className={linkClass(active)}
        >
          {item.label}
        </a>
      );
    }
    if (item.kind === 'custom') {
      return (
        <Link
          key={item.key}
          to={item.href}
          className={linkClass(active)}
          aria-current={active ? 'page' : undefined}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          {item.label}
        </Link>
      );
    }
    return (
      <Link
        key={item.page}
        to={buildPagePath(item.page, language)}
        className={linkClass(active)}
        aria-current={active ? 'page' : undefined}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        {item.label}
      </Link>
    );
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
          {/* Logo → Home */}
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
            {navItems.map((item) => renderItem(item, desktopLinkClass))}
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
            className="md:hidden absolute top-16 left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-border z-50 shadow-2xl animate-fade-in"
          >
            <div className="flex flex-col py-8 px-6 gap-6">
              {navItems.map((item) => renderItem(item, mobileLinkClass))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
