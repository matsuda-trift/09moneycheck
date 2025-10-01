// 位置: lib/advice.ts
// 機能: プレミアム診断向けカスタマイズアドバイス生成
// 理由: ユーザーの状況に応じた具体的改善アドバイスを提供
// 関連: app/result/premium/page.tsx, lib/diagnose.ts

import { MoneyCheckData, DiagnoseResult, Advice } from '@/types';

/**
 * 診断結果に基づいてカスタマイズアドバイスを生成
 */
export function generateAdvice(
  data: MoneyCheckData,
  result: DiagnoseResult
): Advice[] {
  const adviceList: Advice[] = [];

  // 固定費が高い場合（固定費比率 > 30%）
  if (result.ratios.fixedCostRate > 0.30) {
    adviceList.push({
      difficulty: 1,
      category: '固定費削減',
      action: '使わないサブスク1つ解約する',
      impact: '月1,000円程度の節約',
    });
    adviceList.push({
      difficulty: 1,
      category: '固定費削減',
      action: 'スマホプランを見直す',
      impact: '月3,000円節約の可能性',
    });
    adviceList.push({
      difficulty: 2,
      category: '固定費削減',
      action: '家賃5,000円安い物件を検討',
      impact: '年間6万円の支出削減',
    });
    adviceList.push({
      difficulty: 2,
      category: '固定費削減',
      action: '保険の無料見直し相談を予約',
      impact: '不要な保障を削減',
    });
  }

  // 自己投資が少ない場合（自己投資比率 < 5% または 0円）
  if (result.ratios.selfInvestmentRate < 0.05) {
    adviceList.push({
      difficulty: 1,
      category: '自己投資',
      action: '月1冊、仕事に役立つ本を買う',
      impact: '月1,500円で知識投資',
    });
    adviceList.push({
      difficulty: 1,
      category: '自己投資',
      action: '無料のオンライン学習を始める',
      impact: 'スキルアップ（コスト0円）',
    });
    adviceList.push({
      difficulty: 2,
      category: '自己投資',
      action: 'オンライン講座を1つ受講',
      impact: '月3,000-5,000円で専門スキル獲得',
    });
    adviceList.push({
      difficulty: 2,
      category: '自己投資',
      action: '仕事に役立つ資格の勉強を開始',
      impact: '将来の収入アップに直結',
    });
  }

  // 受動収入がゼロの場合
  if (data.passiveIncome === 0) {
    adviceList.push({
      difficulty: 2,
      category: '受動収入',
      action: '副業スキルを身につける',
      impact: '労働以外の収入源を作る',
    });
    adviceList.push({
      difficulty: 3,
      category: '受動収入',
      action: '収益化できるスキルを磨く',
      impact: '長期的な収入の柱を増やす',
    });
  }

  // 無駄遣いが多い場合（無駄遣い比率 > 20%）
  if (result.ratios.wasteRate > 0.20) {
    adviceList.push({
      difficulty: 1,
      category: '無駄遣い',
      action: '衝動買いする前に1日待つ',
      impact: '本当に必要なものだけ購入',
    });
    adviceList.push({
      difficulty: 1,
      category: '無駄遣い',
      action: '月の娯楽費予算を決める',
      impact: '楽しみつつ使いすぎ防止',
    });
  }

  // 貯蓄率が低い場合（< 10%）
  if (result.ratios.savingsRate < 0.10) {
    adviceList.push({
      difficulty: 2,
      category: '収入アップ',
      action: '今のスキルで副業できないか検討',
      impact: '月2-3万円の収入増加',
    });
    adviceList.push({
      difficulty: 3,
      category: '収入アップ',
      action: '転職・昇給のためのスキル習得',
      impact: '年収50-100万円アップの可能性',
    });
  }

  return adviceList;
}

/**
 * 難易度別にアドバイスをグループ化
 */
export function groupAdviceByDifficulty(adviceList: Advice[]) {
  return {
    easy: adviceList.filter((a) => a.difficulty === 1),
    medium: adviceList.filter((a) => a.difficulty === 2),
    hard: adviceList.filter((a) => a.difficulty === 3),
  };
}
