"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { Locale, t as translate, tArray as translateArray, getDirection, defaultLocale } from "@/i18n";

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  tArray: (key: string) => string[];
  dir: "ltr" | "rtl";
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

const STORAGE_KEY = "locale";
const VALID_LOCALES: ReadonlySet<string> = new Set<Locale>(["en", "ar"]);

function isValidLocale(value: unknown): value is Locale {
  return typeof value === "string" && VALID_LOCALES.has(value);
}

function readStoredLocale(): Locale {
  if (typeof window === "undefined") return defaultLocale;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return isValidLocale(stored) ? stored : defaultLocale;
  } catch {
    return defaultLocale;
  }
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(readStoredLocale);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem(STORAGE_KEY, newLocale);
  }, []);

  const t = useCallback(
    (key: string) => translate(locale, key),
    [locale]
  );

  const tArray = useCallback(
    (key: string) => translateArray(locale, key),
    [locale]
  );

  const dir = getDirection(locale);

  return (
    <LocaleContext value={{ locale, setLocale, t, tArray, dir }}>
      {children}
    </LocaleContext>
  );
}

export function useLocale(): LocaleContextValue {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
}
