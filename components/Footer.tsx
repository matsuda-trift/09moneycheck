// 位置: components/Footer.tsx
// 機能: 全ページ共通のフッター（免責事項表示）
// 理由: 投資助言規制への対応、法令遵守
// 関連: app/layout.tsx

export default function Footer() {
  return (
    <footer className="mt-auto py-8 px-4 bg-gray-900 text-gray-300 text-sm">
      <div className="max-w-4xl mx-auto">
        <div className="border-t border-gray-700 pt-6">
          <h3 className="font-bold text-white mb-2">【免責事項】</h3>
          <p className="leading-relaxed">
            本サービスはキャッシュフロー診断ツールであり、
            金融商品の販売・勧誘、投資助言を行うものではありません。
            診断結果は参考情報としてご利用ください。
          </p>
        </div>
        <div className="mt-4 text-center text-gray-500 text-xs">
          © 2024 MoneyCheck. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
