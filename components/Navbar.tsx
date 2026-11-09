"use client";

import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { nav, site } from "@/lib/site";
import { Icon } from "./Icon";

const monogram = site.name
  .split(" ")
  .slice(0, 2)
  .map((part) => part[0])
  .join("");

/** Navegação N2: pílula flutuante central. No celular vira logo + botão de menu. */
export function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const { id } of nav) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("lenis-stopped", open);
    return () => document.documentElement.classList.remove("lenis-stopped");
  }, [open]);

  return (
    <>
      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-primary"
      />

      <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
        <div className="flex items-center gap-1.5 rounded-full border border-white/15 bg-glass p-1.5 shadow-[0_8px_32px_rgb(0_0_0/0.35)] backdrop-blur-xl max-md:w-full max-md:justify-between">
          <a
            href="#hero"
            aria-label={`${site.name}, início`}
            onClick={() => setOpen(false)}
            className="grid size-10 place-items-center rounded-full bg-primary font-accent text-base font-bold text-bg"
          >
            {monogram}
          </a>

          <nav aria-label="Principal" className="hidden items-center gap-0.5 md:flex">
            {nav.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                className={`relative rounded-full px-4 py-2 text-sm transition-colors ${
                  active === id ? "text-primary" : "text-white/80 hover:text-white"
                }`}
              >
                {active === id && (
                  <motion.span
                    layoutId="nav-active"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    className="absolute inset-0 rounded-full bg-primary/15"
                  />
                )}
                <span className="relative">{label}</span>
              </a>
            ))}
          </nav>

          <a
            href={site.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 hidden rounded-full bg-white px-5 py-2.5 text-sm font-medium text-bg transition hover:bg-secondary md:block"
          >
            Contato
          </a>

          <button
            type="button"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="relative z-[60] grid size-10 place-items-center rounded-full text-xl md:hidden"
          >
            <Icon name={open ? "close" : "menu"} />
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[55] flex items-center justify-center bg-bg/95 backdrop-blur-xl md:hidden"
            >
              <ul className="flex flex-col items-center gap-8">
                {nav.map(({ id, label }, i) => (
                  <motion.li
                    key={id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 * i + 0.1 }}
                  >
                    <a href={`#${id}`} onClick={() => setOpen(false)} className="text-3xl">
                      {label}
                    </a>
                  </motion.li>
                ))}
                <li>
                  <a
                    href={site.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-primary px-8 py-3 text-lg text-bg"
                  >
                    Contato
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
