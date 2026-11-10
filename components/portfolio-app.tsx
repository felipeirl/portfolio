"use client";

import { useEffect, useState } from "react";
import { strings } from "@/data/strings";
import type { GithubSnapshot } from "@/lib/github";
import { Background } from "./background";
import { CommandPalette } from "./command-palette";
import { Contact } from "./contact";
import { Experience } from "./experience";
import { Footer } from "./footer";
import { Hero } from "./hero";
import { LocaleProvider, useLocale } from "./locale";
import { Marquee } from "./marquee";
import { MotionPrefProvider } from "./motion-pref";
import { Nav } from "./nav";
import { PointerParallax } from "./pointer-parallax";
import { Projects } from "./projects";
import { Skills } from "./skills";

interface PortfolioAppProps {
  github: GithubSnapshot;
}

function Shell({ github }: PortfolioAppProps) {
  const { t } = useLocale();
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setPaletteOpen((open) => !open);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-bg"
      >
        {t(strings.skipToContent)}
      </a>
      <Background />
      <PointerParallax />
      <Nav onOpenPalette={() => setPaletteOpen(true)} />
      <main id="main">
        <Hero github={github} />
        <Marquee />
        <Skills />
        <Experience />
        <Projects github={github} />
        <Contact />
      </main>
      <Footer />
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </>
  );
}

export function PortfolioApp({ github }: PortfolioAppProps) {
  return (
    <LocaleProvider>
      <MotionPrefProvider>
        <Shell github={github} />
      </MotionPrefProvider>
    </LocaleProvider>
  );
}
