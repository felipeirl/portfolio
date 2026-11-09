/**
 * Curadoria dos projetos. Os números (estrelas, último push, release, linguagens)
 * são buscados ao vivo na API do GitHub — aqui ficam apenas os textos e a ordem.
 */
export type RepoRef = { owner: string; name: string };

export type Repo = RepoRef & {
  role: string;
  summary: string;
  tags: string[];
};

export type Project = {
  id: string;
  title: string;
  kicker: string;
  description: string;
  /** Um projeto pode ser dividido em mais de um repositório. */
  repos: Repo[];
  /** Texto do vínculo entre os dois primeiros repositórios (ex.: protocolo de comunicação). */
  connection?: string;
  tags: string[];
  featured?: boolean;
  /** Capturas de tela servidas pelo raw.githubusercontent.com */
  screenshots?: { src: string; alt: string }[];
  liveUrl?: string;
  /** Repositórios do mesmo ecossistema, exibidos como links. */
  ecosystem?: RepoRef[];
};

const assembleShots = (base: string) =>
  [
    ["01-onboarding-poderes.png", "Onboarding: escolha de poderes"],
    ["03-discover-viuva-negra.png", "Baralho diário com personagem"],
    ["05-assemble-match.png", "Assemble mútuo com compatibilidade"],
    ["06-conversa.png", "Conversa em personagem"],
    ["08-conexoes-compatibilidade.png", "Aba de conexões"],
  ].map(([file, alt]) => ({ src: `${base}/${file}`, alt }));

export const projects: Project[] = [
  {
    id: "assemble",
    title: "Assemble",
    kicker: "App Android + API · 2 repositórios",
    description:
      "Todo dia o usuário recebe um baralho de personagens de quadrinhos e decide entre passar ou dar Assemble. Quando há compatibilidade, o personagem abre uma conversa escrita em personagem por IA. O produto é dividido em dois repositórios: o cliente Android e o servidor que decide, guarda e conversa.",
    featured: true,
    connection: "Firebase ID token · REST",
    tags: ["Kotlin", "Jetpack Compose", "FastAPI", "Firestore", "LLM", "Guardrail"],
    repos: [
      {
        owner: "felipeirl",
        name: "assemble-app",
        role: "Cliente Android",
        summary:
          "Kotlin e Jetpack Compose. Login com Firebase e Google, onboarding por preferências, baralho diário, chat e perfil, em português e inglês.",
        tags: ["Kotlin", "Compose", "Firebase Auth"],
      },
      {
        owner: "felipeirl",
        name: "assemble-api",
        role: "Servidor",
        summary:
          "FastAPI e Firestore. Motor de decisão determinístico, conversas assíncronas via filas e guardrail local (Laya) filtrando entrada e saída.",
        tags: ["FastAPI", "Firestore", "LiteLLM", "Docker"],
      },
    ],
    screenshots: assembleShots(
      "https://raw.githubusercontent.com/felipeirl/assemble-app/HEAD/screenshots",
    ),
  },
  {
    id: "quimia",
    title: "Quimia API",
    kicker: "Back-end em Java · organização Quimia-br",
    description:
      "O backend do Quimia: catálogo de produtos químicos, estante do usuário, análise de FDS e detecção de misturas perigosas. Monólito modular em Spring Boot, com fronteiras entre módulos garantidas por ArchUnit e cobertura mínima de 80%.",
    featured: true,
    tags: ["Java 21", "Spring Boot", "PostgreSQL", "Redis", "Spring Security", "Docker"],
    repos: [
      {
        owner: "Quimia-br",
        name: "quimia-api",
        role: "API REST",
        summary:
          "Autenticação com Firebase e JWT, perfis de usuário, empresa e admin, cache com Redis e contrato OpenAPI testado.",
        tags: ["Spring Boot", "JWT", "ArchUnit"],
      },
    ],
    liveUrl: "https://quimia.discloud.app",
    ecosystem: [
      { owner: "Quimia-br", name: "quimia-web" },
      { owner: "Quimia-br", name: "quimia-mobile" },
      { owner: "Quimia-br", name: "quimia-extractor-ai" },
      { owner: "Quimia-br", name: "quimia-bd" },
    ],
  },
  {
    id: "lumos",
    title: "Lumos+",
    kicker: "Front-end · consumo de API",
    description: "Site de streaming em HTML, CSS e JavaScript puros, consumindo a API do TMDB.",
    tags: ["JavaScript", "HTML", "CSS", "TMDB API"],
    repos: [
      {
        owner: "felipeirl",
        name: "streaming-lumos-plus",
        role: "Site",
        summary: "Catálogo de filmes e séries com dados da API do TMDB.",
        tags: ["JavaScript", "TMDB"],
      },
    ],
  },
];
