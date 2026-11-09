import type { ReactNode } from "react";
import { Icon, type IconName } from "./Icon";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "link";
  icon?: IconName;
  external?: boolean;
  className?: string;
};

const base = "group inline-flex items-center gap-2.5 font-medium transition duration-300";

const variants = {
  primary: `${base} rounded-full bg-primary py-2.5 pr-2.5 pl-6 text-bg hover:bg-secondary`,
  secondary: `${base} rounded-full border border-white/20 bg-white/5 px-6 py-3.5 hover:border-primary hover:text-primary`,
  link: `${base} border-b border-primary/45 py-1.5 text-primary hover:border-primary`,
} as const;

/** Botão B2: primário dourado com seta que gira, secundário de vidro e link sublinhado. */
export function Button({
  href,
  children,
  variant = "primary",
  icon,
  external = false,
  className = "",
}: ButtonProps) {
  const externalProps = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
  return (
    <a href={href} {...externalProps} className={`${variants[variant]} ${className}`}>
      {variant !== "primary" && icon && <Icon name={icon} />}
      {children}
      {variant === "primary" && (
        <span className="grid size-9 place-items-center rounded-full bg-bg text-primary transition-transform duration-300 group-hover:rotate-45">
          <Icon name="arrow" />
        </span>
      )}
    </a>
  );
}
