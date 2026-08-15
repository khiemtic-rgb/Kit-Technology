---
title: 'Case study Novixa'
description: 'Case study chi tiết về triển khai Novixa: Giải pháp SaaS tối ưu vận hành tồn kho, tự động liên thông Dược quốc gia và nâng cao hiệu quả chuỗi nhà thuốc.'
locale: vi
category: products
section: products
publishDate: 2026-08-16
draft: false
translationId: nv-case
tags: ['novixa', 'phan-mem-nha-thuoc', 'chuyen-doi-so-y-te', 'case-study']
keywords: ['case study novixa', 'phần mềm quản lý nhà thuốc novixa', 'quản lý tồn kho dược phẩm', 'liên thông cơ sở dữ liệu dược quốc gia', 'chuyển đổi số nhà thuốc']
heroImage: '/images/insights/pool/business/01-platform.png'
targetWords: 1400
---

## Bối cảnh và bài toán thực tế của các nhà thuốc bán lẻ tại Việt Nam

Thị trường bán lẻ dược phẩm tại Việt Nam đang trải qua giai đoạn chuyển giao mang tính quyết định. Sự xuất hiện và mở rộng thần tốc của các chuỗi nhà thuốc hiện đại tạo ra áp lực cạnh tranh gay gắt đối với hàng chục nghìn nhà thuốc truyền thống và chuỗi quy mô vừa và nhỏ (SMB). Để duy trì năng lực cạnh tranh và đáp ứng các tiêu chuẩn khắt khe từ cơ quan quản lý, chuyển đổi số không còn là một lựa chọn mở rộng mà đã trở thành điều kiện sống còn.

Trong quá trình khảo sát và làm việc thực địa cùng nhiều chủ cơ sở kinh doanh dược, đội ngũ phát triển tại KIT Technology nhận thấy các rào cản vận hành phổ biến thường tập trung vào ba nhóm vấn đề cốt lõi:

*   **Quản trị tồn kho và kiểm soát hạn dùng (FEFO):** Do đặc thù ngành dược có hàng nghìn mã sản phẩm (SKU) với nhiều số lô và hạn sử dụng khác nhau, việc quản lý thủ công hoặc dùng các phần mềm kế toán thông thường dễ dẫn đến tình trạng xuất hàng không theo nguyên tắc *Hạn gần - Xuất trước (First Expired, First Out)*. Hậu quả là tỷ lệ hàng cận date hoặc hủy do hết hạn gây thâm hụt đáng kể vào biên lợi nhuận.
*   **Áp lực tuân thủ quy định và liên thông Dược quốc gia:** Việc đồng bộ dữ liệu hóa đơn nhập, xuất và đơn thuốc lên Cơ sở dữ liệu Dược Quốc gia theo chuẩn Thực hành tốt nhà thuốc (GPP) thường tiêu tốn hàng giờ làm việc mỗi ngày của dược sĩ. Khi phát sinh sai lệch thông tin hoặc mã liên thông không khớp, rủi ro bị phạt hành chính hoặc gián đoạn hoạt động là rất lớn.
*   **Quy trình bán hàng và tư vấn còn phân mảnh:** Dược sĩ tại quầy thường mất nhiều thời gian tra cứu hoạt chất, biệt dược thay thế hoặc thông tin liều dùng. Việc nhập liệu đơn thuốc dài bằng tay làm tăng thời gian chờ đợi của khách hàng và dễ phát sinh nhầm lẫn trong đơn hàng.

Trước bài toán đó, nền tảng Novixa được thiết kế nhằm mang lại một giải pháp quản trị tổng thể, kết hợp công nghệ đám mây (Cloud) và tự động hóa thông minh để giải quyết triệt để các nút thắt này.

## Giải pháp kiến trúc và tính năng từ Novixa

