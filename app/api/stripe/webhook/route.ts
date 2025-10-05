// 位置: app/api/stripe/webhook/route.ts
// 機能: Stripe Webhook受信API
// 理由: 決済完了イベントを受け取り処理
// 関連: lib/stripe.ts

import { NextRequest, NextResponse } from 'next/server';
import { getCloudflareContext } from '@opennextjs/cloudflare';
import { getStripe } from '@/lib/stripe';
import Stripe from 'stripe';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'No signature provided' },
      { status: 400 }
    );
  }

  // 環境変数の取得（Cloudflare/ローカル対応）
  let webhookSecret: string | undefined;
  let secretKey: string | undefined;

  const isCloudflare = process.env.NODE_ENV === 'production';

  if (isCloudflare) {
    const { env } = getCloudflareContext();
    const envVars = env as unknown as Record<string, unknown>;
    webhookSecret = envVars.STRIPE_WEBHOOK_SECRET as string;
    secretKey = envVars.STRIPE_SECRET_KEY as string;
  } else {
    webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    secretKey = process.env.STRIPE_SECRET_KEY;
  }

  if (!webhookSecret) {
    console.error('STRIPE_WEBHOOK_SECRET is not set');
    return NextResponse.json(
      { error: 'Webhook secret not configured' },
      { status: 500 }
    );
  }

  if (!secretKey) {
    console.error('STRIPE_SECRET_KEY is not set');
    return NextResponse.json(
      { error: 'Stripe secret key not configured' },
      { status: 500 }
    );
  }

  let event: Stripe.Event;

  try {
    const stripe = getStripe(secretKey);
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    );
  }

  // イベント処理
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as Stripe.Checkout.Session;
      console.log('Payment successful:', session.id);
      // sessionStorageベースのため、ここでのDB保存は不要
      // 必要に応じてログ記録などを追加
      break;

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
