// 位置: lib/stripe.ts
// 機能: Stripe初期化設定
// 理由: 決済機能のための共通Stripe設定
// 関連: app/api/stripe/checkout/route.ts, app/api/stripe/webhook/route.ts

import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-09-30.clover',
  typescript: true,
});
