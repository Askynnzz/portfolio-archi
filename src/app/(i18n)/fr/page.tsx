import Image from "next/image";
import FadeIn from "@/app/components/FadeIn";
import { Header } from "@/app/components/Header";
import { projects } from "@/content/projects";
import ProjectsBrowser from "@/app/components/ProjectsBrowser";
import HeroCarousel from "@/app/components/HeroCarousel";
import ContactForm from "@/app/components/ContactForm";
import { Card, CardHeader, CardTitle, CardContent } from "@/app/components/ui/card";
import { Separator } from "@/app/components/ui/separator";
import { Download, Mail, Phone, Linkedin, Instagram, MapPin } from "lucide-react";

export default function HomeFR() {
  return (
    <div>
      <Header locale="fr" />
      <main className="mx-auto max-w-6xl px-4 py-12">
        {/* HERO (carrousel) */}
        <section className="grid md:grid-cols-2 gap-8 items-end">
          <div>
            <h1 className="text-5xl font-semibold">Architecture sobre & sensible</h1>
            <p className="mt-3 text-zinc-700 dark:text-white/70">
              Sélection de projets académiques et concours. Narrations courtes, plans clairs, maquettes et rendus.
            </p>
          </div>
          <HeroCarousel
            images={[projects[0].cover, projects[1]?.cover ?? projects[0].cover]}
            alt="Héros"
          />
        </section>

        <Separator className="my-10 bg-zinc-200/60 dark:bg-white/10" />

        {/* PROJETS (recherche + tags) */}
        <section id="projets" className="space-y-4">
          <h2 className="text-2xl font-semibold">Projets sélectionnés</h2>
          <ProjectsBrowser
            projects={projects}
            locale="fr"
            basePath="/fr/projets"
            allLabel="Tout"
            searchPlaceholder="Rechercher un projet"
          />
        </section>

        <Separator className="my-10 bg-zinc-200/60 dark:bg-white/10" />

        {/* À PROPOS */}
        <section id="apropos" className="grid md:grid-cols-2 gap-6">
          <Card className="rounded-2xl bg-gradient-to-b from-white to-zinc-50 dark:from-zinc-950 dark:to-zinc-900 border-zinc-200/60 dark:border-white/10">
            <CardHeader><CardTitle>Bio</CardTitle></CardHeader>
            <CardContent className="text-zinc-700 dark:text-white/70 space-y-2">
              <p>
                Étudiante en master d’architecture — matériaux sobres, réemploi et narration claire
                à travers plans, maquettes et images.
              </p>
              <div className="grid gap-2 text-sm">
                <div className="flex justify-between border-b border-zinc-200/60 dark:border-white/10 pb-2">
                  <b>2025</b><span>Master — École d’architecture …</span>
                </div>
                <div className="flex justify-between border-b border-zinc-200/60 dark:border-white/10 pb-2">
                  <b>2023</b><span>Licence — École d’architecture …</span>
                </div>
                <div className="flex justify-between">
                  <b>2022</b><span>Stage — Agence XYZ (6 mois)</span>
                </div>
              </div>
              <div className="pt-3 flex gap-2 flex-wrap">
                <a href="#" download className="inline-flex items-center gap-2 px-3 py-2 border rounded-md">
                  <Download className="h-4 w-4" /> CV (PDF)
                </a>
                <a href="#" download className="px-3 py-2 border rounded-md">
                  Portfolio (PDF)
                </a>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl bg-gradient-to-b from-white to-zinc-50 dark:from-zinc-950 dark:to-zinc-900 border-zinc-200/60 dark:border-white/10">
            <CardHeader><CardTitle>Compétences & Outils</CardTitle></CardHeader>
            <CardContent className="text-zinc-800 dark:text-white/80 grid gap-3 text-sm">
              <div className="flex justify-between border-b border-zinc-200/60 dark:border-white/10 pb-2"><b>Modélisation</b><span>Revit, Rhino, Archicad</span></div>
              <div className="flex justify-between border-b border-zinc-200/60 dark:border-white/10 pb-2"><b>Rendu</b><span>Enscape, Twinmotion, V-Ray</span></div>
              <div className="flex justify-between border-b border-zinc-200/60 dark:border-white/10 pb-2"><b>2D</b><span>AutoCAD, Illustrator, InDesign</span></div>
              <div className="flex justify-between"><b>Maquette</b><span>Bois, carton plume, laser</span></div>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-10 bg-zinc-200/60 dark:bg-white/10" />

        {/* CONTACT (formulaire) */}
        <section id="contact">
          <Card className="rounded-2xl bg-gradient-to-b from-white to-zinc-50 dark:from-zinc-950 dark:to-zinc-900 border-zinc-200/60 dark:border-white/10">
            <CardHeader><CardTitle>Contact</CardTitle></CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6 text-zinc-800 dark:text-white/80">
              <div className="grid gap-3">
                <div className="flex items-center gap-2"><Mail className="h-4 w-4"/><a href="mailto:prenom.nom@mail.com">prenom.nom@mail.com</a></div>
                <div className="flex items-center gap-2"><Phone className="h-4 w-4"/><a href="tel:+33600000000">+33 6 00 00 00 00</a></div>
                <div className="flex items-center gap-2"><Linkedin className="h-4 w-4"/><a href="#">linkedin.com/in/prenom-nom</a></div>
                <div className="flex items-center gap-2"><Instagram className="h-4 w-4"/><a href="#">@atelier.prenom</a></div>
                <div className="flex items-center gap-2"><MapPin className="h-4 w-4"/><span>Île-de-France • France</span></div>
              </div>
              <ContactForm />
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}
