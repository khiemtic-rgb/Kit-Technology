import type { Locale } from '../i18n';
import {
  getInsightSlug,
  getPublishedByCategory,
  getPublishedInsightsForLocale,
  insightPostPath,
} from './insights';
import { formatPublishDate } from './publish';

export type NewsSource = 'kit' | 'novixa' | 'famixa';

export type HomeNewsCard = {
  source: NewsSource;
  badge: string;
  badgeTone: 'tech' | 'novixa' | 'famixa';
  title: string;
  href: string;
  image?: string;
  dateLabel: string;
  datetime: string;
  external?: boolean;
};

type FeedItem = {
  title?: string;
  href?: string;
  image?: string;
  pubDate?: string;
  badge?: string;
};

const NOVIXA_FEED = 'https://novixa.vn/feed.json';
const FAMIXA_FEED = 'https://famixa.vn/feed.json';
const NOVIXA_LISTING = 'https://novixa.vn/vi/tin-tuc/';
const FAMIXA_LISTING = 'https://famixa.vn/vi/goi-cha-me/';

async function fetchText(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, {
      headers: { Accept: 'application/json, text/html, application/rss+xml;q=0.9,*/*;q=0.8' },
      signal: AbortSignal.timeout(12000),
    });
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  }
}

function metaContent(html: string, property: string): string | undefined {
  const patterns = [
    new RegExp(`property=["']${property}["']\\s+content=["']([^"']+)["']`, 'i'),
    new RegExp(`content=["']([^"']+)["']\\s+property=["']${property}["']`, 'i'),
    new RegExp(`name=["']${property}["']\\s+content=["']([^"']+)["']`, 'i'),
    new RegExp(`content=["']([^"']+)["']\\s+name=["']${property}["']`, 'i'),
  ];
  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match?.[1]) return decodeHtml(match[1]);
  }
  return undefined;
}

function decodeHtml(value: string): string {
  return value
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'")
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&nbsp;', ' ')
    .trim();
}

function firstListingHref(html: string, pattern: RegExp): string | undefined {
  const match = html.match(pattern);
  return match?.[1];
}

async function enrichArticle(
  url: string,
  source: Exclude<NewsSource, 'kit'>,
  locale: Locale,
): Promise<HomeNewsCard | null> {
  const html = await fetchText(url);
  if (!html) return null;

  let title = metaContent(html, 'og:title') || metaContent(html, 'twitter:title');
  if (title) {
    title = title
      .replace(/\s*[|–—-]\s*Novixa\s*$/i, '')
      .replace(/\s*[|–—-]\s*Famixa\s*$/i, '')
      .replace(/\s+—\s*Novixa\s*$/i, '')
      .trim();
  }
  if (!title) {
    const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1]?.replace(/<[^>]+>/g, '').trim();
    title = h1 ? decodeHtml(h1) : undefined;
  }
  if (!title) return null;

  const image = metaContent(html, 'og:image') || metaContent(html, 'twitter:image');
  const published =
    metaContent(html, 'article:published_time') ||
    html.match(/<time[^>]*datetime=["']([^"']+)["']/i)?.[1];
  const date = published ? new Date(published) : new Date();
  const safeDate = Number.isNaN(date.getTime()) ? new Date() : date;

  return {
    source,
    badge: source === 'novixa' ? 'Novixa' : 'Famixa',
    badgeTone: source,
    title,
    href: url.endsWith('/') ? url : `${url}/`,
    image,
    dateLabel: formatPublishDate(safeDate, locale),
    datetime: safeDate.toISOString(),
    external: true,
  };
}

async function latestFromFeed(
  feedUrl: string,
  source: Exclude<NewsSource, 'kit'>,
  locale: Locale,
): Promise<HomeNewsCard | null> {
  const text = await fetchText(feedUrl);
  if (!text) return null;

  try {
    const data = JSON.parse(text) as { items?: FeedItem[] };
    const item = data.items?.[0];
    if (!item?.title || !item.href) return null;
    const date = item.pubDate ? new Date(item.pubDate) : new Date();
    return {
      source,
      badge: item.badge || (source === 'novixa' ? 'Novixa' : 'Famixa'),
      badgeTone: source,
      title: item.title,
      href: item.href,
      image: item.image,
      dateLabel: formatPublishDate(Number.isNaN(date.getTime()) ? new Date() : date, locale),
      datetime: (Number.isNaN(date.getTime()) ? new Date() : date).toISOString(),
      external: true,
    };
  } catch {
    return null;
  }
}

async function latestNovixa(locale: Locale): Promise<HomeNewsCard | null> {
  const fromFeed = await latestFromFeed(NOVIXA_FEED, 'novixa', locale);
  if (fromFeed) return fromFeed;

  const listing = await fetchText(NOVIXA_LISTING);
  if (!listing) return null;
  const href = firstListingHref(listing, /href="(\/vi\/tin-tuc\/[^"/]+\/)"/i);
  if (!href) return null;
  return enrichArticle(`https://novixa.vn${href}`, 'novixa', locale);
}

async function latestFamixa(locale: Locale): Promise<HomeNewsCard | null> {
  const fromFeed = await latestFromFeed(FAMIXA_FEED, 'famixa', locale);
  if (fromFeed) return fromFeed;

  const listing = await fetchText(FAMIXA_LISTING);
  if (!listing) return null;
  const matches = [...listing.matchAll(/href="(\/vi\/goi-cha-me\/[^"]+)"/gi)].map((m) => m[1]!);
  const href = matches.find((item) => !/^\/vi\/goi-cha-me\/?$/.test(item));
  if (!href) return null;
  const url = href.endsWith('/') ? `https://famixa.vn${href}` : `https://famixa.vn${href}/`;
  return enrichArticle(url, 'famixa', locale);
}

async function latestKitTechnology(locale: Locale): Promise<HomeNewsCard | null> {
  const techPosts = await getPublishedByCategory(locale, 'technology');
  const post = techPosts[0] ?? (await getPublishedInsightsForLocale(locale))[0];
  if (!post) return null;

  return {
    source: 'kit',
    badge: locale === 'vi' ? 'Công nghệ' : 'Technology',
    badgeTone: 'tech',
    title: post.data.title,
    href: insightPostPath(locale, post.data.category, getInsightSlug(post)),
    image: post.data.heroImage,
    dateLabel: formatPublishDate(post.data.publishDate, locale),
    datetime: post.data.publishDate.toISOString(),
  };
}

/** Homepage Insights: 1 KIT + 1 Novixa + 1 Famixa (feed/API, fallback listing scrape). */
export async function getHomeNewsCards(locale: Locale): Promise<HomeNewsCard[]> {
  const [kit, novixa, famixa] = await Promise.all([
    latestKitTechnology(locale),
    latestNovixa(locale),
    latestFamixa(locale),
  ]);

  return [kit, novixa, famixa].filter((item): item is HomeNewsCard => Boolean(item));
}
