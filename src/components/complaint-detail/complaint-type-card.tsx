import { useTranslations } from 'next-intl';

import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

import type { SimilarInfoResponse } from '@/typings/complaint';

//
//
//

type ComplaintTypeCardProps = Pick<
  SimilarInfoResponse,
  'mainSubName' | 'depName'
>;

//
//
//

const ComplaintTypeCard = ({
  mainSubName,
  depName,
}: ComplaintTypeCardProps) => {
  const intl = useTranslations('ComplaintDetailPage');

  //
  //
  //

  return (
    <Card>
      <CardHeader>
        <CardTitle>{intl('type-card.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>
          {mainSubName} {depName ? `&gt; ${depName}` : null}
        </p>
      </CardContent>
    </Card>
  );
};

export default ComplaintTypeCard;
