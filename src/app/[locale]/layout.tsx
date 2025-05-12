import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';

import AppProvider from './provider';

import { Header } from '@/components/layout';
import { routing } from '@/i18n/routing';
import { cn } from '@/lib/utils';

//
//
//

interface RootLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

//
//
//

export default async function LocaleLayout({
  children,
  params,
}: RootLayoutProps) {
  // Promise.resolve를 사용하여 params를 promise로 변환 후 await
  const resolvedParams = await Promise.resolve(params);
  const { locale } = resolvedParams;

  // Ensure that the incoming `locale` is valid
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Load messages for the current locale
  const messages = (await import(`../../../public/messages/${locale}.json`))
    .default;

  //
  //
  //

  return (
    <html lang={locale}>
      <body className="bg-base-100">
        <AppProvider locale={locale} messages={messages}>
          <Header />
          <main className={cn('flex flex-1 flex-col')}>{children}</main>
        </AppProvider>
      </body>
    </html>
  );
}
