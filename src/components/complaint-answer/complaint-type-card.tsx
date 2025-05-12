import { useTranslations } from 'next-intl';

import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

//
//
//

const ComplaintTypeCard = () => {
  const intl = useTranslations('ComplaintAnswerPage');

  //
  //
  //

  return (
    <Card>
      <CardHeader>
        <CardTitle>{intl('type-card.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>대분류 &gt; 중분류 &gt; 소분류</p>
      </CardContent>
    </Card>
  );
};

export default ComplaintTypeCard;
