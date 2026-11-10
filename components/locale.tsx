"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { flushSync } from "react-dom";
import type { Locale, Localized } from "@/data/profile";

const STORAGE_KEY = "portfolio-locale";

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  /** Escolhe o texto no idioma ativo. */
  t: (text: Localized) => string;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

function readStoredLocale(): Locale | null {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === "pt" || stored === "en" ? stored : null;
  } catch {
    return null;
  }
}

function writeStoredLocale(locale: Locale): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    // armazenamento indisponível (modo privado): o idioma vale só nesta sessão
  }
}

type ViewTransitionDocument = Document & {
  startViewTransition?: (update: () => void) => unknown;
};

/**
 * Troca o idioma com uma dissolução (View Transitions) onde o navegador suporta.
 * Sem suporte, ou com movimento reduzido, a troca é imediata.
 */
function withViewTransition(update: () => void): void {
  const doc = document as ViewTransitionDocument;
  const reduced = document.documentElement.dataset.motion === "reduced";
  if (!doc.startViewTransition || reduced) {
    update();
    return;
  }
  doc.startViewTransition(() => flushSync(update));
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("pt");

  useEffect(() => {
    const stored = readStoredLocale();
    const fromBrowser = navigator.language.toLowerCase().startsWith("pt") ? "pt" : "en";
    setLocaleState(stored ?? fromBrowser);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale === "pt" ? "pt-BR" : "en";
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    withViewTransition(() => setLocaleState(next));
    writeStoredLocale(next);
  }, []);

  const toggleLocale = useCallback(() => {
    const next: Locale = locale === "pt" ? "en" : "pt";
    withViewTransition(() => setLocaleState(next));
    writeStoredLocale(next);
  }, [locale]);

  const value = useMemo<LocaleContextValue>(
    () => ({ locale, setLocale, toggleLocale, t: (text) => text[locale] }),
    [locale, setLocale, toggleLocale],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale(): LocaleContextValue {
  const context = useContext(LocaleContext);
  if (!context) throw new Error("useLocale deve ser usado dentro de LocaleProvider");
  return context;
}
