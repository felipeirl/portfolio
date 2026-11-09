"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Shot = { src: string; alt: string };

const PHONE_WIDTH = 220;
const PHONE_HEIGHT = 476;

/** Faixa de capturas arrastável. O arrasto fica limitado ao conteúdo medido. */
export function ScreenshotCarousel({ shots }: { shots: Shot[] }) {
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [dragWidth, setDragWidth] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (!viewport.current || !track.current) return;
      setDragWidth(Math.max(0, track.current.scrollWidth - viewport.current.offsetWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [shots.length]);

  return (
    <div ref={viewport} className="overflow-hidden">
      <motion.div
        ref={track}
        drag="x"
        dragConstraints={{ left: -dragWidth, right: 0 }}
        dragElastic={0.08}
        whileTap={{ cursor: "grabbing" }}
        className="flex w-max cursor-grab gap-5 py-2"
      >
        {shots.map((shot) => (
          <figure
            key={shot.src}
            className="group relative shrink-0 overflow-hidden rounded-[28px] border border-line bg-black/40 shadow-2xl"
            style={{ width: PHONE_WIDTH }}
          >
            <Image
              src={shot.src}
              alt={shot.alt}
              width={PHONE_WIDTH}
              height={PHONE_HEIGHT}
              draggable={false}
              sizes={`${PHONE_WIDTH}px`}
              className="h-auto w-full select-none transition-transform duration-700 group-hover:scale-[1.03]"
            />
            <figcaption className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-black/90 to-transparent p-4 pt-10 text-center text-xs font-semibold transition-transform duration-500 group-hover:translate-y-0">
              {shot.alt}
            </figcaption>
          </figure>
        ))}
      </motion.div>
    </div>
  );
}
