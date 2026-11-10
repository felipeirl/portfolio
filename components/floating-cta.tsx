"use client";

import { useEffect, useState } from "react";
import { strings } from "@/data/strings";
import { useLocale } from "./locale";

/** Botão discreto que aparece depois do hero e leva ao contato. */
export function FloatingCta() {
  const { t } = useLocale();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("top");
    const contact = document.getElementById("contact");
    if (!hero) return;

    let heroGone = false;
    let atContact = false;
    const update = () => setVisible(heroGone && !atContact);

    const heroObserver = new IntersectionObserver(([entry]) => {
      heroGone = !entry?.isIntersecting;
      update();
    });
    const contactObserver = new IntersectionObserver(([entry]) => {
      atContact = !!entry?.isIntersecting;
      update();
    });
    heroObserver.observe(hero);
    if (contact) contactObserver.observe(contact);

    return () => {
      heroObserver.disconnect();
      contactObserver.disconnect();
    };
  }, []);

  return (
    <a
      href="#contact"
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={`fixed right-5 bottom-5 z-40 rounded-full bg-primary px-6 py-3 font-semibold text-bg shadow-[0_8px_32px_rgb(0_0_0/0.4)] transition-all duration-300 hover:bg-secondary active:scale-95 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      {t(strings.hero.ctaContact)}
    </a>
  );
}
