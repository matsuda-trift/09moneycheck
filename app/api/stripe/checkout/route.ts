// 位置: app/api/stripe/checkout/route.ts
// 機能: Stripe Checkout Session作成API
// 理由: プレミアム診断500円の決済開始
// 関連: app/result/preview/page.tsx, lib/stripe.ts

import { NextResponse } from 'next/server';
import { getCloudflareContext } from '@opennextjs/cloudflare';
import { getStripe } from '@/lib/stripe';

export async function POST() {
  try {
    let secretKey: string | undefined;
    let baseUrl: string;

    // Cloudflare Workers環境かローカル環境かを判定
    // ローカル環境では getCloudflareContext() は空のenvを返す
    const isCloudflare = process.env.NODE_ENV === 'production';

    if (isCloudflare) {
      // Cloudflare Workers環境
      const { env } = getCloudflareContext();
      const envVars = env as unknown as Record<string, unknown>;
      secretKey = envVars.STRIPE_SECRET_KEY as string | undefined;
      baseUrl = (envVars.NEXT_PUBLIC_URL as string) || 'https://09moneycheck.trift.workers.dev';
    } else {
      // ローカル開発環境
      secretKey = process.env.STRIPE_SECRET_KEY;
      baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';
    }

    if (!secretKey) {
      throw new Error('STRIPE_SECRET_KEY is not configured');
    }

    const stripe = getStripe(secretKey);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: 'price_1SF7IMCg82m9U8Scqk5hKuIr',
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${baseUrl}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/result/preview`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Checkout error:', error);

    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
