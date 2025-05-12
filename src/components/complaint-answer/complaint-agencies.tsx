import { useTranslations } from 'next-intl';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import ComplaintAgencyCard from './complaint-agency-card';

import { cn } from '@/lib/utils';

//
//
//

const ComplaintAgencies = () => {
  const intl = useTranslations('ComplaintAnswerPage');

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
        <ComplaintAgencyCard />
        <ComplaintAgencyCard />
        <ComplaintAgencyCard />
      </CardContent>
    </Card>
  );
};

export default ComplaintAgencies;
