"use client";

import { motion } from "framer-motion";
import type { CSSProperties } from "react";
import { profile } from "@/data/profile";
import { strings } from "@/data/strings";
import type { GithubSnapshot } from "@/lib/github";
import { CountUp } from "./count-up";
import { ArrowUpRight, Github, MapPin } from "./icons";
import { useLocale } from "./locale";
import { Magnetic } from "./magnetic";
import { useMotionPref } from "./motion-pref";
import { Terminal } from "./terminal";

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
            className="mb-6 font-accent text-3xl text-primary italic sm:text-4xl"
          >
            {profile.name}
          </motion.p>

          <h1
            id="hero-title"
            className="hero-title font-heading text-[clamp(3.5rem,11vw,9.5rem)] leading-[0.85] tracking-tight uppercase"
          >
            <span className="hero-line">
              <span style={{ "--i": 0 } as CSSProperties}>{firstLine}</span>
            </span>
            <span className="hero-line">
              <span className="text-primary" style={{ "--i": 1 } as CSSProperties}>
                {secondLine}
              </span>
            </span>
          </h1>

          <motion.p
            {...fade(0.2)}
            className="mt-8 max-w-xl text-lg leading-relaxed text-fg sm:text-xl"
          >
            {t(profile.summary)}
          </motion.p>

          <motion.div {...fade(0.3)} className="mt-10 flex flex-wrap items-center gap-4">
            <Magnetic>
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-full border-2 border-fg bg-fg px-8 py-3.5 text-lg font-semibold text-bg transition-all duration-300 hover:scale-105 hover:border-secondary hover:bg-secondary active:scale-95"
              >
                {t(strings.hero.ctaProjects)}
                <ArrowUpRight className="size-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#contact"
                className="inline-flex items-center rounded-full border-2 border-fg px-8 py-3.5 text-lg font-semibold text-fg transition-all duration-300 hover:border-primary hover:bg-[rgb(20_20_20/0.6)] hover:text-primary active:scale-95"
              >
                {t(strings.hero.ctaContact)}
              </a>
            </Magnetic>
            <a
              href={profile.links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="inline-flex size-[3.4rem] items-center justify-center rounded-full border border-line bg-white/5 text-2xl transition-all duration-300 hover:-translate-y-1 hover:bg-primary hover:text-bg active:scale-95"
            >
              <Github />
            </a>
          </motion.div>
        </div>

        <motion.div {...fade(0.25)} className="space-y-5">
          <Terminal />

          {github.live && github.totalRepos !== null && (
            <dl className="grid grid-cols-2 gap-4">
              <div className="glass flex flex-col-reverse gap-2 p-5">
                <dt className="text-sm tracking-widest text-muted uppercase">
                  {t(strings.hero.repos)}
                </dt>
                <dd className="font-heading text-5xl leading-none text-primary">
                  <CountUp value={github.totalRepos} />
                </dd>
              </div>
              <div className="glass flex flex-col-reverse gap-2 p-5">
                <dt className="text-sm tracking-widest text-muted uppercase">
                  {t(strings.hero.stars)}
                </dt>
                <dd className="font-heading text-5xl leading-none text-primary">
                  <CountUp value={github.totalStars ?? 0} />
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
