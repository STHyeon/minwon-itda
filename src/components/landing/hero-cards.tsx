import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';

import { cn } from '@/lib/utils';

const HeroCards = () => {
  const heroCardsContent = [
    {
      title: '카드 제목',
      description: '카드 설명',
      content: '내용',
    },
    {
      title: '카드 제목',
      description: '카드 설명',
      content: '내용',
    },
    {
      title: '카드 제목',
      description: '카드 설명',
      content: '내용',
    },
  ] as const;

  //
  //
  //

  return (
    <div
      className={cn(
        'grid w-full grid-cols-[repeat(auto-fit,minmax(18.625rem,1fr))] gap-4'
      )}
    >
      {heroCardsContent.map((card, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle>{card.title}</CardTitle>
            <CardDescription>카드 설명</CardDescription>
          </CardHeader>
          <CardContent>
            <div>내용</div>
          </CardContent>
          <CardFooter>
            <div>a</div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default HeroCards;
