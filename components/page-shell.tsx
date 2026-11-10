"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { Background } from "./background";
import { Footer } from "./footer";
import { Languages } from "./icons";
import { LocaleProvider, useLocale } from "./locale";
import { MotionPrefProvider } from "./motion-pref";
import { profile } from "@/data/profile";

function Bar() {
  const { locale, toggleLocale } = useLocale();
  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <div className="flex w-full max-w-3xl items-center justify-between rounded-full border border-white/15 bg-glass p-1.5 shadow-[0_8px_32px_rgb(0_0_0/0.35)] backdrop-blur-xl">
        <Link
          href="/"
          aria-label={profile.name}
          className="grid size-10 place-items-center rounded-full bg-primary font-accent font-bold text-bg"
        >
          FJ
        </Link>
        <Link href="/#projects" className="px-4 text-sm text-white/80 hover:text-white">
          {locale === "pt" ? "Todos os projetos" : "All projects"}
        </Link>
        <button
          type="button"
          onClick={toggleLocale}
          aria-label={locale === "pt" ? "Mudar idioma" : "Switch language"}
          className="flex h-10 items-center gap-1.5 rounded-full px-3 font-mono text-xs text-muted hover:bg-white/10 hover:text-fg"
        >
          <Languages className="size-4" />
          {locale.toUpperCase()}
        </button>
      </div>
    </header>
  );
}

/** Moldura das páginas internas: idioma, movimento, fundo, barra e rodapé. */
export function PageShell({ children }: { children: ReactNode }) {
  return (
    <LocaleProvider>
      <MotionPrefProvider>
        <Background />
        <Bar />
        <main id="main" className="mx-auto w-[90%] max-w-5xl pt-32 pb-24">
          {children}
        </main>
        <Footer />
      </MotionPrefProvider>
    </LocaleProvider>
  );
}
