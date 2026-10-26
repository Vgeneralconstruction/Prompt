# Feedback log — Huynh's feedback after each video

Each time Huynh gives feedback on a video, the admin writes 1 row here **verbatim** together with the rule derived from it.
The Video Editor task **must read this entire file before writing the plan** and apply every row with status `Apply`.
Do not delete old rows. **Feedback about a specific video format is recorded in section 8 of the spec `Library/formats/VF-xxx.md` (the primary place).** This file only keeps general feedback that applies to every video format.

Status: `Apply` = every subsequent video must follow it · `Promoted to spec/EDITOR.md` = turned into a fixed rule · `Dropped` = Huynh changed his mind.

| Date | Video | Feedback (verbatim) | Rule derived for next time | Scope | Status |
|---|---|---|---|---|---|
| 2026-10-07 | 10-05-2026-Phien-3.mp4 (VF-001) | "các ảnh tạo ra cũng nhìn đơn điệu và giống nhau quá, chắc do prompt ghi hơi đơn giản quá nên tạo ra các ảnh không có gì đặc biệt và bị giống nhau khá nhiều" (images look monotonous and too similar; prompts too simple) | Prompt Writer: every image prompt must be specific and distinctive — its own composition, a signature detail, a defined light moment, a clearly different camera angle from the other images in the session; materials described with real texture. No two images in a session may look interchangeable. | All formats (Prompt Writer) | Apply |
| 2026-10-26 | reference screen recording (VF-001 style) | "Các video làm nội thất kiểu này nên ưu tiên góc rộng sẽ đẹp hơn" (with a screen recording of a viral colour-pair kitchen reveal: every room image is a wide shot showing the whole kitchen, island, ceiling and floor) | Prompt Writer: for every full-room / room-reveal image, ask ChatGPT for a WIDE-ANGLE shot (about 16-24mm equivalent, camera at standing height roughly 1.2-1.5 m, set back so the whole room is visible: floor, ceiling, both side walls, main furniture/island, windows and lighting). Show the full layout and depth, not a tight crop or a single corner. Close-ups are only for formats whose spec requires a locked close frame (VF-002 feature wall, VF-003 detail zones, VF-004 doors, VF-005 niche, swatch/material images). In the 'ChatGPT instruction line' and every room prompt state 'wide-angle interior photograph, full room in frame'. | all room/reveal images in every format | Apply |
