/**
 * VGC — Drive → GitHub image sync (Google Apps Script)
 *
 * Cứ 10 phút: tìm ảnh mới trong folder Drive, đẩy lên repo Vgeneralconstruction/Image-Assets.
 * Tên ChatGPT "10-02-2026 (Phien 3) - Image 10.png"  →  GitHub "10-02-2026 - Phien 3/10.png"
 * Tên không nhận dạng được → GitHub "unsorted/<tên gốc>"
 *
 * Cài đặt (1 lần):
 *  1. Project Settings (bánh răng) → Script Properties → Add property:
 *       GITHUB_TOKEN = <fine-grained token, quyền Contents: Read and write, chỉ repo Image-Assets>
 *  2. Chọn hàm `setup` → Run → cấp quyền (Drive + kết nối bên ngoài).
 *     setup() chạy đồng bộ 1 lần và tạo lịch chạy mỗi 10 phút.
 */

const CONFIG = {
  FOLDER_ID: '1-xxZcdmJLTo_AT94dRWJAsVFs4W26W5z',
  OWNER: 'Vgeneralconstruction',
  REPO: 'Image-Assets',
  BRANCH: 'main',
  MAX_PER_RUN: 15,            // tránh vượt giới hạn 6 phút của Apps Script
};

function setup() {
  ScriptApp.getProjectTriggers()
    .filter(t => t.getHandlerFunction() === 'syncImages')
    .forEach(t => ScriptApp.deleteTrigger(t));
  ScriptApp.newTrigger('syncImages').timeBased().everyMinutes(10).create();
  syncImages();
}

function syncImages() {
  const props = PropertiesService.getScriptProperties();
  const token = props.getProperty('GITHUB_TOKEN');
  if (!token) throw new Error('Thiếu GITHUB_TOKEN trong Script Properties');

  const synced = JSON.parse(props.getProperty('SYNCED_IDS') || '{}');
  const files = listImagesRecursive(DriveApp.getFolderById(CONFIG.FOLDER_ID));
  let done = 0;

  for (const f of files) {
    if (done >= CONFIG.MAX_PER_RUN) break;
    if (synced[f.getId()]) continue;
    if (!/^image\//.test(f.getMimeType())) continue;

    const path = targetPath(f.getName());
    const res = putFile(token, path, f);
    if (res === 'ok' || res === 'replaced') {
      synced[f.getId()] = path;
      props.setProperty('SYNCED_IDS', JSON.stringify(synced));
      done++;
      console.log(`${res}: ${f.getName()} → ${path}`);
    } else {
      console.error(`Lỗi ${f.getName()}: ${res}`);
    }
  }
  console.log(`Xong, đẩy ${done} ảnh.`);
}

// Quét folder gốc và mọi thư mục con (ảnh có thể nằm trong "10-04-2026 (Phien 3)/")
function listImagesRecursive(folder, out) {
  out = out || [];
  const files = folder.getFiles();
  while (files.hasNext()) out.push(files.next());
  const subs = folder.getFolders();
  while (subs.hasNext()) listImagesRecursive(subs.next(), out);
  return out;
}

function targetPath(name) {
  const m = name.match(/(\d{2}-\d{2}-\d{4}).*?Phien\s*(\d+).*?Image\s*(\d+)/i);
  const ext = (name.match(/\.(png|jpe?g|webp)$/i) || ['.png'])[0].toLowerCase();
  if (!m) return 'unsorted/' + name;
  const num = ('0' + parseInt(m[3], 10)).slice(-2);
  return `${m[1]} - Phien ${parseInt(m[2], 10)}/${num}${ext}`;
}

function putFile(token, path, file) {
  const url = `https://api.github.com/repos/${CONFIG.OWNER}/${CONFIG.REPO}/contents/` +
              path.split('/').map(encodeURIComponent).join('/');
  const headers = { Authorization: 'Bearer ' + token, Accept: 'application/vnd.github+json' };

  // If the path already exists on GitHub, overwrite it (a re-generated image uploaded to Drive
  // with the same name replaces the old one). The GitHub API requires the current sha to update.
  const check = UrlFetchApp.fetch(url + '?ref=' + CONFIG.BRANCH, { headers, muteHttpExceptions: true });
  let sha = null;
  if (check.getResponseCode() === 200) {
    try { sha = JSON.parse(check.getContentText()).sha; } catch (e) {}
  }

  const body = {
    message: (sha ? 'Drive sync (replace): ' : 'Drive sync: ') + path,
    content: Utilities.base64Encode(file.getBlob().getBytes()),
    branch: CONFIG.BRANCH,
  };
  if (sha) body.sha = sha;
  const r = UrlFetchApp.fetch(url, {
    method: 'put', headers, contentType: 'application/json',
    payload: JSON.stringify(body), muteHttpExceptions: true,
  });
  const code = r.getResponseCode();
  return (code === 200 || code === 201) ? (sha ? 'replaced' : 'ok') : `HTTP ${code} ${r.getContentText().slice(0, 200)}`;
}
