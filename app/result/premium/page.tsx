// 位置: app/result/premium/page.tsx
// 機能: プレミアム診断結果ページ
// 理由: 詳細な分析とカスタマイズアドバイスを表示
// 関連: app/payment/success/page.tsx, lib/advice.ts

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getData } from '@/lib/sessionStorage';
import { diagnose, calculateTimeToFreedom } from '@/lib/diagnose';
import { generateAdvice, groupAdviceByDifficulty } from '@/lib/advice';
import { DiagnoseResult, MoneyCheckData, TimeToFreedom } from '@/types';
import { RatioCard, AdviceCard } from '@/components/PremiumCards';

export default function PremiumPage() {
  const router = useRouter();
  const [data, setData] = useState<MoneyCheckData | null>(null);
  const [result, setResult] = useState<DiagnoseResult | null>(null);
  const [timeToFreedom, setTimeToFreedom] = useState<TimeToFreedom | null>(null);
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
    const freedomData = calculateTimeToFreedom(inputData);
    setData(inputData);
    setResult(diagnoseResult);
    setTimeToFreedom(freedomData);
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

        {/* 経済的自由への道（プレミアム版） */}
        {timeToFreedom && (
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              💰 経済的自由への具体的ロードマップ
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* 道1: 受動収入ルート */}
              <div className="bg-white rounded-lg p-6 border-2 border-blue-300">
                <h3 className="text-lg font-bold text-blue-900 mb-4">
                  道1: 受動収入を増やす
                </h3>
                <div className="space-y-3 text-sm text-gray-700 mb-4">
                  <p>現在の受動収入: <span className="font-semibold">{timeToFreedom.route1.currentPassiveIncome.toLocaleString()}円/月</span></p>
                  <p>必要な受動収入: <span className="font-semibold">{timeToFreedom.route1.requiredPassiveIncome.toLocaleString()}円/月</span></p>
                  <p className="text-lg font-bold text-blue-900">
                    {timeToFreedom.route1.message}
                  </p>
                </div>
                {timeToFreedom.route1.achievable && timeToFreedom.route1.currentPassiveIncome < timeToFreedom.route1.requiredPassiveIncome && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-bold text-blue-900 mb-2">【今すぐできること】</h4>
                    <ul className="space-y-1 text-xs text-gray-700">
                      <li>• スキルを活かした副業開始（ライティング、デザイン等）</li>
                      <li>• 不用品販売で小さく始める</li>
                      <li>• 本業のスキルアップで昇給を目指す</li>
                    </ul>
                  </div>
                )}
              </div>

              {/* 道2: 資産運用ルート */}
              <div className="bg-white rounded-lg p-6 border-2 border-purple-300">
                <h3 className="text-lg font-bold text-purple-900 mb-4">
                  道2: 資産を貯める（年利5%想定）
                </h3>
                <div className="space-y-3 text-sm text-gray-700 mb-4">
                  <p>現在の資産: <span className="font-semibold">{timeToFreedom.route2.currentAsset.toLocaleString()}円</span></p>
                  <p>必要な資産: <span className="font-semibold">{timeToFreedom.route2.requiredAsset.toLocaleString()}円</span></p>
                  <p className="text-lg font-bold text-purple-900">
                    {timeToFreedom.route2.message}
                  </p>
                </div>
                {timeToFreedom.route2.achievable && (timeToFreedom.route2.years > 0 || timeToFreedom.route2.months > 0) && (
                  <div className="mt-4 p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-bold text-purple-900 mb-2">【達成のために】</h4>
                    <ul className="space-y-1 text-xs text-gray-700">
                      <li>• 固定費削減で貯蓄額を増やす</li>
                      <li>• 収入アップに集中投資する</li>
                      <li>• 先取り貯蓄の仕組み化</li>
                    </ul>
                  </div>
                )}
                {!timeToFreedom.route2.achievable && (
                  <div className="mt-4 p-4 bg-red-50 rounded-lg">
                    <h4 className="font-bold text-red-900 mb-2">【まず収支改善を】</h4>
                    <ul className="space-y-1 text-xs text-gray-700">
                      <li>• 固定費を見直して支出削減</li>
                      <li>• 収入を増やす行動を開始</li>
                      <li>• 無駄遣いの優先順位を見直す</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {timeToFreedom.fasterRoute && (
              <div className="bg-white rounded-lg p-4 border-2 border-green-300 mb-4">
                <p className="text-sm font-bold text-green-900">
                  🎯 おすすめルート: 道{timeToFreedom.fasterRoute}
                  {timeToFreedom.fasterRoute === 1 ? '（受動収入）' : '（資産運用）'}
                </p>
              </div>
            )}

            <div className="bg-white rounded-lg p-4 border border-gray-300">
              <p className="text-xs text-gray-600 leading-relaxed">
                ※ 「年利5%で運用」は一般的な試算例であり、特定の投資方法を推奨するものではありません。
                実際の達成期間は個人の状況により異なります。
              </p>
            </div>
          </div>
        )}

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

