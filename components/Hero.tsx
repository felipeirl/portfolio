"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import type { GithubProfile } from "@/lib/github";
import { site } from "@/lib/site";
import { Counter } from "./Counter";

const WORD_INTERVAL_MS = 2400;
const EASE = [0.16, 1, 0.3, 1] as const;

function RotatingWord({ words }: { words: readonly string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), WORD_INTERVAL_MS);
    return () => clearInterval(id);
  }, [words.length]);

  return (
    <span className="relative inline-flex h-[1.4em] min-w-[9ch] overflow-hidden align-bottom text-primary">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={words[index]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.55, ease: EASE }}
          className="inline-block whitespace-nowrap"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function Line({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <span className="block overflow-hidden pb-[0.08em]">
      <motion.span
        initial={{ y: "105%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1, delay, ease: EASE }}
        className="block"
      >
        {children}
      </motion.span>
    </span>
  );
}

export function Hero({ profile }: { profile: GithubProfile | null }) {
  const years = profile ? new Date().getFullYear() - new Date(profile.createdAt).getFullYear() : 0;

  const stats = profile
    ? [
        { label: "Repositórios públicos", value: profile.publicRepos },
        { label: "Estrelas recebidas", value: profile.totalStars },
        { label: "Seguidores", value: profile.followers },
        ...(years > 0 ? [{ label: "Anos no GitHub", value: years }] : []),
      ]
    : [];

  return (
    <section id="hero" className="relative flex min-h-screen items-center pt-28 pb-24">
      <div className="mx-auto w-[90%] max-w-[1280px]">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mb-4 inline-block font-accent text-[clamp(1.5rem,4vw,2.5rem)] text-primary italic"
        >
          Portfólio
        </motion.span>

        <h1 className="font-heading text-[clamp(4rem,12vw,11rem)] leading-[0.85] tracking-[-0.02em]">
          <Line delay={0.1}>BACK-END</Line>
          <Line delay={0.22}>
            <span className="text-primary">DEVELOPER</span>
          </Line>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
          className="mt-8 max-w-3xl"
        >
          <p className="text-[clamp(1.2rem,2vw,1.8rem)] leading-snug text-white">
            {site.intro}
          </p>
          <p className="mt-5 text-[clamp(1.1rem,1.6vw,1.4rem)] text-muted">
            Construo e estudo <RotatingWord words={site.rotatingWords} />
          </p>

          <div className="mt-10 flex flex-wrap gap-5">
            <a
              href={site.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border-2 border-white bg-white px-8 py-4 text-lg font-semibold text-bg transition duration-300 hover:scale-105 hover:border-secondary hover:bg-secondary"
            >
              Entre em Contato
            </a>
            <a
              href="#projetos"
              className="inline-flex items-center justify-center rounded-full border-2 border-white px-8 py-4 text-lg font-semibold transition duration-300 hover:border-primary hover:bg-glass hover:text-primary"
            >
              Ver Projetos
            </a>
          </div>
        </motion.div>

        {stats.length > 0 && (
          <motion.dl
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.75, ease: EASE }}
            className="mt-16 grid max-w-3xl grid-cols-2 gap-6 border-t border-line pt-8 sm:grid-cols-4"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <dt className="order-2 text-xs tracking-widest text-muted uppercase">
                  {stat.label}
                </dt>
                <dd className="font-heading text-5xl text-secondary">
                  <Counter value={stat.value} />
                </dd>
              </div>
            ))}
          </motion.dl>
        )}
      </div>

      <div
        aria-hidden
        className="absolute bottom-10 left-1/2 hidden -translate-x-1/2 opacity-70 sm:block"
      >
        <div className="relative h-10 w-[26px] rounded-[13px] border-2 border-white">
          <span className="mouse-dot absolute top-1.5 left-1/2 h-2 w-1 -translate-x-1/2 rounded-sm bg-white" />
        </div>
      </div>
    </section>
  );
}
