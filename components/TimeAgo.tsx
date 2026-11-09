"use client";

import { useEffect, useState } from "react";

const UNITS: [Intl.RelativeTimeFormatUnit, number][] = [
  ["year", 31_536_000],
  ["month", 2_592_000],
  ["day", 86_400],
  ["hour", 3_600],
  ["minute", 60],
];

function format(iso: string): string {
  const seconds = Math.round((new Date(iso).getTime() - Date.now()) / 1000);
  const rtf = new Intl.RelativeTimeFormat("pt-BR", { numeric: "auto" });
  for (const [unit, size] of UNITS) {
    if (Math.abs(seconds) >= size) return rtf.format(Math.round(seconds / size), unit);
  }
  return "agora";
}

/** Data relativa ("há 3 dias") calculada no cliente, para não ficar velha no cache. */
export function TimeAgo({ iso }: { iso: string }) {
  const [text, setText] = useState<string | null>(null);
  useEffect(() => setText(format(iso)), [iso]);

  const absolute = new Date(iso).toLocaleDateString("pt-BR");
  return (
    <time dateTime={iso} title={absolute}>
      {text ?? absolute}
    </time>
  );
}
