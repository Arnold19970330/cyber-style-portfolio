import { memo, useMemo } from "react";
import { Code2, ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n/context";
import aiResearchImg from "@/assets/projects/ai-research.webp";
import aiUsageImg from "@/assets/projects/ai-usage.webp";
import quizGeneratorImg from "@/assets/projects/quiz-generator.webp";
import meskaImg from "@/assets/projects/meska.webp";
import movieImg from "@/assets/projects/movie.webp";
import weatherImg from "@/assets/projects/weather.webp";

// A Transylvanian Wonders ideiglenesen le van véve; a fordítások megmaradtak, így
// visszatenni csak egy bejegyzés ebbe a listába.
const PROJECT_DEFS = [
  {
    id: "aiResearch" as const,
    color: "primary",
    image: aiResearchImg,
    githubUrl: null,
    liveUrl: "https://airesearch.esas.hu/",
    tech: ["React", "TypeScript", "Tailwind CSS", "Vite"],
  },
  {
    id: "aiHasznalat" as const,
    color: "primary",
    image: aiUsageImg,
    githubUrl: null,
    liveUrl: "https://blog-system-nodejs-9zg7hxfdv-arnold19970330s-projects.vercel.app/",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Nodejs", "Mongodb", "Resend", "Railway", "Vercel"],
  },
  {
    id: "quizGenerator" as const,
    color: "accent",
    image: quizGeneratorImg,
    githubUrl: null,
    liveUrl: "https://www.kvizgenerator.hu/",
    tech: ["Node.js", "Express", "TypeScript", "React", "MongoDB", "Anthropic"],
  },
  {
    id: "weather" as const,
    color: "primary",
    image: weatherImg,
    githubUrl: "https://github.com/Arnold19970330/react-weather-app",
    liveUrl: "https://react-weather-l5wjvkt52-arnold19970330s-projects.vercel.app/",
    tech: ["React", "TypeScript", "OpenWeatherMap API", "Tailwind CSS", "Vite"],
  },
  {
    id: "todo" as const,
    color: "accent",
    image: null,
    githubUrl: "https://github.com/Arnold19970330/react-todo-app",
    liveUrl: null,
    tech: ["React", "TypeScript", "Tailwind CSS", "Vite"],
  },
  {
    id: "movie" as const,
    color: "cyber-purple",
    image: movieImg,
    githubUrl: "https://github.com/Arnold19970330/react-movie-app",
    liveUrl: "https://react-movie-app-one-gilt.vercel.app/",
    tech: ["React", "TypeScript", "Tailwind CSS", "Vite"],
  },
  {
    id: "harryPotter" as const,
    color: "primary",
    image: null,
    githubUrl: "https://github.com/Arnold19970330/Harry-potter-quiz",
    liveUrl: null,
    tech: ["React", "TypeScript", "Node.js", "Express"],
  },
  {
    id: "meska" as const,
    color: "accent",
    image: meskaImg,
    githubUrl: null,
    liveUrl: "https://www.meska.hu/",
    tech: ["PHP", "SQL", "React", "Tailwind CSS", "HTML", "CSS"],
  },
];

const getColorClasses = (color: string) => {
  switch (color) {
    case "accent":
      return {
        bg: "bg-accent",
        border: "border-accent/30",
        text: "text-accent",
        via: "via-accent",
        from: "from-accent/25",
      };
    case "cyber-purple":
      return {
        bg: "bg-cyber-purple",
        border: "border-cyber-purple/30",
        text: "text-cyber-purple",
        via: "via-cyber-purple",
        from: "from-cyber-purple/25",
      };
    default:
      return {
        bg: "bg-primary",
        border: "border-primary/30",
        text: "text-primary",
        via: "via-primary",
        from: "from-primary/25",
      };
  }
};

/** Placeholder cover for projects that don't have a screenshot yet. */
const PlaceholderCover = ({ title, color }: { title: string; color: string }) => {
  const colors = getColorClasses(color);

  return (
    <div
      className={`relative w-full h-full bg-gradient-to-br ${colors.from} via-secondary to-background flex flex-col items-center justify-center gap-4 overflow-hidden`}
    >
      <div className="absolute inset-0 cyber-grid opacity-40" />
      <div className="absolute inset-0 scanlines" />
      <div
        className={`relative w-16 h-16 border-2 ${colors.border} rounded-full flex items-center justify-center bg-background/60`}
      >
        <Code2 className={`w-8 h-8 ${colors.text}`} />
      </div>
      <span className={`relative px-4 text-center text-lg font-bold tracking-wider font-orbitron ${colors.text}`}>
        {title}
      </span>
    </div>
  );
};

const Projects = memo(() => {
  const { t } = useI18n();

  const projects = useMemo(
    () =>
      PROJECT_DEFS.map((def) => ({
        id: def.id,
        title: t(`projects.items.${def.id}.title`),
        category: t(`projects.items.${def.id}.category`),
        description: t(`projects.items.${def.id}.description`),
        tech: def.tech,
        color: def.color,
        image: def.image,
        githubUrl: def.githubUrl,
        liveUrl: def.liveUrl,
      })),
    [t],
  );

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-background/50">
      <div className="absolute inset-0 cyber-grid opacity-20" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-block mb-4">
              <span className="text-primary text-sm uppercase tracking-widest font-orbitron">
                {t("projects.kicker")}
              </span>
            </div>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 neon-text font-orbitron"
            >
              {t("projects.title")}
              <span className="text-accent">{t("projects.titleAccent")}</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("projects.subtitle")}
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => {
              const colors = getColorClasses(project.color);
              const coverUrl = project.liveUrl ?? project.githubUrl;
              const cover = project.image ? (
                <img
                  src={project.image}
                  alt={t("projects.screenshotAlt", { title: project.title })}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <PlaceholderCover title={project.title} color={project.color} />
              );

              return (
                <article
                  key={project.id}
                  className="group relative flex flex-col bg-card border border-primary/20 overflow-hidden hover:border-primary transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Cover image */}
                  <div className="relative aspect-[16/10] overflow-hidden border-b border-primary/20">
                    {coverUrl ? (
                      <a
                        href={coverUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        tabIndex={-1}
                        aria-hidden="true"
                        className="block w-full h-full"
                      >
                        {cover}
                      </a>
                    ) : (
                      cover
                    )}
                    <span
                      className={`absolute top-3 left-3 text-xs px-3 py-1 border ${colors.border} ${colors.text} bg-background/85 backdrop-blur-sm uppercase tracking-wider font-orbitron`}
                    >
                      {project.category}
                    </span>
                  </div>

                  {/* Top accent line */}
                  <div className={`h-1 ${colors.bg} w-0 group-hover:w-full transition-all duration-500`} />

                  {/* Content */}
                  <div className="flex flex-col flex-1 p-6">
                    <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors font-orbitron">
                      {project.title}
                    </h3>

                    <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="text-xs px-2 py-1 bg-secondary text-muted-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex flex-wrap gap-3 mt-auto">
                      {project.liveUrl && (
                        <Button
                          asChild
                          size="sm"
                          className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
                        >
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4" aria-hidden="true" />
                            {t("projects.live")}
                          </a>
                        </Button>
                      )}
                      {project.githubUrl && (
                        <Button
                          asChild
                          size="sm"
                          variant="outline"
                          className="border-primary/40 text-foreground hover:border-primary hover:text-primary"
                        >
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="w-4 h-4" aria-hidden="true" />
                            {t("projects.code")}
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Bottom glow effect */}
                  <div className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent ${colors.via} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
});

Projects.displayName = "Projects";

export default Projects;
