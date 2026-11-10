import type { Localized } from "./profile";

export interface CaseStudy {
  slug: string;
  title: string;
  kicker: Localized;
  summary: Localized;
  problem: Localized;
  decisions: Localized[];
  stack: string[];
  /** repositórios do projeto no GitHub (usuário felipeirl) */
  repos: { name: string; label: Localized }[];
  screenshots?: { src: string; alt: Localized }[];
  diagram?: "assemble";
}

export const cases: CaseStudy[] = [
  {
    slug: "assemble",
    title: "Assemble",
    kicker: { pt: "App Android e API", en: "Android app and API" },
    summary: {
      pt: "App Android para descobrir personagens de quadrinhos e conversar com eles, com uma API própria e um guardrail de IA.",
      en: "Android app to discover comic book characters and chat with them, backed by its own API and an AI guardrail.",
    },
    problem: {
      pt: "Conversar com um personagem sem que o modelo saia do papel nem responda o que não deve.",
      en: "Chatting with a character without the model breaking character or answering what it should not.",
    },
    decisions: [
      {
        pt: "Dois repositórios com responsabilidades separadas: o cliente Android em Kotlin e Jetpack Compose, e o servidor em FastAPI e Firestore, ligados por REST autenticado com Firebase ID token.",
        en: "Two repositories with separate responsibilities: the Android client in Kotlin and Jetpack Compose, and the FastAPI and Firestore server, connected by REST authenticated with a Firebase ID token.",
      },
      {
        pt: "Um guardrail local, o Laya, filtra a entrada e a saída do LLM antes de qualquer resposta chegar ao app.",
        en: "A local guardrail, Laya, filters the LLM input and output before any reply reaches the app.",
      },
      {
        pt: "Motor de decisão determinístico para os Assembles e conversas assíncronas via filas, para o chat não bloquear a API.",
        en: "A deterministic decision engine for the Assembles and asynchronous conversations through queues, so chat never blocks the API.",
      },
    ],
    stack: ["Kotlin", "Jetpack Compose", "FastAPI", "Firestore", "Firebase", "LLM"],
    repos: [
      { name: "assemble-app", label: { pt: "Cliente Android", en: "Android client" } },
      { name: "assemble-api", label: { pt: "Servidor", en: "Server" } },
    ],
    screenshots: [
      {
        src: "/images/assemble/01-onboarding-poderes.webp",
        alt: { pt: "Onboarding: escolha de poderes", en: "Onboarding: choosing powers" },
      },
      {
        src: "/images/assemble/03-discover-viuva-negra.webp",
        alt: { pt: "Baralho diário com personagem", en: "Daily deck with a character" },
      },
      {
        src: "/images/assemble/05-assemble-match.webp",
        alt: { pt: "Assemble mútuo com compatibilidade", en: "Mutual Assemble with compatibility" },
      },
      {
        src: "/images/assemble/06-conversa.webp",
        alt: { pt: "Conversa em personagem", en: "In-character conversation" },
      },
    ],
    diagram: "assemble",
  },
  {
    slug: "iniciar-jarvis",
    title: "Iniciar Jarvis",
    kicker: { pt: "Automação para Windows", en: "Windows automation" },
    summary: {
      pt: "Abre o Claude Code com duas palmas, com detecção de áudio em tempo real para Windows.",
      en: "Opens Claude Code with two claps, using real-time audio detection on Windows.",
    },
    problem: {
      pt: "Começar uma sessão de trabalho sem tocar no teclado nem procurar o terminal.",
      en: "Starting a work session without touching the keyboard or hunting for the terminal.",
    },
    decisions: [
      {
        pt: "Escuta contínua do microfone em tempo real, com detecção de duas palmas em sequência como gatilho.",
        en: "Continuous real-time microphone listening, with two claps in a row as the trigger.",
      },
      {
        pt: "Foco no Windows e em Python, o que mantém o projeto pequeno e fácil de instalar.",
        en: "Focused on Windows and Python, which keeps the project small and easy to install.",
      },
    ],
    stack: ["Python", "Áudio em tempo real", "Windows"],
    repos: [{ name: "iniciar-jarvis", label: { pt: "Código", en: "Code" } }],
  },
  {
    slug: "satire-api",
    title: "Satire API",
    kicker: { pt: "API REST em Java", en: "Java REST API" },
    summary: {
      pt: "API REST em Spring Boot para um marketplace de bonecos.",
      en: "Spring Boot REST API for a collectible figures marketplace.",
    },
    problem: {
      pt: "Expor o catálogo e as operações de um marketplace por uma API REST clara e testável.",
      en: "Exposing a marketplace catalog and its operations through a clear, testable REST API.",
    },
    decisions: [
      {
        pt: "Spring Boot com contrato REST explícito entre o cliente e o domínio do marketplace.",
        en: "Spring Boot with an explicit REST contract between the client and the marketplace domain.",
      },
    ],
    stack: ["Java", "Spring Boot", "REST"],
    repos: [{ name: "satire-api", label: { pt: "Código", en: "Code" } }],
  },
];

export function getCase(slug: string): CaseStudy | undefined {
  return cases.find((item) => item.slug === slug);
}

/** Slug do estudo de caso que cobre um repositório, quando existe. */
export function caseSlugForRepo(repo: string): string | undefined {
  return cases.find((item) => item.repos.some((r) => r.name === repo))?.slug;
}
