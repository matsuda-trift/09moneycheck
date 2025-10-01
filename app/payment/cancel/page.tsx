// 位置: app/payment/cancel/page.tsx
// 機能: 決済キャンセルページ
// 理由: Stripe決済キャンセル時の案内
// 関連: app/api/stripe/checkout/route.ts, app/result/preview/page.tsx

'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function PaymentCancelPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8 text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            お支払いがキャンセルされました
          </h1>
          <p className="text-gray-600">
            決済がキャンセルされました。
            <br />
            いつでも再度お試しいただけます。
          </p>
        </div>

        <Link
          href="/result/preview"
          className="block w-full bg-blue-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors mb-3"
        >
          プレビューに戻る
        </Link>

        <Link
          href="/result/free"
          className="block w-full bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors mb-3"
        >
          無料診断に戻る
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
