import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { assignHeroFromPool, poolStats } from './lib/hero-pool.ts';
import {
  insightMarkdownPath,
  parseInsightMarkdown,
  writeInsightMarkdown,
  type InsightFrontmatter,
} from './lib/insight-markdown.ts';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const insightsRoot = path.join(root, 'src/content/insights');

function walkMarkdown(dir: string): string[] {
  const out: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walkMarkdown(full));
    else if (entry.name.endsWith('.md')) out.push(full);
  }
  return out;
}

function main() {
  const locale = (process.env.LOCALE?.trim() || 'vi') as 'vi' | 'en';
  let updated = 0;

  console.log('=== Reassign hero images to pool ===');
  console.log('Pool:', poolStats());

  for (const filePath of walkMarkdown(path.join(insightsRoot, locale))) {
    const raw = fs.readFileSync(filePath, 'utf8');
    const parsed = parseInsightMarkdown(raw);
    if (!parsed || parsed.frontmatter.draft) continue;

    const slug = path.basename(filePath, '.md');
    const heroImage = assignHeroFromPool({
      category: parsed.frontmatter.category,
      section: parsed.frontmatter.section,
      slug,
    });

    if (parsed.frontmatter.heroImage === heroImage) continue;

    const frontmatter: InsightFrontmatter = { ...parsed.frontmatter, heroImage };
    writeInsightMarkdown(filePath, frontmatter, parsed.body);
    console.log(`✓ ${path.relative(root, filePath)} → ${heroImage}`);
    updated++;
  }

  console.log(`\nDone. Updated ${updated} article(s).`);
}

main();
