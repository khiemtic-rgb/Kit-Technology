import type { Locale } from '../i18n';
import { CATEGORY_PAGE_KEYS } from './content-plan';
import type { InsightCategory } from '../content.config';

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

export function insightHubLabel(locale: Locale): string {
  return locale === 'vi' ? 'Kiến thức' : 'Insights';
}
