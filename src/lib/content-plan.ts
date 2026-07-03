import type { InsightCategory, InsightSection } from '../content.config';

export type PlannedArticle = {
  id: string;
  slug: string;
  section: InsightSection;
  category: InsightCategory;
  titleVi: string;
  titleEn: string;
  publishDate: string;
  targetWords: number;
  /** Existing site-map page key when content lives on a static page instead of Insights MD */
  pageKey?: string;
  /** Company pages already published on site */
  alreadyLive?: boolean;
};

export const KNOWLEDGE_HUB = {
  name: 'Knowledge Hub',
  goalVi:
    'Trong 90 ngày, xây dựng trung tâm tri thức về chuyển đổi số nhà thuốc và AI trong ngành dược tại Việt Nam.',
  startDate: '2026-07-04',
  endDate: '2026-10-01',
  totalArticles: 150,
  publishPerDay: 1.7,
} as const;

const COMPANY_LIVE: Omit<PlannedArticle, 'publishDate'>[] = [
  { id: 'co-about', slug: 've-chung-toi', section: 'company', category: 'company-news', titleVi: 'Giới thiệu KIT Technology', titleEn: 'About KIT Technology', targetWords: 1800, pageKey: 'about', alreadyLive: true },
  { id: 'co-story', slug: 'cau-chuyen-kit', section: 'company', category: 'company-news', titleVi: 'Câu chuyện KIT', titleEn: 'KIT Story', targetWords: 2000, pageKey: 'story', alreadyLive: true },
  { id: 'co-vision', slug: 'tam-nhin', section: 'company', category: 'company-news', titleVi: 'Tầm nhìn', titleEn: 'Vision', targetWords: 1500, pageKey: 'vision', alreadyLive: true },
  { id: 'co-mission', slug: 'su-menh', section: 'company', category: 'company-news', titleVi: 'Sứ mệnh', titleEn: 'Mission', targetWords: 1500, pageKey: 'mission', alreadyLive: true },
  { id: 'co-values', slug: 'gia-tri-cot-loi', section: 'company', category: 'company-news', titleVi: 'Giá trị cốt lõi', titleEn: 'Core Values', targetWords: 1800, pageKey: 'values', alreadyLive: true },
  { id: 'co-tech', slug: 'cong-nghe', section: 'company', category: 'company-news', titleVi: 'Công nghệ', titleEn: 'Technology', targetWords: 2000, pageKey: 'company-tech', alreadyLive: true },
  { id: 'co-why', slug: 'vi-sao-chon-kit', section: 'company', category: 'company-news', titleVi: 'Vì sao chọn KIT', titleEn: 'Why KIT', targetWords: 1800, pageKey: 'why-kit', alreadyLive: true },
  { id: 'co-eng', slug: 'ky-thuat', section: 'company', category: 'engineering', titleVi: 'Engineering', titleEn: 'Engineering', targetWords: 1200, pageKey: 'engineering', alreadyLive: true },
];

const TECHNOLOGY: Omit<PlannedArticle, 'publishDate'>[] = [
  { id: 'tech-ai-first', slug: 'ai-first-la-gi', section: 'technology', category: 'technology', titleVi: 'AI First là gì?', titleEn: 'What Is AI First?', targetWords: 1400 },
  { id: 'tech-cloud-native', slug: 'kien-truc-cloud-native', section: 'technology', category: 'technology', titleVi: 'Kiến trúc Cloud Native', titleEn: 'Cloud Native Architecture', targetWords: 1600 },
  { id: 'tech-flutter', slug: 'tai-sao-chon-flutter', section: 'technology', category: 'technology', titleVi: 'Tại sao chọn Flutter', titleEn: 'Why We Choose Flutter', targetWords: 1400 },
  { id: 'tech-postgresql', slug: 'vi-sao-dung-postgresql', section: 'technology', category: 'technology', titleVi: 'Vì sao dùng PostgreSQL', titleEn: 'Why PostgreSQL', targetWords: 1400 },
  { id: 'tech-ai-agent', slug: 'ai-agent-hoat-dong-nhu-the-nao', section: 'technology', category: 'technology', titleVi: 'AI Agent hoạt động như thế nào', titleEn: 'How AI Agents Work', targetWords: 1500 },
  { id: 'tech-api-first', slug: 'api-first', section: 'technology', category: 'technology', titleVi: 'API First', titleEn: 'API First', targetWords: 1300 },
  { id: 'tech-security', slug: 'security-by-design', section: 'technology', category: 'technology', titleVi: 'Security by Design', titleEn: 'Security by Design', targetWords: 1500 },
  { id: 'tech-devops', slug: 'devops-trong-saas', section: 'technology', category: 'technology', titleVi: 'DevOps trong SaaS', titleEn: 'DevOps in SaaS', targetWords: 1500 },
  { id: 'tech-ai-dev', slug: 'ai-ho-tro-phat-trien-phan-mem', section: 'technology', category: 'technology', titleVi: 'AI hỗ trợ phát triển phần mềm', titleEn: 'AI-Assisted Software Development', targetWords: 1400 },
  { id: 'tech-process', slug: 'quy-trinh-phat-trien-tai-kit', section: 'technology', category: 'technology', titleVi: 'Quy trình phát triển tại KIT', titleEn: 'Development Process at KIT', targetWords: 1600 },
  { id: 'tech-node', slug: 'nodejs-trong-he-thong-kit', section: 'technology', category: 'technology', titleVi: 'Node.js trong hệ thống KIT', titleEn: 'Node.js at KIT', targetWords: 1300 },
  { id: 'tech-docker', slug: 'container-hoa-voi-docker', section: 'technology', category: 'technology', titleVi: 'Container hóa với Docker', titleEn: 'Containerization with Docker', targetWords: 1300 },
  { id: 'tech-observability', slug: 'quan-sat-he-thong-saas', section: 'technology', category: 'technology', titleVi: 'Quan sát hệ thống SaaS', titleEn: 'SaaS Observability', targetWords: 1400 },
  { id: 'tech-data', slug: 'tang-du-lieu-va-bao-cao', section: 'technology', category: 'technology', titleVi: 'Tầng dữ liệu và báo cáo', titleEn: 'Data Layer and Reporting', targetWords: 1400 },
  { id: 'tech-mobile', slug: 'mobile-first-cho-doanh-nghiep', section: 'technology', category: 'technology', titleVi: 'Mobile-first cho doanh nghiệp', titleEn: 'Mobile-First for Business', targetWords: 1300 },
];

