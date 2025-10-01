// 位置: types/index.ts
// 機能: 全プロジェクトで使用する型定義
// 理由: 型安全性の確保とコード全体での一貫性維持
// 関連: lib/sessionStorage.ts, lib/diagnose.ts, lib/advice.ts

/**
 * ユーザー入力データの型定義
 */
export interface MoneyCheckData {
  laborIncome: number;      // 労働収入
  passiveIncome: number;    // 受動収入
  fixedCost: number;        // 固定費
  waste: number;            // 無駄遣い
  selfInvestment: number;   // 自己投資
  asset: number;            // 資産
  debt: number;             // 負債
}

/**
 * ランク型定義
 */
export type Rank = 'S+' | 'S' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F';

/**
 * 診断結果の型定義
 */
export interface DiagnoseResult {
  score: number;            // 総合スコア（100点満点）
  rank: Rank;               // ランク
  breakdown: {              // 項目別スコア
    cashFlow: number;       // 収支バランス（30点満点）
    fixedCost: number;      // 固定費比率（25点満点）
    assetDebt: number;      // 資産負債（18点満点）
    passiveIncome: number;  // 受動収入（12点満点）
    selfInvestment: number; // 自己投資（10点満点）
    waste: number;          // 無駄遣い（5点満点）
  };
  ratios: {                 // 各種比率
    savingsRate: number;        // 貯蓄率
    fixedCostRate: number;      // 固定費比率
    wasteRate: number;          // 無駄遣い比率
    selfInvestmentRate: number; // 自己投資比率
    passiveIncomeRate: number;  // 受動収入比率
  };
}

/**
 * アドバイスの難易度
 */
export type Difficulty = 1 | 2 | 3;

/**
 * アドバイスの型定義
 */
export interface Advice {
  difficulty: Difficulty;   // 難易度（1: ★☆☆, 2: ★★☆, 3: ★★★）
  category: string;         // カテゴリ（固定費、自己投資など）
  action: string;           // 具体的なアクション
  impact: string;           // 期待される効果
}
