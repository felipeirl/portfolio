import Image from "next/image";

interface TechIconProps {
  id: string;
  label: string;
  size?: number;
}

/**
 * Ícones do skillicons.dev (MIT) servidos de public/icons: todos no mesmo formato,
 * em cinza até o hover. Carregamento imediato para não disparar rede durante a rolagem.
 */
export function TechIcon({ id, label, size = 48 }: TechIconProps) {
  return (
    <Image
      src={`/icons/${id}.svg`}
      alt={label}
      title={label}
      width={size}
      height={size}
      unoptimized
      loading="eager"
      decoding="async"
      className="skill-icon rounded-xl"
    />
  );
}
