"use client";

import { profile } from "@/data/profile";
import { sectionLinks, strings } from "@/data/strings";
import { Github, Linkedin } from "./icons";
import { useLocale } from "./locale";

const socialLink =
  "flex size-[50px] items-center justify-center rounded-full border border-transparent bg-white/5 text-xl transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-1 hover:bg-primary hover:text-bg";

export function Footer() {
  const { t } = useLocale();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-[#050505] pt-20 pb-8">
      <div className="mx-auto w-[90%] max-w-7xl">
        <div className="flex flex-wrap items-start justify-between gap-12">
          <div className="max-w-sm">
            <h2 className="font-accent text-3xl text-secondary">{profile.name}</h2>
            <p className="mt-3 text-muted">{t(strings.footer.tagline)}</p>
          </div>

          <div>
            <h3 className="mb-5 tracking-widest text-fg uppercase">{t(strings.footer.pages)}</h3>
            <ul className="flex flex-col gap-3">
              {sectionLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className="text-muted transition-colors hover:text-primary"
                  >
                    {t(link.label)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-5 tracking-widest text-fg uppercase">{t(strings.footer.social)}</h3>
            <div className="flex gap-4">
              <a
                href={profile.links.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className={socialLink}
              >
                <Github />
              </a>
              <a
                href={profile.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className={socialLink}
              >
                <Linkedin />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-3 border-t border-white/5 pt-8 text-sm text-white/30 sm:flex-row">
          <p>
            © {year} {profile.name}. {t(strings.footer.rights)}
          </p>
          <p>{t(strings.footer.built)}</p>
          <a href="#top" className="transition-colors hover:text-primary">
            {t(strings.footer.top)}
          </a>
        </div>
      </div>
    </footer>
  );
}
