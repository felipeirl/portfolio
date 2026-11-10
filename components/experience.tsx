"use client";

import { education, experiences } from "@/data/profile";
import { strings } from "@/data/strings";
import { Briefcase, GraduationCap } from "./icons";
import { useLocale } from "./locale";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

const dotBase =
  "absolute top-8 -left-[4.1rem] flex size-9 items-center justify-center rounded-full border-4 bg-bg";

export function Experience() {
  const { t } = useLocale();

  return (
    <section id="experience" aria-labelledby="experience-title" className="py-32">
      <div className="mx-auto w-[90%] max-w-7xl">
        <SectionHeading
          id="experience-title"
          eyebrow={t(strings.experience.eyebrow)}
          title={t(strings.experience.title)}
          subtitle={t(strings.experience.subtitle)}
        />

        <ol className="relative ml-5 max-w-3xl space-y-10 pl-12 before:absolute before:top-0 before:left-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-primary before:to-primary/10 sm:mx-auto">
          {experiences.map((item) => (
            <li key={item.company} className="relative">
              <span
                className={`${dotBase} border-primary text-primary shadow-[0_0_15px_rgb(255_202_137/0.5)]`}
              >
                <Briefcase className="size-4" />
              </span>
              <Reveal>
                <div className="glass p-8 sm:p-10">
                  <p className="text-sm font-bold tracking-widest text-primary uppercase">
                    {t(strings.experience.work)} · {t(item.period)}
                  </p>
                  <h3 className="mt-3 text-2xl text-secondary">{t(item.role)}</h3>
                  <p className="font-accent text-lg text-muted">{item.company}</p>
                  <p className="mt-4 leading-relaxed text-muted">{t(item.description)}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full bg-primary px-3 py-1 text-xs font-semibold tracking-widest text-bg uppercase"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </li>
          ))}

          <li className="relative">
            <span className={`${dotBase} border-muted text-muted`}>
              <GraduationCap className="size-4" />
            </span>
            <Reveal>
              <div className="glass p-8 sm:p-10">
                <p className="text-sm font-bold tracking-widest text-primary uppercase">
                  {t(strings.experience.study)} · {t(education.period)}
                </p>
                <h3 className="mt-3 text-2xl text-secondary">{t(education.program)}</h3>
                <p className="font-accent text-lg text-muted">{education.school}</p>
              </div>
            </Reveal>
          </li>
        </ol>
      </div>
    </section>
  );
}
