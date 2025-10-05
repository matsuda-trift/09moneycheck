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
          <p className="leading-relaxed mt-2">
            「年利5%で運用」は一般的な試算例であり、
            特定の投資方法を推奨するものではありません。
          </p>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-800">
          <div className="text-center mb-3">
            <p className="text-gray-400 mb-2">運営: Trift</p>
            <div className="flex flex-wrap justify-center gap-3 text-xs">
              <a
                href="https://www.trift3.com/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 underline focus:outline-none focus:ring-2 focus:ring-blue-400"
                aria-label="利用規約（新しいタブで開きます）"
              >
                利用規約
              </a>
              <span className="text-gray-600">|</span>
              <a
                href="https://www.trift3.com/legal"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 underline focus:outline-none focus:ring-2 focus:ring-blue-400"
                aria-label="特定商取引法表記（新しいタブで開きます）"
              >
                特定商取引法表記
              </a>
              <span className="text-gray-600">|</span>
              <a
                href="https://www.trift3.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 underline focus:outline-none focus:ring-2 focus:ring-blue-400"
                aria-label="プライバシーポリシー（新しいタブで開きます）"
              >
                プライバシーポリシー
              </a>
              <span className="text-gray-600">|</span>
              <a
                href="https://www.trift3.com/contact"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 underline focus:outline-none focus:ring-2 focus:ring-blue-400"
                aria-label="お問い合わせ（新しいタブで開きます）"
              >
                お問い合わせ
              </a>
            </div>
          </div>
        </div>

        <div className="mt-4 text-center text-gray-500 text-xs">
          © 2024 MoneyCheck. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
