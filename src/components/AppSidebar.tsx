"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookText,
  GitPullRequest,
  Sparkles,
  Network,
  Github,
  Settings,
  Search,
  CircleDot,
} from "lucide-react";

const nav = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/docs", label: "Documentation", icon: BookText },
  { to: "/changes", label: "Changes & Diffs", icon: GitPullRequest },
  { to: "/suggestions", label: "AI Suggestions", icon: Sparkles, badge: 12 },
  { to: "/graph", label: "Architecture", icon: Network },
  { to: "/integrations", label: "Integrations", icon: Github },
];

const repos = [
  { name: "core/api-gateway", color: "bg-[color:var(--info)]" },
  { name: "core/billing-service", color: "bg-[color:var(--success)]" },
  { name: "web/dashboard", color: "bg-[color:var(--violet)]" },
  { name: "infra/terraform", color: "bg-[color:var(--warning)]" },
];

export function AppSidebar() {
  const path = usePathname();
  const isActive = (to: string) => (to === "/" ? path === "/" : path.startsWith(to));

  return (
    <aside className="hidden md:flex h-screen sticky top-0 w-[240px] shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground">
      {/* Workspace */}
      <div className="px-3 pt-3 pb-2">
        <button className="w-full flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-sidebar-accent transition-colors">
          <div className="size-6 rounded-md bg-foreground text-background grid place-items-center font-mono text-[11px] font-semibold">
            DX
          </div>
          <div className="flex-1 text-left">
            <div className="text-[13px] font-medium leading-tight">Dexigen</div>
            <div className="text-[10.5px] text-muted-foreground leading-tight">acme · Pro</div>
          </div>
          <kbd className="font-mono text-[10px] text-muted-foreground border border-border rounded px-1 py-0.5">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Search */}
      <div className="px-3 pb-2">
        <div className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-surface-2/60 border border-transparent hover:border-border transition">
          <Search className="size-3.5 text-muted-foreground" />
          <span className="text-[12.5px] text-muted-foreground">Search…</span>
        </div>
      </div>

      <nav className="px-2 mt-1 space-y-0.5">
        {nav.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.to);
          return (
            <Link
              key={item.to}
              href={item.to}
              className={`group flex items-center gap-2.5 px-2 py-1.5 rounded-md text-[13px] transition-colors ${
                active
                  ? "bg-sidebar-accent text-foreground"
                  : "text-sidebar-foreground/80 hover:text-foreground hover:bg-sidebar-accent/60"
              }`}
            >
              <Icon className="size-4 opacity-80" strokeWidth={1.75} />
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span className="font-mono text-[10px] text-muted-foreground">{item.badge}</span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="px-4 mt-6 mb-2 text-[10.5px] uppercase tracking-[0.12em] text-muted-foreground">
        Repositories
      </div>
      <div className="px-2 space-y-0.5">
        {repos.map((r) => (
          <button
            key={r.name}
            className="w-full flex items-center gap-2.5 px-2 py-1.5 rounded-md text-[12.5px] text-sidebar-foreground/80 hover:text-foreground hover:bg-sidebar-accent/60 transition-colors"
          >
            <span className={`size-1.5 rounded-full ${r.color}`} />
            <span className="font-mono truncate">{r.name}</span>
          </button>
        ))}
      </div>

      <div className="mt-auto p-3 border-t border-sidebar-border">
        <Link
          href="/integrations"
          className="flex items-center gap-2 text-[12.5px] text-sidebar-foreground/80 hover:text-foreground"
        >
          <Settings className="size-3.5" />
          Settings
        </Link>
        <div className="mt-3 flex items-center gap-2">
          <div className="size-6 rounded-full bg-gradient-to-br from-[oklch(0.7_0.17_265)] to-[oklch(0.66_0.2_290)]" />
          <div className="flex-1 min-w-0">
            <div className="text-[12px] truncate">Maya Tan</div>
            <div className="text-[10.5px] text-muted-foreground flex items-center gap-1">
              <CircleDot className="size-2.5 text-success" /> online
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}



