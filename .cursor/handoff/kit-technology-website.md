# Kit Technology — Website kittechnology.vn

> Repo độc lập: `E:\Kit-Technology`
> Deploy: Cloudflare Pages (root `/`, output `dist`)

## MỤC ĐÍCH

Website công ty mẹ **Kit Technology** — giới thiệu công ty, portfolio sản phẩm (Novixa), liên hệ hợp tác.

## LỊCH SỬ CHAT (từ PharmaCore)

1. Tạo dự án Astro website Kit Technology (mô hình novixa-site)
2. User yêu cầu **tách ra repo độc lập** — không nằm trong PharmaCore
3. Đã chuyển sang `E:\Kit-Technology`, xóa `PharmaCore/kit-technology-site`
4. `git init` tại E:\Kit-Technology — commit initial đã có, chưa push GitHub

## ĐÃ LÀM

- Astro static site, port dev `4322`
- Trang VI: `/vi`, `/vi/ve-chung-toi`, `/vi/san-pham`, `/vi/lien-he`
- Trang EN: `/en`, `/en/about`, `/en/products`, `/en/contact`
- i18n: `src/i18n/vi.json`, `src/i18n/en.json`, `src/lib/routes.ts`
- Lang switcher header + hreflang alternate links
- Logo & OG: SVG placeholder trong `public/images/`
- Form liên hệ: Formsubmit → `khiemtic@gmail.com`
- Cloudflare Pages headers: `public/_headers`
- `.env.example` cho Web Analytics token
- `.gitignore`, README, `.cursor/rules/kit-technology-site.mdc`
- Build verified: `npm run build` → `dist/` (9 trang)

## CHƯA LÀM

- Push GitHub repo riêng + remote origin
- Deploy Cloudflare Pages + DNS kittechnology.vn
- Cloudflare Web Analytics token (set `PUBLIC_CF_WEB_ANALYTICS_TOKEN` trên CF Pages)
- Logo PNG thật (hiện dùng SVG placeholder)

## LOCAL

```powershell
cd E:\Kit-Technology
npm install
npm run dev   # http://localhost:4322/vi
npm run build
```

## STARTER CHO CHAT MỚI

```
Đọc `.cursor/handoff/kit-technology-website.md` và tiếp tục website Kit Technology.
Phạm vi: repo E:\Kit-Technology — không PharmaCore, không novixa-site.
```
