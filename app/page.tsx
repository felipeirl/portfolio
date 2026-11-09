import { Activity } from "@/components/Activity";
import { Background } from "@/components/Background";
import { Experience } from "@/components/Experience";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Spotlight } from "@/components/Spotlight";
import { projects } from "@/data/projects";
import { getProfile, getRecentActivity, getRepoStats, type RepoStats } from "@/lib/github";
import { site } from "@/lib/site";

/** Reconstrói a página no servidor a cada hora; o GitHub é consultado só nesse intervalo. */
export const revalidate = 3600;

export default async function Home() {
  const repoRefs = projects.flatMap((p) => p.repos);

  const [profile, activity, repoStats] = await Promise.all([
    getProfile(site.githubUser),
    getRecentActivity(site.githubUser),
    Promise.all(repoRefs.map((r) => getRepoStats(r, site.githubUser))),
  ]);

  const stats: Record<string, RepoStats | null> = Object.fromEntries(
    repoRefs.map((r, i) => [`${r.owner}/${r.name}`, repoStats[i]]),
  );

  return (
    <>
      <Background />
      <Spotlight />
      <SmoothScroll />
      <Navbar />
      <main>
        <Hero profile={profile} />
        <Skills />
        <Experience />
        <Projects stats={stats} />
        <Activity items={activity} />
      </main>
      <Footer />
    </>
  );
}
