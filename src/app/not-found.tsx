import { NotFoundLottie } from '@/components/errors';
import { cn } from '@/lib/utils';

//
//
//

const NotFoundPage = () => {
  return (
    <html lang="en">
      <body>
        <div
          className={cn(
            'flex h-dvh flex-col items-center justify-center gap-4 px-4'
          )}
        >
          <NotFoundLottie />
          <p className={cn('text-center text-2xl font-bold')}>
            죄송합니다. 예기치 못한 오류가 발생했어요. 잠시 후 다시
            시도해주세요.
          </p>
        </div>
      </body>
    </html>
  );
};

export default NotFoundPage;
