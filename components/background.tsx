"use client";

import { useEffect } from "react";

/** Mesma ordem de preferência do image-set do CSS: AVIF primeiro, JPEG como reserva. */
const SOURCES = ["/images/pilares-hq.avif", "/images/pilares-hq.jpg"];
const READY_TIMEOUT_MS = 4000;

/**
 * Pilares da Criação: uma cópia no topo e outra espelhada na base da página.
 * Um placeholder borrado aparece de imediato e a imagem real entra com fade quando está decodificada.
 */
export function Background() {
  useEffect(() => {
    let cancelled = false;
    const root = document.documentElement;
    const markReady = () => {
      if (!cancelled) root.classList.add("bg-ready");
    };
    const timer = window.setTimeout(markReady, READY_TIMEOUT_MS);

    const load = (index: number) => {
      const image = new Image();
      image.decoding = "async";
      image.src = SOURCES[index] ?? "";
      image
        .decode()
        .then(() => {
          window.clearTimeout(timer);
          markReady();
        })
        .catch(() => {
          if (index + 1 < SOURCES.length) load(index + 1);
        });
    };
    load(0);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="bg-pillars bg-pillars-top" />
      <div className="bg-pillars bg-pillars-bottom" />
    </div>
  );
}
