export type Skill = { name: string; icon: string };
export type SkillGroup = { id: string; label: string; skills: Skill[] };

export const skillGroups: SkillGroup[] = [
  {
    id: "linguagens",
    label: "Linguagens",
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
    skills: [
      { name: "Spring Boot", icon: "devicon-spring-original" },
      { name: "FastAPI", icon: "devicon-fastapi-plain" },
      { name: "Gin", icon: "devicon-go-original-wordmark" },
      { name: "Redis", icon: "devicon-redis-plain" },
    ],
  },
  {
    id: "dados",
    label: "Dados",
    skills: [
      { name: "PostgreSQL", icon: "devicon-postgresql-plain" },
      { name: "MongoDB", icon: "devicon-mongodb-plain" },
      { name: "Firebase", icon: "devicon-firebase-plain" },
      { name: "Redis", icon: "devicon-redis-plain" },
    ],
  },
  {
    id: "devops",
    label: "DevOps",
    skills: [
      { name: "Git", icon: "devicon-git-plain" },
      { name: "GitHub Actions", icon: "devicon-githubactions-plain" },
      { name: "Docker", icon: "devicon-docker-plain" },
      { name: "Linux", icon: "devicon-linux-plain" },
    ],
  },
];

export const allSkills: Skill[] = Array.from(
  new Map(skillGroups.flatMap((g) => g.skills).map((s) => [s.name, s])).values(),
);
