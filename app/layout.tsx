// 位置: app/layout.tsx
// 機能: アプリケーション全体の共通レイアウト
// 理由: フッター（免責事項）を全ページに表示
// 関連: components/Footer.tsx

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Footer from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "マネーチェック - キャッシュフロー診断ツール",
  description: "あなたのお金の流れを診断し、改善のヒントを提供します。投資助言ではなく、自己投資と稼ぐ力を重視した診断ツールです。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        {children}
        <Footer />
      </body>
    </html>
  );
}
