import type { Locale } from '../i18n';
import type { ArticleContent } from './types';
import { companyArticlesEn, engineeringArticleEn } from './company/en';
import { companyArticlesVi, engineeringArticleVi } from './company/vi';

export function getArticleContent(locale: Locale, pageKey: string): ArticleContent | undefined {
  if (pageKey === 'engineering') {
    return locale === 'vi' ? engineeringArticleVi : engineeringArticleEn;
  }
  const articles = locale === 'vi' ? companyArticlesVi : companyArticlesEn;
  return articles[pageKey];
}

export function hasArticleContent(pageKey: string): boolean {
  if (pageKey === 'engineering') return true;
  return pageKey in companyArticlesVi;
}
