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
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="mx-auto max-w-6xl px-5 py-24 sm:px-8"
    >
      <SectionHeading
        id="projects-title"
        eyebrow={t(strings.projects.eyebrow)}
        title={t(strings.projects.title)}
        subtitle={t(strings.projects.subtitle)}
      />

      {!github.live && (
        <p role="status" className="mb-6 font-mono text-sm text-muted">
          {t(strings.projects.offline)}
        </p>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {featuredProjects.map((project, index) => {
          const live = github.projects[project.repo];
          return (
            <Reveal key={project.repo} delay={(index % 2) * 0.08}>
              <article
                onMouseMove={trackSpotlight}
                className="spotlight group flex h-full flex-col rounded-2xl border border-line bg-surface/70 p-6 transition-colors hover:border-cyan/40"
              >
                <header className="flex items-start justify-between gap-4">
                  <div className="flex gap-2">
                    {project.icons.map((icon, i) => (
                      <TechIcon
                        key={icon}
                        id={icon}
                        label={project.stack[i] ?? icon}
                        size={36}
                      />
                    ))}
                  </div>
                  <a
                    href={live.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${t(strings.projects.code)}: ${project.title}`}
                    className="rounded-lg border border-line p-2 text-muted transition-colors hover:border-cyan/50 hover:text-cyan"
                  >
                    <ArrowUpRight className="size-4" />
                  </a>
                </header>

                <h3 className="mt-5 text-xl font-semibold">{project.title}</h3>
                <p className="mt-2 flex-1 leading-relaxed text-muted">{t(project.description)}</p>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-line bg-bg px-3 py-1 font-mono text-xs text-muted"
                    >
                      {item}
                    </li>
                  ))}
                </ul>

                {github.live && (
                  <footer className="mt-5 flex items-center gap-4 border-t border-line pt-4 font-mono text-xs text-muted">
                    <span className="inline-flex items-center gap-1">
                      <Star className="size-3.5 text-cyan" />
                      {live.stars}
                    </span>
                    {live.language && <span>{live.language}</span>}
                    {live.pushedAt && (
                      <span className="ml-auto">
                        {t(strings.projects.updated)} {formatDate(live.pushedAt)}
                      </span>
                    )}
                  </footer>
                )}
              </article>
            </Reveal>
          );
        })}
      </div>

      <Reveal className="mt-8">
        <a
          href={`${profile.links.github}?tab=repositories`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-mono text-sm text-cyan transition-colors hover:text-white"
        >
          <Github className="size-4" />
          {t(strings.projects.allRepos)}
          <ArrowUpRight className="size-4" />
        </a>
      </Reveal>
    </section>
  );
}
