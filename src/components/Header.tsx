import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Menu, X } from 'lucide-react';

export function Header() {
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const navLinks = [
    { href: '#home', label: t('nav.home') },
    { href: '#gigs', label: t('nav.gigs') },
    { href: '#about', label: t('nav.about') },
    { href: '#lessons', label: t('nav.lessons') },
    { href: '#gallery', label: t('nav.gallery') },
    { href: '#contact', label: t('nav.contact') },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-background/95 backdrop-blur-md border-b border-border/50 text-foreground'
          : 'text-white'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12">
        <nav className="flex items-center justify-between h-20" aria-label="Main navigation">
          {/* Logo */}
          <a
            href="#home"
            className="font-serif text-2xl font-medium tracking-tight hover:text-primary transition-colors"
            aria-label="Jovana Kokor – Home"
          >
            JK
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-medium link-underline transition-colors ${
                  isScrolled
                    ? 'text-muted-foreground hover:text-foreground'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {link.label}
              </a>
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
              <span className={isScrolled ? 'text-border' : 'text-white/30'} aria-hidden="true">|</span>
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
              className="md:hidden p-2"
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
          <div className="md:hidden absolute top-20 left-0 right-0 bg-background/98 backdrop-blur-lg border-b border-border animate-fade-in">
            <div className="flex flex-col py-6 px-6 gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-medium py-2 text-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
