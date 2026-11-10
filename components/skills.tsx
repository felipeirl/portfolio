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
      className="section-fade py-32"
    >
      <div className="mx-auto w-[90%] max-w-7xl">
        <SectionHeading
          id="skills-title"
          eyebrow={t(strings.skills.eyebrow)}
          title={t(strings.skills.title)}
          subtitle={t(strings.skills.subtitle)}
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, index) => (
            <Reveal key={group.id} delay={index * 0.05} className={SPAN_BY_INDEX[index] ?? ""}>
              <article
                onMouseMove={trackSpotlight}
                className="glass glass-hover spotlight h-full p-8"
              >
                <h3 className="font-accent text-2xl text-primary italic">{t(group.title)}</h3>
                <p className="mt-2 min-h-12 leading-relaxed text-muted">{t(group.blurb)}</p>
                <ul className="mt-6 flex flex-wrap gap-4">
                  {group.icons.map((icon, i) => (
                    <li key={icon}>
                      <TechIcon id={icon} label={group.labels[i] ?? icon} size={56} />
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
