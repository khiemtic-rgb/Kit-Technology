import { getCollection, type CollectionEntry } from 'astro:content';
import type { Locale } from '../i18n';
import type { InsightCategory } from '../content.config';
import { isPublished, getPublishCutoff } from './publish';
import { pageUrl } from './site-map';

export type InsightEntry = CollectionEntry<'insights'>;

const VI_BLOG_BASE = 'blog';
const EN_BLOG_BASE = 'insights';

export function insightBasePath(locale: Locale): string {
  return locale === 'vi' ? VI_BLOG_BASE : EN_BLOG_BASE;
}

export function insightPostPath(locale: Locale, category: string, slug: string): string {
  return pageUrl(locale, `${insightBasePath(locale)}/${category}/${slug}`);
}

export function insightCategoryPath(locale: Locale, category: string): string {
  return pageUrl(locale, `${insightBasePath(locale)}/${category}`);
}

export async function getAllInsights(): Promise<InsightEntry[]> {
  return getCollection('insights');
}

export async function getPublishedInsights(cutoff = getPublishCutoff()): Promise<InsightEntry[]> {
  const all = await getAllInsights();
  return all.filter(({ data }) => isPublished(data.publishDate, data.draft, cutoff));
}

export async function getPublishedInsightsForLocale(
  locale: Locale,
  cutoff = getPublishCutoff(),
): Promise<InsightEntry[]> {
  const published = await getPublishedInsights(cutoff);
  return published
    .filter(({ data }) => data.locale === locale)
    .sort((a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime());
}

export async function getPublishedByCategory(
  locale: Locale,
  category: InsightCategory,
  cutoff = getPublishCutoff(),
): Promise<InsightEntry[]> {
  return (await getPublishedInsightsForLocale(locale, cutoff)).filter(
    ({ data }) => data.category === category,
  );
}

export async function getPublishedBySection(
  locale: Locale,
  section: InsightEntry['data']['section'],
  cutoff = getPublishCutoff(),
): Promise<InsightEntry[]> {
  return (await getPublishedInsightsForLocale(locale, cutoff)).filter(
    ({ data }) => data.section === section,
  );
}

export function getInsightSlug(entry: InsightEntry): string {
  const parts = entry.id.replace(/\\/g, '/').split('/');
  return parts[parts.length - 1]!.replace(/\.md$/, '');
}
