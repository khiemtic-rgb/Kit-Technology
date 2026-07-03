import fs from 'node:fs';
import path from 'node:path';

const API_BASE = 'https://api.openai.com/v1';

export type GeneratedArticle = {
  description: string;
  tags: string[];
  keywords: string[];
  body: string;
};

function getApiKey(): string | undefined {
  return process.env.OPENAI_API_KEY?.trim() || undefined;
}

export function hasOpenAiKey(): boolean {
  return Boolean(getApiKey());
}

async function openaiRequest<T>(endpoint: string, body: unknown): Promise<T> {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is not set');
  }

  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`OpenAI ${endpoint} failed (${res.status}): ${detail.slice(0, 500)}`);
  }

  return res.json() as Promise<T>;
}

export async function generateArticleContent(input: {
  title: string;
  locale: 'vi' | 'en';
  category: string;
  section: string;
  targetWords: number;
}): Promise<GeneratedArticle> {
  const model = process.env.OPENAI_MODEL?.trim() || 'gpt-4o-mini';
  const language = input.locale === 'vi' ? 'Vietnamese' : 'English';

  const system = [
    'You write SEO blog articles for KIT Technology Knowledge Hub.',
    'KIT Technology is an AI-first software company; Novixa is its healthcare SaaS product for pharmacies in Vietnam.',
    'Return valid JSON only.',
  ].join(' ');

  const user = [
    `Language: ${language}`,
    `Title: ${input.title}`,
    `Category: ${input.category}`,
    `Section: ${input.section}`,
    `Target length: about ${input.targetWords} words`,
    '',
    'Return JSON with keys:',
    '- description: meta description, max 155 characters',
    '- tags: 2-4 URL-safe tag slugs',
    '- keywords: 3-6 SEO keyword phrases',
    '- body: markdown article only (no frontmatter), start with ##, use 3-5 sections, bullet lists where useful',
    '',
    'Tone: professional, practical, not overly promotional.',
  ].join('\n');

  const data = await openaiRequest<{
    choices: Array<{ message: { content: string | null } }>;
  }>('/chat/completions', {
    model,
    temperature: 0.7,
    response_format: { type: 'json_object' },
    messages: [
      { role: 'system', content: system },
      { role: 'user', content: user },
    ],
  });

  const raw = data.choices[0]?.message?.content;
  if (!raw) throw new Error('OpenAI returned empty article content');

  const parsed = JSON.parse(raw) as Partial<GeneratedArticle>;
  if (!parsed.body || !parsed.description) {
    throw new Error('OpenAI article JSON missing body or description');
  }

  return {
    description: parsed.description.trim(),
    tags: (parsed.tags ?? []).map(String).filter(Boolean).slice(0, 6),
    keywords: (parsed.keywords ?? []).map(String).filter(Boolean).slice(0, 8),
    body: parsed.body.trim(),
  };
}

export function buildImagePrompt(title: string, locale: 'vi' | 'en'): string {
  const context =
    locale === 'vi'
      ? 'Phong cách minh họa công nghệ B2B, ngành y dược và nhà thuốc Việt Nam.'
      : 'B2B technology illustration style, healthcare and pharmacy context.';

  return [
    `Blog hero image for article: "${title}".`,
    context,
    'Modern, clean, professional, teal and white palette, soft gradients.',
    'Wide 16:9 hero composition, no text, no logos, no watermarks.',
  ].join(' ');
}

type ImageGenerationPayload = {
  model: string;
  prompt: string;
  size: string;
  n: number;
  quality?: string;
  response_format?: 'url' | 'b64_json';
};

const IMAGE_MODEL_FALLBACKS: ImageGenerationPayload[] = [
  {
    model: 'gpt-image-1',
    prompt: '',
    size: '1536x1024',
    n: 1,
  },
  {
    model: 'dall-e-3',
    prompt: '',
    size: '1792x1024',
    n: 1,
    quality: 'standard',
  },
  {
    model: 'dall-e-2',
    prompt: '',
    size: '1024x1024',
    n: 1,
    response_format: 'url',
  },
];

export async function generateHeroImageFromTitle(input: {
  title: string;
  locale: 'vi' | 'en';
}): Promise<string> {
  const preferred = process.env.OPENAI_IMAGE_MODEL?.trim();
  const prompt = buildImagePrompt(input.title, input.locale);
  const models = preferred
    ? [{ ...IMAGE_MODEL_FALLBACKS[0]!, model: preferred, prompt }]
    : IMAGE_MODEL_FALLBACKS.map((item) => ({ ...item, prompt }));

  let lastError: Error | undefined;

  for (const payload of models) {
    try {
      const body: Record<string, unknown> = {
        model: payload.model,
        prompt: payload.prompt,
        size: payload.size,
        n: payload.n,
      };
      if (payload.quality) body.quality = payload.quality;
      if (payload.response_format) body.response_format = payload.response_format;

      const data = await openaiRequest<{
        data: Array<{ url?: string; b64_json?: string }>;
      }>('/images/generations', body);

      const item = data.data[0];
      if (item?.url) {
        console.log(`  · Image model: ${payload.model}`);
        return item.url;
      }
      if (item?.b64_json) {
        console.log(`  · Image model: ${payload.model} (base64)`);
        return `data:image/png;base64,${item.b64_json}`;
      }
      throw new Error('OpenAI image generation returned no image data');
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      console.warn(`  ! Image model ${payload.model} failed: ${lastError.message.split('\n')[0]}`);
    }
  }

  throw lastError ?? new Error('All image models failed');
}

export async function saveGeneratedImage(source: string, destPath: string): Promise<void> {
  fs.mkdirSync(path.dirname(destPath), { recursive: true });

  if (source.startsWith('data:image/')) {
    const raw = source.replace(/^data:image\/\w+;base64,/, '');
    fs.writeFileSync(destPath, Buffer.from(raw, 'base64'));
    return;
  }

  const res = await fetch(source);
  if (!res.ok) {
    throw new Error(`Failed to download generated image (${res.status})`);
  }
  fs.writeFileSync(destPath, Buffer.from(await res.arrayBuffer()));
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
