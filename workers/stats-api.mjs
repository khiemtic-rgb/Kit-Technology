/**
 * Public traffic stats for /api/stats/
 * Prefers Cloudflare Web Analytics (RUM), then Zone Analytics, then Worker KV counters.
 * Env: CF_API_TOKEN, CF_ACCOUNT_ID (optional), STATS_KV (optional binding)
 */

const HOST = 'kittech.vn';
const CACHE_TTL_SECONDS = 900;

function json(data, status = 200, headers = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': `public, max-age=${CACHE_TTL_SECONDS}`,
      ...headers,
    },
  });
}

function ymd(d) {
  return d.toISOString().slice(0, 10);
}

function dayRange(n) {
  const until = new Date();
  const days = [];
  for (let i = n - 1; i >= 0; i -= 1) {
    const d = new Date(until);
    d.setUTCDate(d.getUTCDate() - i);
    days.push(ymd(d));
  }
  return days;
}

async function cfGet(path, token) {
  const res = await fetch(`https://api.cloudflare.com/client/v4${path}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const body = await res.json();
  if (!body.success) {
    throw new Error(JSON.stringify(body.errors || body));
  }
  return body.result;
}

async function graphql(token, query, variables) {
  const res = await fetch('https://api.cloudflare.com/client/v4/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  });
  const body = await res.json();
  if (body.errors?.length) {
    throw new Error(JSON.stringify(body.errors));
  }
  return body.data;
}

function sumDays(days, n) {
  const slice = days.slice(-n);
  return {
    requests: slice.reduce((a, d) => a + d.requests, 0),
    pageViews: slice.reduce((a, d) => a + d.pageViews, 0),
    visitors: slice.reduce((a, d) => a + d.visitors, 0),
  };
}

function payloadFromDays(days, source) {
  const today = days[days.length - 1] || { date: ymd(new Date()), requests: 0, pageViews: 0, visitors: 0 };
  return {
    ok: true,
    host: HOST,
    source,
    generatedAt: new Date().toISOString(),
    today: {
      date: today.date,
      requests: today.requests,
      pageViews: today.pageViews,
      visitors: today.visitors,
    },
    last7Days: sumDays(days, 7),
    last30Days: sumDays(days, 30),
    series: days,
  };
}

async function resolveAccountId(token, env) {
  if (env.CF_ACCOUNT_ID || env.CLOUDFLARE_ACCOUNT_ID) {
    return env.CF_ACCOUNT_ID || env.CLOUDFLARE_ACCOUNT_ID;
  }
  const zones = await cfGet(`/zones?name=${encodeURIComponent(HOST)}`, token);
  const zone = Array.isArray(zones) ? zones[0] : null;
  if (!zone?.account?.id) throw new Error(`Account not found for ${HOST}`);
  return zone.account.id;
}

async function resolveSiteTag(token, accountId) {
  const listed = await cfGet(`/accounts/${accountId}/rum/site_info/list?per_page=50`, token);
  const sites = Array.isArray(listed) ? listed : listed?.sites || [];
  const site =
    sites.find((s) => s.ruleset?.zone_name === HOST) ||
    sites.find((s) => (s.rules || []).some((r) => r.host === HOST)) ||
    sites.find((s) => String(s.snippet || '').includes(HOST));
  if (!site?.site_tag) throw new Error(`Web Analytics site not found for ${HOST}`);
  return site.site_tag;
}

async function fetchRumDays(token, accountTag, siteTag) {
  const dates = dayRange(30);
  const queryWithVisits = `query($accountTag: string, $siteTag: string, $dates: [string!]) {
      viewer {
        accounts(filter: { accountTag: $accountTag }) {
          rumPageloadEventsAdaptiveGroups(
            limit: 40
            filter: { siteTag: $siteTag, date_in: $dates }
            orderBy: [date_ASC]
          ) {
            count
            sum { visits }
            dimensions { date }
          }
        }
      }
    }`;
  const queryCountOnly = `query($accountTag: string, $siteTag: string, $dates: [string!]) {
      viewer {
        accounts(filter: { accountTag: $accountTag }) {
          rumPageloadEventsAdaptiveGroups(
            limit: 40
            filter: { siteTag: $siteTag, date_in: $dates }
            orderBy: [date_ASC]
          ) {
            count
            dimensions { date }
          }
        }
      }
    }`;

  let data;
  try {
    data = await graphql(token, queryWithVisits, { accountTag, siteTag, dates });
  } catch {
    data = await graphql(token, queryCountOnly, { accountTag, siteTag, dates });
  }

  const groups = data?.viewer?.accounts?.[0]?.rumPageloadEventsAdaptiveGroups || [];
  const byDate = new Map(
    groups.map((g) => [
      g.dimensions.date,
      {
        date: g.dimensions.date,
        pageViews: g.count ?? 0,
        visitors: g.sum?.visits ?? g.count ?? 0,
        requests: g.count ?? 0,
      },
    ]),
  );

  return dates.map(
    (date) => byDate.get(date) || { date, pageViews: 0, visitors: 0, requests: 0 },
  );
}

async function fetchZoneDays(token, env) {
  let zoneTag = env.CF_ZONE_ID;
  if (!zoneTag) {
    const zones = await cfGet(`/zones?name=${encodeURIComponent(HOST)}`, token);
    zoneTag = Array.isArray(zones) ? zones[0]?.id : null;
  }
  if (!zoneTag) throw new Error(`Zone not found: ${HOST}`);

  const until = new Date();
  const since = new Date(until);
  since.setUTCDate(since.getUTCDate() - 29);

  const data = await graphql(
    token,
    `query($zoneTag: string, $since: Date, $until: Date) {
      viewer {
        zones(filter: { zoneTag: $zoneTag }) {
          httpRequests1dGroups(
            orderBy: [date_ASC]
            limit: 40
            filter: { date_geq: $since, date_leq: $until }
          ) {
            dimensions { date }
            sum { requests pageViews }
            uniq { uniques }
          }
        }
      }
    }`,
    {
      zoneTag,
      since: ymd(since),
      until: ymd(until),
    },
  );

  const groups = data?.viewer?.zones?.[0]?.httpRequests1dGroups || [];
  return groups.map((g) => ({
    date: g.dimensions.date,
    requests: g.sum?.requests ?? 0,
    pageViews: g.sum?.pageViews ?? 0,
    visitors: g.uniq?.uniques ?? 0,
  }));
}

async function fetchKvDays(env) {
  if (!env.STATS_KV) throw new Error('STATS_KV not bound');
  const dates = dayRange(30);
  const days = [];
  for (const date of dates) {
    const raw = await env.STATS_KV.get(`pv:${date}`);
    const pageViews = Number(raw || 0) || 0;
    days.push({ date, pageViews, visitors: pageViews, requests: pageViews });
  }
  return days;
}

export async function bumpPageView(env, request) {
  if (!env.STATS_KV || request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.pathname.startsWith('/api/')) return;
  if (url.pathname.includes('/thong-ke') || url.pathname.includes('/stats')) return;
  if (/\.[a-zA-Z0-9]+$/.test(url.pathname)) return;
  const accept = request.headers.get('accept') || '';
  if (accept && !accept.includes('text/html') && !accept.includes('*/*')) return;

  const key = `pv:${ymd(new Date())}`;
  const current = Number((await env.STATS_KV.get(key)) || 0) || 0;
  await env.STATS_KV.put(key, String(current + 1), { expirationTtl: 60 * 60 * 24 * 40 });
}

function readBearer(request) {
  const header = request.headers.get('authorization') || '';
  const match = header.match(/^Bearer\s+(.+)$/i);
  return match?.[1]?.trim() || '';
}

export async function handleStatsApi(request, env) {
  const expected = (env.STATS_VIEW_KEY || '').trim();
  if (!expected) {
    return json(
      {
        ok: false,
        error: 'missing_view_key',
        message: 'STATS_VIEW_KEY not configured on Worker',
      },
      503,
      { 'cache-control': 'no-store' },
    );
  }
  if (readBearer(request) !== expected) {
    return json(
      { ok: false, error: 'unauthorized', message: 'Wrong password' },
      401,
      { 'cache-control': 'no-store' },
    );
  }

  const cache = caches.default;
  const cacheKey = new Request(new URL('/api/stats/cache-v2', request.url).toString(), request);
  const cached = await cache.match(cacheKey);
  if (cached) return cached;

  const errors = [];
  const token = env.CF_API_TOKEN || env.CLOUDFLARE_API_TOKEN;

  if (token) {
    try {
      const accountTag = await resolveAccountId(token, env);
      const siteTag = await resolveSiteTag(token, accountTag);
      const days = await fetchRumDays(token, accountTag, siteTag);
      const response = json(payloadFromDays(days, 'web_analytics'));
      try {
        await cache.put(cacheKey, response.clone());
      } catch {
        // ignore cache write failures
      }
      return response;
    } catch (err) {
      errors.push(`rum:${err instanceof Error ? err.message : String(err)}`);
    }

    try {
      const days = await fetchZoneDays(token, env);
      const response = json(payloadFromDays(days, 'zone_analytics'));
      try {
        await cache.put(cacheKey, response.clone());
      } catch {
        // ignore
      }
      return response;
    } catch (err) {
      errors.push(`zone:${err instanceof Error ? err.message : String(err)}`);
    }
  } else {
    errors.push('missing_token');
  }

  try {
    const days = await fetchKvDays(env);
    const response = json(payloadFromDays(days, 'worker_kv'), 200, {
      'cache-control': 'public, max-age=60',
    });
    return response;
  } catch (err) {
    errors.push(`kv:${err instanceof Error ? err.message : String(err)}`);
  }

  return json(
    {
      ok: false,
      error: 'analytics_fetch_failed',
      message: errors.join(' | '),
    },
    502,
    { 'cache-control': 'no-store' },
  );
}
