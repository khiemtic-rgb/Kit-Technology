import fs from 'node:fs';
import path from 'node:path';

export const PLACEHOLDER_VI = 'Nội dung đang được hoàn thiện';
export const PLACEHOLDER_EN = 'Content is being finalized';

export type InsightFrontmatter = {
  title: string;
  description: string;
  locale: 'vi' | 'en';
  category: string;
  section: string;
  publishDate: string;
  draft: boolean;
  translationId: string;
  tags: string[];
  keywords?: string[];
  heroImage?: string;
  ogImage?: string;
  notionId?: string;
  targetWords?: number;
};

export function isRealBody(body: string): boolean {
  const trimmed = body.trim();
  if (!trimmed) return false;
  if (trimmed.includes(PLACEHOLDER_VI) || trimmed.includes(PLACEHOLDER_EN)) return false;
  return trimmed.length > 120;
}

export function yamlEscape(value: string): string {
  return value.replace(/'/g, "''");
}

function parseYamlValue(raw: string): unknown {
  const value = raw.trim();
  if (value === 'true') return true;
  if (value === 'false') return false;
  if (value.startsWith('[') && value.endsWith(']')) {
    return [...value.slice(1, -1).matchAll(/'((?:''|[^'])*)'/g)].map((m) => m[1]!.replace(/''/g, "'"));
  }
  if (value.startsWith("'") && value.endsWith("'")) {
    return value.slice(1, -1).replace(/''/g, "'");
  }
  if (/^\d+$/.test(value)) return Number(value);
  return value;
}

function yamlStringList(values: string[], field: string): string {
  if (!values.length) return '';
  return `\n${field}: [${values.map((v) => `'${yamlEscape(v)}'`).join(', ')}]`;
}

export function parseInsightMarkdown(raw: string): { frontmatter: InsightFrontmatter; body: string } | null {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return null;

  const block = match[1]!;
  const body = match[2] ?? '';
  const frontmatter: Record<string, unknown> = {};

  for (const line of block.split('\n')) {
    const kv = line.match(/^(\w+):\s*(.+)$/);
    if (!kv) continue;
    frontmatter[kv[1]!] = parseYamlValue(kv[2]!);
  }

  if (!frontmatter.title || !frontmatter.locale) return null;
  return { frontmatter: frontmatter as InsightFrontmatter, body };
}

export function readInsightMarkdown(filePath: string): { frontmatter: InsightFrontmatter; body: string } | null {
  if (!fs.existsSync(filePath)) return null;
  return parseInsightMarkdown(fs.readFileSync(filePath, 'utf8'));
}

export function writeInsightMarkdown(
  filePath: string,
  frontmatter: InsightFrontmatter,
  body: string,
): void {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });

  const tags = yamlStringList(frontmatter.tags ?? [], 'tags') || '\ntags: []';
  const keywords = yamlStringList(frontmatter.keywords ?? [], 'keywords');
  const hero = frontmatter.heroImage ? `\nheroImage: '${yamlEscape(frontmatter.heroImage)}'` : '';
  const og = frontmatter.ogImage ? `\nogImage: '${yamlEscape(frontmatter.ogImage)}'` : '';
  const notion = frontmatter.notionId ? `\nnotionId: '${yamlEscape(frontmatter.notionId)}'` : '';
  const targetWords =
    frontmatter.targetWords !== undefined ? `\ntargetWords: ${frontmatter.targetWords}` : '';

  const content = `---
title: '${yamlEscape(frontmatter.title)}'
description: '${yamlEscape(frontmatter.description)}'
locale: ${frontmatter.locale}
category: ${frontmatter.category}
section: ${frontmatter.section}
publishDate: ${frontmatter.publishDate}
draft: ${frontmatter.draft}
translationId: ${frontmatter.translationId}${tags}${keywords}${hero}${og}${notion}${targetWords}
---

${body.trim()}
`;

  fs.writeFileSync(filePath, content, 'utf8');
}

export function insightMarkdownPath(
  insightsRoot: string,
  locale: 'vi' | 'en',
  category: string,
  slug: string,
): string {
  return path.join(insightsRoot, locale, category, `${slug}.md`);
}

export function heroImageFilePath(
  imagesRoot: string,
  locale: 'vi' | 'en',
  slug: string,
  ext = '.png',
): string {
  return path.join(imagesRoot, locale, `${slug}${ext}`);
}

export function heroImagePublicPath(locale: 'vi' | 'en', slug: string, ext = '.png'): string {
  return `/images/insights/${locale}/${slug}${ext}`;
}
