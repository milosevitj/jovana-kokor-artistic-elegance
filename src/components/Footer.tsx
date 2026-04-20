import { useLanguage } from '@/contexts/LanguageContext';
import { Link, useLocation } from 'react-router-dom';

export function Footer() {
  const { t, language } = useLanguage();
  const { pathname } = useLocation();
  const currentYear = new Date().getFullYear();
  const isHome = pathname === '/';

  // All <Link> components render real <a href> tags, so Screaming Frog and
  // other non-JS crawlers can follow every internal link advertised here.
  // Section anchors point to /#section when off the homepage so deep links
  // always resolve to a 200 OK URL.
  const sectionLinks: { to: string; label: string }[] = [
    { to: isHome ? '#home' : '/#home', label: t('nav.home') },
    { to: isHome ? '#gigs' : '/#gigs', label: t('nav.gigs') },
    { to: isHome ? '#about' : '/#about', label: t('nav.about') },
    { to: isHome ? '#lessons' : '/#lessons', label: t('nav.lessons') },
    { to: '/portfolio', label: t('nav.gallery') },
    { to: isHome ? '#contact' : '/#contact', label: t('nav.contact') },
  ];

  return (
    <footer className="border-t border-border">
      <div className="container mx-auto px-6 md:px-12 py-12 space-y-10">
        {/* Site navigation block — gives every page outbound internal links */}
        <nav aria-label={language === 'de' ? 'Footer-Navigation' : 'Footer navigation'}>
          <ul className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 text-sm">
            {sectionLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo & Copyright */}
          <div className="text-center md:text-left">
            <p className="font-serif text-xl mb-2">JoyWanna</p>
            <p className="text-sm text-muted-foreground">
              © {currentYear} {t('footer.rights')}
            </p>
          </div>

          {/* Legal Links */}
          <div className="flex items-center gap-6 text-sm">
            <Link
              to="/impressum"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {t('footer.impressum')}
            </Link>
            <span className="text-border">|</span>
            <Link
              to="/privacy"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {t('footer.datenschutz')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
