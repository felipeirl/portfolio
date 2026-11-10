"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const STORAGE_KEY = "portfolio-motion";

interface MotionPrefValue {
  /** true quando a pessoa pediu menos movimento neste site. */
  reduced: boolean;
  toggle: () => void;
}

const MotionPrefContext = createContext<MotionPrefValue | null>(null);

function readStoredReduced(): boolean {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "reduced";
  } catch {
    return false;
  }
}

function writeStoredReduced(reduced: boolean): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, reduced ? "reduced" : "full");
  } catch {
    // armazenamento indisponível (modo privado): a escolha vale só nesta sessão
  }
}

/**
 * Preferência de movimento do site. O padrão é animar, sem seguir a configuração do
 * sistema; quem quiser menos movimento usa o botão do menu, e a escolha fica guardada.
 */
export function MotionPrefProvider({ children }: { children: ReactNode }) {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(readStoredReduced());
  }, []);

  useEffect(() => {
    document.documentElement.dataset.motion = reduced ? "reduced" : "full";
  }, [reduced]);

  const toggle = useCallback(() => {
    const next = !reduced;
    setReduced(next);
    writeStoredReduced(next);
  }, [reduced]);

  const value = useMemo<MotionPrefValue>(() => ({ reduced, toggle }), [reduced, toggle]);

  return <MotionPrefContext.Provider value={value}>{children}</MotionPrefContext.Provider>;
}

export function useMotionPref(): MotionPrefValue {
  const context = useContext(MotionPrefContext);
  if (!context) throw new Error("useMotionPref deve ser usado dentro de MotionPrefProvider");
  return context;
}
