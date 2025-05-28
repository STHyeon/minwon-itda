import { useTranslations } from 'next-intl';

import { ComplaintForm } from '@/components/complaint-ask';
import { cn } from '@/lib/utils';

//
//
//

const ComplaintAsk = () => {
  const intl = useTranslations('ComplaintAskPage');

  //
  //
  //

  return (
    <div className={cn('flex w-full flex-col items-center gap-16')}>
      <h2 className={cn('text-5xl font-bold')}>{intl('title')}</h2>

      <div
        className={cn(
          'flex w-full max-w-2xl flex-col gap-6 text-center whitespace-pre-wrap'
        )}
      >
        <p>{intl('description')}</p>
        <ComplaintForm />
      </div>
    </div>
  );
};

export default ComplaintAsk;
