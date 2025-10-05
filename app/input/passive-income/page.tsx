// 位置: app/input/passive-income/page.tsx
// 機能: 受動収入入力ページ（ステップ2/7）
// 理由: 不動産収入・配当金など働かずに得る収入を入力
// 関連: app/input/labor-income/page.tsx, app/input/fixed-cost/page.tsx

'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ProgressBar from '@/components/ProgressBar';
import InputForm from '@/components/InputForm';
import { saveData, getData } from '@/lib/sessionStorage';

export default function PassiveIncomePage() {
  const router = useRouter();
  const [initialValue, setInitialValue] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Client側でのみ実行
    const data = getData();
    setInitialValue(data.passiveIncome);
    setIsLoaded(true);
  }, []);

  const handleNext = (value: number) => {
    saveData('passiveIncome', value);
    router.push('/input/fixed-cost');
  };

  const handleBack = () => {
    router.push('/input/labor-income');
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
        <ProgressBar currentStep={2} />

        <InputForm
          title="受動収入"
          description="不動産収入、配当金、利息収入など、働かなくても得られる収入を入力してください。現在ない場合は0円でOKです。"
          placeholder="例: 0"
          initialValue={initialValue}
          onNext={handleNext}
          onBack={handleBack}
          showBackButton={true}
        />

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>※ 株式配当、家賃収入、印税、ブログ収益などが該当します</p>
        </div>
      </div>
    </div>
  );
}
