"use client";

import { education, experiences } from "@/data/profile";
import { strings } from "@/data/strings";
import { Briefcase, GraduationCap } from "./icons";
import { useLocale } from "./locale";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

export function Experience() {
  const { t } = useLocale();

  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="mx-auto max-w-6xl px-5 py-24 sm:px-8"
    >
      <SectionHeading
        id="experience-title"
        eyebrow={t(strings.experience.eyebrow)}
        title={t(strings.experience.title)}
        subtitle={t(strings.experience.subtitle)}
      />

      <ol className="relative ml-3 space-y-10 border-l border-line pl-8">
        {experiences.map((item) => (
          <li key={item.company} className="relative">
            <span className="absolute -left-[2.85rem] flex size-9 items-center justify-center rounded-full border border-cyan/40 bg-bg text-cyan">
              <Briefcase className="size-4" />
            </span>
            <Reveal>
              <p className="font-mono text-xs uppercase tracking-wider text-muted">
                {t(strings.experience.work)} · {t(item.period)}
              </p>
              <h3 className="mt-2 text-xl font-semibold">
                {t(item.role)} <span className="text-cyan">@ {item.company}</span>
              </h3>
              <p className="mt-3 max-w-2xl leading-relaxed text-muted">{t(item.description)}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-line bg-surface px-3 py-1 font-mono text-xs text-muted"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </Reveal>
          </li>
        ))}

        <li className="relative">
          <span className="absolute -left-[2.85rem] flex size-9 items-center justify-center rounded-full border border-violet/50 bg-bg text-violet">
            <GraduationCap className="size-4" />
          </span>
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-wider text-muted">
              {t(strings.experience.study)} · {t(education.period)}
            </p>
            <h3 className="mt-2 text-xl font-semibold">
              {t(education.program)} <span className="text-violet">@ {education.school}</span>
            </h3>
          </Reveal>
        </li>
      </ol>
    </section>
  );
}
