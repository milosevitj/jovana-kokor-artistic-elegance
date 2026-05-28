import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";

export const PortfolioCTASection = () => {
  const { language } = useLanguage();

  const content =
    language === "de"
      ? {
          title: "Ein neues Projekt im Sinn?",
          subtitle:
            "Für Konzerte, Kollaborationen oder künstlerische Anfragen – ich freue mich, von dir zu hören.",
          button: "Kontakt aufnehmen",
          to: "/de/kontakt",
        }
      : {
          title: "A project in mind?",
          subtitle:
            "For concerts, collaborations or artistic inquiries – I'd love to hear from you.",
          button: "Get in touch",
          to: "/en/contact",
        };

  return (
    <section
      id="portfolio-cta"
      className="py-24 md:py-32 bg-background"
      aria-labelledby="portfolio-cta-title"
    >
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <h2
            id="portfolio-cta-title"
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
