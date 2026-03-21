import { Github, Linkedin, X, Heart } from "lucide-react";
import { useI18n } from "@/i18n/context";

const Footer = () => {
  const { t } = useI18n();
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: "#about", labelKey: "footer.about" as const },
    { href: "#projects", labelKey: "footer.projects" as const },
    { href: "#skills", labelKey: "footer.skills" as const },
    { href: "#contact", labelKey: "footer.contact" as const },
  ];

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
                  GALAXY
                <span className="text-accent">_</span>
                INFORMATICS
                <span className="text-primary">/&gt;</span>
              </h3>
              <p className="text-sm text-muted-foreground">
                {t("footer.tagline")}
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 
                className="text-lg font-bold mb-4 text-foreground font-orbitron"
              >
                {t("footer.quick")}
              </h4>
              <ul className="space-y-2">
                {quickLinks.map((item, index) => (
                  <li key={index}>
                    <a 
                      href={item.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {t(item.labelKey)}
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
                {t("footer.connect")}
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
                {t("footer.rights", { year: String(currentYear) })}
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground flex items-center gap-2 flex-wrap justify-center">
                {t("footer.made")} <Heart className="w-4 h-4 text-primary shrink-0" aria-hidden="true" /> {t("footer.stack")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
