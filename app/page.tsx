import { PortfolioApp } from "@/components/portfolio-app";
import { getGithubSnapshot } from "@/lib/github";

export const revalidate = 3600;

export default async function Home() {
  const github = await getGithubSnapshot();
  return <PortfolioApp github={github} />;
}
