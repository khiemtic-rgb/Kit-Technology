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
  p('company', 'gioi-thieu', 'company', 'Giới thiệu', 'Company', 'KIT Technology — công ty phần mềm AI First.', undefined, true),
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
  p('products', 'san-pham', 'products', 'Sản phẩm', 'Products', 'Nền tảng số ứng dụng AI cho doanh nghiệp.', undefined, true),
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
  p('technology', 'cong-nghe', 'technology', 'Công nghệ', 'Technology', 'Stack và kiến trúc KIT Technology.', undefined, true),
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
  p('blog', 'blog', 'insights', 'Kiến thức', 'Insights', 'Tri thức về AI, kỹ thuật và chuyển đổi số.', 'Knowledge on AI, engineering, and digital transformation.', true),
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
      label: 'Sản phẩm',
      href: pageUrl('vi', 'san-pham'),
      items: [
        { label: 'Novixa', href: pageUrl('vi', 'san-pham/novixa') },
        { label: 'Tự động hóa AI', href: pageUrl('vi', 'san-pham/ai-automation') },
        { label: 'AI Agent', href: pageUrl('vi', 'san-pham/ai-agent') },
        { label: 'Sản phẩm tương lai', href: pageUrl('vi', 'san-pham/tuong-lai') },
      ],
    },
    {
      label: 'Giải pháp',
      href: pageUrl('vi', 'giai-phap'),
      items: [
        { label: 'Ngành y tế', href: pageUrl('vi', 'giai-phap/healthcare') },
        { label: 'Bán lẻ', href: pageUrl('vi', 'giai-phap/retail') },
        { label: 'Chuyển đổi AI', href: pageUrl('vi', 'giai-phap/ai-transformation') },
        { label: 'Nền tảng doanh nghiệp', href: pageUrl('vi', 'giai-phap/enterprise-platform') },
      ],
    },
    {
      label: 'Công nghệ',
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
      label: 'Kiến thức',
      href: pageUrl('vi', 'blog'),
      items: [
        { label: 'AI', href: pageUrl('vi', 'blog/ai') },
        { label: 'Ngành y tế', href: pageUrl('vi', 'blog/healthcare') },
        { label: 'Kinh doanh', href: pageUrl('vi', 'blog/business') },
        { label: 'Công nghệ', href: pageUrl('vi', 'blog/technology') },
        { label: 'Giải pháp', href: pageUrl('vi', 'blog/solutions') },
        { label: 'Sản phẩm', href: pageUrl('vi', 'blog/products') },
        { label: 'Kỹ thuật', href: pageUrl('vi', 'blog/engineering') },
        { label: 'Công ty', href: pageUrl('vi', 'blog/company-news') },
        { label: 'Câu hỏi thường gặp', href: pageUrl('vi', 'faq') },
      ],
    },
    {
      label: 'Giới thiệu',
      href: pageUrl('vi', 'gioi-thieu'),
      items: [
        { label: 'Về KIT Technology', href: pageUrl('vi', 'gioi-thieu/ve-chung-toi') },
        { label: 'Câu chuyện KIT', href: pageUrl('vi', 'gioi-thieu/cau-chuyen-kit') },
        { label: 'Tầm nhìn', href: pageUrl('vi', 'gioi-thieu/tam-nhin') },
        { label: 'Sứ mệnh', href: pageUrl('vi', 'gioi-thieu/su-menh') },
        { label: 'Giá trị cốt lõi', href: pageUrl('vi', 'gioi-thieu/gia-tri-cot-loi') },
        { label: 'Công nghệ', href: pageUrl('vi', 'gioi-thieu/cong-nghe') },
        { label: 'Vì sao chọn KIT', href: pageUrl('vi', 'gioi-thieu/vi-sao-chon-kit') },
        { label: 'Liên hệ', href: pageUrl('vi', 'gioi-thieu/lien-he') },
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
        { label: 'Business', href: pageUrl('en', 'insights/business') },
        { label: 'Technology', href: pageUrl('en', 'insights/technology') },
        { label: 'Solutions', href: pageUrl('en', 'insights/solutions') },
        { label: 'Products', href: pageUrl('en', 'insights/products') },
        { label: 'Engineering', href: pageUrl('en', 'insights/engineering') },
        { label: 'Company', href: pageUrl('en', 'insights/company-news') },
        { label: 'FAQ', href: pageUrl('en', 'faq') },
      ],
    },
    {
      label: 'Company',
      href: pageUrl('en', 'company'),
      items: [
        { label: 'About', href: pageUrl('en', 'company/about') },
        { label: 'KIT Story', href: pageUrl('en', 'company/story') },
        { label: 'Vision', href: pageUrl('en', 'company/vision') },
        { label: 'Mission', href: pageUrl('en', 'company/mission') },
        { label: 'Core Values', href: pageUrl('en', 'company/core-values') },
        { label: 'Technology', href: pageUrl('en', 'company/technology') },
        { label: 'Why KIT', href: pageUrl('en', 'company/why-kit') },
        { label: 'Contact', href: pageUrl('en', 'company/contact') },
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
