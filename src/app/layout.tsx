import AppProvider from './provider';

import type { Metadata } from 'next';

import '@/styles/globals.css';

import { Header } from '@/components/layout';
import { cn } from '@/lib/utils';

//
//
//

interface RootLayoutProps {
  children: React.ReactNode;
}

//
//
//

export const metadata: Metadata = {
  title: process.env.APP_NAME,
  description: process.env.APP_DESCRIPTION,
};

//
//
//

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ko">
      <body className="bg-base-100">
        <AppProvider>
          <Header />
          <main className={cn('flex flex-1 flex-col')}>{children}</main>
        </AppProvider>
      </body>
    </html>
  );
}
