import { nav, site } from "@/lib/site";
import { Icon, type IconName } from "./Icon";

const socials: { href: string; label: string; icon: IconName }[] = [
  { href: site.links.github, label: "GitHub", icon: "github" },
  { href: site.links.linkedin, label: "LinkedIn", icon: "linkedin" },
];

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
            <div className="flex gap-3">
              {socials.map(({ href, label, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid size-12 place-items-center rounded-full border border-primary/30 bg-primary/10 text-xl text-primary transition duration-300 hover:-translate-y-1 hover:bg-primary hover:text-bg"
                >
                  <Icon name={icon} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <p className="border-t border-white/5 pt-8 text-center text-sm text-white/40">
          &copy; {new Date().getFullYear()} {site.name}. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
