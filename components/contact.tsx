"use client";

import { profile } from "@/data/profile";
import { strings } from "@/data/strings";
import { ArrowUpRight, Github, Linkedin } from "./icons";
import { useLocale } from "./locale";
import { Magnetic } from "./magnetic";
import { Reveal } from "./reveal";
import { SplitTitle } from "./split-title";

export function Contact() {
  const { locale, t } = useLocale();

  return (
    <section id="contact" aria-labelledby="contact-title" className="py-32">
      <div className="mx-auto w-[90%] max-w-5xl">
        <Reveal>
          <div className="glass p-10 text-center sm:p-16">
            <p className="mb-3 font-accent text-2xl text-primary italic sm:text-3xl">
              {t(strings.contact.eyebrow)}
            </p>
            <h2
              id="contact-title"
              className="mx-auto max-w-3xl font-heading text-5xl leading-none uppercase sm:text-6xl lg:text-7xl"
            >
              <SplitTitle text={t(strings.contact.title)} />
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-muted">
              {t(strings.contact.subtitle)}
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Magnetic>
              <a
                href={profile.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 rounded-full border-2 border-fg bg-fg px-8 py-3.5 text-lg font-semibold text-bg transition-all duration-300 hover:scale-105 hover:border-secondary hover:bg-secondary active:scale-95"
              >
                <Linkedin className="size-5" />
                {t(strings.contact.linkedin)}
                <ArrowUpRight className="size-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Magnetic>
              <Magnetic>
              <a
                href={locale === "pt" ? "/cv/felipe-jorge-cv-pt.pdf" : "/cv/felipe-jorge-cv-en.pdf"}
                download
                className="inline-flex items-center gap-3 rounded-full border-2 border-fg px-8 py-3.5 text-lg font-semibold text-fg transition-all duration-300 hover:border-primary hover:text-primary active:scale-95"
              >
                {t(strings.contact.cv)}
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={profile.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded-full border-2 border-fg px-8 py-3.5 text-lg font-semibold text-fg transition-all duration-300 hover:border-primary hover:text-primary active:scale-95"
              >
                <Github className="size-5" />
                {t(strings.contact.github)}
              </a>
            </Magnetic>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
