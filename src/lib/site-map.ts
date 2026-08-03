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
  // Platform
  p(
    'platform',
    'nen-tang',
    'platform',
    'KIT Platform',
    'KIT Platform',
    'Một nền tảng AI thống nhất — Identity, Workflow, Notification, API và Storage cho mọi giải pháp số.',
    'One unified AI platform — Identity, Workflow, Notification, API, and Storage for every digital solution.',
    true,
  ),

  // Company
  p(
    'company',
    'gioi-thieu',
    'company',
    'Công ty',
    'Company',
    'KIT Technology xây dựng nền tảng AI và các giải pháp số.',
    'KIT Technology builds the AI platform and digital solutions.',
    true,
  ),
  p('about', 'gioi-thieu/ve-chung-toi', 'company/about', 'Giới thiệu KIT Technology', 'About KIT Technology', 'Kiến tạo nền tảng số bằng sức mạnh của AI.'),
  p('story', 'gioi-thieu/cau-chuyen-kit', 'company/story', 'Câu chuyện KIT', 'KIT Story'),
  p('vision', 'gioi-thieu/tam-nhin', 'company/vision', 'Tầm nhìn', 'Vision'),
  p('mission', 'gioi-thieu/su-menh', 'company/mission', 'Sứ mệnh', 'Mission'),
  p('values', 'gioi-thieu/gia-tri-cot-loi', 'company/core-values', 'Giá trị cốt lõi', 'Core Values'),
  p('company-tech', 'gioi-thieu/cong-nghe', 'company/technology', 'Công nghệ', 'Technology', 'Công nghệ tạo nên các nền tảng của KIT.'),
  p('why-kit', 'gioi-thieu/vi-sao-chon-kit', 'company/why-kit', 'Vì sao chọn KIT', 'Why KIT'),
  p('company-contact', 'gioi-thieu/lien-he', 'company/contact', 'Liên hệ', 'Contact'),
  p('engineering', 'ky-thuat', 'engineering', 'Kỹ thuật', 'Engineering', 'Chia sẻ kiến thức kỹ thuật từ đội ngũ KIT.'),
  p('team', 'gioi-thieu/doi-ngu', 'company/team', 'Đội ngũ', 'Team'),

  // Products
  p(
    'products',
    'san-pham',
    'products',
    'Sản phẩm',
    'Products',
    'Hai giải pháp trọng tâm trên KIT Platform: Novixa và Famixa.',
    'Two flagship solutions on KIT Platform: Novixa and Famixa.',
    true,
  ),
  p('novixa', 'san-pham/novixa', 'products/novixa', 'Novixa', 'Novixa', 'Healthcare SaaS — thương hiệu sản phẩm, website riêng tại novixa.vn.', undefined, true),
  p('novixa-intro', 'san-pham/novixa/gioi-thieu', 'products/novixa/overview', 'Novixa — Giới thiệu', 'Novixa Overview'),
  p('novixa-pos', 'san-pham/novixa/pos-nha-thuoc', 'products/novixa/pharmacy-pos', 'POS Nhà thuốc', 'Pharmacy POS'),
  p('novixa-chain', 'san-pham/novixa/quan-ly-chuoi', 'products/novixa/chain', 'Quản lý chuỗi', 'Chain Management'),
  p('novixa-app', 'san-pham/novixa/app-khach-hang', 'products/novixa/customer-app', 'App khách hàng', 'Customer App'),
  p('novixa-ai', 'san-pham/novixa/ai-assistant', 'products/novixa/ai-assistant', 'Trợ lý AI', 'AI Assistant'),
  p('novixa-api', 'san-pham/novixa/api', 'products/novixa/api', 'API', 'API'),
  p('novixa-demo', 'san-pham/novixa/demo', 'products/novixa/demo', 'Đăng ký demo', 'Demo'),
  p('ai-automation', 'san-pham/ai-automation', 'products/ai-automation', 'Tự động hóa AI', 'AI Automation'),
  p('ai-agent', 'san-pham/ai-agent', 'products/ai-agent', 'AI Agent', 'AI Agent'),
  p('future-products', 'san-pham/tuong-lai', 'products/future', 'Sản phẩm tương lai', 'Future Products'),

  // Solutions
  p('solutions', 'giai-phap', 'solutions', 'Giải pháp', 'Solutions', 'Giải pháp theo ngành và quy mô doanh nghiệp.', undefined, true),
  p('sol-healthcare', 'giai-phap/healthcare', 'solutions/healthcare', 'Ngành y tế & nhà thuốc', 'Healthcare', 'Giải pháp chuyển đổi số cho ngành y tế và nhà thuốc.', 'Digital solutions for healthcare and pharmacies.'),
  p('sol-retail', 'giai-phap/retail', 'solutions/retail', 'Bán lẻ', 'Retail', 'Giải pháp số hóa bán lẻ và điểm bán.', 'Digital solutions for modern retail.'),
  p('sol-ai', 'giai-phap/ai-transformation', 'solutions/ai-transformation', 'Chuyển đổi AI', 'AI Transformation', 'Ứng dụng AI vào quy trình và sản phẩm doanh nghiệp.', 'Apply AI across products and operations.'),
  p('sol-enterprise', 'giai-phap/enterprise-platform', 'solutions/enterprise-platform', 'Nền tảng doanh nghiệp', 'Enterprise Platform', 'Nền tảng số tùy chỉnh theo quy mô doanh nghiệp.', 'Custom digital platforms at enterprise scale.'),

  // Technology
  p(
    'technology',
    'cong-nghe',
    'technology',
    'Công nghệ',
    'Technology',
    'Stack hiện đại đứng sau KIT Platform.',
    'The modern stack behind KIT Platform.',
    true,
  ),
  p('tech-flutter', 'cong-nghe/flutter', 'technology/flutter', 'Flutter', 'Flutter'),
  p('tech-node', 'cong-nghe/nodejs', 'technology/nodejs', 'Node.js', 'Node.js'),
  p('tech-pg', 'cong-nghe/postgresql', 'technology/postgresql', 'PostgreSQL', 'PostgreSQL'),
  p('tech-docker', 'cong-nghe/docker', 'technology/docker', 'Docker', 'Docker'),
  p('tech-ai', 'cong-nghe/ai', 'technology/ai', 'AI & LLM', 'AI'),
  p('tech-cloud', 'cong-nghe/cloud', 'technology/cloud', 'Cloud', 'Cloud'),
  p('tech-arch', 'cong-nghe/kien-truc-he-thong', 'technology/architecture', 'Kiến trúc hệ thống', 'System Architecture'),

  // Projects
  p('projects', 'du-an', 'projects', 'Dự án tiêu biểu', 'Case Studies', 'Các dự án và sản phẩm KIT Technology triển khai thực tế.', 'Selected projects and products from KIT Technology.', true),
  p('proj-novixa', 'du-an/novixa', 'projects/novixa', 'Novixa', 'Novixa'),
  p('proj-web', 'du-an/website', 'projects/website', 'Website', 'Website'),
  p('proj-mobile', 'du-an/mobile-app', 'projects/mobile-app', 'Ứng dụng mobile', 'Mobile App'),
  p('proj-ai', 'du-an/ai-automation', 'projects/ai-automation', 'Tự động hóa AI', 'AI Automation'),

  // Blog / Insights (Knowledge Hub)
  p(
    'blog',
    'blog',
    'insights',
    'Kiến thức',
    'Insights',
    'Bài viết về AI, nền tảng và chuyển đổi số.',
    'Articles on AI, platforms, and digital transformation.',
    true,
  ),
  p('blog-ai', 'blog/ai', 'insights/ai', 'AI', 'AI'),
  p('blog-health', 'blog/healthcare', 'insights/healthcare', 'Ngành y tế', 'Healthcare'),
  p('blog-dx', 'blog/digital-transformation', 'insights/digital-transformation', 'Chuyển đổi số', 'Digital Transformation'),
  p('blog-eng', 'blog/engineering', 'insights/engineering', 'Kỹ thuật', 'Engineering'),
  p('blog-news', 'blog/company-news', 'insights/company-news', 'Công ty', 'Company'),
  p('blog-business', 'blog/business', 'insights/business', 'Kinh doanh', 'Business'),
  p('blog-tech-cat', 'blog/technology', 'insights/technology', 'Công nghệ', 'Technology'),
  p('blog-sol-cat', 'blog/solutions', 'insights/solutions', 'Giải pháp', 'Solutions'),
  p('blog-prod-cat', 'blog/products', 'insights/products', 'Sản phẩm', 'Products'),
  p('faq', 'faq', 'faq', 'Câu hỏi thường gặp', 'FAQ', 'Câu hỏi thường gặp về Novixa và KIT Technology.', 'Frequently asked questions about Novixa and KIT Technology.', true),

  // Careers
  p('careers', 'tuyen-dung', 'careers', 'Tuyển dụng', 'Careers', 'Cơ hội nghề nghiệp tại KIT Technology.'),

  // Public traffic stats (Cloudflare Web Analytics / Worker counters)
  p(
    'stats',
    'thong-ke',
    'stats',
    'Thống kê truy cập',
    'Traffic statistics',
    'Số liệu truy cập kittech.vn từ Cloudflare.',
    'kittech.vn traffic metrics from Cloudflare.',
    true,
  ),
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
  const joined = `${localePrefix(locale)}/${path}`.replace(/\/{2,}/g, '/');
  return joined.endsWith('/') ? joined : `${joined}/`;
}

