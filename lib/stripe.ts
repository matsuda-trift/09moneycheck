// 位置: lib/stripe.ts
// 機能: Stripe初期化設定
// 理由: 決済機能のための共通Stripe設定
// 関連: app/api/stripe/checkout/route.ts, app/api/stripe/webhook/route.ts

import Stripe from 'stripe';

export function getStripe(secretKey?: string): Stripe {
  // Cloudflare Workers環境ではランタイムで渡される
  const key = secretKey || process.env.STRIPE_SECRET_KEY;

  if (!key) {
    throw new Error('STRIPE_SECRET_KEY is not set');
  }

  return new Stripe(key, {
    apiVersion: '2025-09-30.clover',
    typescript: true,
    // Cloudflare Workers環境ではfetchベースのHTTPクライアントを使用
    httpClient: Stripe.createFetchHttpClient(),
  });
}
