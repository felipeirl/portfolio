import { projects } from "@/data/projects";
import type { RepoStats } from "@/lib/github";
import { ProjectShowcase } from "./ProjectShowcase";
import { Reveal } from "./Reveal";

export function Projects({ stats }: { stats: Record<string, RepoStats | null> }) {
  return (
    <section id="projetos" className="relative bg-gradient-to-b from-transparent via-bg/95 to-transparent py-32">
      <div className="mx-auto w-[90%] max-w-[1280px]">
        <Reveal className="mb-20">
          <h2 className="section-title mb-6">Projetos em Destaque</h2>
          <p className="max-w-xl text-lg text-muted">
            Aplicações que construí. Releases, linguagens e atividade vêm ao vivo do GitHub.
          </p>
        </Reveal>

        <div className="space-y-32">
          {projects.map((project, index) => (
            <ProjectShowcase key={project.id} project={project} stats={stats} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
