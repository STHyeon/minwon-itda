'use client';

import { ErrorBoundary } from 'react-error-boundary';
import { NextIntlClientProvider } from 'next-intl';

import { ErrorFallback } from '@/components/errors';

//
//
//

interface AppProviderProps {
  children: React.ReactNode;
  locale: string;
  messages: Record<string, string>;
}

//
//
//

const AppProvider: React.FC<AppProviderProps> = ({
  children,
  locale,
  messages,
}) => {
  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messages}
      timeZone="Asia/Seoul"
    >
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        {children}
      </ErrorBoundary>
    </NextIntlClientProvider>
  );
};

export default AppProvider;
