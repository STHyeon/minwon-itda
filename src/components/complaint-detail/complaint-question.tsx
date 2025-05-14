import { useTranslations } from 'next-intl';

import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Skeleton } from '../ui/skeleton';

import type { StorageItem } from '@/typings/complaint';

//
//
//

type PickedStorageItem = Pick<StorageItem, 'title' | 'description'>;

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
        <p>{data.title}</p>
        <p className="mt-2 text-sm text-gray-500">{data.description}</p>
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
