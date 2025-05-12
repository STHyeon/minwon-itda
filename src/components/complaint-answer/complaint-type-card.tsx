import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

//
//
//

const ComplaintTypeCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>민원 분류</CardTitle>
      </CardHeader>
      <CardContent>
        <p>대분류 &gt; 중분류 &gt; 소분류</p>
      </CardContent>
    </Card>
  );
};

export default ComplaintTypeCard;
