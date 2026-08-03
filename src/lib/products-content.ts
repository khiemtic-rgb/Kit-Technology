import type { Locale } from '../i18n';
import type { IconName } from './icons';
import { pageUrl } from './site-map';

export function productsContent(locale: Locale) {
  const vi = locale === 'vi';
  const contact = vi ? '/vi/lien-he/' : '/en/contact/';
  const platform = pageUrl(locale, vi ? 'nen-tang' : 'platform');
  const roadmap = pageUrl(locale, vi ? 'san-pham/tuong-lai' : 'products/future');

  return {
    hero: {
      eyebrow: vi ? 'Sản phẩm' : 'Products',
      title: vi ? 'Giải pháp số' : 'Digital solutions',
      titleAccent: vi ? 'được xây dựng trên KIT Platform' : 'built on KIT Platform',
      lead: vi
        ? 'Chúng tôi tập trung xây dựng các giải pháp thiết thực, dễ sử dụng và mang lại giá trị thật cho doanh nghiệp và gia đình.'
        : 'We focus on practical, easy-to-use solutions that deliver real value for businesses and families.',
    },
    flagship: {
      eyebrow: vi ? 'Giải pháp trọng tâm' : 'Flagship solutions',
      title: vi ? 'Hai sản phẩm đầu tiên' : 'Two first products',
      cards: [
        {
          tone: 'novixa' as const,
          icon: 'pharmacy' as IconName,
          name: 'Novixa',
          kind: 'Healthcare Platform',
          desc: vi
            ? 'Nền tảng quản trị nhà thuốc thông minh, giúp tối ưu vận hành – kiểm soát hiệu quả – gia tăng doanh thu.'
            : 'Smart pharmacy platform to optimize operations, stay in control, and grow revenue.',
          points: vi
            ? [
                'Quản lý bán hàng & tồn kho chuẩn GPP',
                'FEFO – Kiểm soát hàng cận hạn',
                'Chăm sóc khách hàng & Loyalty',
                'Báo cáo & KPI theo thời gian thực',
              ]
            : [
                'Sales & inventory management to GPP standards',
                'FEFO – Near-expiry control',
                'Customer care & loyalty',
                'Real-time reports & KPIs',
              ],
          cta: vi ? 'Khám phá Novixa' : 'Explore Novixa',
          href: vi ? 'https://novixa.vn/vi' : 'https://novixa.vn/en',
          external: true,
          art: '/images/flagship/novixa-art.png',
        },
        {
          tone: 'famixa' as const,
          icon: 'family' as IconName,
          name: 'Famixa',
          kind: 'Family Operating System',
          desc: vi
            ? 'Nền tảng đồng hành cùng gia đình hiện đại, giúp kết nối – chia sẻ – cùng nhau phát triển mỗi ngày.'
            : 'A companion platform for modern families — connect, share, and grow together every day.',
          points: vi
            ? [
                'Quản lý lịch & công việc gia đình',
                'Theo dõi thói quen & giáo dục con',
                'Sức khỏe & hồ sơ gia đình',
                'Tài chính & chi tiêu chung',
              ]
            : [
                'Family calendar & shared tasks',
                'Habits & kids routines',
                'Health & family records',
                'Shared finances & spending',
              ],
          cta: vi ? 'Khám phá Famixa' : 'Explore Famixa',
          href: 'https://famixa.vn',
          external: true,
          art: '/images/flagship/famixa-art.png',
        },
      ],
    },
    roadmap: {
      text: vi
        ? 'Các sản phẩm khác đang được nghiên cứu và phát triển để đáp ứng nhu cầu đa dạng của doanh nghiệp và người dùng.'
        : 'More products are being researched and developed to meet diverse needs of businesses and users.',
      cta: vi ? 'Xem lộ trình sản phẩm' : 'View product roadmap',
      href: roadmap,
    },
    why: {
      eyebrow: vi ? 'Vì sao chúng tôi xây dựng trên KIT Platform?' : 'Why we build on KIT Platform',
      title: vi ? 'Một nền tảng – Vô vàn khả năng' : 'One platform — endless possibilities',
      items: [
        {
          icon: 'scalable' as IconName,
          title: vi ? 'Tái sử dụng & Mở rộng' : 'Reuse & scale',
          desc: vi
            ? 'Chia sẻ Identity, AI, Workflow giữa các sản phẩm.'
            : 'Share Identity, AI, and Workflow across products.',
        },
        {
          icon: 'security' as IconName,
          title: vi ? 'Bảo mật & An toàn' : 'Security & safety',
          desc: vi
            ? 'Bảo mật nhiều lớp, audit và phân quyền chặt chẽ.'
            : 'Multi-layer security, audit, and strong access control.',
        },
        {
          icon: 'api' as IconName,
          title: vi ? 'Kết nối & Tích hợp' : 'Connect & integrate',
          desc: vi
            ? 'API First — dễ kết nối hệ thống và đối tác.'
            : 'API-first — easy integration with systems and partners.',
        },
        {
          icon: 'ai' as IconName,
          title: vi ? 'Dữ liệu & AI' : 'Data & AI',
          desc: vi
            ? 'Dữ liệu thống nhất và AI sẵn có trên nền tảng.'
            : 'Unified data with AI built into the platform.',
        },
      ],
    },
    services: {
      eyebrow: 'KIT Platform',
      title: vi ? 'Nền tảng vững chắc cho mọi sản phẩm' : 'A solid foundation for every product',
      items: [
        {
          icon: 'identity' as IconName,
          title: 'Identity',
          desc: vi ? 'SSO, RBAC, đa tenant' : 'SSO, RBAC, multi-tenant',
        },
        {
          icon: 'workflow' as IconName,
          title: 'Workflow',
          desc: vi ? 'Điều phối quy trình' : 'Process orchestration',
        },
        {
          icon: 'api' as IconName,
          title: 'API Gateway',
          desc: vi ? 'REST, Webhook, OAuth' : 'REST, Webhook, OAuth',
        },
        {
          icon: 'database' as IconName,
          title: 'Data & Storage',
          desc: vi ? 'Lưu trữ an toàn' : 'Secure storage',
        },
        {
          icon: 'bell' as IconName,
          title: 'Notification',
          desc: vi ? 'App, email, SMS' : 'App, email, SMS',
        },
        {
          icon: 'analytics' as IconName,
          title: 'Analytics',
          desc: vi ? 'Báo cáo & insight' : 'Reports & insights',
        },
        {
          icon: 'ai' as IconName,
          title: 'AI Services',
          desc: vi ? 'Trợ lý & tự động hóa' : 'Assistants & automation',
        },
      ],
    },
    cta: {
      title: vi
        ? 'Bạn muốn xây dựng giải pháp tiếp theo trên KIT Platform?'
        : 'Want to build your next solution on KIT Platform?',
      lead: vi
        ? 'Đội ngũ KIT Technology sẵn sàng đồng hành từ ý tưởng đến triển khai.'
        : 'The KIT Technology team is ready to partner from idea to launch.',
      primaryCta: vi ? 'Liên hệ ngay' : 'Contact us',
      primaryHref: contact,
      secondaryCta: vi ? 'Tìm hiểu Platform' : 'Explore Platform',
      secondaryHref: platform,
    },
  };
}

export type ProductsContent = ReturnType<typeof productsContent>;
