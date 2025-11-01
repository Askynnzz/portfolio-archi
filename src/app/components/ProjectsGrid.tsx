"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useMemo } from "react";
import type { Locale, Project } from "@/content/projects";
import { tagLabels } from "@/content/projects";
import ProjectModal from "@/app/components/ProjectModal";
import { Card, CardHeader, CardTitle, CardContent } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";

export default function ProjectsGrid({
  projects, locale, basePath, // basePath sert UNIQUEMENT pour le lien “page projet” (nouvel onglet)
}: { projects: Project[]; locale: Locale; basePath: string }) {
  const router = useRouter();
  const sp = useSearchParams();
  const pathname = usePathname(); // ← page courante (/fr ou /en)
  const openSlug = sp.get("p") ?? undefined;

  const bySlug = useMemo(() => new Map(projects.map(p => [p.slug[locale], p])), [projects, locale]);
  const current = openSlug ? bySlug.get(openSlug) : undefined;
  const labels = tagLabels[locale];

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => {
          const detailHref = `${basePath}/${p.slug[locale]}`;     // page dédiée (SEO/partage)
          const modalHref  = `${pathname}?p=${p.slug[locale]}`;   // modale: on reste sur la page courante

          return (
            <Link
              key={p.id}
              href={detailHref}
              onClick={(e) => {
                if (e.metaKey || e.ctrlKey || e.button === 1) return; // autorise nouvel onglet
                e.preventDefault();
                router.push(modalHref, { scroll: false });            // ← plus de 404
              }}
            >
              <Card className="overflow-hidden border-zinc-200/60 dark:border-white/10 bg-gradient-to-b from-white to-zinc-50 dark:from-zinc-950 dark:to-zinc-900 rounded-2xl group">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src={p.cover} alt={p.title[locale]} fill className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/10 to-transparent" />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    {p.title[locale]}
                    <Badge variant="secondary" className="bg-zinc-900/5 border-zinc-200/60 dark:bg-white/10 dark:border-white/10 dark:text-white/80">
                      {p.year}
                    </Badge>
                  </CardTitle>
                  <p className="text-sm text-zinc-600 dark:text-white/60">
                    {p.subtitle[locale]}{p.location ? ` • ${p.location[locale]}` : ""}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {p.tags.map(t => (
                      <Badge key={t} variant="secondary" className="bg-zinc-900/5 border-zinc-200/60 dark:bg-white/5 dark:border-white/10 dark:text-white/70">
                        {labels[t]}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {current && (
        <ProjectModal
          project={current}
          locale={locale}
          open={Boolean(current)}
          onOpenChange={(open) => {
            if (!open) router.push(pathname, { scroll: false }); // on revient à l’URL propre de la page
          }}
        />
      )}
    </>
  );
}
