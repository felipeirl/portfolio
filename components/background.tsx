/** Pilares da Criação: uma cópia no topo e outra espelhada na base da página. */
export function Background() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="bg-pillars bg-pillars-top" />
      <div className="bg-pillars bg-pillars-bottom" />
    </div>
  );
}
