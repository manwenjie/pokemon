# 🔥💧🌿 寶可夢屬性猜拳大對決

一個簡單又好玩的寶可夢主題小遊戲，玩法類似剪刀石頭布！

## 遊戲玩法

1. 選擇你的屬性：**火 / 水 / 草**
2. 點「抽寶可夢」抽出一隻該屬性的隨機寶可夢
3. 電腦也會隨機抽出一隻
4. 根據屬性相剋決定勝負：
   - 🔥 火 剋 🌿 草
   - 🌿 草 剋 💧 水
   - 💧 水 剋 🔥 火
5. 勝利就可以把寶可夢加入「我的圖鑑」！

## 如何在 GitHub 上架並讓大家玩

### 方法一：最簡單（推薦）

1. 到 GitHub 新建一個 Repository（例如取名 `pokemon-rps`）
2. 把這個資料夾裡的所有檔案上傳上去（`index.html`、`style.css`、`script.js`、`README.md`）
3. 進入 Repository → **Settings** → 左側 **Pages**
4. Source 選擇 `Deploy from a branch`
5. Branch 選 `main`（或 master），資料夾選 `/ (root)`
6. 按下 Save
7. 等大約 1 分鐘，就會出現網址：  
   `https://你的帳號.github.io/pokemon-rps/`

別人點這個網址就能直接在瀏覽器玩！

### 方法二：用 Git 指令

```bash
git init
git add .
git commit -m "寶可夢屬性猜拳小遊戲"
git branch -M main
git remote add origin https://github.com/你的帳號/pokemon-rps.git
git push -u origin main
```

然後依照上面步驟開啟 GitHub Pages。

## 檔案說明

- `index.html`：網頁結構
- `style.css`：像素風格介面
- `script.js`：遊戲邏輯與寶可夢資料

## 之後可以加強的方向

- 換成真正的像素精靈圖（可從免費素材或自己畫）
- 加入音效
- 增加更多屬性或寶可夢
- 加入本地儲存（重整後圖鑑還在）
- 做出簡單的對戰動畫

祝玩得開心！有問題再跟我說～
