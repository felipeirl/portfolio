"use client";

import { animate, useInView } from "motion/react";
import { useEffect, useRef } from "react";

type CounterProps = { value: number; className?: string };

/** Número que conta de 0 até o valor quando entra na viewport. */
export function Counter({ value, className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    const node = ref.current;
    if (!node || !inView) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      node.textContent = String(value);
      return;
    }
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        node.textContent = String(Math.round(latest));
      },
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
