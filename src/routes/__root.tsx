import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  Link,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { AppSidebar } from "@/components/AppSidebar";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <div className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
          Error · 404
        </div>
        <h1 className="mt-3 text-2xl font-medium tracking-tight">Page not found</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          That route doesn't exist in this workspace.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center justify-center rounded-md bg-foreground px-3 py-1.5 text-[13px] font-medium text-background hover:opacity-90"
        >
          Back to dashboard
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-medium tracking-tight">Something broke</h1>
        <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
        <button
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className="mt-6 inline-flex items-center justify-center rounded-md bg-foreground px-3 py-1.5 text-[13px] font-medium text-background"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Dexigen — AI-powered engineering documentation" },
      {
        name: "description",
        content:
          "Connect GitHub, auto-generate developer docs, detect stale documentation, and ship AI updates.",
      },
      { property: "og:title", content: "Dexigen — AI-powered engineering documentation" },
      { property: "og:description", content: "AI-powered platform for automated engineering documentation, code change tracking, and AI-driven updates." },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Dexigen — AI-powered engineering documentation" },
      { name: "description", content: "AI-powered platform for automated engineering documentation, code change tracking, and AI-driven updates." },
      { name: "twitter:description", content: "AI-powered platform for automated engineering documentation, code change tracking, and AI-driven updates." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/97c157bd-2d8a-49e2-ba63-c6a16ef2f479/id-preview-9d4ee7e5--2b2b6b51-9ebd-4cfe-92cf-b35a84673e9e.lovable.app-1779007241336.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/97c157bd-2d8a-49e2-ba63-c6a16ef2f479/id-preview-9d4ee7e5--2b2b6b51-9ebd-4cfe-92cf-b35a84673e9e.lovable.app-1779007241336.png" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex bg-background text-foreground">
        <AppSidebar />
        <div className="flex-1 min-w-0 flex flex-col">
          <Outlet />
        </div>
      </div>
    </QueryClientProvider>
  );
}
