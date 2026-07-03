import type { InsightCategory, InsightSection } from '../content.config';

export type PageInsightFilter =
  | { type: 'category'; category: InsightCategory }
  | { type: 'section'; section: InsightSection };

/** Static marketing pages that should list related Knowledge Hub articles */
export const PAGE_INSIGHT_FILTERS: Partial<Record<string, PageInsightFilter>> = {
  // Solutions
  'sol-healthcare': { type: 'category', category: 'healthcare' },
  'sol-retail': { type: 'category', category: 'digital-transformation' },
  'sol-ai': { type: 'category', category: 'ai' },
  'sol-enterprise': { type: 'category', category: 'business' },
  // Products
  'novixa': { type: 'section', section: 'products' },
  'novixa-intro': { type: 'section', section: 'products' },
  'novixa-pos': { type: 'section', section: 'products' },
  'novixa-chain': { type: 'section', section: 'products' },
  'novixa-app': { type: 'section', section: 'products' },
  'novixa-ai': { type: 'section', section: 'products' },
  'novixa-api': { type: 'section', section: 'products' },
  'ai-automation': { type: 'category', category: 'ai' },
  'ai-agent': { type: 'category', category: 'ai' },
  // Technology stack pages
  'tech-flutter': { type: 'section', section: 'technology' },
  'tech-node': { type: 'section', section: 'technology' },
  'tech-pg': { type: 'section', section: 'technology' },
  'tech-docker': { type: 'section', section: 'technology' },
  'tech-ai': { type: 'category', category: 'ai' },
  'tech-cloud': { type: 'section', section: 'technology' },
  'tech-arch': { type: 'section', section: 'technology' },
};

export function pageInsightFilter(pageKey: string): PageInsightFilter | undefined {
  return PAGE_INSIGHT_FILTERS[pageKey];
}
