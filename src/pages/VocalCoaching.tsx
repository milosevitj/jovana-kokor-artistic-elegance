import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Heart, Sparkles, Users, Send } from 'lucide-react';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import { SEOManager } from '@/components/SEOManager';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

function VocalCoachingContent() {
  const { language, t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const vocalQuotes = language === 'de'
    ? [
        { Icon: Heart, quote: 'Jede Stimme ist einzigartig. Deshalb gestalte ich jede Einheit individuell, angepasst an dein Tempo, deine Bedürfnisse und deinen persönlichen Weg.' },
        { Icon: Sparkles, quote: 'Es geht nicht nur um Technik, sondern auch um Ausdruck. Gemeinsam entdecken wir deine Stimme als kraftvollen Raum für Emotion und Persönlichkeit.' },
        { Icon: Users, quote: 'Musik kennt keine Altersgrenze. Ob 7 oder 70, ich passe meinen Unterricht an deinen Lernstil und deine Ziele an.' },
      ]
    : [
        { Icon: Heart, quote: 'Every voice is unique. That is why I shape each session individually — attuned to your pace, your needs and your personal path.' },
        { Icon: Sparkles, quote: 'It is not only about technique, but also about expression. Together we discover your voice as a powerful space for emotion and personality.' },
        { Icon: Users, quote: 'Music knows no age limit. Whether 7 or 70, I adapt my teaching to your learning style and your goals.' },
      ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const name = (formData.get('name') as string)?.trim();
    const email = (formData.get('email') as string)?.trim();
    const message = (formData.get('message') as string)?.trim();

    if (!name || !email || !message) {
      toast.error(t('contact.error.required'));
      setIsSubmitting(false);
      return;
    }

    try {
      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          name,
          email,
          subject: language === 'de' ? 'Vocal Coaching Anfrage' : 'Vocal Coaching Inquiry',
          message,
        },
      });
      if (error) throw error;
      setIsSubmitted(true);
      (e.target as HTMLFormElement).reset();
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (err) {
      console.error('Vocal coaching form error:', err);
      toast.error(t('contact.error.send'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const homeHref = `/${language}/`;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <section className="pt-32 pb-6 md:pt-40 md:pb-8 bg-secondary/30">
          <div className="container mx-auto px-6 md:px-12">
            <Link
              to={homeHref}
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              {language === 'de' ? 'Zurück zur Startseite' : 'Back to Home'}
            </Link>

            <div className="text-center max-w-3xl mx-auto">
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-4">
                {t('lessons.title')}
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl">
                {t('lessons.subtitle')}
              </p>
              <div className="w-20 h-px bg-primary mx-auto mt-6" />
            </div>
          </div>
        </section>

        <section className="pt-4 pb-16 md:pt-6 md:pb-24 bg-secondary/30">
          <div className="container mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {vocalQuotes.map(({ Icon, quote }, idx) => (
                <div
                  key={idx}
                  className="bg-card rounded-2xl border border-border/50 p-8 hover:border-primary/30 transition-colors duration-300 flex flex-col"
                >
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-foreground/90 leading-relaxed">
                    {quote}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Holistic approach – long form description */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-6 md:px-12 max-w-3xl">
            {language === 'de' ? (
              <div className="space-y-6 text-foreground/90 leading-relaxed text-lg">
                <p>Singen ist weit mehr als reine Technik, es ist ein ganzheitlicher Weg zu Stimme, Ausdruck und persönlicher Entfaltung.</p>
                <p>In meinem Coaching verbinde ich fundierte Vokaltechnik, Atemarbeit, Körperbewusstsein und künstlerischen Ausdruck zu einem individuellen, holistischen Ansatz. Denn Singen öffnet nicht nur die Stimme, sondern oft auch tiefere Ebenen unseres Selbst.</p>
                <p>Gemeinsam arbeiten wir daran, deine authentische Stimme zu stärken, emotionale Blockaden zu lösen, mehr Freiheit im Ausdruck zu entwickeln und eine tiefere Verbindung zu dir selbst aufzubauen.</p>
                <div>
                  <p className="mb-4">Meine Stunden bieten Raum für:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Vokaltechnik &amp; gesunde Stimmentwicklung</li>
                    <li>Atem- und Körperarbeit</li>
                    <li>Ausdruck, Bühnenpräsenz &amp; Persönlichkeit</li>
                    <li>Selbstvertrauen &amp; innere Freiheit</li>
                    <li>Kreative Entfaltung und künstlerisches Wachstum</li>
                  </ul>
                </div>
                <p>Mit Leichtigkeit, Freude und emotionaler Tiefe entsteht ein geschützter Raum, in dem du nicht nur gesanglich wächst, sondern oft auch neue Seiten an dir selbst entdeckst.</p>
                <p>Neben individuellem Coaching erweitern perspektivisch auch Vocal Workshops und kreative Gruppenformate mein Angebot – für gemeinsames Wachstum, Ausdruck und neue Impulse.</p>
                <p className="font-serif italic text-xl text-foreground">Deine Stimme kann ein Schlüssel zu mehr Ausdruck, Präsenz und innerer Freiheit sein, weit über das Singen hinaus.</p>
              </div>
            ) : (
              <div className="space-y-6 text-foreground/90 leading-relaxed text-lg">
                <p>Singing is far more than pure technique — it is a holistic path to voice, expression and personal unfolding.</p>
                <p>In my coaching I combine grounded vocal technique, breath work, body awareness and artistic expression into an individual, holistic approach. Because singing opens not only the voice, but often deeper layers of ourselves.</p>
                <p>Together we work on strengthening your authentic voice, releasing emotional blockages, developing more freedom of expression and building a deeper connection to yourself.</p>
                <div>
                  <p className="mb-4">My sessions offer space for:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Vocal technique &amp; healthy voice development</li>
                    <li>Breath and body work</li>
                    <li>Expression, stage presence &amp; personality</li>
                    <li>Self-confidence &amp; inner freedom</li>
                    <li>Creative unfolding and artistic growth</li>
                  </ul>
                </div>
                <p>With ease, joy and emotional depth a protected space emerges in which you not only grow vocally, but often also discover new sides of yourself.</p>
                <p>Alongside individual coaching, vocal workshops and creative group formats will gradually expand my offering — for shared growth, expression and new impulses.</p>
                <p className="font-serif italic text-xl text-foreground">Your voice can be a key to more expression, presence and inner freedom, far beyond singing itself.</p>
              </div>
            )}
          </div>
        </section>

        {/* Pricing / Packages */}
        <section className="py-16 md:py-24 bg-secondary/30">
          <div className="container mx-auto px-6 md:px-12 max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-4">
                {language === 'de' ? 'Coaching Pakete' : 'Coaching Packages'}
              </h2>
              <div className="w-16 h-px bg-primary mx-auto mt-6" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: language === 'de' ? 'Einzelcoaching' : 'Single Session',
                  meta: language === 'de' ? '60 Min' : '60 min',
                  price: '60 €',
                  bonus: null as string | null,
                },
                {
                  title: language === 'de' ? '5er Paket' : '5-Session Package',
                  meta: language === 'de' ? '5 Sessions à 60 Min' : '5 sessions × 60 min',
                  price: '250 €',
                  bonus: null,
                },
                {
                  title: language === 'de' ? '10er Paket' : '10-Session Package',
                  meta: language === 'de' ? '10 Sessions à 60 Min' : '10 sessions × 60 min',
                  price: '500 €',
                  bonus: language === 'de' ? '+ 1 Bonus Session inklusive' : '+ 1 bonus session included',
                },
              ].map((pkg) => (
                <div
                  key={pkg.title}
                  className="bg-card rounded-2xl border border-border/50 p-8 text-center hover:border-primary/30 transition-colors duration-300 flex flex-col"
                >
                  <h3 className="font-serif text-2xl font-medium mb-2">{pkg.title}</h3>
                  <p className="text-muted-foreground text-sm mb-6">{pkg.meta}</p>
                  <div className="font-serif text-4xl text-primary mb-4">{pkg.price}</div>
                  {pkg.bonus && (
                    <p className="text-sm text-foreground/80 mt-auto pt-4 border-t border-border/40">
                      {pkg.bonus}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div className="max-w-3xl mx-auto mt-12 space-y-6 text-muted-foreground leading-relaxed text-base md:text-lg text-center">
              <p>
                {language === 'de'
                  ? 'Jede Session bietet Raum für individuelle Begleitung, gezielte Stimmentwicklung und persönliche Entfaltung. Ich nehme mir bewusst Zeit für meine Schüler:innen, um nicht nur an Technik, sondern auch an Ausdruck, Atmung und künstlerischer Entwicklung ganzheitlich zu arbeiten.'
                  : 'Every session offers space for individual guidance, focused vocal development and personal unfolding. I consciously take time for my students to work holistically – not only on technique, but also on expression, breathing and artistic growth.'}
              </p>
              <div>
                <h3 className="font-serif text-xl text-foreground mb-2">
                  {language === 'de' ? 'Vocal Workshops & Gruppenangebote' : 'Vocal Workshops & Group Offerings'}
                </h3>
                <p>
                  {language === 'de'
                    ? 'Aktuelle Termine und Angebote werden regelmäßig auf der Website veröffentlicht.'
                    : 'Current dates and offers are published regularly on this website.'}
                </p>
              </div>
              <p>
                {language === 'de'
                  ? 'Für weitere Fragen oder individuelle Anfragen freue ich mich über deine Nachricht.'
                  : 'For further questions or individual inquiries, I look forward to hearing from you.'}
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 md:py-32">
          <div className="container mx-auto px-6 md:px-12">
            <div className="max-w-2xl mx-auto text-center space-y-8">
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-tight">
                {language === 'de'
                  ? 'Bereit, deine Stimme zu entfalten?'
                  : 'Ready to unfold your voice?'}
              </h2>
              <div className="w-16 h-px bg-primary mx-auto" />
              <p className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-xl mx-auto">
                {language === 'de'
                  ? 'Jede Coaching-Einheit ist persönlich und individuell auf dich abgestimmt. Schreib mir für Buchungen oder Fragen – ich freue mich, von dir zu hören.'
                  : "Every coaching session is personal and tailored to you. Reach out for bookings or questions — I'd love to hear from you."}
              </p>
              <div className="pt-2">
                <Link
                  to={language === 'de' ? '/de/kontakt' : '/en/contact'}
                  className="btn-hero inline-flex items-center"
                >
                  {language === 'de' ? 'Kontakt aufnehmen' : 'Get in touch'}
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}

const VocalCoaching = () => (
  <LanguageProvider>
    <SEOManager />
    <VocalCoachingContent />
  </LanguageProvider>
);

export default VocalCoaching;
