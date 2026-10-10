# Video Editor — instructions for the daily edit task

Each edit session builds **1 video** from the images ChatGPT generated for one prompt session, then places the video on **Metricool as a draft** with a caption and hashtags for Huynh to review.

You do NOT write prompts, do NOT generate images, do NOT publish directly (drafts only).

## Repos
| Repo | Used for |
|---|---|
| `Vgeneralconstruction/Prompt` | `meta/<session>.json` (VF, audio, image → scene map), `_system/edit-log.md` |
| `Vgeneralconstruction/Image-Assets` | the session's images: folder `MM-DD-YYYY - Phien N/` containing `01.png`, `02.png`... (Phien = session; this spelling is part of the file name and must not be changed) |
| `Vgeneralconstruction/Audio-assets` | `VF-xxx.mp3` |
| `Vgeneralconstruction/Library` | `formats/VF-xxx.md` (how to edit), `tools/render.py` (rendering tool) |
| `Vgeneralconstruction/Video-Output` (**public**) | where the mp4 is placed so Metricool can fetch it via link |

## Steps

### 1. Choose the session to edit
- The date is in Korea time (Asia/Seoul).
- Read `_system/edit-log.md` to know which sessions have already been edited.
- Candidates = every session with a `meta/*.json` file in the **last 7 days** (including today) that is not yet in the edit-log, ordered oldest to newest.
- For each candidate, check whether the folder `Image-Assets/MM-DD-YYYY - Phien N/` has **all** `image_count` images. The session to edit = the **oldest candidate with all images**. Skip sessions with missing images (do not log them) and consider the next one.
- If no session has all its images → stop and report "no session has all its images", with the list of waiting sessions and the current image count of each (e.g. `10-04 P3: 7/10`).

### 2. Read the meta, the spec and Huynh's feedback
- From `meta/<session>.json` take `vf_id`, `audio`, `image_count`, `images`.
- **Huynh's feedback (mandatory):** read **section 8** of `Library/formats/<vf_id>.md` (feedback specific to this video format) and `_system/feedback-log.md` (general feedback for all formats). Every row with status `Apply` must be implemented in this video (text, pacing, transitions, caption…). When reporting the result, briefly list the feedback items applied.
- Read the entire `Library/formats/<vf_id>.md`, especially:
  - section 3: how the content is exploited
  - section 4a: pacing and scene structure
  - section 4b: editing techniques
  - section 4c: text overlay
  - section 5: audio, drop

### 3. Get the images and audio
- Images: folder `Image-Assets/MM-DD-YYYY - Phien N/`. When matching the folder name, ignore differences in case and spacing.
  - Images are ordered by the number in the file name.
  - Folder missing, or fewer images than `image_count` → **stop**, do not write to edit-log (so the next edit session retries), report "session X does not have all images yet (has a/b)".
- **Look at every image** (use Read). If an image is broken, out of order, or contains text or a watermark, note it; still build the video if it is usable.
- Audio: `Audio-assets/<vf_id>.mp3`. Check the duration with ffprobe.

### 4. Write the edit plan
Create `plan.json` in the format described at the top of `Library/tools/render.py`.
- `duration` = audio duration (= `duration_s` of the spec).
- **Scenes:** exactly as in table 4a of the spec.
  - `start`/`end` of each scene, contiguous from 0 to `duration`.
  - Image N is attached to its scene according to `images` in the meta.
  - Transitions and motion are chosen from the keywords available in the renderer, as close as possible to 4a/4b.
- **Texts:** by role and timing as in 4c, but **rewritten in English for VGC content**. Do not copy the original video's text verbatim.
  - If the spec says a text element is **baked into the AI image** (e.g. VF-001: color names on the swatches), do **not** render that text with `render.py`. Only render what the spec marks as rendered.
  - At most about 7 words per screen.
  - Avoid the bottom 12% and the right 8% of the frame (covered by the app UI).
