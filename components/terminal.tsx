"use client";

import { useRef, useState, type FormEvent } from "react";
import { featuredProjects, profile, skillGroups, type Localized } from "@/data/profile";
import { useLocale } from "./locale";
import { TypingLines } from "./typing-lines";

interface Line {
  kind: "cmd" | "out";
  text: string;
}

const MAX_LINES = 60;

const copy = {
  placeholder: { pt: "digite help", en: "type help" } satisfies Localized,
  label: { pt: "Comando do terminal", en: "Terminal command" } satisfies Localized,
  notFound: {
    pt: "comando não encontrado. Tente help.",
    en: "command not found. Try help.",
  } satisfies Localized,
  help: {
    pt: "comandos: help, sobre, projetos, stack, contato, clear",
    en: "commands: help, about, projects, stack, contact, clear",
  } satisfies Localized,
  hint: {
    pt: "Dica: clique aqui e digite help.",
    en: "Tip: click here and type help.",
  } satisfies Localized,
};

/** Cartão do hero: introdução animada e um prompt que aceita alguns comandos. */
export function Terminal() {
  const { locale, t } = useLocale();
  const [lines, setLines] = useState<Line[]>([]);
  const [value, setValue] = useState("");
  const outRef = useRef<HTMLDivElement>(null);

  const answers = (command: string): string | null => {
    switch (command) {
      case "help":
        return t(copy.help);
      case "sobre":
      case "about":
        return `${profile.name} — ${t(profile.role)}\n${t(profile.headline)}`;
      case "projetos":
      case "projects":
        return featuredProjects
          .map((project) => `${project.repo.padEnd(22)} ${t(project.description)}`)
          .join("\n");
      case "stack":
        return skillGroups.map((group) => `${t(group.title)}: ${group.labels.join(", ")}`).join("\n");
      case "contato":
      case "contact":
        return `${profile.links.linkedin}\n${profile.links.github}`;
      default:
        return null;
    }
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const command = value.trim().toLowerCase();
    setValue("");
    if (!command) return;
    if (command === "clear") {
      setLines([]);
      return;
    }
    const answer = answers(command) ?? `${command}: ${t(copy.notFound)}`;
    setLines((current) =>
      [...current, { kind: "cmd" as const, text: command }, { kind: "out" as const, text: answer }].slice(
        -MAX_LINES,
      ),
    );
    requestAnimationFrame(() => {
      const out = outRef.current;
      if (out) out.scrollTop = out.scrollHeight;
    });
  };

  return (
    <div className="glass overflow-hidden">
      <div className="flex items-center gap-2 border-b border-line px-5 py-3.5">
        <span className="size-3 rounded-full bg-[#ff5f56]" aria-hidden />
        <span className="size-3 rounded-full bg-[#ffbd2e]" aria-hidden />
        <span className="size-3 rounded-full bg-[#27c93f]" aria-hidden />
        <span className="ml-3 font-mono text-xs text-muted">felipe@portfolio:~</span>
      </div>

      <div className="space-y-3 p-6 font-mono text-sm leading-relaxed">
        <div aria-hidden className="space-y-3">
          <p>
            <span className="text-primary">$</span> whoami
          </p>
          <p className="text-muted">
            {profile.name} — {t(profile.role)}
          </p>
          <p>
            <span className="text-primary">$</span> cat focus.txt
          </p>
          <p className="min-h-[1.5em] text-fg">
            <TypingLines lines={profile.typing[locale]} />
          </p>
        </div>

        <div
          ref={outRef}
          aria-live="polite"
          className="max-h-44 space-y-1 overflow-y-auto whitespace-pre-wrap"
        >
          {lines.map((line, index) =>
            line.kind === "cmd" ? (
              <p key={index}>
                <span className="text-primary">$</span> {line.text}
              </p>
            ) : (
              <p key={index} className="text-muted">
                {line.text}
              </p>
            ),
          )}
        </div>

        <form onSubmit={onSubmit} className="flex items-center gap-2">
          <label htmlFor="terminal-input" className="text-primary">
            $
            <span className="sr-only">{t(copy.label)}</span>
          </label>
          <input
            id="terminal-input"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder={t(copy.placeholder)}
            autoComplete="off"
            spellCheck={false}
            className="min-w-0 flex-1 bg-transparent text-fg outline-none placeholder:text-muted/60"
          />
        </form>
        {lines.length === 0 && <p className="text-xs text-muted/70">{t(copy.hint)}</p>}
      </div>
    </div>
  );
}
