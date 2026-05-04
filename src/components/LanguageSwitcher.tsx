import { cn } from "@/lib/utils";
import { useI18n, type Locale } from "@/i18n/context";

const options: { code: Locale; label: string }[] = [
  { code: "hu", label: "HU" },
  { code: "en", label: "EN" },
];

export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale, t } = useI18n();

  return (
    <div
      className={cn(
        "flex rounded-sm border border-primary/30 overflow-hidden bg-background/40 font-orbitron",
        className,
      )}
      role="group"
      aria-label={t("lang.switch")}
    >
      {options.map(({ code, label }) => (
        <button
          key={code}
          type="button"
          onClick={() => setLocale(code)}
          className={cn(
            "px-2 sm:px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors min-w-[2.25rem] sm:min-w-[2.75rem]",
            locale === code
              ? "bg-primary/20 text-primary border-b-2 border-primary shadow-[0_0_12px_rgba(0,212,255,0.25)]"
              : "text-muted-foreground hover:text-foreground hover:bg-secondary/80",
          )}
          aria-pressed={locale === code}
          aria-label={code === "hu" ? t("lang.hu") : t("lang.en")}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
