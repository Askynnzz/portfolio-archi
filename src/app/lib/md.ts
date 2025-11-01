import fs from "node:fs/promises";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export async function renderMarkdown(filePath: string) {
  const raw = await fs.readFile(filePath, "utf8");
  const { content, data } = matter(raw); // front-matter YAML optionnel
  const processed = await remark().use(html).process(content);
  return { html: processed.toString(), data: data as Record<string, any> };
}