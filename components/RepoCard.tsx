import type { Repo } from "@/data/projects";
import type { RepoStats } from "@/lib/github";
import { Icon } from "./Icon";
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

function colorOf(language: string): string {
  return LANGUAGE_COLORS[language] ?? FALLBACK_COLOR;
}

function LanguageBar({ languages }: { languages: RepoStats["languages"] }) {
  if (languages.length === 0) return null;
  return (
    <div>
      <div className="flex h-1.5 overflow-hidden rounded-full bg-white/10">
        {languages.map((l) => (
          <span key={l.name} style={{ width: `${l.percent}%`, background: colorOf(l.name) }} />
        ))}
      </div>
      <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted">
        {languages.map((l) => (
          <li key={l.name} className="flex items-center gap-1.5">
            <span className="size-2 rounded-full" style={{ background: colorOf(l.name) }} />
            {l.name} {l.percent}%
          </li>
        ))}
      </ul>
    </div>
  );
}

type RepoCardProps = { repo: Repo; stats: RepoStats | null };

/** Detalhe de um repositório: resumo, tags e métricas ao vivo do GitHub. */
export function RepoCard({ repo, stats }: RepoCardProps) {
  const url = stats?.url ?? `https://github.com/${repo.owner}/${repo.name}`;

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h4 className="text-xl text-secondary">{repo.role}</h4>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm break-all text-muted transition-colors hover:text-primary"
          >
            {repo.owner}/{repo.name} ↗
          </a>
        </div>
        {stats?.latestRelease && (
          <a
            href={stats.latestRelease.url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-primary/40 px-3 py-1 font-mono text-sm text-primary transition hover:bg-primary hover:text-bg"
          >
            {stats.latestRelease.tag}
          </a>
        )}
      </div>

      <p className="text-white/80">{repo.summary}</p>

      <ul className="flex flex-wrap gap-2">
        {repo.tags.map((tag) => (
          <li key={tag} className="tag-pill">
            {tag}
          </li>
        ))}
      </ul>

      {stats ? (
        <div className="space-y-4 border-t border-white/10 pt-4">
          <LanguageBar languages={stats.languages} />
          <dl className="flex flex-wrap gap-x-6 gap-y-1.5 text-sm text-muted">
            <div className="flex items-center gap-1.5">
              <dt className="sr-only">Estrelas</dt>
              <dd className="flex items-center gap-1.5">
                <Icon name="star" className="text-primary" /> {stats.stars}
              </dd>
            </div>
            <div className="flex items-center gap-1.5">
              <dt className="flex items-center gap-1.5">
                <Icon name="clock" className="text-primary" /> Último push
              </dt>
              <dd className="text-white">
                <TimeAgo iso={stats.pushedAt} />
              </dd>
            </div>
            {stats.myCommits !== null && (
              <div className="flex items-center gap-1.5">
                <dt className="flex items-center gap-1.5">
                  <Icon name="branch" className="text-primary" /> Meus commits
                </dt>
                <dd className="text-white">{stats.myCommits}</dd>
              </div>
            )}
          </dl>
        </div>
      ) : (
        <p className="border-t border-white/10 pt-4 text-sm text-muted">
          Métricas do GitHub indisponíveis no momento.
        </p>
      )}
    </div>
  );
}
