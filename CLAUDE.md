# CLAUDE.md - マネーチェック開発ガイド

## 1. コア原則

- **シンプル最優先**: 複雑 = 悪、過不足なく実装
- **データベース不使用**: sessionStorageで完結
- **投資助言禁止**: 法律遵守、金融商品推奨NG
- **自己投資推奨**: 貯蓄より稼ぐ力、無駄遣いは適度にOK

---

## 2. 技術スタック

```
Frontend: Next.js 15 App Router, TypeScript, Tailwind CSS
State: sessionStorage (履歴保存なし)
Payment: Stripe (買い切り500円)
Deploy: Cloudflare Pages
Tools: Cursor (閲覧), Claude Code (開発)
Dev Server: localhost:3000 (ポート3000固定、他ポート禁止)
          ※別ターミナルで常時起動、Claude Codeは起動禁止
          ※緊急時は日本語で確認後、許可があれば別ターミナル起動可
```

---

## 3. 必須規約

### ファイルヘッダー
```typescript
// 位置: app/input/labor-income/page.tsx
// 機能: 労働収入入力ページ
// 理由: 7項目入力フローの1/7
// 関連: app/input/passive-income/page.tsx, lib/sessionStorage.ts
```

### 品質基準
- **300行制限**: 全ファイル
- **型安全**: `any`禁止、TypeScript厳格
- **App Routerのみ**: Pages Router禁止
- **変更前確認**: ファイル全体を読む

### UI/UX
- **色**: 黒・白・深い青のみ
- **レスポンシブ**: Tailwind活用
- **トーン**: カジュアル、説教NG

---

## 4. プロジェクト構造

```
app/
├── page.tsx                        # トップ
├── layout.tsx                      # 共通レイアウト + フッター
├── input/
│   ├── labor-income/page.tsx       # 1. 労働収入
│   ├── passive-income/page.tsx     # 2. 受動収入
│   ├── fixed-cost/page.tsx         # 3. 固定費
│   ├── waste/page.tsx              # 4. 無駄遣い
│   ├── self-investment/page.tsx    # 5. 自己投資
│   ├── asset/page.tsx              # 6. 資産
│   └── debt/page.tsx               # 7. 負債
├── result/
│   ├── free/page.tsx               # 無料診断
│   ├── preview/page.tsx            # プレミアムプレビュー
│   └── premium/page.tsx            # プレミアム診断
├── payment/
│   ├── success/page.tsx            # 決済完了
│   └── cancel/page.tsx             # キャンセル
└── api/stripe/
    ├── checkout/route.ts           # 決済開始
    └── webhook/route.ts            # Webhook

components/
├── ProgressBar.tsx                 # プログレスバー
├── InputForm.tsx                   # 入力フォーム共通
└── Footer.tsx                      # フッター(免責事項)

lib/
├── diagnose.ts                     # 診断ロジック
├── sessionStorage.ts               # データ管理
└── stripe.ts                       # Stripe設定

types/index.ts                      # 型定義
```

---

## 5. データ管理 (sessionStorage)

```typescript
// lib/sessionStorage.ts
export interface MoneyCheckData {
  laborIncome: number;
  passiveIncome: number;
  fixedCost: number;
  waste: number;
  selfInvestment: number;
  asset: number;
  debt: number;
}

export const saveData = (key: keyof MoneyCheckData, value: number) => {
  const data = getData();
  data[key] = value;
  sessionStorage.setItem('moneyCheckData', JSON.stringify(data));
};

export const getData = (): MoneyCheckData => {
  const data = sessionStorage.getItem('moneyCheckData');
  return data ? JSON.parse(data) : {
    laborIncome: 0, passiveIncome: 0, fixedCost: 0,
    waste: 0, selfInvestment: 0, asset: 0, debt: 0,
  };
};
```

**注意**: Client Componentでのみ使用

---

## 6. 診断ロジック

### 計算式
```typescript
const 総収入 = 労働収入 + 受動収入;
const 総支出 = 自己投資 + 無駄遣い + 固定費;
const 貯蓄率 = (総収入 - 総支出) / 総収入;
const 固定費比率 = 固定費 / 総収入;
```

### 点数配分 (100点満点)
| 項目 | 配点 | 評価基準 |
|------|------|----------|
| 収支バランス | 30点 | 貯蓄率: 30%以上=30点, 20%=26点, 10%=18点 |
| 固定費比率 | 25点 | 比率: 25%以下=25点, 30%=20点, 35%=15点 |
| 資産負債 | 18点 | 資産≧負債×5=18点, ×3=15点, ×2=12点 |
| 受動収入 | 12点 | 比率: 30%以上=12点, 20%=10点, 10%=7点 |
| 自己投資 | 10点 | 比率: 15%以上=10点, 10%=8点, 7%=6点 |
| 無駄遣い | 5点 | 比率: 10%以下=5点, 15%=4点, 20%=3点 |

### ランク
```
95-100: S+  85-94: S  75-84: A  65-74: B
55-64: C  45-54: D  35-44: E  0-34: F
```

---

## 7. Stripe統合

