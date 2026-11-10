"use client";

import { useEffect } from "react";

const MIN_DURATION_MS = 500;
const MAX_DURATION_MS = 1100;
const PX_PER_MS = 4;
const HEADER_OFFSET_PX = 80;

const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/**
 * Anima a rolagem até a seção quando se clica num link de âncora (menu, botões, rodapé).
 * Roda só durante o clique e para se a pessoa rolar, tocar ou usar o teclado. Com movimento
 * reduzido, ou sem o alvo na página, deixa o navegador agir normalmente.
 */
export function AnchorScroll() {
  useEffect(() => {
    let frame = 0;

    const cancel = () => cancelAnimationFrame(frame);

    const scrollTo = (target: HTMLElement) => {
      cancel();
      const from = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const to = Math.min(max, Math.max(0, target.getBoundingClientRect().top + from - HEADER_OFFSET_PX));
      const distance = Math.abs(to - from);
      const duration = Math.min(MAX_DURATION_MS, Math.max(MIN_DURATION_MS, distance / PX_PER_MS));
      const start = performance.now();

      const step = (now: number) => {
        const progress = Math.min(1, (now - start) / duration);
        window.scrollTo({ top: from + (to - from) * easeInOutCubic(progress), behavior: "instant" });
        if (progress < 1) frame = requestAnimationFrame(step);
      };
      frame = requestAnimationFrame(step);
    };

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (document.documentElement.dataset.motion === "reduced") return;

      const link = (event.target as Element | null)?.closest<HTMLAnchorElement>("a[href]");
      if (!link) return;
      const href = link.getAttribute("href") ?? "";
      const hash = href.startsWith("/#") ? href.slice(1) : href;
      if (!hash.startsWith("#") || hash.length < 2) {
        if (hash !== "#top") return;
      }
      if (href.startsWith("/#") && window.location.pathname !== "/") return;

      const target = hash === "#top" ? document.getElementById("top") : document.getElementById(hash.slice(1));
      if (!target) return;

      event.preventDefault();
      scrollTo(target);
      history.pushState(null, "", hash);
    };

    document.addEventListener("click", onClick);
    window.addEventListener("wheel", cancel, { passive: true });
    window.addEventListener("touchstart", cancel, { passive: true });
    window.addEventListener("keydown", cancel);
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("wheel", cancel);
      window.removeEventListener("touchstart", cancel);
      window.removeEventListener("keydown", cancel);
      cancel();
    };
  }, []);

  return null;
}
