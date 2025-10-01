# #006 決済機能実装（Stripe統合）

## 概要
Stripe決済機能を実装し、500円の買い切り課金でプレミアム診断にアクセスできるようにする

## タスク

### Stripe設定
- [x] `lib/stripe.ts` を作成
- [x] Stripe初期化コード実装
- [x] 環境変数設定確認（.env.local）
  - `STRIPE_SECRET_KEY`
  - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
  - `STRIPE_WEBHOOK_SECRET`

### Checkout API
- [x] `app/api/stripe/checkout/route.ts` を作成
- [x] POST メソッド実装
- [x] Checkout Session作成
  - 商品名: "MoneyCheck プレミアム診断"
  - 金額: 500円
  - 通貨: JPY
  - モード: payment（買い切り）
- [x] success_url設定（/payment/success）
- [x] cancel_url設定（/result/preview）

### Webhook API
- [x] `app/api/stripe/webhook/route.ts` を作成
- [x] POST メソッド実装
- [x] Stripe署名検証
- [x] `checkout.session.completed` イベント処理
- [x] ログ記録（デバッグ用）

### 決済完了ページ
- [x] `app/payment/success/page.tsx` を作成
- [x] 決済完了メッセージ表示
- [x] "診断結果を見る"ボタン（/result/premium へ）
- [x] sessionStorageにプレミアムアクセス権保存

### キャンセルページ
- [x] `app/payment/cancel/page.tsx` を作成
- [x] キャンセルメッセージ表示
- [x] "プレビューに戻る"ボタン（/result/preview へ）

### プレミアムアクセス管理
- [x] sessionStorageにアクセス権管理追加
- [x] プレミアムページでアクセス権チェック
- [x] 未購入時はプレビューへリダイレクト

## 決済フロー
```
プレビューページ
    ↓
 [購入ボタン]
    ↓
Stripe Checkout
    ↓
  決済完了 → /payment/success → プレミアム診断
    ↓                            (/result/premium)
 キャンセル → /payment/cancel → プレビューに戻る
```

## 環境変数設定（.env.local）
```env
NEXT_PUBLIC_URL=http://localhost:3000
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

## 受け入れ基準
- [x] Stripe Checkoutが正常に動作する（実装完了、要テスト）
- [x] 決済完了後にプレミアムページにアクセスできる
- [x] 未購入時はプレミアムページにアクセスできない
- [x] Webhookが正常に動作する（実装完了）
- [x] キャンセル時に適切にハンドリングされる
- [x] エラーハンドリングが実装されている
- [x] 各ファイル300行以内

## Cloudflare Pages環境変数
デプロイ時に以下を設定:
- `NEXT_PUBLIC_URL`（本番URL）
- `STRIPE_SECRET_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_WEBHOOK_SECRET`

## テスト用カード
```
カード番号: 4242 4242 4242 4242
有効期限: 任意の未来日付
CVC: 任意の3桁
郵便番号: 任意
```

## 関連ファイル
- `lib/stripe.ts`
- `app/api/stripe/checkout/route.ts`
- `app/api/stripe/webhook/route.ts`
- `app/payment/success/page.tsx`
- `app/payment/cancel/page.tsx`
- `app/result/preview/page.tsx`
- `app/result/premium/page.tsx`

## 注意事項
- API RouteはServer Component
- Webhook署名検証必須
- 環境変数をハードコードしない
- テスト用APIキーと本番用を分ける
- ファイルヘッダー必須
