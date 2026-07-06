import fs from 'node:fs';
import { loadEnvFile } from 'node:process';
import { getIctDateIso } from '../src/lib/timezone.ts';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { EDITORIAL_PLAN, getDuePlans, getPlanById, type PlannedArticle } from '../src/lib/content-plan.ts';
import {
  heroImageFilePath,
  heroImagePublicPath,
  insightMarkdownPath,
  isRealBody,
  readInsightMarkdown,
  writeInsightMarkdown,
  type InsightFrontmatter,
} from './lib/insight-markdown.ts';
import {
  generateArticleContent,
  generateHeroImageFromTitle,
  hasOpenAiKey,
  saveGeneratedImage,
  sleep,
} from './lib/openai.ts';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const envPath = path.join(root, '.env');
if (fs.existsSync(envPath)) {
  loadEnvFile(envPath);
}
const insightsRoot = path.join(root, 'src/content/insights');
const imagesRoot = path.join(root, 'public/images/insights');

function publishDate(): string {
  return process.env.PUBLISH_DATE?.trim() || getIctDateIso();
}

function parseArg(flag: string): string | undefined {
  const entry = process.argv.find((arg) => arg.startsWith(`${flag}=`));
  return entry?.slice(flag.length + 1);
}

function targetArticleId(): string | undefined {
  return process.env.ARTICLE_ID?.trim() || parseArg('--id');
}

function publishLocales(): Array<'vi' | 'en'> {
  const locale = process.env.LOCALE?.trim() || parseArg('--locale');
  if (locale === 'vi' || locale === 'en') return [locale];
  return ['vi'];
}

function forcePublish(): boolean {
  return process.env.FORCE_PUBLISH === '1' || process.argv.includes('--force') || Boolean(targetArticleId());
}

