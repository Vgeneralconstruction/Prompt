# Video Editor — hướng dẫn cho task edit hằng ngày

Mỗi phiên edit dựng **1 video** từ ảnh ChatGPT đã tạo cho một phiên prompt, rồi để video lên **Metricool dạng nháp (draft)** kèm caption và hashtag để Huynh duyệt.

Bạn KHÔNG viết prompt, KHÔNG tạo ảnh, KHÔNG đăng thẳng (chỉ tạo draft).

## Repo
| Repo | Dùng để |
|---|---|
| `Vgeneralconstruction/Prompt` | `meta/<phiên>.json` (VF, audio, map ảnh → cảnh), `_system/edit-log.md` |
| `Vgeneralconstruction/Image-Assets` | ảnh của phiên: folder `MM-DD-YYYY - Phien N/` gồm `01.png`, `02.png`... |
| `Vgeneralconstruction/Audio-assets` | `VF-xxx.mp3` |
| `Vgeneralconstruction/Library` | `formats/VF-xxx.md` (cách edit), `tools/render.py` (công cụ dựng) |
| `Vgeneralconstruction/Video-Output` (**public**) | nơi đặt file mp4 để Metricool lấy được qua link |

## Các bước

### 1. Chọn phiên cần edit
- Ngày tính theo giờ Hàn Quốc (Asia/Seoul).
- Đọc `_system/edit-log.md` để biết phiên nào đã edit.
- Phiên cần edit = phiên **cũ nhất** có file `meta/*.json` nhưng chưa có trong edit-log, xét hôm nay và hôm qua.
- Không có phiên nào chờ → dừng, báo "không có phiên chờ edit".

### 2. Đọc meta và spec
- Từ `meta/<phiên>.json` lấy `vf_id`, `audio`, `image_count`, `images`.
- Đọc toàn bộ `Library/formats/<vf_id>.md`, nhất là:
  - mục 3: cách khai thác nội dung
  - mục 4a: nhịp và cấu trúc cảnh
  - mục 4b: kỹ thuật edit
  - mục 4c: text overlay
  - mục 5: audio, drop

### 3. Lấy ảnh và audio
- Ảnh: folder `Image-Assets/MM-DD-YYYY - Phien N/`. Khi so tên folder, bỏ qua khác biệt hoa/thường và dấu cách.
  - Ảnh xếp theo số thứ tự trong tên file.
  - Thiếu folder, hoặc ít ảnh hơn `image_count` → **dừng**, không ghi edit-log (để phiên edit sau thử lại), báo "phiên X chưa đủ ảnh (có a/b)".
- **Xem từng ảnh** (dùng Read). Nếu ảnh hỏng, sai thứ tự hoặc có chữ hay watermark thì ghi chú lại; vẫn dựng nếu dùng được.
- Audio: `Audio-assets/<vf_id>.mp3`. Kiểm tra thời lượng bằng ffprobe.

### 4. Viết edit plan
Tạo `plan.json` theo định dạng ghi ở đầu `Library/tools/render.py`.
- `duration` = thời lượng audio (= `duration_s` của spec).
- **Scenes:** theo đúng bảng 4a của spec.
  - Mốc `start`/`end` của từng cảnh, nối liền từ 0 đến `duration`.
  - Ảnh N gắn vào cảnh theo `images` trong meta.
  - Chuyển cảnh và chuyển động chọn từ các từ khóa có trong renderer, sao cho gần nhất với 4a/4b.
- **Texts:** theo vai trò và thời điểm ở 4c, nhưng **viết lại bằng tiếng Anh cho nội dung VGC**. Không chép nguyên văn text của video gốc.
  - Tối đa khoảng 7 từ mỗi màn hình.
  - Tránh 12% dưới cùng và 8% bên phải khung hình (UI của app che).
- Áp dụng đúng cách khai thác của mục 3: hook ở 0–2s, payoff đúng giây, CTA ở cuối.

### 5. Dựng và kiểm tra
```
python3 Library/tools/render.py plan.json out.mp4
```
- ffprobe: 1080×1920, có audio, thời lượng = `duration` (sai lệch ≤ 0.05s).
- Tách 6–8 frame (gồm 1 frame mỗi cảnh) rồi **xem bằng mắt**:
  - Chữ đọc được, không bị cắt.
  - Ảnh không méo.
  - Chuyển cảnh đúng chỗ.
- Sửa plan và render lại nếu cần.

### 6. Upload video
- Tên file: `MM-DD-YYYY-Phien-N.mp4` (không dấu cách).
- Push vào `Video-Output` (repo public), đặt ở gốc repo.
- Link cho Metricool: `https://raw.githubusercontent.com/Vgeneralconstruction/Video-Output/main/MM-DD-YYYY-Phien-N.mp4`.
- Thử link bằng `curl -sI`; phải ra 200 (nếu sandbox chặn mạng thì bỏ qua bước thử).
- Nếu repo `Video-Output` không tồn tại hoặc không push được:
  - push video vào `Image-Assets/renders/` thay thế;
  - **bỏ qua bước Metricool**;
  - báo Huynh lý do.

### 7. Caption + hashtag
- Tiếng Anh, giọng tự tin, ấm, chuyên nghiệp.
- Dòng đầu là hook, tối đa ~120 ký tự.
- 1–2 câu thân bài.
- CTA nhẹ: hỏi ý kiến, hoặc kêu gọi save/follow.
- Dòng cuối: `V General Construction · Portland Metro & Washington County`.
- 6–10 hashtag, trộn rộng và địa phương, ví dụ: `#homeremodel #renovation #interiordesign #beforeandafter #portlandoregon #pdxhomes #beavertonoregon #pnwhomes`.
- Ảnh là ảnh AI → viết như **concept / design idea**. **Không** nói đây là công trình VGC đã thi công.

### 8. Tạo draft trên Metricool
- Brand: `blogId` = `7127510` (v.general.constru).
- Gọi `getBestTimeToPostByNetwork` để chọn khung giờ tốt kế tiếp.
  - Múi giờ đăng: **America/Los_Angeles**.
  - Tránh trùng giờ với draft khác đã có (xem `getScheduledPosts`).
- `createScheduledPost` với:
  - `draft: true`
  - `media`: [link raw ở bước 6]
  - `providers`: facebook, instagram, tiktok
  - `facebookData.type`: `"REEL"`
  - `instagramData`: `{"type":"REEL","isAiGenerated":true,"showReelOnFeed":true}`
  - `tiktokData`: `{"isAigc":true,"privacyOption":"PUBLIC_TO_EVERYONE"}`
  - `text`: caption ở bước 7
  - `publicationDate`: `{dateTime, timezone:"America/Los_Angeles"}`
- Lưu lại `plannerUrl` trong kết quả trả về.
- Lỗi thì không thử lại quá 1 lần; ghi lỗi vào log và báo Huynh.

### 9. Ghi edit-log và push
Thêm 1 dòng vào `_system/edit-log.md`:
`| MM-DD-YYYY | N | VF-xxx | MM-DD-YYYY-Phien-N.mp4 | thời lượng | giờ draft (PT) | plannerUrl hoặc lỗi |`

`git pull --rebase`, commit, push.

### 10. Báo kết quả
1 tin nhắn **tiếng Việt**, gồm:
- phiên + VF
- caption dòng đầu
- giờ draft trên Metricool (giờ Portland và giờ Hàn)
- link plannerUrl
- vấn đề nếu có
