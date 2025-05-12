import { useTranslations } from 'next-intl';

import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

//
//
//

const ComplaintQuestion = () => {
  const intl = useTranslations('ComplaintAnswerPage');

  //
  //
  //

  return (
    <Card>
      <CardHeader>
        <CardTitle>{intl('question.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>도로가 파손되었어요. 어떻게 해야 하나요?</p>
      </CardContent>
    </Card>
  );
};

export default ComplaintQuestion;
