import { Reveal } from "./reveal";
import { SplitTitle } from "./split-title";

interface SectionHeadingProps {
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  align?: "left" | "center";
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  subtitle,
  align = "left",
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <Reveal className={`mb-14 max-w-3xl ${centered ? "mx-auto text-center" : ""}`}>
      <p className="mb-3 font-accent text-2xl italic text-primary sm:text-3xl">{eyebrow}</p>
      <h2
        id={id}
        className="font-heading text-5xl uppercase leading-none sm:text-6xl lg:text-7xl"
      >
        <SplitTitle text={title} />
      </h2>
      <p className="mt-6 text-lg leading-relaxed text-muted">{subtitle}</p>
    </Reveal>
  );
}
