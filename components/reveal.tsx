import type { CSSProperties, ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  /** Atraso em fração da faixa de entrada (0.08 desloca o início em 8%). */
  delay?: number;
  className?: string;
}

const PERCENT = 100;

/**
 * Entrada guiada pelo scroll em CSS (animation-timeline: view()). Sem JavaScript por quadro;
 * em navegadores sem suporte o conteúdo simplesmente aparece, sem animação.
 */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  const style = delay ? ({ "--reveal-delay": `${delay * PERCENT}%` } as CSSProperties) : undefined;

  return (
    <div className={`reveal ${className ?? ""}`} style={style}>
      {children}
    </div>
  );
}
