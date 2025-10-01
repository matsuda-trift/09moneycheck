# #003 入力フォーム実装（2/3: 無駄遣い・自己投資・資産・負債）

## 概要
7項目入力のうち、残りの4項目（無駄遣い、自己投資、資産、負債）を実装する

## タスク

### 4. 無駄遣い入力ページ
- [x] `app/input/waste/page.tsx` を作成
- [x] InputFormコンポーネント使用
- [x] sessionStorageに保存
- [x] プログレスバー表示（4/7）
- [x] 戻る/次へボタン実装

### 5. 自己投資入力ページ
- [x] `app/input/self-investment/page.tsx` を作成
- [x] InputFormコンポーネント使用
- [x] sessionStorageに保存
- [x] プログレスバー表示（5/7）
- [x] 戻る/次へボタン実装

### 6. 資産入力ページ
- [x] `app/input/asset/page.tsx` を作成
- [x] InputFormコンポーネント使用
- [x] sessionStorageに保存
- [x] プログレスバー表示（6/7）
- [x] 戻る/次へボタン実装

### 7. 負債入力ページ
- [x] `app/input/debt/page.tsx` を作成
- [x] InputFormコンポーネント使用
- [x] sessionStorageに保存
- [x] プログレスバー表示（7/7）
- [x] 戻る/診断開始ボタン実装
- [x] 診断開始で無料診断ページに遷移

## 受け入れ基準
- [x] 全ページでバリデーションが動作する
- [x] sessionStorageに正しく保存される
- [x] プログレスバーが正しく表示される
- [x] 7/7まで入力完了後、無料診断へ遷移できる
- [x] 全7項目のデータが正しく保存されている
- [x] レスポンシブ対応完了

## 入力フロー確認
```
労働収入(1/7) → 受動収入(2/7) → 固定費(3/7) → 無駄遣い(4/7)
→ 自己投資(5/7) → 資産(6/7) → 負債(7/7) → 無料診断
```

## 関連ファイル
- `app/input/waste/page.tsx`
- `app/input/self-investment/page.tsx`
- `app/input/asset/page.tsx`
- `app/input/debt/page.tsx`
- `components/InputForm.tsx`
- `lib/sessionStorage.ts`
- `components/ProgressBar.tsx`

## 注意事項
- 全て Client Component ("use client")
- ファイルヘッダー必須
- 300行制限遵守
- 最後のページから無料診断へ遷移