const SOLUTIONS: Omit<PlannedArticle, 'publishDate'>[] = [
  { id: 'sol-dx-y', slug: 'thuc-trang-chuyen-doi-so-nganh-y', section: 'solutions', category: 'healthcare', titleVi: 'Thực trạng chuyển đổi số ngành y', titleEn: 'Digital Transformation in Healthcare', targetWords: 1600 },
  { id: 'sol-pharmacy-pain', slug: 'kho-khan-cua-nha-thuoc', section: 'solutions', category: 'healthcare', titleVi: 'Khó khăn của nhà thuốc', titleEn: 'Pharmacy Pain Points', targetWords: 1500 },
  { id: 'sol-chain', slug: 'quan-ly-chuoi-nha-thuoc', section: 'solutions', category: 'healthcare', titleVi: 'Quản lý chuỗi nhà thuốc', titleEn: 'Pharmacy Chain Management', targetWords: 1600 },
  { id: 'sol-ai-pharma', slug: 'ai-trong-nganh-duoc', section: 'solutions', category: 'healthcare', titleVi: 'AI trong ngành dược', titleEn: 'AI in the Pharmaceutical Industry', targetWords: 1500 },
  { id: 'sol-gpp', slug: 'gpp-va-so-hoa', section: 'solutions', category: 'healthcare', titleVi: 'GPP và số hóa', titleEn: 'GPP Compliance and Digitization', targetWords: 1500 },
  { id: 'sol-report', slug: 'bao-cao-doanh-nghiep-nha-thuoc', section: 'solutions', category: 'healthcare', titleVi: 'Báo cáo doanh nghiệp nhà thuốc', titleEn: 'Pharmacy Business Reporting', targetWords: 1400 },
  { id: 'sol-crm', slug: 'crm-nganh-duoc', section: 'solutions', category: 'healthcare', titleVi: 'CRM ngành dược', titleEn: 'Pharmaceutical CRM', targetWords: 1400 },
  { id: 'sol-loyalty', slug: 'loyalty-nha-thuoc', section: 'solutions', category: 'healthcare', titleVi: 'Loyalty cho nhà thuốc', titleEn: 'Pharmacy Loyalty Programs', targetWords: 1300 },
  { id: 'sol-omni', slug: 'omnichannel-nha-thuoc', section: 'solutions', category: 'healthcare', titleVi: 'Omnichannel cho nhà thuốc', titleEn: 'Pharmacy Omnichannel', targetWords: 1400 },
  { id: 'sol-dashboard', slug: 'dashboard-quan-tri-nha-thuoc', section: 'solutions', category: 'healthcare', titleVi: 'Dashboard quản trị nhà thuốc', titleEn: 'Pharmacy Management Dashboard', targetWords: 1400 },
  { id: 'sol-retail-pos', slug: 'ban-le-va-pos', section: 'solutions', category: 'digital-transformation', titleVi: 'Bán lẻ và POS hiện đại', titleEn: 'Modern Retail and POS', targetWords: 1300 },
  { id: 'sol-inventory', slug: 'quan-ly-ton-kho-ban-le', section: 'solutions', category: 'digital-transformation', titleVi: 'Quản lý tồn kho bán lẻ', titleEn: 'Retail Inventory Management', targetWords: 1300 },
  { id: 'sol-ai-transform', slug: 'chuyen-doi-ai-doanh-nghiep', section: 'solutions', category: 'ai', titleVi: 'Chuyển đổi AI cho doanh nghiệp', titleEn: 'Enterprise AI Transformation', targetWords: 1500 },
  { id: 'sol-automation', slug: 'tu-dong-hoa-quy-trinh', section: 'solutions', category: 'ai', titleVi: 'Tự động hóa quy trình', titleEn: 'Process Automation', targetWords: 1400 },
  { id: 'sol-enterprise', slug: 'nentang-doanh-nghiep', section: 'solutions', category: 'business', titleVi: 'Nền tảng doanh nghiệp', titleEn: 'Enterprise Platform Strategy', targetWords: 1400 },
  { id: 'sol-integration', slug: 'tich-hop-he-thong', section: 'solutions', category: 'business', titleVi: 'Tích hợp hệ thống', titleEn: 'System Integration', targetWords: 1300 },
  { id: 'sol-compliance', slug: 'tuan-thu-va-kiem-soat', section: 'solutions', category: 'healthcare', titleVi: 'Tuân thủ và kiểm soát nhà thuốc', titleEn: 'Pharmacy Compliance and Control', targetWords: 1400 },
  { id: 'sol-multi-branch', slug: 'van-hanh-da-chi-nhanh', section: 'solutions', category: 'healthcare', titleVi: 'Vận hành đa chi nhánh', titleEn: 'Multi-Branch Operations', targetWords: 1300 },
  { id: 'sol-pricing', slug: 'dinh-gia-va-khuyen-mai', section: 'solutions', category: 'healthcare', titleVi: 'Định giá và khuyến mại nhà thuốc', titleEn: 'Pharmacy Pricing and Promotions', targetWords: 1300 },
  { id: 'sol-training', slug: 'dao-tao-nhan-su-nha-thuoc', section: 'solutions', category: 'healthcare', titleVi: 'Đào tạo nhân sự nhà thuốc', titleEn: 'Pharmacy Staff Training', targetWords: 1200 },
];

