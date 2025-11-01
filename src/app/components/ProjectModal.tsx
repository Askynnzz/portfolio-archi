"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/app/components/ui/dialog";
import { Badge } from "@/app/components/ui/badge";
import Image from "next/image";
import type { Locale, Project } from "@/content/projects";
import { CaseRenderer } from "@/app/components/CaseRenderer";

export default function ProjectModal({
  project, locale, open, onOpenChange,
}: { project: Project; locale: Locale; open: boolean; onOpenChange: (v: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[92vw] sm:max-w-[900px] p-0">
        <DialogHeader className="px-4 pt-4">
          <DialogTitle className="flex items-center gap-2">
            {project.title[locale]}
            <Badge variant="secondary" className="bg-zinc-900/5 border-zinc-200/60 dark:bg-white/10 dark:border-white/10 dark:text-white/80">
              {project.year}
            </Badge>
          </DialogTitle>
          <DialogDescription>
            {project.subtitle[locale]}
            {project.location ? ` • ${project.location[locale]}` : ""}
          </DialogDescription>
        </DialogHeader>

        <div className="max-h-[80vh] overflow-y-auto px-4 pb-4 space-y-4">
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-zinc-200/60 dark:border-white/10">
            <Image src={project.cover} alt={project.title[locale]} fill className="object-cover" />
          </div>

          <ul className="grid gap-1 text-sm text-zinc-700 dark:text-white/70">
            {project.details.map((d, i) => (<li key={i}>• {d[locale]}</li>))}
          </ul>

          <CaseRenderer blocks={project.caseStudy} locale={locale} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
