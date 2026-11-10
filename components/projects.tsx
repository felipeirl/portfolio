"use client";

import { caseSlugForRepo } from "@/data/cases";
import { featuredProjects, profile } from "@/data/profile";
import { strings } from "@/data/strings";
import type { GithubSnapshot } from "@/lib/github";
import { resetTilt, trackSpotlight } from "@/lib/use-spotlight";
import { ArrowUpRight, Github, Star } from "./icons";
import { useLocale } from "./locale";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";
import { TechIcon } from "./tech-icon";

interface ProjectsProps {
  github: GithubSnapshot;
}

export function Projects({ github }: ProjectsProps) {
  const { locale, t } = useLocale();

  const formatDate = (iso: string) =>
    new Intl.DateTimeFormat(locale === "pt" ? "pt-BR" : "en-US", {
      month: "short",
      year: "numeric",
    }).format(new Date(iso));

  return (
    <section id="projects" aria-labelledby="projects-title" className="section-fade py-32">
      <div className="mx-auto w-[90%] max-w-7xl">
        <SectionHeading
          id="projects-title"
          eyebrow={t(strings.projects.eyebrow)}
          title={t(strings.projects.title)}
          subtitle={t(strings.projects.subtitle)}
        />

        {!github.live && (
          <p role="status" className="mb-6 text-sm text-muted">
            {t(strings.projects.offline)}
          </p>
        )}

        {github.live && github.activity && <ActivityBlock github={github} formatDate={formatDate} />}

      <div className="grid gap-6 md:grid-cols-2">
          {featuredProjects.map((project, index) => {
            const live = github.projects[project.repo];
            return (
              <Reveal key={project.repo} delay={(index % 2) * 0.08}>
                <article
                  onMouseMove={trackSpotlight}
                  onMouseLeave={resetTilt}
                  className="glass tilt spotlight flex h-full flex-col p-8"
                >
                  <header className="flex items-start justify-between gap-4">
                    <div className="flex gap-2">
                      {project.icons.map((icon, i) => (
                        <TechIcon
                          key={icon}
                          id={icon}
                          label={project.stack[i] ?? icon}
                          size={40}
                        />
                      ))}
                    </div>
                    <a
                      href={live.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${t(strings.projects.code)}: ${project.title}`}
                      className="rounded-full border border-line bg-white/5 p-2.5 text-lg transition-all duration-300 hover:bg-primary hover:text-bg active:scale-90"
                    >
                      <ArrowUpRight />
                    </a>
                  </header>

                  <h3 className="mt-6 text-2xl text-secondary">{project.title}</h3>
                  <p className="mt-3 flex-1 leading-relaxed text-muted">
                    {t(project.description)}
                  </p>

                  <ul className="mt-6 flex flex-wrap gap-2">
                    {project.stack.map((item) => (
                      <li
                        key={item}
                        className="rounded-full bg-primary px-3 py-1 text-xs font-semibold tracking-widest text-bg uppercase"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex items-center gap-4 border-t border-line pt-5 text-sm">
                    <a
                      href={live.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-semibold text-primary transition-all duration-300 hover:gap-4"
                    >
                      {t(strings.projects.repo)} <span aria-hidden>→</span>
                    </a>
                    {caseSlugForRepo(project.repo) && (
                      <a
                        href={`/projetos/${caseSlugForRepo(project.repo)}`}
                        className="inline-flex items-center gap-2 font-semibold text-secondary transition-all duration-300 hover:gap-4 hover:text-primary"
                      >
                        {t(strings.projects.caseStudy)} <span aria-hidden>→</span>
                      </a>
                    )}
                    {github.live && (
                      <span className="ml-auto inline-flex items-center gap-4 text-muted">
                        <span className="inline-flex items-center gap-1">
                          <Star className="size-3.5 text-primary" />
                          {live.stars}
                        </span>
                        {live.pushedAt && (
                          <span>
                            {t(strings.projects.updated)} {formatDate(live.pushedAt)}
                          </span>
                        )}
                      </span>
                    )}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-10">
          <a
            href={`${profile.links.github}?tab=repositories`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-semibold text-primary transition-all duration-300 hover:gap-4"
          >
            <Github className="size-5" />
            {t(strings.projects.allRepos)}
            <span aria-hidden>→</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}

const SPARK_W = 280;
const SPARK_H = 48;

function ActivityBlock({
  github,
  formatDate,
}: {
  github: GithubSnapshot;
  formatDate: (iso: string) => string;
}) {
  const { t } = useLocale();
  const days = github.activity ?? [];
  const max = Math.max(1, ...days);
  const step = SPARK_W / Math.max(1, days.length - 1);
  const points = days.map((count, i) => `${(i * step).toFixed(1)},${(SPARK_H - (count / max) * (SPARK_H - 6) - 3).toFixed(1)}`);

  return (
    <div className="glass mb-6 flex flex-wrap items-center justify-between gap-6 p-6">
      <div>
        <p className="font-mono text-xs tracking-widest text-muted uppercase">
          {t(strings.projects.activity)}
        </p>
        <svg
          viewBox={`0 0 ${SPARK_W} ${SPARK_H}`}
          role="img"
          aria-label={`${t(strings.projects.activity)}: ${days.join(", ")}`}
          className="mt-3 h-12 w-72 max-w-full"
        >
          <polyline points={points.join(" ")} fill="none" stroke="#ffca89" strokeWidth="2" strokeLinejoin="round" />
        </svg>
      </div>
      {github.latest && (
        <p className="text-sm text-muted">
          {t(strings.projects.latestPush)}: <span className="text-fg">{github.latest.repo}</span>
          {" · "}
          {formatDate(github.latest.pushedAt)}
        </p>
      )}
    </div>
  );
}
