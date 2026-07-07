import { getPlanForDate } from '../src/lib/content-plan.ts';
import { getIctDateIso } from '../src/lib/timezone.ts';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  insightMarkdownPath,
  isRealBody,
  readInsightMarkdown,
} from './lib/insight-markdown.ts';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const insightsRoot = path.join(root, 'src/content/insights');

function publishDate(): string {
  return process.env.PUBLISH_DATE?.trim() || getIctDateIso();
}

function isLive(locale: 'vi' | 'en', category: string, slug: string): boolean {
  const filePath = insightMarkdownPath(insightsRoot, locale, category, slug);
  const existing = readInsightMarkdown(filePath);
  if (!existing) return false;
  if (existing.frontmatter.draft) return false;
  return isRealBody(existing.body);
}

function main(): void {
  const date = publishDate();
  const locale = (process.env.LOCALE?.trim() || 'vi') as 'vi' | 'en';
  const todayPlans = getPlanForDate(date).filter((plan) => !plan.alreadyLive && !plan.pageKey);
  const missing = todayPlans.filter((plan) => !isLive(locale, plan.category, plan.slug));

  console.log(`=== Verify publish (${date}, ${locale}) ===`);
  console.log(`Scheduled today: ${todayPlans.length}`);
  console.log(`Live today: ${todayPlans.length - missing.length}`);

  if (missing.length === 0) {
    console.log('All scheduled articles for today are live.');
    return;
  }

  console.error(`\n::error:: ${missing.length} article(s) scheduled for ${date} are not live:`);
  for (const plan of missing) {
    console.error(`  - ${plan.titleVi} (${plan.id})`);
  }
  process.exit(1);
}

main();
