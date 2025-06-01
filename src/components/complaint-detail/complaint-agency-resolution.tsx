import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
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
      <ul>
        <li className={cn('relative h-14 w-full')}>
          <Link href="https://www.epeople.go.kr/index.jsp" target="_blank">
            <Image
              src="/images/agencies/e-people.svg"
              alt="국민신문고 누리집(홈페이지)로 갑니다."
              fill
              priority
            />
          </Link>
        </li>
        <li className={cn('relative h-14 w-full')}>
          <Link href="https://www.epeople.go.kr/index.jsp" target="_blank">
            <Image
              src="/images/agencies/e-people.svg"
              alt="국민신문고 누리집(홈페이지)로 갑니다."
              fill
              priority
            />
          </Link>
        </li>
        <li className={cn('relative h-14 w-full')}>
          <Link href="https://www.epeople.go.kr/index.jsp" target="_blank">
            <Image
              src="/images/agencies/e-people.svg"
              alt="국민신문고 누리집(홈페이지)로 갑니다."
              fill
              priority
            />
          </Link>
        </li>
      </ul>
    );
  };

  //
  //
  //

  return (
    <Card>
      <CardHeader>
        <CardTitle>해결 가능한 기관</CardTitle>
      </CardHeader>
      <CardContent>{renderContent()}</CardContent>
    </Card>
  );
};

export default ComplaintAgencyResolution;
