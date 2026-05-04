import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useI18n } from "@/i18n/context";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

const Navigation = () => {
  const { t } = useI18n();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { labelKey: "nav.home", href: "#" },
    { labelKey: "nav.about", href: "#about" },
    { labelKey: "nav.projects", href: "#projects" },
    { labelKey: "nav.skills", href: "#skills" },
    { labelKey: "nav.contact", href: "#contact" },
  ] as const;

  const scrollToSection = useCallback((href: string) => {
    setIsMobileMenuOpen(false);
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? "bg-background/95 backdrop-blur-md border-b border-primary/20" 
            : "bg-transparent"
        }`}
        aria-label={t("navAria.main")}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20 gap-2">
            {/* Logo */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#");
              }}
              className="text-sm sm:text-base md:text-xl lg:text-2xl font-bold neon-text cursor-pointer font-orbitron whitespace-nowrap flex-shrink min-w-0"
              aria-label={t("navAria.logo")}
            >
              <span className="text-primary">&lt;</span>
              GALAXY
              <span className="text-accent">_</span>
              INFORMATICS
              <span className="text-primary">/&gt;</span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8 flex-shrink-0">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href);
                  }}
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative group font-orbitron"
                  aria-label={t("navAria.navigate", {
                    section: t(item.labelKey),
                  })}
                >
                  {t(item.labelKey)}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" aria-hidden="true" />
                </a>
              ))}
              <LanguageSwitcher />
            </div>

            {/* Mobile right side */}
            <div className="flex md:hidden items-center gap-1.5 flex-shrink-0">
              <LanguageSwitcher />
              <Button
                variant="ghost"
                size="sm"
                className="text-primary px-2"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? t("navAria.closeMenu") : t("navAria.openMenu")}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
              >
                {isMobileMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div 
        id="mobile-menu"
        className={`fixed inset-0 z-40 bg-background/98 backdrop-blur-lg transition-transform duration-300 md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!isMobileMenuOpen}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8 px-4">
          {navItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.href);
              }}
              className="text-2xl font-bold text-foreground hover:text-primary transition-colors font-orbitron"
            >
              {t(item.labelKey)}
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navigation;
