export const SITE_TIMEZONE = 'Asia/Ho_Chi_Minh';

/** YYYY-MM-DD in Vietnam time — used for editorial schedule and publish cutoff. */
export function getIctDateIso(date = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: SITE_TIMEZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
}

/** End of the given ICT calendar day — articles with publishDate on that day are live. */
export function getIctDayEnd(isoDate = getIctDateIso()): Date {
  return new Date(`${isoDate}T23:59:59.999+07:00`);
}

/** Add calendar days in ICT and return YYYY-MM-DD. */
export function addIctDays(isoDate: string, days: number): string {
  const anchor = new Date(`${isoDate}T12:00:00+07:00`);
  anchor.setUTCDate(anchor.getUTCDate() + days);
  return getIctDateIso(anchor);
}