const NOVIXA: Omit<PlannedArticle, 'publishDate'>[] = [
  { id: 'nv-overview', slug: 'novixa-la-gi', section: 'products', category: 'products', titleVi: 'Novixa là gì?', titleEn: 'What Is Novixa?', targetWords: 1500 },
  { id: 'nv-sales', slug: 'quan-ly-ban-hang', section: 'products', category: 'products', titleVi: 'Quản lý bán hàng Novixa', titleEn: 'Novixa Sales Management', targetWords: 1400 },
  { id: 'nv-inventory', slug: 'quan-ly-kho', section: 'products', category: 'products', titleVi: 'Quản lý kho', titleEn: 'Inventory Management', targetWords: 1400 },
  { id: 'nv-batch', slug: 'quan-ly-lo', section: 'products', category: 'products', titleVi: 'Quản lý lô thuốc', titleEn: 'Batch Management', targetWords: 1300 },
  { id: 'nv-expiry', slug: 'quan-ly-han-dung', section: 'products', category: 'products', titleVi: 'Quản lý hạn dùng', titleEn: 'Expiry Date Management', targetWords: 1300 },
  { id: 'nv-pos', slug: 'pos-nha-thuoc', section: 'products', category: 'products', titleVi: 'POS nhà thuốc', titleEn: 'Pharmacy POS', targetWords: 1500 },
  { id: 'nv-app', slug: 'app-khach-hang', section: 'products', category: 'products', titleVi: 'App khách hàng', titleEn: 'Customer App', targetWords: 1300 },
  { id: 'nv-crm', slug: 'crm-novixa', section: 'products', category: 'products', titleVi: 'CRM Novixa', titleEn: 'Novixa CRM', targetWords: 1300 },
  { id: 'nv-reports', slug: 'bao-cao-novixa', section: 'products', category: 'products', titleVi: 'Báo cáo Novixa', titleEn: 'Novixa Reporting', targetWords: 1400 },
  { id: 'nv-api', slug: 'api-novixa', section: 'products', category: 'products', titleVi: 'API Novixa', titleEn: 'Novixa API', targetWords: 1300 },
  { id: 'nv-ai', slug: 'ai-assistant-novixa', section: 'products', category: 'products', titleVi: 'AI Assistant Novixa', titleEn: 'Novixa AI Assistant', targetWords: 1400 },
  { id: 'nv-chain', slug: 'chuoi-nha-thuoc', section: 'products', category: 'products', titleVi: 'Quản lý chuỗi nhà thuốc', titleEn: 'Pharmacy Chain Module', targetWords: 1500 },
  { id: 'nv-cloud', slug: 'novixa-cloud', section: 'products', category: 'products', titleVi: 'Novixa Cloud', titleEn: 'Novixa Cloud', targetWords: 1300 },
  { id: 'nv-security', slug: 'bao-mat-novixa', section: 'products', category: 'products', titleVi: 'Bảo mật Novixa', titleEn: 'Novixa Security', targetWords: 1400 },
  { id: 'nv-vs-excel', slug: 'so-sanh-voi-excel', section: 'products', category: 'products', titleVi: 'So sánh Novixa với Excel', titleEn: 'Novixa vs Excel', targetWords: 1200 },
  { id: 'nv-vs-legacy', slug: 'so-sanh-phan-mem-truyen-thong', section: 'products', category: 'products', titleVi: 'So sánh với phần mềm truyền thống', titleEn: 'Novixa vs Legacy Software', targetWords: 1300 },
  { id: 'nv-onboarding', slug: 'trien-khai-novixa', section: 'products', category: 'products', titleVi: 'Triển khai Novixa', titleEn: 'Novixa Onboarding', targetWords: 1200 },
  { id: 'nv-pricing', slug: 'goi-dich-vu-novixa', section: 'products', category: 'products', titleVi: 'Gói dịch vụ Novixa', titleEn: 'Novixa Pricing Plans', targetWords: 1200 },
  { id: 'nv-support', slug: 'ho-tro-novixa', section: 'products', category: 'products', titleVi: 'Hỗ trợ Novixa', titleEn: 'Novixa Support', targetWords: 1100 },
  { id: 'nv-mobile', slug: 'novixa-tren-mobile', section: 'products', category: 'products', titleVi: 'Novixa trên mobile', titleEn: 'Novixa on Mobile', targetWords: 1200 },
  { id: 'nv-sync', slug: 'dong-bo-du-lieu', section: 'products', category: 'products', titleVi: 'Đồng bộ dữ liệu Novixa', titleEn: 'Novixa Data Sync', targetWords: 1200 },
  { id: 'nv-roles', slug: 'phan-quyen-nguoi-dung', section: 'products', category: 'products', titleVi: 'Phân quyền người dùng', titleEn: 'User Roles and Permissions', targetWords: 1200 },
  { id: 'nv-audit', slug: 'kiem-soat-thao-tac', section: 'products', category: 'products', titleVi: 'Kiểm soát thao tác', titleEn: 'Audit Trail', targetWords: 1200 },
  { id: 'nv-import', slug: 'nhap-du-lieu-ban-dau', section: 'products', category: 'products', titleVi: 'Nhập dữ liệu ban đầu', titleEn: 'Initial Data Import', targetWords: 1100 },
  { id: 'nv-barcode', slug: 'quet-ma-vach', section: 'products', category: 'products', titleVi: 'Quét mã vạch trong Novixa', titleEn: 'Barcode Scanning in Novixa', targetWords: 1100 },
  { id: 'nv-promo', slug: 'khuyen-mai-novixa', section: 'products', category: 'products', titleVi: 'Khuyến mại trong Novixa', titleEn: 'Promotions in Novixa', targetWords: 1100 },
  { id: 'nv-supplier', slug: 'quan-ly-nha-cung-cap', section: 'products', category: 'products', titleVi: 'Quản lý nhà cung cấp', titleEn: 'Supplier Management', targetWords: 1200 },
  { id: 'nv-purchase', slug: 'dat-hang-nhap-kho', section: 'products', category: 'products', titleVi: 'Đặt hàng và nhập kho', titleEn: 'Purchase Orders and Receiving', targetWords: 1200 },
  { id: 'nv-einvoice', slug: 'hoa-don-dien-tu', section: 'products', category: 'products', titleVi: 'Hóa đơn điện tử', titleEn: 'E-Invoicing', targetWords: 1200 },
  { id: 'nv-zalo', slug: 'tich-hop-zalo-oa', section: 'products', category: 'products', titleVi: 'Tích hợp Zalo OA', titleEn: 'Zalo OA Integration', targetWords: 1100 },
  { id: 'nv-warehouse', slug: 'nhieu-kho', section: 'products', category: 'products', titleVi: 'Quản lý nhiều kho', titleEn: 'Multi-Warehouse', targetWords: 1200 },
  { id: 'nv-alert', slug: 'canh-bao-ton-kho', section: 'products', category: 'products', titleVi: 'Cảnh báo tồn kho', titleEn: 'Stock Alerts', targetWords: 1100 },
  { id: 'nv-kpi', slug: 'kpi-nha-thuoc', section: 'products', category: 'products', titleVi: 'KPI vận hành nhà thuốc', titleEn: 'Pharmacy KPIs', targetWords: 1200 },
  { id: 'nv-roadmap', slug: 'lo-trinh-san-pham', section: 'products', category: 'products', titleVi: 'Lộ trình sản phẩm Novixa', titleEn: 'Novixa Product Roadmap', targetWords: 1200 },
  { id: 'nv-case', slug: 'case-study-novixa', section: 'products', category: 'products', titleVi: 'Case study Novixa', titleEn: 'Novixa Case Study', targetWords: 1400 },
];

