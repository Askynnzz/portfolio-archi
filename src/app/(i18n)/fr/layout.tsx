// =============================
// file: app/(i18n)/fr/layout.tsx
// =============================
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio — FR",
  alternates: { languages: { fr: "/fr", en: "/en" } },
};

// ⬇️ Pas de <html> / <body> ici !
export default function LayoutFR({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
