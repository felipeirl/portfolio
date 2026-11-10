"use client";

import Image from "next/image";
import type { CaseStudy } from "@/data/cases";
import { profile } from "@/data/profile";
import { ArchitectureDiagram } from "./architecture-diagram";
import { ArrowUpRight, Github } from "./icons";
import { useLocale } from "./locale";
import { PageShell } from "./page-shell";

const labels = {
  problem: { pt: "Problema", en: "Problem" },
  decisions: { pt: "Decisões", en: "Decisions" },
  stack: { pt: "Stack", en: "Stack" },
  screens: { pt: "Telas", en: "Screens" },
  arch: { pt: "Arquitetura", en: "Architecture" },
  code: { pt: "Código", en: "Code" },
};

function Body({ item }: { item: CaseStudy }) {
  const { t } = useLocale();

  return (
    <article>
      <p className="mb-3 font-accent text-2xl text-primary italic">{t(item.kicker)}</p>
      <h1 className="font-heading text-6xl leading-none uppercase sm:text-8xl">{item.title}</h1>
      <p className="mt-6 max-w-2xl text-xl leading-relaxed text-muted">{t(item.summary)}</p>

      <ul className="mt-6 flex flex-wrap gap-2" aria-label={t(labels.stack)}>
        {item.stack.map((tag) => (
          <li
            key={tag}
            className="rounded-full bg-primary px-3 py-1 text-xs font-semibold tracking-widest text-bg uppercase"
          >
            {tag}
          </li>
        ))}
      </ul>

      <div className="mt-10 grid gap-6 md:grid-cols-[1fr_1.4fr]">
        <section className="glass p-8">
          <h2 className="font-accent text-2xl text-primary italic">{t(labels.problem)}</h2>
          <p className="mt-3 leading-relaxed text-muted">{t(item.problem)}</p>
        </section>
        <section className="glass p-8">
          <h2 className="font-accent text-2xl text-primary italic">{t(labels.decisions)}</h2>
          <ul className="mt-3 space-y-3 leading-relaxed text-muted">
            {item.decisions.map((decision) => (
              <li key={decision.pt} className="flex gap-3">
                <span aria-hidden className="mt-2.5 size-1.5 flex-none rounded-full bg-primary" />
                {t(decision)}
              </li>
            ))}
          </ul>
        </section>
      </div>

      {item.diagram === "assemble" && (
        <section className="glass mt-6 p-8">
          <h2 className="font-accent text-2xl text-primary italic">{t(labels.arch)}</h2>
          <div className="mt-4 overflow-x-auto">
            <ArchitectureDiagram />
          </div>
        </section>
      )}

      {item.screenshots && (
        <section className="mt-10">
          <h2 className="font-accent text-2xl text-primary italic">{t(labels.screens)}</h2>
          <ul className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
            {item.screenshots.map((shot) => (
              <li key={shot.src} className="glass overflow-hidden p-2">
                <Image
                  src={shot.src}
                  alt={t(shot.alt)}
                  width={360}
                  height={780}
                  className="h-auto w-full rounded-2xl"
                />
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="mt-10 flex flex-wrap gap-3">
        {item.repos.map((repo) => (
          <a
            key={repo.name}
            href={`${profile.links.github}/${repo.name}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border-2 border-fg px-6 py-3 font-semibold transition-colors hover:border-primary hover:text-primary active:scale-95"
          >
            <Github className="size-5" />
            {t(repo.label)}: {repo.name}
            <ArrowUpRight className="size-4" />
          </a>
        ))}
      </div>
    </article>
  );
}

export function CaseView({ item }: { item: CaseStudy }) {
  return (
    <PageShell>
      <Body item={item} />
    </PageShell>
  );
}
