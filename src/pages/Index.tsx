import { lazy, Suspense } from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { Header } from '@/components/Header';
import { useHashNavigation } from '@/hooks/use-hash-navigation';
import { HeroSection } from '@/components/HeroSection';
import { Footer } from '@/components/Footer';
import { SEOManager } from '@/components/SEOManager';

// Lazy-load below-the-fold sections to reduce initial bundle size
const GigsSection = lazy(() => import('@/components/GigsSection').then(m => ({ default: m.GigsSection })));
const AboutSection = lazy(() => import('@/components/AboutSection').then(m => ({ default: m.AboutSection })));
const LessonsSection = lazy(() => import('@/components/LessonsSection').then(m => ({ default: m.LessonsSection })));
const PortfolioSection = lazy(() => import('@/components/PortfolioSection').then(m => ({ default: m.PortfolioSection })));
const ContactSection = lazy(() => import('@/components/ContactSection').then(m => ({ default: m.ContactSection })));

const SectionFallback = () => <div className="min-h-[40vh]" aria-hidden="true" />;

const Index = () => {
  useHashNavigation();

  return (
    <LanguageProvider>
      <SEOManager />
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <main>
          <HeroSection />
          <Suspense fallback={<SectionFallback />}>
            <GigsSection />
            <AboutSection />
            <LessonsSection />
            <PortfolioSection />
            <ContactSection />
          </Suspense>
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default Index;
