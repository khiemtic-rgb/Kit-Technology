/**
 * Ensure Workers KV namespace for fallback pageview counters.
 * Patches wrangler.jsonc with binding STATS_KV before deploy.
 * Soft-fails (exit 0) if token cannot manage KV — deploy continues without counters.
 */
import { readFileSync, writeFileSync } from 'node:fs';

const TITLE = process.env.CF_STATS_KV_TITLE?.trim() || 'kittech-stats';
const BINDING = 'STATS_KV';
const WRANGLER = 'wrangler.jsonc';
const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID?.trim();
const API_TOKEN = process.env.CLOUDFLARE_API_TOKEN?.trim();

if (!ACCOUNT_ID || !API_TOKEN) {
  console.warn('[stats-kv] CLOUDFLARE_ACCOUNT_ID / CLOUDFLARE_API_TOKEN missing — skip');
  process.exit(0);
}

async function cf(path, init = {}) {
  const res = await fetch(`https://api.cloudflare.com/client/v4${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
      'Content-Type': 'application/json',
      ...(init.headers || {}),
    },
  });
  const body = await res.json();
  if (!body.success) {
    throw new Error(`Cloudflare API ${path}: ${JSON.stringify(body.errors || body)}`);
  }
  return body.result;
}

try {
  const listed = await cf(`/accounts/${ACCOUNT_ID}/storage/kv/namespaces?per_page=100`);
  const namespaces = Array.isArray(listed) ? listed : [];
  let ns = namespaces.find((n) => n.title === TITLE);

  if (!ns?.id) {
    console.log(`[stats-kv] creating namespace ${TITLE}`);
    ns = await cf(`/accounts/${ACCOUNT_ID}/storage/kv/namespaces`, {
      method: 'POST',
      body: JSON.stringify({ title: TITLE }),
    });
  }

  if (!ns?.id) {
    throw new Error(`Could not resolve KV namespace id for ${TITLE}`);
  }

  console.log(`[stats-kv] using ${TITLE} → ${ns.id}`);

  const raw = readFileSync(WRANGLER, 'utf8');
  const conf = JSON.parse(raw.replace(/^\uFEFF/, '').replace(/^\s*\/\/.*$/gm, ''));
  conf.kv_namespaces = [
    {
      binding: BINDING,
      id: ns.id,
    },
  ];
  writeFileSync(WRANGLER, `${JSON.stringify(conf, null, 2)}\n`);
  console.log(`[stats-kv] wrote ${BINDING} into ${WRANGLER}`);
} catch (err) {
  console.warn(`[stats-kv] skip — ${err instanceof Error ? err.message : String(err)}`);
  process.exit(0);
}
