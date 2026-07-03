# Kit Technology — Website công ty

Site giới thiệu **Kit Technology** — công ty công nghệ mẹ của [Novixa](https://novixa.vn).

- **Domain dự kiến:** [kittechnology.vn](https://kittechnology.vn)
- **Ngôn ngữ:** Tiếng Việt (`/vi/…`). Khung i18n sẵn; **English chưa publish**.
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

## Deploy (Cloudflare Pages)

1. Push repo lên GitHub (repo riêng `Kit-Technology`).
2. Import project → **Root directory:** `/` (repo root)
3. Build: `npm run build` — Output: `dist`
4. Gán domain `kittechnology.vn` / `www.kittechnology.vn` trong DNS.

## Cấu trúc

```
Kit-Technology/
  src/
    i18n/vi.json         # Chuỗi UI tiếng Việt
    pages/vi/            # Trang công khai
      index.astro        # Trang chủ
      ve-chung-toi.astro # Về Kit Technology
      san-pham.astro     # Sản phẩm (Novixa)
      lien-he.astro      # Liên hệ
  public/images/         # Logo SVG, OG banner
```

## Trang

| URL | Nội dung |
|-----|----------|
| `/vi` | Trang chủ — giới thiệu công ty, giá trị cốt lõi |
| `/vi/ve-chung-toi` | Sứ mệnh, tầm nhìn |
| `/vi/san-pham` | Novixa và lộ trình sản phẩm |
| `/vi/lien-he` | Form liên hệ |

## Liên hệ & form

- Hotline: 0984.660.399
- Email: khiemtic@gmail.com
- Form gửi qua [Formsubmit](https://formsubmit.co) — lần đầu cần xác nhận email.

## Quy tắc khi sửa

1. Dự án độc lập — không phụ thuộc repo PharmaCore hay novixa-site
2. Liên kết Novixa → `https://novixa.vn/vi` (website sản phẩm riêng)
3. Cập nhật nội dung trong `src/i18n/vi.json`
