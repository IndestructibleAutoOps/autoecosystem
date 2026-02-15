# Cloudflare Pages 部署修復 - 修改摘要

## ✅ 已完成的修改

### 1. 更新 `frontend/project-01/package.json` 中的 `build:cf` 指令

**原始指令：**
```json
"build:cf": "NEXT_PUBLIC_SUPABASE_URL=https://yrfxijooswpvdpdseswy.supabase.co NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_rhTyBa4IqqV14nV_B87S7g_zKzDSYTd npx @opennextjs/cloudflare@1.16.5 build"
```

**新指令：**
```json
"build:cf": "NEXT_PUBLIC_SUPABASE_URL=https://yrfxijooswpvdpdseswy.supabase.co NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_rhTyBa4IqqV14nV_B87S7g_zKzDSYTd npx @opennextjs/cloudflare@latest build && mv .open-next/worker.js .open-next/_worker.js && cp -r .open-next/assets/* .open-next/ 2>/dev/null || true && node -e 'require(\"fs\").writeFileSync(\".open-next/_routes.json\", JSON.stringify({version:1,include:[\"/*\"],exclude:[\"/_next/static/*\",\"/favicon.ico\",\"/robots.txt\",\"/sitemap.xml\",\"/feed.xml\",\"/404.html\",\"/BUILD_ID\",\"/search.json\",\"/tags/*\"]},null,2))'"
```

**變更內容：**
- ✅ 保留了 Supabase 環境變數
- ✅ 升級到 `@opennextjs/cloudflare@latest` 使用最新版本
- ✅ 添加後處理步驟：
  1. `mv .open-next/worker.js .open-next/_worker.js` - 重新命名為 Cloudflare Pages 需要的格式
  2. `cp -r .open-next/assets/* .open-next/` - 複製 assets 到正確位置
  3. `node -e '...'` - 生成 `_routes.json` 路由配置檔案

### 2. 重新命名根目錄的 `wrangler.toml`

- ✅ 已將 `wrangler.toml` 重新命名為 `wrangler.toml.bak`
- ✅ 這樣可以避免 Cloudflare Pages 的警告訊息

---

## 📝 Cloudflare Pages 設定變更

完成程式碼修改後，你需要在 Cloudflare Pages 修改以下設定：

### 進入設定頁面
1. 登入 Cloudflare Dashboard
2. 進入你的 Pages 專案
3. 點選 **Settings** → **Builds & deployments**
4. 找到 **Build configuration** 區塊

### 必要的設定變更

| 設定項目 | 設定值 |
|---------|--------|
| **Framework preset** | `Next.js (Static HTML Export)` 或 `None` |
| **Build command** | `pnpm run build:cf --filter=./frontend/project-01...` |
| **Build output directory** | `frontend/project-01/.open-next` |
| **Root directory** | `/` (保持根目錄，不要改成 frontend/project-01) |

### 備選的 Build command
如果上面的指令不行，可以試試：
```bash
cd frontend/project-01 && pnpm run build:cf
```

---

## 🚀 部署步驟

1. **Merge 這個 PR** 到你的 main branch
2. **進入 Cloudflare Pages 設定頁面** 如上所述
3. **更新所有設定** 如上表所示
4. **儲存設定** (點擊 Save)
5. **重新部署**：
   - 進入 **Deployments** 分頁
   - 找到最新的失敗部署
   - 點擊 **Retry deployment**
6. **等待建置完成** - 這次應該會上傳所有檔案而不是只有 52 個

---

## 🔍 預期結果

建置成功後，`.open-next` 資料夾應該包含：

```
frontend/project-01/.open-next/
├── _worker.js          (Cloudflare Worker 入口點)
├── _routes.json        (路由配置)
├── _next/              (Next.js 靜態檔案)
├── cache/
└── [其他建置檔案]
```

之前的問題（只上傳 52 個檔案）是因為：
- ❌ `worker.js` 沒有重新命名為 `_worker.js`（Cloudflare Pages 要求）
- ❌ assets 沒有複製到正確位置
- ❌ 缺少 `_routes.json`，導致路由問題和 404 錯誤

現在這些問題都已修正！✅

---

## 📚 詳細文件

更多詳細說明和疑難排解，請參考：
- [CLOUDFLARE_PAGES_SETUP.md](./CLOUDFLARE_PAGES_SETUP.md) (英文版完整文件)

---

## ⚠️ 注意事項

### 關於 Supabase API Keys
- 這些 key 是公開的匿名金鑰（NEXT_PUBLIC_* 和 sb_publishable_* 前綴表示）
- 它們設計上就是要在客戶端程式碼中公開的
- 如果想要更好的安全實務，可以考慮將它們設定為 Cloudflare Pages 的環境變數

### 關於長指令
- build:cf 指令很長，但這是為了確保與 Cloudflare Pages 直接從 GitHub 部署的相容性
- 如果需要更好的維護性，可以將後處理步驟提取到獨立的 script 檔案中

---

有任何問題，請查看 [CLOUDFLARE_PAGES_SETUP.md](./CLOUDFLARE_PAGES_SETUP.md) 中的疑難排解章節！
