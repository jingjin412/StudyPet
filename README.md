# 寵物共讀專注 App MVP

這是一個用 Expo + React Native + TypeScript 製作的讀書專注 app prototype。核心概念是讓水豚 capy 陪使用者讀書，並把個人讀書、好友共讀、打卡、獎勵、寵物成長串成一個可操作的 MVP 流程。

## 啟動方式

```bash
npm install
npm start
```

`npm start` 會開啟 Expo dev server，終端機會顯示 QR code。用手機 Expo Go 掃 QR code 就可以預覽 app。

其他可用指令：

```bash
npm run ios
npm run android
npm run web
npm run typecheck
```

目前 demo 模式會把「分鐘」當成「秒」倒數，所以 25 分鐘會在 25 秒後完成，方便測試完整流程。

## 目前已有功能

### 首頁

- 顯示 app logo、使用者名字與 ID。
- 顯示目前寵物 capy 的平常狀態。
- 顯示寵物等級、EXP、顏色與裝備。
- 顯示今日專注分鐘與金幣數量。
- 顯示目前共讀教室內的朋友人數。
- 提供以下入口：
  - 開始讀書
  - 加入共讀教室
  - 寵物衣櫃
  - 讀書紀錄
  - 用戶資料

### 用戶資料

- 從首頁右上角「用戶」按鈕進入。
- 可以修改使用者名字。
- 可以修改使用者 ID。
- 修改後會即時更新到 app 目前狀態，但目前只存在記憶體中，重新啟動 app 後會回到預設資料。

### 開始讀書

- 可以選擇科目：
  - 國文
  - 英文
  - 數學
  - 自然
  - 社會
  - 其他
- 可以選擇讀書時間：
  - 25 分鐘
  - 45 分鐘
  - 60 分鐘
  - 90 分鐘
- 可以選擇模式：
  - 個人讀書
  - 好友共讀
- 有開始前打卡區塊。
- 按「開始專注」後會進入倒數讀書畫面。

### 專注倒數

- 顯示目前模式、剩餘時間、科目與原設定時間。
- 寵物會切換成 capy 讀書狀態。
- 倒數結束後會進入讀書結算頁。
- 可以按「提前結束」直接進入結算。
- 若是好友共讀模式，會顯示目前共讀人數。

### 讀書結算

- 顯示本次讀書科目、時間與模式。
- 可以選擇完成狀態：
  - 完成
  - 部分完成
  - 沒完成
- 有結束後打卡區塊。
- 顯示本次獲得的 EXP 與金幣。
- 回首頁後會更新：
  - 使用者金幣
  - 今日專注分鐘
  - 寵物 EXP / 等級
  - 讀書紀錄列表

### 共讀教室

- 顯示「晚自習 A 教室」。
- 使用 `figure/classroom.png` 作為空教室背景。
- 教室內有固定座位點，目前共有 6 個座位。
- 朋友的 capy 會出現在各自座位上，呈現一起進教室讀書的概念。
- 使用者可以點空位，移動自己的 capy 到該座位。
- 顯示目前座位使用數與全員準備狀態。
- 顯示朋友的座位與準備狀態摘要。
- 可以切換自己的準備狀態。
- 可以按「開始共讀」或「開始共讀（Demo）」進入好友共讀倒數。

### 寵物衣櫃

- 顯示目前 capy、等級、EXP 與金幣。
- 可以更換寵物顏色：
  - 原色
  - 白色
  - 焦糖色
  - 灰色
- 可以套用或卸下配件：
  - 圓眼鏡
  - 小書包
  - 小帽子

### 讀書紀錄

- 顯示最近讀書紀錄。
- 每筆紀錄包含：
  - 日期
  - 科目
  - 分鐘數
  - 模式
  - EXP
  - 金幣
- 完成新讀書流程後，會把「今天」的新紀錄加到最前面。

### 寵物與視覺素材

- 目前寵物已改成 capy 圖片。
- capy 有三種狀態：
  - `capy_normal.png`: 平常狀態
  - `capy_study.png`: 讀書狀態
  - `capy_class.png`: 教室共讀狀態
- app logo 使用 `studyapp_logo`。
- Expo app icon、splash、Android adaptive icon 都已設定到 app config。

## 已有按鈕但尚未完整製作的部分

### 拍照打卡

目前「開始前打卡」與「結束後打卡」都只是 placeholder。

- 按鈕名稱是「模擬拍照打卡」。
- 按下後只會把狀態改成已拍照。
- 尚未串接真實相機。
- 尚未儲存照片。
- 尚未顯示真實照片預覽。

### 共讀教室

目前共讀功能是 demo。

- 朋友與座位資料是寫在本機狀態裡的假資料。
- 準備狀態只在本機切換。
- 座位移動只在本機更新。
- 尚未串接登入、好友系統、邀請碼或即時同步。
- 「開始共讀（Demo）」即使不是所有人都準備好，也可以開始測試流程。

### 寵物衣櫃

目前衣櫃是 prototype。

- 顏色切換會改變寵物展示底色。
- 配件只用文字 badge 顯示。
- 尚未把眼鏡、書包、帽子真正疊到 capy 圖片上。
- 尚未製作購買流程、解鎖條件或庫存管理。

### 使用者資料

目前可以修改名字與 ID，但資料只存在 app runtime state。

- 尚未做帳號登入。
- 尚未做資料持久化。
- 尚未串接後端或雲端同步。

### 獎勵與紀錄

目前獎勵規則是本機計算。

- 尚未依照「部分完成」或「沒完成」調整獎勵。
- 尚未防止重複結算以外的所有邊界情境。
- 讀書紀錄尚未存到資料庫或本機 storage。

## 主要檔案導覽

- `App.tsx`: app navigation route 設定。
- `app.json`: Expo app 名稱、icon、splash、bundle id 設定。
- `src/state/AppContext.tsx`: app 的核心狀態與假資料。
- `src/types.ts`: 全域型別定義。
- `src/theme.ts`: 顏色、間距、陰影。
- `src/screens/HomeScreen.tsx`: 首頁。
- `src/screens/UserProfileScreen.tsx`: 用戶資料頁。
- `src/screens/StartStudyScreen.tsx`: 開始讀書設定頁。
- `src/screens/FocusScreen.tsx`: 專注倒數頁。
- `src/screens/ResultScreen.tsx`: 讀書結算頁。
- `src/screens/StudyRoomScreen.tsx`: 共讀教室頁。
- `src/screens/PetClosetScreen.tsx`: 寵物衣櫃頁。
- `src/screens/StudyHistoryScreen.tsx`: 讀書紀錄頁。
- `src/components/PetAvatar.tsx`: capy 圖片狀態切換。
- `src/components/PhotoCheckIn.tsx`: 打卡 placeholder 元件。
- `src/data/rewards.ts`: EXP 與金幣獎勵規則。

## 目前技術狀態

- Framework: Expo + React Native
- Language: TypeScript
- Navigation: React Navigation native stack
- State: React Context + `useState`
- Persistence: 尚未加入
- Backend: 尚未加入
