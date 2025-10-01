# Cloudflare Pages デプロイ手順

## ビルド設定

### 基本設定
- **Framework preset**: Next.js
- **Build command**: `npm run deploy`
- **Build output directory**: `.open-next/worker.js`
- **Node version**: 18 または 20
- **Environment variables**: 下記参照

### ビルドスクリプト
```json
{
  "deploy": "opennextjs-cloudflare build && opennextjs-cloudflare deploy",
  "preview": "opennextjs-cloudflare build && opennextjs-cloudflare preview"
}
```

---

## 必須環境変数

### Cloudflare Pages ダッシュボードで設定

#### 1. アプリケーション設定
```bash
APP_NAME=MoneyCheck
NODE_ENV=production
NEXT_PUBLIC_URL=https://your-domain.pages.dev
```

#### 2. Stripe設定（本番環境）
```bash
STRIPE_SECRET_KEY=sk_live_xxxxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxx
```

**⚠️ 注意**:
- テスト環境: `sk_test_` / `pk_test_` で始まるキー
- 本番環境: `sk_live_` / `pk_live_` で始まるキー
- 環境変数は絶対にGitにコミットしないこと

---

## Stripe Webhook設定

### 1. Stripe Dashboard での設定手順

1. [Stripe Dashboard](https://dashboard.stripe.com/) にログイン
2. **Developers** → **Webhooks** を開く
3. **Add endpoint** をクリック
4. **Endpoint URL** に入力:
   ```
   https://your-domain.pages.dev/api/stripe/webhook
   ```
5. **Events to send** で以下を選択:
   - `checkout.session.completed`
6. **Add endpoint** をクリック
7. 作成されたエンドポイントの **Signing secret** をコピー
8. Cloudflare Pagesの環境変数 `STRIPE_WEBHOOK_SECRET` に設定

### 2. ローカル開発でのWebhookテスト

```bash
# Stripe CLIをインストール
brew install stripe/stripe-cli/stripe

# Stripe CLIでログイン
stripe login

# Webhookをローカルにフォワード
stripe listen --forward-to localhost:3000/api/stripe/webhook

# 別ターミナルでテスト決済をトリガー
stripe trigger checkout.session.completed
```

---

## デプロイ手順

### 初回デプロイ

1. **GitHubリポジトリをCloudflareに接続**
   - Cloudflare Dashboard → Pages → Create a project
   - Connect to Git → GitHubを選択
   - リポジトリを選択

2. **ビルド設定**
   - Build command: `npm run deploy`
   - Build output directory: `.open-next/worker.js`
   - Environment variables: 上記の環境変数を全て設定

3. **デプロイ実行**
   - Save and Deploy をクリック
   - ビルドログを確認

### 継続的デプロイ

- `main` ブランチへのプッシュで自動デプロイ
- プルリクエストごとにプレビュー環境が自動作成

---

## デプロイ後の確認項目

### 機能テスト
- [ ] トップページ表示
- [ ] 7つの入力ページ（労働収入 → 負債）
- [ ] sessionStorage保存・取得
- [ ] 無料診断結果表示
- [ ] プレミアムプレビュー表示
- [ ] Stripe決済テスト（テストカード: `4242 4242 4242 4242`）
- [ ] 決済成功ページ表示
- [ ] プレミアム診断表示
- [ ] 決済キャンセルページ表示

### UI/UX確認
- [ ] モバイル表示（レスポンシブ）
- [ ] デスクトップ表示
- [ ] プログレスバー動作
- [ ] 戻るボタン動作
- [ ] 免責事項表示（全ページフッター）
- [ ] スクリーンショット保存注意表示

### パフォーマンス
- [ ] First Contentful Paint < 2秒
- [ ] Time to Interactive < 3秒
- [ ] Lighthouse Score > 90

### セキュリティ
- [ ] HTTPS有効
- [ ] 環境変数が公開されていない
- [ ] Stripe Webhook署名検証が動作

---

## トラブルシューティング

### ビルドエラー

**問題**: `npm run deploy` でエラー
```bash
# ローカルでビルド確認
npm run build

# TypeScriptエラー確認
npm run lint
```

**問題**: 環境変数が読み込まれない
- Cloudflare Pagesダッシュボードで環境変数を再確認
- デプロイを再実行（Retry deployment）

### Stripe決済エラー

**問題**: 決済ページに遷移しない
- ブラウザコンソールでエラー確認
- `/api/stripe/checkout` のレスポンスを確認

**問題**: Webhookが動作しない
- Stripe Dashboardでイベントログ確認
- Webhook URLが正しいか確認
- `STRIPE_WEBHOOK_SECRET` が正しいか確認

### sessionStorageエラー

**問題**: データが保存されない
- ブラウザの開発者ツールでsessionStorageを確認
- プライベートブラウジングモードではsessionStorageが制限される場合あり

---

## ロールバック手順

問題が発生した場合:

1. Cloudflare Pages Dashboard を開く
2. Deployments タブを開く
3. 正常に動作していたデプロイを選択
4. **Rollback to this deployment** をクリック

---

## 本番環境チェックリスト

### デプロイ前
- [ ] `npm run build` が成功する
- [ ] E2Eテストが全て合格
- [ ] TypeScriptエラーがない
- [ ] 環境変数が準備されている
- [ ] Stripe本番APIキー取得済み

### デプロイ後
- [ ] 全ページが表示される
- [ ] 入力フローが動作する
- [ ] 診断結果が正しく計算される
- [ ] 決済が完了する（少額テスト）
- [ ] モバイル表示が正常
- [ ] 免責事項が全ページに表示

---

## 参考リンク

- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [OpenNext.js for Cloudflare](https://opennext.js.org/cloudflare)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Stripe Webhooks](https://stripe.com/docs/webhooks)
- [Stripe Testing](https://stripe.com/docs/testing)

---

## サポート

問題が発生した場合:
1. Cloudflare Pages ログを確認
2. ブラウザコンソールでエラー確認
3. Stripe Dashboardでイベントログ確認
4. 必要に応じてロールバック実行
