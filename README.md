# VGC Content Pipeline — Prompt Repo

Kho điều phối nội dung short-video cho **V General Construction** (Facebook / Instagram / TikTok).

**Admin:** session chat Claude trong Project "SOCIAL MEDIA". Admin là đầu mối duy nhất trao đổi với Huynh, viết brief/prompt, cập nhật `PIPELINE.md`, và ghi lại quyết định vào Project. Các scheduled task chỉ đọc `PIPELINE.md` và làm đúng bước của mình.

## 2 repo

| Repo | Chứa gì | Ai ghi |
|---|---|---|
| `Prompt` (repo này) | brief, file prompt, tracker, báo cáo tuần | Claude |
| `Audio-assets` | ảnh, nhạc, video render | Huynh (ảnh, nhạc), Claude (video) |

ChatGPT chỉ cần quyền **đọc** repo `Prompt`.

## Đội agent

| # | Agent | File | Chạy khi |
|---|---|---|---|
| 00 | Admin — nhận video viral, phân tích, tạo FORMAT mới | `agents/00-admin.md` | Khi Huynh nhắn |
| 01 | Planner — xoay vòng FORMAT, viết kịch bản + prompt, kế hoạch tuần | `agents/01-planner.md` | Thứ Hai + thứ Năm 08:50 KST, hoặc admin gọi |

## Cấu trúc

```
Prompt/
├── agents/                ← system prompt của từng agent (00 admin, 01 planner)
├── formats/               ← thư viện kiểu video học từ video viral
├── brand/                 ← brand guide dùng chung
├── inbox/                 ← tham khảo viral chờ xử lý
├── PIPELINE.md              ← trạng thái từng video (nguồn sự thật duy nhất)
├── CHATGPT_INSTRUCTIONS.md  ← lệnh cố định dán vào ChatGPT
├── briefs/                  ← phân tích video viral + hướng content
├── prompts/                 ← file prompt ảnh, mỗi video 1 file
├── reports/                 ← báo cáo tuần
└── templates/               ← mẫu brief / prompt

Audio-assets/
├── images/<VIDEO-ID>/       ← ảnh ChatGPT tạo: 01.png, 02.png, ...
├── audio/                   ← nhạc royalty-free (đặt tên theo mood: calm-01.mp3, upbeat-02.mp3)
└── renders/
    ├── review/              ← video chờ duyệt
    └── published/           ← video đã đăng
```

## Mã video

`VGC-<năm>-W<tuần>-<số>` — ví dụ `VGC-2026-W40-01`. Dùng chung cho brief, prompt, folder ảnh, file render.

## Vòng đời 1 video

| # | Status | Ai | Việc |
|---|---|---|---|
| 1 | `IDEA` | Huynh → Claude | Gửi screen recording video viral vào chat admin |
| 2 | `PROMPTS_READY` | Claude | Viết brief + `prompts/<ID>.md`, push |
| 3 | `IMAGES_READY` | Huynh + ChatGPT | ChatGPT tạo ảnh theo prompt; Huynh upload vào `Audio-assets/images/<ID>/` |
| 4 | `IN_REVIEW` | Claude | Render video 9:16 + nhạc → `renders/review/<ID>.mp4` |
| 5 | `APPROVED` / `REVISE` | Huynh | Nhắn admin "duyệt <ID>" hoặc ghi chú sửa |
| 6 | `SCHEDULED` | Claude | Lên lịch qua Metricool |
| 7 | `PUBLISHED` | Claude | Chuyển file sang `renders/published/` |

Mỗi thứ Hai: Claude kéo số liệu Metricool → `reports/<năm>-W<tuần>.md` + kế hoạch tuần mới.
