import { skillGroups } from "@/data/profile";
import { TechIcon } from "./tech-icon";

interface MarqueeItem {
  id: string;
  label: string;
}

/** Tecnologias em destaque, sem blur nem sombras: a faixa anima o tempo todo e precisa ser barata. */
const FEATURED_IDS = [
  "go",
  "py",
  "java",
  "kotlin",
  "ts",
  "spring",
  "fastapi",
  "mongodb",
  "redis",
  "postgres",
  "aws",
  "docker",
  "githubactions",
  "react",
];

const items: MarqueeItem[] = FEATURED_IDS.flatMap((id) => {
  for (const group of skillGroups) {
    const index = group.icons.indexOf(id);
    if (index !== -1) return [{ id, label: group.labels[index] ?? id }];
  }
  return [];
});

/** Cada trilha repete a lista, para ser mais larga que qualquer tela e não deixar vão no fim do ciclo. */
const REPEATS = 2;
const trackItems = Array.from({ length: REPEATS }, (_, copy) =>
  items.map((item) => ({ ...item, key: `${item.id}-${copy}` })),
).flat();

function Track({ hidden }: { hidden?: boolean }) {
  return (
    <ul className="marquee-track" aria-hidden={hidden ? true : undefined}>
      {trackItems.map((item) => (
        <li
          key={item.key}
          className="flex items-center gap-3 rounded-full border border-line bg-[#141414] py-2 pr-5 pl-2 text-sm"
        >
          <TechIcon id={item.id} label={item.label} size={32} />
          <span>{item.label}</span>
        </li>
      ))}
    </ul>
  );
}

/**
 * Faixa contínua com a stack, logo abaixo do hero. Decorativa: a seção de habilidades
 * traz a mesma lista, então a faixa inteira fica fora da árvore de acessibilidade.
 */
export function Marquee() {
  return (
    <div aria-hidden className="py-10">
      <div className="marquee">
        <Track />
        <Track hidden />
      </div>
    </div>
  );
}
