import { Github, Linkedin, X, Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-12 border-t border-primary/20 overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-10" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div>
              <h3 
                className="text-2xl font-bold mb-4 neon-text font-orbitron"
              >
                <span className="text-primary">&lt;</span>
                CYBER
                <span className="text-accent">_</span>
                DEV
                <span className="text-primary">/&gt;</span>
              </h3>
              <p className="text-sm text-muted-foreground">
                Crafting digital experiences at the intersection of design and technology.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 
                className="text-lg font-bold mb-4 text-foreground font-orbitron"
              >
                QUICK LINKS
              </h4>
              <ul className="space-y-2">
                {['About', 'Projects', 'Skills', 'Contact'].map((item, index) => (
                  <li key={index}>
                    <a 
                      href={`#${item.toLowerCase()}`}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social */}
            <div>
              <h4 
                className="text-lg font-bold mb-4 text-foreground font-orbitron"
              >
                CONNECT
              </h4>
              <div className="flex gap-4">
                {[
                  { icon: Github, href: "https://github.com/Arnold19970330?tab=repositories" },
                  { icon: Linkedin, href: "https://www.linkedin.com/in/arnold-galaczi-63793a225/" },
                  { icon: X, href: "https://x.com/tinkodev" }
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center border border-primary/20 hover:border-primary text-muted-foreground hover:text-primary transition-all duration-300"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-primary/20">
            <div className="flex flex-col items-center justify-center gap-2 text-center">
              <p className="text-xs sm:text-sm text-muted-foreground">
                © {currentYear} GALAXY_INFORMATICS.
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground flex items-center gap-2">
                Made with <Heart className="w-4 h-4 text-primary" aria-hidden="true" /> using React & TypeScript
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
