import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

const Projects = () => {
  const projects = [
    {
      title: "NEURAL DASHBOARD",
      category: "WEB APP",
      description: "AI-powered analytics platform with real-time data visualization and predictive insights.",
      tech: ["React", "TypeScript", "D3.js", "TensorFlow"],
      color: "primary",
    },
    {
      title: "CRYPTO TRACKER",
      category: "MOBILE APP",
      description: "Real-time cryptocurrency portfolio manager with advanced trading algorithms.",
      tech: ["React Native", "Node.js", "WebSocket", "Redux"],
      color: "accent",
    },
    {
      title: "DESIGN SYSTEM",
      category: "UI/UX",
      description: "Comprehensive component library for modern web applications with dark mode support.",
      tech: ["Figma", "Storybook", "Tailwind", "React"],
      color: "cyber-purple",
    },
    {
      title: "METAVERSE HUB",
      category: "3D WEB",
      description: "Interactive 3D virtual space for digital exhibitions and collaborative workspaces.",
      tech: ["Three.js", "WebGL", "Next.js", "GSAP"],
      color: "primary",
    },
    {
      title: "AI CHATBOT",
      category: "MACHINE LEARNING",
      description: "Intelligent conversational interface powered by natural language processing.",
      tech: ["Python", "OpenAI", "FastAPI", "React"],
      color: "accent",
    },
    {
      title: "E-COMMERCE PRO",
      category: "FULL STACK",
      description: "Modern e-commerce platform with seamless checkout and inventory management.",
      tech: ["Next.js", "Stripe", "PostgreSQL", "Prisma"],
      color: "cyber-purple",
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
              <span className="text-primary text-sm uppercase tracking-widest" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                // My Work
              </span>
            </div>
            <h2 
              className="text-4xl md:text-6xl font-bold mb-6 neon-text"
              style={{ fontFamily: 'Orbitron, sans-serif' }}
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
                <div className={`h-1 bg-${project.color} w-0 group-hover:w-full transition-all duration-500`} />
                
                {/* Content */}
                <div className="p-6 relative">
                  <div className="scanlines absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <span 
                        className={`text-xs px-3 py-1 border border-${project.color}/30 text-${project.color} uppercase tracking-wider`}
                        style={{ fontFamily: 'Orbitron, sans-serif' }}
                      >
                        {project.category}
                      </span>
                      <div className="flex gap-2">
                        <Button 
                          size="icon" 
                          variant="ghost"
                          className="w-8 h-8 text-muted-foreground hover:text-primary"
                        >
                          <Github className="w-4 h-4" />
                        </Button>
                        <Button 
                          size="icon" 
                          variant="ghost"
                          className="w-8 h-8 text-muted-foreground hover:text-primary"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <h3 
                      className="text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors"
                      style={{ fontFamily: 'Orbitron, sans-serif' }}
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
                <div className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-${project.color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
