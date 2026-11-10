import type { Localized } from "./profile";

export interface CaseStudy {
  slug: string;
  title: string;
  kicker: Localized;
  summary: Localized;
  problem: Localized;
  decisions: Localized[];
  stack: string[];
  /** repositórios do projeto no GitHub (dono padrão: felipeirl) */
  repos: { owner?: string; name: string; label: Localized }[];
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
    slug: "quimia",
    title: "Quimia API",
    kicker: { pt: "Backend em Java", en: "Java backend" },
    summary: {
      pt: "O backend do Quimia: catálogo de produtos químicos, estante do usuário, análise de FDS e detecção de misturas perigosas. Atende o app móvel e o portal web.",
      en: "The Quimia backend: chemical product catalog, user shelf, safety data sheet analysis and hazardous mixture detection. It serves the mobile app and the web portal.",
    },
    problem: {
      pt: "Dar a pessoas e empresas um lugar confiável para consultar produtos químicos, guardar o que têm em casa e saber quais misturas oferecem risco.",
      en: "Giving people and companies a reliable place to look up chemical products, keep track of what they own and learn which mixtures are hazardous.",
    },
    decisions: [
      {
        pt: "Monólito modular: o código é dividido por área de negócio e cada módulo esconde a implementação em internal/. O build falha, via ArchUnit, se um módulo acessar o internal/ de outro.",
        en: "Modular monolith: code is split by business area and each module hides its implementation in internal/. The build fails, through ArchUnit, if a module reaches into another module's internal/.",
      },
      {
        pt: "Identidade separada por público: usuários do app entram por Firebase, empresas do portal por e-mail e senha com BCrypt. A API emite JWT, e o Spring Security separa os perfis usuário, empresa e admin por rota.",
        en: "Identity split by audience: app users sign in with Firebase, portal companies with email and password (BCrypt). The API issues a JWT, and Spring Security separates user, company and admin roles per route.",
      },
      {
        pt: "Contrato testado: o Swagger é gerado do código e um teste falha se uma rota ficar sem documentação. Erros seguem application/problem+json e a cobertura mínima é de 80% (JaCoCo).",
        en: "Tested contract: Swagger is generated from the code and a test fails if a route is left undocumented. Errors use application/problem+json and minimum coverage is 80% (JaCoCo).",
      },
      {
        pt: "Redis no cache das leituras mais frequentes, opcional por configuração, e entrega com GitHub Actions e Docker.",
        en: "Redis caches the most frequent reads, optional by configuration, and delivery runs on GitHub Actions and Docker.",
      },
    ],
    stack: ["Java 21", "Spring Boot", "PostgreSQL", "Redis", "Spring Security", "Docker"],
    repos: [{ owner: "Quimia-br", name: "quimia-api", label: { pt: "API REST", en: "REST API" } }],
  },
];

export function getCase(slug: string): CaseStudy | undefined {
  return cases.find((item) => item.slug === slug);
}

/** Slug do estudo de caso que cobre um repositório, quando existe. */
export function caseSlugForRepo(repo: string): string | undefined {
  return cases.find((item) => item.repos.some((r) => r.name === repo))?.slug;
}
