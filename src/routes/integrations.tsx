import { createFileRoute } from "@tanstack/react-router";
import { TopBar } from "@/components/TopBar";
import { Card, Pill } from "@/components/Primitives";
import { Github, Check, ArrowRight, Webhook, KeyRound, GitBranch } from "lucide-react";

export const Route = createFileRoute("/integrations")({
  head: () => ({ meta: [{ title: "GitHub Integration — Dexigen" }] }),
  component: IntegrationsPage,
});

const repos = [
  { name: "acme/api-gateway", branch: "main", connected: true, indexed: "2m ago" },
  { name: "acme/billing-service", branch: "main", connected: true, indexed: "12m ago" },
  { name: "acme/dashboard", branch: "main", connected: true, indexed: "1h ago" },
  { name: "acme/terraform", branch: "production", connected: true, indexed: "4h ago" },
  { name: "acme/marketing-site", branch: "main", connected: false },
  { name: "acme/mobile-app", branch: "main", connected: false },
];

function IntegrationsPage() {
  return (
    <>
      <TopBar crumbs={[{ label: "Integrations" }, { label: "GitHub" }]} />
      <div className="px-6 lg:px-8 py-6 max-w-[1200px] w-full space-y-6">
        {/* Connection card */}
        <Card className="p-5">
          <div className="flex items-start gap-4">
            <div className="size-12 rounded-lg bg-surface-2 grid place-items-center border border-border">
              <Github className="size-6" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h2 className="text-[16px] font-medium">GitHub</h2>
                <Pill tone="success">
                  <Check className="size-2.5" /> connected
                </Pill>
              </div>
              <p className="text-[13px] text-muted-foreground mt-1">
                Installed on <span className="font-mono">acme</span> · 4 of 6 repositories indexed.
              </p>
              <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3 text-[12px]">
                <Detail label="Installation" value="acme-org" mono />
                <Detail label="App ID" value="dexigen-bot" mono />
                <Detail label="Webhook" value="active" tone="success" />
                <Detail label="Token rotates" value="in 28d" />
              </div>
            </div>
            <button className="h-8 px-3 rounded-md border border-border text-[12.5px] hover:bg-surface">
              Manage on GitHub
            </button>
          </div>
        </Card>

        {/* Repo selection */}
        <Card className="p-0">
          <div className="px-5 py-4 border-b border-border flex items-center justify-between">
            <div>
              <h3 className="text-[14px] font-medium">Repositories</h3>
              <p className="text-[12px] text-muted-foreground mt-0.5">
                Toggle repos to index. Dexigen will create a docs branch and open PRs.
              </p>
            </div>
            <button className="h-8 px-3 rounded-md bg-foreground text-background text-[12.5px] font-medium inline-flex items-center gap-1.5">
              Add repository <ArrowRight className="size-3.5" />
            </button>
          </div>
          <ul className="divide-y divide-border">
            {repos.map((r) => (
              <li key={r.name} className="px-5 py-3 flex items-center gap-4">
                <div className="size-8 rounded-md bg-surface-2 grid place-items-center">
                  <Github className="size-3.5 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-mono text-[13px] truncate">{r.name}</div>
                  <div className="mt-0.5 text-[11.5px] text-muted-foreground flex items-center gap-2">
                    <GitBranch className="size-3" />
                    <span className="font-mono">{r.branch}</span>
                    {r.indexed && <span>· last indexed {r.indexed}</span>}
                  </div>
                </div>
                {r.connected ? (
                  <Pill tone="success">indexed</Pill>
                ) : (
                  <Pill>not indexed</Pill>
                )}
                <button
                  className={`relative inline-flex h-5 w-9 items-center rounded-full border border-border transition ${
                    r.connected ? "bg-foreground" : "bg-surface-2"
                  }`}
                >
                  <span
                    className={`inline-block size-3.5 rounded-full transition ${
                      r.connected
                        ? "translate-x-[18px] bg-background"
                        : "translate-x-[2px] bg-foreground/40"
                    }`}
                  />
                </button>
              </li>
            ))}
          </ul>
        </Card>

        {/* Webhooks + Secrets */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-5">
            <div className="flex items-center gap-2">
              <Webhook className="size-3.5 text-muted-foreground" />
              <h3 className="text-[14px] font-medium">Webhook</h3>
              <Pill tone="success">200 OK</Pill>
            </div>
            <p className="mt-1 text-[12px] text-muted-foreground">
              Push, pull_request, and release events.
            </p>
            <div className="mt-3 rounded-md border border-border bg-[oklch(0.13_0.005_270)] p-3 font-mono text-[11.5px] text-muted-foreground break-all">
              https://api.dexigen.dev/v1/webhooks/github/acme
            </div>
            <div className="mt-3 flex items-center gap-3 text-[11.5px] text-muted-foreground">
              <span>Last delivery · 2m ago</span>
              <span>·</span>
              <span>Avg latency 84ms</span>
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-center gap-2">
              <KeyRound className="size-3.5 text-muted-foreground" />
              <h3 className="text-[14px] font-medium">Signing secret</h3>
            </div>
            <p className="mt-1 text-[12px] text-muted-foreground">
              Used to verify webhook payloads. Rotate quarterly.
            </p>
            <div className="mt-3 flex items-center gap-2">
              <code className="flex-1 rounded-md border border-border bg-[oklch(0.13_0.005_270)] px-3 py-2 font-mono text-[12px] text-muted-foreground">
                whsec_•••••••••••••••••••••3f7a
              </code>
              <button className="h-9 px-3 rounded-md border border-border text-[12px] hover:bg-surface">
                Reveal
              </button>
              <button className="h-9 px-3 rounded-md bg-foreground text-background text-[12px]">
                Rotate
              </button>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}

function Detail({
  label,
  value,
  mono,
  tone,
}: {
  label: string;
  value: string;
  mono?: boolean;
  tone?: "success";
}) {
  return (
    <div>
      <div className="text-[10.5px] uppercase tracking-[0.12em] text-muted-foreground">{label}</div>
      <div
        className={`mt-1 ${mono ? "font-mono" : ""} ${
          tone === "success" ? "text-success" : "text-foreground"
        } text-[13px]`}
      >
        {value}
      </div>
    </div>
  );
}
