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

  const navLinks = [
    { href: '#home', label: t('nav.home') },
    { href: '#gigs', label: t('nav.gigs') },
    { href: '#about', label: t('nav.about') },
    { href: '#gallery', label: t('nav.gallery') },
    { href: '#contact', label: t('nav.contact') },
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
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <a
            href="#home"
            className="font-serif text-2xl font-medium tracking-tight hover:text-primary transition-colors"
          >
            JK
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground link-underline hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Language Toggle & Mobile Menu Button */}
          <div className="flex items-center gap-4">
            <div className="lang-toggle">
              <button
                onClick={() => setLanguage('de')}
                className={language === 'de' ? 'active' : ''}
                aria-label="Deutsch"
              >
                DE
              </button>
              <span className="text-border">|</span>
              <button
                onClick={() => setLanguage('en')}
                className={language === 'en' ? 'active' : ''}
                aria-label="English"
              >
                EN
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-foreground"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
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
                  className="text-lg font-medium py-2 hover:text-primary transition-colors"
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
