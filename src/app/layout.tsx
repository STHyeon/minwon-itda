import type { Metadata } from 'next';

import '@/styles/globals.css';

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
  return children;
}
