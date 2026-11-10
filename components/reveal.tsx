"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useMotionPref } from "./motion-pref";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

const REVEAL_OFFSET_PX = 24;
const REVEAL_DURATION_S = 0.6;

export function Reveal({ children, delay = 0, className }: RevealProps) {
  const { reduced: reduceMotion } = useMotionPref();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: REVEAL_OFFSET_PX }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: REVEAL_DURATION_S, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
