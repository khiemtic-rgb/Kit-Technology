import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { InsightCategory, InsightSection } from '../../src/content.config.ts';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const poolRoot = path.join(root, 'public/images/insights/pool');

/** Pool folders under public/images/insights/pool/{key}/*.png */
export const HERO_POOL_KEYS = ['ai', 'technology', 'healthcare', 'business', 'general'] as const;
export type HeroPoolKey = (typeof HERO_POOL_KEYS)[number];

export function heroImageMode(): 'pool' | 'ai' {
  const raw = (process.env.HERO_IMAGE_MODE ?? 'pool').trim().toLowerCase();
  return raw === 'ai' ? 'ai' : 'pool';
}

export function poolKeyFor(category: InsightCategory | string, section?: InsightSection | string): HeroPoolKey {
  if (category === 'ai') return 'ai';
  if (category === 'healthcare' || section === 'solutions') return 'healthcare';
  if (category === 'technology' || category === 'engineering' || section === 'technology') return 'technology';
  if (category === 'business' || category === 'company-news' || category === 'products' || section === 'products') {
    return 'business';
  }
  return 'general';
}

function hashSlug(slug: string): number {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash * 31 + slug.charCodeAt(i)) >>> 0;
  }
  return hash;
}

function listPoolFiles(key: HeroPoolKey): string[] {
  const dir = path.join(poolRoot, key);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((name) => /\.(png|jpe?g|webp)$/i.test(name))
    .sort();
}

/** All pool images across keys (fallback when a category folder is empty). */
function allPoolFiles(): string[] {
  const files: string[] = [];
  for (const key of HERO_POOL_KEYS) {
    for (const name of listPoolFiles(key)) {
      files.push(`${key}/${name}`);
    }
  }
  return files.sort();
}

export function pickPoolRelativePath(category: InsightCategory | string, slug: string, section?: InsightSection | string): string {
  const key = poolKeyFor(category, section);
  let files = listPoolFiles(key);
  if (files.length === 0) {
    const all = allPoolFiles();
    if (all.length === 0) {
      throw new Error(`Hero pool is empty. Add PNG files to public/images/insights/pool/{${HERO_POOL_KEYS.join('|')}}/`);
    }
    return all[hashSlug(slug) % all.length]!;
  }
  return `${key}/${files[hashSlug(slug) % files.length]!}`;
}

export function poolPublicPath(relativePath: string): string {
  return `/images/insights/pool/${relativePath.replace(/^\//, '')}`;
}

export function poolFilePath(relativePath: string): string {
  return path.join(poolRoot, relativePath.replace(/^\//, ''));
}

export function assignHeroFromPool(input: {
  category: InsightCategory | string;
  section?: InsightSection | string;
  slug: string;
}): string {
  const relative = pickPoolRelativePath(input.category, input.slug, input.section);
  const src = poolFilePath(relative);
  if (!fs.existsSync(src)) {
    throw new Error(`Hero pool file missing: ${src}`);
  }
  return poolPublicPath(relative);
}

export function poolStats(): Record<HeroPoolKey, number> {
  const stats = {} as Record<HeroPoolKey, number>;
  for (const key of HERO_POOL_KEYS) {
    stats[key] = listPoolFiles(key).length;
  }
  return stats;
}
