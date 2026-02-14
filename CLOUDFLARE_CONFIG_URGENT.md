# 🚨 緊急：Cloudflare Pages 配置錯誤

## 你的部署失敗原因

你的 Cloudflare Pages 配置**完全錯誤**，導致部署失敗。

### ❌ 你當前的錯誤配置

根據你的描述，你在 Cloudflare Pages 儀表板中設置的是：

```
Build command: npx @cloudflare/next-on-pages@1
Output directory: .vercel/output/static
Root directory: frontend/project-01
```

**這三個設置都是錯誤的！**

## ✅ 正確的配置

### 必須在 Cloudflare Pages 儀表板中更改為：

| 設置項目 | 正確的值 |
|---------|---------|
| 框架預設 (Framework preset) | Next.js |
| 構建命令 (Build command) | `cd frontend/project-01 && pnpm install && pnpm build:cf` |
| 構建輸出目錄 (Build output directory) | `.open-next/assets` |
| 根目錄 (Root directory) | `/` **（留空或設為空）** |
| Node.js 版本 | 18 或 20 |

### 如何更改配置

1. 登入 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 前往 **Workers & Pages**
3. 選擇 **ecosystem** 項目
4. 點擊 **Settings** → **Build settings**
5. 點擊 **Edit configurations**
6. **完全替換**所有設置為上面表格中的正確值
7. 點擊 **Save** 保存

## 🔍 為什麼之前的配置是錯誤的？

### 錯誤 1: 構建命令錯誤
```
❌ npx @cloudflare/next-on-pages@1
✅ cd frontend/project-01 && pnpm install && pnpm build:cf
```

**原因：**
- 這個項目使用的是 `@opennextjs/cloudflare` 適配器
- 不是 `@cloudflare/next-on-pages`
- `build:cf` 命令在 `package.json` 中定義為 `npx @opennextjs/cloudflare@latest build`

### 錯誤 2: 輸出目錄錯誤
```
❌ .vercel/output/static
✅ .open-next/assets
```

**原因：**
- OpenNext Cloudflare 的輸出目錄是 `.open-next/assets`
- `.vercel/output/static` 是 Vercel 的輸出目錄，與本項目無關

### 錯誤 3: 根目錄錯誤
```
❌ frontend/project-01
✅ / (留空)
```

**原因：**
- 構建命令已經包含了 `cd frontend/project-01`
- 如果根目錄設為 `frontend/project-01`，實際執行的路徑會是 `frontend/project-01/frontend/project-01`（錯誤！）
- 根目錄應該是倉庫根目錄

## 📋 修改後的步驟

### 步驟 1: 更新 Cloudflare Pages 配置
按照上面的正確配置更新 Cloudflare Pages 儀表板設置。

### 步驟 2: 確認環境變數已設置
在 Cloudflare Pages → ecosystem → Settings → Environment variables 中確認已設置：

```
NEXT_PUBLIC_SUPABASE_URL=https://yrfxijooswpvdpdseswy.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<你的實際金鑰>
```

### 步驟 3: 觸發新的部署
1. 可以推送一個新的提交到 GitHub
2. 或在 Cloudflare Pages 中點擊 "Retry deployment"

### 步驟 4: 檢查部署日誌
部署應該會成功。如果失敗，檢查：
- 是否所有三個配置都已更新？
- Node.js 版本是否為 18 或 20？
- 環境變數是否已設置？

## 🎯 快速檢查清單

在觸發新部署前，請確認：

- [ ] 構建命令 = `cd frontend/project-01 && pnpm install && pnpm build:cf`
- [ ] 輸出目錄 = `.open-next/assets`
- [ ] 根目錄 = `/` (留空)
- [ ] Node.js 版本 = 18 或 20
- [ ] 環境變數已設置（NEXT_PUBLIC_SUPABASE_URL 和 NEXT_PUBLIC_SUPABASE_ANON_KEY）

## 📞 仍然有問題？

如果按照正確配置後仍然失敗，請提供：
1. 完整的 Cloudflare Pages 構建日誌
2. 確認已使用上述**正確的配置**
3. 截圖顯示 Cloudflare Pages 的 Build settings 頁面

---

**重要提示：** 你之前提供的配置（`npx @cloudflare/next-on-pages@1` 和 `.vercel/output/static`）是完全不適用於這個項目的。這個項目是一個使用 OpenNext Cloudflare 的 Next.js 應用，必須使用上述的正確配置。
