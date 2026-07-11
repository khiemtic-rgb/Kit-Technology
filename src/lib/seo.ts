import type { CollectionEntry } from 'astro:content';
import type { Locale } from '../i18n';
import { absoluteUrl, DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from './site';
import { getInsightSlug, insightCategoryPath, insightPostPath, type InsightEntry } from './insights';

type InsightData = CollectionEntry<'insights'>['data'];

export function resolveInsightOgImage(data: Pick<InsightData, 'heroImage' | 'ogImage'>): string {
  return data.ogImage ?? data.heroImage ?? DEFAULT_OG_IMAGE;
}

export function insightMetaKeywords(data: Pick<InsightData, 'keywords' | 'tags'>): string | undefined {
  const merged = [...(data.keywords ?? []), ...data.tags];
  const unique = [...new Set(merged.map((k) => k.trim()).filter(Boolean))];
  return unique.length > 0 ? unique.join(', ') : undefined;
}

export function estimateReadingTime(body: string, locale: Locale): string {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return locale === 'vi' ? `${minutes} phút đọc` : `${minutes} min read`;
}

function toIsoDate(date: Date): string {
  return date.toISOString();
}

export function buildInsightStructuredData(
  entry: InsightEntry,
  body: string,
): Record<string, unknown> {
  const slug = getInsightSlug(entry);
  const { data } = entry;
  const url = absoluteUrl(insightPostPath(data.locale, data.category, slug));
  const image = absoluteUrl(resolveInsightOgImage(data));
  const hubUrl = absoluteUrl(insightCategoryPath(data.locale, data.category));
  const hubLabel = data.category.replace(/-/g, ' ');

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: data.title,
        description: data.description,
        image: [image],
        datePublished: toIsoDate(data.publishDate),
        dateModified: toIsoDate(data.publishDate),
        author: {
          '@type': 'Organization',
          name: SITE_NAME,
          url: SITE_URL,
        },
        publisher: {
          '@type': 'Organization',
          name: SITE_NAME,
          url: SITE_URL,
          logo: {
            '@type': 'ImageObject',
            url: absoluteUrl('/images/logo-kit.png'),
          },
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': url,
        },
        url,
        inLanguage: data.locale === 'vi' ? 'vi-VN' : 'en-US',
        articleSection: data.section,
        keywords: insightMetaKeywords(data),
        wordCount: body.trim().split(/\s+/).filter(Boolean).length,
        isPartOf: {
          '@type': 'Blog',
          name: data.locale === 'vi' ? 'KIT Knowledge Hub' : 'KIT Knowledge Hub',
          url: absoluteUrl(data.locale === 'vi' ? '/vi/blog' : '/en/insights'),
        },
      },
      ...(data.category === 'faq'
        ? [
            {
              '@type': 'FAQPage',
              mainEntity: [
                {
                  '@type': 'Question',
                  name: data.title,
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: data.description,
                  },
                },
              ],
            },
          ]
        : []),
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: data.locale === 'vi' ? 'Trang chủ' : 'Home',
            item: absoluteUrl(data.locale === 'vi' ? '/vi' : '/en'),
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: data.locale === 'vi' ? 'Kiến thức' : 'Insights',
            item: absoluteUrl(data.locale === 'vi' ? '/vi/blog' : '/en/insights'),
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: hubLabel,
            item: hubUrl,
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: data.title,
            item: url,
          },
        ],
      },
    ],
  };
}

export function defaultHeroImagePath(locale: Locale, slug: string, ext = '.webp'): string {
  return `/images/insights/${locale}/${slug}${ext}`;
}
