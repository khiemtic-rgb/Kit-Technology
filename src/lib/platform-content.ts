import type { Locale } from '../i18n';
import type { IconName } from './icons';
import { pageUrl } from './site-map';

export function platformContent(locale: Locale) {
  const vi = locale === 'vi';
  const contact = vi ? '/vi/lien-he/' : '/en/contact/';
  const products = pageUrl(locale, vi ? 'san-pham' : 'products');
  const tech = pageUrl(locale, vi ? 'cong-nghe' : 'technology');

  return {
    hero: {
      title: 'KIT Platform',
      accent: 'One Platform. Unlimited Solutions.',
      lead: vi
        ? 'KIT Platform là nền tảng công nghệ cốt lõi của KIT Technology, cung cấp các dịch vụ nền tảng, AI và hạ tầng giúp phát triển nhanh các ứng dụng doanh nghiệp và gia đình trên cùng một kiến trúc thống nhất.'
        : 'KIT Platform is the core technology foundation of KIT Technology — shared platform services, AI, and infrastructure to ship business and family apps on one architecture.',
      primaryCta: vi ? 'Khám phá nền tảng' : 'Explore the platform',
      primaryHref: '#architecture',
      secondaryCta: vi ? 'Tài liệu kỹ thuật' : 'Technical docs',
      secondaryHref: tech,
    },
    solutions: {
      eyebrow: vi ? 'Một nền tảng' : 'One platform',
      title: vi ? 'Nhiều giải pháp' : 'Many solutions',
      lead: vi
        ? 'KIT Platform là nền tảng chung cho mọi sản phẩm, giúp rút ngắn thời gian phát triển và tối ưu vận hành.'
        : 'KIT Platform is the shared foundation for every product — faster delivery and leaner operations.',
      linkLabel: vi ? 'Tìm hiểu kiến trúc' : 'Explore architecture',
      linkHref: '#architecture',
      hubLabel: 'KIT Platform',
      cards: [
        {
          name: 'Novixa',
          kind: 'Healthcare Platform',
          desc: vi
            ? 'Nền tảng quản trị nhà thuốc thông minh, giúp tối ưu vận hành và chăm sóc khách hàng.'
            : 'Smart pharmacy platform to optimize operations and customer care.',
          tone: 'novixa' as const,
          href: vi ? 'https://novixa.vn/vi' : 'https://novixa.vn/en',
          external: true,
        },
        {
          name: 'Famixa',
          kind: 'Family Operating System',
          desc: vi
            ? 'Nền tảng đồng hành cùng gia đình hiện đại, giúp trẻ tự giác và gia đình hạnh phúc hơn.'
            : 'A modern family companion — kids build habits, families stay happier.',
          tone: 'famixa' as const,
          href: 'https://famixa.vn',
          external: true,
        },
        {
          name: 'Future Products',
          kind: 'Enterprise Solutions',
          desc: vi
            ? 'Tiếp tục phát triển các giải pháp cho nhiều lĩnh vực trên cùng KIT Platform.'
            : 'Continue building multi-industry solutions on the same KIT Platform.',
          tone: 'future' as const,
          href: products,
          external: false,
        },
      ],
    },
    architecture: {
      id: 'architecture',
      eyebrow: vi ? 'Kiến trúc nền tảng' : 'Platform architecture',
      title: vi ? 'Xây dựng để mở rộng và bền vững' : 'Built to scale and last',
      lead: vi
        ? 'Kiến trúc nhiều lớp giúp tách biệt mối quan tâm, dễ mở rộng, dễ tích hợp và đảm bảo hiệu năng cao.'
        : 'A layered architecture separates concerns — easy to scale, integrate, and keep performing.',
      layers: [
        {
          name: 'Presentation Layer',
          subtitle: vi ? 'Giao diện & Kênh truy cập' : 'Interfaces & access channels',
          tone: 'presentation' as const,
          icon: 'layers' as IconName,
          variant: 'icons' as const,
          items: [
            { label: 'Web', icon: 'globe' as IconName },
            { label: 'Mobile', icon: 'mobile' as IconName },
            { label: 'Admin', icon: 'users' as IconName },
            { label: 'POS', icon: 'retail' as IconName },
            { label: 'Portal', icon: 'platform' as IconName },
            { label: 'API Clients', icon: 'api' as IconName },
          ],
        },
        {
          name: 'Business Modules',
          subtitle: vi ? 'Các giải pháp & Ứng dụng' : 'Solutions & applications',
          tone: 'business' as const,
          icon: 'enterprise' as IconName,
          variant: 'pills' as const,
          items: [
            { label: 'Novixa', icon: 'pharmacy' as IconName },
            { label: 'Famixa', icon: 'family' as IconName },
            { label: '...', icon: 'more' as IconName },
          ],
        },
        {
          name: 'Platform Services',
          subtitle: vi ? 'Dịch vụ nền tảng' : 'Platform services',
          tone: 'services' as const,
          icon: 'security' as IconName,
          variant: 'icons' as const,
          items: [
            { label: 'Identity', icon: 'identity' as IconName },
            { label: 'Workflow', icon: 'workflow' as IconName },
            { label: 'Notification', icon: 'bell' as IconName },
            { label: 'File', icon: 'document' as IconName },
            { label: 'Billing', icon: 'billing' as IconName },
            { label: 'API Gateway', icon: 'api' as IconName },
            { label: 'Search', icon: 'analytics' as IconName },
            { label: 'Audit', icon: 'monitoring' as IconName },
          ],
        },
        {
          name: 'AI Layer',
          subtitle: vi ? 'Trí tuệ nhân tạo' : 'Artificial intelligence',
          tone: 'ai' as const,
          icon: 'ai' as IconName,
          variant: 'icons' as const,
          items: [
            { label: 'AI Assistant', icon: 'assistant' as IconName },
            { label: 'Knowledge AI', icon: 'knowledge' as IconName },
            { label: 'Document AI', icon: 'document' as IconName },
            { label: 'Vision AI', icon: 'vision' as IconName },
            { label: 'Automation', icon: 'automation' as IconName },
            { label: 'Recommendation', icon: 'recommendation' as IconName },
          ],
        },
        {
          name: 'Infrastructure',
          subtitle: vi ? 'Hạ tầng kỹ thuật' : 'Infrastructure & ops',
          tone: 'infra' as const,
          icon: 'server' as IconName,
          variant: 'icons' as const,
          items: [
            { label: 'Cloud', icon: 'cloud' as IconName },
            { label: 'Docker', icon: 'container' as IconName },
            { label: 'Kubernetes', icon: 'orchestration' as IconName },
            { label: 'PostgreSQL', icon: 'database' as IconName },
            { label: 'Redis', icon: 'cache' as IconName },
            { label: 'Storage', icon: 'database' as IconName },
          ],
        },
      ],
    },
    services: {
      eyebrow: 'Platform Services',
      title: vi ? 'Các dịch vụ cốt lõi' : 'Core shared services',
      lead: vi
        ? 'Bộ dịch vụ nền tảng mạnh mẽ giúp phát triển nhanh, vận hành ổn định và mở rộng linh hoạt.'
        : 'A strong set of platform services for faster delivery, stable ops, and flexible scale.',
      items: [
        { icon: 'identity' as IconName, title: 'Identity', desc: 'SSO, RBAC, Permission' },
        { icon: 'workflow' as IconName, title: 'Workflow', desc: 'Business Workflow, Approval, Automation' },
        { icon: 'bell' as IconName, title: 'Notification', desc: 'Email, SMS, Push, Zalo' },
        { icon: 'database' as IconName, title: 'Storage', desc: 'Object Storage, Version, CDN' },
        { icon: 'api' as IconName, title: 'API Gateway', desc: 'REST, Webhook, OAuth, OpenAPI' },
        { icon: 'analytics' as IconName, title: 'Search', desc: 'Full-text Search, Elastic Search' },
        { icon: 'billing' as IconName, title: 'Billing', desc: 'Subscription, Usage, Invoice' },
        { icon: 'monitoring' as IconName, title: 'Audit', desc: 'Audit Trail, Activity Log' },
      ],
    },
    ai: {
      eyebrow: 'AI Layer',
      title: 'AI Everywhere',
      lead: vi
        ? 'AI được tích hợp xuyên suốt nền tảng, trở thành sức mạnh giúp các giải pháp thông minh hơn mỗi ngày.'
        : 'AI is woven through the platform — powering smarter solutions every day.',
      items: [
        { icon: 'assistant' as IconName, title: 'AI Assistant', note: vi ? 'Hỗ trợ thông minh' : 'Smart support' },
        { icon: 'knowledge' as IconName, title: 'Knowledge AI', note: vi ? 'Tìm kiếm tri thức' : 'Knowledge search' },
        { icon: 'document' as IconName, title: 'Document AI', note: vi ? 'Xử lý tài liệu' : 'Document processing' },
        { icon: 'vision' as IconName, title: 'Vision AI', note: vi ? 'Nhận diện hình ảnh' : 'Image recognition' },
        { icon: 'automation' as IconName, title: 'Automation', note: vi ? 'Tự động hóa quy trình' : 'Process automation' },
        {
          icon: 'recommendation' as IconName,
          title: 'Recommendation',
          note: vi ? 'Gợi ý thông minh' : 'Smart recommendations',
        },
      ],
    },
    enterprise: {
      eyebrow: 'Enterprise Ready',
      title: vi ? 'Sẵn sàng cho doanh nghiệp' : 'Ready for enterprise',
      items: [
        {
          icon: 'cloud' as IconName,
          title: 'Cloud Native',
          desc: vi ? 'Triển khai linh hoạt trên mọi nền tảng.' : 'Flexible deployment across clouds and platforms.',
        },
        {
          icon: 'api' as IconName,
          title: 'API First',
          desc: vi
            ? 'Dễ tích hợp với hệ thống và đối tác bên ngoài.'
            : 'Easy integration with external systems and partners.',
        },
        {
          icon: 'security' as IconName,
          title: 'Security',
          desc: vi ? 'Bảo mật nhiều lớp, tuân thủ tiêu chuẩn.' : 'Multi-layer security with compliance in mind.',
        },
        {
          icon: 'scalable' as IconName,
          title: 'Scalable',
          desc: vi ? 'Mở rộng linh hoạt, hiệu năng vượt trội.' : 'Flexible scale with strong performance.',
        },
      ],
    },
    stack: {
      eyebrow: vi ? 'Công nghệ' : 'Technology',
      title: vi ? 'Công nghệ hiện đại' : 'Modern stack',
      items: [
        { label: '.NET', icon: 'code' as IconName },
        { label: 'Flutter', icon: 'mobile' as IconName },
        { label: 'NestJS', icon: 'api' as IconName },
        { label: 'PostgreSQL', icon: 'database' as IconName },
        { label: 'Redis', icon: 'cache' as IconName },
        { label: 'Docker', icon: 'container' as IconName },
        { label: 'Kubernetes', icon: 'orchestration' as IconName },
        { label: 'Cloud', icon: 'cloud' as IconName },
      ],
    },
    trust: {
      eyebrow: vi ? 'Được tin dùng bởi' : 'Trusted by',
      items: [
        {
          name: 'Novixa',
          kind: 'Healthcare Platform',
          tone: 'novixa' as const,
          href: vi ? 'https://novixa.vn/vi' : 'https://novixa.vn/en',
          external: true,
        },
        {
          name: 'Famixa',
          kind: 'Family OS',
          tone: 'famixa' as const,
          href: 'https://famixa.vn',
          external: true,
        },
        {
          name: vi ? 'More Products Coming Soon' : 'More Products Coming Soon',
          kind: '',
          tone: 'soon' as const,
          href: products,
          external: false,
        },
      ],
    },
    cta: {
      title: vi
        ? 'Sẵn sàng xây dựng giải pháp của bạn trên KIT Platform?'
        : 'Ready to build your solution on KIT Platform?',
      lead: vi
        ? 'Đội ngũ KIT Technology luôn sẵn sàng đồng hành cùng bạn kiến tạo những sản phẩm đột phá.'
        : 'The KIT Technology team is ready to co-build breakthrough products with you.',
      primaryCta: vi ? 'Liên hệ ngay' : 'Contact us',
      primaryHref: contact,
      secondaryCta: vi ? 'Khám phá sản phẩm' : 'Explore products',
      secondaryHref: products,
    },
  };
}

export type PlatformContent = ReturnType<typeof platformContent>;
