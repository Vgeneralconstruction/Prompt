# FORMAT-<NN> — <Tên kiểu video>

**Nguồn học:** <mô tả video gốc Huynh gửi, ngày, nền tảng> · file gốc: `inbox/<file>`
**Ngày tạo:** <YYYY-MM-DD>
**Trạng thái:** active / paused
**Đã dùng:** 0 lần · video gần nhất: —

## 1. Vì sao video gốc giữ người xem
- <3–5 gạch đầu dòng: cơ chế tâm lý, không phải mô tả lại cảnh>

## 2. Công thức cấu trúc (bất biến)
| Slot | Thời lượng | Vai trò | Khung hình / góc máy | Chuyển cảnh |
|---|---|---|---|---|
| S1 | 0.0–1.5s | Hook | | |
| S2 | | | | |
| ... | | | | |

**Tổng:** <xx>s · **Số ảnh:** <N>

## 3. Công thức edit (cho Agent 02)
- **Nhịp cắt:** cắt đúng beat theo bảng beat map bên dưới
- **Chuyển động trên ảnh tĩnh:** <zoom in 5%/s, pan trái→phải, hard cut, flash trắng 2 frame...>
- **Text overlay:** font <...>, cỡ <...>, vị trí <...>, xuất hiện <...>; tối đa ~7 từ/màn hình
- **Hiệu ứng đặc trưng:** <split screen, slider before/after, freeze frame...>
- **End card:** <có/không, nội dung>

## 4. Nhạc
- **Nhạc gốc:** <tên bài nếu biết / mô tả: thể loại, nhịp, có drop ở giây thứ x>
- **BPM:** <...> · **Beat map (giây):** <0.0, 0.48, 0.96, ...> · **Drop / điểm nhấn:** <giây>
- **Chế độ nhạc:**
  - `substitute` (mặc định, tự động): Agent 02 dùng nhạc royalty-free cùng BPM ±5 và cùng mood trong `Audio-assets/audio/formats/FORMAT-<NN>/`.
  - `in-app`: Agent 02 render KHÔNG nhạc (cắt sẵn theo beat), Huynh tự thêm đúng bài trending trong app TikTok/IG khi đăng.

## 5. Mẫu prompt ảnh (biến hóa mỗi lần dùng)
**Style lock mẫu:** <...>

| Slot | Mẫu prompt (tiếng Anh) | Biến số |
|---|---|---|
| S1 | "<...{ROOM}...{ERA}...>" | ROOM, ERA |
| ... | | |

**Biến số được phép đổi mỗi lần:** loại phòng, đời nhà, phong cách, vật liệu, mùa.
**Không được đổi:** thứ tự slot, thời lượng, góc máy của cặp before/after.

## 6. Mẫu caption
- Dòng 1 (hook): <...>
- CTA: <...>
- Hashtag gốc: <...>

## 7. Ghi chú hiệu quả (Agent 01 cập nhật từ báo cáo tuần)
- <video ID — views — engagement — nhận xét>
