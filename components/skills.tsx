"use client";

import { skillGroups } from "@/data/profile";
import { strings } from "@/data/strings";
import { trackSpotlight } from "@/lib/use-spotlight";
import { useLocale } from "./locale";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";
import { TechIcon } from "./tech-icon";

/** Layout bento de 3 colunas: linhas 2+1, 1+2 e 2+1. */
const SPAN_BY_INDEX = ["lg:col-span-2", "", "", "lg:col-span-2", "lg:col-span-2", ""];

export function Skills() {
  const { t } = useLocale();

  return (
    <section
      id="skills"
      aria-labelledby="skills-title"
      className="mx-auto max-w-6xl px-5 py-24 sm:px-8"
    >
      <SectionHeading
        id="skills-title"
        eyebrow={t(strings.skills.eyebrow)}
        title={t(strings.skills.title)}
        subtitle={t(strings.skills.subtitle)}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, index) => (
          <Reveal key={group.id} delay={index * 0.05} className={SPAN_BY_INDEX[index] ?? ""}>
            <article
              onMouseMove={trackSpotlight}
              className="spotlight h-full rounded-2xl border border-line bg-surface/70 p-6 transition-colors hover:border-cyan/40"
            >
              <h3 className="font-mono text-sm text-cyan">{t(group.title)}</h3>
              <p className="mt-2 min-h-12 text-sm leading-relaxed text-muted">{t(group.blurb)}</p>
              <ul className="mt-5 flex flex-wrap gap-3">
                {group.icons.map((icon, i) => (
                  <li key={icon}>
                    <TechIcon id={icon} label={group.labels[i] ?? icon} />
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
