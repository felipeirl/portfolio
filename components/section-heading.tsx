import { Reveal } from "./reveal";

interface SectionHeadingProps {
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
}

export function SectionHeading({ id, eyebrow, title, subtitle }: SectionHeadingProps) {
  return (
    <Reveal className="mb-12 max-w-2xl">
      <p className="mb-3 font-mono text-sm text-cyan">
        <span className="text-muted">$ </span>
        {eyebrow}
      </p>
      <h2 id={id} className="text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-lg leading-relaxed text-muted">{subtitle}</p>
    </Reveal>
  );
}
