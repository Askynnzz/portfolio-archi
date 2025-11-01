"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { Separator } from "@/app/components/ui/separator";
import ProjectsGrid from "@/app/components/ProjectsGrid";
import type { Locale, Project } from "@/content/projects";
import { tagLabels } from "@/content/projects";

type Props = {
  projects: Project[];
  locale: Locale;
  basePath: string;           // ex: "/en/projects"
  allLabel: string;           // ex: "All"
  searchPlaceholder: string;  // ex: "Search a project"
};

export default function ProjectsBrowser({
  projects, locale, basePath, allLabel, searchPlaceholder,
}: Props) {
  // Construire la liste des tags présents + leur label localisé
  const labels = tagLabels[locale];
  const allTagKeys = React.useMemo(
    () => Array.from(new Set(projects.flatMap(p => p.tags))),
    [projects]
  );

  // State filtres
  const [query, setQuery] = React.useState("");
  const [activeTag, setActiveTag] = React.useState<"ALL" | (typeof allTagKeys)[number]>("ALL");

  // Filtrage
  const filtered = React.useMemo(() => {
    return projects.filter(p => {
      const matchesTag = activeTag === "ALL" ? true : p.tags.includes(activeTag);
      const hay =
        (p.title[locale] + " " + p.subtitle[locale]).toLowerCase();
      const matchesQuery =
        query.trim() === "" ? true : hay.includes(query.toLowerCase());
      return matchesTag && matchesQuery;
    });
  }, [projects, locale, activeTag, query]);

  return (
    <section className="space-y-4">
      {/* Barre de recherche */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div className="text-sm text-zinc-600 dark:text-white/70">
          {filtered.length} / {projects.length}
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 dark:text-white/50"/>
            <Input
              value={query}
              onChange={(e)=>setQuery(e.target.value)}
              placeholder={searchPlaceholder}
              className="pl-9 bg-white border-zinc-200/60 dark:bg-white/5 dark:border-white/10"
            />
          </div>
        </div>
      </div>

      {/* Filtres tags */}
      <div className="flex flex-wrap gap-2">
        <Button
          onClick={()=>setActiveTag("ALL")}
          variant={activeTag==="ALL" ? "default" : "outline"}
          className={activeTag==="ALL" ? "" : "bg-transparent"}
        >
          {allLabel}
        </Button>
        {allTagKeys.map(tk => (
          <Button
            key={tk}
            onClick={()=>setActiveTag(tk)}
            variant={activeTag===tk ? "default" : "outline"}
            className={activeTag===tk ? "" : "bg-transparent"}
          >
            {labels[tk]}
          </Button>
        ))}
      </div>

      <Separator className="my-2 bg-zinc-200/60 dark:bg-white/10" />

      {/* Grille des projets (avec modale au clic) */}
      <ProjectsGrid projects={filtered} locale={locale} basePath={basePath} />
    </section>
  );
}
