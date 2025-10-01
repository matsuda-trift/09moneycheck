// 位置: app/payment/success/page.tsx
// 機能: 決済完了ページ
// 理由: Stripe決済成功後にプレミアム診断へ誘導
// 関連: app/api/stripe/checkout/route.ts, app/result/premium/page.tsx

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function PaymentSuccessPage() {
  const router = useRouter();

  useEffect(() => {
    // sessionStorageにプレミアムアクセス権を保存
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('premiumAccess', 'true');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8 text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            お支払い完了
          </h1>
          <p className="text-gray-600">
            ご購入ありがとうございます！
            <br />
            プレミアム診断をご覧いただけます。
          </p>
        </div>

        <div className="bg-yellow-50 border border-yellow-400 rounded-lg p-4 mb-6">
          <p className="text-sm text-yellow-900 font-medium">
            ⚠️
            診断結果はブラウザを閉じると見られなくなります。必ずスクリーンショットで保存してください。
          </p>
        </div>

        <Link
          href="/result/premium"
          className="block w-full bg-blue-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors mb-3"
        >
          プレミアム診断を見る
        </Link>

        <button
          onClick={() => router.push('/')}
          className="text-gray-600 hover:text-gray-800 text-sm underline"
        >
          トップに戻る
        </button>
      </div>
    </div>
  );
}
