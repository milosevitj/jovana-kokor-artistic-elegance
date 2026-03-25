import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

function PrivacyContent() {
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
          {t('footer.datenschutz')}
        </h1>

        {language === 'de' ? <PrivacyDE /> : <PrivacyEN />}
      </main>
      <Footer />
    </div>
  );
}

function PrivacyDE() {
  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6">
      <section>
        <h2 className="font-serif text-xl mb-3">1. Datenschutz auf einen Blick</h2>
        <h3 className="text-lg font-medium mb-2">Allgemeine Hinweise</h3>
        <p className="text-muted-foreground leading-relaxed">
          Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-xl mb-3">2. Verantwortliche Stelle</h2>
        <p className="text-muted-foreground leading-relaxed">
          Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Jovana Kokor<br />
          E-Mail: kontakt@jovanakokor.com
        </p>
      </section>

      <section>
        <h2 className="font-serif text-xl mb-3">3. Datenerfassung auf dieser Website</h2>
        <h3 className="text-lg font-medium mb-2">Kontaktformular</h3>
        <p className="text-muted-foreground leading-relaxed">
          Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-xl mb-3">4. Hosting</h2>
        <p className="text-muted-foreground leading-relaxed">
          Diese Website wird extern gehostet. Die personenbezogenen Daten, die auf dieser Website erfasst werden, werden auf den Servern des Hosters gespeichert. Hierbei kann es sich v. a. um IP-Adressen, Kontaktanfragen, Meta- und Kommunikationsdaten, Vertragsdaten, Kontaktdaten, Namen, Websitezugriffe und sonstige Daten, die über eine Website generiert werden, handeln.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-xl mb-3">5. Eingebettete Inhalte</h2>
        <h3 className="text-lg font-medium mb-2">YouTube</h3>
        <p className="text-muted-foreground leading-relaxed">
          Diese Website nutzt Plugins der von Google betriebenen Seite YouTube. Betreiber der Seiten ist die Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland. Wenn Sie eine unserer mit einem YouTube-Plugin ausgestatteten Seiten besuchen, wird eine Verbindung zu den Servern von YouTube hergestellt. Dabei wird dem YouTube-Server mitgeteilt, welche unserer Seiten Sie besucht haben.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-xl mb-3">6. Ihre Rechte</h2>
        <p className="text-muted-foreground leading-relaxed">
          Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben, können Sie diese Einwilligung jederzeit für die Zukunft widerrufen. Außerdem haben Sie das Recht, unter bestimmten Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-xl mb-3">7. SSL- bzw. TLS-Verschlüsselung</h2>
        <p className="text-muted-foreground leading-relaxed">
          Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von „http://" auf „https://" wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.
        </p>
      </section>
    </div>
  );
}

function PrivacyEN() {
  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6">
      <section>
        <h2 className="font-serif text-xl mb-3">1. Privacy at a Glance</h2>
        <h3 className="text-lg font-medium mb-2">General Information</h3>
        <p className="text-muted-foreground leading-relaxed">
          The following notes provide a simple overview of what happens to your personal data when you visit this website. Personal data is any data that can be used to personally identify you.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-xl mb-3">2. Responsible Party</h2>
        <p className="text-muted-foreground leading-relaxed">
          The responsible party for data processing on this website is:
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Jovana Kokor<br />
          Email: kontakt@jovanakokor.com
        </p>
      </section>

      <section>
        <h2 className="font-serif text-xl mb-3">3. Data Collection on This Website</h2>
        <h3 className="text-lg font-medium mb-2">Contact Form</h3>
        <p className="text-muted-foreground leading-relaxed">
          When you send us inquiries via the contact form, your details from the inquiry form, including the contact data you provided there, will be stored by us for the purpose of processing the inquiry and in case of follow-up questions. We do not share this data without your consent.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-xl mb-3">4. Hosting</h2>
        <p className="text-muted-foreground leading-relaxed">
          This website is hosted externally. The personal data collected on this website is stored on the host's servers. This may include IP addresses, contact requests, meta and communication data, contract data, contact details, names, website access, and other data generated through a website.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-xl mb-3">5. Embedded Content</h2>
        <h3 className="text-lg font-medium mb-2">YouTube</h3>
        <p className="text-muted-foreground leading-relaxed">
          This website uses plugins from the Google-operated site YouTube. The operator of the pages is Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Ireland. When you visit one of our pages equipped with a YouTube plugin, a connection to the YouTube servers is established. The YouTube server is informed which of our pages you have visited.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-xl mb-3">6. Your Rights</h2>
        <p className="text-muted-foreground leading-relaxed">
          You have the right at any time to receive free information about the origin, recipient, and purpose of your stored personal data. You also have the right to request the correction or deletion of this data. If you have given consent to data processing, you can revoke this consent at any time for the future. You also have the right, under certain circumstances, to request the restriction of the processing of your personal data.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-xl mb-3">7. SSL/TLS Encryption</h2>
        <p className="text-muted-foreground leading-relaxed">
          This site uses SSL or TLS encryption for security reasons and to protect the transmission of confidential content. You can recognize an encrypted connection by the fact that the address line of the browser changes from "http://" to "https://" and by the lock symbol in your browser line.
        </p>
      </section>
    </div>
  );
}

const PrivacyPolicy = () => (
  <LanguageProvider>
    <PrivacyContent />
  </LanguageProvider>
);

export default PrivacyPolicy;
