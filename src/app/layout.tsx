import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import RouteTransition from "@/app/route-transition";
import ScrollProgressBar from "@/app/components/ScrollProgressBar";
import ScrollToTop from "@/app/components/ScrollToTop";
import "../app/globals.css";
import { Suspense } from "react";   // ← ajouté

export const metadata: Metadata = {
  title: "Architecture Portfolio",
  description: "Projects, competitions and research.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className="min-h-screen bg-white text-zinc-900 dark:bg-black dark:text-white">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ScrollProgressBar />
          <RouteTransition>
            <Suspense fallback={null}>
              {children}
            </Suspense>
          </RouteTransition>
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
