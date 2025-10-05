// 位置: app/page.tsx
// 機能: トップページ（ランディングページ）
// 理由: ユーザーを診断フローに誘導
// 関連: app/input/labor-income/page.tsx

import Link from "next/link";

export default function Home() {
  return (
    <main className="flex-1 flex items-center justify-center px-4 py-12">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
          MoneyCheck
        </h1>
        <p className="text-xl text-gray-600 mb-4">
          あなたのキャッシュフローを診断します
        </p>
        <p className="text-gray-500 mb-8 max-w-2xl mx-auto">
          7つの質問に答えるだけで、お金の流れを可視化。
          <br />
          貯蓄より「稼ぐ力」を重視した、新しい診断ツールです。
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8 text-left">
          <h2 className="font-bold text-blue-900 mb-3">診断内容</h2>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>✓ 収支バランスの評価</li>
            <li>✓ 固定費の適切性チェック</li>
            <li>✓ 自己投資の重要性分析</li>
            <li>✓ 資産と負債のバランス診断</li>
            <li>✓ あなたに合った改善アドバイス</li>
          </ul>
        </div>

        <Link
          href="/input/labor-income"
          className="inline-block bg-blue-900 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-800 transition-colors shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          診断を始める
        </Link>

        <p className="text-xs text-gray-400 mt-8">
          所要時間: 約3分 / データはブラウザを閉じると消えます
        </p>
      </div>
    </main>
  );
}
