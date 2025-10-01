# #007 デプロイと最終調整

## 概要
Cloudflare Pagesへのデプロイと本番環境の最終調整を行う

## タスク

### ローカルテスト
- [ ] 全ページの動作確認
- [ ] 入力フロー（1/7 → 7/7）テスト
- [ ] 無料診断テスト
- [ ] Stripe決済テスト（テストモード）
- [ ] プレミアム診断テスト
- [ ] レスポンシブ表示確認
- [ ] エラーハンドリング確認

### ビルド確認
- [ ] `npm run build` 実行
- [ ] ビルドエラー修正
- [ ] TypeScriptエラー確認
- [ ] 警告の確認と対処

### Cloudflare Pages設定
- [ ] Cloudflare Pagesプロジェクト作成
- [ ] GitHubリポジトリ連携
- [ ] ビルド設定
  - Framework: Next.js
  - Build command: `npm run build`
  - Output directory: `.next`
  - Node version: 18

### 環境変数設定
- [ ] Cloudflare Pagesに環境変数追加
  - `NEXT_PUBLIC_URL`（本番URL）
  - `STRIPE_SECRET_KEY`（本番キー）
  - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`（本番キー）
  - `STRIPE_WEBHOOK_SECRET`（本番Webhook）
  - `NODE_ENV=production`
  - `APP_NAME=MoneyCheck`

### Stripe本番設定
- [ ] Stripeアカウントの本番モード有効化
- [ ] 本番APIキー取得
- [ ] Webhook URL設定（本番URL/api/stripe/webhook）
- [ ] Webhookシークレット取得
- [ ] 商品・価格設定確認

### デプロイ実行
- [ ] 初回デプロイ実行
- [ ] デプロイログ確認
- [ ] 本番URLアクセス確認
- [ ] 全機能動作確認

### 最終チェック
- [ ] 全ページ表示確認
- [ ] 入力フロー動作確認
- [ ] 診断結果表示確認
- [ ] 決済フロー確認（少額テスト）
- [ ] モバイル表示確認
- [ ] パフォーマンス確認
- [ ] SEO基本設定確認（タイトル、description）

## デプロイ後確認項目
- [ ] トップページ表示
- [ ] 7つの入力ページ全て動作
- [ ] sessionStorage保存・取得
- [ ] 無料診断結果表示
- [ ] プレミアムプレビュー表示
- [ ] Stripe決済完了
- [ ] プレミアム診断表示
- [ ] 免責事項表示（全ページ）
- [ ] スクリーンショット保存注意表示

## 受け入れ基準
- [ ] 本番環境で全機能が動作する
- [ ] 決済が正常に完了する
- [ ] エラーが発生しない
- [ ] モバイル・デスクトップ両方で表示が正常
- [ ] ページロード速度が許容範囲内
- [ ] 免責事項が全ページに表示される

## ロールバック手順
問題発生時:
1. Cloudflare Pagesダッシュボードから前のデプロイに戻す
2. 問題を修正
3. 再デプロイ

## 関連ドキュメント
- Cloudflare Pages: https://developers.cloudflare.com/pages/
- Next.js デプロイ: https://nextjs.org/docs/deployment
- Stripe Webhook: https://stripe.com/docs/webhooks

## 注意事項
- 本番APIキーは慎重に扱う
- 環境変数は絶対にコミットしない
- デプロイ前に必ずビルド確認
- Webhook URLは本番URLを使用
