import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Send, Instagram, Facebook, Mail } from 'lucide-react';

export function ContactSection() {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const subjects = [
    { value: 'booking', label: t('contact.subject.booking') },
    { value: 'collaboration', label: t('contact.subject.collaboration') },
    { value: 'press', label: t('contact.subject.press') },
    { value: 'other', label: t('contact.subject.other') },
  ];

  return (
    <section id="contact" className="section-padding">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left: Info */}
          <div>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-4">
              {t('contact.title')}
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-md">
              {t('contact.subtitle')}
            </p>
            <div className="w-16 h-px bg-primary mb-12" />

            {/* Social Links */}
            <div>
              <p className="text-sm text-muted-foreground uppercase tracking-wider mb-4">
                {t('footer.follow')}
              </p>
              <div className="flex gap-4">
                <a
                  href="https://www.instagram.com/joywannasworld/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://www.facebook.com/JovanaKokor"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="mailto:jovanakokor8@gmail.com"
                  className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
                  aria-label="Email"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div>
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
                      className="w-full px-4 py-3 bg-background border border-border rounded-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
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
                      className="w-full px-4 py-3 bg-background border border-border rounded-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
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
                    className="w-full px-4 py-3 bg-background border border-border rounded-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors appearance-none cursor-pointer"
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
                    className="w-full px-4 py-3 bg-background border border-border rounded-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors resize-none"
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
        </div>
      </div>
    </section>
  );
}
