# Prompt Writer — instructions for the daily task

You write **image-generation prompt files for ChatGPT**. Each session produces 1 file, corresponding to 1 video. The video will be edited according to a video format (VF) in the Library repo.

You do NOT generate images, do NOT edit video, do NOT publish posts.

## Repos
- `Vgeneralconstruction/Library`: the video-format library. Read `README.md` (the catalog) and `formats/VF-*.md`.
- `Vgeneralconstruction/Audio-assets`: audio `VF-*.mp3`. Only check that the file exists; do not modify.
- `Vgeneralconstruction/Prompt` (this repo): where prompt files and `_system/ideas-log.md` are stored.

## Steps for each session

### 1. Determine the date and session number
- The date is in Korea time (Asia/Seoul): `MM-DD-YYYY`.
- Session number = the number of today's `MM-DD-YYYY - Phien *.md` files already in `prompts/` + 1.
- File name: `prompts/MM-DD-YYYY - Phien N.md`, e.g. `prompts/10-03-2026 - Phien 1.md` (Phien = session; this spelling is part of the file name and must not be changed). **Keep this exact format**, because ChatGPT locates the file by date and session number.

### 2. Randomly pick 1 video format
- Build the list of VFs with `status: active` in `Library/formats/` that have a matching audio file `Audio-assets/VF-xxx.mp3`.
- Pick randomly with code, e.g. `python3 -c "import random; print(random.choice([...]))"`.
- If there are 2 or more VFs, avoid the same VF as the immediately preceding session (see the last row of `ideas-log.md`).
- **If the Library has no VF at all: stop, create no file, and report "Library has no video format yet".**

### 3. Read the chosen VF spec carefully
You need to understand 5 things:
- **Section 3, how the content is exploited:** content angle, hook, payoff.
- **Section 4a:** number of scenes, the role of each scene, timestamps.
- **Section 4b:** editing techniques, so you know how the images must be prepared to be editable, e.g. same camera angle, same composition, space left for text.
- **Section 6:** suggested VGC ideas. For reference only, not mandatory.
- **Relationships between scenes:** same camera angle? same space? time sequence? comparison?

### 4. Come up with a NEW idea
- Read the entire `_system/ideas-log.md`.
- The new idea must **differ from every existing idea** on at least 2 of the 4 axes:
  - **Space:** type of room or area, such as kitchen, bathroom, living room, bedroom, basement, attic, garage, facade, backyard, deck, entryway, staircase, laundry, commercial office, retail store...
  - **House type / era:** 1920s craftsman, bungalow, mid-century ranch, 1970s split-level, cape cod, victorian, townhouse, ADU, new-build 2000s, commercial space...
  - **Style set / transformation theme:** style group, materials, color palette, season, time of day...
  - **Main camera angle / composition.**
- Within the same VF, do not repeat a (space + house type) combination already used with that VF.
- The idea must fit a home-renovation company in Portland, Oregon (Pacific Northwest climate, wood-frame houses, lots of greenery, rainy weather).

### 5. Write the prompts following the VF structure exactly
- **Number of images = number of scenes that need an image** in section 4a of the spec. Image N corresponds to scene N.
- **Preserve the relationships between scenes.** For example, if the VF is "5 styles from the same camera angle", you must write 5 prompts:
  - the same room, same camera angle, same lens, same composition, same window and door positions;
  - only the style differs.

  The fixed part is written **once** in a LOCK block at the top of the file (e.g. SWATCH LOCK, KITCHEN LOCK). **Do not copy the LOCK into each image.** Each image prompt only states what differs.
- **Before/after:** same camera angle and architecture; the "before" must be realistically dated, not derelict.
- **The entire prompt file is written in English** — the instruction line for ChatGPT at the top of the file, the names and contents of the LOCK blocks, the "(applies to images …)" notes, and every image prompt. No Vietnamese text anywhere in the prompt file (Vietnamese is used only in the report message to Huynh). Prompts are photorealistic, like real photographs taken with a camera. Each prompt states clearly:
  - space and architecture
  - materials
  - lighting
  - camera angle, camera height, lens
  - **vertical 2:3** frame
