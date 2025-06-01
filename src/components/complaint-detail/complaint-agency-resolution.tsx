import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Separator } from '../ui/separator';
import { Skeleton } from '../ui/skeleton';

import { cn } from '@/lib/utils';

//
//
//

interface ComplaintAgencyResolutionProps {
  isLoading: boolean;
}

//
//
//

const AGENCY_LINKS = [
  {
    name: '하이코리아',
    url: 'https://www.hikorea.go.kr',
    image: '/images/agencies/hi-korea.png',
  },
  {
    name: '인천생활가이드',
    url: 'https://www.iscfr.or.kr/archive/5010',
    image: '/images/agencies/iscfr.png',
  },
  {
    name: '국민신문고 누리집(홈페이지)로 갑니다.',
    url: 'https://www.epeople.go.kr/index.jsp',
    image: '/images/agencies/e-people.png',
  },
] as const;

//
//
//

const ComplaintAgencyResolution = ({
  isLoading = false,
}: ComplaintAgencyResolutionProps) => {
  const intl = useTranslations('ComplaintDetailPage');

  /**
   *
   */
  const renderContent = () => {
    if (isLoading) {
      return <Skeleton className="h-6 w-full" />;
    }

    return (
      <ul className={cn('flex flex-col items-start gap-4')}>
        {AGENCY_LINKS.map((link, index) => (
          <React.Fragment key={index}>
            <li className={cn('relative h-8 w-full')}>
              <Link href={link.url} target="_blank" rel="noopener noreferrer">
                <Image
                  src={link.image}
                  alt={link.name}
                  objectFit="contain"
                  objectPosition="left"
                  fill
                  priority
                />
              </Link>
            </li>
            {index !== AGENCY_LINKS.length - 1 ? (
              <li className={cn('w-full')}>
                <Separator />
              </li>
            ) : null}
          </React.Fragment>
        ))}
      </ul>
    );
  };

  //
  //
  //

  return (
    <Card>
      <CardHeader>
        <CardTitle>{intl('agency-resolution.title')}</CardTitle>
      </CardHeader>
      <CardContent>{renderContent()}</CardContent>
    </Card>
  );
};

export default ComplaintAgencyResolution;
