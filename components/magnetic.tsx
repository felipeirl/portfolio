"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useMotionPref } from "./motion-pref";

interface MagneticProps {
  children: ReactNode;
  /** Fração da distância até o cursor que o elemento percorre. */
  pull?: number;
  /** Distância, além da borda do elemento, a partir da qual ele reage. */
  reach?: number;
}

const DEFAULT_PULL = 0.3;
const DEFAULT_REACH_PX = 110;

/** O elemento se aproxima do cursor ao chegar perto e volta ao largar. Só com ponteiro fino. */
export function Magnetic({ children, pull = DEFAULT_PULL, reach = DEFAULT_REACH_PX }: MagneticProps) {
  const anchorRef = useRef<HTMLSpanElement>(null);
  const moverRef = useRef<HTMLSpanElement>(null);
  const { reduced } = useMotionPref();

  useEffect(() => {
    const anchor = anchorRef.current;
    const mover = moverRef.current;
    if (!anchor || !mover || reduced) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let frame = 0;
    let pointer: PointerEvent | null = null;

    const update = () => {
      frame = 0;
      if (!pointer) return;
      // mede a âncora, que não se move, para o efeito não realimentar a própria posição
      const rect = anchor.getBoundingClientRect();
      const dx = pointer.clientX - (rect.left + rect.width / 2);
      const dy = pointer.clientY - (rect.top + rect.height / 2);
      const limit = reach + Math.max(rect.width, rect.height) / 2;
      mover.style.transform =
        Math.hypot(dx, dy) < limit ? `translate3d(${dx * pull}px, ${dy * pull}px, 0)` : "";
    };

    const onMove = (event: PointerEvent) => {
      pointer = event;
      if (!frame) frame = requestAnimationFrame(update);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
      mover.style.transform = "";
    };
  }, [reduced, pull, reach]);

  return (
    <span ref={anchorRef} className="inline-block">
      <span ref={moverRef} className="inline-block transition-transform duration-300 ease-out">
        {children}
      </span>
    </span>
  );
}
