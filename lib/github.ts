import { featuredProjects, profile } from "@/data/profile";

const REVALIDATE_SECONDS = 60 * 60;
const GITHUB_API = "https://api.github.com";

interface GithubRepo {
  name: string;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  pushed_at: string;
}

export interface ProjectLive {
  repo: string;
  url: string;
  stars: number;
  language: string | null;
  pushedAt: string | null;
}

export interface GithubSnapshot {
  projects: Record<string, ProjectLive>;
  totalRepos: number | null;
  totalStars: number | null;
  /** commits por dia nos últimos 14 dias (do mais antigo ao mais recente), ou null se indisponível */
  activity: number[] | null;
  latest: { repo: string; pushedAt: string } | null;
  /** false quando a API falhou e os números ao vivo não estão disponíveis */
  live: boolean;
}

const ACTIVITY_DAYS = 14;
const DAY_MS = 24 * 60 * 60 * 1000;

interface GithubEvent {
  type: string;
  created_at: string;
  payload?: { size?: number };
}

/** Commits por dia nos últimos 14 dias, a partir dos eventos públicos de push. */
async function fetchActivity(): Promise<number[] | null> {
  try {
    const response = await fetch(
      `${GITHUB_API}/users/${profile.handle}/events/public?per_page=100`,
      { headers: buildHeaders(), next: { revalidate: REVALIDATE_SECONDS } },
    );
    if (!response.ok) throw new Error(`GitHub API respondeu ${response.status}`);
    const events = (await response.json()) as GithubEvent[];
    const days = new Array<number>(ACTIVITY_DAYS).fill(0);
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    for (const event of events) {
      if (event.type !== "PushEvent") continue;
      const age = Math.floor((today.getTime() - new Date(event.created_at).setUTCHours(0, 0, 0, 0)) / DAY_MS);
      if (age >= 0 && age < ACTIVITY_DAYS) days[ACTIVITY_DAYS - 1 - age] += event.payload?.size ?? 1;
    }
    return days;
  } catch (error) {
    console.error("[github] falha ao carregar atividade:", error);
    return null;
  }
}

/** Repositório de outra conta (por exemplo, uma organização). Falha registrada, sem derrubar o resto. */
async function fetchRepo(owner: string, name: string): Promise<GithubRepo | null> {
  try {
    const response = await fetch(`${GITHUB_API}/repos/${owner}/${name}`, {
      headers: buildHeaders(),
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!response.ok) throw new Error(`GitHub API respondeu ${response.status}`);
    return (await response.json()) as GithubRepo;
  } catch (error) {
    console.error(`[github] falha ao carregar ${owner}/${name}:`, error);
    return null;
  }
}

function buildHeaders(): HeadersInit {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "felipeirl-portfolio",
  };
  const token = process.env.GITHUB_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

function staticSnapshot(): GithubSnapshot {
  const projects: Record<string, ProjectLive> = {};
  for (const project of featuredProjects) {
    projects[project.repo] = {
      repo: project.repo,
      url: `https://github.com/${project.owner ?? profile.handle}/${project.repo}`,
      stars: 0,
      language: null,
      pushedAt: null,
    };
  }
  return { projects, totalRepos: null, totalStars: null, activity: null, latest: null, live: false };
}

/**
 * Busca os repositórios públicos no build/ISR. Se a API falhar (limite de
 * requisições, rede), registra o erro e devolve links estáticos sem números,
 * marcando `live: false` para a interface não exibir contagens falsas.
 */
export async function getGithubSnapshot(): Promise<GithubSnapshot> {
  const url = `${GITHUB_API}/users/${profile.handle}/repos?per_page=100&type=owner&sort=pushed`;

  try {
    const response = await fetch(url, {
      headers: buildHeaders(),
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!response.ok) {
      throw new Error(`GitHub API respondeu ${response.status}`);
    }

    const repos = (await response.json()) as GithubRepo[];
    const byName = new Map(repos.map((repo) => [repo.name, repo]));
    const snapshot = staticSnapshot();

    for (const project of featuredProjects) {
      const repo = byName.get(project.repo);
      if (!repo) continue;
      snapshot.projects[project.repo] = {
        repo: repo.name,
        url: repo.html_url,
        stars: repo.stargazers_count,
        language: repo.language,
        pushedAt: repo.pushed_at,
      };
    }

    for (const project of featuredProjects) {
      if (!project.owner || project.owner === profile.handle) continue;
      const extra = await fetchRepo(project.owner, project.repo);
      if (extra) {
        snapshot.projects[project.repo] = {
          repo: extra.name,
          url: extra.html_url,
          stars: extra.stargazers_count,
          language: extra.language,
          pushedAt: extra.pushed_at,
        };
      }
    }

    const newest = repos[0];
    snapshot.latest = newest ? { repo: newest.name, pushedAt: newest.pushed_at } : null;
    snapshot.activity = await fetchActivity();
    snapshot.totalRepos = repos.length;
    snapshot.totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
    snapshot.live = true;
    return snapshot;
  } catch (error) {
    console.error("[github] falha ao carregar repositórios:", error);
    return staticSnapshot();
  }
}
