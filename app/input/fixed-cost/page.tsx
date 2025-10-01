// 位置: app/input/fixed-cost/page.tsx
// 機能: 固定費入力ページ（ステップ3/7）
// 理由: 家賃・保険・通信費など毎月必ず発生する支出を入力
// 関連: app/input/passive-income/page.tsx, app/input/waste/page.tsx

'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ProgressBar from '@/components/ProgressBar';
import InputForm from '@/components/InputForm';
import { saveData, getData } from '@/lib/sessionStorage';

export default function FixedCostPage() {
  const router = useRouter();
  const [initialValue, setInitialValue] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Client側でのみ実行
    const data = getData();
    setInitialValue(data.fixedCost);
    setIsLoaded(true);
  }, []);

  const handleNext = (value: number) => {
    saveData('fixedCost', value);
    router.push('/input/waste');
  };

  const handleBack = () => {
    router.push('/input/passive-income');
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
        <ProgressBar currentStep={3} />

        <InputForm
          title="固定費"
          description="家賃、保険料、通信費、光熱費、サブスクなど、毎月必ず発生する支出を入力してください。変動が大きい項目は平均額でOKです。"
          placeholder="例: 150000"
          initialValue={initialValue}
          onNext={handleNext}
          onBack={handleBack}
          showBackButton={true}
        />

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>※ 住居費、通信費、保険料、サブスク、ローン返済などが該当します</p>
        </div>
      </div>
    </div>
  );
}
