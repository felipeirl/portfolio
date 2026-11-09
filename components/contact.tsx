"use client";

import { profile } from "@/data/profile";
import { strings } from "@/data/strings";
import { ArrowUpRight, Github, Linkedin } from "./icons";
import { useLocale } from "./locale";
import { Reveal } from "./reveal";

export function Contact() {
  const { t } = useLocale();

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="mx-auto max-w-6xl px-5 py-24 sm:px-8"
    >
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-line bg-surface/70 p-10 text-center sm:p-16">
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-[radial-gradient(60%_80%_at_50%_0%,rgb(124_77_255/0.25),transparent_70%)]"
          />
          <p className="mb-3 font-mono text-sm text-cyan">
            <span className="text-muted">$ </span>
            {t(strings.contact.eyebrow)}
          </p>
          <h2
            id="contact-title"
            className="mx-auto max-w-2xl text-3xl font-semibold tracking-tight sm:text-5xl"
          >
            {t(strings.contact.title)}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-muted">{t(strings.contact.subtitle)}</p>

          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-xl bg-cyan px-6 py-3 font-medium text-bg transition-all hover:bg-white hover:shadow-[0_0_32px_rgb(0_229_255/0.35)]"
            >
              <Linkedin className="size-5" />
              {t(strings.contact.linkedin)}
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href={profile.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-line bg-bg/60 px-6 py-3 font-medium transition-colors hover:border-cyan/50"
            >
              <Github className="size-5" />
              {t(strings.contact.github)}
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
