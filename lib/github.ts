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
  /** false quando a API falhou e os números ao vivo não estão disponíveis */
  live: boolean;
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
      url: `${profile.links.github}/${project.repo}`,
      stars: 0,
      language: null,
      pushedAt: null,
    };
  }
  return { projects, totalRepos: null, totalStars: null, live: false };
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

    snapshot.totalRepos = repos.length;
    snapshot.totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
    snapshot.live = true;
    return snapshot;
  } catch (error) {
    console.error("[github] falha ao carregar repositórios:", error);
    return staticSnapshot();
  }
}
