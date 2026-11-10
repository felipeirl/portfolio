"use client";

import { useEffect } from "react";
import { useMotionPref } from "./motion-pref";

const ACTIVE_UNTIL_VIEWPORTS = 1.2;

/**
 * Escreve --mx e --my (de -1 a 1) na raiz enquanto o ponteiro se move perto do topo da página.
 * O CSS usa as duas variáveis para deslocar o fundo e o título do hero. Só com ponteiro fino.
 */
export function PointerParallax() {
  const { reduced } = useMotionPref();

  useEffect(() => {
    if (reduced || !window.matchMedia("(pointer: fine)").matches) return;

    const root = document.documentElement;
    root.classList.add("pointer-parallax");

    let frame = 0;
    let pointer: PointerEvent | null = null;

    const update = () => {
      frame = 0;
      if (!pointer || window.scrollY > window.innerHeight * ACTIVE_UNTIL_VIEWPORTS) return;
      root.style.setProperty("--mx", String((pointer.clientX / window.innerWidth - 0.5) * 2));
      root.style.setProperty("--my", String((pointer.clientY / window.innerHeight - 0.5) * 2));
    };

    const onMove = (event: PointerEvent) => {
      pointer = event;
      if (!frame) frame = requestAnimationFrame(update);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
      root.classList.remove("pointer-parallax");
      root.style.removeProperty("--mx");
      root.style.removeProperty("--my");
    };
  }, [reduced]);

  return null;
}
