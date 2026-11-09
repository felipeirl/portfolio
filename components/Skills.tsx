"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { allSkills, skillGroups, type Skill } from "@/data/skills";
import { Reveal } from "./Reveal";

const ALL = "todas";

function SkillCard({ skill }: { skill: Skill }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -10 }}
      className="skill-card glass flex flex-col items-center justify-center gap-4 rounded-[20px] px-4 py-8 hover:border-primary"
    >
      <i className={`${skill.icon} colored skill-icon`} aria-hidden />
      <span className="text-sm font-semibold tracking-wide">{skill.name}</span>
    </motion.div>
  );
}

export function Skills() {
  const [group, setGroup] = useState<string>(ALL);
  const tabs = [{ id: ALL, label: "Todas" }, ...skillGroups.map(({ id, label }) => ({ id, label }))];
  const visible =
    group === ALL ? allSkills : (skillGroups.find((g) => g.id === group)?.skills ?? allSkills);

  return (
    <section id="habilidades" className="relative bg-gradient-to-b from-transparent via-bg/95 to-transparent py-32">
      <div className="mx-auto w-[90%] max-w-[1280px] text-center">
        <Reveal>
          <h2 className="section-title mb-6">Habilidades Técnicas</h2>
          <p className="mx-auto mb-10 max-w-xl text-lg text-muted">
            Linguagens, ferramentas e tecnologias que uso e estudo atualmente.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div role="tablist" aria-label="Filtrar habilidades" className="mb-10 flex flex-wrap justify-center gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                type="button"
                aria-selected={group === tab.id}
                onClick={() => setGroup(tab.id)}
                className={`relative rounded-full border px-5 py-2 text-sm font-medium transition-colors ${
                  group === tab.id
                    ? "border-transparent text-bg"
                    : "border-line text-muted hover:text-white"
                }`}
              >
                {group === tab.id && (
                  <motion.span
                    layoutId="skill-tab"
                    className="absolute inset-0 rounded-full bg-primary"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative">{tab.label}</span>
              </button>
            ))}
          </div>
        </Reveal>

        <motion.div layout className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          <AnimatePresence mode="popLayout">
            {visible.map((skill) => (
              <SkillCard key={skill.name} skill={skill} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
