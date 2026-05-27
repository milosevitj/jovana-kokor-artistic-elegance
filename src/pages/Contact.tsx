import { LanguageProvider } from '@/contexts/LanguageContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SEOManager } from '@/components/SEOManager';
import { ContactSection } from '@/components/ContactSection';

const Contact = () => {
  return (
    <LanguageProvider>
      <SEOManager />
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <Header />
        <main className="flex-1 flex items-center pt-24 pb-12">
          <div className="w-full">
            <ContactSection />
          </div>
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default Contact;
