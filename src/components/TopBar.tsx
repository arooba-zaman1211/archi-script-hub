import { GitBranch, ChevronRight, Bell, Plus, Command } from "lucide-react";
import type { ReactNode } from "react";

export function TopBar({
  crumbs = [],
  actions,
}: {
  crumbs?: { label: string; mono?: boolean }[];
  actions?: ReactNode;
}) {
  return (
    <header className="sticky top-0 z-20 flex h-12 items-center gap-2 px-5 border-b border-border bg-background/80 backdrop-blur-md">
      <nav className="flex items-center gap-1.5 text-[13px]">
        {crumbs.map((c, i) => (
          <div key={i} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight className="size-3 text-muted-foreground/60" />}
            <span
              className={`${
                i === crumbs.length - 1 ? "text-foreground" : "text-muted-foreground"
              } ${c.mono ? "font-mono" : ""}`}
            >
              {c.label}
            </span>
          </div>
        ))}
      </nav>

      <div className="ml-3 hidden lg:flex items-center gap-1.5 px-2 py-1 rounded-md border border-border text-[11.5px] text-muted-foreground font-mono">
        <GitBranch className="size-3" />
        main
        <span className="size-1 rounded-full bg-success ml-1" />
      </div>

      <div className="ml-auto flex items-center gap-2">
        {actions}
        <button className="hidden md:flex items-center gap-2 px-2.5 py-1 rounded-md border border-border text-[12px] text-muted-foreground hover:text-foreground hover:bg-surface transition">
          <Command className="size-3" />
          K
        </button>
        <button className="size-8 grid place-items-center rounded-md border border-border text-muted-foreground hover:text-foreground hover:bg-surface transition">
          <Bell className="size-3.5" />
        </button>
        <button className="flex items-center gap-1.5 h-8 px-2.5 rounded-md bg-foreground text-background text-[12.5px] font-medium hover:opacity-90 transition">
          <Plus className="size-3.5" />
          New repo
        </button>
      </div>
    </header>
  );
}
