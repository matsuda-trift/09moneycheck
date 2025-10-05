// 位置: components/PremiumCards.tsx
// 機能: プレミアム診断結果ページ用のカードコンポーネント
// 理由: app/result/premium/page.tsxの300行制限対応のため分離
// 関連: app/result/premium/page.tsx, types/index.ts

import { Advice } from '@/types';

export function RatioCard({
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

export function AdviceCard({ advice }: { advice: Advice }) {
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
