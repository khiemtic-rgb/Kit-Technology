import type { Locale } from '../i18n';
import type { IconName } from './icons';
import { pageUrl } from './site-map';

export type Chip = {
  icon: IconName;
  label: string;
  sub?: string;
  accent?: string;
};

export type EcosystemCard = {
  icon: IconName;
  name: string;
  kind: string;
  desc: string;
  href: string;
  external?: boolean;
  status: string;
  accent: string;
};

export type FeatureItem = {
  icon: IconName;
  title: string;
  desc: string;
};

const contactHref = (locale: Locale) => (locale === 'vi' ? '/vi/lien-he/' : '/en/contact/');
const productsHref = (locale: Locale) => pageUrl(locale, locale === 'vi' ? 'san-pham' : 'products');
const solutionsHref = (locale: Locale) => pageUrl(locale, locale === 'vi' ? 'giai-phap' : 'solutions');
const insightsHref = (locale: Locale) => pageUrl(locale, locale === 'vi' ? 'blog' : 'insights');

export function homeContent(locale: Locale) {
  const vi = locale === 'vi';

  const hero = {
    titleAccent: 'AI Platform',
    titleRest: vi ? 'cho giải pháp số doanh nghiệp' : 'for Enterprise Digital Solutions',
    lead: vi
      ? 'KIT Technology xây dựng nền tảng AI giúp doanh nghiệp phát triển các ứng dụng và giải pháp số trên cùng một Platform thống nhất.'
      : 'KIT Technology builds the AI platform that lets businesses ship digital applications and solutions on one unified foundation.',
    primaryCta: vi ? 'Khám phá Platform' : 'Explore Platform',
    primaryHref: `${vi ? '/vi/' : '/en/'}#platform`,
    secondaryCta: vi ? 'Giải pháp của chúng tôi' : 'Our Solutions',
    secondaryHref: solutionsHref(locale),
    coreLabel: 'KIT PLATFORM',
    orbit: [
      { icon: 'workflow', label: 'Workflow' },
      { icon: 'ai', label: 'AI Gateway' },
      { icon: 'api', label: 'API Gateway' },
      { icon: 'identity', label: vi ? 'Định danh' : 'Identity' },
      { icon: 'database', label: vi ? 'Dữ liệu' : 'Data' },
      { icon: 'bell', label: vi ? 'Thông báo' : 'Notification' },
      { icon: 'billing', label: vi ? 'Thanh toán' : 'Billing' },
      { icon: 'monitoring', label: vi ? 'Giám sát' : 'Monitoring' },
    ] satisfies Chip[],
  };

  const platform = {
    title: vi ? 'Một Platform.' : 'One Platform.',
    titleAccent: vi ? 'Nhiều giải pháp.' : 'Many Solutions.',
    intro: vi
      ? 'Các dịch vụ dùng chung được xây một lần trên KIT Platform, mọi sản phẩm trong hệ sinh thái kế thừa lại.'
      : 'Shared services are built once on KIT Platform and inherited by every product in the ecosystem.',
    coreLabel: 'KIT PLATFORM',
    ecosystemLabel: vi ? 'HỆ SINH THÁI GIẢI PHÁP' : 'ECOSYSTEM OF SOLUTIONS',
    capabilities: [
      { icon: 'identity', label: vi ? 'Định danh & Phân quyền' : 'Identity & Access' },
      { icon: 'api', label: 'API Gateway' },
      { icon: 'workflow', label: vi ? 'Luồng nghiệp vụ' : 'Workflow Engine' },
      { icon: 'ai', label: 'AI Gateway' },
      { icon: 'database', label: vi ? 'Lưu trữ dữ liệu' : 'Data Storage' },
      { icon: 'bell', label: vi ? 'Thông báo' : 'Notifications' },
      { icon: 'monitoring', label: vi ? 'Giám sát' : 'Monitoring' },
      { icon: 'billing', label: vi ? 'Thanh toán & Tenant' : 'Billing & Tenant' },
      { icon: 'analytics', label: vi ? 'Báo cáo' : 'Analytics' },
      { icon: 'more', label: vi ? 'Và nhiều hơn' : 'And more' },
    ] satisfies Chip[],
    solutions: [
      { icon: 'pharmacy', label: 'Novixa', sub: vi ? 'Nền tảng nhà thuốc' : 'Pharmacy Platform', accent: '#16a34a' },
      { icon: 'family', label: 'Famixa', sub: 'Family OS', accent: '#f97316' },
      { icon: 'spa', label: 'Spa OS', sub: vi ? 'Nền tảng làm đẹp' : 'Beauty Platform', accent: '#db2777' },
      { icon: 'clinic', label: 'Clinic OS', sub: vi ? 'Nền tảng phòng khám' : 'Medical Platform', accent: '#0ea5e9' },
      { icon: 'education', label: 'Edu OS', sub: vi ? 'Nền tảng giáo dục' : 'Education Platform', accent: '#7c3aed' },
      { icon: 'plus', label: vi ? 'Giải pháp khác' : 'More Solutions', sub: vi ? 'Theo yêu cầu' : 'On demand', accent: '#1668dc' },
    ] satisfies Chip[],
  };

  const ecosystem = {
    title: vi ? 'Hệ sinh thái sản phẩm' : 'Our Ecosystem',
    intro: vi
      ? 'Mỗi ngành một sản phẩm riêng, tất cả chạy trên cùng một lõi KIT Platform.'
      : 'A dedicated product per industry, all running on the same KIT Platform core.',
    more: vi ? 'Tìm hiểu thêm' : 'Learn more',
    cards: [
      {
        icon: 'pharmacy',
        name: 'Novixa',
        kind: vi ? 'Nền tảng y tế' : 'Healthcare Platform',
        desc: vi
          ? 'Quản trị nhà thuốc và chuỗi: POS, tồn kho, CRM, app khách hàng và trợ lý AI.'
          : 'Pharmacy and chain management: POS, inventory, CRM, customer app and AI assistant.',
        href: vi ? 'https://novixa.vn/vi' : 'https://novixa.vn/en',
        external: true,
        status: vi ? 'Đang vận hành' : 'Live',
        accent: '#16a34a',
      },
      {
        icon: 'family',
        name: 'Famixa',
        kind: 'Family OS',
        desc: vi
          ? 'Quản lý sức khỏe, chi tiêu và thói quen của cả gia đình trên một ứng dụng.'
          : 'Health, spending and habits for the whole family in one app.',
        href: pageUrl(locale, vi ? 'san-pham/tuong-lai' : 'products/future'),
        status: vi ? 'Thử nghiệm' : 'Pilot',
        accent: '#f97316',
      },
      {
        icon: 'spa',
        name: 'Spa OS',
        kind: vi ? 'Nền tảng làm đẹp' : 'Beauty Platform',
        desc: vi
          ? 'Đặt lịch, liệu trình, thẻ dịch vụ và chăm sóc khách hàng cho spa, thẩm mỹ viện.'
          : 'Booking, treatment plans, service cards and customer care for spas and clinics.',
        href: pageUrl(locale, vi ? 'san-pham/tuong-lai' : 'products/future'),
        status: vi ? 'Sắp ra mắt' : 'Coming soon',
        accent: '#db2777',
      },
      {
        icon: 'clinic',
        name: 'Clinic OS',
        kind: vi ? 'Nền tảng phòng khám' : 'Medical Platform',
        desc: vi
          ? 'Tiếp nhận, bệnh án điện tử, kê đơn và thanh toán cho phòng khám tư nhân.'
          : 'Reception, electronic records, prescriptions and billing for private clinics.',
        href: pageUrl(locale, vi ? 'san-pham/tuong-lai' : 'products/future'),
        status: vi ? 'Sắp ra mắt' : 'Coming soon',
        accent: '#0ea5e9',
      },
      {
        icon: 'agriculture',
        name: 'Văn Đình Trà',
        kind: vi ? 'Nông nghiệp số' : 'Digital Agriculture',
        desc: vi
          ? 'Truy xuất nguồn gốc và thương mại số cho vùng trà Thái Nguyên.'
          : 'Traceability and digital commerce for the Thai Nguyen tea region.',
        href: pageUrl(locale, vi ? 'du-an' : 'projects'),
        status: vi ? 'Đang triển khai' : 'In progress',
        accent: '#0f766e',
      },
    ] satisfies EcosystemCard[],
  };

  const industries = {
    title: vi ? 'Ngành chúng tôi phục vụ' : 'Industries We Serve',
    items: [
      { icon: 'healthcare', label: vi ? 'Y tế' : 'Healthcare' },
      { icon: 'retail', label: vi ? 'Bán lẻ' : 'Retail' },
      { icon: 'users', label: vi ? 'Gia đình' : 'Family' },
      { icon: 'spa', label: vi ? 'Làm đẹp' : 'Beauty' },
      { icon: 'clinic', label: vi ? 'Phòng khám' : 'Medical' },
      { icon: 'agriculture', label: vi ? 'Nông nghiệp' : 'Agriculture' },
      { icon: 'education', label: vi ? 'Giáo dục' : 'Education' },
      { icon: 'manufacturing', label: vi ? 'Sản xuất' : 'Manufacturing' },
      { icon: 'government', label: vi ? 'Khối công' : 'Government' },
    ] satisfies Chip[],
  };

  const capabilities = {
    aiTitle: vi ? 'Năng lực AI' : 'AI Capabilities',
    techTitle: vi ? 'Công nghệ hiện đại' : 'Modern Technology',
    ai: [
      { icon: 'assistant', label: vi ? 'Trợ lý AI' : 'AI Assistant' },
      { icon: 'agent', label: 'AI Agent' },
      { icon: 'knowledge', label: 'Knowledge AI' },
      { icon: 'vision', label: 'Vision AI' },
      { icon: 'voice', label: 'Voice AI' },
      { icon: 'automation', label: vi ? 'Tự động hóa' : 'Automation' },
      { icon: 'document', label: 'Document AI' },
      { icon: 'prediction', label: vi ? 'Dự báo' : 'Prediction' },
      { icon: 'recommendation', label: vi ? 'Gợi ý' : 'Recommendation' },
      { icon: 'aiAnalytics', label: 'AI Analytics' },
    ] satisfies Chip[],
    tech: [
      { icon: 'code', label: '.NET' },
      { icon: 'server', label: 'NestJS' },
      { icon: 'mobile', label: 'Flutter' },
      { icon: 'database', label: 'PostgreSQL' },
      { icon: 'container', label: 'Docker' },
      { icon: 'orchestration', label: 'Kubernetes' },
      { icon: 'cache', label: 'Redis' },
      { icon: 'queue', label: 'RabbitMQ' },
      { icon: 'cloud', label: 'Cloud' },
      { icon: 'layers', label: 'Microservices' },
    ] satisfies Chip[],
  };

  const why = {
    title: vi ? 'Vì sao chọn KIT' : 'Why Choose KIT',
    items: [
      { icon: 'ai', title: 'AI First', desc: vi ? 'Ứng dụng AI trong mọi sản phẩm' : 'AI built into every product' },
      { icon: 'platform', title: 'Platform First', desc: vi ? 'Xây một lần, dùng cho mọi giải pháp' : 'Build once, reuse everywhere' },
      { icon: 'cloud', title: 'Cloud Native', desc: vi ? 'Kiến trúc mở rộng trên cloud' : 'Cloud-scale architecture' },
      { icon: 'api', title: 'API First', desc: vi ? 'Kết nối linh hoạt, dễ tích hợp' : 'Open and easy to integrate' },
      { icon: 'enterprise', title: 'Enterprise Ready', desc: vi ? 'Đáp ứng chuẩn doanh nghiệp' : 'Meets enterprise standards' },
      { icon: 'security', title: 'Secure by Design', desc: vi ? 'Bảo mật và phân quyền từ thiết kế' : 'Security and RBAC by design' },
      { icon: 'scalable', title: 'Scalable Architecture', desc: vi ? 'Từ một cửa hàng đến cả chuỗi' : 'From one store to a full chain' },
      { icon: 'innovation', title: 'Continuous Innovation', desc: vi ? 'Cải tiến và cập nhật liên tục' : 'Continuous improvement' },
    ] satisfies FeatureItem[],
  };

  const insights = {
    title: vi ? 'Kiến thức & Tin tức' : 'Insights & News',
    cta: vi ? 'Xem tất cả bài viết' : 'View all insights',
    href: insightsHref(locale),
  };

  const cta = {
    title: vi ? 'Sẵn sàng số hóa doanh nghiệp của bạn?' : 'Ready to digitise your business?',
    desc: vi
      ? 'Đặt lịch tư vấn để nghe phân tích nhu cầu và lộ trình triển khai phù hợp với quy mô của bạn.'
      : 'Book a consultation for a needs analysis and a rollout plan that fits your scale.',
    primaryCta: vi ? 'Đặt lịch tư vấn' : 'Book a consultation',
    primaryHref: contactHref(locale),
    secondaryCta: vi ? 'Xem sản phẩm' : 'View products',
    secondaryHref: productsHref(locale),
  };

  return { hero, platform, ecosystem, industries, capabilities, why, insights, cta };
}
