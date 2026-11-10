"use client";

import { useEffect, useState } from "react";
import { profile } from "@/data/profile";
import { sectionLinks, strings } from "@/data/strings";
import { Languages, Search } from "./icons";
import { useLocale } from "./locale";

const ACTIVE_LINE_RATIO = 0.35;
const SCROLLED_AFTER_PX = 50;

interface NavProps {
  onOpenPalette: () => void;
}

export function Nav({ onOpenPalette }: NavProps) {
  const { locale, t, toggleLocale } = useLocale();
  const [active, setActive] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > SCROLLED_AFTER_PX);

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

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  const pill =
    "flex items-center gap-2 whitespace-nowrap rounded-full border border-line bg-white/5 px-4 py-2 text-sm transition-colors hover:bg-white hover:text-bg";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        scrolled
          ? "border-b border-line bg-bg/40 py-3 backdrop-blur-xl"
          : "bg-gradient-to-b from-bg/60 to-transparent py-5"
      }`}
    >
      <nav
        aria-label={t(strings.mainNav)}
        className="mx-auto flex w-[90%] max-w-7xl items-center justify-between"
      >
        <a href="#top" className="flex flex-col" onClick={() => setMenuOpen(false)}>
          <span className="font-accent text-2xl leading-tight text-fg">{profile.name}</span>
          <span className="text-xs tracking-[0.2em] text-muted uppercase">
            {t(profile.role)}
          </span>
        </a>

        <ul className="hidden items-center gap-6 md:flex lg:gap-8">
          {sectionLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                aria-current={active === link.id ? "true" : undefined}
                className={`relative py-1 text-[0.95rem] transition-colors after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 hover:text-primary hover:after:w-full ${
                  active === link.id ? "text-primary after:w-full" : "text-fg after:w-0"
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
            className={`${pill} hidden lg:flex`}
          >
            <Search className="size-4" />
            <kbd className="font-mono text-xs">Ctrl K</kbd>
          </button>
          <button
            type="button"
            onClick={toggleLocale}
            aria-label={t(strings.switchLanguage)}
            className={`${pill} font-mono text-xs`}
          >
            <Languages className="size-4" />
            {locale.toUpperCase()}
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? t(strings.closeMenu) : t(strings.openMenu)}
            className="relative z-50 flex size-10 flex-col items-center justify-center gap-1.5 md:hidden"
          >
            <span
              className={`block h-0.5 w-7 bg-fg transition-transform duration-300 ${
                menuOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-7 bg-fg transition-opacity duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-7 bg-fg transition-transform duration-300 ${
                menuOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        inert={!menuOpen}
        className={`fixed inset-0 z-40 flex items-center justify-center bg-bg/95 backdrop-blur-xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <ul className="flex flex-col items-center gap-8 text-center">
          {sectionLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                onClick={() => setMenuOpen(false)}
                className={`text-2xl transition-colors hover:text-primary ${
                  active === link.id ? "text-primary" : "text-fg"
                }`}
              >
                {t(link.label)}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
