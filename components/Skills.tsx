import { skillGroups } from "@/data/skills";
import { IconBadge } from "./Icon";
import { Reveal } from "./Reveal";

/** Habilidades S2: um cartão por categoria, com chips de tecnologia. */
export function Skills() {
  return (
    <section
      id="habilidades"
      className="relative bg-gradient-to-b from-transparent via-bg/95 to-transparent py-24"
    >
      <div className="mx-auto w-[90%] max-w-[1280px]">
        <Reveal className="mb-14">
          <h2 className="section-title mb-6">Habilidades Técnicas</h2>
          <p className="max-w-xl text-lg text-muted">
            Linguagens, ferramentas e tecnologias que uso e estudo atualmente.
          </p>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((group, i) => (
            <Reveal key={group.id} delay={i * 0.08} className="h-full">
              <section className="glass h-full rounded-[22px] p-6 transition-colors duration-500 hover:border-primary/40">
                <h3 className="mb-5 flex items-center gap-3 text-lg">
                  <IconBadge name={group.icon} className="size-10" />
                  {group.label}
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <li
                      key={skill.name}
                      className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 py-1.5 pr-3.5 pl-2.5 text-sm"
                    >
                      <i className={`${skill.icon} colored text-lg`} aria-hidden />
                      {skill.name}
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
