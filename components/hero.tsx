"use client";

import { motion, useReducedMotion } from "framer-motion";
import { profile } from "@/data/profile";
import { strings } from "@/data/strings";
import type { GithubSnapshot } from "@/lib/github";
import { ArrowUpRight, Github, MapPin } from "./icons";
import { useLocale } from "./locale";
import { TypingLines } from "./typing-lines";

interface HeroProps {
  github: Pick<GithubSnapshot, "live" | "totalRepos" | "totalStars">;
}

export function Hero({ github }: HeroProps) {
  const { locale, t } = useLocale();
  const reduceMotion = useReducedMotion();

  const fade = (delay: number) => ({
    initial: reduceMotion ? false : ({ opacity: 0, y: 20 } as const),
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="mx-auto grid min-h-svh max-w-6xl items-center gap-14 px-5 pb-20 pt-32 sm:px-8 lg:grid-cols-[1.15fr_1fr]"
    >
      <div>
        <motion.div {...fade(0)} className="mb-6 flex flex-wrap items-center gap-3 text-sm">
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-cyan/10 px-3 py-1 font-mono text-cyan">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-cyan opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-cyan" />
            </span>
            {t(strings.hero.available)}
          </span>
          <span className="inline-flex items-center gap-1.5 text-muted">
            <MapPin className="size-4" />
            {profile.location}
          </span>
        </motion.div>

        <motion.p {...fade(0.05)} className="mb-2 font-mono text-base text-muted">
          {t(strings.hero.greeting)}
        </motion.p>

        <motion.h1
          id="hero-title"
          {...fade(0.1)}
          className="text-5xl font-semibold leading-[1.05] tracking-tight sm:text-7xl"
        >
          {profile.name}
          <span className="mt-2 block text-gradient">{t(profile.role)}</span>
        </motion.h1>

        <motion.p {...fade(0.2)} className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
          {t(profile.summary)}
        </motion.p>

        <motion.div {...fade(0.3)} className="mt-8 flex flex-wrap gap-3">
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-xl bg-cyan px-5 py-3 font-medium text-bg transition-all hover:bg-white hover:shadow-[0_0_32px_rgb(0_229_255/0.35)]"
          >
            {t(strings.hero.ctaProjects)}
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface/60 px-5 py-3 font-medium text-fg transition-colors hover:border-cyan/50"
          >
            {t(strings.hero.ctaContact)}
          </a>
          <a
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="inline-flex size-12 items-center justify-center rounded-xl border border-line bg-surface/60 text-xl text-muted transition-colors hover:border-cyan/50 hover:text-fg"
          >
            <Github />
          </a>
        </motion.div>

        {github.live && github.totalRepos !== null && (
          <motion.dl {...fade(0.4)} className="mt-10 flex gap-8 font-mono text-sm">
            <div>
              <dt className="text-muted">{t(strings.hero.repos)}</dt>
              <dd className="mt-1 text-2xl text-fg">{github.totalRepos}</dd>
            </div>
            <div>
              <dt className="text-muted">{t(strings.hero.stars)}</dt>
              <dd className="mt-1 text-2xl text-fg">{github.totalStars}</dd>
            </div>
          </motion.dl>
        )}
      </div>

      <motion.div {...fade(0.25)} className="relative" aria-hidden>
        <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-cyan/20 via-transparent to-violet/25 blur-2xl" />
        <div className="relative overflow-hidden rounded-2xl border border-line bg-surface/90 shadow-2xl backdrop-blur">
          <div className="flex items-center gap-2 border-b border-line px-4 py-3">
            <span className="size-3 rounded-full bg-[#ff5f56]" />
            <span className="size-3 rounded-full bg-[#ffbd2e]" />
            <span className="size-3 rounded-full bg-[#27c93f]" />
            <span className="ml-3 font-mono text-xs text-muted">felipe@portfolio:~</span>
          </div>
          <div className="space-y-3 p-6 font-mono text-sm leading-relaxed">
            <p>
              <span className="text-cyan">$</span> whoami
            </p>
            <p className="text-muted">
              {profile.name} — {t(profile.role)}
            </p>
            <p>
              <span className="text-cyan">$</span> cat focus.txt
            </p>
            <p className="min-h-[1.5em] text-fg">
              <TypingLines lines={profile.typing[locale]} />
            </p>
            <p>
              <span className="text-cyan">$</span> echo $PHILOSOPHY
            </p>
            <p className="text-muted">{t(profile.headline)}</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
