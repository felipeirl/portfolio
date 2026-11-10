import type { Localized } from "./profile";

export interface SectionLink {
  id: "skills" | "experience" | "projects" | "contact";
  label: Localized;
}

export const sectionLinks: SectionLink[] = [
  { id: "skills", label: { pt: "Habilidades", en: "Skills" } },
  { id: "experience", label: { pt: "Experiência", en: "Experience" } },
  { id: "projects", label: { pt: "Projetos", en: "Projects" } },
  { id: "contact", label: { pt: "Contato", en: "Contact" } },
];

export const strings = {
  skipToContent: { pt: "Ir para o conteúdo", en: "Skip to content" },
  openPalette: { pt: "Abrir paleta de comandos", en: "Open command palette" },
  switchLanguage: { pt: "Mudar idioma", en: "Switch language" },
  motion: {
    reduce: { pt: "Reduzir movimento", en: "Reduce motion" },
    restore: { pt: "Restaurar animações", en: "Restore animations" },
  },
  openMenu: { pt: "Abrir menu", en: "Open menu" },
  closeMenu: { pt: "Fechar menu", en: "Close menu" },
  mainNav: { pt: "Principal", en: "Main" },
  hero: {
    tag: { pt: "Portfólio", en: "Portfolio" },
    titleLines: {
      pt: ["Desenvolvedor", "Back-End"],
      en: ["Back-End", "Developer"],
    } satisfies Record<"pt" | "en", string[]>,
    ctaProjects: { pt: "Ver projetos", en: "View projects" },
    ctaContact: { pt: "Entre em contato", en: "Get in touch" },
    available: { pt: "Aberto a oportunidades", en: "Open to opportunities" },
    repos: { pt: "repositórios", en: "repositories" },
    stars: { pt: "estrelas", en: "stars" },
    scroll: { pt: "Role para ver mais", en: "Scroll for more" },
  },
  skills: {
    eyebrow: { pt: "Stack técnica", en: "Tech stack" },
    title: { pt: "Habilidades técnicas", en: "Technical skills" },
    subtitle: {
      pt: "Linguagens, ferramentas e tecnologias que uso e estudo atualmente. Back-end é o centro; o resto existe para entregar o produto de ponta a ponta.",
      en: "Languages, tools and technologies I use and study today. Back-end is the core; the rest exists to ship the product end to end.",
    },
  },
  experience: {
    eyebrow: { pt: "Trajetória", en: "Journey" },
    title: { pt: "Experiência profissional", en: "Professional experience" },
    subtitle: {
      pt: "Minha jornada no mercado de tecnologia: trabalho de verdade em produção, enquanto estudo.",
      en: "My journey in tech: real work in production, while studying.",
    },
    work: { pt: "Trabalho", en: "Work" },
    study: { pt: "Formação", en: "Education" },
  },
  projects: {
    eyebrow: { pt: "Trabalhos", en: "Work" },
    title: { pt: "Projetos em destaque", en: "Featured projects" },
    subtitle: {
      pt: "Visão de algumas aplicações construídas aplicando meus conhecimentos. Números atualizados direto do GitHub.",
      en: "A look at some applications built with what I know. Numbers pulled live from GitHub.",
    },
    code: { pt: "Código", en: "Code" },
    caseStudy: { pt: "Estudo de caso", en: "Case study" },
    activity: { pt: "Atividade no GitHub, últimos 14 dias", en: "GitHub activity, last 14 days" },
    latestPush: { pt: "Último push", en: "Latest push" },
    repo: { pt: "Ver repositório", en: "View repository" },
    updated: { pt: "Atualizado", en: "Updated" },
    allRepos: { pt: "Ver todos no GitHub", en: "See all on GitHub" },
    offline: {
      pt: "Estatísticas do GitHub indisponíveis no momento.",
      en: "GitHub stats are unavailable right now.",
    },
  },
  contact: {
    eyebrow: { pt: "Contato", en: "Contact" },
    title: { pt: "Vamos construir algo confiável?", en: "Let's build something reliable?" },
    subtitle: {
      pt: "Aberto a conversas sobre back-end, APIs e IA aplicada.",
      en: "Open to conversations about back-end, APIs and applied AI.",
    },
    linkedin: { pt: "Conversar no LinkedIn", en: "Talk on LinkedIn" },
    github: { pt: "Ver o GitHub", en: "View GitHub" },
    cv: { pt: "Baixar CV", en: "Download CV" },
  },
  footer: {
    tagline: {
      pt: "Desenvolvedor back-end focado em criar APIs resilientes, resolver gargalos de performance e construir modelagem de dados escalável.",
      en: "Back-end developer focused on building resilient APIs, fixing performance bottlenecks and designing scalable data models.",
    },
    pages: { pt: "Páginas", en: "Pages" },
    social: { pt: "Redes", en: "Social" },
    rights: { pt: "Todos os direitos reservados.", en: "All rights reserved." },
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
};
