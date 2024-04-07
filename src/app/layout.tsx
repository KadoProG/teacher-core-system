import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import NextAuthProvider from '@/components/commons/auth/NextAuth';
import { SnackbarProvider } from '@/components/commons/feedback/SnackbarContext';
import { ThemeRegistry } from '@/components/theme/themeRegistry';
import '@/app/style.scss';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '塾基幹システム',
  description: '塾基幹システムです。',
};

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <html lang="en">
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
