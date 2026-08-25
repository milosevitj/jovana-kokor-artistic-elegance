import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AboutSection } from '@/components/AboutSection';
import { SEOManager } from '@/components/SEOManager';
import { parseRoute } from '@/lib/site-routes';

function LanguageSync() {
  const { pathname } = useLocation();
  const { language, setLanguage } = useLanguage();
  useEffect(() => {
    const parsed = parseRoute(pathname);
    if (parsed.lang !== language) setLanguage(parsed.lang);
  }, [pathname, language, setLanguage]);
  return null;
}

const About = () => {
  return (
    <LanguageProvider>
      <SEOManager />
      <LanguageSync />
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <main className="pt-16 md:pt-20">
          <AboutSection className="!pt-10 md:!pt-14" />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default About;
