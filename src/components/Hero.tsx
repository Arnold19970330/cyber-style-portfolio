import { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import { useI18n } from "@/i18n/context";

const Hero = () => {
  const { t } = useI18n();
  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden cyber-grid scanlines"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay'
      }}
      aria-label="Hero section"
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-background/80" />
      
      {/* Animated corners - smaller on mobile */}
      <div className="absolute top-0 left-0 w-12 h-12 sm:w-20 sm:h-20 md:w-32 md:h-32 border-t-2 border-l-2 border-primary animate-pulse-glow" />
      <div className="absolute top-0 right-0 w-12 h-12 sm:w-20 sm:h-20 md:w-32 md:h-32 border-t-2 border-r-2 border-accent animate-pulse-glow" />
      <div className="absolute bottom-0 left-0 w-12 h-12 sm:w-20 sm:h-20 md:w-32 md:h-32 border-b-2 border-l-2 border-cyber-purple animate-pulse-glow" />
      <div className="absolute bottom-0 right-0 w-12 h-12 sm:w-20 sm:h-20 md:w-32 md:h-32 border-b-2 border-r-2 border-primary animate-pulse-glow" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8 animate-fade-in">
          {/* Glitch effect name */}
          <div className="relative inline-block">
            <h1
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold tracking-wider neon-text whitespace-nowrap font-orbitron"
            >
              <span className="text-primary">GALACZI</span>
              <span className="text-accent">_</span>
              <span className="text-foreground">ARNOLD</span>
            </h1>
          </div>

          {/* Subtitle with typing effect */}
          <div className="flex items-center justify-center gap-2 text-lg sm:text-xl md:text-2xl">
            <span className="text-muted-foreground">&gt;</span>
            <p className="text-primary font-medium font-orbitron">
              {t("hero.role")}
            </p>
          </div>

          {/* Description */}
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed px-2">
            {t("hero.desc.pre")}
            <span className="text-primary">{t("hero.desc.highlight")}</span>
            {t("hero.desc.mid")}
            <span className="text-accent">{t("hero.desc.design")}</span>
            {t("hero.desc.and")}
            <span className="text-cyber-purple">{t("hero.desc.technology")}</span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6 pb-16 sm:pt-8 sm:pb-20">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-8 py-6 text-lg cyber-border animate-pulse-glow font-orbitron"
              onClick={() => scrollToSection('projects')}
              aria-label={t("hero.ariaProjects")}
            >
              {t("hero.ctaProjects")}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-accent text-accent hover:bg-accent hover:text-accent-foreground font-semibold px-8 py-6 text-lg font-orbitron"
              onClick={() => scrollToSection('contact')}
              aria-label={t("hero.ariaContact")}
            >
              {t("hero.ctaContact")}
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator - positioned relative to section */}
      <button
        type="button"
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 sm:gap-2 animate-bounce cursor-pointer bg-transparent border-none p-0 z-10"
        onClick={() => scrollToSection('about')}
        aria-label={t("hero.ariaAbout")}
      >
        <span className="text-muted-foreground text-xs sm:text-sm uppercase tracking-wider font-orbitron">
          {t("hero.scroll")}
        </span>
        <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-primary" aria-hidden="true" />
      </button>
    </section>
  );
};

export default Hero;
