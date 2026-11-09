"use client";

import { useEffect, useState } from "react";
import { profile } from "@/data/profile";
import { sectionLinks, strings } from "@/data/strings";
import { Languages, Search } from "./icons";
import { useLocale } from "./locale";

const ACTIVE_LINE_RATIO = 0.35;

interface NavProps {
  onOpenPalette: () => void;
}

export function Nav({ onOpenPalette }: NavProps) {
  const { locale, t, toggleLocale } = useLocale();
  const [active, setActive] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);

      // seção ativa = a última cujo topo já passou da linha de leitura
      const readingLine = window.innerHeight * ACTIVE_LINE_RATIO;
      let current = "";
      for (const link of sectionLinks) {
        const node = document.getElementById(link.id);
        if (node && node.getBoundingClientRect().top <= readingLine) current = link.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        scrolled ? "border-b border-line bg-bg/70 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <nav
        aria-label="Principal"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8"
      >
        <a href="#top" className="font-mono text-sm font-medium text-fg">
          <span className="text-cyan">~/</span>
          {profile.handle}
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {sectionLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                aria-current={active === link.id ? "true" : undefined}
                className={`rounded-lg px-3 py-2 text-sm transition-colors ${
                  active === link.id ? "text-cyan" : "text-muted hover:text-fg"
                }`}
              >
                {t(link.label)}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenPalette}
            aria-label={t(strings.openPalette)}
            className="hidden items-center gap-2 rounded-lg border border-line bg-surface/60 px-3 py-1.5 text-sm text-muted transition-colors hover:border-cyan/40 hover:text-fg sm:flex"
          >
            <Search className="size-4" />
            <kbd className="font-mono text-xs">Ctrl K</kbd>
          </button>
          <button
            type="button"
            onClick={toggleLocale}
            aria-label={t(strings.switchLanguage)}
            className="flex items-center gap-1.5 rounded-lg border border-line bg-surface/60 px-3 py-1.5 font-mono text-xs text-muted transition-colors hover:border-cyan/40 hover:text-fg"
          >
            <Languages className="size-4" />
            {locale.toUpperCase()}
          </button>
        </div>
      </nav>

      <ul className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-3 pb-2 md:hidden">
        {sectionLinks.map((link) => (
          <li key={link.id}>
            <a
              href={`#${link.id}`}
              aria-current={active === link.id ? "true" : undefined}
              className={`block whitespace-nowrap rounded-lg px-3 py-1.5 text-sm transition-colors ${
                active === link.id ? "text-cyan" : "text-muted hover:text-fg"
              }`}
            >
              {t(link.label)}
            </a>
          </li>
        ))}
      </ul>
    </header>
  );
}
