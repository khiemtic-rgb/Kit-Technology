import fs from 'node:fs';
import { loadEnvFile } from 'node:process';
import { addIctDays, getIctDateIso } from '../src/lib/timezone.ts';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  getDuePlans,
  getPlanById,
  getPlanForDate,
  type PlannedArticle,
} from '../src/lib/content-plan.ts';
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
  assignHeroFromPool,
  heroImageMode,
  poolFilePath,
  poolStats,
} from './lib/hero-pool.ts';
import { generateArticleContent, hasGeminiKey } from './lib/gemini.ts';
import {
  generateHeroImageFromTitle,
  hasOpenAiKey,
  saveGeneratedImage,
} from './lib/openai.ts';

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

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

function maxPerRun(): number {
  const raw = process.env.MAX_ARTICLES_PER_RUN?.trim();
  const parsed = raw ? Number(raw) : daysAhead() > 0 ? 10 : 2;
  return Number.isFinite(parsed) && parsed > 0 ? Math.floor(parsed) : 2;
}

/** Generate content through today + N days (weekly prep). 0 = due through today only. */
function daysAhead(): number {
  const raw = process.env.DAYS_AHEAD?.trim() || parseArg('--days-ahead');
  const parsed = raw ? Number(raw) : 0;
  return Number.isFinite(parsed) && parsed > 0 ? Math.floor(parsed) : 0;
}

