"use client";
import { useEffect, useState } from "react";

export default function useScrollSpy(ids: string[], rootMargin = "-40% 0px -60% 0px") {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as Element[];
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) setActive((e.target as HTMLElement).id);
      });
    }, { rootMargin, threshold: 0.01 });
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [ids, rootMargin]);
  return active;
}
