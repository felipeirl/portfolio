"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { Project } from "@/data/projects";
import type { RepoStats } from "@/lib/github";
import { Button } from "./Button";
import { Icon } from "./Icon";
import { RepoCard } from "./RepoCard";
import { Reveal } from "./Reveal";
import { ScreenshotCarousel } from "./ScreenshotCarousel";

type ProjectShowcaseProps = {
  project: Project;
  /** Estatísticas por "owner/name". */
  stats: Record<string, RepoStats | null>;
};

/** Projeto P2: cartão único com abas por repositório e, ao lado, telas ou ecossistema. */
export function ProjectShowcase({ project, stats }: ProjectShowcaseProps) {
  const [active, setActive] = useState(0);
  const multi = project.repos.length > 1;
  const repo = project.repos[active];
  const hasAside = Boolean(project.screenshots || project.ecosystem);

  return (
    <Reveal>
      <article
        className={`glass grid items-center gap-10 rounded-[28px] p-6 sm:p-10 ${
          hasAside ? "lg:grid-cols-[1.1fr_1fr]" : ""
        }`}
      >
        <div className="min-w-0 space-y-6">
          <header>
            <div className="mb-3 flex flex-wrap items-center gap-3 text-sm tracking-[0.14em] text-muted uppercase">
              <span>{project.kicker}</span>
              {multi && (
                <span className="rounded-full border border-primary/50 px-3 py-0.5 text-sm tracking-normal text-primary normal-case">
                  {project.repos.length} repositórios
                </span>
              )}
            </div>
            <h3 className="font-heading text-[clamp(2.75rem,6vw,4.75rem)] leading-[1.02] tracking-[0.02em] uppercase">
              {project.title}
            </h3>
            <p className="mt-4 max-w-[62ch] text-lg text-white/80">{project.description}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <li key={tag} className="tag-pill">
                  {tag}
                </li>
              ))}
            </ul>
          </header>

          {multi && (
            <div className="space-y-3">
              <div
                role="tablist"
                aria-label={`Repositórios de ${project.title}`}
                className="flex w-max max-w-full flex-wrap gap-1 rounded-xl bg-white/[0.06] p-1"
              >
                {project.repos.map((r, i) => (
                  <button
                    key={r.name}
                    type="button"
                    role="tab"
                    aria-selected={active === i}
                    onClick={() => setActive(i)}
                    className={`relative flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                      active === i ? "text-bg" : "text-white/80 hover:text-white"
                    }`}
                  >
                    {active === i && (
                      <motion.span
                        layoutId={`repo-tab-${project.id}`}
                        transition={{ type: "spring", stiffness: 420, damping: 34 }}
                        className="absolute inset-0 rounded-lg bg-primary"
                      />
                    )}
                    <span className="relative flex items-center gap-2">
                      <Icon name={r.icon} /> {r.role}
                    </span>
                  </button>
                ))}
              </div>
              <p className="flex flex-wrap items-center gap-x-2 font-mono text-sm text-muted">
                {project.repos.map((r, i) => (
                  <span key={r.name} className="flex items-center gap-2">
                    {i > 0 && <span className="text-primary">⇄</span>}
                    {r.name}
                  </span>
                ))}
                {project.connection && <span>· {project.connection}</span>}
              </p>
            </div>
          )}

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={repo.name}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              role={multi ? "tabpanel" : undefined}
            >
              <RepoCard repo={repo} stats={stats[`${repo.owner}/${repo.name}`] ?? null} />
            </motion.div>
          </AnimatePresence>

          {project.liveUrl && (
            <Button href={project.liveUrl} external>
              Ver em produção
            </Button>
          )}
        </div>

        {project.screenshots && (
          <div className="min-w-0">
            <p className="mb-3 text-sm tracking-[0.14em] text-muted uppercase">
              Telas do app · arraste →
            </p>
            <ScreenshotCarousel shots={project.screenshots} />
          </div>
        )}

        {!project.screenshots && project.ecosystem && (
          <div className="min-w-0">
            <p className="mb-3 text-sm tracking-[0.14em] text-muted uppercase">Ecossistema</p>
            <ul className="divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/[0.04]">
              {project.ecosystem.map((r) => (
                <li key={r.name}>
                  <a
                    href={`https://github.com/${r.owner}/${r.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-white/[0.04]"
                  >
                    <span className="min-w-0">
                      <span className="block text-white">{r.label}</span>
                      <span className="block font-mono text-sm break-all text-muted">{r.name}</span>
                    </span>
                    <span className="text-xl text-primary transition-transform duration-300 group-hover:rotate-45">
                      <Icon name="arrow" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </article>
    </Reveal>
  );
}
