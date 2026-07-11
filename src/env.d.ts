/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_CF_WEB_ANALYTICS_TOKEN?: string;
  /** Google Search Console HTML tag verification code (content=...) */
  readonly PUBLIC_GOOGLE_SITE_VERIFICATION?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
