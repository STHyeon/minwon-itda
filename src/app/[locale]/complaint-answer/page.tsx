import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

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
  const intl = useTranslations('ComplaintAnswerPage');
  const locale = useLocale();

  //
  //
  //

  return (
    <div className={cn('flex w-full flex-col items-center gap-16')}>
      <h2 className={cn('text-5xl font-bold')}>{intl('title')}</h2>

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
        <Link href={`/${locale}/complaint-ask`}>{intl('action-reset')}</Link>
      </Button>
    </div>
  );
};

export default ComplaintAnswer;
