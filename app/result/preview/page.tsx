// 位置: app/result/preview/page.tsx
// 機能: プレミアム診断プレビューページ
// 理由: 決済前にプレミアム版の内容を一部表示し購入を促進
// 関連: app/result/free/page.tsx, app/api/stripe/checkout/route.ts

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getData } from '@/lib/sessionStorage';
import { diagnose } from '@/lib/diagnose';
import { DiagnoseResult } from '@/types';

export default function PreviewPage() {
  const router = useRouter();
  const [result, setResult] = useState<DiagnoseResult | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const data = getData();
    const diagnoseResult = diagnose(data);
    setResult(diagnoseResult);
    setIsLoaded(true);
  }, []);

  const handleCheckout = async () => {
    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
      });
      const data = await response.json() as { url?: string };
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('決済エラー:', error);
      alert('決済処理でエラーが発生しました。もう一度お試しください。');
    }
  };

  if (!isLoaded || !result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">読み込み中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* 注意事項 */}
        <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-4 mb-6">
          <p className="text-sm text-yellow-900 font-medium">
            ⚠️
            診断結果はブラウザを閉じると見られなくなります。結果が表示されたら、必ずスクリーンショットで保存してください。
          </p>
        </div>

        {/* 基本結果 */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            プレミアム診断プレビュー
          </h1>
          <div className="mb-6">
            <div className="text-6xl font-bold mb-2">
              {result.score}
              <span className="text-2xl text-gray-500">/100</span>
            </div>
            <div className="text-4xl font-bold text-blue-900">
              ランク {result.rank}
            </div>
          </div>
        </div>

        {/* プレミアム内容プレビュー（ぼかし） */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-6 relative">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            📊 詳細分析（プレミアム版）
          </h2>
          <div className="blur-sm select-none pointer-events-none">
            <div className="space-y-4 text-gray-700">
              <p>• 貯蓄率: {(result.ratios.savingsRate * 100).toFixed(1)}%</p>
              <p>
                • 固定費比率: {(result.ratios.fixedCostRate * 100).toFixed(1)}%
              </p>
              <p>
                • 自己投資比率:{' '}
                {(result.ratios.selfInvestmentRate * 100).toFixed(1)}%
              </p>
              <p>
                • 受動収入比率:{' '}
                {(result.ratios.passiveIncomeRate * 100).toFixed(1)}%
              </p>
            </div>
            <div className="mt-6">
              <h3 className="font-bold mb-2">💡 あなた専用アドバイス</h3>
              <div className="space-y-2 text-sm">
                <p>【今すぐできる (★☆☆)】</p>
                <p>• 具体的なアドバイス1</p>
                <p>• 具体的なアドバイス2</p>
                <p className="mt-2">【少し頑張れば (★★☆)】</p>
                <p>• 具体的なアドバイス3</p>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white bg-opacity-90 px-8 py-4 rounded-lg shadow-lg">
              <p className="text-xl font-bold text-gray-900">
                詳細を見るには500円
              </p>
            </div>
          </div>
        </div>

        {/* 決済ボタン */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-blue-900 mb-3">
            💎 プレミアム診断を購入（500円）
          </h2>
          <button
            onClick={handleCheckout}
            className="w-full bg-blue-900 text-white px-6 py-4 rounded-lg font-semibold text-lg hover:bg-blue-800 transition-colors mb-3"
          >
            500円で詳細診断を見る
          </button>
          <button
            onClick={() => router.push('/result/free')}
            className="w-full bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
          >
            無料版に戻る
          </button>
        </div>
      </div>
    </div>
  );
}
