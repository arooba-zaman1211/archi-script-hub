"use client";

import Link from "next/link";
import {
  GitCommit,
  AlertTriangle,
  Sparkles,
  ArrowUpRight,
  FileText,
  Activity,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { TopBar } from "@/components/TopBar";
import { Card, StatTile, Pill, SectionHeader, Sparkline } from "@/components/Primitives";

const repos = [
  {
    name: "core/api-gateway",
    desc: "Edge router and auth middleware",
    lang: "Go",
    coverage: 92,
    stale: 3,
    suggestions: 5,
    pulse: [4, 6, 5, 8, 7, 9, 12, 10, 11, 14, 13, 15],
    pulseColor: "oklch(0.7 0.15 230)",
  },
  {
    name: "core/billing-service",
    desc: "Subscriptions, invoices, Stripe sync",
    lang: "TypeScript",
    coverage: 78,
    stale: 7,
    suggestions: 11,
    pulse: [8, 7, 9, 6, 10, 8, 7, 9, 11, 9, 10, 12],
    pulseColor: "oklch(0.74 0.17 152)",
  },
  {
    name: "web/dashboard",
    desc: "React workspace + design system",
    lang: "TypeScript",
    coverage: 84,
    stale: 2,
    suggestions: 4,
    pulse: [3, 4, 4, 6, 5, 7, 6, 8, 7, 9, 8, 10],
    pulseColor: "oklch(0.66 0.2 290)",
  },
  {
    name: "infra/terraform",
    desc: "Cloud topology and IAM",
    lang: "HCL",
    coverage: 61,
    stale: 9,
    suggestions: 8,
    pulse: [2, 3, 2, 4, 3, 5, 4, 6, 5, 4, 6, 5],
    pulseColor: "oklch(0.8 0.16 80)",
  },
];

const activity = [
  {
    icon: GitCommit,
    title: "feat(billing): add seat-based proration",
    repo: "core/billing-service",
    time: "2m",
    pill: { tone: "info" as const, label: "AUTO-DOC" },
  },
  {
    icon: AlertTriangle,
    title: "Stale: docs/auth/sessions.mdx out of sync with src/auth/session.ts",
    repo: "core/api-gateway",
    time: "14m",
    pill: { tone: "warn" as const, label: "STALE" },
  },
  {
    icon: Sparkles,
    title: "AI suggested 4 updates to ARCHITECTURE.md",
    repo: "web/dashboard",
    time: "32m",
    pill: { tone: "violet" as const, label: "SUGGEST" },
  },
  {
    icon: CheckCircle2,
    title: "Merged PR #482 — refactor: extract retry middleware",
    repo: "core/api-gateway",
    time: "1h",
    pill: { tone: "success" as const, label: "MERGED" },
  },
  {
    icon: FileText,
    title: "Generated reference for 12 new endpoints",
    repo: "core/billing-service",
    time: "3h",
    pill: { tone: "default" as const, label: "DOCS" },
  },
];

export default function DashboardPage() {
  return (
    <>
      <TopBar
        crumbs={[{ label: "acme" }, { label: "Dashboard" }]}
      />

      <div className="px-6 lg:px-8 py-6 space-y-8 max-w-[1400px] w-full">
        {/* Hero */}
        <div className="relative overflow-hidden rounded-xl border border-border bg-card">
          <div className="absolute inset-0 dot-bg opacity-50" />
          <div className="absolute -top-24 -right-24 size-72 rounded-full bg-[oklch(0.5_0.18_265/0.18)] blur-3xl" />
          <div className="relative p-6 md:p-8 flex flex-col md:flex-row md:items-end gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.15em] text-muted-foreground">
                <span className="size-1.5 rounded-full bg-success animate-pulse" />
                Indexing live · 4 repositories
              </div>
              <h1 className="mt-3 text-3xl md:text-4xl tracking-tight font-medium text-balance">
                Documentation that keeps up with your codebase.
              </h1>
              <p className="mt-2 text-[14px] text-muted-foreground max-w-xl">
                Dexigen watches every commit, detects drift between code and docs, and proposes
                AI-authored updates you can merge in one click.
              </p>
              <div className="mt-5 flex items-center gap-2">
                <Link
                  href="/suggestions"
                  className="inline-flex items-center gap-1.5 h-8 px-3 rounded-md bg-foreground text-background text-[12.5px] font-medium hover:opacity-90"
                >
                  Review 28 suggestions <ArrowUpRight className="size-3.5" />
                </Link>
                <Link
                  href="/integrations"
                  className="inline-flex items-center gap-1.5 h-8 px-3 rounded-md border border-border text-[12.5px] hover:bg-surface"
                >
                  Connect a repo
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 md:w-[360px]">
              <StatTile label="Docs synced" value="1,284" delta="+42 today" />
              <StatTile label="Stale files" value="21" delta="−6" trend="down" />
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <StatTile label="Coverage" value="83%" delta="+2.1%" />
          <StatTile label="AI suggestions" value="28" delta="9 new" trend="up" />
          <StatTile label="Commits indexed" value="4,912" delta="+184" />
          <StatTile label="Avg. doc latency" value="42s" delta="−18%" trend="down" />
        </div>

        {/* Repositories */}
        <section>
          <SectionHeader
            title="Repositories"
            hint="Connected via GitHub · auto-indexed on push"
            right={
              <button className="text-[12px] text-muted-foreground hover:text-foreground inline-flex items-center gap-1">
                View all <ArrowUpRight className="size-3" />
              </button>
            }
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {repos.map((r) => (
              <Card key={r.name} className="p-4 hover:border-border-strong transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[13.5px]">{r.name}</span>
                      <Pill>{r.lang}</Pill>
                    </div>
                    <p className="mt-1 text-[12.5px] text-muted-foreground truncate">{r.desc}</p>
                  </div>
                  <Sparkline values={r.pulse} color={r.pulseColor} />
                </div>

                <div className="mt-4 grid grid-cols-3 gap-3 text-[12px]">
                  <Metric label="Coverage" value={`${r.coverage}%`} bar={r.coverage} />
                  <Metric label="Stale" value={`${r.stale}`} accent="warn" />
                  <Metric label="Suggestions" value={`${r.suggestions}`} accent="violet" />
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Activity + Health */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          <Card className="lg:col-span-2 p-0">
            <div className="px-4 py-3 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="size-3.5 text-muted-foreground" />
                <h3 className="text-[13.5px] font-medium">Live activity</h3>
              </div>
              <span className="text-[11px] text-muted-foreground font-mono">streaming</span>
            </div>
            <ul className="divide-y divide-border">
              {activity.map((a, i) => {
                const Icon = a.icon;
                return (
                  <li key={i} className="px-4 py-3 flex items-center gap-3 hover:bg-surface/50">
                    <div className="size-7 rounded-md bg-surface-2 grid place-items-center text-muted-foreground">
                      <Icon className="size-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[13px] truncate">{a.title}</div>
                      <div className="text-[11.5px] text-muted-foreground font-mono mt-0.5">
                        {a.repo}
                      </div>
                    </div>
                    <Pill tone={a.pill.tone}>{a.pill.label}</Pill>
                    <span className="text-[11px] text-muted-foreground font-mono w-8 text-right">
                      {a.time}
                    </span>
                  </li>
                );
              })}
            </ul>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="size-3.5 text-muted-foreground" />
              <h3 className="text-[13.5px] font-medium">Doc health</h3>
            </div>
            <div className="mt-4 space-y-3">
              {[
                { label: "Up-to-date", value: 1184, color: "bg-success", pct: 78 },
                { label: "Drift detected", value: 79, color: "bg-warning", pct: 14 },
                { label: "Missing", value: 21, color: "bg-destructive", pct: 8 },
              ].map((s) => (
                <div key={s.label}>
                  <div className="flex items-baseline justify-between text-[12px]">
                    <span className="text-muted-foreground">{s.label}</span>
                    <span className="font-mono">{s.value}</span>
                  </div>
                  <div className="mt-1.5 h-1 rounded-full bg-surface-2 overflow-hidden">
                    <div className={`h-full ${s.color}`} style={{ width: `${s.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-border">
              <div className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                Today
              </div>
              <div className="mt-2 font-mono text-2xl tracking-tight">+42 docs</div>
              <div className="text-[11.5px] text-muted-foreground">authored by AI · 7 by humans</div>
            </div>
          </Card>
        </section>
      </div>
    </>
  );
}

function Metric({
  label,
  value,
  bar,
  accent,
}: {
  label: string;
  value: string;
  bar?: number;
  accent?: "warn" | "violet";
}) {
  const color =
    accent === "warn" ? "text-warning" : accent === "violet" ? "text-violet" : "text-foreground";
  return (
    <div>
      <div className="text-[10.5px] uppercase tracking-[0.12em] text-muted-foreground">{label}</div>
      <div className={`mt-1 font-mono text-[13.5px] ${color}`}>{value}</div>
      {bar !== undefined && (
        <div className="mt-1.5 h-[3px] rounded-full bg-surface-2 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-info to-[oklch(0.66_0.2_290)]"
            style={{ width: `${bar}%` }}
          />
        </div>
      )}
    </div>
  );
}



