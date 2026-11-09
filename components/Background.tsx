"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";

/** Fundo dos pilares com parallax ligado ao progresso de rolagem da página. */
export function Background() {
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 20, mass: 0.4 });
  const y = useTransform(smooth, [0, 1], ["0%", "-55%"]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-20 overflow-hidden bg-bg">
      <motion.img
        src="/images/pilares.jpg"
        alt=""
        style={{ y }}
        className="absolute top-0 left-0 h-auto w-full opacity-75 saturate-[0.8] contrast-[1.1]"
        fetchPriority="low"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-bg/30 via-bg/40 to-bg/70" />
    </div>
  );
}
