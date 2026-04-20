import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import { SEOManager } from '@/components/SEOManager';
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
        <h2 className="font-serif text-xl mb-3">1. Allgemeine Informationen</h2>
        <p className="text-muted-foreground leading-relaxed">
          Diese Datenschutzerklärung erläutert, wie personenbezogene Daten beim Besuch dieser Website erhoben und verarbeitet werden. Personenbezogene Daten sind alle Informationen, die dazu verwendet werden können, Sie zu identifizieren.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-xl mb-3">2. Verantwortliche Stelle</h2>
        <p className="text-muted-foreground leading-relaxed">
          Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Jovana Kokor<br />
          E-Mail: jovanakokor8@gmail.com
        </p>
      </section>

      <section>
        <h2 className="font-serif text-xl mb-3">3. Datenerfassung auf dieser Website</h2>
        <h3 className="text-lg font-medium mb-2">Kontaktformular</h3>
        <p className="text-muted-foreground leading-relaxed">
          Wenn Sie uns über das Kontaktformular kontaktieren, werden die von Ihnen angegebenen Daten (wie Name, E-Mail-Adresse und Nachricht) zum Zweck der Bearbeitung Ihrer Anfrage und für mögliche Rückfragen gespeichert.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Wir geben diese Daten nicht ohne Ihre Einwilligung weiter.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-xl mb-3">4. Hosting</h2>
        <p className="text-muted-foreground leading-relaxed">
          Diese Website wird von einem externen Dienstleister gehostet. Die auf dieser Website erhobenen personenbezogenen Daten können auf den Servern des Hosting-Anbieters gespeichert werden. Dies kann IP-Adressen, Kontaktanfragen und andere durch die Nutzung der Website erzeugte Daten umfassen.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-xl mb-3">5. Eingebettete Inhalte</h2>
        <h3 className="text-lg font-medium mb-2">YouTube</h3>
        <p className="text-muted-foreground leading-relaxed">
          Diese Website verwendet eingebettete Videos von YouTube, einem Dienst der Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Wenn Sie eine Seite mit einem eingebetteten YouTube-Video besuchen, wird eine Verbindung zu den Servern von YouTube hergestellt. Dabei kann YouTube Informationen über Ihren Besuch auf dieser Website erhalten.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          YouTube kann auch Cookies auf Ihrem Gerät speichern und Nutzungsdaten erheben.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-xl mb-3">6. Rechtsgrundlage der Verarbeitung</h2>
        <p className="text-muted-foreground leading-relaxed">
          Die Verarbeitung Ihrer personenbezogenen Daten erfolgt auf Grundlage Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) und/oder unseres berechtigten Interesses (Art. 6 Abs. 1 lit. f DSGVO), z. B. zur Beantwortung Ihrer Anfragen.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-xl mb-3">7. Datenspeicherung</h2>
        <p className="text-muted-foreground leading-relaxed">
          Wir speichern Ihre personenbezogenen Daten nur so lange, wie es für die Bearbeitung Ihrer Anfrage oder die Erfüllung des Zwecks, für den sie erhoben wurden, erforderlich ist.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-xl mb-3">8. Ihre Rechte</h2>
        <p className="text-muted-foreground leading-relaxed">Sie haben das Recht:</p>
        <ul className="text-muted-foreground leading-relaxed list-disc pl-6">
          <li>Auskunft über Ihre gespeicherten personenbezogenen Daten zu verlangen</li>
          <li>die Berichtigung oder Löschung Ihrer Daten zu verlangen</li>
          <li>Ihre Einwilligung jederzeit zu widerrufen</li>
          <li>unter bestimmten Umständen die Einschränkung der Verarbeitung zu verlangen</li>
        </ul>
      </section>

      <section>
        <h2 className="font-serif text-xl mb-3">9. Beschwerderecht</h2>
        <p className="text-muted-foreground leading-relaxed">
          Sie haben das Recht, sich bei einer zuständigen Datenschutzbehörde zu beschweren, wenn Sie der Ansicht sind, dass Ihre Daten unrechtmäßig verarbeitet werden.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-xl mb-3">10. SSL-/TLS-Verschlüsselung</h2>
        <p className="text-muted-foreground leading-relaxed">
          Diese Website nutzt SSL-/TLS-Verschlüsselung zum Schutz der Übertragung vertraulicher Daten. Eine verschlüsselte Verbindung erkennen Sie an dem „https://" in der Adresszeile Ihres Browsers.
        </p>
      </section>
    </div>
  );
}

