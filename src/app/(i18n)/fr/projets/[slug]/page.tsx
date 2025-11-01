import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Header } from "@/app/components/Header";
import type { Project } from "@/content/projects";
import { projects } from "@/content/projects";
import { CaseRenderer } from "@/app/components/CaseRenderer";
import { renderMarkdown } from "@/app/lib/md";

// type guard pour TS strict
function assertProject(p: Project | undefined): asserts p is Project {
  if (!p) notFound();
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  return projects.map((p: Project) => ({ slug: p.slug.fr }));
}

export function generateMetadata(
  { params }: { params: { slug: string } }
): Metadata {
  const p = projects.find(pr => pr.slug.fr === params.slug);
  if (!p) return {};
  return {
    title: `${p.title.fr} — Portfolio`,
    description: p.subtitle.fr,
    alternates: { languages: { fr: `/fr/projets/${p.slug.fr}`, en: `/en/projects/${p.slug.en}` } },
  };
}

export default async function ProjectFR({ params }: { params: { slug: string } }) {
  const pMaybe = projects.find(pr => pr.slug.fr === params.slug);
  assertProject(pMaybe);
  const p: Project = pMaybe;

  // 1) Rendre le markdown -> HTML (si un fichier est défini)
  const mdHtml = p.md?.fr ? (await renderMarkdown(p.md.fr)).html : "";

  return (
    <div>
      <Header locale="fr" />
      <main className="mx-auto max-w-4xl px-4 py-10">
        <h1 className="text-3xl font-semibold">{p.title.fr}</h1>
        <p className="opacity-70">
          {p.subtitle.fr}{p.location ? ` • ${p.location.fr}` : ""} • {p.year}
        </p>

        <div className="mt-6 relative aspect-[16/9] rounded-2xl overflow-hidden border border-zinc-200/60 dark:border-white/10">
          <Image src={p.cover} alt={p.title.fr} fill className="object-cover" />
        </div>

        <ul className="mt-6 grid gap-1 text-sm opacity-80 list-disc pl-5">
          {p.details.map((d, i) => (<li key={i}>{d.fr}</li>))}
        </ul>

        {/* 2) Bloc markdown (prose jolie si tu as @tailwindcss/typography) */}
        {mdHtml && (
          <section
            className="prose prose-zinc dark:prose-invert max-w-none mt-8"
            dangerouslySetInnerHTML={{ __html: mdHtml }}
          />
        )}

        <section className="mt-8">
          <CaseRenderer blocks={p.caseStudy} locale="fr" />
        </section>
      </main>
    </div>
  );
}

