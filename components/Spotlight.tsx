"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";

/** Brilho dourado que segue o cursor. Só aparece em dispositivos com mouse. */
export function Spotlight() {
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const sx = useSpring(x, { stiffness: 120, damping: 20, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 120, damping: 20, mass: 0.3 });
  const background = useMotionTemplate`radial-gradient(520px circle at ${sx}px ${sy}px, rgb(255 202 137 / 0.09), transparent 70%)`;

  useEffect(() => {
    const query = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!query.matches || reduce.matches) return;
    setEnabled(true);

    const onMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [x, y]);

  if (!enabled) return null;
  return <motion.div aria-hidden style={{ background }} className="pointer-events-none fixed inset-0 z-10" />;
}
