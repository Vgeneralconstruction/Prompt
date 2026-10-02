# VGC Prompt

File prompt tạo ảnh cho ChatGPT, mỗi ngày 3 phiên. Mỗi phiên là 1 video, dựng theo 1 kiểu video (VF) chọn ngẫu nhiên trong repo **Library**.

```
prompts/MM-DD-YYYY - Phien N.md   ← file prompt của từng phiên
_system/AGENT.md                   ← hướng dẫn cho task viết prompt
_system/prompt-file-template.md    ← mẫu file prompt
_system/ideas-log.md               ← log ý tưởng + VF + audio của từng phiên
```

**Lịch:** 3 phiên/ngày, giờ Hàn Quốc.
- Phiên 1: 07:50
- Phiên 2: 12:50
- Phiên 3: 17:50

**Cách dùng:** ChatGPT tự tìm file theo ngày và số phiên qua GitHub connector, rồi tạo ảnh theo hướng dẫn ở dòng đầu file. File prompt chỉ chứa prompt ảnh. Phiên nào dùng kiểu video (VF) và audio nào thì tra trong `_system/ideas-log.md`.
