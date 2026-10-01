# PIPELINE — trạng thái video

Admin cập nhật file này mỗi khi status đổi. Scheduled task đọc file này để biết việc cần làm.

Status: `IDEA` → `PROMPTS_READY` → `IMAGES_READY` → `IN_REVIEW` → `APPROVED` / `REVISE` → `SCHEDULED` → `PUBLISHED`

| Video ID | Hướng content | Status | Kênh | Ngày đăng | Ghi chú |
|---|---|---|---|---|---|
| VGC-2026-W40-01 | Before→After: phòng khách split-level 1970s ("Same room. Different story.") | PROMPTS_READY | FB/IG/TikTok | | Nguồn: format nền #1 (inbox trống). 7 ảnh, ~20s, upbeat |
| VGC-2026-W40-02 | Mistake vs Right way: chống thấm vách tắm | PROMPTS_READY | FB/IG/TikTok | | Nguồn: format nền #4. 6 ảnh, ~21s, calm |
| VGC-2026-W40-03 | PNW glow-up: mặt tiền craftsman 1920s (navy/ivory/terracotta) | PROMPTS_READY | FB/IG/TikTok | | Nguồn: format nền #5. 7 ảnh, ~22s, upbeat |

## Log quyết định

- 2026-10-01: Chọn GitHub làm kho trung gian (repo `Prompt` + `Audio-assets`). Session chat Claude trong Project "SOCIAL MEDIA" là admin.
- 2026-10-01: Agent 01 tạo W40-01/02/03 từ format nền vì inbox trống và chưa có báo cáo tuần.
