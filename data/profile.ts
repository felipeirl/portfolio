export type Locale = "pt" | "en";
export type Localized = Record<Locale, string>;

export const SITE_URL = "https://felipejorge.vercel.app";

export const profile = {
  name: "Felipe Jorge",
  handle: "felipeirl",
  location: "São Paulo, BR",
  role: {
    pt: "Desenvolvedor Back-End",
    en: "Back-End Developer",
  } satisfies Localized,
  headline: {
    pt: "Serviços confiáveis, bem testados e simples de operar.",
    en: "Reliable, well-tested services that are simple to operate.",
  } satisfies Localized,
  summary: {
    pt: "Construo APIs REST em Go, sistemas com dados na AWS e ambientes Dockerizados. Hoje estendo esse alicerce para engenharia de IA: agentes, guardrails e LLMs em produção.",
    en: "I build REST APIs in Go, AWS-backed data systems and Dockerized environments. Today I am extending that foundation into AI engineering: agents, guardrails and LLMs in production.",
  } satisfies Localized,
  typing: {
    pt: [
      "Serviços em Go e APIs REST",
      "Microsserviços, AWS e Docker",
      "Agentes de IA com LangChain e LangGraph",
      "Back-end primeiro. Testado sempre.",
    ],
    en: [
      "Go services and REST APIs",
      "Microservices, AWS and Docker",
      "AI agents with LangChain and LangGraph",
      "Back-end first. Always tested.",
    ],
  } satisfies Record<Locale, string[]>,
  links: {
    github: "https://github.com/felipeirl",
    linkedin: "https://www.linkedin.com/in/felipe-jorge-lopes/",
  },
} as const;

export interface SkillGroup {
  id: string;
  title: Localized;
  blurb: Localized;
  /** ids do skillicons.dev */
  icons: string[];
  labels: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    id: "languages",
    title: { pt: "Linguagens", en: "Languages" },
    blurb: {
      pt: "Go como base do back-end, Python para IA e automação.",
      en: "Go as the back-end core, Python for AI and automation.",
    },
    icons: ["go", "py", "java", "kotlin", "js", "ts"],
    labels: ["Go", "Python", "Java", "Kotlin", "JavaScript", "TypeScript"],
  },
  {
    id: "backend",
    title: { pt: "Back-end e APIs", en: "Back-end and APIs" },
    blurb: {
      pt: "REST bem desenhado, contratos claros e testes.",
      en: "Well-designed REST, clear contracts and tests.",
    },
    icons: ["spring", "fastapi"],
    labels: ["Spring Boot", "FastAPI"],
  },
  {
    id: "data",
    title: { pt: "Dados", en: "Data" },
    blurb: {
      pt: "Relacional, documento e cache, conforme o problema.",
      en: "Relational, document and cache, as the problem demands.",
    },
    icons: ["mongodb", "redis", "postgres", "firebase"],
    labels: ["MongoDB", "Redis", "PostgreSQL", "Firebase"],
  },
  {
    id: "cloud",
    title: { pt: "Cloud e DevOps", en: "Cloud and DevOps" },
    blurb: {
      pt: "Ambientes reproduzíveis e entrega automatizada.",
      en: "Reproducible environments and automated delivery.",
    },
    icons: ["aws", "docker", "linux", "githubactions"],
    labels: ["AWS", "Docker", "Linux", "GitHub Actions"],
  },
  {
    id: "frontend",
    title: { pt: "Front-end e Mobile", en: "Front-end and Mobile" },
    blurb: {
      pt: "O suficiente para entregar o produto de ponta a ponta.",
      en: "Enough to ship the product end to end.",
    },
    icons: ["react", "html", "css", "androidstudio"],
    labels: ["React", "HTML", "CSS", "Android Studio"],
  },
  {
    id: "tools",
    title: { pt: "Ferramentas", en: "Tooling" },
    blurb: {
      pt: "Fluxo disciplinado com Git e revisão de código.",
      en: "A disciplined workflow with Git and code review.",
    },
    icons: ["git", "github", "vscode", "idea"],
    labels: ["Git", "GitHub", "VS Code", "IntelliJ IDEA"],
  },
];

export interface Experience {
  company: string;
  role: Localized;
  period: Localized;
  description: Localized;
  tags: string[];
}

export const experiences: Experience[] = [
  {
    company: "PicPay",
    role: {
      pt: "Assistente de Desenvolvimento",
      en: "Development Assistant",
    },
    period: { pt: "out 2025 — atual", en: "Oct 2025 — present" },
    description: {
      pt: "Atuo na área de e-commerce (Shop), ajudando no desenvolvimento e na manutenção de sistemas internos.",
      en: "I work in the e-commerce area (Shop), helping develop and maintain internal systems.",
    },
    tags: ["E-commerce", "Sistemas internos"],
  },
];

export interface Education {
  school: string;
  program: Localized;
  period: Localized;
}

export const education: Education = {
  school: "Instituto J&F — Germinare Tech",
  program: { pt: "Formação técnica", en: "Technical program" },
  period: { pt: "conclusão em 2027", en: "graduating in 2027" },
};

export interface FeaturedProject {
  repo: string;
  title: string;
  description: Localized;
  stack: string[];
  /** ids do skillicons.dev */
  icons: string[];
  demo?: string;
}

/** Projetos curados. Estrelas, linguagem e data vêm da API do GitHub. */
export const featuredProjects: FeaturedProject[] = [
  {
    repo: "assemble-api",
    title: "Assemble API",
    description: {
      pt: "API do Assemble: FastAPI, Firestore e IA com guardrail Laya. Servidor do app Android.",
      en: "Assemble API: FastAPI, Firestore and AI with the Laya guardrail. Backend of the Android app.",
    },
    stack: ["Python", "FastAPI", "Firestore", "LLM"],
    icons: ["py", "fastapi", "firebase"],
  },
  {
    repo: "assemble-app",
    title: "Assemble App",
    description: {
      pt: "App Android para descobrir personagens de quadrinhos e conversar com eles.",
      en: "Android app to discover comic book characters and chat with them.",
    },
    stack: ["Kotlin", "Jetpack Compose", "Firebase"],
    icons: ["kotlin", "androidstudio", "firebase"],
  },
  {
    repo: "iniciar-jarvis",
    title: "Iniciar Jarvis",
    description: {
      pt: "Abre o Claude Code com duas palmas, com detecção de áudio em tempo real para Windows.",
      en: "Opens Claude Code with two claps, using real-time audio detection on Windows.",
    },
    stack: ["Python", "Áudio em tempo real"],
    icons: ["py", "windows"],
  },
  {
    repo: "satire-api",
    title: "Satire API",
    description: {
      pt: "API REST em Spring Boot para um marketplace de bonecos.",
      en: "Spring Boot REST API for a collectible figures marketplace.",
    },
    stack: ["Java", "Spring Boot", "REST"],
    icons: ["java", "spring"],
  },
  {
    repo: "streaming-lumos-plus",
    title: "Lumos Plus",
    description: {
      pt: "Site de streaming em HTML, CSS e JavaScript puro, consumindo a API do TMDB.",
      en: "Streaming site in plain HTML, CSS and JavaScript, consuming the TMDB API.",
    },
    stack: ["JavaScript", "TMDB API"],
    icons: ["js", "html", "css"],
  },
];
