import type { Locale } from '../i18n';
import type { InsightCategory } from '../content.config';
import type { IconName } from './icons';
import { insightCategoryPath, insightBasePath } from './insights';
import { pageUrl } from './site-map';

export type InsightsFilterId =
  | 'all'
  | 'technology'
  | 'digital-transformation'
  | 'products'
  | 'family'
  | 'practice';

export function insightsHubContent(locale: Locale) {
  const vi = locale === 'vi';
  const hub = pageUrl(locale, insightBasePath(locale));
  const contact = vi ? '/vi/lien-he/' : '/en/contact/';

  return {
    hero: {
      titleLines: vi ? (['Kiến thức &', 'Chia sẻ giá trị'] as const) : (['Knowledge &', 'shared value'] as const),
      lead: vi
        ? 'Những chia sẻ, góc nhìn và kinh nghiệm thực tiễn về công nghệ, chuyển đổi số và cuộc sống hiện đại.'
        : 'Practical insights on technology, digital transformation, and modern life.',
    },
    filters: [
      { id: 'all' as const, label: vi ? 'Tất cả' : 'All', icon: 'grid' as IconName, href: hub },
      {
        id: 'technology' as const,
        label: vi ? 'Công nghệ' : 'Technology',
        icon: 'ai' as IconName,
        href: insightCategoryPath(locale, 'technology'),
      },
      {
        id: 'digital-transformation' as const,
        label: vi ? 'Chuyển đổi số' : 'Digital transformation',
        icon: 'monitor' as IconName,
        href: insightCategoryPath(locale, 'digital-transformation'),
      },
      {
        id: 'products' as const,
        label: vi ? 'Sản phẩm' : 'Products',
        icon: 'container' as IconName,
        href: insightCategoryPath(locale, 'products'),
      },
      {
        id: 'family' as const,
        label: vi ? 'Gia đình & Cuộc sống' : 'Family & life',
        icon: 'users' as IconName,
        href: insightCategoryPath(locale, 'healthcare'),
      },
      {
        id: 'practice' as const,
        label: vi ? 'Kinh nghiệm thực tiễn' : 'Practical experience',
        icon: 'education' as IconName,
        href: insightCategoryPath(locale, 'engineering'),
      },
    ],
    featured: {
      readMore: vi ? 'Đọc tiếp' : 'Read more',
      fallbackTags: vi
        ? (['Chuyển đổi số', 'Nhà thuốc'] as const)
        : (['Digital transformation', 'Pharmacy'] as const),
    },
    latest: {
      title: vi ? 'Bài viết mới nhất' : 'Latest articles',
      viewAll: vi ? 'Xem tất cả' : 'View all',
      viewAllHref: hub,
    },
    topics: {
      title: vi ? 'Chủ đề phổ biến' : 'Popular topics',
      lead: vi
        ? 'Khám phá các nội dung được quan tâm nhiều nhất'
        : 'Explore the topics people care about most',
      items: [
        {
          label: vi ? 'Trí tuệ nhân tạo' : 'Artificial intelligence',
          icon: 'ai' as IconName,
          href: insightCategoryPath(locale, 'ai'),
        },
        {
          label: vi ? 'Chuyển đổi số' : 'Digital transformation',
          icon: 'monitor' as IconName,
          href: insightCategoryPath(locale, 'digital-transformation'),
        },
        {
          label: vi ? 'Quản trị doanh nghiệp' : 'Business management',
          icon: 'enterprise' as IconName,
          href: insightCategoryPath(locale, 'business'),
        },
        {
          label: vi ? 'Nuôi dạy con' : 'Parenting',
          icon: 'family' as IconName,
          href: insightCategoryPath(locale, 'healthcare'),
        },
      ],
    },
    newsletter: {
      title: vi ? 'Đăng ký nhận bản tin' : 'Subscribe to our newsletter',
      desc: vi
        ? 'Cập nhật những kiến thức, xu hướng và giải pháp mới nhất từ KIT Technology.'
        : 'Stay updated with the latest insights, trends, and solutions from KIT Technology.',
      placeholder: vi ? 'Nhập email của bạn' : 'Enter your email',
      cta: vi ? 'Đăng ký' : 'Subscribe',
      subject: vi ? 'Đăng ký bản tin Knowledge Hub — kittech.vn' : 'Knowledge Hub newsletter — kittech.vn',
      nextPath: `${contact}?sent=1#contact-form`,
    },
    empty: vi
      ? 'Bài viết sẽ được xuất bản theo lịch Knowledge Hub. Quay lại sau hoặc liên hệ nếu cần tư vấn sớm.'
      : 'Articles publish on the Knowledge Hub schedule. Check back soon or contact us for early guidance.',
  };
}

const CATEGORY_LABELS: Record<InsightCategory, { vi: string; en: string; icon: IconName }> = {
  ai: { vi: 'AI', en: 'AI', icon: 'ai' },
  healthcare: { vi: 'Nhà thuốc', en: 'Pharmacy', icon: 'pharmacy' },
  'digital-transformation': { vi: 'Chuyển đổi số', en: 'Digital transformation', icon: 'monitor' },
  engineering: { vi: 'Kỹ thuật', en: 'Engineering', icon: 'code' },
  'company-news': { vi: 'Công ty', en: 'Company', icon: 'enterprise' },
  business: { vi: 'Kinh doanh', en: 'Business', icon: 'analytics' },
  technology: { vi: 'Công nghệ', en: 'Technology', icon: 'cloud' },
  solutions: { vi: 'Giải pháp', en: 'Solutions', icon: 'puzzle' },
  products: { vi: 'Sản phẩm', en: 'Products', icon: 'container' },
  faq: { vi: 'FAQ', en: 'FAQ', icon: 'assistant' },
};

export function insightCategoryMeta(category: InsightCategory, locale: Locale) {
  const row = CATEGORY_LABELS[category];
  return {
    label: locale === 'vi' ? row.vi : row.en,
    icon: row.icon,
  };
}

export function formatInsightShortDate(date: Date, locale: Locale): string {
  return date.toLocaleDateString(locale === 'vi' ? 'vi-VN' : 'en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}
