import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";

export const HomeCTASection = () => {
  const { language } = useLanguage();

  const content =
    language === "de"
      ? {
          title: "Lass uns etwas Schönes erschaffen",
          subtitle:
            "Verfügbar für Konzerte, Kollaborationen und Vocal Coaching. Schreib mir – ich freue mich auf deine Nachricht.",
          button: "Kontakt aufnehmen",
          to: "/de/kontakt",
        }
      : {
          title: "Let's create something together",
          subtitle:
            "Available for concerts, collaborations and vocal coaching. Reach out – I'd love to hear from you.",
          button: "Contact me",
          to: "/en/contact",
        };

  return (
    <section
      id="home-cta"
      className="py-24 md:py-32 bg-background"
      aria-labelledby="home-cta-title"
    >
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <h2
            id="home-cta-title"
            className="font-display text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tight text-foreground"
          >
            {content.title}
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-xl mx-auto">
            {content.subtitle}
          </p>
          <div className="pt-2">
            <Button asChild size="lg" className="px-10">
              <Link to={content.to}>{content.button}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
