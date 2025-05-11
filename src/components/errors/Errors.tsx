import React from 'react';
import Image from 'next/image';

import { Button } from '../ui/button';

import type { FallbackProps } from 'react-error-boundary';

import { cn } from '@/lib/utils';

//
//
//

type ErrorsProps = FallbackProps & React.ComponentProps<'div'>;

//
//
//

const Errors = React.forwardRef<HTMLDivElement, ErrorsProps>(
  ({ resetErrorBoundary, ...props }, ref) => {
    return (
      <div
        {...props}
        ref={ref}
        className={cn('flex h-dvh flex-col items-center justify-center gap-4')}
      >
        <div className={cn('relative aspect-square w-full max-w-96')}>
          <Image src="/images/errors/server-down.svg" alt="error-image" fill />
        </div>
        <p className={cn('text-center text-2xl font-bold')}>
          죄송합니다. 예기치 못한 오류가 발생했어요. 잠시 후 다시 시도해주세요.
        </p>
        <Button onClick={resetErrorBoundary}>홈으로 돌아가기</Button>
      </div>
    );
  }
);

Errors.displayName = 'Errors';

export default Errors;
