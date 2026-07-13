---
title: 'Quan sát hệ thống SaaS'
description: 'Observability trong SaaS — log, metric, trace giúp KIT Technology vận hành Novixa ổn định, phát hiện sự cố sớm và cải thiện trải nghiệm nhà thuốc.'
locale: vi
category: technology
section: technology
publishDate: 2026-07-11
draft: false
translationId: tech-observability
tags: ['observability', 'devops', 'saas', 'monitoring']
keywords: ['quan sát hệ thống SaaS', 'observability', 'monitoring SaaS', 'log metric trace', 'KIT Technology', 'Novixa']
heroImage: '/images/insights/pool/technology/02-cloud.png'
targetWords: 1400
---

## Observability khác monitoring thế nào?

**Monitoring** trả lời: “Hệ thống có đang đỏ không?” — CPU cao, lỗi 500, disk đầy.  
**Observability** trả lời sâu hơn: “Vì sao khách/nhà thuốc đang gặp vấn đề này?” — nhờ dữ liệu đủ để suy luận nguyên nhân mà không cần đoán mò.

Với SaaS như **Novixa** (KIT Technology), một sự cố không chỉ là server down. Đó có thể là:

- POS chậm tại một chi nhánh lúc cao điểm
- Đồng bộ tồn kho lệch giữa app và backend
- API timeout khi đối tác gọi tích hợp
- Thanh toán thành công nhưng báo cáo chưa cập nhật

Không có quan sát tốt, đội kỹ thuật chỉ “restart và cầu may”.

## Ba trụ cột: logs, metrics, traces

| Trụ cột | Vai trò | Ví dụ trong Novixa |
|---------|---------|-------------------|
| **Logs** | Sự kiện có ngữ cảnh | Lỗi nhập kho, fail OTP, reject FEFO |
| **Metrics** | Số đo theo thời gian | Latency API, RPS, tỷ lệ lỗi, queue depth |
| **Traces** | Đường đi của một request | Từ app Flutter → API → DB → dịch vụ phụ |

Ba lớp này bổ sung nhau. Chỉ metric thì biết “chậm”; có trace mới biết chậm ở query nào; có log mới biết dữ liệu đầu vào sai chỗ nào.

## Vì sao SaaS nhà thuốc cần observability?

1. **Đa chi nhánh, đa thiết bị** — sự cố có thể chỉ xảy ra trên một POS Android cụ thể.
2. **Dữ liệu nhạy cảm** — cần phát hiện bất thường truy cập mà không lộ PII trong log thô.
3. **SLA kinh doanh** — quầy không bán được là mất doanh thu ngay trong giờ cao điểm.
4. **Phát hành liên tục** — mỗi deploy cần tín hiệu sớm nếu regression.

## Nguyên tắc thiết kế observability tại KIT

### 1. Đo những gì khách thực sự cảm nhận

Ưu tiên **golden signals**:

- Latency (P50 / P95 / P99) theo endpoint quan trọng: bán hàng, tra tồn, thanh toán
- Traffic (request/phút)
- Errors (4xx/5xx có phân loại)
- Saturation (CPU, connection pool, queue)

Dashboard “đẹp” nhưng không gắn hành trình người dùng thì ít giá trị khi on-call.

### 2. Correlation ID xuyên suốt

Mỗi request từ client mang một **request id**. Log API, log worker, và trace span cùng id đó. Khi chủ nhà thuốc báo “đơn #123 bị treo”, kỹ sư tìm theo id thay vì đọc hàng nghìn dòng log lẫn lộn.

### 3. Log có cấu trúc, có mức độ

JSON structured logs với mức `info` / `warn` / `error`. Không log mật khẩu, token, số thẻ. Mask số điện thoại / CCCD khi cần điều tra.

### 4. Alert actionable

Alert phải:

- Có runbook ngắn (“kiểm tra pool DB → scale → rollback”)
- Có ngưỡng theo hành vi thật (P95 bán hàng > 2s trong 5 phút)
- Tránh alert storm — gom theo dịch vụ / chi nhánh

Alert “CPU > 70%” suốt ngày chỉ tạo mệt mỏi, không tạo độ tin cậy.

## Observability trong kiến trúc cloud-native

KIT vận hành SaaS trên nền cloud / container. Observability gắn với:

- **Health checks** và readiness — traffic chỉ vào instance khỏe
- **Distributed tracing** giữa API gateway, service, PostgreSQL
- **Synthetic checks** — định kỳ gọi luồng “đăng nhập → mở ca → bán 1 đơn thử” từ bên ngoài
- **Deploy markers** — mỗi bản phát hành đánh dấu trên biểu đồ metric để soi regression

Khi có sự cố sau deploy, câu hỏi đầu tiên là: “Bắt đầu từ marker phiên bản nào?”

## Liên hệ với bảo mật và tuân thủ

Observability không đối lập security:

- Audit log cho thao tác nhạy cảm (đổi giá, xóa lô, xuất báo cáo)
- Phân quyền xem log theo môi trường / tenant
- Giữ retention đủ để điều tra, không giữ vô hạn dữ liệu cá nhân

Với nhà thuốc, khả năng giải thích “ai sửa tồn lúc nào” đôi khi quan trọng bằng uptime.

## Lợi ích kinh doanh đo được

- Giảm MTTD / MTTR (phát hiện và khắc phục nhanh hơn)
- Ít “sự cố im lặng” — khách bỏ app trước khi team biết
- Deploy tự tin hơn → vòng lặp sản phẩm nhanh hơn
- Dữ liệu thực tế để ưu tiên tối ưu (endpoint nào thật sự chậm)

## Cạm bẫy thường gặp

- Thu thập mọi thứ rồi không ai đọc
- Log plaintext không cấu trúc
- Trace sampling quá thấp ở luồng thanh toán
- Dashboard theo server, không theo hành trình nghiệp vụ
- Coi APM trả phí là đủ mà thiếu synthetic + runbook

## Kết luận

**Quan sát hệ thống SaaS** là năng lực vận hành: biết hệ thống đang sống thế nào qua mắt người dùng thật. KIT Technology xây Novixa với giả định sự cố sẽ xảy ra — và đội kỹ thuật phải **nhìn thấy đủ để sửa đúng chỗ, đúng lúc**. Monitoring báo đỏ; observability giúp hiểu vì sao đỏ — đó là khác biệt giữa SaaS “chạy demo” và SaaS sẵn sàng cho chuỗi nhà thuốc.
