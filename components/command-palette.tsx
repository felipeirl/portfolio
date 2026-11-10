"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { profile } from "@/data/profile";
import { sectionLinks, strings } from "@/data/strings";
import { Github, Languages, Linkedin, Search, Zap, ZapOff } from "./icons";
import { useLocale } from "./locale";
import { useMotionPref } from "./motion-pref";

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

interface Command {
  id: string;
  group: string;
  label: string;
  icon: React.ReactNode;
  run: () => void;
}

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const { t, toggleLocale } = useLocale();
  const { reduced: motionReduced, toggle: toggleMotion } = useMotionPref();
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<Element | null>(null);

  const commands = useMemo<Command[]>(() => {
    const navigate = sectionLinks.map<Command>((link) => ({
      id: `go-${link.id}`,
      group: t(strings.palette.navigate),
      label: t(link.label),
      icon: <Search className="size-4" />,
      run: () => {
        document.getElementById(link.id)?.scrollIntoView({ behavior: "smooth" });
      },
    }));

    return [
      ...navigate,
      {
        id: "open-github",
        group: t(strings.palette.links),
        label: "GitHub",
        icon: <Github className="size-4" />,
        run: () => window.open(profile.links.github, "_blank", "noopener,noreferrer"),
      },
      {
        id: "open-linkedin",
        group: t(strings.palette.links),
        label: "LinkedIn",
        icon: <Linkedin className="size-4" />,
        run: () => window.open(profile.links.linkedin, "_blank", "noopener,noreferrer"),
      },
      {
        id: "toggle-lang",
        group: t(strings.palette.settings),
        label: t(strings.palette.toggleLang),
        icon: <Languages className="size-4" />,
        run: toggleLocale,
      },
      {
        id: "toggle-motion",
        group: t(strings.palette.settings),
        label: t(motionReduced ? strings.motion.restore : strings.motion.reduce),
        icon: motionReduced ? <Zap className="size-4" /> : <ZapOff className="size-4" />,
        run: toggleMotion,
      },
    ];
  }, [t, toggleLocale, motionReduced, toggleMotion]);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return commands;
    return commands.filter((command) => command.label.toLowerCase().includes(needle));
  }, [commands, query]);

  useEffect(() => {
    if (!open) return;
    triggerRef.current = document.activeElement;
    setQuery("");
    setCursor(0);
    inputRef.current?.focus();
    return () => {
      if (triggerRef.current instanceof HTMLElement) triggerRef.current.focus();
    };
  }, [open]);

  useEffect(() => {
    setCursor(0);
  }, [query]);

  const runCommand = (command: Command | undefined) => {
    if (!command) return;
    onClose();
    command.run();
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      event.preventDefault();
      onClose();
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      setCursor((current) => (filtered.length ? (current + 1) % filtered.length : 0));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setCursor((current) =>
        filtered.length ? (current - 1 + filtered.length) % filtered.length : 0,
      );
    } else if (event.key === "Enter") {
      event.preventDefault();
      runCommand(filtered[cursor]);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-start justify-center bg-bg/70 px-4 pt-[15vh] backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={t(strings.openPalette)}
            onKeyDown={onKeyDown}
            className="glass w-full max-w-xl overflow-hidden bg-surface/90 shadow-2xl"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.18 }}
          >
            <div className="flex items-center gap-3 border-b border-line px-4">
              <Search className="size-5 text-muted" />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={t(strings.palette.placeholder)}
                aria-label={t(strings.palette.placeholder)}
                role="combobox"
                aria-expanded="true"
                aria-controls="palette-list"
                aria-activedescendant={filtered[cursor] ? `cmd-${filtered[cursor].id}` : undefined}
                className="h-14 flex-1 bg-transparent text-fg outline-none placeholder:text-muted"
              />
              <kbd className="rounded border border-line px-1.5 py-0.5 font-mono text-xs text-muted">
                Esc
              </kbd>
            </div>

            <ul id="palette-list" role="listbox" className="max-h-80 overflow-y-auto p-2">
              {filtered.length === 0 && (
                <li className="px-3 py-6 text-center text-sm text-muted">
                  {t(strings.palette.empty)}
                </li>
              )}
              {filtered.map((command, index) => (
                <li
                  key={command.id}
                  id={`cmd-${command.id}`}
                  role="option"
                  aria-selected={index === cursor}
                >
                  <button
                    type="button"
                    onMouseMove={() => setCursor(index)}
                    onClick={() => runCommand(command)}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                      index === cursor ? "bg-primary/10 text-primary" : "text-fg"
                    }`}
                  >
                    {command.icon}
                    <span className="flex-1">{command.label}</span>
                    <span className="font-mono text-xs text-muted">{command.group}</span>
                  </button>
                </li>
              ))}
            </ul>

            <p className="border-t border-line px-4 py-2.5 font-mono text-xs text-muted">
              {t(strings.palette.hint)}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
