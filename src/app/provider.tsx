'use client';

import { ErrorBoundary } from 'react-error-boundary';

import { ErrorFallback } from '@/components/errors';

//
//
//

interface AppProviderProps {
  children: React.ReactNode;
}

//
//
//

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>{children}</ErrorBoundary>
  );
};

export default AppProvider;
