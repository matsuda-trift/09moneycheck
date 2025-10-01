// 位置: app/input/labor-income/page.tsx
// 機能: 労働収入入力ページ（ステップ1/7）
// 理由: 給与・事業収入など労働で得る収入を入力
// 関連: app/input/passive-income/page.tsx, lib/sessionStorage.ts

'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ProgressBar from '@/components/ProgressBar';
import InputForm from '@/components/InputForm';
import { saveData, getData } from '@/lib/sessionStorage';

export default function LaborIncomePage() {
  const router = useRouter();
  const [initialValue, setInitialValue] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Client側でのみ実行
    const data = getData();
    setInitialValue(data.laborIncome);
    setIsLoaded(true);
  }, []);

  const handleNext = (value: number) => {
    saveData('laborIncome', value);
    router.push('/input/passive-income');
  };

  const handleBack = () => {
    router.push('/');
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
        <ProgressBar currentStep={1} />

        <InputForm
          title="労働収入"
          description="給料や事業収入など、自分が働いて得ている収入を入力してください。複数の収入源がある場合は合計額を入力してください。"
          placeholder="例: 250000"
          initialValue={initialValue}
          onNext={handleNext}
          onBack={handleBack}
          showBackButton={true}
        />

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>※ 手取り額ではなく、税金・保険料を引く前の総額を入力してください</p>
        </div>
      </div>
    </div>
  );
}
