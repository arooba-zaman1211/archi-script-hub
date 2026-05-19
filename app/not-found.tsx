import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <div className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
          Error - 404
        </div>
        <h1 className="mt-3 text-2xl font-medium tracking-tight">Page not found</h1>
        <p className="mt-2 text-sm text-muted-foreground">That route doesn't exist in this workspace.</p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center justify-center rounded-md bg-foreground px-3 py-1.5 text-[13px] font-medium text-background hover:opacity-90"
        >
          Back to dashboard
        </Link>
      </div>
    </div>
  );
}
