export const site = {
  name: "Felipe Jorge Lopes",
  role: "Back-end Developer",
  githubUser: "felipeirl",
  url: "https://felipeirl.github.io/portfolio/",
  description:
    "Portfólio de Felipe Jorge Lopes — desenvolvedor back-end: APIs REST, Java, Python e Go.",
  intro:
    "Cursando o Ensino Médio no Instituto J&F e atuando como Assistente de Desenvolvimento no PicPay. Foco em construções robustas e eficientes.",
  rotatingWords: ["APIs REST", "Microsserviços", "Spring Boot", "FastAPI", "Go", "IA aplicada"],
  links: {
    github: "https://github.com/felipeirl",
    linkedin: "https://www.linkedin.com/in/felipe-jorge-6393a8324/",
  },
  // Defina como o caminho de um PDF em /public quando o currículo real existir.
  cvUrl: null as string | null,
};

export const nav = [
  { id: "habilidades", label: "Habilidades" },
  { id: "experiencia", label: "Experiência" },
  { id: "projetos", label: "Projetos" },
  { id: "atividade", label: "Atividade" },
] as const;
