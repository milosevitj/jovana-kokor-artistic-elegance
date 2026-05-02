import { useLanguage } from '@/contexts/LanguageContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { buildSectionPath, buildPortfolioPath, buildInquirePath, parseRoute, type SectionId } from '@/lib/site-routes';

export function Footer() {
  const { t, language } = useLanguage();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  const parsed = parseRoute(pathname);
  const isHome = parsed.kind === 'home' || parsed.kind === 'section';

  const sectionLinks: { section: SectionId; label: string }[] = [
    { section: 'home', label: t('nav.home') },
    { section: 'about', label: t('nav.about') },
    { section: 'contact', label: t('nav.contact') },
  ];

  const handleSectionClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    section: SectionId,
  ) => {
    const targetPath = buildSectionPath(section, language);
    if (isHome) {
      const el = document.getElementById(section);
      if (el) {
        e.preventDefault();
        if (section === 'home') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          el.scrollIntoView({ behavior: 'smooth' });
        }
        window.history.replaceState(null, '', targetPath);
      }
    } else {
      e.preventDefault();
      navigate(targetPath);
    }
  };

  return (
    <footer className="border-t border-border">
      <div className="container mx-auto px-6 md:px-12 py-12 space-y-10">
        <nav aria-label={language === 'de' ? 'Footer-Navigation' : 'Footer navigation'}>
          <ul className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 text-sm">
            {sectionLinks.map((link) => {
              const href = buildSectionPath(link.section, language);
              return (
                <li key={link.section}>
                  <a
                    href={href}
                    onClick={(e) => handleSectionClick(e, link.section)}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
            <li>
              <Link
                to={buildInquirePath(language)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {t('nav.inquire')}
              </Link>
            </li>
            <li>
              <Link
                to={buildPortfolioPath(language)}
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
