import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';

import AppProvider from './provider';

import { Header } from '@/components/layout';
import { Toaster } from '@/components/ui/sonner';
import { routing } from '@/i18n/routing';
import { cn } from '@/lib/utils';

//
//
//

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

//
//
//

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  // ref: https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes#example
  const resolvedParams = await params;
  const locale = resolvedParams?.locale;

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

          <Toaster
            position="bottom-center"
            expand={false}
            richColors
            closeButton
          />
        </AppProvider>
      </body>
    </html>
  );
}
