import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { en, type Messages } from "./locales/en";
import { hu } from "./locales/hu";

export type Locale = "en" | "hu";

const STORAGE_KEY = "cyber-portfolio-locale";

const locales: Record<Locale, Messages> = { en, hu };

function getNested(obj: unknown, path: string): unknown {
  const parts = path.split(".");
  let cur: unknown = obj;
  for (const p of parts) {
    if (cur && typeof cur === "object" && p in cur) {
      cur = (cur as Record<string, unknown>)[p];
    } else {
      return undefined;
    }
  }
  return cur;
}

function interpolate(template: string, vars?: Record<string, string>): string {
  if (!vars) return template;
  return template.replace(/\{\{(\w+)\}\}/g, (_, key: string) =>
    vars[key] !== undefined ? vars[key] : `{{${key}}}`,
  );
}

function getInitialLocale(): Locale {
  if (typeof window === "undefined") return "hu";
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "hu") return stored;
  } catch {
    /* ignore */
  }
  return typeof navigator !== "undefined" &&
    navigator.language.toLowerCase().startsWith("hu")
    ? "hu"
    : "en";
}

type I18nContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (path: string, vars?: Record<string, string>) => string;
  messages: Messages;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => getInitialLocale());

  const messages = locales[locale];

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const t = useCallback(
    (path: string, vars?: Record<string, string>) => {
      const raw = getNested(messages, path);
      if (typeof raw !== "string") {
        if (import.meta.env.DEV) {
          console.warn(`[i18n] Missing string: ${path}`);
        }
        return path;
      }
      return interpolate(raw, vars);
    },
    [messages],
  );

  const value = useMemo(
    () => ({ locale, setLocale, t, messages }),
    [locale, setLocale, t, messages],
  );

  useEffect(() => {
    document.documentElement.lang = locale === "hu" ? "hu" : "en";
    const title = getNested(messages, "meta.title");
    if (typeof title === "string") {
      document.title = title;
    }
    const desc = getNested(messages, "meta.description");
    if (typeof desc === "string") {
      const meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute("content", desc);
    }
  }, [locale, messages]);

  return (
    <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
  );
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return ctx;
}