export function getPage(locale: Locale, slug: string): PageEntry | undefined {
  return pathIndex.get(`${locale}:${slug}`);
}

export function getStaticSlugs(locale: Locale): string[] {
  return pages.map((page) => page.paths[locale]);
}

export function getAlternatePath(locale: Locale, slug: string): string {
  const page = getPage(locale, slug);
  if (!page) return locale === 'vi' ? '/en/' : '/vi/';
  const other: Locale = locale === 'vi' ? 'en' : 'vi';
  return pageUrl(other, page.paths[other]);
}

/** Flat top nav — homepage IA. */
export const mainNav: Record<Locale, NavGroup[]> = {
  vi: [
    { label: 'Trang chủ', href: '/vi/' },
    { label: 'Kit Platform', href: pageUrl('vi', 'nen-tang') },
    { label: 'Sản phẩm', href: pageUrl('vi', 'san-pham') },
    { label: 'Công nghệ', href: pageUrl('vi', 'cong-nghe') },
    { label: 'Kiến thức', href: pageUrl('vi', 'blog') },
    { label: 'Công ty', href: pageUrl('vi', 'gioi-thieu') },
  ],
  en: [
    { label: 'Home', href: '/en/' },
    { label: 'Kit Platform', href: pageUrl('en', 'platform') },
    { label: 'Products', href: pageUrl('en', 'products') },
    { label: 'Technology', href: pageUrl('en', 'technology') },
    { label: 'Insights', href: pageUrl('en', 'insights') },
    { label: 'Company', href: pageUrl('en', 'company') },
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
