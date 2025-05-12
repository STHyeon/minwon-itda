import Link from 'next/link';

import {
  ComplaintAgencies,
  ComplaintQuestion,
  ComplaintTypeCard,
} from '@/components/complaint-answer';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

//
//
//

const ComplaintAnswer = () => {
  return (
    <div className={cn('flex w-full flex-col items-center gap-16')}>
      <h2 className={cn('text-5xl font-bold')}>민원 찾기 결과</h2>

      <div className={cn('flex w-full gap-8')}>
        <div className={cn('flex w-full max-w-80 flex-col gap-6')}>
          <ComplaintQuestion />
          <ComplaintTypeCard />
        </div>

        <div className={cn('flex-1')}>
          <ComplaintAgencies />
        </div>
      </div>

      <Button asChild>
        <Link href="/complaint-ask">민원 찾기 다시하기</Link>
      </Button>
    </div>
  );
};

export default ComplaintAnswer;
