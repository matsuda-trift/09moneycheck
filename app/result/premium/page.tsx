// 位置: app/result/premium/page.tsx
// 機能: プレミアム診断結果ページ
// 理由: 詳細な分析とカスタマイズアドバイスを表示
// 関連: app/payment/success/page.tsx, lib/advice.ts

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getData } from '@/lib/sessionStorage';
import { diagnose } from '@/lib/diagnose';
import { generateAdvice, groupAdviceByDifficulty } from '@/lib/advice';
import { DiagnoseResult, MoneyCheckData, Advice } from '@/types';

export default function PremiumPage() {
  const router = useRouter();
  const [data, setData] = useState<MoneyCheckData | null>(null);
  const [result, setResult] = useState<DiagnoseResult | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // プレミアムアクセス権チェック
    const hasPremiumAccess = sessionStorage.getItem('premiumAccess') === 'true';

    if (!hasPremiumAccess) {
      // 未購入の場合はプレビューページへリダイレクト
      router.push('/result/preview');
      return;
    }

    const inputData = getData();
    const diagnoseResult = diagnose(inputData);
    setData(inputData);
    setResult(diagnoseResult);
    setIsLoaded(true);
  }, [router]);

  if (!isLoaded || !result || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">読み込み中...</div>
      </div>
    );
  }

  const advice = generateAdvice(data, result);
  const groupedAdvice = groupAdviceByDifficulty(advice);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* 警告メッセージ */}
        <div className="bg-red-50 border-2 border-red-400 rounded-lg p-4 mb-6">
          <p className="text-sm text-red-900 font-bold">
            ⚠️
            この画面はブラウザを閉じると見られなくなります。スクリーンショットで保存してください。
          </p>
        </div>

        {/* 総合結果 */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            💎 プレミアム診断結果
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

        {/* 詳細分析 */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">📊 詳細分析</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <RatioCard
              label="貯蓄率"
              value={result.ratios.savingsRate}
              good={result.ratios.savingsRate >= 0.2}
            />
            <RatioCard
              label="固定費比率"
              value={result.ratios.fixedCostRate}
              good={result.ratios.fixedCostRate <= 0.3}
            />
            <RatioCard
              label="自己投資比率"
              value={result.ratios.selfInvestmentRate}
              good={result.ratios.selfInvestmentRate >= 0.1}
            />
            <RatioCard
              label="受動収入比率"
              value={result.ratios.passiveIncomeRate}
              good={result.ratios.passiveIncomeRate >= 0.1}
            />
            <RatioCard
              label="無駄遣い比率"
              value={result.ratios.wasteRate}
              good={result.ratios.wasteRate <= 0.15}
            />
          </div>
        </div>

        {/* カスタマイズアドバイス */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            💡 あなた専用アドバイス
          </h2>

          {groupedAdvice.easy.length > 0 && (
            <div className="mb-6">
              <h3 className="font-bold text-green-700 mb-3">
                【今すぐできる (★☆☆)】
              </h3>
              <div className="space-y-3">
                {groupedAdvice.easy.map((adv, idx) => (
                  <AdviceCard key={idx} advice={adv} />
                ))}
              </div>
            </div>
          )}

          {groupedAdvice.medium.length > 0 && (
            <div className="mb-6">
              <h3 className="font-bold text-blue-700 mb-3">
                【少し頑張れば (★★☆)】
              </h3>
              <div className="space-y-3">
                {groupedAdvice.medium.map((adv, idx) => (
                  <AdviceCard key={idx} advice={adv} />
                ))}
              </div>
            </div>
          )}

          {groupedAdvice.hard.length > 0 && (
            <div className="mb-6">
              <h3 className="font-bold text-purple-700 mb-3">
                【本気で変えるなら (★★★)】
              </h3>
              <div className="space-y-3">
                {groupedAdvice.hard.map((adv, idx) => (
                  <AdviceCard key={idx} advice={adv} />
                ))}
              </div>
            </div>
          )}

          {advice.length === 0 && (
            <p className="text-gray-600">
              素晴らしい！現状維持を心がけましょう。
            </p>
          )}
        </div>

        {/* メッセージ */}
        <div className="bg-blue-50 rounded-lg p-6 mb-6">
          <p className="text-sm text-gray-700 leading-relaxed">
            💪
            貯蓄より「稼ぐ力」を高めることが最強の資産です。自己投資を優先し、無駄遣いは心の健康のために程よく楽しみましょう。
          </p>
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

function RatioCard({
  label,
  value,
  good,
}: {
  label: string;
  value: number;
  good: boolean;
}) {
  return (
    <div className="border rounded-lg p-4">
      <div className="text-sm text-gray-600 mb-1">{label}</div>
      <div
        className={`text-2xl font-bold ${good ? 'text-green-600' : 'text-orange-600'}`}
      >
        {(value * 100).toFixed(1)}%
      </div>
      <div className="text-xs text-gray-500 mt-1">
        {good ? '✓ 良好' : '改善の余地あり'}
      </div>
    </div>
  );
}

function AdviceCard({ advice }: { advice: Advice }) {
  return (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 text-2xl">💡</div>
        <div className="flex-1">
          <div className="font-medium text-gray-900 mb-1">{advice.action}</div>
          <div className="text-sm text-gray-600">{advice.impact}</div>
          <div className="text-xs text-gray-500 mt-1">
            カテゴリ: {advice.category}
          </div>
        </div>
      </div>
    </div>
  );
}
