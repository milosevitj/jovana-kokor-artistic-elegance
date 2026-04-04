import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';

export function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        backgroundColor: 'hsl(var(--footer-bg))',
        color: 'hsl(var(--footer-text))',
      }}
    >
      <div className="container mx-auto px-6 md:px-12 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo & Copyright */}
          <div className="text-center md:text-left">
            <p className="font-serif text-xl mb-2">Jovana Kokor</p>
            <p className="text-sm" style={{ color: 'hsl(var(--footer-muted))' }}>
              © {currentYear} {t('footer.rights')}
            </p>
          </div>

          {/* Legal Links */}
          <div className="flex items-center gap-6 text-sm">
            <Link
              to="/impressum"
              className="transition-colors hover:text-white"
              style={{ color: 'hsl(var(--footer-muted))' }}
            >
              {t('footer.impressum')}
            </Link>
            <span style={{ color: 'hsl(var(--footer-muted) / 0.3)' }}>|</span>
            <Link
              to="/privacy"
              className="transition-colors hover:text-white"
              style={{ color: 'hsl(var(--footer-muted))' }}
            >
              {t('footer.datenschutz')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
