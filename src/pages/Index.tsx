import { LanguageProvider } from '@/contexts/LanguageContext';
import { Header } from '@/components/Header';
import { useHashNavigation } from '@/hooks/use-hash-navigation';
import { HeroSection } from '@/components/HeroSection';
import { GigsSection } from '@/components/GigsSection';
import { AboutSection } from '@/components/AboutSection';
import { LessonsSection } from '@/components/LessonsSection';
import { PortfolioSection } from '@/components/PortfolioSection';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';

const Index = () => {
  useHashNavigation();

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <main>
          <HeroSection />
          <GigsSection />
          <AboutSection />
          <LessonsSection />
          <PortfolioSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default Index;