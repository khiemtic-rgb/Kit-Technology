/**
 * Ensure Workers KV namespace for fallback pageview counters.
 * Patches wrangler.jsonc with binding STATS_KV before deploy.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';

const TITLE = process.env.CF_STATS_KV_TITLE?.trim() || 'kittech-stats';
const BINDING = 'STATS_KV';
const WRANGLER = 'wrangler.jsonc';

function runJson(args) {
  const res = spawnSync('npx', ['wrangler', ...args, '--json'], {
    encoding: 'utf8',
    shell: true,
    env: process.env,
  });
  const out = `${res.stdout || ''}${res.stderr || ''}`.trim();
  if (res.status !== 0) {
    throw new Error(`wrangler ${args.join(' ')} failed: ${out}`);
  }
  const start = out.indexOf('[');
  const startObj = out.indexOf('{');
  const idx = start === -1 ? startObj : startObj === -1 ? start : Math.min(start, startObj);
  if (idx < 0) throw new Error(`No JSON in wrangler output: ${out}`);
  return JSON.parse(out.slice(idx));
}

const listed = runJson(['kv', 'namespace', 'list']);
const namespaces = Array.isArray(listed) ? listed : [];
let ns = namespaces.find((n) => n.title === TITLE);

if (!ns?.id) {
  console.log(`[stats-kv] creating namespace ${TITLE}`);
  const created = runJson(['kv', 'namespace', 'create', TITLE]);
  ns = created;
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
