// 位置: app/input/waste/page.tsx
// 機能: 無駄遣い入力ページ（ステップ4/7）
// 理由: 娯楽費や衝動買いなど計画外の支出を入力
// 関連: app/input/fixed-cost/page.tsx, app/input/self-investment/page.tsx

'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ProgressBar from '@/components/ProgressBar';
import InputForm from '@/components/InputForm';
import { saveData, getData } from '@/lib/sessionStorage';

export default function WastePage() {
  const router = useRouter();
  const [initialValue, setInitialValue] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const data = getData();
    setInitialValue(data.waste);
    setIsLoaded(true);
  }, []);

  const handleNext = (value: number) => {
    saveData('waste', value);
    router.push('/input/self-investment');
  };

  const handleBack = () => {
    router.push('/input/fixed-cost');
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
        <ProgressBar currentStep={4} />

        <InputForm
          title="無駄遣い"
          description="娯楽費、外食、衝動買い、趣味など、計画外の支出や贅沢品を入力してください。心の健康のための支出も含めてOKです。"
          placeholder="例: 30,000"
          initialValue={initialValue}
          onNext={handleNext}
          onBack={handleBack}
          showBackButton={true}
        />

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>※ 無駄遣いは悪じゃない。程よく楽しむことも大切です</p>
        </div>
      </div>
    </div>
  );
}
