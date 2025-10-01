// 位置: lib/sessionStorage.ts
// 機能: sessionStorageを使用したデータ永続化管理
// 理由: データベース不使用方針、ブラウザセッション内でのみデータ保持
// 関連: types/index.ts, app/input/**/page.tsx, app/result/**/page.tsx

import { MoneyCheckData } from '@/types';

const STORAGE_KEY = 'moneyCheckData';
const PREMIUM_ACCESS_KEY = 'premiumAccess';

/**
 * sessionStorageにデータを保存
 * @param key 保存するデータのキー
 * @param value 保存する値
 */
export const saveData = (key: keyof MoneyCheckData, value: number): void => {
  if (typeof window === 'undefined') return;

  const data = getData();
  data[key] = value;
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

/**
 * sessionStorageからデータを取得
 * @returns MoneyCheckData 保存されたデータ（なければ初期値）
 */
export const getData = (): MoneyCheckData => {
  if (typeof window === 'undefined') {
    return getInitialData();
  }

  const data = sessionStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : getInitialData();
};

/**
 * sessionStorageのデータをクリア
 */
export const clearData = (): void => {
  if (typeof window === 'undefined') return;

  sessionStorage.removeItem(STORAGE_KEY);
};

/**
 * 初期データを取得
 * @returns MoneyCheckData 全項目0の初期データ
 */
const getInitialData = (): MoneyCheckData => ({
  laborIncome: 0,
  passiveIncome: 0,
  fixedCost: 0,
  waste: 0,
  selfInvestment: 0,
  asset: 0,
  debt: 0,
});

/**
 * プレミアムアクセス権を保存
 */
export const savePremiumAccess = (): void => {
  if (typeof window === 'undefined') return;

  sessionStorage.setItem(PREMIUM_ACCESS_KEY, 'true');
};

/**
 * プレミアムアクセス権を確認
 * @returns boolean プレミアムアクセス権があるか
 */
export const hasPremiumAccess = (): boolean => {
  if (typeof window === 'undefined') return false;

  return sessionStorage.getItem(PREMIUM_ACCESS_KEY) === 'true';
};

/**
 * プレミアムアクセス権をクリア
 */
export const clearPremiumAccess = (): void => {
  if (typeof window === 'undefined') return;

  sessionStorage.removeItem(PREMIUM_ACCESS_KEY);
};
