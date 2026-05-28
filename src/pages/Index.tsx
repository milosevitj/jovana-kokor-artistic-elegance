import { lazy, Suspense, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { Footer } from '@/components/Footer';
import { SEOManager } from '@/components/SEOManager';
import { parseRoute } from '@/lib/site-routes';

// Lazy-load below-the-fold sections to reduce initial bundle size
const GigsSection = lazy(() => import('@/components/GigsSection').then(m => ({ default: m.GigsSection })));
const AboutSection = lazy(() => import('@/components/AboutSection').then(m => ({ default: m.AboutSection })));
const PortfolioSection = lazy(() => import('@/components/PortfolioSection').then(m => ({ default: m.PortfolioSection })));
const HomeCTASection = lazy(() => import('@/components/HomeCTASection').then(m => ({ default: m.HomeCTASection })));


const SectionFallback = () => <div className="min-h-[40vh]" aria-hidden="true" />;

/**
 * Syncs the active language with the URL prefix (/en/* → English, else German).
 */
function LanguageSync() {
  const { pathname } = useLocation();
  const { language, setLanguage } = useLanguage();

  useEffect(() => {
    const parsed = parseRoute(pathname);
    if (parsed.lang !== language) setLanguage(parsed.lang);
  }, [pathname, language, setLanguage]);

  return null;
}

const Index = () => {
  return (
    <LanguageProvider>
      <SEOManager />
      <LanguageSync />
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
