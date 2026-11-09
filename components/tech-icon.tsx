import Image from "next/image";

interface TechIconProps {
  id: string;
  label: string;
  size?: number;
}

/** Ícones do skillicons.dev: todos no mesmo formato. */
export function TechIcon({ id, label, size = 48 }: TechIconProps) {
  return (
    <Image
      src={`https://skillicons.dev/icons?i=${id}&theme=dark`}
      alt={label}
      title={label}
      width={size}
      height={size}
      unoptimized
      className="rounded-xl"
    />
  );
}
