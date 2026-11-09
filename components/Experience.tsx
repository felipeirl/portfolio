import { experience } from "@/data/experience";
import { Reveal } from "./Reveal";

/** Experiência E2: cartão horizontal com selo da empresa, tags e indicador de cargo atual. */
export function Experience() {
  return (
    <section id="experiencia" className="relative py-24">
      <div className="mx-auto w-[90%] max-w-[1280px]">
        <Reveal className="mb-14">
          <h2 className="section-title mb-6">Experiência Profissional</h2>
          <p className="max-w-xl text-lg text-muted">Minha jornada no mercado de tecnologia.</p>
        </Reveal>

        <div className="flex max-w-4xl flex-col gap-5">
          {experience.map((item, i) => (
            <Reveal key={`${item.company}-${item.period}`} delay={i * 0.1}>
              <article className="glass grid grid-cols-[auto_1fr] items-start gap-x-5 gap-y-4 rounded-[24px] p-5 transition-colors duration-500 hover:border-primary/40 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:p-7">
                <span
                  aria-hidden
                  className="grid size-14 place-items-center rounded-2xl text-lg font-medium tracking-tight text-black/80"
                  style={{ background: item.brandColor }}
                >
                  {item.monogram}
                </span>

                <div className="min-w-0">
                  <h3 className="text-xl text-secondary">{item.title}</h3>
                  <p className="text-muted">
                    {item.company} · {item.period}
                  </p>
                  <p className="mt-3 max-w-2xl text-white/80">{item.description}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {item.highlights.map((h) => (
                      <li
                        key={h}
                        className="rounded-full border border-white/15 px-3 py-1 text-sm text-white/80"
                      >
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>

                {item.current && (
                  <span className="col-span-2 inline-flex items-center gap-2 justify-self-start rounded-full border border-emerald-300/40 px-3 py-1 text-sm whitespace-nowrap text-emerald-300 sm:col-span-1 sm:justify-self-end">
                    <span className="relative flex size-2">
                      <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-300 opacity-60" />
                      <span className="relative inline-flex size-2 rounded-full bg-emerald-300" />
                    </span>
                    Atual
                  </span>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
