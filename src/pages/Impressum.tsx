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
          Künstlerin / Performerin
        </p>
        <p className="text-muted-foreground leading-relaxed">
          E-Mail: kontakt@jovanakokor.com
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
        <h2 className="font-serif text-xl mb-3">Information pursuant to § 5 TMG</h2>
        <p className="text-muted-foreground leading-relaxed">
          Jovana Kokor<br />
          Artist / Performer<br />
          Email: kontakt@jovanakokor.com
        </p>
      </section>

      <section>
        <h2 className="font-serif text-xl mb-3">Contact</h2>
        <p className="text-muted-foreground leading-relaxed">
          Email: kontakt@jovanakokor.com
        </p>
      </section>

      <section>
        <h2 className="font-serif text-xl mb-3">Responsible for Content pursuant to § 55 Abs. 2 RStV</h2>
        <p className="text-muted-foreground leading-relaxed">
          Jovana Kokor<br />
          (Address as above)
        </p>
      </section>

      <section>
        <h2 className="font-serif text-xl mb-3">Liability for Content</h2>
        <p className="text-muted-foreground leading-relaxed">
          As a service provider, we are responsible for our own content on these pages in accordance with general laws pursuant to § 7 Para. 1 TMG. However, according to §§ 8 to 10 TMG, we are not obligated as a service provider to monitor transmitted or stored third-party information or to investigate circumstances that indicate illegal activity.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Obligations to remove or block the use of information under general laws remain unaffected. However, liability in this regard is only possible from the time of knowledge of a specific legal violation. Upon becoming aware of corresponding legal violations, we will remove this content immediately.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-xl mb-3">Liability for Links</h2>
        <p className="text-muted-foreground leading-relaxed">
          Our offer contains links to external websites of third parties, over whose content we have no influence. Therefore, we cannot assume any liability for these external contents. The respective provider or operator of the pages is always responsible for the content of the linked pages. The linked pages were checked for possible legal violations at the time of linking. Illegal content was not recognizable at the time of linking.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-xl mb-3">Copyright</h2>
        <p className="text-muted-foreground leading-relaxed">
          The content and works created by the site operators on these pages are subject to German copyright law. Duplication, processing, distribution, and any kind of exploitation beyond the limits of copyright law require the written consent of the respective author or creator. Downloads and copies of this site are only permitted for private, non-commercial use.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-xl mb-3">Dispute Resolution</h2>
        <p className="text-muted-foreground leading-relaxed">
          The European Commission provides a platform for online dispute resolution (OS):{' '}
          <a
            href="https://ec.europa.eu/consumers/odr/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground underline hover:text-primary transition-colors"
          >
            https://ec.europa.eu/consumers/odr/
          </a>
          . We are not willing or obliged to participate in dispute resolution proceedings before a consumer arbitration board.
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
