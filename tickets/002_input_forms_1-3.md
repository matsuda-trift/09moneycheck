# #002 入力フォーム実装（1/3: 労働収入・受動収入・固定費）

## 概要
7項目入力のうち、最初の3項目（労働収入、受動収入、固定費）を実装する

## タスク

### 共通フォームコンポーネント
- [x] `components/InputForm.tsx` を作成
- [x] 金額入力フィールド実装
- [x] バリデーション実装（必須・数値・0以上）
- [x] エラーメッセージ表示機能
- [x] 次へ/戻るボタン実装

### 1. 労働収入入力ページ
- [x] `app/input/labor-income/page.tsx` を作成
- [x] InputFormコンポーネント使用
- [x] sessionStorageに保存
- [x] プログレスバー表示（1/7）
- [x] 次へで受動収入ページに遷移

### 2. 受動収入入力ページ
- [x] `app/input/passive-income/page.tsx` を作成
- [x] InputFormコンポーネント使用
- [x] sessionStorageに保存
- [x] プログレスバー表示（2/7）
- [x] 戻る/次へボタン実装

### 3. 固定費入力ページ
- [x] `app/input/fixed-cost/page.tsx` を作成
- [x] InputFormコンポーネント使用
- [x] sessionStorageに保存
- [x] プログレスバー表示（3/7）
- [x] 戻る/次へボタン実装

## 受け入れ基準
- [x] 全ページでバリデーションが動作する
- [x] sessionStorageに正しく保存される
- [x] プログレスバーが正しく表示される
- [x] 戻る/次へのナビゲーションが正常動作する
- [x] 0円入力が許可される
- [x] エラーメッセージが適切に表示される
- [x] レスポンシブ対応完了

## バリデーションルール
```
空欄: 「金額を入力してください」
非数値: 「数値を入力してください」
負数: 「0以上の数値を入力してください」
```

## 関連ファイル
- `components/InputForm.tsx`
- `app/input/labor-income/page.tsx`
- `app/input/passive-income/page.tsx`
- `app/input/fixed-cost/page.tsx`
- `lib/sessionStorage.ts`
- `components/ProgressBar.tsx`

## 注意事項
- 全て Client Component ("use client")
- ファイルヘッダー必須
- 300行制限遵守
