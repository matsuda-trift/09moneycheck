// 位置: app/input/asset/page.tsx
// 機能: 資産入力ページ（ステップ6/7）
// 理由: 現金・預金・投資など保有資産の総額を入力
// 関連: app/input/self-investment/page.tsx, app/input/debt/page.tsx

'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ProgressBar from '@/components/ProgressBar';
import InputForm from '@/components/InputForm';
import { saveData, getData } from '@/lib/sessionStorage';

export default function AssetPage() {
  const router = useRouter();
  const [initialValue, setInitialValue] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const data = getData();
    setInitialValue(data.asset);
    setIsLoaded(true);
  }, []);

  const handleNext = (value: number) => {
    saveData('asset', value);
    router.push('/input/debt');
  };

  const handleBack = () => {
    router.push('/input/self-investment');
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
        <ProgressBar currentStep={6} />

        <InputForm
          title="資産"
          description="現金、預金、株式、投資信託、不動産など、現在保有している資産の合計額を入力してください。"
          placeholder="例: 200,000"
          initialValue={initialValue}
          onNext={handleNext}
          onBack={handleBack}
          showBackButton={true}
        />

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>※ すぐに現金化できるものを中心に、概算でOKです</p>
        </div>
      </div>
    </div>
  );
}
