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

  const vocalCards = [
    { titleKey: 'lessons.vocal.individual', descKey: 'lessons.vocal.individual.desc', Icon: Heart },
    { titleKey: 'lessons.vocal.expression', descKey: 'lessons.vocal.expression.desc', Icon: Sparkles },
    { titleKey: 'lessons.vocal.allages', descKey: 'lessons.vocal.allages.desc', Icon: Users },
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
        <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-secondary/30">
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

        <section className="py-16 md:py-24 bg-secondary/30">
          <div className="container mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {vocalCards.map(({ titleKey, descKey, Icon }) => (
                <div
                  key={titleKey}
                  className="bg-card rounded-2xl border border-border/50 p-8 hover:border-primary/30 transition-colors duration-300"
                >
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="font-serif text-2xl font-medium mb-4">{t(titleKey)}</h2>
                  <p className="text-muted-foreground leading-relaxed">{t(descKey)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA + Contact form */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-6 md:px-12 max-w-2xl">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-4">
                {t('vocal.cta.title')}
              </h2>
              <p className="text-muted-foreground text-lg">
                {t('vocal.cta.subtitle')}
              </p>
              <div className="w-16 h-px bg-primary mx-auto mt-6" />
            </div>

            {isSubmitted ? (
              <div className="bg-card border border-primary/30 rounded-sm p-8 text-center animate-scale-in">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Send className="w-6 h-6 text-primary" />
                </div>
                <p className="text-lg font-medium">{t('contact.success')}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="vc-name" className="block text-sm font-medium mb-2">
                    {t('contact.name')} *
                  </label>
                  <input
                    type="text"
                    id="vc-name"
                    name="name"
                    required
                    maxLength={100}
                    className="w-full px-4 py-3 bg-card border border-border rounded-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="vc-email" className="block text-sm font-medium mb-2">
                    {t('contact.email')} *
                  </label>
                  <input
                    type="email"
                    id="vc-email"
                    name="email"
                    required
                    maxLength={255}
                    className="w-full px-4 py-3 bg-card border border-border rounded-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="vc-message" className="block text-sm font-medium mb-2">
                    {t('contact.message')} *
                  </label>
                  <textarea
                    id="vc-message"
                    name="message"
                    required
                    rows={5}
                    maxLength={1000}
                    className="w-full px-4 py-3 bg-card border border-border rounded-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-hero w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? t('contact.sending') : t('contact.send')}
                  <Send className="w-4 h-4 ml-2" />
                </button>
              </form>
            )}
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
