import type { Metadata } from "next";
import "../src/styles.css";
import { AppSidebar } from "@/components/AppSidebar";

export const metadata: Metadata = {
  title: "Dexigen - AI-powered engineering documentation",
  description:
    "Connect GitHub, auto-generate developer docs, detect stale documentation, and ship AI updates.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
        />
      </head>
      <body>
        <div className="min-h-screen flex bg-background text-foreground">
          <AppSidebar />
          <div className="flex-1 min-w-0 flex flex-col">{children}</div>
        </div>
      </body>
    </html>
  );
}
