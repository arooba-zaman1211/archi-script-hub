"use client";

import { TopBar } from "@/components/TopBar";
import { Card, Pill } from "@/components/Primitives";
import {
  ChevronRight,
  FileText,
  Folder,
  FolderOpen,
  Search,
  Sparkles,
  Clock,
} from "lucide-react";
import { useState } from "react";

type Node = { name: string; type: "folder" | "file"; stale?: boolean; children?: Node[] };

const tree: Node[] = [
  {
    name: "getting-started",
    type: "folder",
    children: [
      { name: "introduction.mdx", type: "file" },
      { name: "installation.mdx", type: "file" },
      { name: "quickstart.mdx", type: "file" },
    ],
  },
  {
    name: "architecture",
    type: "folder",
    children: [
      { name: "overview.mdx", type: "file" },
      { name: "data-flow.mdx", type: "file", stale: true },
      { name: "auth-model.mdx", type: "file" },
    ],
  },
  {
    name: "api",
    type: "folder",
    children: [
      { name: "billing.mdx", type: "file" },
      { name: "sessions.mdx", type: "file", stale: true },
      { name: "webhooks.mdx", type: "file" },
    ],
  },
  { name: "CHANGELOG.mdx", type: "file" },
];

function FileTree({ nodes, depth = 0 }: { nodes: Node[]; depth?: number }) {
  const [open, setOpen] = useState<Record<string, boolean>>({
    architecture: true,
    api: true,
  });
  return (
    <ul className="text-[12.5px]">
      {nodes.map((n) => {
        const isOpen = open[n.name];
        const isActive = n.name === "data-flow.mdx";
        if (n.type === "folder") {
          return (
            <li key={n.name}>
              <button
                onClick={() => setOpen((o) => ({ ...o, [n.name]: !o[n.name] }))}
                className="w-full flex items-center gap-1.5 px-2 py-1 rounded hover:bg-surface text-muted-foreground hover:text-foreground"
                style={{ paddingLeft: 8 + depth * 12 }}
              >
                <ChevronRight
                  className={`size-3 transition-transform ${isOpen ? "rotate-90" : ""}`}
                />
                {isOpen ? <FolderOpen className="size-3.5" /> : <Folder className="size-3.5" />}
                <span className="font-mono">{n.name}</span>
              </button>
              {isOpen && n.children && <FileTree nodes={n.children} depth={depth + 1} />}
            </li>
          );
        }
        return (
          <li key={n.name}>
            <button
              className={`w-full flex items-center gap-1.5 px-2 py-1 rounded hover:bg-surface ${
                isActive ? "bg-surface text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
              style={{ paddingLeft: 8 + depth * 12 + 12 }}
            >
              <FileText className="size-3.5 opacity-70" />
              <span className="font-mono truncate">{n.name}</span>
              {n.stale && <span className="ml-auto size-1.5 rounded-full bg-warning" />}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export default function DocsPage() {
  return (
    <>
      <TopBar
        crumbs={[
          { label: "core/api-gateway", mono: true },
          { label: "docs", mono: true },
          { label: "architecture/data-flow.mdx", mono: true },
        ]}
      />
      <div className="flex-1 grid grid-cols-12 min-h-0">
        {/* file tree */}
        <aside className="col-span-3 xl:col-span-2 border-r border-border p-3 overflow-y-auto">
          <div className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-surface-2/60 mb-3">
            <Search className="size-3.5 text-muted-foreground" />
            <input
              className="bg-transparent outline-none text-[12.5px] flex-1 placeholder:text-muted-foreground"
              placeholder="Find a doc…"
            />
          </div>
          <div className="text-[10.5px] uppercase tracking-[0.12em] text-muted-foreground px-2 mb-1">
            Files
          </div>
          <FileTree nodes={tree} />
        </aside>

        {/* doc viewer */}
        <main className="col-span-9 xl:col-span-7 overflow-y-auto">
          <article className="max-w-3xl mx-auto px-8 py-10">
            <div className="flex items-center gap-2 mb-4">
              <Pill tone="warn">STALE · 3 commits behind</Pill>
              <Pill>v2.4.1</Pill>
              <span className="text-[11.5px] text-muted-foreground font-mono">
                edited 3d ago by AI
              </span>
            </div>
            <h1 className="text-4xl tracking-tight font-medium">Data flow</h1>
            <p className="mt-3 text-[15px] text-muted-foreground leading-relaxed">
              The gateway accepts inbound requests at the edge, authenticates the session, and
              dispatches to one of three downstream services. This page describes the canonical
              path a request takes through the system.
            </p>

            <h2 className="mt-10 text-[20px] tracking-tight font-medium">Request lifecycle</h2>
            <ol className="mt-3 space-y-2 text-[14px] text-muted-foreground list-decimal pl-5 marker:text-foreground/60">
              <li>Edge router resolves region and applies rate-limit policy.</li>
              <li>Session middleware verifies the JWT and attaches claims.</li>
              <li>Tracing context is propagated to downstream calls via W3C headers.</li>
              <li>Response is encoded, compressed, and streamed back.</li>
            </ol>

            <pre className="mt-6 rounded-lg border border-border bg-[oklch(0.13_0.005_270)] p-4 text-[12.5px] font-mono leading-relaxed overflow-x-auto">
              <span className="text-muted-foreground">{"// src/auth/session.ts"}</span>
              {`\n`}
              <span className="text-[oklch(0.74_0.17_152)]">export</span>{" "}
              <span className="text-[oklch(0.7_0.15_230)]">async function</span>{" "}
              <span className="text-[oklch(0.66_0.2_290)]">verifySession</span>
              (token: <span className="text-[oklch(0.8_0.16_80)]">string</span>) {"{"}
              {`\n  `}<span className="text-[oklch(0.7_0.15_230)]">const</span> claims ={" "}
              <span className="text-[oklch(0.7_0.15_230)]">await</span> jwt.verify(token, KEY);
              {`\n  `}<span className="text-[oklch(0.7_0.15_230)]">return</span> claims;
              {`\n}`}
            </pre>

            <div className="mt-6 rounded-lg border border-[oklch(0.5_0.13_80/0.4)] bg-[oklch(0.35_0.1_80/0.12)] p-4">
              <div className="flex items-center gap-2 text-[12.5px] text-warning font-medium">
                <Sparkles className="size-3.5" /> AI detected drift
              </div>
              <p className="mt-1.5 text-[13px] text-foreground/90">
                Function signature for <span className="font-mono">verifySession</span> changed in{" "}
                <span className="font-mono">a31f9c</span> — now accepts an{" "}
                <span className="font-mono">options</span> argument. This page should mention the
                new <span className="font-mono">leeway</span> parameter.
              </p>
              <div className="mt-3 flex items-center gap-2">
                <button className="h-7 px-2.5 rounded-md bg-foreground text-background text-[12px] font-medium">
                  Apply suggestion
                </button>
                <button className="h-7 px-2.5 rounded-md border border-border text-[12px]">
                  Open diff
                </button>
              </div>
            </div>

            <h2 className="mt-12 text-[20px] tracking-tight font-medium">Failure modes</h2>
            <p className="mt-2 text-[14px] text-muted-foreground leading-relaxed">
              When upstream services are saturated, the gateway sheds load by short-circuiting with
              a <span className="font-mono">503</span> and a hint header. Clients should retry with
              exponential backoff respecting the <span className="font-mono">Retry-After</span>{" "}
              hint.
            </p>
          </article>
        </main>

        {/* outline */}
        <aside className="hidden xl:block col-span-3 border-l border-border p-5 overflow-y-auto">
          <div className="text-[10.5px] uppercase tracking-[0.12em] text-muted-foreground mb-2">
            On this page
          </div>
          <ul className="space-y-1.5 text-[12.5px]">
            <li className="text-foreground border-l-2 border-foreground pl-2">Data flow</li>
            <li className="text-muted-foreground hover:text-foreground pl-2 cursor-pointer">
              Request lifecycle
            </li>
            <li className="text-muted-foreground hover:text-foreground pl-2 cursor-pointer">
              Failure modes
            </li>
          </ul>

          <div className="mt-8 rounded-lg border border-border p-3">
            <div className="text-[10.5px] uppercase tracking-[0.12em] text-muted-foreground mb-2">
              Source
            </div>
            <div className="text-[12px] font-mono leading-relaxed">
              <div>src/auth/session.ts</div>
              <div>src/edge/router.ts</div>
              <div>src/middleware/trace.ts</div>
            </div>
            <div className="mt-3 pt-3 border-t border-border flex items-center gap-1.5 text-[11.5px] text-muted-foreground">
              <Clock className="size-3" /> last commit · 3d ago
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}



