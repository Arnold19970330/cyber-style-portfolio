import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Github, Linkedin, Mail, Twitter, Globe } from "lucide-react";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent successfully!", {
      description: "I'll get back to you as soon as possible."
    });
    setFormData({ name: "", email: "", message: "" });
  };

  const socialLinks = [
    { icon: Github, label: "GitHub", href: "https://github.com/Arnold19970330?tab=repositories", color: "primary" },
    { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/arnold-galaczi-63793a225/", color: "accent" },
    { icon: Twitter, label: "Twitter", href: "https://x.com/tinkodev", color: "cyber-purple" },
    { icon: Mail, label: "Email", href: "mailto:tinkodev@gmail.com.com", color: "primary" }
  ];

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-background/50">
      <div className="absolute inset-0 cyber-grid opacity-20" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-block mb-4">
              <span className="text-primary text-sm uppercase tracking-widest" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                // Get In Touch
              </span>
            </div>
            <h2 
              className="text-4xl md:text-6xl font-bold mb-6 neon-text"
              style={{ fontFamily: 'Orbitron, sans-serif' }}
            >
              LET'S <span className="text-accent">CONNECT</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have a project in mind or just want to chat? Drop me a message and I'll get back to you shortly.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="animate-fade-in">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label 
                    htmlFor="name" 
                    className="block text-sm font-medium text-foreground mb-2 uppercase tracking-wider"
                    style={{ fontFamily: 'Orbitron, sans-serif' }}
                  >
                    Name
                  </label>
                  <Input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-card border-primary/20 focus:border-primary text-foreground"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label 
                    htmlFor="email" 
                    className="block text-sm font-medium text-foreground mb-2 uppercase tracking-wider"
                    style={{ fontFamily: 'Orbitron, sans-serif' }}
                  >
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-card border-primary/20 focus:border-primary text-foreground"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label 
                    htmlFor="message" 
                    className="block text-sm font-medium text-foreground mb-2 uppercase tracking-wider"
                    style={{ fontFamily: 'Orbitron, sans-serif' }}
                  >
                    Message
                  </label>
                  <Textarea
                    id="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="bg-card border-primary/20 focus:border-primary text-foreground resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <Button 
                  type="submit"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold py-6 text-lg cyber-border animate-pulse-glow"
                  style={{ fontFamily: 'Orbitron, sans-serif' }}
                >
                  SEND MESSAGE
                </Button>
              </form>
            </div>

            {/* Contact Info & Social */}
            <div className="space-y-8 animate-slide-in-right">
              {/* Info Box */}
              <div className="bg-card border border-primary/20 p-8 cyber-border">
                <h3 
                  className="text-2xl font-bold text-foreground mb-6"
                  style={{ fontFamily: 'Orbitron, sans-serif' }}
                >
                  CONTACT INFO
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <p className="text-sm text-muted-foreground uppercase tracking-wider mb-1">Email</p>
                      <a href="mailto:tinkodev@gmail.com" className="text-foreground hover:text-primary transition-colors">
                       tinkodev@gmail.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Globe className="w-5 h-5 text-accent mt-1" />
                    <div>
                      <p className="text-sm text-muted-foreground uppercase tracking-wider mb-1">Location</p>
                      <p className="text-foreground">Gyimesfelsőlok, Romania</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-card border border-primary/20 p-8">
                <h3 
                  className="text-2xl font-bold text-foreground mb-6"
                  style={{ fontFamily: 'Orbitron, sans-serif' }}
                >
                  FOLLOW ME
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-3 p-4 bg-secondary border border-${social.color}/20 hover:border-${social.color} transition-all duration-300 group`}
                    >
                      <social.icon className={`w-5 h-5 text-${social.color}`} />
                      <span className="text-sm font-medium text-foreground group-hover:text-primary">
                        {social.label}
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Availability Status */}
              <div className="bg-gradient-to-br from-primary/10 via-cyber-purple/10 to-accent/10 border border-primary/30 p-6 cyber-border">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-3 h-3 bg-accent rounded-full animate-pulse-glow" />
                  <span 
                    className="text-lg font-bold text-foreground"
                    style={{ fontFamily: 'Orbitron, sans-serif' }}
                  >
                    AVAILABLE FOR WORK
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Currently accepting new projects and collaborations
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
