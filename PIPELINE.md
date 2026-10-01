# PIPELINE — trạng thái video

Admin cập nhật file này mỗi khi status đổi. Scheduled task đọc file này để biết việc cần làm.

Status: `IDEA` → `PROMPTS_READY` → `IMAGES_READY` → `IN_REVIEW` → `APPROVED` / `REVISE` → `SCHEDULED` → `PUBLISHED`

## Kế hoạch tuần 40 (lập 2026-10-01 — lần chạy đầu, tuần bắt đầu muộn nên lịch kéo sang đầu W41)

**3 video dự kiến đăng** (giờ Portland; điều kiện: ảnh xong + Huynh duyệt):
| Ngày gợi ý | Video | Lý do thứ tự |
|---|---|---|
| Thứ Bảy 2026-10-03 | VGC-2026-W40-01 — Before→After phòng khách split-level | Format dễ viral nhất, mở kênh bằng "wow" |
| Thứ Hai 2026-10-05 | VGC-2026-W40-03 — Mặt tiền craftsman glow-up | Đổi từ nội thất sang ngoại thất, dùng màu brand |
| Thứ Tư 2026-10-07 | VGC-2026-W40-02 — Chống thấm vách tắm (Mistake vs Right) | Nội dung giáo dục, đo lượt save |

**Thử nghiệm mới:** format nền #2 "Kitchen idea for 1960s ranch" — 1 bếp cũ → 3 phương án phong cách (PNW warm modern / mid-century / classic white), hỏi người xem chọn A/B/C để kéo comment. Agent 01 sẽ viết khi 1 video trên chuyển sang đăng.

**Việc Huynh cần làm:**
- Tạo ảnh bằng ChatGPT cho W40-01 (ưu tiên, trước thứ Sáu 10/02), W40-03, W40-02 theo `CHATGPT_INSTRUCTIONS.md`; upload vào `Audio-assets/images/<ID>/`; nhắn "ảnh xong <ID>".
- Thêm 2–3 bản nhạc royalty-free vào `Audio-assets/audio/` (cần mood upbeat ×2, calm ×1) — hiện folder đang trống.
- Gửi video viral tham khảo vào chat admin để inbox có nguồn cho tuần sau.

| Video ID | Hướng content | Status | Kênh | Ngày đăng | Ghi chú |
|---|---|---|---|---|---|
| VGC-2026-W40-01 | Before→After: phòng khách split-level 1970s ("Same room. Different story.") | PROMPTS_READY | FB/IG/TikTok | | Nguồn: format nền #1 (inbox trống). 7 ảnh, ~20s, upbeat |
| VGC-2026-W40-02 | Mistake vs Right way: chống thấm vách tắm | PROMPTS_READY | FB/IG/TikTok | | Nguồn: format nền #4. 6 ảnh, ~21s, calm |
| VGC-2026-W40-03 | PNW glow-up: mặt tiền craftsman 1920s (navy/ivory/terracotta) | PROMPTS_READY | FB/IG/TikTok | | Nguồn: format nền #5. 7 ảnh, ~22s, upbeat |

## Log quyết định

- 2026-10-01: Chọn GitHub làm kho trung gian (repo `Prompt` + `Audio-assets`). Session chat Claude trong Project "SOCIAL MEDIA" là admin.
- 2026-10-01: Agent 01 tạo W40-01/02/03 từ format nền vì inbox trống và chưa có báo cáo tuần.
- 2026-10-01: Chuyển sang mô hình Format Library — mỗi video viral Huynh gửi được admin học thành 1 FORMAT; Agent 01 xoay vòng các FORMAT. Nhạc: dùng bản royalty-free cùng BPM (mặc định) hoặc Huynh tự gắn nhạc trending trong app (chế độ in-app).
