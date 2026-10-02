# VGC Prompt

File prompt tạo ảnh cho ChatGPT, mỗi ngày 3 phiên. Mỗi phiên là 1 video, dựng theo 1 kiểu video (VF) chọn ngẫu nhiên trong repo **Library**.

```
prompts/MM-DD-YYYY - Phien N.md    ← prompt ảnh cho ChatGPT (chỉ có ảnh)
meta/MM-DD-YYYY - Phien N.json     ← VF, audio, map ảnh → cảnh (để task edit đọc)
_system/AGENT.md                    ← hướng dẫn task viết prompt
_system/EDITOR.md                   ← hướng dẫn task edit video + Metricool
_system/prompt-file-template.md     ← mẫu file prompt
_system/ideas-log.md                ← log ý tưởng, chống trùng
_system/edit-log.md                 ← log video đã dựng + draft Metricool
```

## Lịch hằng ngày (giờ Hàn Quốc)

| Phiên | Viết prompt (Claude) | Tạo ảnh (ChatGPT) | Edit + draft Metricool (Claude) |
|---|---|---|---|
| 1 | 07:50 | sau 07:50 | 08:50 |
| 2 | 12:50 | sau 12:50 | 13:50 |
| 3 | 17:50 | sau 17:50 | 18:50 |

Ảnh của phiên phải có trong `Image-Assets/MM-DD-YYYY - Phien N/` (01.png, 02.png...) trước giờ edit. Nếu chưa đủ ảnh, phiên edit đó bỏ qua và phiên edit sau thử lại.

**Cách dùng:** ChatGPT tự tìm file prompt theo ngày và số phiên qua GitHub connector, rồi tạo ảnh theo hướng dẫn ở dòng đầu file.
