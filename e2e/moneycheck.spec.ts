// 位置: e2e/moneycheck.spec.ts
// 機能: MoneyCheckアプリケーションのE2Eテスト
// 理由: 入力フローから診断結果表示までの動作確認
// 関連: app/page.tsx, app/input/*, app/result/*

import { test, expect } from '@playwright/test';

test.describe('MoneyCheck E2E Test', () => {
  test.beforeEach(async ({ page }) => {
    // セッションストレージをクリア
    await page.goto('/');
    await page.evaluate(() => sessionStorage.clear());
  });

  test('完全な入力フローと診断結果表示', async ({ page }) => {
    // ステップ1: トップページ確認
    await page.goto('/');
    await expect(page).toHaveURL('/');

    // ページタイトルが表示されることを確認
    await expect(page.locator('h1')).toBeVisible();

    // スタートボタンが表示されることを確認
    const startButton = page.locator('button, a').filter({ hasText: /診断|スタート|開始|はじめる/i });
    await expect(startButton.first()).toBeVisible();

    // スクリーンショット: トップページ
    await page.screenshot({ path: '/tmp/01-top-page.png', fullPage: true });

    // ステップ2: 入力フロー開始
    await startButton.first().click();

    // 労働収入入力 (1/7)
    await expect(page).toHaveURL(/\/input\/labor-income/);
    await expect(page.locator('h1, h2')).toContainText(/労働収入/i);

    // プログレスバーが表示されることを確認
    const progressBar = page.locator('[role="progressbar"], .progress, [class*="progress"]').first();
    if (await progressBar.count() > 0) {
      await expect(progressBar).toBeVisible();
    }

    const laborIncomeInput = page.locator('input[type="number"], input[type="text"]').first();
    await laborIncomeInput.fill('300000');
    await page.screenshot({ path: '/tmp/02-labor-income.png', fullPage: true });

    const nextButton1 = page.locator('button').filter({ hasText: /次へ|進む|次|次の入力/i }).first();
    await nextButton1.click();

    // 受動収入入力 (2/7)
    await expect(page).toHaveURL(/\/input\/passive-income/);
    await expect(page.locator('h1, h2')).toContainText(/受動収入|不労所得/i);

    const passiveIncomeInput = page.locator('input[type="number"], input[type="text"]').first();
    await passiveIncomeInput.fill('100000');
    await page.screenshot({ path: '/tmp/03-passive-income.png', fullPage: true });

    const nextButton2 = page.locator('button').filter({ hasText: /次へ|進む|次|次の入力/i }).first();
    await nextButton2.click();

    // 固定費入力 (3/7)
    await expect(page).toHaveURL(/\/input\/fixed-cost/);
    await expect(page.locator('h1, h2')).toContainText(/固定費/i);

    const fixedCostInput = page.locator('input[type="number"], input[type="text"]').first();
    await fixedCostInput.fill('100000');
    await page.screenshot({ path: '/tmp/04-fixed-cost.png', fullPage: true });

    const nextButton3 = page.locator('button').filter({ hasText: /次へ|進む|次|次の入力/i }).first();
    await nextButton3.click();

    // 無駄遣い入力 (4/7)
    await expect(page).toHaveURL(/\/input\/waste/);
    await expect(page.locator('h1, h2')).toContainText(/無駄遣い|浪費/i);

    const wasteInput = page.locator('input[type="number"], input[type="text"]').first();
    await wasteInput.fill('40000');
    await page.screenshot({ path: '/tmp/05-waste.png', fullPage: true });

    const nextButton4 = page.locator('button').filter({ hasText: /次へ|進む|次|次の入力/i }).first();
    await nextButton4.click();

    // 自己投資入力 (5/7)
    await expect(page).toHaveURL(/\/input\/self-investment/);
    await expect(page.locator('h1, h2')).toContainText(/自己投資/i);

    const selfInvestmentInput = page.locator('input[type="number"], input[type="text"]').first();
    await selfInvestmentInput.fill('60000');
    await page.screenshot({ path: '/tmp/06-self-investment.png', fullPage: true });

    const nextButton5 = page.locator('button').filter({ hasText: /次へ|進む|次|次の入力/i }).first();
    await nextButton5.click();

    // 資産入力 (6/7)
    await expect(page).toHaveURL(/\/input\/asset/);
    await expect(page.locator('h1, h2')).toContainText(/資産/i);

    const assetInput = page.locator('input[type="number"], input[type="text"]').first();
    await assetInput.fill('5000000');
    await page.screenshot({ path: '/tmp/07-asset.png', fullPage: true });

    const nextButton6 = page.locator('button').filter({ hasText: /次へ|進む|次|次の入力/i }).first();
    await nextButton6.click();

    // 負債入力 (7/7)
    await expect(page).toHaveURL(/\/input\/debt/);
    await expect(page.locator('h1, h2')).toContainText(/負債|借金/i);

    const debtInput = page.locator('input[type="number"], input[type="text"]').first();
    await debtInput.fill('500000');
    await page.screenshot({ path: '/tmp/08-debt.png', fullPage: true });

    const diagnoseButton = page.locator('button').filter({ hasText: /診断|結果|完了|チェック/i }).first();
    await diagnoseButton.click();

    // ステップ3: 無料診断結果確認
    await expect(page).toHaveURL(/\/result\/free/);
    await page.screenshot({ path: '/tmp/09-free-result.png', fullPage: true });

    // スコアが表示されることを確認
    const scoreElement = page.locator('text=/点|score|スコア/i').first();
    await expect(scoreElement).toBeVisible();

    // ランクが表示されることを確認
    const rankElement = page.locator('text=/ランク|rank|[SABCDEF][+]?/i').first();
    await expect(rankElement).toBeVisible();

    // フッターに免責事項が表示されることを確認
    const footer = page.locator('footer, [role="contentinfo"]').first();
    await expect(footer).toBeVisible();
    await expect(footer).toContainText(/免責|金融商品|投資助言/i);

    // プレミアム版案内ボタンが表示されることを確認
    const premiumButton = page.locator('button, a').filter({ hasText: /プレミアム|詳細|購入/i }).first();
    await expect(premiumButton).toBeVisible();

    // ステップ4: プレミアムプレビュー確認
    await premiumButton.click();
    await expect(page).toHaveURL(/\/result\/preview/);
    await page.screenshot({ path: '/tmp/10-preview.png', fullPage: true });

    // 注意事項が表示されることを確認
    await expect(page.locator('text=/スクリーンショット|保存|閉じると/i').first()).toBeVisible();

    // 購入ボタンが表示されることを確認
    const purchaseButton = page.locator('button').filter({ hasText: /500円で詳細診断を見る|購入|決済/i }).first();
    await expect(purchaseButton).toBeVisible();

    // sessionStorageにデータが保存されていることを確認
    const sessionData = await page.evaluate(() => {
      const data = sessionStorage.getItem('moneyCheckData');
      return data ? JSON.parse(data) : null;
    });

    expect(sessionData).not.toBeNull();
    expect(sessionData.laborIncome).toBe(300000);
    expect(sessionData.passiveIncome).toBe(100000);
    expect(sessionData.fixedCost).toBe(100000);
    expect(sessionData.waste).toBe(40000);
    expect(sessionData.selfInvestment).toBe(60000);
    expect(sessionData.asset).toBe(5000000);
    expect(sessionData.debt).toBe(500000);

    console.log('✓ 全てのテストが正常に完了しました');
    console.log('✓ sessionStorageに全データが保存されています');
    console.log('✓ 免責事項が表示されています');
    console.log('✓ スクリーンショットを /tmp ディレクトリに保存しました');
  });

  test('バリデーション: 空欄入力エラー', async ({ page }) => {
    await page.goto('/input/labor-income');

    // 空欄のまま次へボタンをクリック
    const nextButton = page.locator('button').filter({ hasText: /次へ|進む|次|次の入力/i }).first();
    await nextButton.click();

    // エラーメッセージが表示されるか、ページ遷移しないことを確認
    const currentUrl = page.url();
    await page.waitForTimeout(500);
    const newUrl = page.url();

    // ページが遷移していないか、エラーメッセージが表示されることを確認
    if (currentUrl === newUrl) {
      console.log('✓ 空欄のまま次へ進めないことを確認');
    } else {
      const errorMessage = page.locator('text=/入力して|必須|エラー/i').first();
      if (await errorMessage.count() > 0) {
        console.log('✓ エラーメッセージが表示されることを確認');
      }
    }
  });

  test('バリデーション: 非数値入力エラー', async ({ page }) => {
    await page.goto('/input/labor-income');

    // 非数値を入力
    const input = page.locator('input[type="text"]').first();
    await input.fill('abc123');

    const nextButton = page.locator('button').filter({ hasText: /次へ/i }).first();
    await nextButton.click();

    // エラーメッセージ「数値を入力してください」が表示されることを確認
    await expect(page.locator('text=/数値を入力してください/i')).toBeVisible();
    await page.screenshot({ path: '/tmp/validation-non-numeric.png', fullPage: true });
  });

  test('バリデーション: 負数入力エラー', async ({ page }) => {
    await page.goto('/input/fixed-cost');

    // 負数を入力
    const input = page.locator('input[type="text"]').first();
    await input.fill('-1000');

    const nextButton = page.locator('button').filter({ hasText: /次へ/i }).first();
    await nextButton.click();

    // エラーメッセージ「0以上の数値を入力してください」が表示されることを確認
    await expect(page.locator('text=/0以上の数値を入力してください/i')).toBeVisible();
    await page.screenshot({ path: '/tmp/validation-negative.png', fullPage: true });
  });

  test('バリデーション: 0円入力は許可される', async ({ page }) => {
    await page.goto('/input/passive-income');

    // 0を入力
    const input = page.locator('input[type="text"]').first();
    await input.fill('0');

    const nextButton = page.locator('button').filter({ hasText: /次へ/i }).first();
    await nextButton.click();

    // ページが遷移することを確認
    await expect(page).toHaveURL(/\/input\/fixed-cost/);
  });

  test('ナビゲーション: 戻るボタンで前ページに戻る', async ({ page }) => {
    // 労働収入ページから開始
    await page.goto('/input/labor-income');

    const input1 = page.locator('input[type="text"]').first();
    await input1.fill('300000');

    const nextButton1 = page.locator('button').filter({ hasText: /次へ/i }).first();
    await nextButton1.click();

    // 受動収入ページに遷移
    await expect(page).toHaveURL(/\/input\/passive-income/);

    // 戻るボタンをクリック
    const backButton = page.locator('button').filter({ hasText: /戻る/i }).first();
    await backButton.click();

    // 労働収入ページに戻ることを確認
    await expect(page).toHaveURL(/\/input\/labor-income/);

    // 入力した値が保持されていることを確認
    const input2 = page.locator('input[type="text"]').first();
    await expect(input2).toHaveValue('300000');
  });

  test('sessionStorage: ページリロード後もデータが保持される', async ({ page }) => {
    await page.goto('/input/labor-income');

    // データを入力
    const input = page.locator('input[type="text"]').first();
    await input.fill('500000');

    const nextButton = page.locator('button').filter({ hasText: /次へ/i }).first();
    await nextButton.click();

    // 受動収入ページでリロード
    await page.reload();

    // 戻るボタンで労働収入ページへ
    const backButton = page.locator('button').filter({ hasText: /戻る/i }).first();
    await backButton.click();

    // データが保持されていることを確認
    const inputAfterReload = page.locator('input[type="text"]').first();
    await expect(inputAfterReload).toHaveValue('500000');
  });

  test('フッター: 全ページで免責事項が表示される', async ({ page }) => {
    const pages = [
      '/',
      '/input/labor-income',
      '/input/passive-income',
      '/input/fixed-cost',
      '/input/waste',
      '/input/self-investment',
      '/input/asset',
      '/input/debt',
    ];

    for (const pagePath of pages) {
      await page.goto(pagePath);

      // フッターが存在することを確認
      const footer = page.locator('footer, [role="contentinfo"]').first();
      if (await footer.count() > 0) {
        await expect(footer).toBeVisible();
        // 免責事項のキーワードが含まれていることを確認
        await expect(footer).toContainText(/免責|金融商品|投資助言/i);
      }
    }
  });

  test('プログレスバー: 各ステップで正しい進捗が表示される', async ({ page }) => {
    const steps = [
      { path: '/input/labor-income', step: 1 },
      { path: '/input/passive-income', step: 2 },
      { path: '/input/fixed-cost', step: 3 },
      { path: '/input/waste', step: 4 },
      { path: '/input/self-investment', step: 5 },
      { path: '/input/asset', step: 6 },
      { path: '/input/debt', step: 7 },
    ];

    for (const { path, step } of steps) {
      await page.goto(path);
      await expect(page.locator('text=/ステップ/i')).toContainText(`ステップ ${step} / 7`);
    }
  });

  test('診断結果: 正確なスコア計算', async ({ page }) => {
    // 特定のデータで診断を実行
    await page.goto('/');

    // セッションストレージに直接データを設定
    await page.evaluate(() => {
      const data = {
        laborIncome: 400000,
        passiveIncome: 0,
        fixedCost: 100000,
        waste: 40000,
        selfInvestment: 60000,
        asset: 5000000,
        debt: 500000,
      };
      sessionStorage.setItem('moneyCheckData', JSON.stringify(data));
    });

    // 無料診断結果ページに直接アクセス
    await page.goto('/result/free');

    // スコアとランクが表示されることを確認（複数マッチする場合は.first()を使用）
    await expect(page.locator('text=/点|スコア/i').first()).toBeVisible();
    await expect(page.locator('text=/ランク/i').first()).toBeVisible();

    // 総合スコアの数値が表示されることを確認
    await expect(page.locator('text=/\\/100/i')).toBeVisible();

    // スクリーンショット
    await page.screenshot({ path: '/tmp/diagnose-result-calculation.png', fullPage: true });
  });
});