const INSIGHTS_AI: Omit<PlannedArticle, 'publishDate'>[] = [
  { id: 'ins-llm', slug: 'llm-trong-doanh-nghiep', section: 'insights', category: 'ai', titleVi: 'LLM trong doanh nghiệp', titleEn: 'LLMs in Business', targetWords: 1400 },
  { id: 'ins-rag', slug: 'rag-ung-dung-thuc-te', section: 'insights', category: 'ai', titleVi: 'RAG ứng dụng thực tế', titleEn: 'RAG in Production', targetWords: 1500 },
  { id: 'ins-prompt', slug: 'prompt-engineering-san-pham', section: 'insights', category: 'ai', titleVi: 'Prompt engineering cho sản phẩm', titleEn: 'Product Prompt Engineering', targetWords: 1300 },
  { id: 'ins-eval', slug: 'danh-gia-chatbot-ai', section: 'insights', category: 'ai', titleVi: 'Đánh giá chatbot AI', titleEn: 'Evaluating AI Chatbots', targetWords: 1300 },
  { id: 'ins-cost', slug: 'to-uu-chi-phi-ai', section: 'insights', category: 'ai', titleVi: 'Tối ưu chi phí AI', titleEn: 'Optimizing AI Costs', targetWords: 1200 },
  { id: 'ins-data', slug: 'du-lieu-cho-ai', section: 'insights', category: 'ai', titleVi: 'Dữ liệu cho AI', titleEn: 'Data for AI Systems', targetWords: 1400 },
  { id: 'ins-ethics', slug: 'dao-duc-ai-nganh-y', section: 'insights', category: 'ai', titleVi: 'Đạo đức AI trong ngành y', titleEn: 'AI Ethics in Healthcare', targetWords: 1300 },
  { id: 'ins-copilot', slug: 'copilot-cho-duoc-si', section: 'insights', category: 'ai', titleVi: 'Copilot cho dược sĩ', titleEn: 'Copilot for Pharmacists', targetWords: 1300 },
  { id: 'ins-voice', slug: 'ai-giong-noi', section: 'insights', category: 'ai', titleVi: 'AI giọng nói trong bán lẻ', titleEn: 'Voice AI in Retail', targetWords: 1200 },
  { id: 'ins-vision', slug: 'ai-thi-giac-kho', section: 'insights', category: 'ai', titleVi: 'AI thị giác trong kho', titleEn: 'Vision AI in Warehouses', targetWords: 1200 },
  { id: 'ins-fine-tune', slug: 'fine-tune-hay-rag', section: 'insights', category: 'ai', titleVi: 'Fine-tune hay RAG?', titleEn: 'Fine-Tuning vs RAG', targetWords: 1300 },
  { id: 'ins-agent-kit', slug: 'agent-kit-technology', section: 'insights', category: 'ai', titleVi: 'AI Agent tại KIT Technology', titleEn: 'AI Agents at KIT Technology', targetWords: 1400 },
];

