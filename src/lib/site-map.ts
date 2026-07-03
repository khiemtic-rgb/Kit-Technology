import type { Locale } from '../i18n';

export type NavItem = {
  label: string;
  href: string;
  external?: boolean;
};

export type NavGroup = {
  label: string;
  href: string;
  items?: NavItem[];
};

export type PageEntry = {
  key: string;
  paths: Record<Locale, string>;
  title: Record<Locale, string>;
  intro?: Record<Locale, string>;
  hub?: boolean;
};

const p = (
  key: string,
  viPath: string,
  enPath: string,
  titleVi: string,
  titleEn: string,
  introVi?: string,
  introEn?: string,
  hub = false,
): PageEntry => ({
  key,
  paths: { vi: viPath, en: enPath },
  title: { vi: titleVi, en: titleEn },
  intro: introVi ? { vi: introVi, en: introEn ?? introVi } : undefined,
  hub,
});

/** All content pages (excluding locale home + contact). */
export const pages: PageEntry[] = [
  // Company
  p('company', 'gioi-thieu', 'company', 'Giới thiệu', 'Company', 'KIT Technology — AI First Software Company.', undefined, true),
  p('story', 'gioi-thieu/cau-chuyen-kit', 'company/story', 'Câu chuyện KIT', 'KIT Story'),
  p('vision', 'gioi-thieu/tam-nhin', 'company/vision', 'Tầm nhìn', 'Vision'),
  p('mission', 'gioi-thieu/su-menh', 'company/mission', 'Sứ mệnh', 'Mission'),
  p('values', 'gioi-thieu/gia-tri-cot-loi', 'company/values', 'Giá trị cốt lõi', 'Core Values'),
  p('team', 'gioi-thieu/doi-ngu', 'company/team', 'Đội ngũ', 'Team'),

  // Products
  p('products', 'san-pham', 'products', 'Sản phẩm', 'Products', 'Nền tảng số ứng dụng AI cho doanh nghiệp.', undefined, true),
  p('novixa', 'san-pham/novixa', 'products/novixa', 'Novixa', 'Novixa', 'Healthcare SaaS — thương hiệu sản phẩm, website riêng tại novixa.vn.', undefined, true),
  p('novixa-intro', 'san-pham/novixa/gioi-thieu', 'products/novixa/overview', 'Novixa — Giới thiệu', 'Novixa Overview'),
  p('novixa-pos', 'san-pham/novixa/pos-nha-thuoc', 'products/novixa/pharmacy-pos', 'POS Nhà thuốc', 'Pharmacy POS'),
  p('novixa-chain', 'san-pham/novixa/quan-ly-chuoi', 'products/novixa/chain', 'Quản lý chuỗi', 'Chain Management'),
  p('novixa-app', 'san-pham/novixa/app-khach-hang', 'products/novixa/customer-app', 'App khách hàng', 'Customer App'),
  p('novixa-ai', 'san-pham/novixa/ai-assistant', 'products/novixa/ai-assistant', 'AI Assistant', 'AI Assistant'),
  p('novixa-api', 'san-pham/novixa/api', 'products/novixa/api', 'API', 'API'),
  p('novixa-demo', 'san-pham/novixa/demo', 'products/novixa/demo', 'Demo', 'Demo'),
  p('ai-automation', 'san-pham/ai-automation', 'products/ai-automation', 'AI Automation', 'AI Automation'),
  p('ai-agent', 'san-pham/ai-agent', 'products/ai-agent', 'AI Agent', 'AI Agent'),
  p('future-products', 'san-pham/tuong-lai', 'products/future', 'Các sản phẩm tương lai', 'Future Products'),

  // Solutions
  p('solutions', 'giai-phap', 'solutions', 'Giải pháp', 'Solutions', 'Giải pháp theo ngành và quy mô doanh nghiệp.', undefined, true),
  p('sol-healthcare', 'giai-phap/healthcare', 'solutions/healthcare', 'Healthcare', 'Healthcare'),
  p('sol-retail', 'giai-phap/retail', 'solutions/retail', 'Retail', 'Retail'),
  p('sol-ai', 'giai-phap/ai-transformation', 'solutions/ai-transformation', 'AI Transformation', 'AI Transformation'),
  p('sol-enterprise', 'giai-phap/enterprise-platform', 'solutions/enterprise-platform', 'Enterprise Platform', 'Enterprise Platform'),

  // Technology
  p('technology', 'cong-nghe', 'technology', 'Công nghệ', 'Technology', 'Stack và kiến trúc KIT Technology.', undefined, true),
  p('tech-flutter', 'cong-nghe/flutter', 'technology/flutter', 'Flutter', 'Flutter'),
  p('tech-node', 'cong-nghe/nodejs', 'technology/nodejs', 'Node.js', 'Node.js'),
  p('tech-pg', 'cong-nghe/postgresql', 'technology/postgresql', 'PostgreSQL', 'PostgreSQL'),
  p('tech-docker', 'cong-nghe/docker', 'technology/docker', 'Docker', 'Docker'),
  p('tech-ai', 'cong-nghe/ai', 'technology/ai', 'AI', 'AI'),
  p('tech-cloud', 'cong-nghe/cloud', 'technology/cloud', 'Cloud', 'Cloud'),
  p('tech-arch', 'cong-nghe/kien-truc-he-thong', 'technology/architecture', 'Kiến trúc hệ thống', 'System Architecture'),

  // Projects
  p('projects', 'du-an', 'projects', 'Dự án tiêu biểu', 'Case Studies', undefined, undefined, true),
  p('proj-novixa', 'du-an/novixa', 'projects/novixa', 'Novixa', 'Novixa'),
  p('proj-web', 'du-an/website', 'projects/website', 'Website', 'Website'),
  p('proj-mobile', 'du-an/mobile-app', 'projects/mobile-app', 'Mobile App', 'Mobile App'),
  p('proj-ai', 'du-an/ai-automation', 'projects/ai-automation', 'AI Automation', 'AI Automation'),

  // Blog / Insights
  p('blog', 'blog', 'insights', 'Blog', 'Insights', 'AI, engineering và chuyển đổi số.', undefined, true),
  p('blog-ai', 'blog/ai', 'insights/ai', 'AI', 'AI'),
  p('blog-health', 'blog/healthcare', 'insights/healthcare', 'Healthcare', 'Healthcare'),
  p('blog-dx', 'blog/digital-transformation', 'insights/digital-transformation', 'Digital Transformation', 'Digital Transformation'),
  p('blog-eng', 'blog/engineering', 'insights/engineering', 'Engineering', 'Engineering'),
  p('blog-news', 'blog/company-news', 'insights/company-news', 'Company News', 'Company News'),

  // Careers
  p('careers', 'tuyen-dung', 'careers', 'Careers', 'Careers', 'Cơ hội nghề nghiệp tại KIT Technology.'),
];

