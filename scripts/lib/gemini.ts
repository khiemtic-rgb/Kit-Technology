/**
 * Gemini — viết bài Knowledge Hub (Google AI Studio).
 * Hero mặc định dùng pool; không bắt buộc Gemini image.
 */

const API_BASE = 'https://generativelanguage.googleapis.com/v1beta';

const TEXT_MODEL_FALLBACKS = [
  'gemini-2.0-flash',
  'gemini-2.5-flash-lite',
  'gemini-2.5-flash',
  'gemini-flash-latest',
];

const RATE_LIMIT_RETRIES = 4;
const RATE_LIMIT_BASE_MS = 20_000;

export type GeneratedArticle = {
  description: string;
  tags: string[];
  keywords: string[];
  body: string;
};

function getApiKey(): string | undefined {
  return (
    process.env.GEMINI_API_KEY?.trim() ||
    process.env.GOOGLE_API_KEY?.trim() ||
    process.env.GOOGLE_GENERATIVE_AI_API_KEY?.trim() ||
    undefined
  );
}

export function hasGeminiKey(): boolean {
  return Boolean(getApiKey());
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isRateLimited(error: Error): boolean {
  return /failed \(429\)/.test(error.message);
}

async function geminiRequestOnce(urlPath: string, body: unknown): Promise<unknown> {
  const apiKey = getApiKey();
  if (!apiKey) throw new Error('GEMINI_API_KEY is not set');

  const res = await fetch(`${API_BASE}${urlPath}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-goog-api-key': apiKey,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`Gemini ${urlPath} failed (${res.status}): ${detail.slice(0, 500)}`);
  }

  return res.json();
}

async function geminiRequest(urlPath: string, body: unknown): Promise<unknown> {
  let lastError: Error | undefined;
  for (let attempt = 1; attempt <= RATE_LIMIT_RETRIES; attempt++) {
    try {
      return await geminiRequestOnce(urlPath, body);
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      if (!isRateLimited(lastError) || attempt === RATE_LIMIT_RETRIES) throw lastError;
      const wait = RATE_LIMIT_BASE_MS * attempt;
      console.warn(
        `  · Rate limit 429 — wait ${Math.round(wait / 1000)}s then retry (${attempt}/${RATE_LIMIT_RETRIES})`,
      );
      await sleep(wait);
    }
  }
  throw lastError ?? new Error('Gemini request failed');
}

function extractText(data: unknown): string | undefined {
  const parts = (data as { candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }> })
    ?.candidates?.[0]?.content?.parts;
  if (!Array.isArray(parts)) return undefined;
  return parts
    .map((p) => p?.text)
    .filter(Boolean)
    .join('\n')
    .trim();
}

export async function generateArticleContent(input: {
  title: string;
  locale: 'vi' | 'en';
  category: string;
  section: string;
  targetWords: number;
}): Promise<GeneratedArticle> {
  const preferred = process.env.GEMINI_MODEL?.trim();
  const models = preferred
    ? [preferred, ...TEXT_MODEL_FALLBACKS.filter((m) => m !== preferred)]
    : TEXT_MODEL_FALLBACKS;

  const language = input.locale === 'vi' ? 'Vietnamese' : 'English';

  const system = [
    'You write SEO blog articles for KIT Technology Knowledge Hub (kittech.vn).',
    'KIT Technology is an AI-first software company; Novixa is its healthcare SaaS for pharmacies in Vietnam.',
    'Tone: professional, practical, not overly promotional.',
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
    '- tags: 2-4 URL-safe tag slugs (lowercase, hyphenated)',
    '- keywords: 3-6 SEO keyword phrases',
    '- body: markdown article only (no frontmatter), start with ##, use 3-5 sections, bullet lists where useful',
    '',
    'Do not invent statistics without a qualifier (e.g. "theo kinh nghiệm vận hành").',
  ].join('\n');

  let lastError: Error | undefined;
  for (const model of models) {
    try {
      const data = await geminiRequest(`/models/${model}:generateContent`, {
        systemInstruction: { parts: [{ text: system }] },
        contents: [{ role: 'user', parts: [{ text: user }] }],
        generationConfig: {
          temperature: 0.7,
          responseMimeType: 'application/json',
        },
      });

      const raw = extractText(data);
      if (!raw) throw new Error('Gemini returned empty article content');

      const parsed = JSON.parse(raw) as Partial<GeneratedArticle>;
      if (!parsed.body || !parsed.description) {
        throw new Error('Gemini article JSON missing body or description');
      }

      console.log(`  · Text model: ${model}`);
      return {
        description: String(parsed.description).trim(),
        tags: (parsed.tags ?? []).map(String).filter(Boolean).slice(0, 6),
        keywords: (parsed.keywords ?? []).map(String).filter(Boolean).slice(0, 8),
        body: String(parsed.body).trim(),
      };
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      console.warn(`  ! Text model ${model} failed: ${lastError.message.split('\n')[0]}`);
    }
  }

  throw lastError ?? new Error('All Gemini text models failed');
}
