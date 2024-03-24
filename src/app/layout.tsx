import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeRegistry } from '@/components/theme/themeRegistry';
import '@/app/style.scss';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '塾基幹システム',
  description: '塾基幹システムです。',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
