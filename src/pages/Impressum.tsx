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
        <h2 className="font-serif text-xl mb-3">Angaben gemäß § 5 TMG</h2>
        <p className="text-muted-foreground leading-relaxed">
          Jovana Kokor<br />
          Künstlerin / Performerin<br />
          E-Mail: kontakt@jovanakokor.com
        </p>
      </section>

      <section>
        <h2 className="font-serif text-xl mb-3">Kontakt</h2>
        <p className="text-muted-foreground leading-relaxed">
          E-Mail: kontakt@jovanakokor.com
        </p>
      </section>

      <section>
        <h2 className="font-serif text-xl mb-3">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
        <p className="text-muted-foreground leading-relaxed">
          Jovana Kokor<br />
          (Adresse wie oben)
        </p>
      </section>

      <section>
        <h2 className="font-serif text-xl mb-3">Haftung für Inhalte</h2>
        <p className="text-muted-foreground leading-relaxed">
          Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-xl mb-3">Haftung für Links</h2>
        <p className="text-muted-foreground leading-relaxed">
          Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-xl mb-3">Urheberrecht</h2>
        <p className="text-muted-foreground leading-relaxed">
          Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-xl mb-3">Streitschlichtung</h2>
        <p className="text-muted-foreground leading-relaxed">
          Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{' '}
          <a
            href="https://ec.europa.eu/consumers/odr/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground underline hover:text-primary transition-colors"
          >
            https://ec.europa.eu/consumers/odr/
          </a>
          . Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
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
