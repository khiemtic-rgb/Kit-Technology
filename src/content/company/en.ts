import type { ArticleContent } from '../types';

export const companyArticlesEn: Record<string, ArticleContent> = {
  about: {
    subtitle: 'Building digital platforms powered by AI',
    blocks: [
      { type: 'heading', text: 'About us' },
      {
        type: 'paragraph',
        text: 'Founded in 2015, KIT Technology develops software solutions and digital platforms for businesses.',
      },
      {
        type: 'paragraph',
        text: 'Through years in IT, we learned that businesses need more than operational software — they need platforms that adapt, scale, and grow with them.',
      },
      {
        type: 'paragraph',
        text: 'In the AI era, KIT Technology became an AI-First Software Company, building AI-powered platforms that optimize operations, boost productivity, and create sustainable value.',
      },
      {
        type: 'paragraph',
        text: 'Our flagship product is Novixa — a next-generation pharmacy management platform built for pharmaceutical retail.',
      },
      { type: 'heading', text: 'What we do' },
      { type: 'paragraph', text: 'KIT Technology focuses on three core areas:' },
      {
        type: 'list',
        items: [
          'SaaS platform development',
          'Applying AI to business management',
          'Deep vertical digital transformation solutions',
        ],
      },
      { type: 'heading', text: 'Values we pursue' },
      {
        type: 'pillars',
        items: ['Simplicity', 'Efficiency', 'Security', 'Scalability', 'Customer-centric'],
      },
    ],
  },
  story: {
    subtitle: 'From a software company to an AI-First Software Company',
    blocks: [
      {
        type: 'paragraph',
        text: 'In 2015, KIT Technology was founded to bring technology closer to Vietnamese businesses.',
      },
      {
        type: 'paragraph',
        text: 'In our early years, we built websites, management software, and IT consulting projects.',
      },
      {
        type: 'paragraph',
        text: 'By 2019, the market shifted rapidly. We realized outsourcing alone does not create lasting value.',
      },
      {
        type: 'paragraph',
        text: 'Instead of staying on the old path, KIT invested in product research and development.',
      },
      {
        type: 'paragraph',
        text: 'As AI accelerated, we built a new development process — faster, more efficient, and quality-focused.',
      },
      {
        type: 'paragraph',
        text: 'Today, KIT Technology is building digital platforms designed for long-term growth.',
      },
    ],
  },
  vision: {
    subtitle: 'Leading digital platforms built in Vietnam',
    blocks: [
      {
        type: 'paragraph',
        text: 'We believe AI will become fundamental infrastructure for every business.',
      },
      {
        type: 'paragraph',
        text: 'KIT Technology aims to build platforms that help businesses:',
      },
      {
        type: 'list',
        items: ['Manage intelligently', 'Operate efficiently', 'Connect data', 'Decide with AI'],
      },
      {
        type: 'paragraph',
        text: 'Our goal is not just software — it is an product ecosystem serving tens of thousands of businesses.',
      },
    ],
  },
  mission: {
    subtitle: 'Bringing AI technology closer to every business',
    blocks: [
      { type: 'paragraph', text: 'We help businesses:' },
      {
        type: 'list',
        items: [
          'Reduce operating costs',
          'Increase productivity',
          'Standardize processes',
          'Grow sustainably with technology',
        ],
      },
    ],
  },
  values: {
    subtitle: 'The values that define KIT Technology',
    blocks: [
      {
        type: 'values',
        items: [
          { title: 'Innovation', desc: 'Always improving.' },
          { title: 'Simplicity', desc: 'Easy to use.' },
          { title: 'Quality', desc: 'Quality first.' },
          { title: 'Customer Success', desc: 'Your success is our success.' },
          { title: 'Long-term Thinking', desc: 'Building for years ahead.' },
        ],
      },
    ],
  },
  'company-tech': {
    subtitle: 'Technology behind KIT platforms',
    blocks: [
      {
        type: 'paragraph',
        text: 'We choose modern technologies for scalability and stability.',
      },
      {
        type: 'tech-grid',
        groups: [
          { name: 'Front-end', items: ['Flutter', 'React', 'Next.js'] },
          { name: 'Backend', items: ['Node.js', 'NestJS', 'REST API', 'GraphQL'] },
          { name: 'Database', items: ['PostgreSQL', 'Redis', 'Object Storage'] },
          { name: 'Cloud', items: ['Docker', 'Kubernetes', 'Cloud Infrastructure', 'CI/CD'] },
          { name: 'AI', items: ['Large Language Models', 'AI Agents', 'Automation', 'RAG', 'Vector Database'] },
        ],
      },
    ],
  },
  'why-kit': {
    subtitle: 'Why businesses choose KIT Technology',
    blocks: [
      {
        type: 'cards',
        items: [
          { title: 'AI-First', desc: 'AI integrated from product development.' },
          { title: 'Product Thinking', desc: 'We build products, not just code.' },
          { title: 'Security', desc: 'Data safety guaranteed.' },
          { title: 'Scalability', desc: 'Easy to scale.' },
          { title: 'Long-term Partnership', desc: 'Long-term client partnership.' },
        ],
      },
    ],
  },
};

export const engineeringArticleEn: ArticleContent = {
  subtitle: 'Technical insights from the KIT Technology team',
  blocks: [
    {
      type: 'paragraph',
      text: 'Engineering at KIT Technology shares hands-on experience building digital platforms — from system architecture to the Novixa journey.',
    },
    {
      type: 'topics',
      items: [
        'AI Engineering',
        'Flutter',
        'NestJS',
        'PostgreSQL',
        'Docker',
        'Cloud',
        'DevOps',
        'System Architecture',
        'Building Novixa',
      ],
    },
    {
      type: 'paragraph',
      text: 'Detailed articles will be published under Insights. Contact us for technical partnership or careers.',
    },
  ],
};