const pathIndex = new Map<string, PageEntry>();
for (const locale of ['vi', 'en'] as const) {
  for (const page of pages) {
    pathIndex.set(`${locale}:${page.paths[locale]}`, page);
  }
}

export function localePrefix(locale: Locale): string {
  return `/${locale}`;
}

export function pageUrl(locale: Locale, path: string): string {
  return `${localePrefix(locale)}/${path}`;
}

export function getPage(locale: Locale, slug: string): PageEntry | undefined {
  return pathIndex.get(`${locale}:${slug}`);
}

export function getStaticSlugs(locale: Locale): string[] {
  return pages.map((page) => page.paths[locale]);
}

export function getAlternatePath(locale: Locale, slug: string): string {
  const page = getPage(locale, slug);
  if (!page) return locale === 'vi' ? '/en' : '/vi';
  const other: Locale = locale === 'vi' ? 'en' : 'vi';
  return pageUrl(other, page.paths[other]);
}

export const mainNav: Record<Locale, NavGroup[]> = {
  vi: [
    {
      label: 'Products',
      href: pageUrl('vi', 'san-pham'),
      items: [
        { label: 'Novixa', href: pageUrl('vi', 'san-pham/novixa') },
        { label: 'AI Automation', href: pageUrl('vi', 'san-pham/ai-automation') },
        { label: 'AI Agent', href: pageUrl('vi', 'san-pham/ai-agent') },
        { label: 'Sản phẩm tương lai', href: pageUrl('vi', 'san-pham/tuong-lai') },
      ],
    },
    {
      label: 'Solutions',
      href: pageUrl('vi', 'giai-phap'),
      items: [
        { label: 'Healthcare', href: pageUrl('vi', 'giai-phap/healthcare') },
        { label: 'Retail', href: pageUrl('vi', 'giai-phap/retail') },
        { label: 'AI Transformation', href: pageUrl('vi', 'giai-phap/ai-transformation') },
        { label: 'Enterprise Platform', href: pageUrl('vi', 'giai-phap/enterprise-platform') },
      ],
    },
    {
      label: 'Technology',
      href: pageUrl('vi', 'cong-nghe'),
      items: [
        { label: 'Flutter', href: pageUrl('vi', 'cong-nghe/flutter') },
        { label: 'Node.js', href: pageUrl('vi', 'cong-nghe/nodejs') },
        { label: 'PostgreSQL', href: pageUrl('vi', 'cong-nghe/postgresql') },
        { label: 'Docker', href: pageUrl('vi', 'cong-nghe/docker') },
        { label: 'AI & LLM', href: pageUrl('vi', 'cong-nghe/ai') },
        { label: 'Cloud', href: pageUrl('vi', 'cong-nghe/cloud') },
        { label: 'Kiến trúc hệ thống', href: pageUrl('vi', 'cong-nghe/kien-truc-he-thong') },
      ],
    },
    {
      label: 'Insights',
      href: pageUrl('vi', 'blog'),
      items: [
        { label: 'AI', href: pageUrl('vi', 'blog/ai') },
        { label: 'Healthcare', href: pageUrl('vi', 'blog/healthcare') },
        { label: 'Digital Transformation', href: pageUrl('vi', 'blog/digital-transformation') },
        { label: 'Engineering', href: pageUrl('vi', 'blog/engineering') },
        { label: 'Company News', href: pageUrl('vi', 'blog/company-news') },
      ],
    },
    {
      label: 'Company',
      href: pageUrl('vi', 'gioi-thieu'),
      items: [
        { label: 'Câu chuyện KIT', href: pageUrl('vi', 'gioi-thieu/cau-chuyen-kit') },
        { label: 'Tầm nhìn & Sứ mệnh', href: pageUrl('vi', 'gioi-thieu/tam-nhin') },
        { label: 'Giá trị cốt lõi', href: pageUrl('vi', 'gioi-thieu/gia-tri-cot-loi') },
        { label: 'Đội ngũ', href: pageUrl('vi', 'gioi-thieu/doi-ngu') },
        { label: 'Dự án tiêu biểu', href: pageUrl('vi', 'du-an') },
        { label: 'Careers', href: pageUrl('vi', 'tuyen-dung') },
      ],
    },
  ],
  en: [
    {
      label: 'Products',
      href: pageUrl('en', 'products'),
      items: [
        { label: 'Novixa', href: pageUrl('en', 'products/novixa') },
        { label: 'AI Automation', href: pageUrl('en', 'products/ai-automation') },
        { label: 'AI Agent', href: pageUrl('en', 'products/ai-agent') },
        { label: 'Future Products', href: pageUrl('en', 'products/future') },
      ],
    },
    {
      label: 'Solutions',
      href: pageUrl('en', 'solutions'),
      items: [
        { label: 'Healthcare', href: pageUrl('en', 'solutions/healthcare') },
        { label: 'Retail', href: pageUrl('en', 'solutions/retail') },
        { label: 'AI Transformation', href: pageUrl('en', 'solutions/ai-transformation') },
        { label: 'Enterprise Platform', href: pageUrl('en', 'solutions/enterprise-platform') },
      ],
    },
    {
      label: 'Technology',
      href: pageUrl('en', 'technology'),
      items: [
        { label: 'Flutter', href: pageUrl('en', 'technology/flutter') },
        { label: 'Node.js', href: pageUrl('en', 'technology/nodejs') },
        { label: 'PostgreSQL', href: pageUrl('en', 'technology/postgresql') },
        { label: 'Docker', href: pageUrl('en', 'technology/docker') },
        { label: 'AI & LLM', href: pageUrl('en', 'technology/ai') },
        { label: 'Cloud', href: pageUrl('en', 'technology/cloud') },
        { label: 'Architecture', href: pageUrl('en', 'technology/architecture') },
      ],
    },
    {
      label: 'Insights',
      href: pageUrl('en', 'insights'),
      items: [
        { label: 'AI', href: pageUrl('en', 'insights/ai') },
        { label: 'Healthcare', href: pageUrl('en', 'insights/healthcare') },
        { label: 'Digital Transformation', href: pageUrl('en', 'insights/digital-transformation') },
        { label: 'Engineering', href: pageUrl('en', 'insights/engineering') },
        { label: 'Company News', href: pageUrl('en', 'insights/company-news') },
      ],
    },
    {
      label: 'Company',
      href: pageUrl('en', 'company'),
      items: [
        { label: 'KIT Story', href: pageUrl('en', 'company/story') },
        { label: 'Vision & Mission', href: pageUrl('en', 'company/vision') },
        { label: 'Core Values', href: pageUrl('en', 'company/values') },
        { label: 'Team', href: pageUrl('en', 'company/team') },
        { label: 'Case Studies', href: pageUrl('en', 'projects') },
        { label: 'Careers', href: pageUrl('en', 'careers') },
      ],
    },
  ],
};

export function getHubChildren(locale: Locale, hubKey: string): PageEntry[] {
  const hub = pages.find((item) => item.key === hubKey);
  if (!hub) return [];
  const hubPath = hub.paths[locale];
  return pages.filter((item) => {
    const path = item.paths[locale];
    if (path === hubPath || !path.startsWith(`${hubPath}/`)) return false;
    const rest = path.slice(hubPath.length + 1);
    return !rest.includes('/');
  });
}