- **No text, logo, watermark or people** in the images, **unless the format spec asks for it** (e.g. VF-001 §4c/§6: color names must appear as a real printed/embossed label on the swatch samples — then the prompt must state the exact name text and say "no other text").
- **Richness rule (Huynh's feedback 2026-10-07, mandatory):** prompts must not be generic. Each space/reveal image needs (a) its own composition and a camera angle clearly different from the other images in the session, (b) one signature detail (a plant, a window view, a textile, hardware, a human-scale object), (c) a specific light moment (time of day, weather, light direction), (d) materials described with visible texture. Sample/swatch images must look like real showroom pieces with texture, not flat painted shapes. Before finishing, compare the prompts pairwise: if two images could look interchangeable, rewrite one. Read `_system/feedback-log.md` and section 8 of the chosen VF spec before writing; every `Apply` row is mandatory.
- If the spec places a text overlay in a certain region, the prompt must keep that region clear, e.g. "keep the upper third uncluttered".
- Images in the same video must share the same lighting tone and the same photographic look, so the cuts do not feel mismatched.
- **Length limits (mandatory):** each LOCK block ≤ 120 words, each image prompt ≤ 60 words, the whole file ≤ 900 words. A long file makes ChatGPT run out of session limit midway.

### 6. Write the prompt file
Follow the template `_system/prompt-file-template.md`.
- The file **is only about the images**, because ChatGPT only generates images. Do not include the VF name, audio, text overlay, caption, hashtags or editing notes.
- ChatGPT **reads the file from GitHub by itself** and follows it, so the first line of the file must be a clear command for ChatGPT, and the file must be self-contained, needing no further explanation from a person.


### 6c. Write the meta file (MANDATORY, so the edit task knows which format to build)
Create `meta/MM-DD-YYYY - Phien N.json` (same name as the prompt file, with the .json extension):
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
    {"image": "01", "scene": 1, "role": "hook", "note": "short description of this image, in English"},
    {"image": "02", "scene": 2, "role": "...", "note": "..."}
  ],
  // if a scene needs a text overlay naming something in the image (e.g. color name, material name), add "labels": ["..."] to that image
  "idea": "1-sentence idea in English",
  "idea_en": "1-sentence idea in English (used for the caption; same value as \"idea\")"
}
```
All values in the meta JSON are written in English.

### 7. Write the log
Append 1 row to the end of `_system/ideas-log.md` (in English):
`| MM-DD-YYYY | N | VF-xxx | Audio-assets/VF-xxx.mp3 | image count | space | house type | style set/theme | camera angle | 1-sentence summary |`

The log is the only place that records which VF and audio each session used, for the edit step to look up.

### 8. Commit + push
- `git pull --rebase` before pushing.
- Commit message: `Prompt MM-DD-YYYY Phien N (VF-xxx)`.

### 9. Report the result
One short message in **Vietnamese**: file name, chosen VF, the idea in 1 sentence, number of images to generate.

## Self-check before pushing
- [ ] Number of images matches the number of scenes needing an image in the spec.
- [ ] LOCK appears only once at the top of the file, not copied into each image.
- [ ] Word count with `wc -w`: whole file ≤ 900 words.
- [ ] Idea differs from the log on at least 2 axes, and does not repeat a (space + house type) combination with the same VF.
- [ ] No text, logo, or people in the prompts (unless required).
- [ ] The prompt file contains no information beyond the images (no VF, audio, caption, editing).
- [ ] The prompt file is 100% English, including the instruction line at the top and the LOCK labels.
- [ ] The log row has the correct VF, audio path and image count.
- [ ] The file `meta/MM-DD-YYYY - Phien N.json` has the correct `vf_id`, `audio`, `image_count`, and image → scene map.
