import type { Localized } from "./profile";

export interface SectionLink {
  id: "skills" | "experience" | "projects" | "contact";
  label: Localized;
}

export const sectionLinks: SectionLink[] = [
  { id: "skills", label: { pt: "Stack", en: "Stack" } },
  { id: "experience", label: { pt: "Experiência", en: "Experience" } },
  { id: "projects", label: { pt: "Projetos", en: "Projects" } },
  { id: "contact", label: { pt: "Contato", en: "Contact" } },
];

export const strings = {
  skipToContent: { pt: "Ir para o conteúdo", en: "Skip to content" },
  openPalette: { pt: "Abrir paleta de comandos", en: "Open command palette" },
  switchLanguage: { pt: "Mudar idioma", en: "Switch language" },
  hero: {
    greeting: { pt: "Olá, eu sou", en: "Hi, I am" },
    ctaProjects: { pt: "Ver projetos", en: "View projects" },
    ctaContact: { pt: "Falar comigo", en: "Get in touch" },
    available: { pt: "Aberto a oportunidades", en: "Open to opportunities" },
    repos: { pt: "repositórios", en: "repositories" },
    stars: { pt: "estrelas", en: "stars" },
    based: { pt: "São Paulo, BR", en: "São Paulo, BR" },
  },
  skills: {
    eyebrow: { pt: "stack --list", en: "stack --list" },
    title: { pt: "Ferramentas que uso no dia a dia", en: "The tools I use every day" },
    subtitle: {
      pt: "Back-end é o centro. O resto existe para entregar o produto de ponta a ponta.",
      en: "Back-end is the core. The rest exists to ship the product end to end.",
    },
  },
  experience: {
    eyebrow: { pt: "git log --career", en: "git log --career" },
    title: { pt: "Experiência e formação", en: "Experience and education" },
    subtitle: {
      pt: "Trabalho de verdade em produção, enquanto estudo.",
      en: "Real work in production, while studying.",
    },
    work: { pt: "Trabalho", en: "Work" },
    study: { pt: "Formação", en: "Education" },
  },
  projects: {
    eyebrow: { pt: "ls ./projetos", en: "ls ./projects" },
    title: { pt: "Projetos em destaque", en: "Featured projects" },
    subtitle: {
      pt: "Código aberto, do back-end ao app. Números atualizados direto do GitHub.",
      en: "Open source, from back-end to app. Numbers pulled live from GitHub.",
    },
    code: { pt: "Código", en: "Code" },
    updated: { pt: "Atualizado", en: "Updated" },
    allRepos: { pt: "Ver todos no GitHub", en: "See all on GitHub" },
    offline: {
      pt: "Estatísticas do GitHub indisponíveis no momento.",
      en: "GitHub stats are unavailable right now.",
    },
  },
  contact: {
    eyebrow: { pt: "contact --open", en: "contact --open" },
    title: { pt: "Vamos construir algo confiável?", en: "Let's build something reliable?" },
    subtitle: {
      pt: "Aberto a conversas sobre back-end, APIs e IA aplicada.",
      en: "Open to conversations about back-end, APIs and applied AI.",
    },
    linkedin: { pt: "Conversar no LinkedIn", en: "Talk on LinkedIn" },
    github: { pt: "Ver o GitHub", en: "View GitHub" },
  },
  footer: {
    built: { pt: "Feito com Next.js, TypeScript e Tailwind.", en: "Built with Next.js, TypeScript and Tailwind." },
    top: { pt: "Voltar ao topo", en: "Back to top" },
  },
  palette: {
    placeholder: { pt: "Digite um comando ou busque...", en: "Type a command or search..." },
    empty: { pt: "Nada encontrado.", en: "Nothing found." },
    navigate: { pt: "Navegar", en: "Navigate" },
    links: { pt: "Links", en: "Links" },
    settings: { pt: "Preferências", en: "Preferences" },
    toggleLang: { pt: "Alternar idioma (PT/EN)", en: "Toggle language (PT/EN)" },
    close: { pt: "Fechar", en: "Close" },
    hint: { pt: "↑↓ navegar · Enter selecionar · Esc fechar", en: "↑↓ navigate · Enter select · Esc close" },
  },
} satisfies Record<string, unknown>;
