import { useTranslations } from 'next-intl';

import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Skeleton } from '../ui/skeleton';

import type { SavingStorage } from '@/typings/etc';

//
//
//

type PickedStorageItem = Pick<SavingStorage, 'question'>;

interface ComplaintQuestionProps {
  data: PickedStorageItem | 'skeleton';
}

//
//
//

const ComplaintQuestion = ({ data }: ComplaintQuestionProps) => {
  const intl = useTranslations('ComplaintDetailPage');

  /**
   *
   */
  const renderContent = () => {
    if (data === 'skeleton') {
      return <Skeleton className="h-6 w-full" />;
    }

    return (
      <>
        <p>{data.question}</p>
      </>
    );
  };

  //
  //
  //

  return (
    <Card>
      <CardHeader>
        <CardTitle>{intl('question.title')}</CardTitle>
      </CardHeader>
      <CardContent>{renderContent()}</CardContent>
    </Card>
  );
};

export default ComplaintQuestion;
