"use client";

import { useEffect, useRef, useState } from "react";
import { useMotionPref } from "./motion-pref";

interface CountUpProps {
  value: number;
  durationMs?: number;
}

const DEFAULT_DURATION_MS = 1200;
const VISIBLE_THRESHOLD = 0.6;

/** Sobe de zero até o valor quando entra na tela. O HTML já nasce com o valor final. */
export function CountUp({ value, durationMs = DEFAULT_DURATION_MS }: CountUpProps) {
  const [shown, setShown] = useState(value);
  const ref = useRef<HTMLSpanElement>(null);
  const { reduced } = useMotionPref();

  useEffect(() => {
    if (reduced) setShown(value);
  }, [reduced, value]);

  useEffect(() => {
    const node = ref.current;
    if (!node || reduced) return;

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const step = (now: number) => {
          const progress = Math.min(1, (now - start) / durationMs);
          setShown(Math.round(value * (1 - Math.pow(1 - progress, 3))));
          if (progress < 1) frame = requestAnimationFrame(step);
        };
        setShown(0);
        frame = requestAnimationFrame(step);
      },
      { threshold: VISIBLE_THRESHOLD },
    );
    observer.observe(node);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, durationMs, reduced]);

  return <span ref={ref}>{shown}</span>;
}
