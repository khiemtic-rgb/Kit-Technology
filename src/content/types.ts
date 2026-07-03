export type ArticleBlock =
  | { type: 'lead'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'pillars'; items: string[] }
  | { type: 'values'; items: { title: string; desc: string }[] }
  | { type: 'cards'; items: { title: string; desc: string }[] }
  | { type: 'tech-grid'; groups: { name: string; items: string[] }[] }
  | { type: 'topics'; items: string[] };

export type ArticleContent = {
  subtitle?: string;
  blocks: ArticleBlock[];
};
