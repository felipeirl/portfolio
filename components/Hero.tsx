"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import type { GithubProfile } from "@/lib/github";
import { site } from "@/lib/site";
import { Button } from "./Button";
import { Counter } from "./Counter";
import { Icon, type IconName } from "./Icon";

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

/**
 * Linha do título com revelação por máscara. O respiro vertical (padding + margem negativa)
 * deixa o topo e a base das letras dentro da máscara, sem alterar o ritmo do título.
 */
function Line({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <span className="-my-[0.12em] block overflow-hidden py-[0.12em]">
      <motion.span
        initial={{ y: "110%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1, delay, ease: EASE }}
        className="block"
      >
        {children}
      </motion.span>
    </span>
  );
}

type Stat = { label: string; value: number; icon: IconName };

export function Hero({ profile }: { profile: GithubProfile | null }) {
  const years = profile ? new Date().getFullYear() - new Date(profile.createdAt).getFullYear() : 0;

  const stats: Stat[] = profile
    ? [
        { label: "Repositórios", value: profile.publicRepos, icon: "layers" },
        { label: "Estrelas", value: profile.totalStars, icon: "star" },
        { label: "Seguidores", value: profile.followers, icon: "github" },
        ...(years > 0
          ? [
              {
                label: years === 1 ? "Ano no GitHub" : "Anos no GitHub",
                value: years,
                icon: "clock" as const,
              },
            ]
          : []),
      ]
    : [];

  return (
    <section id="hero" className="relative flex min-h-screen items-center pt-32 pb-24">
      <div className="mx-auto w-[90%] max-w-[1280px]">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mb-5 inline-block font-accent text-[clamp(1.5rem,3.6vw,2.4rem)] text-primary italic"
        >
          {site.name}
        </motion.span>

        <h1 className="font-heading text-[clamp(4.5rem,14vw,13rem)] leading-[1.02] tracking-[0.02em]">
          <Line delay={0.1}>BACK-END</Line>
          <Line delay={0.22}>
            <span className="text-primary">DEVELOPER</span>
          </Line>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
          className="mt-10 max-w-3xl"
        >
          <p className="text-[clamp(1.2rem,2vw,1.7rem)] leading-snug text-white">{site.intro}</p>
          <p className="mt-5 text-[clamp(1.1rem,1.6vw,1.35rem)] text-muted">
            Construo e estudo <RotatingWord words={site.rotatingWords} />
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button href={site.links.linkedin} external>
              Entre em contato
            </Button>
            <Button href="#projetos" variant="secondary" icon="layers">
              Ver projetos
            </Button>
            <Button href={site.links.github} variant="link" icon="github" external>
              GitHub
            </Button>
          </div>
        </motion.div>

        {stats.length > 0 && (
          <motion.dl
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.75, ease: EASE }}
            className="mt-14 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="glass flex flex-col gap-2 rounded-2xl p-4">
                <span className="order-1 text-xl text-primary">
                  <Icon name={stat.icon} />
                </span>
                <dd className="order-2 text-4xl leading-none font-medium tracking-tight tabular-nums">
                  <Counter value={stat.value} />
                </dd>
                <dt className="order-3 text-sm text-muted">{stat.label}</dt>
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
