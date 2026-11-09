"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import type { PointerEvent } from "react";
import type { Repo } from "@/data/projects";
import type { RepoStats } from "@/lib/github";
import { TimeAgo } from "./TimeAgo";

const LANGUAGE_COLORS: Record<string, string> = {
  Java: "#e76f00",
  Python: "#4b8bbe",
  Kotlin: "#a97bff",
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  HTML: "#e34c26",
  CSS: "#7c4dff",
  Go: "#00add8",
  Shell: "#89e051",
  Dockerfile: "#2496ed",
  Makefile: "#6d8086",
  PLpgSQL: "#336790",
  Bru: "#f4aa41",
};
const FALLBACK_COLOR = "#ffca89";

const MAX_TILT_DEG = 5;

function LanguageBar({ languages }: { languages: RepoStats["languages"] }) {
  if (languages.length === 0) return null;
  return (
    <div>
      <div className="flex h-1.5 overflow-hidden rounded-full bg-white/10">
        {languages.map((l) => (
          <span
            key={l.name}
            style={{ width: `${l.percent}%`, background: LANGUAGE_COLORS[l.name] ?? FALLBACK_COLOR }}
          />
        ))}
      </div>
      <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
        {languages.map((l) => (
          <li key={l.name} className="flex items-center gap-1.5">
            <span
              className="h-2 w-2 rounded-full"
              style={{ background: LANGUAGE_COLORS[l.name] ?? FALLBACK_COLOR }}
            />
            {l.name} {l.percent}%
          </li>
        ))}
      </ul>
    </div>
  );
}

type RepoCardProps = { repo: Repo; stats: RepoStats | null; label?: string };

export function RepoCard({ repo, stats, label }: RepoCardProps) {
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [MAX_TILT_DEG, -MAX_TILT_DEG]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-MAX_TILT_DEG, MAX_TILT_DEG]), {
    stiffness: 200,
    damping: 20,
  });

  const onMove = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    px.set((event.clientX - rect.left) / rect.width - 0.5);
    py.set((event.clientY - rect.top) / rect.height - 0.5);
  };
  const onLeave = () => {
    px.set(0);
    py.set(0);
  };

  const url = stats?.url ?? `https://github.com/${repo.owner}/${repo.name}`;

  return (
    <motion.article
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className="glass flex h-full flex-col rounded-3xl p-7 transition-colors duration-500 hover:border-primary/40"
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          {label && (
            <span className="mb-2 inline-block text-xs font-semibold tracking-[0.18em] text-primary uppercase">
              {label}
            </span>
          )}
          <h4 className="text-xl">{repo.role}</h4>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm text-muted transition-colors hover:text-primary"
          >
            {repo.owner}/{repo.name} ↗
          </a>
        </div>
        {stats?.latestRelease && (
          <a
            href={stats.latestRelease.url}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-full border border-primary/40 px-3 py-1 font-mono text-xs text-primary transition hover:bg-primary hover:text-bg"
          >
            {stats.latestRelease.tag}
          </a>
        )}
      </div>

      <p className="mb-5 flex-1 text-muted">{repo.summary}</p>

      <ul className="mb-5 flex flex-wrap gap-2">
        {repo.tags.map((tag) => (
          <li key={tag} className="tag-pill">
            {tag}
          </li>
        ))}
      </ul>

      {stats ? (
        <div className="space-y-4 border-t border-line pt-4">
          <LanguageBar languages={stats.languages} />
          <dl className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-muted">
            <div className="flex gap-1.5">
              <dt className="sr-only">Estrelas</dt>
              <dd>★ {stats.stars}</dd>
            </div>
            <div className="flex gap-1.5">
              <dt>Último push</dt>
              <dd className="text-white">
                <TimeAgo iso={stats.pushedAt} />
              </dd>
            </div>
            {stats.myCommits !== null && (
              <div className="flex gap-1.5">
                <dt>Meus commits</dt>
                <dd className="text-white">{stats.myCommits}</dd>
              </div>
            )}
          </dl>
        </div>
      ) : (
        <p className="border-t border-line pt-4 text-xs text-muted">
          Métricas do GitHub indisponíveis no momento.
        </p>
      )}
    </motion.article>
  );
}
