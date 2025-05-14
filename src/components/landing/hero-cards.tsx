'use client';

import React from 'react';

import { Button } from '../ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';

import type { StorageItem } from '@/typings/complaint-ask';

import { COMPLIANT_ASK_STORAGE_KEY } from '@/constants/complaint-ask';
import { getFromLocalStorage } from '@/lib/complaint-saving';
import { cn } from '@/lib/utils';

//
//
//

const HeroCards = () => {
  const [heroCardsContent, setHeroCardsContent] = React.useState<StorageItem[]>(
    []
  );

  //
  // 최근 검색한 민원 데이터 가져오기
  //
  React.useEffect(() => {
    const storedContent = getFromLocalStorage(COMPLIANT_ASK_STORAGE_KEY);

    setHeroCardsContent(storedContent);
  }, []);

  //
  //
  //

  if (heroCardsContent.length === 0) {
    return null;
  }

  return (
    <div className={cn('flex flex-col gap-4')}>
      <p className={cn('text-2xl font-bold')}>최근에 검색한 민원</p>

      <div
        className={cn(
          'grid w-full grid-cols-[repeat(auto-fill,minmax(18.625rem,1fr))] gap-4'
        )}
      >
        {heroCardsContent.map((content, index) => (
          <Card key={index} className={cn('justify-between')}>
            <div className={cn('flex flex-col gap-4')}>
              <CardHeader>
                <CardTitle>{content.title}</CardTitle>
                <CardDescription>{content.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className={cn('flex flex-col gap-2')}>
                  {content.data.slice(0, 3).map((item, index) => (
                    <li key={index} className={cn('flex items-center gap-2')}>
                      <span className={cn('text-sm text-gray-500')}>
                        {index + 1}.
                      </span>
                      <span className={cn('text-sm')}>{item.title}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </div>
            <CardFooter>
              <Button>민원 보기</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HeroCards;
