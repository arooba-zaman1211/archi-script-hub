import type { ReactNode } from "react";

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-lg border border-border bg-card ${className}`}>{children}</div>
  );
}

export function StatTile({
  label,
  value,
  delta,
  trend = "up",
}: {
  label: string;
  value: string;
  delta?: string;
  trend?: "up" | "down" | "flat";
}) {
  const trendColor =
    trend === "up" ? "text-success" : trend === "down" ? "text-destructive" : "text-muted-foreground";
  return (
    <Card className="p-4">
      <div className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">{label}</div>
      <div className="mt-2 flex items-baseline justify-between">
        <div className="font-mono text-2xl tracking-tight text-foreground">{value}</div>
        {delta && <div className={`text-[11.5px] font-mono ${trendColor}`}>{delta}</div>}
      </div>
    </Card>
  );
}

export function Pill({
  children,
  tone = "default",
}: {
  children: ReactNode;
  tone?: "default" | "success" | "warn" | "info" | "violet" | "danger";
}) {
  const tones: Record<string, string> = {
    default: "bg-surface-2 text-muted-foreground border-border",
    success: "bg-[oklch(0.32_0.08_152/0.25)] text-success border-[oklch(0.5_0.12_152/0.4)]",
    warn: "bg-[oklch(0.35_0.1_80/0.22)] text-warning border-[oklch(0.5_0.13_80/0.4)]",
    info: "bg-[oklch(0.32_0.1_230/0.25)] text-info border-[oklch(0.5_0.13_230/0.4)]",
    violet: "bg-[oklch(0.32_0.12_290/0.25)] text-violet border-[oklch(0.5_0.15_290/0.4)]",
    danger:
      "bg-[oklch(0.34_0.12_25/0.28)] text-[oklch(0.82_0.18_25)] border-[oklch(0.5_0.15_25/0.4)]",
  };
  return (
    <span
      className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md border text-[10.5px] font-mono ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

export function SectionHeader({
  title,
  hint,
  right,
}: {
  title: string;
  hint?: string;
  right?: ReactNode;
}) {
  return (
    <div className="flex items-end justify-between mb-3">
      <div>
        <h2 className="text-[15px] font-medium tracking-tight">{title}</h2>
        {hint && <p className="text-[12px] text-muted-foreground mt-0.5">{hint}</p>}
      </div>
      {right}
    </div>
  );
}

export function Sparkline({ values, color = "var(--info)" }: { values: number[]; color?: string }) {
  const w = 120;
  const h = 32;
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;
  const step = w / (values.length - 1);
  const pts = values
    .map((v, i) => `${i * step},${h - ((v - min) / range) * h}`)
    .join(" ");
  const area = `0,${h} ${pts} ${w},${h}`;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="overflow-visible">
      <defs>
        <linearGradient id={`grad-${color}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.35" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={area} fill={`url(#grad-${color})`} />
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}
