# Kit Technology — Website kittechnology.vn

> Repo độc lập: `E:\Kit-Technology`
> Deploy: Cloudflare Pages (root `/`, output `dist`)

## MỤC ĐÍCH

Website công ty mẹ **Kit Technology** — giới thiệu công ty, portfolio sản phẩm (Novixa), liên hệ hợp tác.

## LỊCH SỬ CHAT (từ PharmaCore)

1. Tạo dự án Astro website Kit Technology (mô hình novixa-site)
2. User yêu cầu **tách ra repo độc lập** — không nằm trong PharmaCore
3. Đã chuyển sang `E:\Kit-Technology`, xóa `PharmaCore/kit-technology-site`
4. `git init` tại E:\Kit-Technology — chưa commit, chưa push GitHub

## ĐÃ LÀM

- Astro static site, port dev `4322`
- Trang: `/vi`, `/vi/ve-chung-toi`, `/vi/san-pham`, `/vi/lien-he`
- i18n: `src/i18n/vi.json`
- Logo & OG: SVG placeholder trong `public/images/`
- Form liên hệ: Formsubmit → `khiemtic@gmail.com`
- `.gitignore`, README, `.cursor/rules/kit-technology-site.mdc`
- Build verified: `npm run build` → `dist/` (5 trang)

## CHƯA LÀM

- Commit đầu tiên + push GitHub repo riêng
- Deploy Cloudflare Pages + DNS kittechnology.vn
- English route
- Cloudflare Web Analytics token
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
