"use client";

import { useEffect } from "react";

/** Grade técnica + brilhos ambiente. O brilho central acompanha o cursor. */
export function Background() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    let frame = 0;
    const onMove = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const root = document.documentElement.style;
        root.setProperty("--mx", `${(event.clientX / window.innerWidth) * 100}%`);
        root.setProperty("--my", `${(event.clientY / window.innerHeight) * 100}%`);
      });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="bg-grid absolute inset-0" />
      <div
        className="absolute inset-0 transition-[background] duration-300"
        style={{
          background:
            "radial-gradient(600px circle at var(--mx) var(--my), rgb(0 229 255 / 0.07), transparent 60%)",
        }}
      />
      <div className="absolute -top-40 left-1/4 h-[28rem] w-[28rem] animate-float rounded-full bg-violet/15 blur-3xl" />
      <div className="absolute top-1/3 -right-40 h-[26rem] w-[26rem] animate-float rounded-full bg-cyan/10 blur-3xl [animation-delay:-4s]" />
    </div>
  );
}
