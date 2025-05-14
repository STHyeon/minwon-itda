import Image from 'next/image';
import { useTranslations } from 'next-intl';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Skeleton } from '../ui/skeleton';
import ComplaintAgencyCard from './complaint-agency-card';

import type { StorageItem } from '@/typings/complaint';

import { cn } from '@/lib/utils';

//
//
//

interface ComplaintAgenciesProps {
  data: 'skeleton' | StorageItem['data'];
}

//
//
//

const ComplaintAgencies = ({ data }: ComplaintAgenciesProps) => {
  const intl = useTranslations('ComplaintDetailPage');

  /**
   *
   */
  const renderContent = () => {
    if (data === 'skeleton') {
      return Array.from({ length: 3 }).map((_, index) => (
        <Card key={index} className={cn('p-0 py-4')}>
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-4 w-1/6" />
            </CardTitle>
            <CardDescription>
              <Skeleton className="h-4 w-10/12" />
            </CardDescription>
          </CardHeader>
        </Card>
      ));
    }

    if (data.length === 0) {
      return (
        <div className={cn('flex flex-col items-center justify-center gap-2')}>
          <div className={cn('flex w-full flex-col items-center gap-4')}>
            <p className={cn('text-2xl font-bold')}>
              검색 결과가 없거나 데이터를 불러올 수 없어요.
            </p>
            <Image
              src="/images/errors/not-found.jpg"
              alt="not found"
              width={400}
              height={400}
              quality={100}
              priority
            />
          </div>
        </div>
      );
    }

    return (
      <div className={cn('flex flex-col gap-2')}>
        {data.map((item, index) => (
          <ComplaintAgencyCard key={index} data={item} />
        ))}
      </div>
    );
  };

  //
  //
  //

  return (
    <Card>
      <CardHeader>
        <CardTitle>{intl('agencies.title')}</CardTitle>
        <CardDescription>{intl('agencies.description')}</CardDescription>
      </CardHeader>
      <CardContent className={cn('flex flex-col gap-2')}>
        {renderContent()}
      </CardContent>
    </Card>
  );
};

export default ComplaintAgencies;