Novixa được định vị là nền tảng SaaS chuyên biệt hóa cho ngành bán lẻ y tế, xây dựng trên nguyên tắc tinh gọn (lean), ổn định và chú trọng vào trải nghiệm người dùng (UX) của dược sĩ đứng quầy. Thay vì cố gắng đưa vào các tính năng cồng kềnh của hệ thống ERP doanh nghiệp lớn, Novixa tập trung sâu vào tối ưu hóa dòng chảy hàng hóa và dữ liệu y tế.

### 1. Tự động hóa liên thông Cơ sở dữ liệu Dược Quốc gia
Thay vì yêu cầu nhân viên phải thao tác sao chép thủ công từng đơn hàng, Novixa tích hợp cơ chế đồng bộ nền hai chiều qua API. Hệ thống tự động chuẩn hóa mã thuốc quốc gia, kiểm tra tính hợp lệ của dữ liệu trước khi đẩy lên cổng thông tin của Cục Quản lý Dược. Khi xảy ra sự cố mạng hoặc lỗi từ cổng dữ liệu chung, hệ thống lưu trữ hàng đợi (queue) và tự động thử lại (retry), đảm bảo không thất thoát dữ liệu và giảm thiểu tối đa áp lực báo cáo cho chủ nhà thuốc.

### 2. Quản lý kho thông minh theo số lô và hạn dùng
Novixa áp dụng chặt chẽ cơ chế FEFO trong toàn bộ luồng xuất kho và bán lẻ. Khi dược sĩ tạo đơn, hệ thống tự động ưu tiên gợi ý các lô hàng có hạn dùng gần nhất nhưng vẫn đảm bảo chất lượng. Bên cạnh đó, tính năng cảnh báo hàng cận date theo các mốc 30, 60, 90 ngày giúp người quản lý chủ động lên kế hoạch luân chuyển hàng hóa hoặc đề xuất chính sách chiết khấu xả hàng kịp thời.

### 3. Trợ lý nhập liệu và bóc tách đơn thuốc ứng dụng AI
Tận dụng năng lực công nghệ AI-first từ KIT Technology, Novixa tích hợp mô hình nhận diện ký tự quang học (OCR) được tinh chỉnh riêng cho hóa đơn dược và đơn thuốc bác sĩ. Dược sĩ chỉ cần quét hoặc chụp ảnh hóa đơn đầu vào từ nhà phân phối, hệ thống sẽ tự động bóc tách số lô, hạn dùng, số lượng và quy đổi đơn vị tính (hộp, vỉ, viên) vào hệ thống trong vài giây, giảm thiểu sai sót do nhập liệu thủ công.

## Quá trình triển khai thực tế và chuyển giao vận hành

Một trong những thách thức lớn nhất của các dự án SaaS trong ngành y tế không nằm ở công nghệ, mà nằm ở giai đoạn tiếp nhận của đội ngũ nhân sự vốn đã quen với thói quen ghi chép sổ sách hoặc các phần mềm cũ. Trong một dự án triển khai điển hình cho chuỗi gồm 6 nhà thuốc tại khu vực miền Nam, Novixa đã áp dụng lộ trình chuyển đổi 3 bước rõ ràng:

### Giai đoạn 1: Chuẩn hóa và làm sạch dữ liệu danh mục (Master Data)
Trước khi đưa hệ thống vào vận hành, dữ liệu hơn 4.000 danh mục thuốc và thực phẩm chức năng từ hệ thống cũ được trích xuất để chuẩn hóa danh pháp, hoạt chất, quy cách đóng gói và khớp nối với mã chuẩn Dược Quốc gia. Việc chuẩn hóa dữ liệu đầu vào là bước nền móng bắt buộc để các tính năng tự động hóa phía sau hoạt động chính xác.

### Giai đoạn 2: Triển khai thí điểm (Pilot) và đào tạo tại chỗ
Novixa được kích hoạt thí điểm tại một điểm bán có lưu lượng khách hàng trung bình để kiểm tra tính tương thích với thói quen thao tác của dược sĩ. Đội ngũ kỹ thuật hỗ trợ trực tiếp tại quầy nhằm xử lý ngay các tình huống phát sinh, đồng thời tinh chỉnh phím tắt và luồng thanh toán POS nhằm đảm bảo thời gian tạo một đơn hàng thông thường không vượt quá 30 giây.

