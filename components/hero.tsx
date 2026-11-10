"use client";

import { motion } from "framer-motion";
import { profile } from "@/data/profile";
import { strings } from "@/data/strings";
import type { GithubSnapshot } from "@/lib/github";
import { ArrowUpRight, Github, MapPin } from "./icons";
import { useLocale } from "./locale";
import { useMotionPref } from "./motion-pref";
import { TypingLines } from "./typing-lines";

interface HeroProps {
  github: Pick<GithubSnapshot, "live" | "totalRepos" | "totalStars">;
}

export function Hero({ github }: HeroProps) {
  const { locale, t } = useLocale();
  const { reduced: reduceMotion } = useMotionPref();
  const [firstLine, secondLine] = strings.hero.titleLines[locale];

  const fade = (delay: number) => ({
    initial: reduceMotion ? false : ({ opacity: 0, y: 40 } as const),
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative flex min-h-svh items-center pt-32 pb-24"
    >
      <div className="mx-auto grid w-[90%] max-w-7xl items-center gap-14 lg:grid-cols-[1.25fr_1fr]">
        <div>
          <motion.div {...fade(0)} className="mb-6 flex flex-wrap items-center gap-4">
            <span className="rounded-full bg-primary px-3 py-1 text-[0.8rem] font-semibold tracking-[0.15em] text-bg uppercase">
              {t(strings.hero.available)}
            </span>
            <span className="inline-flex items-center gap-1.5 text-sm text-muted">
              <MapPin className="size-4" />
              {profile.location}
            </span>
          </motion.div>

          <motion.p
            {...fade(0.05)}
            className="mb-2 font-accent text-3xl text-primary italic sm:text-4xl"
          >
            {profile.name}
          </motion.p>

          <motion.h1
            id="hero-title"
            {...fade(0.1)}
            className="font-heading text-[clamp(3.5rem,11vw,9.5rem)] leading-[0.85] tracking-tight uppercase"
          >
            {firstLine}
            <br />
            <span className="text-primary">{secondLine}</span>
          </motion.h1>

          <motion.p
            {...fade(0.2)}
            className="mt-8 max-w-xl text-lg leading-relaxed text-fg sm:text-xl"
          >
            {t(profile.summary)}
          </motion.p>

          <motion.div {...fade(0.3)} className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full border-2 border-fg bg-fg px-8 py-3.5 text-lg font-semibold text-bg transition-all duration-300 hover:scale-105 hover:border-secondary hover:bg-secondary"
            >
              {t(strings.hero.ctaProjects)}
              <ArrowUpRight className="size-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center rounded-full border-2 border-fg px-8 py-3.5 text-lg font-semibold text-fg transition-all duration-300 hover:border-primary hover:bg-[rgb(20_20_20/0.6)] hover:text-primary"
            >
              {t(strings.hero.ctaContact)}
            </a>
            <a
              href={profile.links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="inline-flex size-[3.4rem] items-center justify-center rounded-full border border-line bg-white/5 text-2xl transition-all duration-300 hover:-translate-y-1 hover:bg-primary hover:text-bg"
            >
              <Github />
            </a>
          </motion.div>
        </div>

        <motion.div {...fade(0.25)} className="space-y-5">
          <div aria-hidden className="glass overflow-hidden">
            <div className="flex items-center gap-2 border-b border-line px-5 py-3.5">
              <span className="size-3 rounded-full bg-[#ff5f56]" />
              <span className="size-3 rounded-full bg-[#ffbd2e]" />
              <span className="size-3 rounded-full bg-[#27c93f]" />
              <span className="ml-3 font-mono text-xs text-muted">felipe@portfolio:~</span>
            </div>
            <div className="space-y-3 p-6 font-mono text-sm leading-relaxed">
              <p>
                <span className="text-primary">$</span> whoami
              </p>
              <p className="text-muted">
                {profile.name} — {t(profile.role)}
              </p>
              <p>
                <span className="text-primary">$</span> cat focus.txt
              </p>
              <p className="min-h-[1.5em] text-fg">
                <TypingLines lines={profile.typing[locale]} />
              </p>
              <p>
                <span className="text-primary">$</span> echo $PHILOSOPHY
              </p>
              <p className="text-muted">{t(profile.headline)}</p>
            </div>
          </div>

          {github.live && github.totalRepos !== null && (
            <dl className="grid grid-cols-2 gap-4">
              <div className="glass flex flex-col-reverse gap-2 p-5">
                <dt className="text-sm tracking-widest text-muted uppercase">
                  {t(strings.hero.repos)}
                </dt>
                <dd className="font-heading text-5xl leading-none text-primary">
                  {github.totalRepos}
                </dd>
              </div>
              <div className="glass flex flex-col-reverse gap-2 p-5">
                <dt className="text-sm tracking-widest text-muted uppercase">
                  {t(strings.hero.stars)}
                </dt>
                <dd className="font-heading text-5xl leading-none text-primary">
                  {github.totalStars}
                </dd>
              </div>
            </dl>
          )}
        </motion.div>
      </div>

      <div
        aria-hidden
        className="absolute bottom-8 left-1/2 hidden animate-scroll-bounce opacity-70 md:block"
      >
        <div className="relative h-10 w-[26px] rounded-[13px] border-2 border-fg">
          <span className="absolute top-1.5 left-1/2 h-2 w-1 -translate-x-1/2 rounded-sm bg-fg" />
        </div>
      </div>
    </section>
  );
}
