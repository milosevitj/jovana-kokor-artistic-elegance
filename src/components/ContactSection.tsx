import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Send, Instagram, Facebook, Mail } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export function ContactSection() {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const name = (formData.get('name') as string)?.trim();
    const email = (formData.get('email') as string)?.trim();
    const subject = formData.get('subject') as string;
    const message = (formData.get('message') as string)?.trim();

    if (!name || !email || !subject || !message) {
      toast.error(t('contact.error.required'));
      setIsSubmitting(false);
      return;
    }

    try {
      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: { name, email, subject, message },
      });

      if (error) throw error;

      setIsSubmitted(true);
      (e.target as HTMLFormElement).reset();
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (err) {
      console.error('Contact form error:', err);
      toast.error(t('contact.error.send'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const subjects = [
    { value: 'booking', label: t('contact.subject.booking') },
    { value: 'collaboration', label: t('contact.subject.collaboration') },
    { value: 'press', label: t('contact.subject.press') },
    { value: 'other', label: t('contact.subject.other') },
  ];

  return (
    <section id="contact" className="section-padding">
      <div className="container mx-auto max-w-2xl">
        {/* CTA */}
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-4">
            {t('contact.title')}
          </h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>

        {/* Form */}
        {isSubmitted ? (
          <div className="bg-card border border-primary/30 rounded-sm p-8 text-center animate-scale-in">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Send className="w-6 h-6 text-primary" />
            </div>
            <p className="text-lg font-medium">{t('contact.success')}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  {t('contact.name')} *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  maxLength={100}
                  className="w-full px-4 py-3 bg-card border border-border rounded-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  {t('contact.email')} *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  maxLength={255}
                  className="w-full px-4 py-3 bg-card border border-border rounded-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium mb-2">
                {t('contact.subject')} *
              </label>
              <select
                id="subject"
                name="subject"
                required
                className="w-full px-4 py-3 bg-card border border-border rounded-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors appearance-none cursor-pointer"
              >
                <option value="">—</option>
                {subjects.map((subject) => (
                  <option key={subject.value} value={subject.value}>
                    {subject.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                {t('contact.message')} *
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                maxLength={1000}
                className="w-full px-4 py-3 bg-card border border-border rounded-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors resize-none"
              />
            </div>

            <div className="flex justify-center pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-hero disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? t('contact.sending') : t('contact.send')}
                <Send className="w-4 h-4 ml-2" />
              </button>
            </div>
          </form>
        )}

        {/* Social Icons */}
        <div className="flex justify-center gap-6 mt-16">
          <a
            href="https://www.instagram.com/joywannasworld/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="Instagram"
          >
            <Instagram className="w-5 h-5" />
          </a>
          <a
            href="https://www.facebook.com/JovanaKokor"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="Facebook"
          >
            <Facebook className="w-5 h-5" />
          </a>
          <a
            href="mailto:jovanakokor8@gmail.com"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="Email"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
