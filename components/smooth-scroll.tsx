"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import { useMotionPref } from "./motion-pref";

const LERP = 0.1;

/**
 * Inércia leve no scroll do mouse. Fica desligada com o botão de reduzir movimento
 * e em dispositivos de toque; o scroll nativo (teclado, barra, leitor de tela) continua igual.
 */
export function SmoothScroll() {
  const { reduced } = useMotionPref();

  useEffect(() => {
    if (reduced || !window.matchMedia("(pointer: fine)").matches) return;

    const lenis = new Lenis({ lerp: LERP, anchors: true, autoRaf: true });
    const root = document.documentElement;
    root.classList.add("lenis-on");

    return () => {
      lenis.destroy();
      root.classList.remove("lenis-on");
    };
  }, [reduced]);

  return null;
}