const INSIGHTS_ENG: Omit<PlannedArticle, 'publishDate'>[] = [
  { id: 'eng-flutter-ui', slug: 'flutter-ui-patterns', section: 'insights', category: 'engineering', titleVi: 'Flutter UI patterns', titleEn: 'Flutter UI Patterns', targetWords: 1300 },
  { id: 'eng-api-design', slug: 'api-design-practices', section: 'insights', category: 'engineering', titleVi: 'Thực hành thiết kế API', titleEn: 'API Design Practices', targetWords: 1400 },
  { id: 'eng-pg-tuning', slug: 'postgresql-tuning', section: 'insights', category: 'engineering', titleVi: 'Tuning PostgreSQL', titleEn: 'PostgreSQL Tuning', targetWords: 1400 },
  { id: 'eng-ci', slug: 'ci-cd-tai-kit', section: 'insights', category: 'engineering', titleVi: 'CI/CD tại KIT', titleEn: 'CI/CD at KIT', targetWords: 1300 },
  { id: 'eng-testing', slug: 'testing-saas', section: 'insights', category: 'engineering', titleVi: 'Testing cho SaaS', titleEn: 'Testing SaaS Products', targetWords: 1300 },
  { id: 'eng-monorepo', slug: 'monorepo-hay-polyrepo', section: 'insights', category: 'engineering', titleVi: 'Monorepo hay polyrepo?', titleEn: 'Monorepo vs Polyrepo', targetWords: 1200 },
  { id: 'eng-cache', slug: 'caching-strategies', section: 'insights', category: 'engineering', titleVi: 'Chiến lược caching', titleEn: 'Caching Strategies', targetWords: 1200 },
  { id: 'eng-logging', slug: 'logging-structured', section: 'insights', category: 'engineering', titleVi: 'Structured logging', titleEn: 'Structured Logging', targetWords: 1200 },
  { id: 'eng-migration', slug: 'database-migrations', section: 'insights', category: 'engineering', titleVi: 'Database migrations', titleEn: 'Database Migrations', targetWords: 1200 },
  { id: 'eng-scale', slug: 'scaling-reads', section: 'insights', category: 'engineering', titleVi: 'Scale read-heavy workloads', titleEn: 'Scaling Read-Heavy Workloads', targetWords: 1300 },
];

