# VGC Prompt

Image-generation prompt files for ChatGPT, 3 sessions per day. Each session is 1 video, built according to 1 video format (VF) picked at random from the **Library** repo.

```
prompts/MM-DD-YYYY - Phien N.md    ← image prompts for ChatGPT (images only)
meta/MM-DD-YYYY - Phien N.json     ← VF, audio, image → scene map (read by the edit task)
_system/AGENT.md                    ← instructions for the prompt-writing task
_system/EDITOR.md                   ← instructions for the video edit + Metricool task
_system/prompt-file-template.md     ← prompt file template
_system/ideas-log.md                ← ideas log, prevents duplicates
_system/edit-log.md                 ← log of built videos + Metricool drafts
```

(Phien = session; this spelling is part of the file name and must not be changed.)

## Daily schedule (Korea time)

| Session | Write prompt (Claude) | Generate images (ChatGPT) | Edit + Metricool draft (Claude) |
|---|---|---|---|
| 1 | 07:50 | after 07:50 | 08:50 |
| 2 | 12:50 | after 12:50 | 13:50 |
| 3 | 17:50 | after 17:50 | 18:50 |

The session's images must be in `Image-Assets/MM-DD-YYYY - Phien N/` (01.png, 02.png...) before the edit time. If the images are not all there, that edit session skips it and the next edit session retries.

**How it is used:** ChatGPT finds the prompt file by date and session number through the GitHub connector, then generates images following the instruction on the first line of the file.
