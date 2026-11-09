# Portfólio — Felipe Jorge

Site pessoal de Felipe Jorge, desenvolvedor back-end. Next.js (App Router) com TypeScript, publicado na Vercel.

## Stack

- **Next.js 15** (App Router, React 19) e **TypeScript** estrito
- **Tailwind CSS v4** com tema próprio (ciano e violeta sobre fundo escuro)
- **Framer Motion** para animações, respeitando `prefers-reduced-motion`
- Dados dos projetos via **API do GitHub** (ISR, revalidação de 1 hora)
- Interface bilíngue **PT/EN**, paleta de comandos (`Ctrl/⌘ + K`), SEO, Open Graph gerado e JSON-LD

## Rodando localmente

```bash
npm install
npm run dev
```

Outros scripts:

```bash
npm run typecheck   # tsc --noEmit
npm run lint        # ESLint
npm run build       # build de produção
```

## Variáveis de ambiente

Todas opcionais:

| Variável | Para que serve |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | URL pública (canonical, sitemap, Open Graph). Padrão: `https://felipeirl.vercel.app` |
| `GITHUB_TOKEN` | Token somente leitura para aumentar o limite de requisições da API do GitHub |

Sem `GITHUB_TOKEN`, o site usa a API anônima. Se ela falhar, os cards mostram os links sem estrelas nem datas.

## Deploy na Vercel

1. Em [vercel.com/new](https://vercel.com/new), importe o repositório `felipeirl/portfolio`.
2. Mantenha as configurações detectadas (framework: Next.js).
3. Em *Settings → Environment Variables*, defina `NEXT_PUBLIC_SITE_URL` com o domínio final.

## Editando o conteúdo

Textos, links, stack, experiência e projetos em destaque ficam em [`data/profile.ts`](data/profile.ts). Strings da interface ficam em [`data/strings.ts`](data/strings.ts).

## Versão anterior

O site em HTML, CSS e JavaScript puros está preservado em [`_archive/legacy`](_archive/legacy).
