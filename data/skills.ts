import type { IconName } from "@/components/Icon";

export type Skill = { name: string; icon: string };
export type SkillGroup = { id: string; label: string; icon: IconName; skills: Skill[] };

export const skillGroups: SkillGroup[] = [
  {
    id: "linguagens",
    label: "Linguagens",
    icon: "code",
    skills: [
      { name: "Java", icon: "devicon-java-plain" },
      { name: "Python", icon: "devicon-python-plain" },
      { name: "Go", icon: "devicon-go-original-wordmark" },
      { name: "Kotlin", icon: "devicon-kotlin-plain" },
      { name: "JavaScript", icon: "devicon-javascript-plain" },
      { name: "TypeScript", icon: "devicon-typescript-plain" },
    ],
  },
  {
    id: "backend",
    label: "Back-end",
    icon: "server",
    skills: [
      { name: "Spring Boot", icon: "devicon-spring-original" },
      { name: "FastAPI", icon: "devicon-fastapi-plain" },
      { name: "Gin", icon: "devicon-go-original-wordmark" },
    ],
  },
  {
    id: "dados",
    label: "Dados",
    icon: "database",
    skills: [
      { name: "PostgreSQL", icon: "devicon-postgresql-plain" },
      { name: "MongoDB", icon: "devicon-mongodb-plain" },
      { name: "Redis", icon: "devicon-redis-plain" },
      { name: "Firebase", icon: "devicon-firebase-plain" },
    ],
  },
  {
    id: "devops",
    label: "DevOps",
    icon: "cloud",
    skills: [
      { name: "Git", icon: "devicon-git-plain" },
      { name: "GitHub Actions", icon: "devicon-githubactions-plain" },
      { name: "Docker", icon: "devicon-docker-plain" },
      { name: "Linux", icon: "devicon-linux-plain" },
    ],
  },
];
