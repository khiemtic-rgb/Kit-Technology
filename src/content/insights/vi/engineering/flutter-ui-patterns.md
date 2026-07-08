---
title: 'Flutter UI patterns'
description: 'Các pattern UI Flutter KIT Technology dùng khi xây Novixa và ứng dụng mobile doanh nghiệp — nhất quán, nhanh, dễ bảo trì.'
locale: vi
category: engineering
section: insights
publishDate: 2026-07-03
draft: false
translationId: eng-flutter-ui
tags: ['flutter', 'engineering', 'ui']
heroImage: '/images/insights/pool/technology/01-mobile.png'
targetWords: 1300
---

## Vì sao Flutter cho sản phẩm doanh nghiệp?

KIT Technology chọn **Flutter** để ship **một codebase** cho iOS, Android và desktop — phù hợp POS, app khách hàng và công cụ nội bộ cần UI mượt, offline một phần, và release nhanh.

## Pattern chúng tôi áp dụng

### 1. Design tokens tập trung

Màu, typography, spacing định nghĩa một lần — màn hình mới kế thừa, tránh “mỗi dev một kiểu”.

### 2. Composition over inheritance

Widget nhỏ, tái sử dụng: `PrimaryButton`, `FormField`, `EmptyState`, `LoadingOverlay`.

### 3. State rõ ràng

Tách UI và logic: Riverpod/Provider cho state app; repository cho API; tránh business logic trong `build()`.

### 4. Responsive layout

POS tablet, điện thoại dược sĩ, app khách — cùng component, khác breakpoint.

### 5. Error & empty states

Mọi list/form đều có trạng thái lỗi mạng, empty, retry — quan trọng trong môi trường nhà thuốc connectivity không ổn định.

## Liên quan Novixa

Giao diện Novixa POS và app khách dùng chung hệ design — khách chuỗi nhận diện thương hiệu, đội support giảm thời gian đào tạo.

## Kết luận

Flutter UI patterns tốt giúp **ship nhanh mà không nợ kỹ thuật UI** — phù hợp sản phẩm SaaS cần iterate liên tục.
