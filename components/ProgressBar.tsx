// 位置: components/ProgressBar.tsx
// 機能: 7ステップ入力フォームの進捗表示
// 理由: ユーザーに現在位置と残りステップを視覚的に提示
// 関連: app/input/**/page.tsx

interface ProgressBarProps {
  currentStep: number;  // 現在のステップ（1-7）
  totalSteps?: number;  // 総ステップ数（デフォルト7）
}

export default function ProgressBar({ currentStep, totalSteps = 7 }: ProgressBarProps) {
  const percentage = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-600">
          ステップ {currentStep} / {totalSteps}
        </span>
        <span className="text-sm font-semibold text-blue-900">
          {Math.round(percentage)}%
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          className="bg-blue-900 h-full transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
