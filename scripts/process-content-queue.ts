import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { EDITORIAL_PLAN, getPlanById } from '../src/lib/content-plan.ts';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const queueDir = path.join(root, 'content-queue');
const insightsRoot = path.join(root, 'src/content/insights');
const PLACEHOLDER_VI = 'Nội dung đang được hoàn thiện';
const PLACEHOLDER_EN = 'Content is being finalized';

function isRealBody(body: string): boolean {
  const trimmed = body.trim();
  if (!trimmed) return false;
  if (trimmed.includes(PLACEHOLDER_VI) || trimmed.includes(PLACEHOLDER_EN)) return false;
  return trimmed.length > 120;
}

function yamlEscape(value: string): string {
  return value.replace(/'/g, "''");
}

function writeArticle(payload: {
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
  notionId?: string;
}) {
  const plan = getPlanById(payload.translationId);
  const slug = plan?.slug ?? payload.translationId;
  const filePath = path.join(insightsRoot, payload.locale, payload.category, `${slug}.md`);

  const draft =
    payload.draft !== undefined
      ? payload.draft
      : !isRealBody(payload.body) ||
        (plan ? payload.publishDate > new Date().toISOString().slice(0, 10) : true);

  fs.mkdirSync(path.dirname(filePath), { recursive: true });

  const tags = payload.tags?.length ? `\ntags: [${payload.tags.map((t) => `'${yamlEscape(t)}'`).join(', ')}]` : '\ntags: []';
  const notion = payload.notionId ? `\nnotionId: '${yamlEscape(payload.notionId)}'` : '';

  const content = `---
title: '${yamlEscape(payload.title)}'
description: '${yamlEscape(payload.description)}'
locale: ${payload.locale}
category: ${payload.category}
section: ${payload.section}
publishDate: ${payload.publishDate}
draft: ${draft}
translationId: ${payload.translationId}${tags}${notion}
---

${payload.body.trim()}
`;

  fs.writeFileSync(filePath, content, 'utf8');
  return filePath;
}

function processQueueFile(filePath: string) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(raw);

  if (Array.isArray(data)) {
    return data.map((item) => writeArticle(item));
  }

  return [writeArticle(data)];
}

if (!fs.existsSync(queueDir)) {
  fs.mkdirSync(queueDir, { recursive: true });
}

const processedDir = path.join(queueDir, 'processed');
fs.mkdirSync(processedDir, { recursive: true });

const files = fs
  .readdirSync(queueDir)
  .filter((name) => name.endsWith('.json') && !name.startsWith('.'));
if (files.length === 0) {
  console.log('content-queue is empty — nothing to import.');
  process.exit(0);
}

for (const file of files) {
  const fullPath = path.join(queueDir, file);
  const outputs = processQueueFile(fullPath);
  fs.renameSync(fullPath, path.join(processedDir, `${Date.now()}-${file}`));
  console.log(`Processed ${file} → ${outputs.length} article(s)`);
}

console.log(`Editorial plan total: ${EDITORIAL_PLAN.length} entries.`);
