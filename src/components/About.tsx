import { Code2, Layers, Sparkles, Zap } from "lucide-react";

const About = () => {
  const highlights = [
    {
      icon: Code2,
      title: "Clean Code",
      description: "Writing maintainable, scalable solutions"
    },
    {
      icon: Layers,
      title: "Modern Design",
      description: "Creating stunning user interfaces"
    },
    {
      icon: Sparkles,
      title: "Innovation",
      description: "Pushing boundaries with new tech"
    },
    {
      icon: Zap,
      title: "Performance",
      description: "Optimized for speed and efficiency"
    }
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-30" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-block mb-4">
              <span className="text-primary text-sm uppercase tracking-widest" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                // About Me
              </span>
            </div>
            <h2 
              className="text-4xl md:text-6xl font-bold mb-6 neon-text"
              style={{ fontFamily: 'Orbitron, sans-serif' }}
            >
              FRONTEND <span className="text-accent">DEVELOPER</span>
            </h2>
          </div>

          {/* Content Grid */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            {/* Text Content */}
            <div className="space-y-6 animate-fade-in">
              <div className="border-l-2 border-primary pl-6">
                <p className="text-lg text-foreground leading-relaxed mb-4">
                  My passion is <span className="text-primary font-semibold">frontend development</span> and 
                  using <span className="text-accent font-semibold">modern technologies</span>. I create web applications 
                  that are not only beautiful, but also 
                  <span className="text-cyber-purple font-semibold"> efficient</span> and user-friendly.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  I specialize in React and TypeScript-based development, where I use the latest tools and 
                  libraries to create modern, scalable solutions. I believe that clean code and good UX 
                  go hand in hand.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 pt-4">
                <span className="px-4 py-2 bg-secondary border border-primary/30 text-primary text-sm font-medium" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  REACT
                </span>
                <span className="px-4 py-2 bg-secondary border border-accent/30 text-accent text-sm font-medium" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  TYPESCRIPT
                </span>
                <span className="px-4 py-2 bg-secondary border border-cyber-purple/30 text-cyber-purple text-sm font-medium" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  TAILWIND
                </span>
                <span className="px-4 py-2 bg-secondary border border-primary/30 text-primary text-sm font-medium" style={{ fontFamily: 'Orbitron, sans-serif' }}>
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
                    <p className="text-2xl font-bold text-primary" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                      5+ YEARS
                    </p>
                    <p className="text-muted-foreground uppercase text-sm tracking-wider">
                      Experience
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
                  className="text-lg font-bold mb-2 text-foreground"
                  style={{ fontFamily: 'Orbitron, sans-serif' }}
                >
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {item.description}
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
