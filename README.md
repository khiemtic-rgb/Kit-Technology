# Kit Technology — Website công ty

Site giới thiệu **Kit Technology** — công ty công nghệ mẹ của [Novixa](https://novixa.vn).

- **Domain:** [kittech.vn](https://kittech.vn)
- **Ngôn ngữ:** Tiếng Việt (`/vi/…`) và English (`/en/…`).
- **Stack:** Astro 6 (static site)

## Chạy local

```powershell
cd E:\Kit-Technology
npm install
npm run dev
```

Mở http://localhost:4322 → redirect `/vi`.

## Build

```powershell
npm run build
npm run preview
```

## Deploy (Cloudflare Workers — static assets)

Site tĩnh Astro 6 deploy qua **Wrangler** (không cần `@astrojs/cloudflare` adapter).

1. Push repo lên GitHub
2. Cloudflare → **Workers & Pages** → **Import repository** → chọn repo
3. **Build command:** `npm run build`
4. **Deploy command:** `npm run cf:deploy`  
   (hoặc `npx wrangler deploy --config wrangler.jsonc` — bắt buộc có `--config` để tắt autoconfig Astro)
5. Env: `NODE_VERSION` = `22`
6. Gán domain `kittech.vn` trong tab **Domains**

File cấu hình: `wrangler.jsonc` (upload thư mục `dist/`).

## Cấu trúc

```
Kit-Technology/
  src/
    i18n/vi.json         # Chuỗi UI tiếng Việt
    i18n/en.json         # Chuỗi UI English
    pages/vi/            # Trang tiếng Việt
    pages/en/            # Trang English
  public/images/         # Logo SVG, OG banner
```

## Trang

| URL | Nội dung |
|-----|----------|
| `/vi` | Trang chủ — giới thiệu công ty, giá trị cốt lõi |
| `/vi/ve-chung-toi` | Sứ mệnh, tầm nhìn |
| `/vi/san-pham` | Novixa và lộ trình sản phẩm |
| `/vi/lien-he` | Form liên hệ |
| `/en` | Home — company overview |
| `/en/about` | Mission & vision |
| `/en/products` | Novixa & product roadmap |
| `/en/contact` | Contact form |

## Liên hệ & form

- Hotline: 0984.660.399
- Email: khiemtic@gmail.com
- Form gửi qua [Formsubmit](https://formsubmit.co) — lần đầu cần xác nhận email.

## Quy tắc khi sửa

1. Dự án độc lập — không phụ thuộc repo PharmaCore hay novixa-site
2. Liên kết Novixa → `https://novixa.vn/vi` (website sản phẩm riêng)
3. Cập nhật nội dung trong `src/i18n/vi.json`
