"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import { experience } from "@/data/experience";
import { Reveal } from "./Reveal";

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });

  return (
    <section id="experiencia" className="relative py-32">
      <div className="mx-auto w-[90%] max-w-[1280px]">
        <Reveal className="mb-16">
          <h2 className="section-title mb-6">Experiência Profissional</h2>
          <p className="max-w-xl text-lg text-muted">Minha jornada no mercado de tecnologia.</p>
        </Reveal>

        <div ref={ref} className="relative mx-auto max-w-3xl">
          <div aria-hidden className="absolute top-0 left-5 h-full w-0.5 bg-primary/10" />
          <motion.div
            aria-hidden
            style={{ scaleY }}
            className="absolute top-0 left-5 h-full w-0.5 origin-top bg-gradient-to-b from-primary to-primary/30"
          />

          {experience.map((item, i) => (
            <Reveal key={`${item.company}-${item.period}`} delay={i * 0.1} className="relative pl-16">
              <motion.span
                aria-hidden
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.2 }}
                className="absolute top-8 left-3 h-[18px] w-[18px] rounded-full border-4 border-primary bg-bg shadow-[0_0_15px_rgb(255_202_137/0.5)]"
              />
              <article className="glass rounded-3xl p-8 transition-all duration-500 ease-bounce hover:-translate-y-1 hover:border-primary/30 sm:p-10">
                <span className="mb-2 inline-block text-sm font-bold tracking-wider text-primary uppercase">
                  {item.period}
                </span>
                <h3 className="text-2xl">{item.title}</h3>
                <h4 className="mb-4 font-accent text-lg text-muted">{item.company}</h4>
                <p className="text-muted">{item.description}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {item.highlights.map((h) => (
                    <li key={h} className="rounded-full border border-line px-3 py-1 text-xs text-muted">
                      {h}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
