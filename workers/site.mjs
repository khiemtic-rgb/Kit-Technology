/**
 * Cloudflare Worker — static assets + SEO redirects + cron → GitHub Actions.
 * One-time setup: Cloudflare Dashboard → Workers → kittech → Settings → Variables
 *   GITHUB_PAT = fine-grained token with Actions: read + write on this repo
 */
async function triggerGithubWorkflow(env) {
  if (!env.GITHUB_PAT) {
    console.warn('GITHUB_PAT not set — skip workflow dispatch');
    return;
  }

  const res = await fetch(
    'https://api.github.com/repos/khiemtic-rgb/Kit-Technology/actions/workflows/scheduled-publish.yml/dispatches',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.GITHUB_PAT}`,
        Accept: 'application/vnd.github+json',
        'Content-Type': 'application/json',
        'User-Agent': 'kittech-cron-worker',
      },
      body: JSON.stringify({ ref: 'main' }),
    },
  );

  if (!res.ok) {
    console.error('GitHub dispatch failed', res.status, await res.text());
  } else {
    console.log('GitHub workflow dispatched');
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Prefer apex host (avoid www + non-www duplicates in Google).
    if (url.hostname === 'www.kittech.vn') {
      url.hostname = 'kittech.vn';
      return Response.redirect(url.toString(), 301);
    }

    if (url.pathname === '/' || url.pathname === '') {
      return Response.redirect(`${url.origin}/vi/`, 301);
    }

    // Permanent trailing slash — Cloudflare static dirs return 200 on /path/, 307 without.
    const isFile = /\.[a-zA-Z0-9]+$/.test(url.pathname);
    if (!isFile && !url.pathname.endsWith('/')) {
      url.pathname = `${url.pathname}/`;
      return Response.redirect(url.toString(), 301);
    }

    return env.ASSETS.fetch(request);
  },

  async scheduled(event, env, ctx) {
    ctx.waitUntil(triggerGithubWorkflow(env));
  },
};