const INSIGHTS_BLOG: Omit<PlannedArticle, 'publishDate'>[] = [
  { id: 'bl-dx-pharmacy', slug: 'chuyen-doi-so-nha-thuoc-2026', section: 'insights', category: 'digital-transformation', titleVi: 'Chuyển đổi số nhà thuốc 2026', titleEn: 'Pharmacy Digital Transformation 2026', targetWords: 1500 },
  { id: 'bl-saas-vn', slug: 'saas-viet-nam', section: 'insights', category: 'business', titleVi: 'SaaS tại Việt Nam', titleEn: 'SaaS in Vietnam', targetWords: 1400 },
  { id: 'bl-product', slug: 'tu-duy-san-pham', section: 'insights', category: 'business', titleVi: 'Tư duy sản phẩm', titleEn: 'Product Thinking', targetWords: 1300 },
  { id: 'bl-customer', slug: 'lang-nghe-khach-hang', section: 'insights', category: 'business', titleVi: 'Lắng nghe khách hàng B2B', titleEn: 'B2B Customer Discovery', targetWords: 1300 },
  { id: 'bl-growth', slug: 'growth-san-pham', section: 'insights', category: 'business', titleVi: 'Growth cho sản phẩm SaaS', titleEn: 'SaaS Product Growth', targetWords: 1300 },
  { id: 'bl-team', slug: 'xay-dung-doi-ngu-ky-thuat', section: 'insights', category: 'company-news', titleVi: 'Xây dựng đội ngũ kỹ thuật', titleEn: 'Building Engineering Teams', targetWords: 1300 },
  { id: 'bl-remote', slug: 'lam-viec-remote', section: 'insights', category: 'company-news', titleVi: 'Làm việc remote tại KIT', titleEn: 'Remote Work at KIT', targetWords: 1200 },
  { id: 'bl-partner', slug: 'doi-tac-he-sinh-thai', section: 'insights', category: 'business', titleVi: 'Đối tác hệ sinh thái', titleEn: 'Ecosystem Partnerships', targetWords: 1200 },
  { id: 'bl-health-data', slug: 'du-lieu-suc-khoe', section: 'insights', category: 'healthcare', titleVi: 'Dữ liệu sức khỏe và quyền riêng tư', titleEn: 'Health Data and Privacy', targetWords: 1400 },
  { id: 'bl-trends', slug: 'xu-huong-cong-nghe-duoc', section: 'insights', category: 'healthcare', titleVi: 'Xu hướng công nghệ dược 2026', titleEn: 'Pharma Tech Trends 2026', targetWords: 1400 },
  { id: 'bl-ux-pos', slug: 'ux-pos-nha-thuoc', section: 'insights', category: 'healthcare', titleVi: 'UX POS nhà thuốc', titleEn: 'Pharmacy POS UX', targetWords: 1200 },
  { id: 'bl-cloudflare', slug: 'deploy-cloudflare', section: 'insights', category: 'engineering', titleVi: 'Deploy với Cloudflare', titleEn: 'Deploying with Cloudflare', targetWords: 1200 },
  { id: 'bl-open-source', slug: 'open-source-tai-kit', section: 'insights', category: 'engineering', titleVi: 'Open source tại KIT', titleEn: 'Open Source at KIT', targetWords: 1100 },
  { id: 'bl-security-incident', slug: 'ung-pho-su-co', section: 'insights', category: 'engineering', titleVi: 'Ứng phó sự cố bảo mật', titleEn: 'Security Incident Response', targetWords: 1300 },
  { id: 'bl-metrics', slug: 'north-star-metrics', section: 'insights', category: 'business', titleVi: 'North Star Metrics', titleEn: 'North Star Metrics', targetWords: 1200 },
  { id: 'bl-churn', slug: 'giam-churn-saas', section: 'insights', category: 'business', titleVi: 'Giảm churn SaaS', titleEn: 'Reducing SaaS Churn', targetWords: 1200 },
  { id: 'bl-content', slug: 'content-marketing-b2b', section: 'insights', category: 'business', titleVi: 'Content marketing B2B', titleEn: 'B2B Content Marketing', targetWords: 1200 },
  { id: 'bl-demo', slug: 'demo-san-pham-hieu-qua', section: 'insights', category: 'business', titleVi: 'Demo sản phẩm hiệu quả', titleEn: 'Effective Product Demos', targetWords: 1100 },
  { id: 'bl-kit-news', slug: 'kit-technology-2026', section: 'insights', category: 'company-news', titleVi: 'KIT Technology 2026', titleEn: 'KIT Technology in 2026', targetWords: 1200 },
  { id: 'bl-knowledge', slug: 'knowledge-hub-la-gi', section: 'insights', category: 'company-news', titleVi: 'Knowledge Hub là gì?', titleEn: 'What Is a Knowledge Hub?', targetWords: 1300 },
];

