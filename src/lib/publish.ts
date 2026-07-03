/** Build-time "now" for scheduled publishing. Set PUBLISH_DATE=YYYY-MM-DD in CI for reproducible builds. */
export function getPublishCutoff(): Date {
  const raw = typeof process !== 'undefined' ? process.env.PUBLISH_DATE : undefined;
  return raw ? new Date(raw) : new Date();
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
