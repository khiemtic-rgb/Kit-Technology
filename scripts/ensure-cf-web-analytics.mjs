/**
 * Ensure Cloudflare Web Analytics site for kittech.vn exists.
 * Outputs: PUBLIC_CF_WEB_ANALYTICS_TOKEN=<token> for GITHUB_ENV (CI).
 * Never prints the full token to logs.
 */
const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID?.trim();
const API_TOKEN = process.env.CLOUDFLARE_API_TOKEN?.trim();
const HOST = process.env.CF_WEB_ANALYTICS_HOST?.trim() || 'kittech.vn';

if (!ACCOUNT_ID || !API_TOKEN) {
  console.warn('[analytics] CLOUDFLARE_ACCOUNT_ID / CLOUDFLARE_API_TOKEN missing — skip');
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
  const json = await res.json();
  if (!json.success) {
    const msg = JSON.stringify(json.errors || json);
    throw new Error(`Cloudflare API ${path}: ${msg}`);
  }
  return json.result;
}

function mask(token) {
  if (!token || token.length < 10) return '(short)';
  return `${token.slice(0, 4)}…${token.slice(-4)}`;
}

const zones = await cf(`/zones?name=${encodeURIComponent(HOST)}`);
const zone = Array.isArray(zones) ? zones[0] : null;
const zoneTag = zone?.id;

const listed = await cf(`/accounts/${ACCOUNT_ID}/rum/site_info/list?per_page=50`);
const sites = Array.isArray(listed) ? listed : listed?.sites || [];
let site =
  sites.find((s) => s.ruleset?.zone_name === HOST) ||
  sites.find((s) => (s.rules || []).some((r) => r.host === HOST)) ||
  sites.find((s) => s.site_tag && String(s.snippet || '').includes(HOST));

if (!site) {
  const body = {
    auto_install: Boolean(zoneTag),
    host: HOST,
  };
  if (zoneTag) body.zone_tag = zoneTag;
  site = await cf(`/accounts/${ACCOUNT_ID}/rum/site_info`, {
    method: 'POST',
    body: JSON.stringify(body),
  });
  console.log(`[analytics] created Web Analytics site for ${HOST} (auto_install=${Boolean(zoneTag)})`);
} else if (zoneTag && site.auto_install !== true) {
  site = await cf(`/accounts/${ACCOUNT_ID}/rum/site_info/${site.site_tag}`, {
    method: 'PUT',
    body: JSON.stringify({
      auto_install: true,
      enabled: true,
      host: HOST,
      zone_tag: zoneTag,
    }),
  });
  console.log(`[analytics] enabled auto_install for ${HOST}`);
} else {
  console.log(`[analytics] site already configured for ${HOST}`);
}

const token = site?.site_token?.trim();
if (!token) {
  console.warn('[analytics] no site_token returned — skip env export');
  process.exit(0);
}

console.log(`[analytics] token ready ${mask(token)}`);

const githubEnv = process.env.GITHUB_ENV;
if (githubEnv) {
  const { appendFileSync } = await import('node:fs');
  appendFileSync(githubEnv, `PUBLIC_CF_WEB_ANALYTICS_TOKEN=${token}\n`);
  console.log('[analytics] exported PUBLIC_CF_WEB_ANALYTICS_TOKEN to GITHUB_ENV');
} else {
  // Local/manual: write to process stdout marker for wrappers (not echoed as secret)
  process.stdout.write(`EXPORT_PUBLIC_CF_WEB_ANALYTICS_TOKEN=${token}\n`);
}
