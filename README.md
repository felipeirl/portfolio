# Felipe Jorge Lopes — Portfólio

Portfólio de desenvolvedor back-end. Mesmo design do site original (fundo dos Pilares da Criação, dourado `#FFCA89`, Tusker Grotesk, vidro fosco), agora dinâmico e alimentado pela API do GitHub.

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | Next.js (App Router) + React + TypeScript |
| Estilo | Tailwind CSS v4 com tokens do design original |
| Animação | Motion (reveal, parallax, tilt, carrossel arrastável) e Lenis (scroll suave) |
| Dados | API REST do GitHub, com revalidação a cada hora (ISR) |
| Deploy | Vercel |

## O que é dinâmico

- **Projetos**: estrelas, linguagens, último push, última release e número de commits vêm ao vivo do GitHub. Só os textos ficam em [`data/projects.ts`](data/projects.ts).
- **Projetos em mais de um repositório** (Assemble: app + API) aparecem como um par ligado.
- **Hero**: números do perfil (repositórios, estrelas, seguidores, anos no GitHub) com contagem animada.
- **Atividade**: commits públicos recentes e o gráfico de contribuições em Pac-Man.
- **Interação**: parallax do fundo, brilho que segue o cursor, filtro de habilidades, linha do tempo que se desenha no scroll, respeitando `prefers-reduced-motion`.

## Rodar localmente

```bash
npm install
npm run dev
```

`GITHUB_TOKEN` é opcional (leitura pública). Defina em `.env.local` para ampliar o limite de requisições da API.

## Adicionar um projeto

Edite [`data/projects.ts`](data/projects.ts) e acrescente um item com `repos` (um ou mais). As métricas aparecem sozinhas.

## Estrutura

```
app/          layout, página e estilos globais
components/   seções e peças de interface
data/         projetos, habilidades e experiência
lib/          configuração do site e cliente do GitHub
public/       imagens otimizadas
_archive/     versão estática anterior (HTML/CSS/JS)
```
