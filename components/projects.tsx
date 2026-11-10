"use client";

import { featuredProjects, profile } from "@/data/profile";
import { strings } from "@/data/strings";
import type { GithubSnapshot } from "@/lib/github";
import { trackSpotlight } from "@/lib/use-spotlight";
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

        <div className="grid gap-6 md:grid-cols-2">
          {featuredProjects.map((project, index) => {
            const live = github.projects[project.repo];
            return (
              <Reveal key={project.repo} delay={(index % 2) * 0.08}>
                <article
                  onMouseMove={trackSpotlight}
                  className="glass glass-hover spotlight flex h-full flex-col p-8"
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
                      className="rounded-full border border-line bg-white/5 p-2.5 text-lg transition-all duration-300 hover:bg-primary hover:text-bg"
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
