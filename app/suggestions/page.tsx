"use client";

import { TopBar } from "@/components/TopBar";
import { Card, Pill } from "@/components/Primitives";
import { Sparkles, Check, X, GitBranch } from "lucide-react";

const list = [
  {
    file: "docs/api/sessions.mdx",
    repo: "core/api-gateway",
    reason: "Function signature changed in a31f9c2",
    confidence: 96,
    impact: "high",
    active: true,
  },
  {
    file: "docs/architecture/data-flow.mdx",
    repo: "core/api-gateway",
    reason: "New middleware added in 9b21d4e",
    confidence: 91,
    impact: "med",
  },
  {
    file: "docs/billing/proration.mdx",
    repo: "core/billing-service",
    reason: "Edge case handled in 7f4ce18",
    confidence: 88,
    impact: "med",
  },
  {
    file: "README.md",
    repo: "web/dashboard",
    reason: "Install instructions outdated",
    confidence: 79,
    impact: "low",
  },
  {
    file: "docs/webhooks.mdx",
    repo: "core/billing-service",
    reason: "Signing scheme update",
    confidence: 84,
    impact: "med",
  },
];

export default function SuggestionsPage() {
  return (
    <>
      <TopBar
        crumbs={[{ label: "acme" }, { label: "AI Suggestions" }]}
      />
      <div className="flex-1 grid grid-cols-12 min-h-0">
        <aside className="col-span-5 xl:col-span-4 border-r border-border overflow-y-auto">
          <div className="px-4 py-3 border-b border-border flex items-center justify-between">
            <div>
              <h3 className="text-[13.5px] font-medium">Open suggestions</h3>
              <p className="text-[11.5px] text-muted-foreground mt-0.5">28 pending · 9 new</p>
            </div>
            <div className="flex items-center gap-1 text-[11.5px]">
              {["All", "High", "Med", "Low"].map((t, i) => (
                <button
                  key={t}
                  className={`px-2 py-1 rounded-md ${
                    i === 0
                      ? "bg-surface text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <ul>
            {list.map((s) => (
              <li
                key={s.file}
                className={`px-4 py-3 border-b border-border cursor-pointer hover:bg-surface ${
                  s.active ? "bg-surface" : ""
                }`}
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="size-3.5 text-violet" />
                  <span className="font-mono text-[12.5px] truncate flex-1">{s.file}</span>
                  <Pill
                    tone={s.impact === "high" ? "danger" : s.impact === "med" ? "warn" : "default"}
                  >
                    {s.impact}
                  </Pill>
                </div>
                <p className="mt-1 text-[12.5px] text-muted-foreground">{s.reason}</p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-[11px] text-muted-foreground font-mono">{s.repo}</span>
                  <span className="ml-auto text-[11px] font-mono text-success">
                    {s.confidence}% conf.
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </aside>

        {/* detail */}
        <main className="col-span-7 xl:col-span-8 overflow-y-auto">
          <div className="px-6 py-5 border-b border-border">
            <div className="flex items-center gap-2 mb-2">
              <Pill tone="violet">AI · Claude 3.7</Pill>
              <Pill tone="danger">high impact</Pill>
              <span className="text-[11.5px] text-muted-foreground font-mono">
                core/api-gateway · sessions.mdx
              </span>
            </div>
            <h1 className="text-2xl tracking-tight font-medium">
              Document the new <span className="font-mono">leeway</span> option in{" "}
              <span className="font-mono">verifySession</span>
            </h1>
            <p className="mt-2 text-[13.5px] text-muted-foreground max-w-2xl">
              The signature changed in commit a31f9c2. The docs still describe the old single-arg
              form. Suggested rewrite below.
            </p>

            <div className="mt-4 flex items-center gap-2">
              <button className="inline-flex items-center gap-1.5 h-8 px-3 rounded-md bg-foreground text-background text-[12.5px] font-medium">
                <Check className="size-3.5" /> Apply &amp; open PR
              </button>
              <button className="inline-flex items-center gap-1.5 h-8 px-3 rounded-md border border-border text-[12.5px]">
                <GitBranch className="size-3.5" /> Edit branch
              </button>
              <button className="inline-flex items-center gap-1.5 h-8 px-3 rounded-md border border-border text-[12.5px] text-muted-foreground hover:text-foreground">
                <X className="size-3.5" /> Dismiss
              </button>
            </div>
          </div>

          <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card className="p-0 overflow-hidden">
              <div className="px-4 py-2 border-b border-border flex items-center justify-between">
                <span className="text-[12px] text-muted-foreground">Before</span>
                <span className="font-mono text-[11px] text-muted-foreground">v2.4.0</span>
              </div>
              <pre className="p-4 font-mono text-[12.5px] leading-relaxed text-muted-foreground line-through decoration-destructive/40">
                {`### verifySession(token)\n\nVerifies a session JWT and returns the\nattached claims object.`}
              </pre>
            </Card>
            <Card className="p-0 overflow-hidden border-[oklch(0.5_0.12_152/0.4)]">
              <div className="px-4 py-2 border-b border-border flex items-center justify-between">
                <span className="text-[12px] text-success">Suggested</span>
                <span className="font-mono text-[11px] text-muted-foreground">v2.4.1</span>
              </div>
              <pre className="p-4 font-mono text-[12.5px] leading-relaxed">
                {`### verifySession(token, options?)\n\nVerifies a session JWT and returns the\nattached claims object.\n\n- `}
                <span className="text-success">options.leeway</span>
                {` — clock skew tolerance in\n  seconds (default 0).`}
              </pre>
            </Card>
          </div>

          <div className="px-6 pb-8">
            <Card className="p-4">
              <div className="text-[10.5px] uppercase tracking-[0.12em] text-muted-foreground">
                Reasoning trace
              </div>
              <ol className="mt-3 space-y-2 text-[12.5px] text-muted-foreground list-decimal pl-5 marker:text-foreground/60">
                <li>Detected change in <span className="font-mono">src/auth/session.ts</span> (commit a31f9c2).</li>
                <li>
                  Cross-referenced with{" "}
                  <span className="font-mono">docs/api/sessions.mdx</span> — found mismatched
                  signature.
                </li>
                <li>
                  Generated minimal-diff rewrite preserving heading style and existing prose voice.
                </li>
                <li>Confidence boosted by 4 unit tests covering the new option.</li>
              </ol>
            </Card>
          </div>
        </main>
      </div>
    </>
  );
}



