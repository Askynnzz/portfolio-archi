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

export default function HomeEN() {
  return (
    <div>
      <Header locale="en" />
      <main className="mx-auto max-w-6xl px-4 py-12">
        {/* HERO (carousel) */}
        <section className="grid md:grid-cols-2 gap-8 items-end">
          <div>
            <h1 className="text-5xl font-semibold">Quiet, refined architecture</h1>
            <p className="mt-3 text-zinc-700 dark:text-white/70">
              Selection of academic and competition projects. Short narratives, clear plans, models and visuals.
            </p>
          </div>
          <HeroCarousel
            images={[projects[0].cover, projects[1]?.cover ?? projects[0].cover]}
            alt="Hero"
          />
        </section>

        <Separator className="my-10 bg-zinc-200/60 dark:bg-white/10" />

        {/* PROJECTS (browser) */}
        <section id="projects" className="space-y-4">
          <h2 className="text-2xl font-semibold">Selected projects</h2>
          <ProjectsBrowser
            projects={projects}
            locale="en"
            basePath="/en/projects"
            allLabel="All"
            searchPlaceholder="Search a project"
          />
        </section>

        <Separator className="my-10 bg-zinc-200/60 dark:bg-white/10" />

        {/* ABOUT */}
        <section id="about" className="grid md:grid-cols-2 gap-6">
          <Card className="rounded-2xl bg-gradient-to-b from-white to-zinc-50 dark:from-zinc-950 dark:to-zinc-900 border-zinc-200/60 dark:border-white/10">
            <CardHeader><CardTitle>Bio</CardTitle></CardHeader>
            <CardContent className="text-zinc-700 dark:text-white/70 space-y-2">
              <p>
                Architecture master’s student — low-impact materials, adaptive reuse, and clear storytelling.
              </p>
              <div className="grid gap-2 text-sm">
                <div className="flex justify-between border-b border-zinc-200/60 dark:border-white/10 pb-2"><b>2025</b><span>Master — School of Architecture …</span></div>
                <div className="flex justify-between border-b border-zinc-200/60 dark:border-white/10 pb-2"><b>2023</b><span>Bachelor — School of Architecture …</span></div>
                <div className="flex justify-between"><b>2022</b><span>Internship — XYZ Agency (6 months)</span></div>
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-2xl bg-gradient-to-b from-white to-zinc-50 dark:from-zinc-950 dark:to-zinc-900 border-zinc-200/60 dark:border-white/10">
            <CardHeader><CardTitle>Skills & Tools</CardTitle></CardHeader>
            <CardContent className="text-zinc-800 dark:text-white/80 grid gap-3 text-sm">
              <div className="flex justify-between border-b border-zinc-200/60 dark:border-white/10 pb-2"><b>Modeling</b><span>Revit, Rhino, Archicad</span></div>
              <div className="flex justify-between border-b border-zinc-200/60 dark:border-white/10 pb-2"><b>Rendering</b><span>Enscape, Twinmotion, V-Ray</span></div>
              <div className="flex justify-between border-b border-zinc-200/60 dark:border-white/10 pb-2"><b>2D</b><span>AutoCAD, Illustrator, InDesign</span></div>
              <div className="flex justify-between"><b>Model making</b><span>Wood, foam board, laser cut</span></div>
              <div className="pt-3 flex gap-2 flex-wrap">
                <a href="#" download className="px-3 py-2 border rounded-md">Resume (PDF)</a>
                <a href="#" download className="px-3 py-2 border rounded-md">Portfolio (PDF)</a>
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-10 bg-zinc-200/60 dark:bg-white/10" />

        {/* CONTACT (form) */}
        <section id="contact">
          <Card className="rounded-2xl bg-gradient-to-b from-white to-zinc-50 dark:from-zinc-950 dark:to-zinc-900 border-zinc-200/60 dark:border-white/10">
            <CardHeader><CardTitle>Contact</CardTitle></CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6 text-zinc-800 dark:text-white/80">
              <div className="grid gap-3">
                <div className="flex items-center gap-2"><Mail className="h-4 w-4"/><a href="mailto:firstname.lastname@mail.com">firstname.lastname@mail.com</a></div>
                <div className="flex items-center gap-2"><Phone className="h-4 w-4"/><a href="tel:+33600000000">+33 6 00 00 00 00</a></div>
                <div className="flex items-center gap-2"><Linkedin className="h-4 w-4"/><a href="#">linkedin.com/in/firstname-lastname</a></div>
                <div className="flex items-center gap-2"><Instagram className="h-4 w-4"/><a href="#">@atelier.firstname</a></div>
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