function publishThroughDate(): string {
  const date = publishDate();
  const ahead = daysAhead();
  return ahead > 0 ? addIctDays(date, ahead) : date;
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
  if (heroImageMode() === 'ai' && existing.frontmatter.heroImage.startsWith('/images/insights/pool/')) {
    return true;
  }
  const heroPath = existing.frontmatter.heroImage.startsWith('/images/insights/pool/')
    ? poolFilePath(existing.frontmatter.heroImage.replace('/images/insights/pool/', ''))
    : path.join(root, 'public', (existing.frontmatter.heroImage ?? '').replace(/^\//, ''));
  return !fs.existsSync(heroPath);
}

function orderPlans(date: string, plans: PlannedArticle[]): PlannedArticle[] {
  const todayIds = new Set(getPlanForDate(date).map((plan) => plan.id));
  const today = plans.filter((plan) => todayIds.has(plan.id));
  const catchUp = plans.filter((plan) => !todayIds.has(plan.id));
  return [...today, ...catchUp];
}

function resolvePlans(): PlannedArticle[] {
  const articleId = targetArticleId();
  if (articleId) {
    const plan = getPlanById(articleId);
    if (!plan) throw new Error(`Unknown ARTICLE_ID / --id: ${articleId}`);
    return [plan];
  }

  const date = publishDate();
  const through = publishThroughDate();
  const locales = publishLocales();
  const due = getDuePlans(through).filter((plan) =>
    locales.some((locale) => planNeedsPublish(plan, locale)),
  );
  return orderPlans(date, due).slice(0, maxPerRun());
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
    const isPool = frontmatter.heroImage.startsWith('/images/insights/pool/');
    const heroPath = isPool
      ? poolFilePath(frontmatter.heroImage.replace('/images/insights/pool/', ''))
      : path.join(root, 'public', frontmatter.heroImage.replace(/^\//, ''));
    const upgradePoolToAi = heroImageMode() === 'ai' && isPool && hasOpenAiKey();
    if (fs.existsSync(heroPath) && !upgradePoolToAi) return frontmatter;
  }

  if (heroImageMode() === 'ai' && hasOpenAiKey()) {
    console.log(`  → Generating hero image (AI): ${title}`);
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

  const heroImage = assignHeroFromPool({
    category: plan.category,
    section: plan.section,
    slug: plan.slug,
  });
  console.log(`  → Hero from pool: ${heroImage}`);
  return { ...frontmatter, heroImage };
}

async function publishLocale(plan: PlannedArticle, locale: 'vi' | 'en'): Promise<'updated' | 'skipped'> {
  const title = locale === 'vi' ? plan.titleVi : plan.titleEn;
  const filePath = insightMarkdownPath(insightsRoot, locale, plan.category, plan.slug);
  const existing = readInsightMarkdown(filePath);
  const through = publishThroughDate();
  const shouldPublish = forcePublish() || plan.publishDate <= through;

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
    frontmatter.publishDate = publishDate();
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

async function publishPlanItem(plan: PlannedArticle): Promise<'updated' | 'skipped' | 'failed'> {
  if (plan.alreadyLive || plan.pageKey) return 'skipped';

  console.log(`\n[${plan.id}] ${plan.titleVi} (${plan.publishDate})`);
  let updates = 0;

  try {
    for (const locale of publishLocales()) {
      const result = await publishLocale(plan, locale);
      if (result === 'updated') updates++;
    }
    return updates > 0 ? 'updated' : 'skipped';
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`  ✗ Failed [${plan.id}]: ${message}`);
    return 'failed';
  }
}

function todayStillUnpublished(date: string): PlannedArticle[] {
  const locales = publishLocales();
  return getPlanForDate(date)
    .filter((plan) => !plan.alreadyLive && !plan.pageKey)
    .filter((plan) => locales.some((locale) => planNeedsPublish(plan, locale)));
}

async function main() {
  const date = publishDate();
  const articleId = targetArticleId();
  const plans = resolvePlans();
  const dueTotal = getDuePlans(date).filter((plan) => !plan.alreadyLive && !plan.pageKey).length;
  const todayTotal = getPlanForDate(date).filter((plan) => !plan.alreadyLive && !plan.pageKey).length;

  const through = publishThroughDate();
  console.log('=== KIT Knowledge Hub — Auto publish ===');
  console.log(`Publish date: ${date}`);
  console.log(`Content through: ${through}${daysAhead() > 0 ? ` (+${daysAhead()} days ahead)` : ''}`);
  console.log(`Hero images: ${heroImageMode()} (${JSON.stringify(poolStats())})`);
  console.log(`Max articles this run: ${maxPerRun()}`);
  if (articleId) {
    console.log(`Single article mode: ${articleId}`);
  } else {
    console.log(
      `Due through ${through}: ${getDuePlans(through).filter((p) => !p.alreadyLive && !p.pageKey).length} planned, ${todayTotal} scheduled today, ${plans.length} in this batch`,
    );
  }

  if (plans.length === 0) {
    if (!articleId && dueTotal > 0) {
      console.log('All due articles are already published.');
    } else {
      console.log('Nothing due for publishing.');
    }
    return;
  }

  if (!hasGeminiKey()) {
    console.warn('GEMINI_API_KEY is not set.');
    console.warn('Create .env with GEMINI_API_KEY=... (Google AI Studio) then run again.');
    process.exit(1);
  }

  fs.mkdirSync(imagesRoot, { recursive: true });

  let updated = 0;
  let failed = 0;
  for (const plan of plans) {
    const result = await publishPlanItem(plan);
    if (result === 'updated') updated++;
    if (result === 'failed') failed++;
  }

  console.log(`\nDone. Updated ${updated} article(s), ${failed} failed in this batch.`);

  if (!articleId) {
    const remainingToday = todayStillUnpublished(date);
    const remainingDue = getDuePlans(date).filter((plan) =>
      publishLocales().some((locale) => planNeedsPublish(plan, locale)),
    );

    if (remainingToday.length > 0) {
      console.error(`\n::error:: ${remainingToday.length} article(s) scheduled for ${date} still not live:`);
      for (const plan of remainingToday) {
        console.error(`  - ${plan.titleVi} (${plan.id})`);
      }
      process.exit(1);
    }

    if (remainingDue.length > 0) {
      console.warn(`\n::warning:: ${remainingDue.length} older due article(s) remain — will catch up on next run.`);
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
