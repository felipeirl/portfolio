import type { RepoRef } from "@/data/projects";

const API = "https://api.github.com";
const REVALIDATE_SECONDS = 3600;

export type RepoStats = {
  fullName: string;
  url: string;
  stars: number;
  forks: number;
  pushedAt: string;
  languages: { name: string; percent: number }[];
  latestRelease: { tag: string; name: string; url: string; publishedAt: string } | null;
  /** Commits do dono do portfólio neste repositório, segundo a API de contribuidores. */
  myCommits: number | null;
};

export type GithubProfile = {
  login: string;
  avatarUrl: string;
  publicRepos: number;
  followers: number;
  totalStars: number;
  createdAt: string;
};

export type ActivityItem = {
  id: string;
  repo: string;
  repoUrl: string;
  message: string;
  url: string;
  createdAt: string;
};

function headers(): HeadersInit {
  const token = process.env.GITHUB_TOKEN;
  return {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

/** Retorna null (e registra o motivo) quando a API falha; 404 é tratado como ausência esperada. */
async function ghJson<T>(path: string, { allow404 = false } = {}): Promise<T | null> {
  try {
    const res = await fetch(`${API}${path}`, {
      headers: headers(),
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (res.status === 404 && allow404) return null;
    if (!res.ok) {
      console.error(`[github] ${path} -> ${res.status}`);
      return null;
    }
    return (await res.json()) as T;
  } catch (error) {
    console.error(`[github] ${path} falhou`, error);
    return null;
  }
}

type RawRepo = {
  full_name: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  pushed_at: string;
};
type RawRelease = { tag_name: string; name: string | null; html_url: string; published_at: string };
type RawContributor = { login: string; contributions: number };

export async function getRepoStats(ref: RepoRef, author?: string): Promise<RepoStats | null> {
  const base = `/repos/${ref.owner}/${ref.name}`;
  const [repo, languages, release, commits] = await Promise.all([
    ghJson<RawRepo>(base),
    ghJson<Record<string, number>>(`${base}/languages`),
    ghJson<RawRelease>(`${base}/releases/latest`, { allow404: true }),
    author
      ? ghJson<RawContributor[]>(`${base}/contributors?per_page=100`)
      : Promise.resolve(null),
  ]);
  if (!repo) return null;

  const total = Object.values(languages ?? {}).reduce((sum, n) => sum + n, 0);
  const langList = Object.entries(languages ?? {})
    .map(([name, bytes]) => ({ name, percent: total ? Math.round((bytes / total) * 100) : 0 }))
    .filter((l) => l.percent >= 1)
    .sort((a, b) => b.percent - a.percent)
    .slice(0, 4);

  return {
    fullName: repo.full_name,
    url: repo.html_url,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    pushedAt: repo.pushed_at,
    languages: langList,
    latestRelease: release
      ? {
          tag: release.tag_name,
          name: release.name ?? release.tag_name,
          url: release.html_url,
          publishedAt: release.published_at,
        }
      : null,
    myCommits:
      commits?.find((c) => c.login.toLowerCase() === author?.toLowerCase())?.contributions ?? null,
  };
}

type RawUser = {
  login: string;
  avatar_url: string;
  public_repos: number;
  followers: number;
  created_at: string;
};
type RawOwnedRepo = { stargazers_count: number; fork: boolean };

export async function getProfile(login: string): Promise<GithubProfile | null> {
  const [user, repos] = await Promise.all([
    ghJson<RawUser>(`/users/${login}`),
    ghJson<RawOwnedRepo[]>(`/users/${login}/repos?per_page=100&type=owner`),
  ]);
  if (!user) return null;
  const totalStars = (repos ?? []).filter((r) => !r.fork).reduce((s, r) => s + r.stargazers_count, 0);
  return {
    login: user.login,
    avatarUrl: user.avatar_url,
    publicRepos: user.public_repos,
    followers: user.followers,
    totalStars,
    createdAt: user.created_at,
  };
}

type RawEvent = {
  id: string;
  type: string;
  created_at: string;
  repo: { name: string };
  // O GitHub não envia mais a lista de commits no PushEvent; só o SHA do topo.
  payload: { head?: string };
};
type RawCommitDetail = { commit: { message: string } };

export async function getRecentActivity(login: string, limit = 6): Promise<ActivityItem[]> {
  const events = await ghJson<RawEvent[]>(`/users/${login}/events/public?per_page=50`);
  if (!events) return [];

  const pushes = events
    .filter((event) => event.type === "PushEvent" && event.payload.head)
    .slice(0, limit);

  const items = await Promise.all(
    pushes.map(async (event): Promise<ActivityItem | null> => {
      const sha = event.payload.head as string;
      const detail = await ghJson<RawCommitDetail>(`/repos/${event.repo.name}/commits/${sha}`, {
        allow404: true,
      });
      if (!detail) return null;
      return {
        id: event.id,
        repo: event.repo.name,
        repoUrl: `https://github.com/${event.repo.name}`,
        message: detail.commit.message.split("\n")[0],
        url: `https://github.com/${event.repo.name}/commit/${sha}`,
        createdAt: event.created_at,
      };
    }),
  );

  return items.filter((item): item is ActivityItem => item !== null);
}
