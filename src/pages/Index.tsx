import { lazy, Suspense, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import { Header } from '@/components/Header';
import { useHashNavigation } from '@/hooks/use-hash-navigation';
import { HeroSection } from '@/components/HeroSection';
import { Footer } from '@/components/Footer';
import { SEOManager } from '@/components/SEOManager';
import { parseRoute, type SectionId } from '@/lib/site-routes';

// Lazy-load below-the-fold sections to reduce initial bundle size
const GigsSection = lazy(() => import('@/components/GigsSection').then(m => ({ default: m.GigsSection })));
const AboutSection = lazy(() => import('@/components/AboutSection').then(m => ({ default: m.AboutSection })));
const PortfolioSection = lazy(() => import('@/components/PortfolioSection').then(m => ({ default: m.PortfolioSection })));
const HomeCTASection = lazy(() => import('@/components/HomeCTASection').then(m => ({ default: m.HomeCTASection })));


const SectionFallback = () => <div className="min-h-[40vh]" aria-hidden="true" />;

/**
 * Syncs the active language with the URL path (/de/* or /en/*) and
 * smooth-scrolls to the section that the URL points to.
 */
function LocalizedSectionSync() {
  const { pathname } = useLocation();
  const { language, setLanguage } = useLanguage();

  // 1. Sync language from URL prefix.
  useEffect(() => {
    const parsed = parseRoute(pathname);
    if (parsed.kind !== 'other' && 'lang' in parsed && parsed.lang) {
      if (parsed.lang !== language) setLanguage(parsed.lang);
    }
  }, [pathname, language, setLanguage]);

  // 2. Scroll to section based on URL.
  useEffect(() => {
    const parsed = parseRoute(pathname);
    let target: SectionId | null = null;
    if (parsed.kind === 'home') target = 'home';
    else if (parsed.kind === 'section') target = parsed.section;
    if (!target) return;

    const id = target;
    // Wait for lazy-loaded sections to mount.
    let attempts = 0;
    const tryScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        if (id === 'home') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        return;
      }
      if (attempts++ < 30) setTimeout(tryScroll, 100);
    };
    // small initial delay so layout settles
    setTimeout(tryScroll, 50);
  }, [pathname]);

  return null;
}

const Index = () => {
  useHashNavigation();

  return (
    <LanguageProvider>
      <SEOManager />
      <LocalizedSectionSync />
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <main>
          <HeroSection />
          <Suspense fallback={<SectionFallback />}>
            <GigsSection />
            <AboutSection />
            <PortfolioSection />
            <HomeCTASection />
          </Suspense>
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default Index;
