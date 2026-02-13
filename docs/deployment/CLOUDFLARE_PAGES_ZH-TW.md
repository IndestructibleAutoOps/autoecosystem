# Cloudflare Pages 部署設定指南

## 重要說明

### 要使用的項目名稱
- ✅ **使用**: `ecosystem` 
- ❌ **不要使用**: `autoecoops` (請在 Cloudflare 儀表板中刪除此項目)

## Cloudflare Pages 儀表板設定

### 構建設定

請在 Cloudflare Pages 的 "ecosystem" 項目中使用以下設定：

| 設定項目 | 設定值 |
|---------|--------|
| 框架預設 | Next.js |
| 構建命令 | `cd frontend/project-01 && pnpm install && pnpm build:cf` |
| 構建輸出目錄 | `.open-next/assets` |
| 根目錄 (進階) | `/` (倉庫根目錄) |
| Node.js 版本 | 18 或更高 |

### ❌ 錯誤的設定 (不要使用)

以下是**錯誤**的設定，請不要使用：

- ❌ 構建命令: `npx @cloudflare/next-on-pages@1`
- ❌ 輸出目錄: `.vercel/output/static`

### ✅ 正確的設定

- ✅ 構建命令: `cd frontend/project-01 && pnpm install && pnpm build:cf`
- ✅ 輸出目錄: `.open-next/assets`
- ✅ 根目錄: `/` (留空或設為倉庫根目錄)

## 為什麼之前部署失敗？

### 原因 1: 構建命令不正確
您的項目使用 `@opennextjs/cloudflare`，不是 `@cloudflare/next-on-pages`。

### 原因 2: 輸出目錄不正確
OpenNext Cloudflare 適配器生成的輸出在 `.open-next/assets`，不是 `.vercel/output/static`。

### 原因 3: 前端項目不在 pnpm workspace 中
前端項目需要包含在 `pnpm-workspace.yaml` 中才能正確解析依賴。

## 環境變數設定

在 Cloudflare Pages 儀表板的環境變數部分添加：

```
NEXT_PUBLIC_SUPABASE_URL=https://yrfxijooswpvdpdseswy.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<您的-supabase-anon-key>
```

## 如何刪除 "autoecoops" 項目

1. 前往 Cloudflare 儀表板
2. 導航到 Workers & Pages
3. 找到 "autoecoops" 項目
4. 點擊 Settings (設定)
5. 滾動到底部，點擊 "Delete project" (刪除項目)
6. 確認刪除

## 本地測試

在部署到 Cloudflare 之前，您可以在本地測試：

```bash
# 從倉庫根目錄
cd frontend/project-01

# 安裝依賴
pnpm install

# 構建
pnpm build:cf

# 預覽
pnpm preview
```

## 檢查清單

部署前請確認：

- [ ] 使用 "ecosystem" 項目，不是 "autoecoops"
- [ ] 構建命令: `cd frontend/project-01 && pnpm install && pnpm build:cf`
- [ ] 輸出目錄: `.open-next/assets`
- [ ] 根目錄: `/` (倉庫根目錄)
- [ ] Node.js 版本: 18+
- [ ] 已設定環境變數 (NEXT_PUBLIC_SUPABASE_URL 和 NEXT_PUBLIC_SUPABASE_ANON_KEY)
- [ ] 已刪除舊的 "autoecoops" 項目

## 更多詳情

請參閱英文版完整文檔：`docs/deployment/CLOUDFLARE_PAGES_DEPLOYMENT.md`
