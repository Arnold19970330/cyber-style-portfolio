import { Code2, Palette, Database, Zap, Globe, GitBranch } from "lucide-react";
import { useI18n } from "@/i18n/context";

const Skills = () => {
  const { t } = useI18n();

  const skillCategories = [
    {
      icon: Code2,
      titleKey: "skills.categories.frontend" as const,
      skills: ["React", "TypeScript", "Next.js", "Vue.js", "Tailwind CSS", "SCSS"],
      color: "primary"
    },
    {
      icon: Palette,
      titleKey: "skills.categories.uiux" as const,
      skills: ["Figma", "Adobe XD", "Sketch", "Prototyping", "User Research", "Design Systems"],
      color: "accent"
    },
    {
      icon: Database,
      titleKey: "skills.categories.backend" as const,
      skills: ["Node.js", "PostgreSQL", "MongoDB", "GraphQL", "REST APIs", "Prisma", "Express", "PHP"],
      color: "cyber-purple"
    },
    {
      icon: Zap,
      titleKey: "skills.categories.performance" as const,
      skills: ["Vite", "Webpack", "Lighthouse", "Web Vitals", "PWA", "SEO"],
      color: "primary"
    },
    {
      icon: Globe,
      titleKey: "skills.categories.devops" as const,
      skills: ["Docker", "CI/CD", "Vercel", "GitHub Actions"],
      color: "accent"
    },
    {
      icon: GitBranch,
      titleKey: "skills.categories.version" as const,
      skills: ["Git", "GitHub", "GitLab", "Code Review", "Agile", "Scrum"],
      color: "cyber-purple"
    }
  ];

  const stats = [
    { labelKey: "skills.stats.commits" as const, value: "10K+" },
    { labelKey: "skills.stats.coffee" as const, value: "∞" },
  ];

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-30" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-block mb-4">
              <span className="text-primary text-sm uppercase tracking-widest font-orbitron">
                {t("skills.kicker")}
              </span>
            </div>
            <h2 
              className="text-4xl md:text-6xl font-bold mb-6 neon-text font-orbitron"
            >
              {t("skills.title")}
              <span className="text-accent">{t("skills.titleAccent")}</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("skills.subtitle")}
            </p>
          </div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillCategories.map((category, index) => (
              <div 
                key={index}
                className="bg-card border border-primary/20 p-8 hover:border-primary transition-all duration-300 group animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Icon and Title */}
                <div className="flex items-start gap-4 mb-6">
                  <div className={`p-3 bg-${category.color}/10 border border-${category.color}/30 group-hover:animate-pulse-glow`}>
                    <category.icon className={`w-6 h-6 text-${category.color}`} />
                  </div>
                  <h3 
                    className="text-xl font-bold text-foreground flex-1 group-hover:text-primary transition-colors font-orbitron"
                  >
                    {t(category.titleKey)}
                  </h3>
                </div>

                {/* Skills List */}
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <span 
                      key={skillIndex}
                      className="text-sm px-3 py-1.5 bg-secondary/50 border border-primary/10 text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all duration-200 cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Progress indicator */}
                <div className="mt-6 h-1 bg-secondary/30 overflow-hidden">
                  <div className={`h-full bg-${category.color} w-0 group-hover:w-full transition-all duration-1000 ease-out`} />
                </div>
              </div>
            ))}
          </div>

          {/* Stats Section */}
          <div className="flex flex-wrap justify-center gap-6 mt-16 justify-items-center">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="text-center p-6 bg-card/50 border border-primary/20 hover:border-primary transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div 
                  className="text-3xl md:text-4xl font-bold text-primary mb-2 font-orbitron"
                >
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">
                  {t(stat.labelKey)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
