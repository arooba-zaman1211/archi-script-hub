import { createFileRoute } from "@tanstack/react-router";
import { TopBar } from "@/components/TopBar";
import { Card, Pill } from "@/components/Primitives";
import { GitCommit, FileDiff, Plus, Minus } from "lucide-react";

export const Route = createFileRoute("/changes")({
  head: () => ({ meta: [{ title: "Changes — Dexigen" }] }),
  component: ChangesPage,
});

const commits = [
  {
    sha: "a31f9c2",
    msg: "feat(auth): add leeway option to verifySession",
    author: "maya",
    time: "2m",
    docs: 3,
    active: true,
  },
  { sha: "9b21d4e", msg: "refactor: extract retry middleware", author: "ren", time: "1h", docs: 1 },
  { sha: "7f4ce18", msg: "fix(billing): handle proration edge case", author: "leo", time: "3h", docs: 2 },
  { sha: "2cbd0a9", msg: "chore: bump dependencies", author: "maya", time: "5h", docs: 0 },
  { sha: "11ab84f", msg: "feat(api): introduce /v2/sessions endpoint", author: "ren", time: "1d", docs: 4 },
  { sha: "e92d77c", msg: "docs: clarify webhook signing", author: "leo", time: "2d", docs: 1 },
];

const diff = [
  { type: "ctx", n: 12, code: "export async function verifySession(" },
  { type: "del", n: 13, code: "  token: string" },
  { type: "add", n: 13, code: "  token: string," },
  { type: "add", n: 14, code: "  options: { leeway?: number } = {}" },
  { type: "ctx", n: 15, code: ") {" },
  { type: "ctx", n: 16, code: "  const claims = await jwt.verify(token, KEY, {" },
  { type: "del", n: 17, code: "    clockTolerance: 0," },
  { type: "add", n: 18, code: "    clockTolerance: options.leeway ?? 0," },
  { type: "ctx", n: 19, code: "  });" },
  { type: "ctx", n: 20, code: "  return claims;" },
  { type: "ctx", n: 21, code: "}" },
];

function ChangesPage() {
  return (
    <>
      <TopBar crumbs={[{ label: "core/api-gateway", mono: true }, { label: "Changes" }]} />
      <div className="flex-1 grid grid-cols-12 min-h-0">
        {/* commit list */}
        <aside className="col-span-4 xl:col-span-3 border-r border-border overflow-y-auto">
          <div className="px-4 py-3 border-b border-border flex items-center justify-between">
            <h3 className="text-[13.5px] font-medium">Recent commits</h3>
            <span className="text-[11px] text-muted-foreground font-mono">main</span>
          </div>
          <ul>
            {commits.map((c) => (
              <li
                key={c.sha}
                className={`px-4 py-3 border-b border-border cursor-pointer hover:bg-surface ${
                  c.active ? "bg-surface" : ""
                }`}
              >
                <div className="flex items-center gap-2">
                  <GitCommit className="size-3.5 text-muted-foreground" />
                  <span className="font-mono text-[11.5px] text-muted-foreground">{c.sha}</span>
                  {c.docs > 0 && <Pill tone="violet">{c.docs} doc{c.docs > 1 ? "s" : ""}</Pill>}
                  <span className="ml-auto text-[11px] text-muted-foreground font-mono">
                    {c.time}
                  </span>
                </div>
                <div className="mt-1 text-[13px] truncate">{c.msg}</div>
                <div className="mt-0.5 text-[11.5px] text-muted-foreground font-mono">
                  @{c.author}
                </div>
              </li>
            ))}
          </ul>
        </aside>

        {/* diff + AI */}
        <main className="col-span-8 xl:col-span-9 overflow-y-auto">
          <div className="px-6 py-5 border-b border-border">
            <div className="flex items-center gap-2 text-[12px] text-muted-foreground font-mono">
              <span>a31f9c2</span>
              <span>·</span>
              <span>maya</span>
              <span>·</span>
              <span>2m ago</span>
            </div>
            <h1 className="mt-2 text-2xl tracking-tight font-medium">
              feat(auth): add leeway option to verifySession
            </h1>
            <div className="mt-3 flex items-center gap-2">
              <Pill tone="success">+12</Pill>
              <Pill tone="danger">−4</Pill>
              <Pill>2 files</Pill>
              <Pill tone="violet">3 docs impacted</Pill>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-0">
            <Card className="xl:col-span-2 m-6 p-0 overflow-hidden">
              <div className="px-4 py-2.5 border-b border-border flex items-center gap-2">
                <FileDiff className="size-3.5 text-muted-foreground" />
                <span className="font-mono text-[12.5px]">src/auth/session.ts</span>
                <span className="ml-auto text-[11px] text-muted-foreground font-mono">
                  +5 −2
                </span>
              </div>
              <div className="font-mono text-[12.5px] leading-[1.6]">
                {diff.map((l, i) => {
                  const bg =
                    l.type === "add"
                      ? "bg-diff-add"
                      : l.type === "del"
                      ? "bg-diff-del"
                      : "";
                  const fg =
                    l.type === "add"
                      ? "text-diff-add-fg"
                      : l.type === "del"
                      ? "text-diff-del-fg"
                      : "text-foreground";
                  const sign = l.type === "add" ? "+" : l.type === "del" ? "−" : " ";
                  return (
                    <div key={i} className={`flex ${bg}`}>
                      <span className="w-10 text-right pr-2 text-muted-foreground/60 select-none">
                        {l.n}
                      </span>
                      <span className={`w-4 text-center select-none ${fg}`}>{sign}</span>
                      <span className={`flex-1 pr-4 ${fg}`}>{l.code}</span>
                    </div>
                  );
                })}
              </div>
            </Card>

            <aside className="xl:col-span-1 m-6 xl:ml-0 space-y-3">
              <Card className="p-4">
                <div className="flex items-center gap-2 text-[12.5px] font-medium">
                  <span className="size-1.5 rounded-full bg-violet" />
                  Doc impact
                </div>
                <ul className="mt-3 space-y-2 text-[12.5px]">
                  {[
                    { f: "docs/api/sessions.mdx", t: "warn" as const, l: "rewrite signature" },
                    { f: "docs/architecture/auth-model.mdx", t: "warn" as const, l: "update note" },
                    { f: "CHANGELOG.mdx", t: "info" as const, l: "append entry" },
                  ].map((d) => (
                    <li key={d.f} className="flex items-center gap-2">
                      <span className="font-mono truncate flex-1">{d.f}</span>
                      <Pill tone={d.t}>{d.l}</Pill>
                    </li>
                  ))}
                </ul>
                <button className="mt-4 w-full h-8 rounded-md bg-foreground text-background text-[12.5px] font-medium">
                  Generate doc updates
                </button>
              </Card>

              <Card className="p-4">
                <div className="text-[10.5px] uppercase tracking-[0.12em] text-muted-foreground">
                  Stats
                </div>
                <div className="mt-3 grid grid-cols-2 gap-3 text-[12.5px]">
                  <div className="flex items-center gap-1.5 text-success">
                    <Plus className="size-3" /> 12 lines
                  </div>
                  <div className="flex items-center gap-1.5 text-destructive">
                    <Minus className="size-3" /> 4 lines
                  </div>
                </div>
              </Card>
            </aside>
          </div>
        </main>
      </div>
    </>
  );
}
