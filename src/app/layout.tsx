import type { Metadata } from 'next';
import { Noto_Sans_JP } from 'next/font/google';
import NextAuthProvider from '@/components/commons/auth/NextAuth';
import { SnackbarProvider } from '@/components/commons/feedback/SnackbarContext';
import { ThemeRegistry } from '@/components/theme/themeRegistry';
import '@/app/style.scss';

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  variable: '--font-noto-sans-jp',
  // weight: 'variable', // default なので不要。バリアブルフォントでなければ必要
  // display: 'swap', // default なので不要
  // preload: true, // default なので不要
  // adjustFontFallback: true, // next/font/google で default なので不要
  // fallback: ['system-ui', 'arial'], // local font fallback なので不要
});

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
  <html lang="en">
    <head>
      <link rel="manifest" href="/manifest.json" />
      <link rel="apple-touch-icon" href="/icon.png" />
      <meta name="theme-color" content="#b8e986" />
    </head>
    <body className={notoSansJP.className}>
      <NextAuthProvider>
        <ThemeRegistry>
          <SnackbarProvider>{children}</SnackbarProvider>
        </ThemeRegistry>
      </NextAuthProvider>
    </body>
  </html>
);

export default Layout;
