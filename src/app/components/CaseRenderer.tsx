// =============================
// file: app/components/CaseRenderer.tsx
// =============================
import type { CaseBlock, Locale, L } from "@/content/projects";



export function CaseRenderer({ blocks, locale }: { blocks: CaseBlock[]; locale: Locale }){
const pick = (l?: {fr:string; en:string}) => l ? l[locale] : undefined;
return (
<div className="grid gap-8">
{blocks.map((b, i) => {
if (b.type === "text") return (
<div key={i} className="grid gap-2">
{b.title && <h3 className="text-xl font-semibold">{pick(b.title)}</h3>}
<p className="text-zinc-700 dark:text-white/70 leading-relaxed">{pick(b.body)}</p>
</div>
);
if (b.type === "image") return (
<figure key={i} className="grid gap-2">
<img src={b.src} alt={pick(b.caption)} className="rounded-2xl border border-zinc-200/60 dark:border-white/10 w-full object-cover"/>
{b.caption && <figcaption className="text-xs text-zinc-500 dark:text-white/50">{pick(b.caption)}</figcaption>}
</figure>
);
return (
<div key={i} className={`grid gap-3 ${b.cols===3?'md:grid-cols-3':'md:grid-cols-2'}`}>
{b.images.map((img, idx) => (
<figure key={idx} className="grid gap-2">
<img src={img.src} alt={pick(img.caption)} className="rounded-2xl border border-zinc-200/60 dark:border-white/10 w-full object-cover"/>
{img.caption && <figcaption className="text-xs text-zinc-500 dark:text-white/50">{pick(img.caption)}</figcaption>}
</figure>
))}
</div>
);
})}
</div>
);
}