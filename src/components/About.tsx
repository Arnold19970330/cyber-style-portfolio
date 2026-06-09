import { Code2, Layers, Sparkles, Zap } from "lucide-react";
import { useI18n } from "@/i18n/context";

const About = () => {
  const { t } = useI18n();

  const highlights = [
    {
      icon: Code2,
      titleKey: "about.highlights.cleanCode.title" as const,
      descKey: "about.highlights.cleanCode.desc" as const,
    },
    {
      icon: Layers,
      titleKey: "about.highlights.modernDesign.title" as const,
      descKey: "about.highlights.modernDesign.desc" as const,
    },
    {
      icon: Sparkles,
      titleKey: "about.highlights.innovation.title" as const,
      descKey: "about.highlights.innovation.desc" as const,
    },
    {
      icon: Zap,
      titleKey: "about.highlights.performance.title" as const,
      descKey: "about.highlights.performance.desc" as const,
    },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-30" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-block mb-4">
              <span className="text-primary text-sm uppercase tracking-widest font-orbitron">
                {t("about.kicker")}
              </span>
            </div>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 neon-text font-orbitron"
            >
              {t("about.title")}
              <span className="text-accent">{t("about.titleAccent")}</span>
            </h2>
          </div>

          {/* Content Grid */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            {/* Text Content */}
            <div className="space-y-6 animate-fade-in">
              <div className="border-l-2 border-primary pl-6">
                <p className="text-lg text-foreground leading-relaxed mb-4">
                  {t("about.p1")}
                  <span className="text-primary font-semibold">{t("about.p1a")}</span>
                  {t("about.p1b")}
                  <span className="text-accent font-semibold">{t("about.p1c")}</span>
                  {t("about.p1d")}
                  <span className="text-cyber-purple font-semibold">{t("about.p1e")}</span>
                  {t("about.p1f")}
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {t("about.p2")}
                </p>
              </div>

              <div className="flex flex-wrap gap-3 pt-4">
                <span className="px-4 py-2 bg-secondary border border-primary/30 text-primary text-sm font-medium font-orbitron">
                  REACT
                </span>
                <span className="px-4 py-2 bg-secondary border border-accent/30 text-accent text-sm font-medium font-orbitron">
                  TYPESCRIPT
                </span>
                <span className="px-4 py-2 bg-secondary border border-cyber-purple/30 text-cyber-purple text-sm font-medium font-orbitron">
                  TAILWIND
                </span>
                <span className="px-4 py-2 bg-secondary border border-neon-orange/30 text-neon-orange text-sm font-medium font-orbitron">
                  MONGODB
                </span>
                <span className="px-4 py-2 bg-secondary border border-destructive/30 text-destructive text-sm font-medium font-orbitron">
                  NODEJS
                </span>
                <span className="px-4 py-2 bg-secondary border border-green-400/30 text-green-400 text-sm font-medium font-orbitron">
                  EXPRESS
                </span>
                <span className="px-4 py-2 bg-secondary border border-pink-400/30 text-pink-400 text-sm font-medium font-orbitron">
                  FIGMA
                </span>
              </div>
            </div>

            {/* Visual Element */}
            <div className="relative animate-slide-in-right">
              <div className="aspect-square bg-gradient-to-br from-primary/20 via-cyber-purple/20 to-accent/20 rounded-sm cyber-border p-8 relative overflow-hidden">
                <div className="absolute inset-0 scanlines" />
                <div className="relative z-10 h-full flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-32 h-32 mx-auto border-4 border-primary rounded-full flex items-center justify-center cyber-border animate-pulse-glow">
                      <Code2 className="w-16 h-16 text-primary" />
                    </div>
                    <p className="text-2xl font-bold text-primary font-orbitron">
                      {t("about.years")}
                    </p>
                    <p className="text-muted-foreground uppercase text-sm tracking-wider">
                      {t("about.experience")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Highlights Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((item, index) => (
              <div 
                key={index}
                className="bg-card border border-primary/20 p-6 hover:border-primary transition-all duration-300 group hover:shadow-[0_0_30px_rgba(0,212,255,0.3)] animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <item.icon className="w-10 h-10 text-primary mb-4 group-hover:animate-pulse-glow" />
                <h3 
                  className="text-lg font-bold mb-2 text-foreground font-orbitron"
                >
                  {t(item.titleKey)}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t(item.descKey)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
