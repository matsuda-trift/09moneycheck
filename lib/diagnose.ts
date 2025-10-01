// 位置: lib/diagnose.ts
// 機能: キャッシュフロー診断ロジック
// 理由: 入力データから総合スコアとランクを計算
// 関連: types/index.ts, app/result/free/page.tsx, app/result/premium/page.tsx

import { MoneyCheckData, DiagnoseResult, Rank } from '@/types';

/**
 * 総収入と総支出を計算
 */
function calculateTotals(data: MoneyCheckData) {
  const totalIncome = data.laborIncome + data.passiveIncome;
  const totalExpense = data.fixedCost + data.waste + data.selfInvestment;
  return { totalIncome, totalExpense };
}

/**
 * 各種比率を計算
 */
function calculateRatios(data: MoneyCheckData, totalIncome: number) {
  // 0除算対策: 総収入が0の場合は全て0%
  if (totalIncome === 0) {
    return {
      savingsRate: 0,
      fixedCostRate: 0,
      wasteRate: 0,
      selfInvestmentRate: 0,
      passiveIncomeRate: 0,
    };
  }

  const { totalExpense } = calculateTotals(data);

  return {
    savingsRate: (totalIncome - totalExpense) / totalIncome,
    fixedCostRate: data.fixedCost / totalIncome,
    wasteRate: data.waste / totalIncome,
    selfInvestmentRate: data.selfInvestment / totalIncome,
    passiveIncomeRate: data.passiveIncome / totalIncome,
  };
}

/**
 * 収支バランススコア計算（30点満点）
 */
function calculateCashFlowScore(savingsRate: number): number {
  if (savingsRate >= 0.30) return 30;
  if (savingsRate >= 0.20) return 26;
  if (savingsRate >= 0.10) return 18;
  return 10;
}

/**
 * 固定費比率スコア計算（25点満点）
 */
function calculateFixedCostScore(fixedCostRate: number): number {
  if (fixedCostRate <= 0.25) return 25;
  if (fixedCostRate <= 0.30) return 20;
  if (fixedCostRate <= 0.35) return 15;
  return 10;
}

/**
 * 資産負債スコア計算（18点満点）
 */
function calculateAssetDebtScore(asset: number, debt: number): number {
  // 負債が0の場合は資産状況で判定
  if (debt === 0) {
    return asset > 0 ? 18 : 8;
  }

  if (asset >= debt * 5) return 18;
  if (asset >= debt * 3) return 15;
  if (asset >= debt * 2) return 12;
  return 8;
}

/**
 * 受動収入スコア計算（12点満点）
 */
function calculatePassiveIncomeScore(passiveIncomeRate: number): number {
  if (passiveIncomeRate >= 0.30) return 12;
  if (passiveIncomeRate >= 0.20) return 10;
  if (passiveIncomeRate >= 0.10) return 7;
  return 4;
}

/**
 * 自己投資スコア計算（10点満点）
 */
function calculateSelfInvestmentScore(selfInvestmentRate: number): number {
  if (selfInvestmentRate >= 0.15) return 10;
  if (selfInvestmentRate >= 0.10) return 8;
  if (selfInvestmentRate >= 0.07) return 6;
  return 3;
}

/**
 * 無駄遣いスコア計算（5点満点）
 */
function calculateWasteScore(wasteRate: number): number {
  if (wasteRate <= 0.10) return 5;
  if (wasteRate <= 0.15) return 4;
  if (wasteRate <= 0.20) return 3;
  return 2;
}

/**
 * 項目別スコアを計算
 */
function calculateScores(
  data: MoneyCheckData,
  ratios: ReturnType<typeof calculateRatios>
) {
  return {
    cashFlow: calculateCashFlowScore(ratios.savingsRate),
    fixedCost: calculateFixedCostScore(ratios.fixedCostRate),
    assetDebt: calculateAssetDebtScore(data.asset, data.debt),
    passiveIncome: calculatePassiveIncomeScore(ratios.passiveIncomeRate),
    selfInvestment: calculateSelfInvestmentScore(ratios.selfInvestmentRate),
    waste: calculateWasteScore(ratios.wasteRate),
  };
}

/**
 * 総合スコアからランクを判定
 */
function getRank(score: number): Rank {
  if (score >= 95) return 'S+';
  if (score >= 85) return 'S';
  if (score >= 75) return 'A';
  if (score >= 65) return 'B';
  if (score >= 55) return 'C';
  if (score >= 45) return 'D';
  if (score >= 35) return 'E';
  return 'F';
}

/**
 * メイン診断関数
 * @param data ユーザー入力データ
 * @returns 診断結果
 */
export function diagnose(data: MoneyCheckData): DiagnoseResult {
  const { totalIncome } = calculateTotals(data);
  const ratios = calculateRatios(data, totalIncome);
  const breakdown = calculateScores(data, ratios);

  // 総合スコア計算（100点満点）
  const score =
    breakdown.cashFlow +
    breakdown.fixedCost +
    breakdown.assetDebt +
    breakdown.passiveIncome +
    breakdown.selfInvestment +
    breakdown.waste;

  const rank = getRank(score);

  return {
    score,
    rank,
    breakdown,
    ratios,
  };
}
