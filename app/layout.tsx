import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "天気予報アプリ",
  description: "都市名や現在地から天気予報を調べられるアプリです",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
