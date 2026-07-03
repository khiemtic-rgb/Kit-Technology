import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { EDITORIAL_PLAN } from '../src/lib/content-plan.ts';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const insightsRoot = path.join(root, 'src/content/insights');
const PLACEHOLDER = 'Nội dung đang được hoàn thiện. Bài viết sẽ cập nhật đầy đủ trước ngày xuất bản.';

function frontmatter(plan: (typeof EDITORIAL_PLAN)[number], locale: 'vi' | 'en') {
  const title = locale === 'vi' ? plan.titleVi : plan.titleEn;
  const description =
    locale === 'vi'
      ? `${title} — Knowledge Hub KIT Technology.`
      : `${title} — KIT Technology Knowledge Hub.`;

  return `---
title: '${title.replace(/'/g, "''")}'
description: '${description.replace(/'/g, "''")}'
locale: ${locale}
category: ${plan.category}
section: ${plan.section}
publishDate: ${plan.publishDate}
draft: true
translationId: ${plan.id}
tags: []
targetWords: ${plan.targetWords}
---

`;
}

function writeStub(plan: (typeof EDITORIAL_PLAN)[number], locale: 'vi' | 'en') {
  if (plan.alreadyLive) return 'skipped-live';

  const filePath = path.join(insightsRoot, locale, plan.category, `${plan.slug}.md`);
  if (fs.existsSync(filePath)) return 'exists';

  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  const body = locale === 'vi' ? PLACEHOLDER : 'Content is being finalized before the scheduled publish date.';
  fs.writeFileSync(filePath, `${frontmatter(plan, locale)}\n## ${locale === 'vi' ? plan.titleVi : plan.titleEn}\n\n${body}\n`, 'utf8');
  return 'created';
}

let created = 0;
let exists = 0;
let skipped = 0;

for (const plan of EDITORIAL_PLAN) {
  for (const locale of ['vi', 'en'] as const) {
    const result = writeStub(plan, locale);
    if (result === 'created') created++;
    else if (result === 'exists') exists++;
    else skipped++;
  }
}

console.log(`Content stubs: ${created} created, ${exists} already exist, ${skipped} skipped (live company pages).`);
console.log(`Insights root: ${insightsRoot}`);
