// =============================
// file: app/(i18n)/en/layout.tsx
// =============================
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio — EN",
  alternates: { languages: { fr: "/fr", en: "/en" } },
};

// ⬇️ Pas de <html> / <body> ici !
export default function LayoutEN({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
