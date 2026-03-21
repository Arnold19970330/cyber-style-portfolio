import { memo } from "react";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

const Projects = memo(() => {
  const getColorClasses = (color: string) => {
    switch (color) {
      case "primary":
        return {
          bg: "bg-primary",
          border: "border-primary/30",
          text: "text-primary",
          via: "via-primary",
        };
      case "accent":
        return {
          bg: "bg-accent",
          border: "border-accent/30",
          text: "text-accent",
          via: "via-accent",
        };
      case "cyber-purple":
        return {
          bg: "bg-cyber-purple",
          border: "border-cyber-purple/30",
          text: "text-cyber-purple",
          via: "via-cyber-purple",
        };
      default:
        return {
          bg: "bg-primary",
          border: "border-primary/30",
          text: "text-primary",
          via: "via-primary",
        };
    }
  };

  const projects = [
    {
      title: "WEATHER APP",
      category: "WEB APP",
      description: "React weather app that displays current weather data for a given location using the OpenWeatherMap API.",
      tech: ["React", "TypeScript", "OpenWeatherMap API", "Tailwind CSS", "Vite"],
      color: "primary",
      githubUrl: "https://github.com/Arnold19970330/react-weather-app",
      liveUrl: null,
    },
    {
      title: "TODO APP",
      category: "WEB APP",
      description: "Todo app that allows you to add, edit, and delete tasks.",
      tech: ["React", "TypeScript", "Tailwind CSS", "Vite"],
      color: "accent",
      githubUrl: "https://github.com/Arnold19970330/react-todo-app",
      liveUrl: null,
    },
    {
      title: "MOVIE APP",
      category: "WEB APP",
      description: "React movie application for browsing and discovering movies with search functionality and detailed information.",
      tech: ["React", "TypeScript", "Tailwind CSS", "Vite"],
      color: "cyber-purple",
      githubUrl: "https://github.com/Arnold19970330/react-movie-app",
      liveUrl: null,
    },
    {
      title: "HARRY POTTER QUIZ",
      category: "FULL STACK",
      description: "Interactive Harry Potter themed quiz application with client-server architecture for testing your wizarding knowledge.",
      tech: ["React", "TypeScript", "Node.js", "Express"],
      color: "primary",
      githubUrl: "https://github.com/Arnold19970330/Harry-potter-quiz",
      liveUrl: null,
    },
    {
      title: "MESKA",
      category: "FULL STACK",
      description: "Full stack web application built with PHP and SQL backend, featuring custom UI components, React frontend, and comprehensive backend development.",
      tech: ["PHP", "SQL", "React", "Tailwind CSS", "HTML", "CSS"],
      color: "accent",
      githubUrl: null,
      liveUrl: "https://www.meska.hu/",
    },
    {
      title: "TRANSYLVANIAN WONDERS",
      category: "FULL STACK",
      description: "Tour booking web application for Transylvania with activity reservations, city guides, and booking management system.",
      tech: ["Laravel", "Alpine.js", "PHP", "SQLite", "HTML"],
      color: "cyber-purple",
      githubUrl: null,
      liveUrl: "https://transylvanianwonders.com/",
    },
    {
      title: "AI & PSYCHOLOGY RESEARCH",
      category: "RESEARCH",
      description:
        "ESAS research portal for a psychology study on AI-assisted support: consent flow, multi-part questionnaire, secure handling, and participant-facing information.",
      tech: ["React", "TypeScript", "Tailwind CSS", "Vite"],
      color: "primary",
      githubUrl: null,
      liveUrl: "https://airesearch.esas.hu/",
    },
  ];

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-background/50">
      <div className="absolute inset-0 cyber-grid opacity-20" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-block mb-4">
              <span className="text-primary text-sm uppercase tracking-widest font-orbitron">
                // My Work
              </span>
            </div>
            <h2 
              className="text-4xl md:text-6xl font-bold mb-6 neon-text font-orbitron"
            >
              FEATURED <span className="text-accent">PROJECTS</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore a selection of my recent work, spanning web development, UI/UX design, and cutting-edge technologies.
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div 
                key={index}
                className="group relative bg-card border border-primary/20 overflow-hidden hover:border-primary transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Top accent line */}
                <div className={`h-1 ${getColorClasses(project.color).bg} w-0 group-hover:w-full transition-all duration-500`} />
                
                {/* Content */}
                <div className="p-6 relative">
                  <div className="scanlines absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <span 
                        className={`text-xs px-3 py-1 border ${getColorClasses(project.color).border} ${getColorClasses(project.color).text} uppercase tracking-wider font-orbitron`}
                      >
                        {project.category}
                      </span>
                      <div className="flex gap-2">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Button 
                              size="icon" 
                              variant="ghost"
                              className="w-8 h-8 text-muted-foreground hover:text-primary"
                            >
                              <Github className="w-4 h-4" />
                            </Button>
                          </a>
                        )}
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Button 
                              size="icon" 
                              variant="ghost"
                              className="w-8 h-8 text-muted-foreground hover:text-primary"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </Button>
                          </a>
                        )}
                      </div>
                    </div>

                    <h3 
                      className="text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors font-orbitron"
                    >
                      {project.title}
                    </h3>

                    <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, techIndex) => (
                        <span 
                          key={techIndex}
                          className="text-xs px-2 py-1 bg-secondary text-muted-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom glow effect */}
                <div className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent ${getColorClasses(project.color).via} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

Projects.displayName = "Projects";

export default Projects;
