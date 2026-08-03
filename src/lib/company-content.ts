import type { Locale } from '../i18n';
import type { IconName } from './icons';
import { pageUrl } from './site-map';

export function companyContent(locale: Locale) {
  const vi = locale === 'vi';
  const contact = vi ? '/vi/lien-he/' : '/en/contact/';
  const about = pageUrl(locale, vi ? 'gioi-thieu/ve-chung-toi' : 'company/about');
  const platform = pageUrl(locale, vi ? 'nen-tang' : 'platform');

  return {
    hero: {
      title: vi
        ? 'Chúng tôi xây dựng công nghệ vì những giá trị bền vững.'
        : 'We build technology for lasting value.',
      lead: vi
        ? 'KIT Technology tập trung phát triển nền tảng AI và các giải pháp chuyển đổi số, giúp doanh nghiệp và gia đình vận hành hiệu quả hơn mỗi ngày.'
        : 'KIT Technology builds AI platforms and digital solutions that help businesses and families operate more effectively every day.',
      cta: vi ? 'Tìm hiểu về KIT' : 'About KIT',
      ctaHref: about,
    },
    beliefs: {
      eyebrow: vi ? 'Điều chúng tôi tin tưởng' : 'What we believe',
      items: [
        {
          icon: 'users' as IconName,
          title: vi ? 'Công nghệ vì con người' : 'Technology for people',
          desc: vi
            ? 'Mọi sản phẩm đều hướng tới trải nghiệm thực tế và giá trị lâu dài.'
            : 'Every product aims for real experience and lasting value.',
        },
        {
          icon: 'healthcare' as IconName,
          title: vi ? 'Khách hàng là trung tâm' : 'Customer-centered',
          desc: vi
            ? 'Lắng nghe nhu cầu thật để thiết kế giải pháp phù hợp.'
            : 'We listen to real needs to design the right solutions.',
        },
        {
          icon: 'layers' as IconName,
          title: vi ? 'Đơn giản nhưng hiệu quả' : 'Simple yet effective',
          desc: vi
            ? 'Ưu tiên sự rõ ràng, dễ dùng và mang lại kết quả đo được.'
            : 'Clarity, ease of use, and measurable results come first.',
        },
        {
          icon: 'security' as IconName,
          title: vi ? 'Chính trực trong mọi việc' : 'Integrity in everything',
          desc: vi
            ? 'Minh bạch trong sản phẩm, cam kết và cách làm việc.'
            : 'Transparency in products, commitments, and how we work.',
        },
        {
          icon: 'education' as IconName,
          title: vi ? 'Học hỏi không ngừng' : 'Continuous learning',
          desc: vi
            ? 'Cải tiến liên tục từ thực tế vận hành và phản hồi người dùng.'
            : 'We improve continuously from operations and user feedback.',
        },
        {
          icon: 'enterprise' as IconName,
          title: vi ? 'Xây dựng dài hạn' : 'Build for the long term',
          desc: vi
            ? 'Ưu tiên nền tảng vững và mối quan hệ bền với khách hàng.'
            : 'We prioritize solid platforms and lasting customer relationships.',
        },
      ],
    },
    missionVision: {
      mission: {
        eyebrow: vi ? 'Sứ mệnh' : 'Mission',
        title: vi
          ? 'Ứng dụng AI để tạo ra các giải pháp số thiết thực cho doanh nghiệp và cuộc sống.'
          : 'Apply AI to create practical digital solutions for business and everyday life.',
      },
      vision: {
        eyebrow: vi ? 'Tầm nhìn' : 'Vision',
        title: vi
          ? 'Trở thành doanh nghiệp công nghệ đáng tin cậy tại Việt Nam trong lĩnh vực AI Platform & Digital Solutions.'
          : 'Become a trusted tech company in Vietnam for AI platforms and digital solutions.',
      },
    },
    values: {
      eyebrow: vi ? 'Giá trị cốt lõi' : 'Core values',
      items: [
        {
          no: '01',
          title: 'Integrity',
          desc: vi ? 'Làm đúng những gì đã cam kết.' : 'Do what we promise.',
        },
        {
          no: '02',
          title: 'Innovation',
          desc: vi ? 'Luôn tìm cách tốt hơn mỗi ngày.' : 'Always look for a better way.',
        },
        {
          no: '03',
          title: 'Responsibility',
          desc: vi ? 'Chịu trách nhiệm với sản phẩm và khách hàng.' : 'Own the product and the customer outcome.',
        },
        {
          no: '04',
          title: 'Simplicity',
          desc: vi ? 'Giảm phức tạp để tăng hiệu quả.' : 'Reduce complexity to raise impact.',
        },
        {
          no: '05',
          title: 'Long-term',
          desc: vi ? 'Ưu tiên giá trị bền vững thay vì ngắn hạn.' : 'Prefer lasting value over short wins.',
        },
        {
          no: '06',
          title: 'AI First',
          desc: vi ? 'Đưa AI vào đúng chỗ tạo ra giá trị.' : 'Put AI where it creates real value.',
        },
      ],
    },
    journey: {
      eyebrow: vi ? 'Hành trình của KIT' : 'KIT journey',
      items: [
        {
          year: '2015',
          icon: 'analytics' as IconName,
          title: vi ? 'Thành lập KIT Technology' : 'KIT Technology founded',
        },
        {
          year: '2024',
          icon: 'platform' as IconName,
          title: vi ? 'Xây dựng KIT Platform' : 'Building KIT Platform',
        },
        {
          year: '2025',
          icon: 'pharmacy' as IconName,
          title: vi ? 'Ra mắt Novixa' : 'Novixa launched',
        },
        {
          year: '2026',
          icon: 'family' as IconName,
          title: vi ? 'Ra mắt Famixa' : 'Famixa launched',
        },
      ],
    },
    products: {
      eyebrow: vi ? 'Những sản phẩm chúng tôi đang xây dựng' : 'Products we are building',
      items: [
        {
          tone: 'novixa' as const,
          icon: 'pharmacy' as IconName,
          name: 'Novixa',
          kind: 'Healthcare Platform',
          desc: vi
            ? 'Nền tảng quản trị nhà thuốc thông minh giúp tối ưu vận hành, kiểm soát và tăng trưởng.'
            : 'Smart pharmacy platform to optimize operations, control, and growth.',
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
            ? 'Nền tảng đồng hành cùng gia đình hiện đại — kết nối, chia sẻ và phát triển mỗi ngày.'
            : 'A companion for modern families — connect, share, and grow every day.',
          cta: vi ? 'Khám phá Famixa' : 'Explore Famixa',
          href: 'https://famixa.vn',
          external: true,
          art: '/images/flagship/famixa-art.png',
        },
      ],
    },
    promise: {
      eyebrow: vi ? 'Lời hứa của KIT' : 'Our promise',
      quote: vi
        ? 'Chúng tôi không theo đuổi việc trở thành công ty lớn nhất — mà là công ty đáng tin cậy nhất với khách hàng.'
        : 'We are not chasing to be the biggest company — but the most trusted one for our customers.',
    },
    cta: {
      title: vi
        ? 'Công nghệ chỉ thực sự có ý nghĩa khi tạo ra giá trị cho con người.'
        : 'Technology only matters when it creates value for people.',
      primary: vi ? 'Liên hệ với chúng tôi' : 'Contact us',
      primaryHref: contact,
      secondary: vi ? 'Khám phá nền tảng' : 'Explore the platform',
      secondaryHref: platform,
    },
  };
}
