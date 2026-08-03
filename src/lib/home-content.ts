import type { Locale } from '../i18n';
import type { IconName } from './icons';
import { pageUrl } from './site-map';

export type ArchitectureLayer = {
  icon: IconName;
  label: string;
};

export type FlagshipCard = {
  name: string;
  kind: string;
  desc: string;
  href: string;
  external?: boolean;
  cta: string;
  tone: 'novixa' | 'famixa';
};

const platformHref = (locale: Locale) => pageUrl(locale, locale === 'vi' ? 'nen-tang' : 'platform');
const productsHref = (locale: Locale) => pageUrl(locale, locale === 'vi' ? 'san-pham' : 'products');
const insightsHref = (locale: Locale) => pageUrl(locale, locale === 'vi' ? 'blog' : 'insights');
const contactHref = (locale: Locale) => (locale === 'vi' ? '/vi/lien-he/' : '/en/contact/');
const companyHref = (locale: Locale) => pageUrl(locale, locale === 'vi' ? 'gioi-thieu' : 'company');
const techHref = (locale: Locale) => pageUrl(locale, locale === 'vi' ? 'cong-nghe' : 'technology');

export function homeContent(locale: Locale) {
  const vi = locale === 'vi';

  const hero = {
    brand: 'KIT Technology',
    titleAccent: 'AI Platform',
    titleRest: 'for Digital Solutions',
    lead: vi
      ? 'Chúng tôi xây dựng nền tảng AI và các giải pháp số giúp doanh nghiệp và gia đình vận hành hiệu quả hơn.'
      : 'We build an AI platform and digital solutions that help businesses and families operate more effectively.',
    primaryCta: vi ? 'Tìm hiểu thêm' : 'Learn more',
    primaryHref: platformHref(locale),
  };

  const flagship = {
    eyebrow: vi ? 'Giải pháp trọng tâm' : 'Flagship solutions',
    title: vi ? 'Hai giải pháp, một sứ mệnh' : 'Two solutions, one mission',
    cards: [
      {
        name: 'Novixa',
        kind: 'Healthcare Platform',
        desc: vi
          ? 'Nền tảng quản trị nhà thuốc thông minh giúp tối ưu vận hành và tăng trưởng doanh thu.'
          : 'Smart pharmacy platform that optimizes operations and grows revenue.',
        href: vi ? 'https://novixa.vn/vi' : 'https://novixa.vn/en',
        external: true,
        cta: vi ? 'Tìm hiểu Novixa' : 'Explore Novixa',
        tone: 'novixa',
      },
      {
        name: 'Famixa',
        kind: 'Family Operating System',
        desc: vi
          ? 'Nền tảng đồng hành cùng gia đình hiện đại, giúp trẻ tự giác hơn và gia đình hạnh phúc hơn.'
          : 'A companion platform for modern families — helping kids build habits and families thrive.',
        href: 'https://famixa.vn',
        external: true,
        cta: vi ? 'Tìm hiểu Famixa' : 'Explore Famixa',
        tone: 'famixa',
      },
    ] satisfies FlagshipCard[],
    moreHref: productsHref(locale),
  };

  const platform = {
    eyebrow: vi ? 'Nền tảng công nghệ' : 'Technology platform',
    title: 'KIT Platform',
    layers: [
      { icon: 'ai', label: 'AI' },
      { icon: 'identity', label: 'Identity' },
      { icon: 'workflow', label: 'Workflow' },
      { icon: 'bell', label: 'Notification' },
      { icon: 'api', label: 'API' },
      { icon: 'database', label: 'Storage' },
    ] satisfies ArchitectureLayer[],
    href: platformHref(locale),
  };

  const technology = {
    eyebrow: vi ? 'Công nghệ' : 'Technology',
    title: vi ? 'Kiến tạo bằng công nghệ hiện đại' : 'Built with modern technology',
    logos: [
      { label: '.NET', icon: 'code' as const },
      { label: 'Flutter', icon: 'mobile' as const },
      { label: 'PostgreSQL', icon: 'database' as const },
      { label: 'Cloud', icon: 'cloud' as const },
      { label: 'AI', icon: 'ai' as const },
      { label: 'Docker', icon: 'container' as const },
    ],
    href: techHref(locale),
  };

  const insights = {
    eyebrow: vi ? 'Tin tức & Kiến thức' : 'News & Insights',
    title: vi ? 'Cập nhật mới nhất' : 'Latest updates',
    cta: vi ? 'Xem tất cả' : 'View all',
    href: insightsHref(locale),
    readMore: vi ? 'Đọc thêm' : 'Read more',
  };

  const links = {
    platform: platformHref(locale),
    products: productsHref(locale),
    technology: techHref(locale),
    insights: insightsHref(locale),
    company: companyHref(locale),
    contact: contactHref(locale),
  };

  return { hero, flagship, platform, technology, insights, links };
}
