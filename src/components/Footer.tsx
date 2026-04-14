import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';

export function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="container mx-auto px-6 md:px-12 py-12">
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
