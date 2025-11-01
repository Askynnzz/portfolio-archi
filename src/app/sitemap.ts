import { projects } from "@/content/projects";
export default function sitemap() {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";
  const items = [
    { url: `${base}/fr`, lastModified: new Date() },
    { url: `${base}/en`, lastModified: new Date() },
    ...projects.flatMap((p) => ([
      { url: `${base}/fr/projets/${p.slug.fr}`, lastModified: new Date() },
      { url: `${base}/en/projects/${p.slug.en}`, lastModified: new Date() },
    ])),
  ];
  return items;
}
