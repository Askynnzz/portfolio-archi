"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/app/components/ThemeToggle";
import { LangSwitch } from "@/app/components/LangSwitch";
import useScrollSpy from "@/app/components/useScrollSpy";

export function Header({ locale }: { locale: "fr" | "en" }) {
  const [shrink, setShrink] = useState(false);
  const active = useScrollSpy(locale === "fr" ? ["projets", "apropos", "contact"] : ["projects", "about", "contact"]);

  useEffect(() => {
    const onScroll = () => setShrink(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const link = (href: string, label: string, id: string) => (
    <a
      href={href}
      className={`text-sm transition-colors ${active === id ? "text-zinc-900 dark:text-white" : "text-zinc-600 dark:text-white/70 hover:text-zinc-900 dark:hover:text-white"}`}
    >
      {label}
    </a>
  );

  const labels = locale === "fr"
    ? { p: "Projets", a: "À propos", c: "Contact" }
    : { p: "Projects", a: "About", c: "Contact" };

  return (
    <div className={`sticky top-0 z-50 border-b border-zinc-200/60 dark:border-white/10 backdrop-blur ${shrink ? "py-2" : "py-3"}`}>
      <div className="mx-auto max-w-6xl px-4 flex items-center justify-between">
        <Link href={locale === "fr" ? "/fr" : "/en"} className="font-semibold tracking-tight">
          {locale === "fr" ? "Portfolio — FR" : "Portfolio — EN"}
        </Link>
        <div className="hidden sm:flex items-center gap-3">
          {locale === "fr" ? (
            <>
              {link("#projets", labels.p, "projets")}
              {link("#apropos", labels.a, "apropos")}
              {link("#contact", labels.c, "contact")}
            </>
          ) : (
            <>
              {link("#projects", labels.p, "projects")}
              {link("#about", labels.a, "about")}
              {link("#contact", labels.c, "contact")}
            </>
          )}
          <ThemeToggle />
          <LangSwitch locale={locale} />
        </div>
      </div>
    </div>
  );
}
