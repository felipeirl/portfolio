"use client";

import { useEffect } from "react";
import { useMotionPref } from "./motion-pref";

const ACTIVE_UNTIL_VIEWPORTS = 1.2;
const BG_SHIFT = { x: -14, y: -10 };
const TITLE_SHIFT = { x: 8, y: 5 };
const BG_SCALE = 1.03;

/**
 * Desloca o fundo e o título do hero conforme o ponteiro, perto do topo da página. Só com ponteiro fino.
 * O transform vai direto nos dois elementos: escrever variáveis CSS na raiz refaria o estilo da página inteira.
 */
export function PointerParallax() {
  const { reduced } = useMotionPref();

  useEffect(() => {
    if (reduced || !window.matchMedia("(pointer: fine)").matches) return;

    const bg = document.querySelector<HTMLElement>(".bg-pillars-top");
    const title = document.querySelector<HTMLElement>(".hero-title");
    if (!bg && !title) return;

    const root = document.documentElement;
    root.classList.add("pointer-parallax");

    let frame = 0;
    let pointer: PointerEvent | null = null;

    const apply = (x: number, y: number) => {
      if (bg) {
        bg.style.transform = `translate3d(${x * BG_SHIFT.x}px, ${y * BG_SHIFT.y}px, 0) scale(${BG_SCALE})`;
      }
      if (title) title.style.transform = `translate3d(${x * TITLE_SHIFT.x}px, ${y * TITLE_SHIFT.y}px, 0)`;
    };

    const update = () => {
      frame = 0;
      if (!pointer || window.scrollY > window.innerHeight * ACTIVE_UNTIL_VIEWPORTS) return;
      apply(
        (pointer.clientX / window.innerWidth - 0.5) * 2,
        (pointer.clientY / window.innerHeight - 0.5) * 2,
      );
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
      if (bg) bg.style.transform = "";
      if (title) title.style.transform = "";
    };
  }, [reduced]);

  return null;
}
