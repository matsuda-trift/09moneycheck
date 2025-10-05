// 位置: app/result/free/page.tsx
// 機能: 無料診断結果ページ
// 理由: 基本的なスコア・ランク・項目別点数を表示しプレミアム版に誘導
// 関連: app/input/debt/page.tsx, app/result/preview/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getData } from '@/lib/sessionStorage';
import { diagnose, calculateTimeToFreedom } from '@/lib/diagnose';
import { DiagnoseResult, TimeToFreedom } from '@/types';

export default function FreeResultPage() {
  const router = useRouter();
  const [result, setResult] = useState<DiagnoseResult | null>(null);
  const [timeToFreedom, setTimeToFreedom] = useState<TimeToFreedom | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const inputData = getData();
    const diagnoseResult = diagnose(inputData);
    const freedomData = calculateTimeToFreedom(inputData);
    setResult(diagnoseResult);
    setTimeToFreedom(freedomData);
    setIsLoaded(true);
  }, []);

  if (!isLoaded || !result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">診断中...</div>
      </div>
    );
  }

  const getRankColor = (rank: string) => {
    if (rank === 'S+' || rank === 'S') return 'text-yellow-600';
    if (rank === 'A' || rank === 'B') return 'text-green-600';
    if (rank === 'C' || rank === 'D') return 'text-blue-600';
    return 'text-gray-600';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* 総合結果 */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">診断結果</h1>
          <div className="mb-6">
            <div className="text-6xl font-bold mb-2">
              {result.score}
              <span className="text-2xl text-gray-500">/100</span>
            </div>
            <div className={`text-4xl font-bold ${getRankColor(result.rank)}`}>
              ランク {result.rank}
            </div>
          </div>
        </div>

        {/* 項目別スコア */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">項目別スコア</h2>
          <div className="space-y-3">
            <ScoreItem
              label="収支バランス"
              score={result.breakdown.cashFlow}
              max={30}
            />
            <ScoreItem
              label="固定費比率"
              score={result.breakdown.fixedCost}
              max={25}
            />
            <ScoreItem
              label="資産と負債"
              score={result.breakdown.assetDebt}
              max={18}
            />
            <ScoreItem
              label="受動収入"
              score={result.breakdown.passiveIncome}
              max={12}
            />
            <ScoreItem
              label="自己投資"
              score={result.breakdown.selfInvestment}
              max={10}
            />
            <ScoreItem
              label="無駄遣い"
              score={result.breakdown.waste}
              max={5}
            />
          </div>
        </div>

        {/* 経済的自由への道 */}
        {timeToFreedom && (
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              💰 経済的自由への道
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* 道1: 受動収入ルート */}
              <div className="bg-white rounded-lg p-6 border-2 border-blue-300">
                <h3 className="text-lg font-bold text-blue-900 mb-3">
                  道1: 受動収入を増やす
                </h3>
                <div className="space-y-2 text-sm text-gray-700">
                  <p>現在の受動収入: <span className="font-semibold">{timeToFreedom.route1.currentPassiveIncome.toLocaleString()}円/月</span></p>
                  <p>必要な受動収入: <span className="font-semibold">{timeToFreedom.route1.requiredPassiveIncome.toLocaleString()}円/月</span></p>
                  <p className="text-lg font-bold text-blue-900 mt-3">
                    {timeToFreedom.route1.message}
                  </p>
                </div>
              </div>

              {/* 道2: 資産運用ルート */}
              <div className="bg-white rounded-lg p-6 border-2 border-purple-300">
                <h3 className="text-lg font-bold text-purple-900 mb-3">
                  道2: 資産を貯める（年利5%想定）
                </h3>
                <div className="space-y-2 text-sm text-gray-700">
                  <p>現在の資産: <span className="font-semibold">{timeToFreedom.route2.currentAsset.toLocaleString()}円</span></p>
                  <p>必要な資産: <span className="font-semibold">{timeToFreedom.route2.requiredAsset.toLocaleString()}円</span></p>
                  <p className="text-lg font-bold text-purple-900 mt-3">
                    {timeToFreedom.route2.message}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 border border-gray-300">
              <p className="text-xs text-gray-600 leading-relaxed">
                ※ これは一般的な試算例です。特定の投資方法を推奨するものではありません。
                実際の達成期間は個人の状況により異なります。
              </p>
            </div>
          </div>
        )}

        {/* プレミアム版案内 */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-blue-900 mb-3">
            💎 プレミアム診断（500円）
          </h2>
          <ul className="space-y-2 text-sm text-gray-700 mb-4">
            <li>✓ 各項目の詳細な比率分析</li>
            <li>✓ あなた専用のカスタマイズアドバイス</li>
            <li>✓ 難易度別（★☆☆〜★★★）の具体的改善案</li>
            <li>✓ 収入アップを重視した提案</li>
          </ul>
          <button
            onClick={() => router.push('/result/preview')}
            className="w-full bg-blue-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
          >
            プレミアム診断を見る（500円）
          </button>
        </div>

        {/* 戻るボタン */}
        <div className="text-center">
          <button
            onClick={() => router.push('/input/labor-income')}
            className="text-gray-600 hover:text-gray-800 underline"
          >
            ← 入力内容を修正する
          </button>
        </div>
      </div>
    </div>
  );
}

function ScoreItem({
  label,
  score,
  max,
}: {
  label: string;
  score: number;
  max: number;
}) {
  const percentage = (score / max) * 100;

  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm font-semibold text-gray-900">
          {score}/{max}点
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-900 h-2 rounded-full transition-all"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
