"use client";

import { motion } from "motion/react";
import type { Project } from "@/data/projects";
import type { RepoStats } from "@/lib/github";
import { RepoCard } from "./RepoCard";
import { Reveal } from "./Reveal";
import { ScreenshotCarousel } from "./ScreenshotCarousel";

type ProjectShowcaseProps = {
  project: Project;
  /** Estatísticas por "owner/name". */
  stats: Record<string, RepoStats | null>;
  index: number;
};

/** Linha animada que liga os repositórios de um mesmo projeto. */
function RepoLink({ label }: { label: string }) {
  return (
    <div aria-hidden className="relative hidden items-center justify-center lg:flex">
      <svg width="120" height="24" viewBox="0 0 120 24" className="overflow-visible">
        <line
          x1="0"
          y1="12"
          x2="120"
          y2="12"
          stroke="var(--color-primary)"
          strokeOpacity="0.5"
          strokeWidth="2"
          strokeDasharray="6 6"
        />
        <motion.circle
          r="4"
          cy="12"
          fill="var(--color-primary)"
          animate={{ cx: [0, 120, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
      <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-center font-mono text-[0.7rem] whitespace-nowrap text-muted">
        {label}
      </span>
    </div>
  );
}

export function ProjectShowcase({ project, stats, index }: ProjectShowcaseProps) {
  const multi = project.repos.length > 1;
  const number = String(index + 1).padStart(2, "0");

  return (
    <Reveal>
      <article className="relative">
        <header className="mb-8 max-w-3xl">
          <div className="mb-3 flex flex-wrap items-center gap-3">
            <span className="font-heading text-3xl text-primary">{number}</span>
            <span className="text-sm tracking-[0.18em] text-muted uppercase">{project.kicker}</span>
            {multi && (
              <span className="rounded-full border border-primary/50 px-3 py-0.5 text-xs font-semibold text-primary">
                {project.repos.length} repositórios
              </span>
            )}
          </div>
          <h3 className="font-heading text-[clamp(2.5rem,6vw,4.5rem)] leading-none uppercase">
            {project.title}
          </h3>
          <p className="mt-4 text-lg text-muted">{project.description}</p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <li key={tag} className="tag-pill">
                {tag}
              </li>
            ))}
          </ul>
        </header>

        {multi ? (
          <div className="grid items-stretch gap-6 lg:grid-cols-[1fr_auto_1fr] lg:gap-0">
            <RepoCard
              repo={project.repos[0]}
              stats={stats[`${project.repos[0].owner}/${project.repos[0].name}`] ?? null}
              label={`Repositório 1 · ${project.repos[0].role}`}
            />
            <RepoLink label={project.connection ?? ""} />
            <RepoCard
              repo={project.repos[1]}
              stats={stats[`${project.repos[1].owner}/${project.repos[1].name}`] ?? null}
              label={`Repositório 2 · ${project.repos[1].role}`}
            />
          </div>
        ) : (
          <div className="max-w-2xl">
            {project.repos.map((repo) => (
              <RepoCard
                key={repo.name}
                repo={repo}
                stats={stats[`${repo.owner}/${repo.name}`] ?? null}
              />
            ))}
          </div>
        )}

        {(project.liveUrl || project.ecosystem) && (
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-bg transition hover:-translate-y-0.5 hover:bg-secondary"
              >
                <span className="h-2 w-2 rounded-full bg-bg/70" /> Ver em produção ↗
              </a>
            )}
            {project.ecosystem && (
              <>
                <span className="text-sm text-muted">Ecossistema:</span>
                {project.ecosystem.map((r) => (
                  <a
                    key={r.name}
                    href={`https://github.com/${r.owner}/${r.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-line px-3.5 py-1.5 font-mono text-xs text-muted transition hover:border-primary hover:text-primary"
                  >
                    {r.name}
                  </a>
                ))}
              </>
            )}
          </div>
        )}

        {project.screenshots && (
          <div className="mt-10">
            <p className="mb-3 text-xs tracking-[0.18em] text-muted uppercase">
              Telas do app · arraste →
            </p>
            <ScreenshotCarousel shots={project.screenshots} />
          </div>
        )}
      </article>
    </Reveal>
  );
}