- Apply the content approach of section 3 exactly: hook at 0–2s, payoff at the right second, CTA at the end.
- **Company end card (MANDATORY on every video, Huynh 2026-10-10):** add `"outro": true` at the top level of `plan.json`. `render.py` then appends `Library/brand/outro.mp4` (silent ~3.2s clip: Huynh's animated VGC logo + "V General Construction / General Contractor in Oregon & Washington" in gold serif) AFTER `duration`; the music fades out at the end of the content and the end card is silent. This overrides any "no end card / seamless loop" statement in a VF spec. Do not draw your own end card or brand/location text box on the video (Huynh 2026-10-10: the old VF-002 "V GENERAL CONSTRUCTION / Portland Metro" card is removed — F7 just holds to the end) and do not add other text to the end card. `duration` in the plan stays the spec's content length.

### 5. Render and check
```
python3 Library/tools/render.py plan.json out.mp4
```
- ffprobe: 1080×1920, has audio, duration = `duration` + 3.2s end card (tolerance ≤ 0.1s).
- Check the last ~2s: logo and both text lines are visible.
- Extract 6–8 frames (including 1 frame per scene) and **inspect them visually**:
  - Text is readable, not clipped.
  - Images are not distorted.
  - Transitions land in the right places.
- Fix the plan and re-render if needed.

### 6. Upload the video
- File name: `MM-DD-YYYY-Phien-N.mp4` (no spaces).
- Push to `Video-Output` (public repo), at the repo root.
- Link for Metricool: `https://raw.githubusercontent.com/Vgeneralconstruction/Video-Output/main/MM-DD-YYYY-Phien-N.mp4`.
- Test the link with `curl -sI`; it must return 200 (if the sandbox blocks network access, skip this test).
- If the `Video-Output` repo does not exist or cannot be pushed to:
  - push the video to `Image-Assets/renders/` instead;
  - **skip the Metricool step**;
  - report the reason to Huynh.

### 7. Caption + hashtags
- English, confident, warm, professional tone.
- First line is the hook, at most ~120 characters.
- 1–2 body sentences.
- Soft CTA: ask for opinions, or invite to save/follow.
- Last line: `V General Construction · Portland Metro & Washington County`.
- 6–10 hashtags, mixing broad and local, e.g.: `#homeremodel #renovation #interiordesign #beforeandafter #portlandoregon #pdxhomes #beavertonoregon #pnwhomes`.
- The images are AI images → write as a **concept / design idea**. Do **not** claim this is a project VGC has built.

### 8. Create the draft on Metricool
- Brand: `blogId` = `7127510` (v.general.constru).
- Call `getBestTimeToPostByNetwork` to choose the next good time slot.
  - Posting timezone: **America/Los_Angeles**.
  - Avoid the same time as other existing drafts (see `getScheduledPosts`).
- `createScheduledPost` with:
  - `draft: true`
  - `autoPublish: true` (so that when Huynh approves the draft, Metricool publishes via API; do NOT set it to false)
  - `media`: [the raw link from step 6]
  - `providers`: facebook, instagram, tiktok
  - `facebookData.type`: `"REEL"`
  - `instagramData`: `{"type":"REEL","isAiGenerated":true,"showReelOnFeed":true}`
  - `tiktokData`: `{"isAigc":true,"privacyOption":"PUBLIC_TO_EVERYONE"}`
  - `text`: the caption from step 7
  - `publicationDate`: `{dateTime, timezone:"America/Los_Angeles"}`
- Save the `plannerUrl` from the returned result.
- On error, do not retry more than once; record the error in the log and report it to Huynh.

### 9. Write the edit-log and push
Append 1 row to `_system/edit-log.md` (in English):
`| MM-DD-YYYY | N | VF-xxx | MM-DD-YYYY-Phien-N.mp4 | video duration incl. end card | draft time (PT) | plannerUrl or error |`

`git pull --rebase`, commit, push.

### 10. Report the result
1 message in **Vietnamese**, including:
- session + VF
- first line of the caption
- draft time on Metricool (Portland time and Korea time)
- plannerUrl link
- any issues
