"use client";

import { useEffect, useState } from "react";

interface TypingLinesProps {
  lines: string[];
}

const TYPE_DELAY_MS = 55;
const DELETE_DELAY_MS = 28;
const HOLD_MS = 1600;
const GAP_MS = 350;

/** Digita e apaga as linhas em loop. Com movimento reduzido, mostra a primeira linha fixa. */
export function TypingLines({ lines }: TypingLinesProps) {
  const [lineIndex, setLineIndex] = useState(0);
  const [visible, setVisible] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    setLineIndex(0);
    setVisible(0);
    setDeleting(false);
  }, [lines]);

  useEffect(() => {
    if (reduceMotion) return;
    const current = lines[lineIndex] ?? "";

    let delay = deleting ? DELETE_DELAY_MS : TYPE_DELAY_MS;
    if (!deleting && visible === current.length) delay = HOLD_MS;
    if (deleting && visible === 0) delay = GAP_MS;

    const timer = window.setTimeout(() => {
      if (!deleting && visible < current.length) {
        setVisible(visible + 1);
      } else if (!deleting) {
        setDeleting(true);
      } else if (visible > 0) {
        setVisible(visible - 1);
      } else {
        setDeleting(false);
        setLineIndex((lineIndex + 1) % lines.length);
      }
    }, delay);

    return () => window.clearTimeout(timer);
  }, [lines, lineIndex, visible, deleting, reduceMotion]);

  const text = reduceMotion ? (lines[0] ?? "") : (lines[lineIndex] ?? "").slice(0, visible);

  return (
    <span>
      {text}
      <span aria-hidden className="ml-0.5 inline-block w-2 animate-blink bg-cyan">
        &nbsp;
      </span>
    </span>
  );
}
