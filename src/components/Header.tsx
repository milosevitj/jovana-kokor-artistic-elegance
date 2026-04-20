import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Menu, X } from 'lucide-react';
import joyWannaLogo from '@/assets/joywanna-logo.png';

export function Header() {
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update html lang attribute when language changes
  useEffect(() => {
    document.documentElement.lang = language === 'de' ? 'de' : 'en';
  }, [language]);

  const navLinks: { to: string; label: string }[] = [
    { to: isHome ? '#home' : '/#home', label: t('nav.home') },
    { to: isHome ? '#gigs' : '/#gigs', label: t('nav.gigs') },
    { to: isHome ? '#about' : '/#about', label: t('nav.about') },
    { to: isHome ? '#lessons' : '/#lessons', label: t('nav.lessons') },
    { to: '/portfolio', label: t('nav.gallery') },
    { to: isHome ? '#contact' : '/#contact', label: t('nav.contact') },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-background/95 backdrop-blur-md border-b border-border/50'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12">
        <nav className="flex items-center justify-between h-16 md:h-20 gap-6" aria-label="Main navigation">
          {/* Logo */}
          <Link
            to={isHome ? '#home' : '/'}
            className="flex items-center shrink-0 hover:opacity-80 transition-opacity"
            aria-label="JoyWanna – Home"
          >
            <img
              src={joyWannaLogo}
              alt="JoyWanna Official Logo"
              width={540}
              height={360}
              className="h-20 md:h-32 w-auto object-contain -my-6 md:-my-10"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm font-medium text-muted-foreground link-underline hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Language Toggle & Mobile Menu Button */}
          <div className="flex items-center gap-4">
            <div className="lang-toggle" role="group" aria-label="Language selection">
              <button
                onClick={() => setLanguage('de')}
                className={language === 'de' ? 'active' : ''}
                aria-label="Sprache: Deutsch"
                aria-pressed={language === 'de'}
              >
                DE
              </button>
              <span className="text-border" aria-hidden="true">|</span>
              <button
                onClick={() => setLanguage('en')}
                className={language === 'en' ? 'active' : ''}
                aria-label="Language: English"
                aria-pressed={language === 'en'}
              >
                EN
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-foreground"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-background/98 backdrop-blur-lg border-b border-border animate-fade-in">
            <div className="flex flex-col py-6 px-6 gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-medium py-2 hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}