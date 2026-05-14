import { createFileRoute } from "@tanstack/react-router";
import { TopBar } from "@/components/TopBar";
import { Card, Pill } from "@/components/Primitives";
import { Maximize2, Search } from "lucide-react";

export const Route = createFileRoute("/graph")({
  head: () => ({ meta: [{ title: "Architecture — Dexigen" }] }),
  component: GraphPage,
});

type N = { id: string; x: number; y: number; label: string; kind: "service" | "db" | "edge" | "ext" };
const nodes: N[] = [
  { id: "edge", x: 120, y: 200, label: "edge/router", kind: "edge" },
  { id: "auth", x: 320, y: 120, label: "auth/session", kind: "service" },
  { id: "api", x: 320, y: 280, label: "api/gateway", kind: "service" },
  { id: "billing", x: 540, y: 200, label: "billing-service", kind: "service" },
  { id: "dash", x: 540, y: 380, label: "web/dashboard", kind: "service" },
  { id: "db", x: 760, y: 120, label: "postgres/primary", kind: "db" },
  { id: "queue", x: 760, y: 280, label: "queue/redis", kind: "db" },
  { id: "stripe", x: 760, y: 420, label: "stripe", kind: "ext" },
];
const edges: [string, string][] = [
  ["edge", "auth"],
  ["edge", "api"],
  ["api", "billing"],
  ["api", "dash"],
  ["auth", "db"],
  ["billing", "db"],
  ["billing", "queue"],
  ["billing", "stripe"],
  ["dash", "queue"],
];

const colors = {
  service: "oklch(0.7 0.15 230)",
  db: "oklch(0.74 0.17 152)",
  edge: "oklch(0.66 0.2 290)",
  ext: "oklch(0.8 0.16 80)",
} as const;

function GraphPage() {
  return (
    <>
      <TopBar crumbs={[{ label: "acme" }, { label: "Architecture graph" }]} />

      <div className="flex-1 grid grid-cols-12 min-h-0">
        <main className="col-span-9 relative overflow-hidden bg-background">
          <div className="absolute inset-0 grid-bg opacity-40" />
          <div className="absolute top-4 left-4 right-4 flex items-center gap-2 z-10">
            <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-md bg-card border border-border">
              <Search className="size-3.5 text-muted-foreground" />
              <input
                placeholder="Find a service…"
                className="bg-transparent outline-none text-[12.5px] w-48 placeholder:text-muted-foreground"
              />
            </div>
            <div className="flex items-center gap-1 px-1 py-1 rounded-md bg-card border border-border text-[12px]">
              {["Services", "Data", "Calls"].map((t, i) => (
                <button
                  key={t}
                  className={`px-2 py-0.5 rounded ${
                    i === 0 ? "bg-surface-2 text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="ml-auto flex items-center gap-2">
              <Pill tone="info">8 nodes</Pill>
              <Pill>9 edges</Pill>
              <button className="size-8 grid place-items-center rounded-md border border-border bg-card text-muted-foreground hover:text-foreground">
                <Maximize2 className="size-3.5" />
              </button>
            </div>
          </div>

          <svg viewBox="0 0 880 520" className="w-full h-full">
            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M0,0 L10,5 L0,10 z" fill="oklch(0.5 0.02 270)" />
              </marker>
            </defs>
            {edges.map(([a, b], i) => {
              const A = nodes.find((n) => n.id === a)!;
              const B = nodes.find((n) => n.id === b)!;
              return (
                <g key={i}>
                  <line
                    x1={A.x}
                    y1={A.y}
                    x2={B.x}
                    y2={B.y}
                    stroke="oklch(0.4 0.015 270)"
                    strokeWidth="1"
                    markerEnd="url(#arrow)"
                  />
                </g>
              );
            })}
            {nodes.map((n) => (
              <g key={n.id} transform={`translate(${n.x},${n.y})`}>
                <circle r="28" fill="oklch(0.18 0.006 270)" stroke={colors[n.kind]} strokeWidth="1.5" />
                <circle r="6" fill={colors[n.kind]} />
                <text
                  y="46"
                  textAnchor="middle"
                  fill="oklch(0.86 0.008 270)"
                  fontSize="11"
                  fontFamily="JetBrains Mono, monospace"
                >
                  {n.label}
                </text>
              </g>
            ))}
          </svg>

          <div className="absolute bottom-4 left-4 flex items-center gap-3 px-3 py-2 rounded-md bg-card border border-border text-[11.5px]">
            {Object.entries(colors).map(([k, c]) => (
              <div key={k} className="flex items-center gap-1.5 text-muted-foreground">
                <span className="size-2 rounded-full" style={{ background: c }} />
                {k}
              </div>
            ))}
          </div>
        </main>

        <aside className="col-span-3 border-l border-border overflow-y-auto">
          <div className="p-5 border-b border-border">
            <div className="text-[10.5px] uppercase tracking-[0.12em] text-muted-foreground">
              Selected node
            </div>
            <div className="mt-2 font-mono text-[14px]">billing-service</div>
            <p className="mt-1 text-[12px] text-muted-foreground">
              TypeScript · 78% doc coverage
            </p>
            <div className="mt-3 flex items-center gap-1.5 flex-wrap">
              <Pill tone="info">REST</Pill>
              <Pill tone="success">healthy</Pill>
              <Pill tone="warn">7 stale docs</Pill>
            </div>
          </div>

          <div className="p-5 border-b border-border">
            <div className="text-[10.5px] uppercase tracking-[0.12em] text-muted-foreground mb-2">
              Endpoints
            </div>
            <ul className="space-y-1.5 text-[12px] font-mono">
              {[
                ["GET", "/v1/subscriptions"],
                ["POST", "/v1/subscriptions"],
                ["POST", "/v1/invoices/preview"],
                ["POST", "/webhooks/stripe"],
              ].map(([m, p]) => (
                <li key={p} className="flex items-center gap-2">
                  <span className="text-info w-10">{m}</span>
                  <span className="truncate">{p}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-5">
            <div className="text-[10.5px] uppercase tracking-[0.12em] text-muted-foreground mb-2">
              Dependencies
            </div>
            <ul className="space-y-1.5 text-[12px] font-mono text-muted-foreground">
              <li>↳ postgres/primary</li>
              <li>↳ queue/redis</li>
              <li>↳ stripe</li>
            </ul>
          </div>
        </aside>
      </div>
    </>
  );
}
