import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { EDITORIAL_PLAN, getPlanById } from '../src/lib/content-plan.ts';
import { defaultHeroImagePath } from '../src/lib/seo.ts';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const queueDir = path.join(root, 'content-queue');
const insightsRoot = path.join(root, 'src/content/insights');
const imagesRoot = path.join(root, 'public/images/insights');
const PLACEHOLDER_VI = 'Nội dung đang được hoàn thiện';
const PLACEHOLDER_EN = 'Content is being finalized';

type QueuePayload = {
  translationId: string;
  locale: 'vi' | 'en';
  title: string;
  description: string;
  category: string;
  section: string;
  publishDate: string;
  draft?: boolean;
  body: string;
  tags?: string[];
  keywords?: string[];
  notionId?: string;
  heroImage?: string;
  ogImage?: string;
  heroImageUrl?: string;
  heroImageBase64?: string;
};

function isRealBody(body: string): boolean {
  const trimmed = body.trim();
  if (!trimmed) return false;
  if (trimmed.includes(PLACEHOLDER_VI) || trimmed.includes(PLACEHOLDER_EN)) return false;
  return trimmed.length > 120;
}

function yamlEscape(value: string): string {
  return value.replace(/'/g, "''");
}

function normalizePublicPath(value: string): string {
  return value.startsWith('/') ? value : `/${value}`;
}

function yamlStringList(values: string[], field: string): string {
  if (!values.length) return '';
  return `\n${field}: [${values.map((v) => `'${yamlEscape(v)}'`).join(', ')}]`;
}

async function saveHeroImage(
  slug: string,
  locale: 'vi' | 'en',
  payload: Pick<QueuePayload, 'heroImage' | 'heroImageUrl' | 'heroImageBase64'>,
): Promise<string | undefined> {
  if (payload.heroImage) {
    return normalizePublicPath(payload.heroImage);
  }

  if (!payload.heroImageUrl && !payload.heroImageBase64) {
    return undefined;
  }

  const dir = path.join(imagesRoot, locale);
  fs.mkdirSync(dir, { recursive: true });
  const publicPath = defaultHeroImagePath(locale, slug);
  const filePath = path.join(dir, `${slug}.webp`);

  if (payload.heroImageUrl) {
    const res = await fetch(payload.heroImageUrl);
    if (!res.ok) {
      throw new Error(`heroImageUrl failed (${res.status}): ${payload.heroImageUrl}`);
    }
    fs.writeFileSync(filePath, Buffer.from(await res.arrayBuffer()));
    return publicPath;
  }

  if (payload.heroImageBase64) {
    const raw = payload.heroImageBase64.replace(/^data:image\/\w+;base64,/, '');
    fs.writeFileSync(filePath, Buffer.from(raw, 'base64'));
    return publicPath;
  }

  return undefined;
}

async function writeArticle(payload: QueuePayload) {
  const plan = getPlanById(payload.translationId);
  const slug = plan?.slug ?? payload.translationId;
  const filePath = path.join(insightsRoot, payload.locale, payload.category, `${slug}.md`);

  const draft =
    payload.draft !== undefined
      ? payload.draft
      : !isRealBody(payload.body) ||
        (plan ? payload.publishDate > new Date().toISOString().slice(0, 10) : true);

  fs.mkdirSync(path.dirname(filePath), { recursive: true });

  const heroImage = await saveHeroImage(slug, payload.locale, payload);
  const ogImage = payload.ogImage ? normalizePublicPath(payload.ogImage) : undefined;

  const tags = yamlStringList(payload.tags ?? [], 'tags') || '\ntags: []';
  const keywords = yamlStringList(payload.keywords ?? [], 'keywords');
  const notion = payload.notionId ? `\nnotionId: '${yamlEscape(payload.notionId)}'` : '';
  const hero = heroImage ? `\nheroImage: '${yamlEscape(heroImage)}'` : '';
  const og = ogImage ? `\nogImage: '${yamlEscape(ogImage)}'` : '';

  const content = `---
title: '${yamlEscape(payload.title)}'
description: '${yamlEscape(payload.description)}'
locale: ${payload.locale}
category: ${payload.category}
section: ${payload.section}
publishDate: ${payload.publishDate}
draft: ${draft}
translationId: ${payload.translationId}${tags}${keywords}${hero}${og}${notion}
---

${payload.body.trim()}
`;

  fs.writeFileSync(filePath, content, 'utf8');
  return filePath;
}

async function processQueueFile(filePath: string) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(raw) as QueuePayload | QueuePayload[];

  if (Array.isArray(data)) {
    const outputs: string[] = [];
    for (const item of data) {
      outputs.push(await writeArticle(item));
    }
    return outputs;
  }

  return [await writeArticle(data)];
}

async function main() {
  if (!fs.existsSync(queueDir)) {
    fs.mkdirSync(queueDir, { recursive: true });
  }

  const processedDir = path.join(queueDir, 'processed');
  fs.mkdirSync(processedDir, { recursive: true });
  fs.mkdirSync(imagesRoot, { recursive: true });

  const files = fs
    .readdirSync(queueDir)
    .filter((name) => name.endsWith('.json') && !name.startsWith('.'));

  if (files.length === 0) {
    console.log('content-queue is empty — nothing to import.');
    return;
  }

  for (const file of files) {
    const fullPath = path.join(queueDir, file);
    const outputs = await processQueueFile(fullPath);
    fs.renameSync(fullPath, path.join(processedDir, `${Date.now()}-${file}`));
    console.log(`Processed ${file} → ${outputs.length} article(s)`);
  }

  console.log(`Editorial plan total: ${EDITORIAL_PLAN.length} entries.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
