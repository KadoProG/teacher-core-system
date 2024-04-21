import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import NextAuthProvider from '@/components/commons/auth/NextAuth';
import { SnackbarProvider } from '@/components/commons/feedback/SnackbarContext';
import { ThemeRegistry } from '@/components/theme/themeRegistry';
import '@/app/style.scss';

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
}>) => (
  <html lang="ja">
    <head>
      <link rel="manifest" href="/manifest.json" />
      <link rel="apple-touch-icon" href="/icon.png" />
      <meta name="theme-color" content="#b8e986" />
    </head>
    <body className={inter.className}>
      <NextAuthProvider>
        <ThemeRegistry>
          <SnackbarProvider>{children}</SnackbarProvider>
        </ThemeRegistry>
      </NextAuthProvider>
    </body>
  </html>
);

export default Layout;
