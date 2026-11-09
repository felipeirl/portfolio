"use client";

import { profile } from "@/data/profile";
import { strings } from "@/data/strings";
import { Github, Linkedin } from "./icons";
import { useLocale } from "./locale";

export function Footer() {
  const { t } = useLocale();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 text-sm text-muted sm:flex-row sm:px-8">
        <p>
          © {year} {profile.name}. {t(strings.footer.built)}
        </p>
        <div className="flex items-center gap-5">
          <a
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-xl transition-colors hover:text-fg"
          >
            <Github />
          </a>
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-xl transition-colors hover:text-fg"
          >
            <Linkedin />
          </a>
          <a href="#top" className="font-mono text-xs transition-colors hover:text-cyan">
            {t(strings.footer.top)}
          </a>
        </div>
      </div>
    </footer>
  );
}
