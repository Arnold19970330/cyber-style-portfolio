import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden cyber-grid scanlines"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay'
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-background/80" />
      
      {/* Animated corners */}
      <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-primary animate-pulse-glow" />
      <div className="absolute top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-accent animate-pulse-glow" />
      <div className="absolute bottom-0 left-0 w-32 h-32 border-b-2 border-l-2 border-cyber-purple animate-pulse-glow" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-primary animate-pulse-glow" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
          {/* Glitch effect name */}
          <div className="relative inline-block">
            <h1 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold tracking-wider neon-text whitespace-nowrap"
              style={{ fontFamily: 'Orbitron, sans-serif' }}
            >
              <span className="text-primary">GALACZI</span>
              <span className="text-accent">_</span>
              <span className="text-foreground">ARNOLD</span>
            </h1>
          </div>

          {/* Subtitle with typing effect */}
          <div className="flex items-center justify-center gap-2 text-xl md:text-2xl">
            <span className="text-muted-foreground">&gt;</span>
            <p className="text-primary font-medium" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              FULL STACK DEVELOPER
            </p>
          </div>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Crafting <span className="text-primary">digital experiences</span> at the intersection of 
            <span className="text-accent"> design</span> and <span className="text-cyber-purple">technology.</span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Button 
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-8 py-6 text-lg cyber-border animate-pulse-glow"
              style={{ fontFamily: 'Orbitron, sans-serif' }}
              onClick={() => scrollToSection('projects')}
            >
              VIEW PROJECTS
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-accent text-accent hover:bg-accent hover:text-accent-foreground font-semibold px-8 py-6 text-lg"
              style={{ fontFamily: 'Orbitron, sans-serif' }}
              onClick={() => scrollToSection('contact')}
            >
              GET IN TOUCH
            </Button>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-[42%] lg:left-[48.5%] -translate-x-1/2 flex flex-col items-center gap-1 sm:gap-2 animate-bounce cursor-pointer" onClick={() => scrollToSection('about')}>
            <span className="text-muted-foreground text-xs sm:text-sm uppercase tracking-wider" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              Scroll
            </span>
            <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-primary" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
