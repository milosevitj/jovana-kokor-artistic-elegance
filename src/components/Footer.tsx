import { useLanguage } from '@/contexts/LanguageContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { buildPagePath, parseRoute } from '@/lib/site-routes';

export function Footer() {
  const { t, language } = useLanguage();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  const parsed = parseRoute(pathname);
  const isHome = parsed.kind === 'home';
  const homeHref = buildPagePath('home', language);

  const scrollOrNavigate = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: 'home' | 'about',
  ) => {
    e.preventDefault();
    const doScroll = () => {
      if (sectionId === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }
    };
    if (isHome) {
      doScroll();
    } else {
      navigate(homeHref);
      setTimeout(doScroll, 300);
    }
  };

  return (
    <footer className="border-t border-border">
      <div className="container mx-auto px-6 md:px-12 py-12 space-y-10">
        <nav aria-label={language === 'de' ? 'Footer-Navigation' : 'Footer navigation'}>
          <ul className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 text-sm">
            <li>
              <a
                href={homeHref}
                onClick={(e) => scrollOrNavigate(e, 'home')}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {t('nav.home')}
              </a>
            </li>
            <li>
              <Link
                to={buildPagePath('about', language)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {t('nav.about')}
              </Link>
            </li>
            <li>
              <Link
                to={buildPagePath('lessons', language)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {t('nav.lessons')}
              </Link>
            </li>
            <li>
              <Link
                to={buildPagePath('projects', language)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {t('nav.gallery')}
              </Link>
            </li>
            <li>
              <Link
                to={buildPagePath('contact', language)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {t('nav.contact')}
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
