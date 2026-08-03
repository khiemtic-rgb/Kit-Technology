import type { Locale } from '../i18n';
import type { IconName } from './icons';
import { pageUrl } from './site-map';

export function technologyContent(locale: Locale) {
  const vi = locale === 'vi';
  const contact = vi ? '/vi/lien-he/' : '/en/contact/';
  const platform = pageUrl(locale, vi ? 'nen-tang' : 'platform');

  return {
    hero: {
      title: vi ? 'Công nghệ hiện đại' : 'Modern technology',
      accent1: vi ? 'Nền tảng vững chắc' : 'A solid foundation',
      accent2: vi ? 'cho mọi giải pháp' : 'for every solution',
      lead: vi
        ? 'Chúng tôi chọn công nghệ hiện đại, ổn định và dễ mở rộng để xây dựng KIT Platform cùng các sản phẩm như Novixa và Famixa.'
        : 'We choose modern, stable, scalable technology to build KIT Platform and products like Novixa and Famixa.',
      highlights: [
        {
          icon: 'security' as IconName,
          title: vi ? 'Bảo mật' : 'Security',
          desc: vi ? 'Thiết kế security-first' : 'Security-first by design',
        },
        {
          icon: 'cloud' as IconName,
          title: 'Cloud Native',
          desc: vi ? 'Triển khai linh hoạt' : 'Flexible cloud deployment',
        },
        {
          icon: 'scalable' as IconName,
          title: vi ? 'Hiệu năng cao' : 'High performance',
          desc: vi ? 'Tối ưu theo tải thực tế' : 'Optimized for real workloads',
        },
        {
          icon: 'api' as IconName,
          title: 'API First',
          desc: vi ? 'Tích hợp mở & rõ ràng' : 'Open, clear integration',
        },
      ],
    },
    stack: {
      eyebrow: vi ? 'Công nghệ cốt lõi' : 'Core technology',
      title: vi ? 'Stack công nghệ hiện đại' : 'Modern technology stack',
      items: [
        {
          icon: 'code' as IconName,
          title: '.NET',
          desc: vi ? 'Backend enterprise ổn định, hiệu năng cao.' : 'Stable, high-performance enterprise backend.',
        },
        {
          icon: 'mobile' as IconName,
          title: 'Flutter',
          desc: vi ? 'Ứng dụng đa nền tảng, UI mượt.' : 'Cross-platform apps with smooth UI.',
        },
        {
          icon: 'api' as IconName,
          title: 'NestJS',
          desc: vi ? 'API modular, dễ mở rộng dịch vụ.' : 'Modular APIs, easy to scale services.',
        },
        {
          icon: 'database' as IconName,
          title: 'PostgreSQL',
          desc: vi ? 'CSDL quan hệ tin cậy cho SaaS.' : 'Reliable relational database for SaaS.',
        },
        {
          icon: 'cache' as IconName,
          title: 'Redis',
          desc: vi ? 'Cache & hàng đợi tốc độ cao.' : 'High-speed cache and queues.',
        },
        {
          icon: 'container' as IconName,
          title: 'Docker',
          desc: vi ? 'Đóng gói đồng nhất môi trường.' : 'Consistent environment packaging.',
        },
        {
          icon: 'orchestration' as IconName,
          title: 'Kubernetes',
          desc: vi ? 'Điều phối container, scale linh hoạt.' : 'Container orchestration and flexible scale.',
        },
        {
          icon: 'cloud' as IconName,
          title: 'Cloud',
          desc: vi ? 'Hạ tầng cloud sẵn sàng mở rộng.' : 'Cloud infrastructure ready to grow.',
        },
      ],
    },
    architecture: {
      id: 'architecture',
      eyebrow: vi ? 'Kiến trúc hệ thống' : 'System architecture',
      title: vi ? 'Kiến trúc hiện đại – Sẵn sàng mở rộng' : 'Modern architecture — ready to scale',
      principles: [
        {
          icon: 'layers' as IconName,
          title: 'Microservices Architecture',
          desc: vi ? 'Tách dịch vụ theo miền nghiệp vụ.' : 'Services split by business domain.',
        },
        {
          icon: 'api' as IconName,
          title: 'API First',
          desc: vi ? 'Mọi năng lực mở qua API rõ ràng.' : 'Every capability exposed via clear APIs.',
        },
        {
          icon: 'workflow' as IconName,
          title: 'Event-Driven',
          desc: vi ? 'Phản ứng theo sự kiện, giảm phụ thuộc.' : 'Event-driven flows with lower coupling.',
        },
        {
          icon: 'cloud' as IconName,
          title: 'Cloud Native',
          desc: vi ? 'Sinh ra để chạy trên cloud.' : 'Built to run natively in the cloud.',
        },
      ],
      layers: [
        {
          name: 'Presentation Layer',
          items: ['Web', 'Mobile', 'Admin', 'POS'],
        },
        {
          name: 'API Gateway',
          items: ['Auth', 'Routing', 'Rate limit'],
        },
        {
          name: 'Microservices Layer',
          items: ['Identity', 'User', 'Product', 'Notification'],
        },
        {
          name: 'Data Layer',
          items: ['PostgreSQL', 'Redis', 'Object Storage'],
        },
        {
          name: 'Infrastructure Layer',
          items: ['Docker', 'Kubernetes', 'Cloud'],
        },
      ],
      crossCutting: {
        title: 'Cross Cutting',
        items: [
          {
            title: 'Security',
            points: vi ? ['SSO / RBAC', 'Mã hóa', 'Audit'] : ['SSO / RBAC', 'Encryption', 'Audit'],
          },
          {
            title: 'Monitoring',
            points: vi ? ['Log', 'Metric', 'Alert'] : ['Logs', 'Metrics', 'Alerts'],
          },
          {
            title: 'CI / CD',
            points: vi ? ['Build tự động', 'Deploy an toàn'] : ['Automated builds', 'Safe deploys'],
          },
          {
            title: 'Backup & DR',
            points: vi ? ['Sao lưu định kỳ', 'Phục hồi nhanh'] : ['Scheduled backups', 'Fast recovery'],
          },
        ],
      },
    },
    capabilities: {
      eyebrow: vi ? 'Năng lực nổi bật' : 'Key capabilities',
      title: vi ? 'Công nghệ tạo nên khác biệt' : 'Technology that sets us apart',
      items: [
        {
          icon: 'security' as IconName,
          title: vi ? 'Bảo mật toàn diện' : 'Comprehensive security',
          desc: vi
            ? 'Bảo vệ dữ liệu, phân quyền và kiểm soát truy cập xuyên suốt.'
            : 'Data protection, roles, and access control end to end.',
        },
        {
          icon: 'scalable' as IconName,
          title: vi ? 'Hiệu năng vượt trội' : 'Outstanding performance',
          desc: vi
            ? 'Tối ưu cho tải giao dịch thực tế và trải nghiệm mượt.'
            : 'Tuned for real transaction load and smooth UX.',
        },
        {
          icon: 'enterprise' as IconName,
          title: vi ? 'Khả năng mở rộng' : 'Scalability',
          desc: vi
            ? 'Scale theo sản phẩm, tenant và lưu lượng.'
            : 'Scale by product, tenant, and traffic.',
        },
        {
          icon: 'api' as IconName,
          title: vi ? 'Tích hợp linh hoạt' : 'Flexible integration',
          desc: vi
            ? 'Kết nối đối tác và hệ thống hiện hữu qua API.'
            : 'Connect partners and existing systems via APIs.',
        },
        {
          icon: 'monitoring' as IconName,
          title: vi ? 'Vận hành thông minh' : 'Smart operations',
          desc: vi
            ? 'Quan sát hệ thống, cảnh báo sớm, vận hành ổn định.'
            : 'Observability, early alerts, and stable operations.',
        },
      ],
    },
    cta: {
      title: vi
        ? 'Công nghệ là nền tảng. Giá trị cho người dùng là mục tiêu.'
        : 'Technology is the foundation. User value is the goal.',
      lead: vi
        ? 'Cùng KIT Technology chọn stack và kiến trúc phù hợp để xây sản phẩm bền vững.'
        : 'Work with KIT Technology to choose the right stack and architecture for lasting products.',
      primaryCta: vi ? 'Liên hệ ngay' : 'Contact us',
      primaryHref: contact,
      secondaryCta: vi ? 'Khám phá Platform' : 'Explore Platform',
      secondaryHref: platform,
    },
  };
}

export type TechnologyContent = ReturnType<typeof technologyContent>;
