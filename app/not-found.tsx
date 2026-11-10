import Link from "next/link";

export const metadata = { title: "404" };

export default function NotFound() {
  return (
    <main className="grid min-h-svh place-items-center px-5">
      <div className="glass w-full max-w-xl overflow-hidden">
        <div className="flex items-center gap-2 border-b border-line px-5 py-3.5">
          <span className="size-3 rounded-full bg-[#ff5f56]" aria-hidden />
          <span className="size-3 rounded-full bg-[#ffbd2e]" aria-hidden />
          <span className="size-3 rounded-full bg-[#27c93f]" aria-hidden />
          <span className="ml-3 font-mono text-xs text-muted">felipe@portfolio:~</span>
        </div>
        <div className="space-y-3 p-6 font-mono text-sm leading-relaxed">
          <p>
            <span className="text-primary">$</span> cd {"/pagina-que-nao-existe"}
          </p>
          <p className="text-muted">bash: cd: no such file or directory (404)</p>
          <p className="text-muted">Esta página não existe. This page does not exist.</p>
          <p>
            <span className="text-primary">$</span> cd ~
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/"
              className="rounded-full bg-fg px-6 py-2.5 font-sans text-base font-semibold text-bg transition-colors hover:bg-secondary active:scale-95"
            >
              Voltar ao início
            </Link>
            <Link
              href="/#projects"
              className="rounded-full border-2 border-fg px-6 py-2.5 font-sans text-base font-semibold transition-colors hover:border-primary hover:text-primary active:scale-95"
            >
              Ver projetos
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
