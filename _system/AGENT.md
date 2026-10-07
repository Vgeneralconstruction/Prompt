# Prompt Writer — hướng dẫn cho task hằng ngày

Bạn viết **file prompt tạo ảnh cho ChatGPT**. Mỗi phiên tạo 1 file, ứng với 1 video. Video sẽ được edit theo một kiểu video (VF) trong repo Library.

Bạn KHÔNG tạo ảnh, KHÔNG edit video, KHÔNG đăng bài.

## Repo
- `Vgeneralconstruction/Library`: thư viện kiểu video. Đọc `README.md` (danh mục) và `formats/VF-*.md`.
- `Vgeneralconstruction/Audio-assets`: audio `VF-*.mp3`. Chỉ kiểm tra file có tồn tại, không sửa.
- `Vgeneralconstruction/Prompt` (repo này): nơi lưu file prompt và `_system/ideas-log.md`.

## Các bước mỗi phiên

### 1. Xác định ngày và số phiên
- Ngày tính theo giờ Hàn Quốc (Asia/Seoul): `MM-DD-YYYY`.
- Số phiên = số file `MM-DD-YYYY - Phien *.md` của hôm nay đã có trong `prompts/` + 1.
- Tên file: `prompts/MM-DD-YYYY - Phien N.md`, ví dụ `prompts/10-03-2026 - Phien 1.md`. **Giữ đúng định dạng này**, vì ChatGPT tự tìm file theo ngày và số phiên.

### 2. Chọn ngẫu nhiên 1 kiểu video
- Lấy danh sách VF có `status: active` trong `Library/formats/` mà có audio tương ứng `Audio-assets/VF-xxx.mp3`.
- Chọn ngẫu nhiên bằng code, ví dụ `python3 -c "import random; print(random.choice([...]))"`.
- Nếu có từ 2 VF trở lên, tránh trùng VF với phiên ngay trước đó (xem dòng cuối `ideas-log.md`).
- **Nếu Library chưa có VF nào: dừng lại, không tạo file, báo "Library chưa có kiểu video nào".**

### 3. Đọc kỹ spec của VF đã chọn
Cần nắm 5 thứ:
- **Mục 3, cách khai thác nội dung:** góc nội dung, hook, payoff.
- **Mục 4a:** số cảnh, vai trò từng cảnh, mốc thời gian.
- **Mục 4b:** kỹ thuật edit, để biết ảnh cần chuẩn bị thế nào cho edit được, ví dụ cùng góc máy, cùng bố cục, chừa chỗ cho text.
- **Mục 6:** ý tưởng VGC gợi ý. Chỉ để tham khảo, không bắt buộc dùng.
- **Quan hệ giữa các cảnh:** cùng góc máy? cùng không gian? chuỗi thời gian? so sánh?

### 4. Nghĩ ra ý tưởng MỚI
- Đọc toàn bộ `_system/ideas-log.md`.
- Ý tưởng mới phải **khác mọi ý tưởng đã có** ở ít nhất 2 trong 4 trục:
  - **Không gian:** loại phòng hoặc khu vực, như bếp, phòng tắm, phòng khách, phòng ngủ, basement, attic, garage, mặt tiền, sân sau, deck, lối vào, cầu thang, laundry, văn phòng thương mại, cửa hàng...
  - **Loại nhà / đời nhà:** craftsman 1920s, bungalow, mid-century ranch, split-level 1970s, cape cod, victorian, townhouse, ADU, nhà mới 2000s, mặt bằng thương mại...
  - **Bộ phong cách / chủ đề biến đổi:** nhóm style, vật liệu, bảng màu, mùa, thời điểm trong ngày...
  - **Góc máy / bố cục chính.**
- Trong cùng một VF, không được lặp lại tổ hợp (không gian + loại nhà) đã dùng với VF đó.
- Ý tưởng phải hợp với một công ty cải tạo nhà ở Portland, Oregon (khí hậu Pacific Northwest, nhà gỗ, nhiều cây xanh, trời mưa).

### 5. Viết prompt theo đúng cấu trúc của VF
- **Số ảnh = số cảnh cần hình** trong mục 4a của spec. Ảnh N ứng với cảnh N.
- **Giữ đúng quan hệ giữa các cảnh.** Ví dụ VF là "5 phong cách cùng 1 góc máy" thì phải viết 5 prompt:
  - cùng một căn phòng, cùng góc máy, cùng ống kính, cùng bố cục, cùng vị trí cửa sổ và cửa ra vào;
  - chỉ khác phong cách.

  Phần cố định ghi **một lần** trong khối LOCK ở đầu file (ví dụ SWATCH LOCK, KITCHEN LOCK). **Không chép lại LOCK vào từng ảnh.** Mỗi prompt ảnh chỉ ghi phần khác biệt.
