import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Github, Linkedin, Mail, Twitter, Globe, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { getApiUrl } from "@/lib/config";

// Form validation schema
const contactFormSchema = z.object({
  name: z.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .regex(/^[a-zA-Z\s'-]+$/, "Name can only contain letters, spaces, hyphens, and apostrophes"),
  email: z.string()
    .email("Please enter a valid email address")
    .min(5, "Email must be at least 5 characters")
    .max(100, "Email must be less than 100 characters"),
  message: z.string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be less than 1000 characters"),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const Contact = () => {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    try {
      const apiUrl = getApiUrl("/contact");

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('Non-JSON response:', text);
        
        if (import.meta.env.DEV) {
          throw new Error('Backend server is not running. Please start it with: npm run dev:server');
        }
        
        throw new Error('Server returned an invalid response. Please try again later.');
      }

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error || 'Failed to send message');
      }

      toast.success("Message sent successfully!", {
        description: "I'll get back to you as soon as possible."
      });
      form.reset();
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error("Failed to send message", {
        description: error instanceof Error ? error.message : "Please try again later or contact me directly via email."
      });
    }
  };

  const socialLinks = [
    { icon: Github, label: "GitHub", href: "https://github.com/Arnold19970330?tab=repositories", color: "primary" },
    { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/arnold-galaczi-63793a225/", color: "accent" },
    { icon: Twitter, label: "Twitter", href: "https://x.com/tinkodev", color: "cyber-purple" },
    { icon: Mail, label: "Email", href: "mailto:tinkodev@gmail.com", color: "primary" }
  ];

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-background/50" aria-labelledby="contact-heading">
      <div className="absolute inset-0 cyber-grid opacity-20" aria-hidden="true" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-block mb-4">
              <span className="text-primary text-sm uppercase tracking-widest font-orbitron">
                // Get In Touch
              </span>
            </div>
            <h2 
              id="contact-heading"
              className="text-4xl md:text-6xl font-bold mb-6 neon-text font-orbitron"
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
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" noValidate>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-orbitron">
                          Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            className="bg-card border-primary/20 focus:border-primary text-foreground"
                            placeholder="Your name"
                            aria-describedby="name-error"
                            aria-invalid={!!form.formState.errors.name}
                          />
                        </FormControl>
                        <FormMessage id="name-error" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-orbitron">
                          Email
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            className="bg-card border-primary/20 focus:border-primary text-foreground"
                            placeholder="your.email@example.com"
                            aria-describedby="email-error"
                            aria-invalid={!!form.formState.errors.email}
                          />
                        </FormControl>
                        <FormMessage id="email-error" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-orbitron">
                          Message
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            rows={6}
                            className="bg-card border-primary/20 focus:border-primary text-foreground resize-none"
                            placeholder="Tell me about your project..."
                            aria-describedby="message-error"
                            aria-invalid={!!form.formState.errors.message}
                          />
                        </FormControl>
                        <FormMessage id="message-error" />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit"
                    disabled={form.formState.isSubmitting}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold py-6 text-lg cyber-border animate-pulse-glow disabled:opacity-50 disabled:cursor-not-allowed font-orbitron"
                    aria-label={form.formState.isSubmitting ? "Sending message" : "Send message"}
                  >
                    {form.formState.isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                        SENDING...
                      </>
                    ) : (
                      "SEND MESSAGE"
                    )}
                  </Button>
                </form>
              </Form>
            </div>

            {/* Contact Info & Social */}
            <div className="space-y-8 animate-slide-in-right">
              {/* Info Box */}
              <div className="bg-card border border-primary/20 p-8 cyber-border">
                <h3 
                  className="text-2xl font-bold text-foreground mb-6 font-orbitron"
                >
                  CONTACT INFO
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-primary mt-1" aria-hidden="true" />
                    <div>
                      <p className="text-sm text-muted-foreground uppercase tracking-wider mb-1">Email</p>
                      <a 
                        href="mailto:tinkodev@gmail.com" 
                        className="text-foreground hover:text-primary transition-colors"
                        aria-label="Send email to tinkodev@gmail.com"
                      >
                       tinkodev@gmail.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Globe className="w-5 h-5 text-accent mt-1" aria-hidden="true" />
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
                  className="text-2xl font-bold text-foreground mb-6 font-orbitron"
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
                      aria-label={`Visit my ${social.label} profile`}
                    >
                      <social.icon className={`w-5 h-5 text-${social.color}`} aria-hidden="true" />
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
                  <div className="w-3 h-3 bg-accent rounded-full animate-pulse-glow" aria-hidden="true" />
                  <span 
                    className="text-lg font-bold text-foreground font-orbitron"
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
