

// =============================
// file: app/components/LangSwitch.tsx
// =============================
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Languages } from "lucide-react";


export function LangSwitch({ locale }: { locale: "fr"|"en" }){
const pathname = usePathname();
const target = locale === "fr" ? pathname.replace("/fr", "/en") : pathname.replace("/en", "/fr");
return (
<div className="flex items-center gap-2">
<Languages className="h-5 w-5 opacity-70"/>
<div className="flex overflow-hidden rounded-full border border-zinc-200/60 dark:border-white/10 text-sm">
<Link href={pathname.replace("/en", "/fr")} className={`px-2 py-1 ${locale==='fr'?'bg-zinc-100 dark:bg-white/10':''}`}>FR</Link>
<Link href={pathname.replace("/fr", "/en")} className={`px-2 py-1 ${locale==='en'?'bg-zinc-100 dark:bg-white/10':''}`}>EN</Link>
</div>
</div>
);
}