// 位置: app/input/self-investment/page.tsx
// 機能: 自己投資入力ページ（ステップ5/7）
// 理由: スキルアップや健康など将来の収入につながる支出を入力
// 関連: app/input/waste/page.tsx, app/input/asset/page.tsx

'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ProgressBar from '@/components/ProgressBar';
import InputForm from '@/components/InputForm';
import { saveData, getData } from '@/lib/sessionStorage';

export default function SelfInvestmentPage() {
  const router = useRouter();
  const [initialValue, setInitialValue] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const data = getData();
    setInitialValue(data.selfInvestment);
    setIsLoaded(true);
  }, []);

  const handleNext = (value: number) => {
    saveData('selfInvestment', value);
    router.push('/input/asset');
  };

  const handleBack = () => {
    router.push('/input/waste');
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
        <ProgressBar currentStep={5} />

        <InputForm
          title="自己投資"
          description="書籍、オンライン講座、資格取得、ジム、健康など、将来の収入アップやスキル向上につながる支出を入力してください。"
          placeholder="例: 10,000"
          initialValue={initialValue}
          onNext={handleNext}
          onBack={handleBack}
          showBackButton={true}
        />

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>※ 貯金より自己投資。稼ぐ力を高めることが最強の資産です</p>
        </div>
      </div>
    </div>
  );
}
