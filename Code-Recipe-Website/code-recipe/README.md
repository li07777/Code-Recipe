# Code Recipe｜程式碼食譜

以「料理食譜」方式整理 Python、Java、C++ 程式範例的繁體中文學習網站。每篇提供用途、前置知識、步驟、可執行程式碼、範例輸入輸出、時間與空間複雜度以及常見錯誤。

## 目前功能
- 使用語言、主題、難度與關鍵字篩選食譜
- 每篇食譜使用同一個 `recipe.html?id=<recipe-id>` 模板
- 複製程式碼（需要安全環境，例如 HTTPS 或 localhost）
- 手機與桌面響應式版型
- 純 HTML / CSS / JavaScript / JSON，不需後端或 API Key

## 專案架構
- `AGENTS.md`：AI 修改網站或新增食譜前的必讀規範
- `index.html`：首頁、搜尋與分類
- `recipe.html`：共用詳細頁
- `css/style.css`：全站樣式
- `js/app.js`：首頁互動
- `js/recipe.js`：食譜詳細頁
- `js/data.js`：資料載入與格式檢查
- `recipes/index.json`：食譜檔案索引
- `recipes/*.json`：各篇食譜資料

## 本機預覽
在專案資料夾執行：

```bash
python -m http.server 8000
```

然後開啟 `http://localhost:8000/`。請勿直接使用 `file://`，瀏覽器可能阻擋 `fetch()` 讀取 JSON。

## 在 GitHub Pages 發布
1. 新建公開 GitHub Repository（可命名 `code-recipe`）。
2. 上傳完整專案，確認 `index.html` 與 `AGENTS.md` 位於儲存庫根目錄。
3. 進入 **Settings → Pages**，選擇 **Deploy from a branch**、`main`、`/(root)`，儲存設定。
4. 網站預期網址為 `https://<your-account>.github.io/code-recipe/`（請以 GitHub Pages 提供的實際網址為準）。
5. 回到 `index.html` 將導覽列 GitHub 連結 `https://github.com/` 改為你的 Repository 連結。

**GitHub Repository：** 尚未發布（發布後補上實際連結）  
**公開網站：** 尚未發布（發布後補上實際連結）

## 新增食譜（AI 擴充流程）
先閱讀 `AGENTS.md`。確認題目與語言不重複後，依照現有 JSON 格式新增 `recipes/<topic>-<language>.json`，再於 `recipes/index.json` 的 `files` 陣列新增檔案名稱。**不需要更動 `index.html` 或建立新的 HTML 頁面**。測試 JSON 有效、程式可執行、搜尋與詳細頁正確後再提交。

推薦驗證題目：新增 Java 的 Binary Search，並對比程式輸出與複雜度。

## 開發與內容注意事項
網站範例是學習用，食譜程式碼未提供瀏覽器內執行功能。程式碼、輸出與複雜度必須對應同一實作。專案不應包含 API Key、個人隱私或未經授權教材。完整規範以 `AGENTS.md` 為準。
