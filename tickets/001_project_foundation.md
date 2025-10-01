# #001 プロジェクト基盤構築

## 概要
マネーチェックアプリの基本構造とコア機能を構築する

## タスク

### 型定義
- [x] `types/index.ts` を作成
- [x] `MoneyCheckData` インターフェース定義
- [x] `DiagnoseResult` インターフェース定義
- [x] `Advice` インターフェース定義

### sessionStorage管理
- [x] `lib/sessionStorage.ts` を作成
- [x] `saveData()` 関数実装
- [x] `getData()` 関数実装
- [x] `clearData()` 関数実装

### 共通コンポーネント
- [x] `components/Footer.tsx` を作成（免責事項）
- [x] `components/ProgressBar.tsx` を作成（7ステップ進捗）
- [x] `app/layout.tsx` を更新（フッター組み込み）

### ルートページ
- [x] `app/page.tsx` を作成（トップページ）
- [x] アプリ説明とスタートボタン実装
- [x] レスポンシブ対応（黒・白・深い青）

## 受け入れ基準
- [ ] 全ての型定義が`any`を使わずに完成している
- [ ] sessionStorageの保存・取得が正常動作する
- [ ] フッターが全ページに表示される
- [ ] 各ファイルが300行以内
- [ ] ファイルヘッダーが全てのファイルに記載されている

## 関連ファイル
- `types/index.ts`
- `lib/sessionStorage.ts`
- `components/Footer.tsx`
- `components/ProgressBar.tsx`
- `app/layout.tsx`
- `app/page.tsx`

## 注意事項
- Client ComponentでのみsessionStorageを使用
- "use client"を適切に配置
- 色は黒・白・深い青のみ使用
