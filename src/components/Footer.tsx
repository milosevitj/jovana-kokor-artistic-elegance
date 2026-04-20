import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';

export function Footer() {
  const { t, language } = useLanguage();
  const currentYear = new Date().getFullYear();

  // Section anchors use plain <a href="/#section"> so the browser handles
  // hash scrolling natively (works from any route, including the homepage
  // itself). Route links use React Router <Link>. Both render real <a href>
  // tags so Screaming Frog and other crawlers can follow every internal link.
  const sectionLinks = [
    { href: '/#home', label: t('nav.home') },
    { href: '/#gigs', label: t('nav.gigs') },
    { href: '/#about', label: t('nav.about') },
    { href: '/#lessons', label: t('nav.lessons') },
    { href: '/#contact', label: t('nav.contact') },
  ];

  const handleSectionClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // If we're already on the homepage, prevent the full reload and just
    // smooth-scroll to the section. Otherwise let the browser navigate.
    if (window.location.pathname === '/') {
      const id = href.split('#')[1];
      const el = document.getElementById(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth' });
        window.history.replaceState(null, '', `#${id}`);
      }
    }
  };

  return (
    <footer className="border-t border-border">
      <div className="container mx-auto px-6 md:px-12 py-12 space-y-10">
        <nav aria-label={language === 'de' ? 'Footer-Navigation' : 'Footer navigation'}>
          <ul className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 text-sm">
            {sectionLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleSectionClick(e, link.href)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <Link
                to="/portfolio"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {t('nav.gallery')}
              </Link>
            </li>
          </ul>
        </nav>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="font-serif text-xl mb-2">JoyWanna</p>
            <p className="text-sm text-muted-foreground">
              © {currentYear} {t('footer.rights')}
            </p>
          </div>

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
