// file: content/projects.ts
// Rôle: couche de données bilingue + helpers
// =============================
export type Locale = "fr" | "en";


export type L = { fr: string; en: string };


export type CaseBlock =
| { type: "text"; title?: L; body: L }
| { type: "image"; src: string; caption?: L }
| { type: "grid"; images: { src: string; caption?: L }[]; cols?: number };


export type Project = {
id: string; // id interne stable
slug: { fr: string; en: string }; // slugs par langue
title: L;
subtitle: L;
year: string;
location?: L;
tags: ("Housing" | "Facility" | "Landscape" | "Research")[];
cover: string;
details: L[];
caseStudy: CaseBlock[];
md?: { fr: string; en: string }; // <-- ajouté
};


export const projects: Project[] = [
  {
    id: "p1",
    slug: { fr: "maison-patio", en: "patio-house" },
    title: { fr: "Maison-Patio", en: "Patio House" },
    subtitle: { fr: "Habitat individuel — Studio S6", en: "Single-family housing — Studio S6" },
    year: "2025",
    location: { fr: "Marseille", en: "Marseille" },
    tags: ["Housing"],
    cover: "https://images.unsplash.com/photo-1504215680853-026ed2a45def?q=80&w=1600&auto=format&fit=crop",
    details: [
      { fr: "Lumière zénithale et intimité traversante", en: "Zenithal light and cross privacy" },
      { fr: "Matériaux biosourcés : BTC & bois", en: "Bio-sourced materials: CEB & timber" },
      { fr: "Revit + Enscape", en: "Revit + Enscape" },
    ],
    caseStudy: [
      { type: "text", title: { fr: "Intention", en: "Intent" }, body: { fr: "Concevoir une maison introvertie articulée autour d'un patio…", en: "Design an introverted house organized around a patio…" } },
      { type: "grid", cols: 2, images: [
        { src: "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?q=80&w=1600&auto=format&fit=crop", caption: { fr: "Morphologie urbaine", en: "Urban morphology" }},
        { src: "https://images.unsplash.com/photo-1522098229762-970b54f4d3fc?q=80&w=1600&auto=format&fit=crop", caption: { fr: "Trame & ensoleillement", en: "Grid & sunlight" }},
      ]},
      { type: "text", title: { fr: "Processus", en: "Process" }, body: { fr: "Organisation en bandes programmatiques…", en: "Programmatic bands…" } },
      { type: "image", src: "https://images.unsplash.com/photo-1505691723518-36a5ac3b12ba?q=80&w=1600&auto=format&fit=crop", caption: { fr: "Coupe longitudinale", en: "Longitudinal section" }},
    ],
    md: {
      fr: "src/content/md/maison-patio.fr.md",   // ⬅️ NOUVEAU
      en: "src/content/md/maison-patio.en.md",   // ⬅️ NOUVEAU
    },
  },
  {
    id: "p2",
    slug: { fr: "mediatheque-parc", en: "library-park" },
    title: { fr: "Médiathèque & Parc", en: "Library & Park" },
    subtitle: { fr: "Équipement culturel — Concours", en: "Cultural facility — Competition" },
    year: "2024",
    location: { fr: "Rennes", en: "Rennes" },
    tags: ["Facility","Landscape"],
    cover: "https://images.unsplash.com/photo-1529429612774-04f1ff13a542?q=80&w=1600&auto=format&fit=crop",
    details: [
      { fr: "Structure bois basse empreinte", en: "Low-impact timber structure" },
      { fr: "Façade active & place publique", en: "Active façade & public square" },
      { fr: "Rhino + V-Ray", en: "Rhino + V-Ray" },
    ],
    caseStudy: [
      { type: "text", title: { fr: "Contexte", en: "Context" }, body: { fr: "Insertion dans un parc urbain…", en: "Insertion within an urban park…" } },
      { type: "grid", cols: 2, images: [
        { src: "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=1600&auto=format&fit=crop", caption: { fr: "Plan masse", en: "Masterplan" }},
        { src: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1600&auto=format&fit=crop", caption: { fr: "Coupe", en: "Section" }},
      ]},
    ],
    md: {
      fr: "src/content/md/mediatheque-parc.fr.md", // ⬅️ NOUVEAU
      en: "src/content/md/library-park.en.md",     // ⬅️ NOUVEAU
    },
  },
];



export const tagLabels: Record<Locale, Record<Project["tags"][number], string>> = {
fr: { Housing: "Logement", Facility: "Équipement", Landscape: "Paysage", Research: "Recherche" },
en: { Housing: "Housing", Facility: "Public facility", Landscape: "Landscape", Research: "Research" },
};


export function findBySlug(locale: Locale, slug: string) {
}

export function allSlugs(locale: Locale) {
return projects.map(p => p.slug[locale]);
}