const FAQ: Omit<PlannedArticle, 'publishDate'>[] = [
  { id: 'faq-novixa-what', slug: 'novixa-la-gi-faq', section: 'faq', category: 'faq', titleVi: 'Novixa là gì?', titleEn: 'What is Novixa?', targetWords: 400 },
  { id: 'faq-pricing', slug: 'gia-novixa', section: 'faq', category: 'faq', titleVi: 'Giá Novixa bao nhiêu?', titleEn: 'How much does Novixa cost?', targetWords: 400 },
  { id: 'faq-trial', slug: 'dung-thu-novixa', section: 'faq', category: 'faq', titleVi: 'Có dùng thử Novixa không?', titleEn: 'Is there a Novixa trial?', targetWords: 350 },
  { id: 'faq-gpp', slug: 'novixa-gpp', section: 'faq', category: 'faq', titleVi: 'Novixa có hỗ trợ GPP?', titleEn: 'Does Novixa support GPP?', targetWords: 400 },
  { id: 'faq-chain', slug: 'novixa-chuoi', section: 'faq', category: 'faq', titleVi: 'Novixa cho chuỗi nhà thuốc?', titleEn: 'Novixa for pharmacy chains?', targetWords: 400 },
  { id: 'faq-migrate', slug: 'chuyen-tu-excel', section: 'faq', category: 'faq', titleVi: 'Chuyển từ Excel sang Novixa?', titleEn: 'Migrating from Excel?', targetWords: 400 },
  { id: 'faq-data', slug: 'du-lieu-luu-o-dau', section: 'faq', category: 'faq', titleVi: 'Dữ liệu lưu ở đâu?', titleEn: 'Where is data stored?', targetWords: 400 },
  { id: 'faq-security', slug: 'bao-mat-du-lieu', section: 'faq', category: 'faq', titleVi: 'Bảo mật dữ liệu thế nào?', titleEn: 'How is data secured?', targetWords: 400 },
  { id: 'faq-support', slug: 'ho-tro-ky-thuat', section: 'faq', category: 'faq', titleVi: 'Hỗ trợ kỹ thuật ra sao?', titleEn: 'What support is included?', targetWords: 350 },
  { id: 'faq-training', slug: 'dao-tao-su-dung', section: 'faq', category: 'faq', titleVi: 'Có đào tạo sử dụng không?', titleEn: 'Is training included?', targetWords: 350 },
  { id: 'faq-pos', slug: 'pos-offline', section: 'faq', category: 'faq', titleVi: 'POS có offline không?', titleEn: 'Does POS work offline?', targetWords: 350 },
  { id: 'faq-app', slug: 'app-khach-hang-faq', section: 'faq', category: 'faq', titleVi: 'App khách hàng làm gì?', titleEn: 'What does the customer app do?', targetWords: 350 },
  { id: 'faq-api', slug: 'api-tich-hop', section: 'faq', category: 'faq', titleVi: 'Có API tích hợp không?', titleEn: 'Is there an integration API?', targetWords: 350 },
  { id: 'faq-ai', slug: 'ai-assistant-faq', section: 'faq', category: 'faq', titleVi: 'AI Assistant làm được gì?', titleEn: 'What can the AI Assistant do?', targetWords: 400 },
  { id: 'faq-kit', slug: 'kit-la-gi', section: 'faq', category: 'faq', titleVi: 'KIT Technology là gì?', titleEn: 'What is KIT Technology?', targetWords: 400 },
  { id: 'faq-novixa-link', slug: 'novixa-va-kit', section: 'faq', category: 'faq', titleVi: 'Novixa và KIT liên quan thế nào?', titleEn: 'How are Novixa and KIT related?', targetWords: 400 },
  { id: 'faq-custom', slug: 'tuy-chinh-novixa', section: 'faq', category: 'faq', titleVi: 'Có tùy chỉnh Novixa không?', titleEn: 'Can Novixa be customized?', targetWords: 350 },
  { id: 'faq-report', slug: 'bao-cao-faq', section: 'faq', category: 'faq', titleVi: 'Báo cáo nào có sẵn?', titleEn: 'Which reports are available?', targetWords: 350 },
  { id: 'faq-users', slug: 'nhieu-nguoi-dung', section: 'faq', category: 'faq', titleVi: 'Hỗ trợ bao nhiêu người dùng?', titleEn: 'How many users are supported?', targetWords: 350 },
  { id: 'faq-backup', slug: 'sao-luu-du-lieu', section: 'faq', category: 'faq', titleVi: 'Sao lưu dữ liệu thế nào?', titleEn: 'How are backups handled?', targetWords: 350 },
  { id: 'faq-contract', slug: 'hop-dong-dich-vu', section: 'faq', category: 'faq', titleVi: 'Hợp đồng dịch vụ ra sao?', titleEn: 'What do contracts look like?', targetWords: 350 },
  { id: 'faq-implementation', slug: 'thoi-gian-trien-khai', section: 'faq', category: 'faq', titleVi: 'Triển khai mất bao lâu?', titleEn: 'How long is implementation?', targetWords: 350 },
  { id: 'faq-hardware', slug: 'phần-cung-pos', section: 'faq', category: 'faq', titleVi: 'Cần phần cứng POS gì?', titleEn: 'What POS hardware is needed?', targetWords: 350 },
  { id: 'faq-zalo', slug: 'tich-hop-zalo-faq', section: 'faq', category: 'faq', titleVi: 'Tích hợp Zalo thế nào?', titleEn: 'How does Zalo integration work?', targetWords: 350 },
  { id: 'faq-einvoice', slug: 'hoa-don-dien-tu-faq', section: 'faq', category: 'faq', titleVi: 'Hóa đơn điện tử hỗ trợ chưa?', titleEn: 'Is e-invoicing supported?', targetWords: 350 },
  { id: 'faq-expiry', slug: 'canh-bao-han-dung', section: 'faq', category: 'faq', titleVi: 'Cảnh báo hạn dùng thế nào?', titleEn: 'How do expiry alerts work?', targetWords: 350 },
  { id: 'faq-loyalty', slug: 'loyalty-faq', section: 'faq', category: 'faq', titleVi: 'Loyalty có sẵn không?', titleEn: 'Is loyalty included?', targetWords: 350 },
  { id: 'faq-compare', slug: 'so-sanh-doi-thu', section: 'faq', category: 'faq', titleVi: 'So sánh với đối thủ?', titleEn: 'Comparison with competitors?', targetWords: 400 },
  { id: 'faq-contact', slug: 'lien-he-kit', section: 'faq', category: 'faq', titleVi: 'Liên hệ KIT Technology?', titleEn: 'How to contact KIT?', targetWords: 300 },
  { id: 'faq-demo', slug: 'dang-ky-demo', section: 'faq', category: 'faq', titleVi: 'Đăng ký demo thế nào?', titleEn: 'How to request a demo?', targetWords: 300 },
];