function PrivacyEN() {
  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6">
      <section>
        <h2 className="font-serif text-xl mb-3">1. General Information</h2>
        <p className="text-muted-foreground leading-relaxed">
          This Privacy Policy explains how personal data is collected and processed when you visit this website. Personal data refers to any information that can be used to identify you.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-xl mb-3">2. Responsible Party</h2>
        <p className="text-muted-foreground leading-relaxed">
          The responsible party for data processing on this website is:
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Jovana Kokor<br />
          Email: jovanakokor8@gmail.com
        </p>
      </section>

      <section>
        <h2 className="font-serif text-xl mb-3">3. Data Collection on This Website</h2>
        <h3 className="text-lg font-medium mb-2">Contact Form</h3>
        <p className="text-muted-foreground leading-relaxed">
          If you contact us via the contact form, the information you provide (such as your name, email address, and message) will be stored for the purpose of processing your inquiry and for possible follow-up questions.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          We do not share this data without your consent.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-xl mb-3">4. Hosting</h2>
        <p className="text-muted-foreground leading-relaxed">
          This website is hosted by an external service provider. Personal data collected on this website may be stored on the servers of the hosting provider. This may include IP addresses, contact requests, and other data generated through website usage.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-xl mb-3">5. Embedded Content</h2>
        <h3 className="text-lg font-medium mb-2">YouTube</h3>
        <p className="text-muted-foreground leading-relaxed">
          This website uses embedded videos from YouTube, a service provided by Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Ireland.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          When you visit a page with an embedded YouTube video, a connection to YouTube's servers is established. In doing so, YouTube may receive information about your visit to this website.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          YouTube may also store cookies on your device and collect usage data.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-xl mb-3">6. Legal Basis for Processing</h2>
        <p className="text-muted-foreground leading-relaxed">
          The processing of your personal data is based on your consent (Art. 6(1)(a) GDPR) and/or our legitimate interest (Art. 6(1)(f) GDPR), such as responding to your inquiries.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-xl mb-3">7. Data Retention</h2>
        <p className="text-muted-foreground leading-relaxed">
          We store your personal data only for as long as necessary to process your request or fulfill the purpose for which it was collected.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-xl mb-3">8. Your Rights</h2>
        <p className="text-muted-foreground leading-relaxed">You have the right to:</p>
        <ul className="text-muted-foreground leading-relaxed list-disc pl-6">
          <li>request information about your stored personal data</li>
          <li>request correction or deletion of your data</li>
          <li>withdraw your consent at any time</li>
          <li>request restriction of processing under certain circumstances</li>
        </ul>
      </section>

      <section>
        <h2 className="font-serif text-xl mb-3">9. Right to Lodge a Complaint</h2>
        <p className="text-muted-foreground leading-relaxed">
          You have the right to lodge a complaint with a competent data protection authority if you believe that your data is being processed unlawfully.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-xl mb-3">10. SSL/TLS Encryption</h2>
        <p className="text-muted-foreground leading-relaxed">
          This website uses SSL/TLS encryption to protect the transmission of confidential data. You can recognize an encrypted connection by the "https://" in your browser's address bar.
        </p>
      </section>
    </div>
  );
}

const PrivacyPolicy = () => (
  <LanguageProvider>
    <SEOManager />
    <PrivacyContent />
  </LanguageProvider>
);

export default PrivacyPolicy;
