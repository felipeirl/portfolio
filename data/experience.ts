export type Experience = {
  period: string;
  title: string;
  company: string;
  /** Iniciais exibidas no selo (não é o logotipo oficial). */
  monogram: string;
  brandColor: string;
  current?: boolean;
  description: string;
  highlights: string[];
};

export const experience: Experience[] = [
  {
    period: "Out 2025 — Atual",
    title: "Assistente de Desenvolvimento",
    company: "PicPay",
    monogram: "PP",
    brandColor: "#21c25e",
    current: true,
    description:
      "Atuo na área de Shop E-commerce, ajudando no desenvolvimento e na manutenção dos sistemas internos.",
    highlights: ["E-commerce", "Sistemas internos", "Manutenção e evolução"],
  },
];