function spreadPublishDates(
  items: Omit<PlannedArticle, 'publishDate'>[],
  startIso: string,
  endIso: string,
): PlannedArticle[] {
  const start = new Date(startIso);
  const end = new Date(endIso);
  const span = Math.max(1, Math.ceil((end.getTime() - start.getTime()) / 86400000));

  return items.map((item, index) => {
    const dayOffset = Math.floor((index * span) / items.length);
    const date = new Date(start);
    date.setUTCDate(date.getUTCDate() + dayOffset);
    return {
      ...item,
      publishDate: date.toISOString().slice(0, 10),
    };
  });
}

const scheduledPool = [
  ...TECHNOLOGY,
  ...SOLUTIONS,
  ...NOVIXA,
  ...INSIGHTS_AI,
  ...INSIGHTS_ENG,
  ...INSIGHTS_BLOG,
  ...FAQ,
];

export const EDITORIAL_PLAN: PlannedArticle[] = [
  ...COMPANY_LIVE.map((item) => ({ ...item, publishDate: '2026-07-01' })),
  ...spreadPublishDates(scheduledPool, KNOWLEDGE_HUB.startDate, KNOWLEDGE_HUB.endDate),
];

export const EDITORIAL_STATS = {
  company: COMPANY_LIVE.length,
  technology: TECHNOLOGY.length,
  solutions: SOLUTIONS.length,
  products: NOVIXA.length,
  insightsAi: INSIGHTS_AI.length,
  insightsEng: INSIGHTS_ENG.length,
  insightsBlog: INSIGHTS_BLOG.length,
  faq: FAQ.length,
  scheduled: scheduledPool.length,
  total: EDITORIAL_PLAN.length,
} as const;

/** Map insight category slug to site-map page key for hub pages */
export const CATEGORY_PAGE_KEYS: Partial<Record<InsightCategory, string>> = {
  ai: 'blog-ai',
  healthcare: 'blog-health',
  'digital-transformation': 'blog-dx',
  engineering: 'blog-eng',
  'company-news': 'blog-news',
  business: 'blog-business',
  technology: 'blog-tech-cat',
  solutions: 'blog-sol-cat',
  products: 'blog-prod-cat',
  faq: 'faq',
};

export function getPlanById(id: string): PlannedArticle | undefined {
  return EDITORIAL_PLAN.find((item) => item.id === id);
}

export function getPlanForDate(isoDate: string): PlannedArticle[] {
  return EDITORIAL_PLAN.filter((item) => item.publishDate === isoDate && !item.alreadyLive);
}

export function getUpcomingPlan(fromDate = new Date()): PlannedArticle[] {
  const iso = fromDate.toISOString().slice(0, 10);
  return EDITORIAL_PLAN.filter((item) => !item.alreadyLive && item.publishDate >= iso).sort((a, b) =>
    a.publishDate.localeCompare(b.publishDate),
  );
}
