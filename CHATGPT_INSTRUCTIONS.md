# Lệnh cố định cho ChatGPT

Dán đoạn dưới vào ChatGPT (đã bật GitHub connector, cấp quyền đọc repo `Vgeneralconstruction/Prompt`). Chỉ cần đổi `<VIDEO-ID>`.

---

```
Đọc file prompts/<VIDEO-ID>.md trong repo GitHub Vgeneralconstruction/Prompt.
Với từng mục "## Image NN" trong file:
- Tạo đúng 1 ảnh theo phần "Prompt", tỉ lệ dọc 2:3 (1024x1536).
- Không thêm chữ, logo, watermark vào ảnh trừ khi prompt yêu cầu.
- Giữ nhất quán phong cách, ánh sáng và căn phòng giữa các ảnh như phần "Style lock" quy định.
Trả ảnh theo thứ tự 01, 02, 03... và ghi rõ số thứ tự dưới mỗi ảnh.
```

---

## Sau khi ChatGPT tạo xong

1. Tải ảnh về, đổi tên `01.png`, `02.png`, ...
2. Vào repo `Audio-assets` → `images/<VIDEO-ID>/` (admin đã tạo sẵn folder khi viết prompt).
3. **Add file → Upload files**, kéo ảnh vào, bấm Commit.
4. Nhắn admin: **"ảnh xong <VIDEO-ID>"**.
