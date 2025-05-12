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
  return (
    <Card>
      <CardHeader>
        <CardTitle>관련 기관</CardTitle>
        <CardDescription>
          민원 찾기 결과에 따라 관련 기관을 추천해드립니다.
        </CardDescription>
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
