import { useMemo } from "react";
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
import { useI18n } from "@/i18n/context";

type ContactFormValues = {
  name: string;
  email: string;
  message: string;
};

/** Remount on locale change so zod resolver messages match the active language. */
function ContactFormFields() {
  const { t } = useI18n();

  const contactFormSchema = useMemo(
    () =>
      z.object({
        name: z
          .string()
          .min(2, t("contact.validation.nameMin"))
          .max(50, t("contact.validation.nameMax"))
          .regex(/^[a-zA-ZáéíóöőúüűÁÉÍÓÖŐÚÜŰ\s'-]+$/i, t("contact.validation.namePattern")),
        email: z
          .string()
          .email(t("contact.validation.email"))
          .min(5, t("contact.validation.emailMin"))
          .max(100, t("contact.validation.emailMax")),
        message: z
          .string()
          .min(10, t("contact.validation.messageMin"))
          .max(1000, t("contact.validation.messageMax")),
      }),
    [t],
  );

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
          throw new Error(t("contact.errDev"));
        }
        
        throw new Error(t("contact.errInvalid"));
      }

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error || t("contact.errSend"));
      }

      toast.success(t("contact.toastOk"), {
        description: t("contact.toastOkDesc"),
      });
      form.reset();
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error(t("contact.toastErr"), {
        description:
          error instanceof Error ? error.message : t("contact.toastErrDesc"),
      });
    }
  };

  return (
    <div className="animate-fade-in">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" noValidate>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-orbitron">
                  {t("contact.name")}
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="bg-card border-primary/20 focus:border-primary text-foreground"
                    placeholder={t("contact.namePh")}
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
                  {t("contact.email")}
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    className="bg-card border-primary/20 focus:border-primary text-foreground"
                    placeholder={t("contact.emailPh")}
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
                  {t("contact.message")}
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    rows={6}
                    className="bg-card border-primary/20 focus:border-primary text-foreground resize-none"
                    placeholder={t("contact.messagePh")}
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
            aria-label={form.formState.isSubmitting ? t("contact.ariaSending") : t("contact.ariaSend")}
          >
            {form.formState.isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                {t("contact.sending")}
              </>
            ) : (
              t("contact.send")
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}

const Contact = () => {
  const { t, locale } = useI18n();

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
                {t("contact.kicker")}
              </span>
            </div>
            <h2 
              id="contact-heading"
              className="text-4xl md:text-6xl font-bold mb-6 neon-text font-orbitron"
            >
              {t("contact.title")}
              <span className="text-accent">{t("contact.titleAccent")}</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("contact.subtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <ContactFormFields key={locale} />

            {/* Contact Info & Social */}
            <div className="space-y-8 animate-slide-in-right">
              {/* Info Box */}
              <div className="bg-card border border-primary/20 p-8 cyber-border">
                <h3 
                  className="text-2xl font-bold text-foreground mb-6 font-orbitron"
                >
                  {t("contact.infoTitle")}
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-primary mt-1" aria-hidden="true" />
                    <div>
                      <p className="text-sm text-muted-foreground uppercase tracking-wider mb-1">{t("contact.email")}</p>
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
                      <p className="text-sm text-muted-foreground uppercase tracking-wider mb-1">{t("contact.locationLabel")}</p>
                      <p className="text-foreground">{t("contact.location")}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-card border border-primary/20 p-8">
                <h3 
                  className="text-2xl font-bold text-foreground mb-6 font-orbitron"
                >
                  {t("contact.followTitle")}
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
                    {t("contact.available")}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {t("contact.availableDesc")}
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