- **Before/after:** cùng góc máy và kiến trúc; phần "before" phải cũ kỹ một cách thực tế, không đổ nát.
- **Toàn bộ file prompt viết bằng tiếng Anh** — dòng hướng dẫn cho ChatGPT ở đầu file, tên và nội dung các khối LOCK, chú thích "(applies to images …)", và từng prompt ảnh. Không có chữ tiếng Việt nào trong file prompt (tiếng Việt chỉ dùng trong meta JSON, ideas-log và tin nhắn báo cáo). Prompt photorealistic, như ảnh chụp thật bằng máy ảnh. Mỗi prompt ghi rõ:
  - không gian và kiến trúc
  - vật liệu
  - ánh sáng
  - góc máy, độ cao máy, ống kính
  - khung **dọc 2:3**
- **No text, logo, watermark or people** in the images, **unless the format spec asks for it** (e.g. VF-001 §4c/§6: color names must appear as a real printed/embossed label on the swatch samples — then the prompt must state the exact name text and say "no other text").
- **Richness rule (Huynh's feedback 2026-10-07, mandatory):** prompts must not be generic. Each space/reveal image needs (a) its own composition and a camera angle clearly different from the other images in the session, (b) one signature detail (a plant, a window view, a textile, hardware, a human-scale object), (c) a specific light moment (time of day, weather, light direction), (d) materials described with visible texture. Sample/swatch images must look like real showroom pieces with texture, not flat painted shapes. Before finishing, compare the prompts pairwise: if two images could look interchangeable, rewrite one. Read `_system/feedback-log.md` and section 8 of the chosen VF spec before writing; every `Apply` row is mandatory.
- Nếu spec có text overlay đặt ở một vùng nào đó, prompt phải chừa vùng đó thoáng, ví dụ "keep the upper third uncluttered".
- Ảnh cùng một video phải cùng tông ánh sáng và cùng chất ảnh, để khi cắt ghép không bị lệch.
- **Giới hạn độ dài (bắt buộc):** mỗi khối LOCK ≤ 120 từ, mỗi prompt ảnh ≤ 60 từ, cả file ≤ 900 từ. File dài làm ChatGPT hết giới hạn phiên giữa chừng.

### 6. Ghi file prompt
Theo mẫu `_system/prompt-file-template.md`.
- File **chỉ nói về ảnh**, vì ChatGPT chỉ tạo ảnh. Không ghi tên VF, audio, text overlay, caption, hashtag hay ghi chú edit.
- ChatGPT **tự đọc file từ GitHub** rồi làm theo, nên dòng đầu file phải là lệnh rõ ràng cho ChatGPT, và file phải tự đủ nghĩa, không cần người giải thích thêm.


### 6c. Ghi file meta (BẮT BUỘC, để task edit biết dựng theo kiểu nào)
Tạo `meta/MM-DD-YYYY - Phien N.json` (cùng tên với file prompt, đuôi .json):
```json
{
  "date": "MM-DD-YYYY",
  "session": N,
  "prompt_file": "prompts/MM-DD-YYYY - Phien N.md",
  "vf_id": "VF-xxx",
  "spec": "Library/formats/VF-xxx.md",
  "audio": "Audio-assets/VF-xxx.mp3",
  "image_count": N,
  "images": [
    {"image": "01", "scene": 1, "role": "hook", "note": "mô tả ngắn ảnh này"},
    {"image": "02", "scene": 2, "role": "...", "note": "..."}
  ],
  // nếu cảnh cần text overlay gọi tên thứ trong ảnh (vd tên màu, tên vật liệu), thêm "labels": ["..."] vào ảnh đó
  "idea": "1-sentence idea in English",
  "idea_en": "1-sentence idea in English (dùng cho caption)"
}
```

### 7. Ghi log
Thêm 1 dòng vào cuối `_system/ideas-log.md`:
`| MM-DD-YYYY | N | VF-xxx | Audio-assets/VF-xxx.mp3 | số ảnh | không gian | loại nhà | bộ phong cách/chủ đề | góc máy | tóm tắt 1 câu |`

Log là nơi duy nhất ghi phiên nào dùng VF và audio nào, để bước edit tra cứu.

### 8. Commit + push
- `git pull --rebase` trước khi push.
- Commit message: `Prompt MM-DD-YYYY Phien N (VF-xxx)`.

### 9. Báo kết quả
Một tin nhắn ngắn bằng **tiếng Việt**: tên file, VF đã chọn, ý tưởng trong 1 câu, số ảnh cần tạo.

## Tự kiểm trước khi push
- [ ] Số ảnh khớp số cảnh cần hình trong spec.
- [ ] LOCK chỉ xuất hiện một lần ở đầu file, không chép vào từng ảnh.
- [ ] Đếm từ bằng `wc -w`: cả file ≤ 900 từ.
- [ ] Ý tưởng khác log ở ít nhất 2 trục, không trùng tổ hợp (không gian + loại nhà) với cùng VF.
- [ ] Không có chữ, logo, người trong prompt (trừ khi cần).
- [ ] File prompt không có thông tin ngoài ảnh (không VF, audio, caption, edit).
- [ ] File prompt 100% tiếng Anh, kể cả dòng hướng dẫn đầu file và nhãn LOCK.
- [ ] Dòng log có đúng VF, đường dẫn audio và số ảnh.
- [ ] File `meta/MM-DD-YYYY - Phien N.json` có đúng `vf_id`, `audio`, `image_count`, và map ảnh → cảnh.
