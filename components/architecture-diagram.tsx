interface Node {
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
  sub: string;
  accent?: boolean;
}

const NODES: Node[] = [
  { x: 10, y: 70, w: 150, h: 64, title: "App Android", sub: "Kotlin · Compose" },
  { x: 230, y: 70, w: 150, h: 64, title: "API", sub: "FastAPI" },
  { x: 450, y: 14, w: 150, h: 64, title: "Guardrail", sub: "Laya", accent: true },
  { x: 450, y: 126, w: 150, h: 64, title: "Firestore", sub: "dados e filas" },
  { x: 670, y: 14, w: 120, h: 64, title: "LLM", sub: "resposta" },
];

/** Diagrama de arquitetura do Assemble, em SVG, sem biblioteca. */
export function ArchitectureDiagram() {
  return (
    <svg
      viewBox="0 0 800 204"
      role="img"
      aria-label="App Android conversa com a API FastAPI por REST. A API passa pelo guardrail Laya até o LLM e guarda dados e filas no Firestore."
      className="h-auto w-full min-w-[640px]"
    >
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0 0 10 5 0 10Z" fill="#ffca89" />
        </marker>
      </defs>
      {[
        ["M160 102H230", "REST"],
        ["M380 90 450 46", ""],
        ["M600 46H670", ""],
        ["M380 114 450 158", ""],
      ].map(([d]) => (
        <path key={d} d={d} fill="none" stroke="#ffca89" strokeWidth="2" markerEnd="url(#arrow)" />
      ))}
      <text x="195" y="92" textAnchor="middle" fill="rgba(255,255,255,.7)" fontSize="12">
        REST
      </text>
      {NODES.map((node) => (
        <g key={node.title}>
          <rect
            x={node.x}
            y={node.y}
            width={node.w}
            height={node.h}
            rx="14"
            fill="#141414"
            stroke={node.accent ? "#ffca89" : "rgba(255,255,255,.2)"}
            strokeWidth={node.accent ? 2 : 1}
          />
          <text x={node.x + node.w / 2} y={node.y + 28} textAnchor="middle" fill="#ffead0" fontSize="16" fontWeight="600">
            {node.title}
          </text>
          <text x={node.x + node.w / 2} y={node.y + 48} textAnchor="middle" fill="rgba(255,255,255,.7)" fontSize="12">
            {node.sub}
          </text>
        </g>
      ))}
    </svg>
  );
}
