import type { Locale } from '../i18n';
import type { IconName } from './icons';
import { pageUrl } from './site-map';

export type Chip = {
  icon: IconName;
  label: string;
};

export type ProductCard = {
  icon: IconName;
  name: string;
  kind: string;
  href: string;
  external?: boolean;
  accent: string;
  tone: 'green' | 'orange' | 'pink' | 'cyan' | 'teal';
};

export type FeatureItem = {
  icon: IconName;
  title: string;
  desc: string;
};

const productsHref = (locale: Locale) => pageUrl(locale, locale === 'vi' ? 'san-pham' : 'products');
const insightsHref = (locale: Locale) => pageUrl(locale, locale === 'vi' ? 'blog' : 'insights');

export function homeContent(locale: Locale) {
  const vi = locale === 'vi';

  const hero = {
    badge: 'AI PLATFORM',
    title: 'AI Platform for Enterprise Digital Solutions',
    lead: vi
      ? 'KIT Technology xây dựng nền tảng AI giúp doanh nghiệp phát triển các ứng dụng và giải pháp số trên cùng một nền tảng thống nhất.'
      : 'KIT Technology builds an AI platform that helps enterprises develop applications and digital solutions on one unified foundation.',
    primaryCta: vi ? 'Khám phá Platform' : 'Explore Platform',
    primaryHref: `${vi ? '/vi/' : '/en/'}#platform`,
    secondaryCta: vi ? 'Xem sản phẩm' : 'View Products',
    secondaryHref: productsHref(locale),
    coreLabel: 'KIT Platform',
    orbit: [
      { icon: 'ai', label: 'AI Gateway' },
      { icon: 'workflow', label: 'Workflow' },
      { icon: 'identity', label: 'Identity' },
      { icon: 'api', label: 'API' },
      { icon: 'database', label: 'Data & Storage' },
      { icon: 'security', label: 'Security' },
    ] satisfies Chip[],
  };

  const platform = {
    title: vi ? 'Một Platform.' : 'One Platform.',
    titleAccent: vi ? 'Vô hạn giải pháp.' : 'Unlimited Solutions.',
    caption: vi ? 'Nền tảng cho mọi sản phẩm' : 'Powering Every Product',
    capabilities: [
      { icon: 'identity', label: 'Identity' },
      { icon: 'workflow', label: 'Workflow' },
      { icon: 'ai', label: 'AI Gateway' },
      { icon: 'api', label: 'API' },
      { icon: 'database', label: 'Data & Storage' },
      { icon: 'bell', label: 'Notification' },
      { icon: 'monitoring', label: 'Monitoring' },
      { icon: 'security', label: 'Security' },
      { icon: 'billing', label: 'Billing' },
    ] satisfies Chip[],
  };

  const products = {
    eyebrow: vi ? 'SẢN PHẨM' : 'OUR PRODUCTS',
    title: vi ? 'Giải pháp xây trên KIT Platform' : 'Solutions built on KIT Platform',
    intro: vi
      ? 'Mỗi ngành một sản phẩm chuyên biệt, tất cả chia sẻ cùng lõi Platform — Identity, Workflow, AI, API và dữ liệu.'
      : 'Industry-specific products sharing one Platform core — Identity, Workflow, AI, API and data.',
    more: vi ? 'Tìm hiểu thêm' : 'Learn more',
    allCta: vi ? 'Xem tất cả sản phẩm' : 'View all products',
    allHref: productsHref(locale),
    cards: [
      {
        icon: 'pharmacy',
        name: 'Novixa',
        kind: vi ? 'Nền tảng y tế' : 'Healthcare Platform',
        href: vi ? 'https://novixa.vn/vi' : 'https://novixa.vn/en',
        external: true,
        accent: '#16a34a',
        tone: 'green',
      },
      {
        icon: 'family',
        name: 'Famixa',
        kind: 'Family OS',
        href: pageUrl(locale, vi ? 'san-pham/tuong-lai' : 'products/future'),
        accent: '#f97316',
        tone: 'orange',
      },
      {
        icon: 'spa',
        name: 'Spa OS',
        kind: vi ? 'Nền tảng làm đẹp' : 'Beauty Platform',
        href: pageUrl(locale, vi ? 'san-pham/tuong-lai' : 'products/future'),
        accent: '#db2777',
        tone: 'pink',
      },
      {
        icon: 'clinic',
        name: 'Clinic OS',
        kind: vi ? 'Nền tảng phòng khám' : 'Medical Platform',
        href: pageUrl(locale, vi ? 'san-pham/tuong-lai' : 'products/future'),
        accent: '#0ea5e9',
        tone: 'cyan',
      },
      {
        icon: 'agriculture',
        name: 'Vân Đình Trà',
        kind: vi ? 'Nông nghiệp số' : 'Digital Agriculture',
        href: pageUrl(locale, vi ? 'du-an' : 'projects'),
        accent: '#0f766e',
        tone: 'teal',
      },
    ] satisfies ProductCard[],
  };

  const why = {
    title: vi ? 'Vì sao chọn KIT' : 'Why Choose KIT',
    items: [
      {
        icon: 'ai',
        title: 'AI First',
        desc: vi
          ? 'AI được tích hợp sâu trong nền tảng và mọi sản phẩm.'
          : 'AI integrated deep within the platform and every product.',
      },
      {
        icon: 'platform',
        title: 'Platform First',
        desc: vi
          ? 'Một nền tảng thống nhất cho nhiều giải pháp ngành.'
          : 'A unified platform powering multiple industry solutions.',
      },
      {
        icon: 'enterprise',
        title: 'Enterprise Ready',
        desc: vi
          ? 'Đáp ứng tiêu chuẩn bảo mật và mở rộng doanh nghiệp.'
          : 'Built for enterprise security and scalability standards.',
      },
      {
        icon: 'cloud',
        title: 'Cloud Native',
        desc: vi
          ? 'Kiến trúc hiện đại, linh hoạt và dễ triển khai.'
          : 'Modern architecture, flexible and easy to deploy.',
      },
    ] satisfies FeatureItem[],
  };

  const insights = {
    title: vi ? 'Bài viết mới nhất' : 'Latest Insights',
    cta: vi ? 'Xem tất cả bài viết' : 'View all insights',
    href: insightsHref(locale),
    readMore: vi ? 'Đọc tiếp' : 'Read more',
  };

  return { hero, platform, products, why, insights };
}