### API実装
```typescript
// app/api/stripe/checkout/route.ts
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST() {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: 'jpy',
        product_data: { name: 'マネーチェック プレミアム診断' },
        unit_amount: 500,
      },
      quantity: 1,
    }],
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_URL}/payment/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/result/preview`,
  });
  return Response.json({ url: session.url });
}
```

### フロー
```
無料診断 → プレビュー(+注意※1) → Stripe決済 → 完了 → プレミアム診断(+注意※2)
```

**※1 プレビュー画面の注意**: 診断結果はブラウザを閉じると見られなくなります。結果が表示されたら、必ずスクリーンショットで保存してください。

**※2 プレミアム画面上部**: ⚠️ この画面はブラウザを閉じると見られなくなります。スクリーンショットで保存してください。

---

## 8. Cloudflare Pages デプロイ

### ビルド設定
```
Framework: Next.js
Build command: npm run build
Output: .next
Node: 18
```

### 環境変数
```
NEXT_PUBLIC_URL
STRIPE_SECRET_KEY
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
STRIPE_WEBHOOK_SECRET
```

---

## 9. バリデーション

- **必須入力**: 全項目
- **0円OK**: 全項目
- **空欄/非数値**: エラー表示

```
空欄: 「金額を入力してください」
非数値: 「数値を入力してください」
負数: 「0以上の数値を入力してください」
```

---

## 10. プレミアム版アドバイス

### 固定費が高い
```
【今すぐ(★☆☆)】
・使わないサブスク1つ解約(月1,000円節約)
・スマホプラン見直し(月3,000円節約可能性)

【少し頑張れば(★★☆)】
・家賃5,000円安い物件検討
・保険見直し相談(無料)予約
```

### 自己投資ゼロ
```
【今すぐ(★☆☆)】
・月1冊本を買う(1,500円)
・無料オンライン学習開始

【少し頑張れば(★★☆)】
・オンライン講座受講(3,000-5,000円)
・仕事に役立つ資格勉強開始
```

### 方向性
- 貯蓄より自己投資推奨
- 「稼ぐ力を上げる」重視
- 無駄遣いは「心の健康のため程よくOK」

---

## 11. 免責事項 (フッター全ページ)

```
【免責事項】
本サービスはキャッシュフロー診断ツールであり、
金融商品の販売・勧誘、投資助言を行うものではありません。
診断結果は参考情報としてご利用ください。
```

---

## 12. 禁止事項

### 投資助言
❌ 「○○株を買いましょう」「NISAで運用すべき」
✅ 「固定費削減」「自己投資(スキルアップ)推奨」

### 技術
❌ localStorage、Pages Router、DB使用
✅ sessionStorage、App Router、カスタム実装

### 運用
❌ 自動Git push、自動build、DB変更、開発サーバー起動
✅ 明示的指示時のみ実行

---

## 13. よくある失敗

| 失敗 | 対策 |
|------|------|
| localStorageを使用 | sessionStorageのみ |
| Server Componentでwindow使用 | Client Component("use client")で |
| Stripe環境変数未設定 | .env.local + Cloudflare両方設定 |
| 300行超過 | ファイル分割 |
| `any`使用 | 明確な型定義 |

---

## 14. 型定義

```typescript
// types/index.ts
export interface MoneyCheckData {
  laborIncome: number;
  passiveIncome: number;
  fixedCost: number;
  waste: number;
  selfInvestment: number;
  asset: number;
  debt: number;
}

export interface DiagnoseResult {
  score: number;
  rank: 'S+' | 'S' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F';
  breakdown: {
    cashFlow: number;
    fixedCost: number;
    assetDebt: number;
    passiveIncome: number;
    selfInvestment: number;
    waste: number;
  };
  ratios: {
    savingsRate: number;
    fixedCostRate: number;
    wasteRate: number;
    selfInvestmentRate: number;
    passiveIncomeRate: number;
  };
}

export interface Advice {
  difficulty: 1 | 2 | 3;
  category: string;
  action: string;
  impact: string;
}
```

---

## 15. チェックリスト

### 実装前
- [ ] CLAUDE.md読了
- [ ] ファイル構成理解
- [ ] 関連ファイル把握

### 実装中
- [ ] ファイルヘッダー記載
- [ ] 300行以内
- [ ] TypeScript型定義
- [ ] `any`不使用
- [ ] Client/Server適切選択

### 実装後
- [ ] 投資助言なし
- [ ] 免責事項表示
- [ ] sessionStorage正常動作
- [ ] エラーハンドリング
- [ ] レスポンシブ対応

---

## 16. 運用

### 自己改善プロンプト
```
CLAUDE.mdを読んで原理原則を理解し、今日の会話を振り返って
何を追加すれば繰り返し失敗が減るか考えて。
繰り返し指示された内容も自発的に実行できるようにして。
```

### 文書最適化プロンプト
```
CLAUDE.mdの冗長箇所を検討し、項目順序や構成を変更してでも
簡潔で密度の濃い文書にして。
```

---

**このドキュメントは生きています。開発中に学んだことを追記し、常に最新化してください。**