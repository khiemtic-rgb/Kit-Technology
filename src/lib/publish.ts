import { getIctDateIso, getIctDayEnd } from './timezone';

/** Build-time cutoff for scheduled publishing. Uses Vietnam calendar day; override with PUBLISH_DATE=YYYY-MM-DD. */
export function getPublishCutoff(): Date {
  const raw = typeof process !== 'undefined' ? process.env.PUBLISH_DATE?.trim() : undefined;
  return getIctDayEnd(raw || getIctDateIso());
}

export function isPublished(publishDate: Date, draft: boolean, cutoff = getPublishCutoff()): boolean {
  if (draft) return false;
  return publishDate.getTime() <= cutoff.getTime();
}

export function formatPublishDate(date: Date, locale: 'vi' | 'en'): string {
  return date.toLocaleDateString(locale === 'vi' ? 'vi-VN' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
