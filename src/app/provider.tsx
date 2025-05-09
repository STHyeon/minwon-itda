'use client';

import { ErrorBoundary } from 'react-error-boundary';

import { Errors } from '@/components';

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
  return <ErrorBoundary FallbackComponent={Errors}>{children}</ErrorBoundary>;
};

export default AppProvider;