### Giai đoạn 3: Đồng bộ toàn chuỗi và phân quyền quản trị tập trung
Sau giai đoạn thí điểm kéo dài 2 tuần, hệ thống được nhân rộng cho toàn bộ 5 chi nhánh còn lại. Chủ chuỗi nhà thuốc được bàn giao dashboard quản trị tập trung, cho phép theo dõi doanh thu theo thời gian thực, quản lý hạn mức tồn kho giữa các cơ sở và thực hiện điều chuyển hàng hóa nội bộ chỉ với vài cú nhấp chuột.

## Kết quả thực tiễn và tác động vận hành

Theo kinh nghiệm vận hành và theo dõi từ các đơn vị đã áp dụng Novixa sau chu kỳ từ 3 đến 6 tháng, các chỉ số hiệu quả kinh doanh và quản trị đã ghi nhận những cải thiện rõ nét:

*   **Tiết kiệm thời gian quản trị:** Thời gian trung bình dành cho việc kiểm kho định kỳ và báo cáo số liệu liên thông giảm từ hàng giờ xuống còn khoảng 15-20 phút mỗi ngày nhờ cơ chế đồng bộ tự động.
*   **Kiểm soát thất thoát và hao hụt:** Nhờ quản lý chặt chẽ theo số lô và cơ chế FEFO, tỷ lệ hàng hóa phải tiêu hủy do hết hạn tại các cơ sở giảm đáng kể, giúp bảo toàn biên lợi nhuận ròng của ngành bán lẻ thuốc vốn chỉ dao động ở mức vừa phải.
*   **Nâng cao trải nghiệm khách hàng:** Tốc độ thanh toán nhanh và lịch sử dùng thuốc của khách quen được lưu trữ chi tiết giúp dược sĩ dễ dàng cá nhân hóa lời khuyên sử dụng thuốc, gia tăng tỷ lệ khách hàng quay lại cơ sở.
*   **Minh bạch số liệu điều hành:** Chủ cơ sở không còn phụ thuộc vào báo cáo tổng hợp cuối tuần mà có thể nắm bắt chính xác dòng tiền, công nợ nhà cung cấp và tồn kho tức thời từ bất kỳ đâu thông qua ứng dụng di động.

## Bài học kinh nghiệm và định hướng phát triển AI trong y tế bán lẻ

Từ quá trình triển khai thực tế của Novixa, KIT Technology rút ra một số bài học kinh nghiệm quan trọng cho các doanh nghiệp đang tìm kiếm giải pháp chuyển đổi số:

*   **Tính đơn giản quyết định tỷ lệ thành công:** Một phần mềm dù có nhiều tính năng đến đâu nhưng giao diện phức tạp, gây trở ngại cho thao tác bán hàng trực tiếp đều sẽ gặp kháng cự lớn từ nhân viên. Tối ưu hóa UI/UX cho người trực tiếp đứng quầy là chìa khóa then chốt.
*   **Dữ liệu phải đi liền với hành động:** Việc thu thập số liệu bán hàng chỉ thực sự có ý nghĩa nếu hệ thống đưa ra được các gợi ý cụ thể, chẳng hạn như tự động lập danh sách đề xuất nhập hàng dựa trên tốc độ tiêu thụ (run-rate) của từng mã thuốc trong 30 ngày gần nhất.

Trong các giai đoạn phát triển tiếp theo, Novixa tiếp tục hoàn thiện các mô hình học máy (Machine Learning) phục vụ việc dự báo nhu cầu thị trường theo mùa dịch tễ, hỗ trợ nhà thuốc tối ưu hóa vốn lưu động lưu trữ trong kho và nâng cao năng lực chăm sóc sức khỏe cộng đồng một cách bền vững.
