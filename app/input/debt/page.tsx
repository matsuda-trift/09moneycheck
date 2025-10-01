// 位置: app/input/debt/page.tsx
// 機能: 負債入力ページ（ステップ7/7）
// 理由: ローンや借金など返済義務のある負債総額を入力し診断開始
// 関連: app/input/asset/page.tsx, app/result/free/page.tsx

'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ProgressBar from '@/components/ProgressBar';
import InputForm from '@/components/InputForm';
import { saveData, getData } from '@/lib/sessionStorage';

export default function DebtPage() {
  const router = useRouter();
  const [initialValue, setInitialValue] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const data = getData();
    setInitialValue(data.debt);
    setIsLoaded(true);
  }, []);

  const handleNext = (value: number) => {
    saveData('debt', value);
    // 全7項目入力完了 → 無料診断へ遷移
    router.push('/result/free');
  };

  const handleBack = () => {
    router.push('/input/asset');
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">読み込み中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <ProgressBar currentStep={7} />

        <InputForm
          title="負債"
          description="住宅ローン、自動車ローン、奨学金、クレジットカードの残債など、返済が必要な借金の総額を入力してください。"
          placeholder="例: 500000"
          initialValue={initialValue}
          onNext={handleNext}
          onBack={handleBack}
          showBackButton={true}
          nextButtonText="診断開始"
        />

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>※ 住宅ローンや奨学金など、計画的な借入も含めてください</p>
        </div>
      </div>
    </div>
  );
}