function planNeedsPublish(plan: PlannedArticle, locale: 'vi' | 'en'): boolean {
  if (plan.alreadyLive || plan.pageKey) return false;
  const filePath = insightMarkdownPath(insightsRoot, locale, plan.category, plan.slug);
  const existing = readInsightMarkdown(filePath);
  if (!existing) return true;
  if (existing.frontmatter.draft) return true;
  if (!isRealBody(existing.body)) return true;
  if (!existing.frontmatter.heroImage) return true;
  const heroPath = path.join(root, 'public', (existing.frontmatter.heroImage ?? '').replace(/^\//, ''));
  return !fs.existsSync(heroPath);
}

function resolvePlans(): PlannedArticle[] {
  const articleId = targetArticleId();
  if (articleId) {
    const plan = getPlanById(articleId);
    if (!plan) throw new Error(`Unknown ARTICLE_ID / --id: ${articleId}`);
    return [plan];
  }
  const date = publishDate();
  const due = getDuePlans(date);
  const locales = publishLocales();
  return due.filter((plan) => locales.some((locale) => planNeedsPublish(plan, locale)));
}

function defaultDescription(title: string, locale: 'vi' | 'en'): string {
  return locale === 'vi'
    ? `${title} — Knowledge Hub KIT Technology.`
    : `${title} — KIT Technology Knowledge Hub.`;
}

async function ensureHeroImage(
  plan: PlannedArticle,
  locale: 'vi' | 'en',
  title: string,
  frontmatter: InsightFrontmatter,
): Promise<InsightFrontmatter> {
  if (frontmatter.heroImage) {
    const existing = path.join(root, 'public', frontmatter.heroImage.replace(/^\//, ''));
    if (fs.existsSync(existing)) return frontmatter;
  }

  console.log(`  → Generating hero image: ${title}`);
  const source = await generateHeroImageFromTitle({
    title,
    locale,
    category: plan.category,
    section: plan.section,
    slug: plan.slug,
  });
  const filePath = heroImageFilePath(imagesRoot, locale, plan.slug);
  await saveGeneratedImage(source, filePath);
  await sleep(1200);

  return {
    ...frontmatter,
    heroImage: heroImagePublicPath(locale, plan.slug),
  };
}

async function publishLocale(plan: PlannedArticle, locale: 'vi' | 'en'): Promise<'updated' | 'skipped'> {
  const title = locale === 'vi' ? plan.titleVi : plan.titleEn;
  const filePath = insightMarkdownPath(insightsRoot, locale, plan.category, plan.slug);
  const existing = readInsightMarkdown(filePath);
  const today = publishDate();
  const shouldPublish = forcePublish() || plan.publishDate <= today;

  let frontmatter: InsightFrontmatter = existing?.frontmatter ?? {
    title,
    description: defaultDescription(title, locale),
    locale,
    category: plan.category,
    section: plan.section,
    publishDate: plan.publishDate,
    draft: true,
    translationId: plan.id,
    tags: [],
    targetWords: plan.targetWords,
  };

  let body = existing?.body ?? '';

  if (!isRealBody(body)) {
    console.log(`  → Generating article (${locale}): ${title}`);
    const generated = await generateArticleContent({
      title,
      locale,
      category: plan.category,
      section: plan.section,
      targetWords: plan.targetWords,
    });
    frontmatter = {
      ...frontmatter,
      title,
      description: generated.description,
      tags: generated.tags,
      keywords: generated.keywords,
      targetWords: plan.targetWords,
    };
    body = generated.body;
    await sleep(800);
  }

  if (forcePublish()) {
    frontmatter.publishDate = today;
  }

  if (shouldPublish && isRealBody(body)) {
    frontmatter = await ensureHeroImage(plan, locale, title, {
      ...frontmatter,
      draft: false,
      publishDate: plan.publishDate,
    });
  } else {
    frontmatter = {
      ...frontmatter,
      draft: !shouldPublish || !isRealBody(body),
    };
  }

  const changed =
    !existing ||
    existing.body.trim() !== body.trim() ||
    JSON.stringify(existing.frontmatter) !== JSON.stringify(frontmatter);

  if (!changed) {
    console.log(`  · Skipped (${locale}): no changes`);
    return 'skipped';
  }

  writeInsightMarkdown(filePath, frontmatter, body);
  console.log(`  ✓ Saved (${locale}): ${path.relative(root, filePath)}`);
  return 'updated';
}

async function publishPlanItem(plan: PlannedArticle): Promise<number> {
  if (plan.alreadyLive || plan.pageKey) return 0;

  console.log(`\n[${plan.id}] ${plan.titleVi} (${plan.publishDate})`);
  let updates = 0;

  for (const locale of publishLocales()) {
    const result = await publishLocale(plan, locale);
    if (result === 'updated') updates++;
  }

  return updates;
}

async function main() {
  const date = publishDate();
  const articleId = targetArticleId();
  const plans = resolvePlans();
  const dueTotal = getDuePlans(date).length;

  console.log('=== KIT Knowledge Hub — Auto publish ===');
  console.log(`Publish date: ${date}`);
  if (articleId) {
    console.log(`Single article mode: ${articleId}`);
  } else {
    console.log(`Due through ${date}: ${dueTotal} planned, ${plans.length} need publishing`);
  }

  if (plans.length === 0) {
    if (!articleId && dueTotal > 0) {
      console.log('All due articles are already published.');
    } else {
      console.log('Nothing due for publishing.');
    }
    return;
  }

  if (!hasOpenAiKey()) {
    console.warn('OPENAI_API_KEY is not set.');
    console.warn('Create .env with OPENAI_API_KEY=sk-... then run again.');
    process.exit(1);
  }

  fs.mkdirSync(imagesRoot, { recursive: true });

  let totalUpdates = 0;
  for (const plan of plans) {
    totalUpdates += await publishPlanItem(plan);
  }

  console.log(`\nDone. Updated ${totalUpdates} file(s).`);

  if (!articleId) {
    const remaining = resolvePlans();
    if (remaining.length > 0) {
      console.error(`\n::error:: ${remaining.length} due article(s) still unpublished after run:`);
      for (const plan of remaining) {
        console.error(`  - [${plan.publishDate}] ${plan.titleVi} (${plan.id})`);
      }
      process.exit(1);
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
