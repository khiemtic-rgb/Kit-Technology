/**
 * Cloudflare Zone Analytics → JSON for /api/stats/
 * Env: CF_API_TOKEN (Account API token with Analytics:Read + Zone:Read)
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

async function resolveZoneId(token, env) {
  if (env.CF_ZONE_ID) return env.CF_ZONE_ID;
  const zones = await cfGet(`/zones?name=${encodeURIComponent(HOST)}`, token);
  const zone = Array.isArray(zones) ? zones[0] : null;
  if (!zone?.id) throw new Error(`Zone not found: ${HOST}`);
  return zone.id;
}

function sumDays(days, n) {
  const slice = days.slice(-n);
  return {
    requests: slice.reduce((a, d) => a + d.requests, 0),
    pageViews: slice.reduce((a, d) => a + d.pageViews, 0),
    visitors: slice.reduce((a, d) => a + d.visitors, 0),
  };
}

export async function handleStatsApi(request, env) {
  const token = env.CF_API_TOKEN || env.CLOUDFLARE_API_TOKEN;
  if (!token) {
    return json(
      {
        ok: false,
        error: 'missing_token',
        message: 'CF_API_TOKEN not configured on Worker',
      },
      503,
      { 'cache-control': 'no-store' },
    );
  }

  const cache = caches.default;
  const cacheKey = new Request(new URL('/api/stats/cache-v1', request.url).toString(), request);
  const cached = await cache.match(cacheKey);
  if (cached) return cached;

  try {
    const zoneTag = await resolveZoneId(token, env);
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
    const days = groups.map((g) => ({
      date: g.dimensions.date,
      requests: g.sum?.requests ?? 0,
      pageViews: g.sum?.pageViews ?? 0,
      visitors: g.uniq?.uniques ?? 0,
    }));

    const today = days[days.length - 1] || { requests: 0, pageViews: 0, visitors: 0 };
    const payload = {
      ok: true,
      host: HOST,
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

    const response = json(payload);
    try {
      await cache.put(cacheKey, response.clone());
    } catch {
      // ignore cache write failures
    }
    return response;
  } catch (err) {
    return json(
      {
        ok: false,
        error: 'analytics_fetch_failed',
        message: err instanceof Error ? err.message : String(err),
      },
      502,
      { 'cache-control': 'no-store' },
    );
  }
}
