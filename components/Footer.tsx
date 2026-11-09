import { nav, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#050505] pt-20 pb-8">
      <div className="mx-auto w-[90%] max-w-[1280px]">
        <div className="mb-16 flex flex-wrap items-start justify-between gap-12">
          <div className="max-w-md">
            <h2 className="font-accent text-3xl text-secondary">{site.name}</h2>
            <p className="mt-3 text-muted">
              Desenvolvedor Back-End focado em criar APIs resilientes, resolver gargalos de
              performance e construir modelagem de dados escalável.
            </p>
          </div>

          <nav aria-label="Rodapé">
            <h3 className="mb-5 text-base tracking-wider text-white">Páginas</h3>
            <ul className="flex flex-col gap-3">
              {nav.map(({ id, label }) => (
                <li key={id}>
                  <a href={`#${id}`} className="text-muted transition-colors hover:text-primary">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="mb-5 text-base tracking-wider text-white">Redes</h3>
            <div className="flex gap-4">
              {[
                { href: site.links.github, label: "GitHub", path: "M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.24 3.34.95.1-.74.4-1.24.72-1.53-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.42-2.7 5.4-5.27 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" },
                { href: site.links.linkedin, label: "LinkedIn", path: "M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" },
              ].map(({ href, label, path }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-transparent bg-white/5 transition duration-500 ease-bounce hover:-translate-y-1 hover:bg-primary hover:text-bg"
                >
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden>
                    <path d={path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        <p className="border-t border-white/5 pt-8 text-center text-sm text-white/30">
          &copy; {new Date().getFullYear()} {site.name}. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
