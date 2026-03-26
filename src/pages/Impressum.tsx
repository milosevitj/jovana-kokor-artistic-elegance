import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

function ImpressumContent() {
  const { language, t } = useLanguage();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="container mx-auto px-6 md:px-12 py-24 md:py-32 max-w-3xl">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          {language === 'de' ? 'Zurück zur Startseite' : 'Back to Home'}
        </Link>

        <h1 className="font-serif text-3xl md:text-4xl mb-8">
          {t('footer.impressum')}
        </h1>

        {language === 'de' ? <ImpressumDE /> : <ImpressumEN />}
      </main>
      <Footer />
    </div>
  );
}

function ImpressumDE() {
  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6">
      <section>
        <h2 className="font-serif text-xl mb-3">Angaben gemäß geltendem Recht</h2>
        <p className="text-muted-foreground leading-relaxed">
          Jovana Kokor<br />
          Künstlerin / Performerin<br />
          Oldenburg, Deutschland
        </p>
        <p className="text-muted-foreground leading-relaxed">
          E-Mail: jovanakokor8@gmail.com
        </p>
      </section>

      <section>
        <h2 className="font-serif text-xl mb-3">Verantwortlich für den Inhalt</h2>
        <p className="text-muted-foreground leading-relaxed">
          Jovana Kokor
        </p>
      </section>

      <section>
        <h2 className="font-serif text-xl mb-3">Haftung für Inhalte</h2>
        <p className="text-muted-foreground leading-relaxed">
          Die Inhalte dieser Website wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-xl mb-3">Haftung für Links</h2>
        <p className="text-muted-foreground leading-relaxed">
          Diese Website kann Links zu externen Websites enthalten. Auf deren Inhalte haben wir keinen Einfluss und können daher keine Haftung dafür übernehmen. Für die Inhalte ist stets der jeweilige Anbieter oder Betreiber verantwortlich.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-xl mb-3">Urheberrecht</h2>
        <p className="text-muted-foreground leading-relaxed">
          Alle Inhalte dieser Website unterliegen dem geltenden Urheberrecht. Jede Vervielfältigung, Verbreitung oder Nutzung bedarf der vorherigen schriftlichen Zustimmung.
        </p>
      </section>
    </div>
  );
}

function ImpressumEN() {
  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6">
      <section>
        <h2 className="font-serif text-xl mb-3">Information according to applicable laws</h2>
        <p className="text-muted-foreground leading-relaxed">
          Jovana Kokor<br />
          Artist / Performer<br />
          Oldenburg, Germany
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Email: jovanakokor8@gmail.com
        </p>
      </section>

      <section>
        <h2 className="font-serif text-xl mb-3">Responsible for Content</h2>
        <p className="text-muted-foreground leading-relaxed">
          Jovana Kokor
        </p>
      </section>

      <section>
        <h2 className="font-serif text-xl mb-3">Liability for Content</h2>
        <p className="text-muted-foreground leading-relaxed">
          The contents of this website have been created with the greatest care. However, we cannot guarantee the accuracy, completeness, or timeliness of the content.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-xl mb-3">Liability for Links</h2>
        <p className="text-muted-foreground leading-relaxed">
          This website may contain links to external websites. We have no control over the content of those websites and therefore cannot accept any liability for them. The respective provider or operator is always responsible for their content.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-xl mb-3">Copyright</h2>
        <p className="text-muted-foreground leading-relaxed">
          All content on this website is subject to applicable copyright laws. Any reproduction, distribution, or use requires prior written consent.
        </p>
      </section>
    </div>
  );
}

const Impressum = () => (
  <LanguageProvider>
    <ImpressumContent />
  </LanguageProvider>
);

export default Impressum;
