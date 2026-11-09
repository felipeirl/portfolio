import type { ActivityItem } from "@/lib/github";
import { site } from "@/lib/site";
import { Reveal } from "./Reveal";
import { TimeAgo } from "./TimeAgo";

const PACMAN_BASE = `https://raw.githubusercontent.com/${site.githubUser}/${site.githubUser}/output`;

export function Activity({ items }: { items: ActivityItem[] }) {
  return (
    <section id="atividade" className="relative py-32">
      <div className="mx-auto w-[90%] max-w-[1280px]">
        <Reveal className="mb-14">
          <h2 className="section-title mb-6">Atividade ao Vivo</h2>
          <p className="max-w-xl text-lg text-muted">
            Os últimos commits públicos, direto da API do GitHub, e o gráfico de contribuições
            como jogo de Pac-Man.
          </p>
        </Reveal>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
          <Reveal>
            <div className="glass rounded-3xl p-8">
              <h3 className="mb-6 flex items-center gap-3 text-xl">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
                </span>
                Commits recentes
              </h3>

              {items.length === 0 ? (
                <p className="text-muted">Atividade indisponível no momento.</p>
              ) : (
                <ol className="divide-y divide-line">
                  {items.map((item) => (
                    <li key={item.id} className="py-4 first:pt-0 last:pb-0">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block"
                      >
                        <p className="truncate font-medium transition-colors group-hover:text-primary">
                          {item.message}
                        </p>
                        <p className="mt-1 flex flex-wrap gap-x-3 font-mono text-xs text-muted">
                          <span>{item.repo}</span>
                          <TimeAgo iso={item.createdAt} />
                        </p>
                      </a>
                    </li>
                  ))}
                </ol>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="glass flex h-full flex-col justify-center rounded-3xl p-6">
              <picture>
                <source
                  media="(prefers-color-scheme: light)"
                  srcSet={`${PACMAN_BASE}/pacman-contribution-graph.svg`}
                />
                <img
                  src={`${PACMAN_BASE}/pacman-contribution-graph-dark.svg`}
                  alt="Pac-Man percorrendo o gráfico de contribuições do GitHub"
                  loading="lazy"
                  className="w-full"
                />
              </picture>
              <a
                href={site.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 self-end text-sm font-semibold text-primary transition hover:underline"
              >
                Ver perfil completo →
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
