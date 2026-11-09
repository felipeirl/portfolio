"use client";

import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { nav, site } from "@/lib/site";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  const linkClass = (id: string) =>
    `relative text-[0.95rem] font-medium transition-colors duration-300 hover:text-primary ${
      active === id ? "text-primary" : "text-white"
    }`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-line bg-bg/40 py-4 backdrop-blur-xl"
          : "bg-gradient-to-b from-bg/60 to-transparent py-6"
      }`}
    >
      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className="absolute inset-x-0 top-0 h-0.5 origin-left bg-primary"
      />
      <div className="mx-auto flex w-[90%] max-w-[1280px] items-center justify-between">
        <a href="#hero" className="flex flex-col leading-tight" onClick={() => setOpen(false)}>
          <span className="font-accent text-2xl text-white">{site.name}</span>
          <span className="text-xs tracking-[0.2em] text-muted uppercase">{site.role}</span>
        </a>

        <nav className="hidden items-center gap-10 md:flex" aria-label="Principal">
          {nav.map(({ id, label }) => (
            <a key={id} href={`#${id}`} className={linkClass(id)}>
              {label}
              {active === id && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute -bottom-1.5 left-0 h-0.5 w-full bg-primary"
                />
              )}
            </a>
          ))}
          {site.cvUrl && (
            <a
              href={site.cvUrl}
              download
              className="rounded-full border border-primary bg-primary px-6 py-2.5 text-sm font-medium text-bg transition hover:-translate-y-0.5 hover:bg-secondary"
            >
              Baixar CV
            </a>
          )}
          <a
            href={site.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-line bg-white/5 px-6 py-2.5 text-sm font-medium transition hover:bg-white hover:text-bg"
          >
            Contato
          </a>
        </nav>

        <button
          type="button"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="relative z-[60] flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span
            className={`h-0.5 w-7 bg-white transition ${open ? "translate-y-2 rotate-45" : ""}`}
          />
          <span className={`h-0.5 w-7 bg-white transition ${open ? "opacity-0" : ""}`} />
          <span
            className={`h-0.5 w-7 bg-white transition ${open ? "-translate-y-2 -rotate-45" : ""}`}
          />
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
  );
}
