---
title: 'Tầng dữ liệu và báo cáo'
description: 'Tầng dữ liệu và báo cáo trong SaaS — mô hình dữ liệu, kho vận hành, dashboard và cách KIT Technology thiết kế báo cáo cho Novixa nhà thuốc.'
locale: vi
category: technology
section: technology
publishDate: 2026-07-12
draft: false
translationId: tech-data
tags: ['data', 'reporting', 'postgresql', 'saas']
keywords: ['tầng dữ liệu', 'báo cáo SaaS', 'dashboard nhà thuốc', 'PostgreSQL', 'KIT Technology', 'Novixa']
heroImage: '/images/insights/pool/technology/03-data.png'
targetWords: 1400
---

## Tầng dữ liệu là gì trong sản phẩm SaaS?

**Tầng dữ liệu** (data layer) là phần hệ thống chịu trách nhiệm lưu trữ, truy vấn, bảo vệ và biến dữ liệu thành thông tin quyết định. Với SaaS như **Novixa**, tầng dữ liệu không chỉ là “cơ sở dữ liệu” — mà gồm:

- Mô hình nghiệp vụ (sản phẩm, lô, tồn kho, đơn hàng, khách hàng)
- Quy tắc nhất quán theo tenant / chi nhánh
- API đọc–ghi ổn định cho POS, app khách, admin
- Lớp báo cáo và dashboard cho chủ nhà thuốc

KIT Technology thiết kế tầng dữ liệu theo hướng **PostgreSQL + schema rõ ràng + RLS theo workspace**, để vừa vận hành realtime vừa phục vụ báo cáo mà không phá vỡ dữ liệu gốc.

## Ba lớp dữ liệu nên tách rõ

### 1. Dữ liệu vận hành (OLTP)

Đây là dữ liệu “đang chạy”: bán hàng, nhập kho, điều chuyển, điểm thưởng. Đặc điểm:

- Ghi nhiều, đọc nhanh theo giao dịch
- Cần transaction, khóa tối thiểu, index đúng chỗ
- Sai một dòng có thể ảnh hưởng tồn kho và doanh thu

### 2. Dữ liệu phân tích / báo cáo

Báo cáo doanh thu theo ngày, top sản phẩm, tồn chậm, hạn dùng sắp hết — thường đọc nhiều, ít ghi. Nếu query nặng chạy thẳng lên bảng vận hành lúc giờ cao điểm, POS sẽ chậm.

Cách làm thực tế tại KIT:

- View / projection cho báo cáo (`pack_pharmacy.v_*` kiểu strangler)
- Aggregate theo ngày/chi nhánh khi cần
- Giữ nguồn sự thật ở bảng nghiệp vụ, không “sửa báo cáo tay”

### 3. Sự kiện và audit

Mọi thay đổi quan trọng (hoàn tất đơn, tạo khách, nộp khảo sát) nên có **event / audit trail**. Lợi ích:

- Truy vết “ai làm gì, lúc nào”
- Đồng bộ sang hệ thống khác (webhook, CRM)
- Tái hiện báo cáo khi cần kiểm toán

## Báo cáo nhà thuốc cần những gì?

Chủ nhà thuốc và quản lý chuỗi thường hỏi:

- Doanh thu hôm nay / tuần / tháng theo chi nhánh?
- Sản phẩm bán chạy và sản phẩm ứ đọng?
- Lô nào sắp hết hạn, cần ưu tiên bán?
- Công nợ nhà cung cấp và công nợ khách?
- Hiệu quả khuyến mại / loyalty?

Novixa hướng tới trả lời các câu hỏi đó **trong cùng hệ thống bán hàng**, không bắt xuất Excel rồi xử lý thủ công mỗi tối.

## Nguyên tắc thiết kế báo cáo đúng

1. **Một nguồn sự thật** — không copy số liệu sang sheet riêng rồi quên cập nhật.
2. **Đúng ngữ cảnh tenant** — chuỗi A không thấy dữ liệu chuỗi B.
3. **Hiểu đơn vị đo** — số lượng theo đơn vị bán, doanh thu theo VAT hay chưa VAT.
4. **Thời gian nhất quán** — timezone Việt Nam cho “hôm nay”, không lệch UTC.
5. **Tốc độ đủ dùng** — dashboard mở dưới vài giây trên dữ liệu thực.

## PostgreSQL và báo cáo realtime

KIT chọn **PostgreSQL** vì:

- SQL mạnh, index, JSONB khi cần metadata
- View và materialized view linh hoạt
- RLS hỗ trợ multi-tenant
- Dễ kết hợp với Dapper/.NET hoặc Node cho API

Khi báo cáo nặng, có thể:

- Materialize theo lịch (đêm)
- Đọc từ view đã tối ưu cột
- Cache kết quả dashboard ngắn hạn

## Sai lầm thường gặp

- Gắn quá nhiều JOIN phức tạp vào mỗi request POS
- Lưu “tổng doanh thu” trùng lặp không đồng bộ với đơn hàng
- Báo cáo hard-code theo một khách, khó tái sử dụng cho chuỗi khác
- Không có định nghĩa metric rõ (gross vs net, hoàn trả đã trừ chưa)

## Kết luận

Tầng dữ liệu tốt là nền để SaaS nhà thuốc **bán nhanh và quản trị đúng**. Báo cáo không phải lớp trang trí — nó phải bám sát giao dịch thật. KIT Technology xây Novixa với PostgreSQL, schema theo pack/kernel, và các view đọc báo cáo để chủ nhà thuốc thấy số liệu tin cậy mà không làm chậm quầy bán.
