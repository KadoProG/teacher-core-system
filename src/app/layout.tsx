import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { cookies } from 'next/headers';
import { ConfirmDialogProvider } from '@/components/commons/feedback/ConfirmDialogContext';
import { SnackbarProvider } from '@/components/commons/feedback/SnackbarContext';
import NextAuthProvider from '@/libs/auth/NextAuthProvider';
import { ColorModeChoice, ThemeRegistry } from '@/libs/theme/themeRegistry';
import '@/app/globals.scss';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.BASE_URL as string),
  title: '塾基幹システム',
  description: '塾基幹システムです。',
  keywords: 'Webサイト,塾,印刷',
  openGraph: {
    type: 'website',
    images: ['/icatch.png'],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@KadoUniversity',
    images: ['/icatch.png'],
  },
};

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const preColorMode = cookies().get('colorMode')?.value;
  const initColorMode: ColorModeChoice =
    preColorMode === 'light' || preColorMode === 'dark'
      ? preColorMode
      : 'device';

  // 初期表示のカスタムスタイルを適用
  let style: any = {};
  if (['light', 'dark'].includes(initColorMode)) {
    style['--init-background'] = initColorMode === 'dark' ? '#333' : '#fff';
  }
  return (
    <html lang="ja" style={style}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon.png" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <NextAuthProvider>
          <ThemeRegistry initColorMode={initColorMode}>
            <SnackbarProvider>
              <ConfirmDialogProvider>{children}</ConfirmDialogProvider>
            </SnackbarProvider>
          </ThemeRegistry>
        </NextAuthProvider>
      </body>
    </html>
  );
};

export default Layout;
