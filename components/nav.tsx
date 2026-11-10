"use client";

import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { profile } from "@/data/profile";
import { sectionLinks, strings } from "@/data/strings";
import { Languages, Search, Zap, ZapOff } from "./icons";
import { useLocale } from "./locale";
import { useMotionPref } from "./motion-pref";

const ACTIVE_LINE_PERCENT = 35;
const READING_BAND_PERCENT = 1;
const MONOGRAM_LETTERS = 2;

const monogram = profile.name
  .split(" ")
  .slice(0, MONOGRAM_LETTERS)
  .map((part) => part[0])
  .join("");

/** Links da pílula: as seções, exceto contato, que vira o botão de destaque. */
const pillLinks = sectionLinks.filter((link) => link.id !== "contact");
const contactLabel = sectionLinks.find((link) => link.id === "contact")?.label;

interface NavProps {
  onOpenPalette: () => void;
}

/** Navegação N2: pílula flutuante central. No celular vira logo + idioma + menu. */
export function Nav({ onOpenPalette }: NavProps) {
  const { locale, t, toggleLocale } = useLocale();
  const { reduced: motionReduced, toggle: toggleMotion } = useMotionPref();
  const [active, setActive] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    // Faixa fina na linha de leitura: a seção que a cruza é a ativa. Sem JS por scroll.
    const bottomMargin = 100 - ACTIVE_LINE_PERCENT - READING_BAND_PERCENT;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id === "top" ? "" : entry.target.id);
        }
      },
      { rootMargin: `-${ACTIVE_LINE_PERCENT}% 0px -${bottomMargin}% 0px` },
    );
    for (const id of ["top", ...sectionLinks.map((link) => link.id)]) {
      const node = document.getElementById(id);
      if (node) observer.observe(node);
    }
    return () => observer.disconnect();
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

  const iconButton =
    "flex size-10 items-center justify-center gap-1.5 rounded-full text-sm text-muted transition-all hover:bg-white/10 hover:text-fg active:scale-90";

  return (
    <>
      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-primary"
      />

      <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
        <nav
          aria-label={t(strings.mainNav)}
          className="relative z-[60] flex items-center gap-1.5 rounded-full border border-white/15 bg-glass p-1.5 shadow-[0_8px_32px_rgb(0_0_0/0.35)] backdrop-blur-xl max-md:w-full max-md:justify-between"
        >
          <a
            href="#top"
            aria-label={`${profile.name}, ${t(strings.hero.tag)}`}
            onClick={() => setMenuOpen(false)}
            className="grid size-10 place-items-center rounded-full bg-primary font-accent text-base font-bold text-bg"
          >
            {monogram}
          </a>

          <ul className="hidden items-center gap-0.5 md:flex">
            {pillLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  aria-current={active === link.id ? "true" : undefined}
                  className={`relative block rounded-full px-4 py-2 text-sm transition-colors ${
                    active === link.id ? "text-primary" : "text-white/80 hover:text-white"
                  }`}
                >
                  {active === link.id && (
                    <motion.span
                      layoutId="nav-active"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                      className="absolute inset-0 rounded-full bg-primary/15"
                    />
                  )}
                  <span className="relative">{t(link.label)}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-0.5">
            <button
              type="button"
              onClick={onOpenPalette}
              aria-label={t(strings.openPalette)}
              className={`${iconButton} hidden lg:flex`}
            >
              <Search className="size-4" />
            </button>
            <button
              type="button"
              onClick={toggleLocale}
              aria-label={t(strings.switchLanguage)}
              className={`${iconButton} w-auto px-3 font-mono text-xs`}
            >
              <Languages className="size-4" />
              {locale.toUpperCase()}
            </button>
            <button
              type="button"
              onClick={toggleMotion}
              aria-pressed={motionReduced}
              aria-label={t(strings.motion.reduce)}
              title={t(motionReduced ? strings.motion.restore : strings.motion.reduce)}
              className={iconButton}
            >
              {motionReduced ? <ZapOff className="size-4" /> : <Zap className="size-4" />}
            </button>
          </div>

          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-0.5 hidden whitespace-nowrap rounded-full bg-white px-5 py-2.5 text-sm font-medium text-bg transition-all hover:bg-secondary active:scale-95 md:block"
          >
            {contactLabel ? t(contactLabel) : "LinkedIn"}
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? t(strings.closeMenu) : t(strings.openMenu)}
            className="relative z-[60] flex size-10 flex-col items-center justify-center gap-1.5 md:hidden"
          >
            <span
              className={`block h-0.5 w-6 bg-fg transition-transform duration-300 ${
                menuOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-fg transition-opacity duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-fg transition-transform duration-300 ${
                menuOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </button>
        </nav>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[55] flex items-center justify-center bg-bg/95 backdrop-blur-xl md:hidden"
            >
              <ul className="flex flex-col items-center gap-8">
                {pillLinks.map((link, index) => (
                  <motion.li
                    key={link.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 * index + 0.1 }}
                  >
                    <a
                      href={`#${link.id}`}
                      onClick={() => setMenuOpen(false)}
                      className={`text-3xl transition-colors hover:text-primary ${
                        active === link.id ? "text-primary" : "text-fg"
                      }`}
                    >
                      {t(link.label)}
                    </a>
                  </motion.li>
                ))}
                <li>
                  <a
                    href={profile.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMenuOpen(false)}
                    className="rounded-full bg-primary px-8 py-3 text-lg text-bg"
                  >
                    {contactLabel ? t(contactLabel) : "LinkedIn"}
                  </a>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
