// 位置: components/InputForm.tsx
// 機能: 金額入力フォームの共通コンポーネント
// 理由: 7ページの入力フォームで再利用、バリデーション統一
// 関連: app/input/**/page.tsx, lib/sessionStorage.ts

'use client';

import { useState, FormEvent } from 'react';

interface InputFormProps {
  title: string;              // フォームタイトル
  description: string;        // 説明文
  placeholder?: string;       // プレースホルダー
  initialValue?: number;      // 初期値
  onNext: (value: number) => void;  // 次へボタンのコールバック
  onBack?: () => void;        // 戻るボタンのコールバック(任意)
  showBackButton?: boolean;   // 戻るボタンを表示するか
  nextButtonText?: string;    // 次へボタンのテキスト(デフォルト: "次へ")
}

export default function InputForm({
  title,
  description,
  placeholder = '例: 250000',
  initialValue = 0,
  onNext,
  onBack,
  showBackButton = true,
  nextButtonText = '次へ',
}: InputFormProps) {
  // カンマ区切りフォーマット関数
  const formatNumber = (numStr: string): string => {
    const cleaned = numStr.replace(/,/g, '');
    if (!cleaned) return '';
    return Number(cleaned).toLocaleString('ja-JP');
  };


  // 初期値をカンマフォーマット
  const [value, setValue] = useState<string>(
    initialValue > 0 ? formatNumber(String(initialValue)) : ''
  );
  const [error, setError] = useState<string>('');

  const validateInput = (input: string): { isValid: boolean; value?: number; error?: string } => {
    // カンマを除去した値で検証
    const cleanedInput = input.replace(/,/g, '');

    // 空欄チェック
    if (cleanedInput.trim() === '') {
      return { isValid: false, error: '金額を入力してください' };
    }

    // 数値チェック
    const numValue = Number(cleanedInput);
    if (isNaN(numValue)) {
      return { isValid: false, error: '数値を入力してください' };
    }

    // 負数チェック
    if (numValue < 0) {
      return { isValid: false, error: '0以上の数値を入力してください' };
    }

    // 0円OK
    return { isValid: true, value: numValue };
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const result = validateInput(value);

    if (!result.isValid) {
      setError(result.error || '');
      return;
    }

    setError('');
    onNext(result.value!);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;

    // カンマを除去
    const cleaned = input.replace(/,/g, '');

    // 数値のみ許可(空文字は許可)
    if (cleaned && !/^\d+$/.test(cleaned)) {
      return;
    }

    // カンマフォーマットして表示
    setValue(formatNumber(cleaned));

    if (error) {
      setError(''); // エラー状態をクリア
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">{title}</h2>
      <p className="text-gray-600 mb-6 leading-relaxed">{description}</p>

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
            月額金額(円)
          </label>
          <input
            id="amount"
            type="text"
            inputMode="numeric"
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
              error
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:ring-blue-900 focus:border-blue-900'
            }`}
            aria-invalid={!!error}
            aria-describedby={error ? 'error-message' : undefined}
          />
          {error && (
            <p id="error-message" className="mt-2 text-sm text-red-600" role="alert">
              {error}
            </p>
          )}
        </div>

        <div className="flex gap-4">
          {showBackButton && onBack && (
            <button
              type="button"
              onClick={onBack}
              className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
            >
              戻る
            </button>
          )}
          <button
            type="submit"
            className={`px-6 py-3 bg-blue-900 text-white rounded-lg font-medium hover:bg-blue-800 transition-colors ${
              showBackButton && onBack ? 'flex-1' : 'w-full'
            }`}
          >
            {nextButtonText}
          </button>
        </div>
      </form>
    </div>
  );
}
