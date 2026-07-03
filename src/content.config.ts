import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

export const insightCategories = [
  'ai',
  'healthcare',
  'digital-transformation',
  'engineering',
  'company-news',
  'business',
  'technology',
  'solutions',
  'products',
  'faq',
] as const;

export const insightSections = ['insights', 'technology', 'solutions', 'products', 'company', 'faq'] as const;

export type InsightCategory = (typeof insightCategories)[number];
export type InsightSection = (typeof insightSections)[number];

const insights = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/insights' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    locale: z.enum(['vi', 'en']),
    category: z.enum(insightCategories),
    section: z.enum(insightSections),
    publishDate: z.coerce.date(),
    draft: z.boolean().default(true),
    translationId: z.string(),
    tags: z.array(z.string()).default([]),
    keywords: z.array(z.string()).optional(),
    heroImage: z.string().optional(),
    ogImage: z.string().optional(),
    notionId: z.string().optional(),
    targetWords: z.number().optional(),
  }),
});

export const collections = { insights };
