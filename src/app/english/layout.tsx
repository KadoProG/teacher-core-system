import type { Metadata } from 'next';
import { EnglishLayout } from '@/components/commons/layout/EnglishLayout';

export const metadata: Metadata = {
  title: '塾基幹システム',
  description: '塾基幹システムです。',
};

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => <EnglishLayout>{children}</EnglishLayout>;

export default Layout;
