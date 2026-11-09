import type { MouseEvent } from "react";

/** Atualiza --sx/--sy no card para o holofote seguir o cursor (ver .spotlight). */
export function trackSpotlight(event: MouseEvent<HTMLElement>): void {
  const rect = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty("--sx", `${event.clientX - rect.left}px`);
  event.currentTarget.style.setProperty("--sy", `${event.clientY - rect.top}px`);
}
