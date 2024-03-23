import type { Metadata } from "next";
import "./globals.css";
import { APP_DESC, APP_NAME } from './lib/constants';

export const metadata: Metadata = {
  // without a title, warpcast won't validate your frame
  title: APP_NAME,
  description: APP_DESC,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
