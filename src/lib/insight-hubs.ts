import type { Locale } from '../i18n';
import { CATEGORY_PAGE_KEYS } from './content-plan';
import type { InsightCategory, InsightSection } from '../content.config';

const PAGE_KEY_TO_CATEGORY = Object.fromEntries(
  Object.entries(CATEGORY_PAGE_KEYS).map(([category, pageKey]) => [pageKey, category]),
) as Record<string, InsightCategory>;

export function pageKeyToInsightCategory(pageKey: string): InsightCategory | undefined {
  return PAGE_KEY_TO_CATEGORY[pageKey];
}

export function isInsightsHub(pageKey: string): boolean {
  return pageKey === 'blog';
}

export function isInsightCategoryHub(pageKey: string): boolean {
  return pageKey.startsWith('blog-') || pageKey === 'faq';
}

export function insightHubFilter(
  pageKey: string,
): { type: 'all' } | { type: 'category'; category: InsightCategory } | { type: 'section'; section: InsightSection } | null {
  if (pageKey === 'blog') return { type: 'all' };
  if (pageKey === 'faq') return { type: 'category', category: 'faq' };
  if (pageKey === 'blog-sol-cat') return { type: 'section', section: 'solutions' };
  if (pageKey === 'blog-prod-cat') return { type: 'section', section: 'products' };
  if (pageKey === 'blog-tech-cat') return { type: 'section', section: 'technology' };
  const category = pageKeyToInsightCategory(pageKey);
  if (category) return { type: 'category', category };
  return null;
}

export function insightHubLabel(locale: Locale): string {
  return locale === 'vi' ? 'Kiến thức' : 'Insights';
}
