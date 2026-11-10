import type { MouseEvent } from "react";

const MAX_TILT_DEG = 6;

/**
 * Escreve nas variáveis do card a posição do cursor (--sx e --sy, usadas pelo holofote)
 * e a inclinação 3D (--rx e --ry, usadas por .tilt).
 */
export function trackSpotlight(event: MouseEvent<HTMLElement>): void {
  const card = event.currentTarget;
  const rect = card.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  card.style.setProperty("--sx", `${x}px`);
  card.style.setProperty("--sy", `${y}px`);
  card.style.setProperty("--ry", `${(x / rect.width - 0.5) * 2 * MAX_TILT_DEG}deg`);
  card.style.setProperty("--rx", `${-(y / rect.height - 0.5) * 2 * MAX_TILT_DEG}deg`);
}

/** Devolve o card à posição neutra quando o cursor sai. */
export function resetTilt(event: MouseEvent<HTMLElement>): void {
  event.currentTarget.style.setProperty("--rx", "0deg");
  event.currentTarget.style.setProperty("--ry", "0deg");
}
