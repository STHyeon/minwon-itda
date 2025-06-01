'use client';

import React from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

import { Button } from '../ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';

import type { SavingStorage } from '@/typings/etc';

import { COMPLIANT_STORAGE_KEY } from '@/constants/complaint';
import { ROUTES } from '@/constants/routes';
import { getFromLocalStorage } from '@/lib/complaint-saving';
import { cn } from '@/lib/utils';

//
//
//

const HeroCards = () => {
  const locale = useLocale();
  const intl = useTranslations('LandingPage');

  const [heroCardsContent, setHeroCardsContent] = React.useState<
    SavingStorage[]
  >([]);

  //
  // 최근 검색한 민원 데이터 가져오기
  //
  React.useEffect(() => {
    const storedContent = getFromLocalStorage(COMPLIANT_STORAGE_KEY);

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
      <p className={cn('text-2xl font-bold')}>{intl('recent-complaint')}</p>

      <div
        className={cn(
          'grid w-full grid-cols-[repeat(auto-fill,minmax(18.625rem,1fr))] gap-4'
        )}
      >
        {heroCardsContent.map((content, index) => (
          <Card key={index} className={cn('justify-between')}>
            <div className={cn('flex flex-col gap-4')}>
              <CardHeader>
                <CardTitle className={cn('line-clamp-1')}>
                  {content.question}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className={cn('text-sm text-gray-500')}>
                  {intl('recent-complaint-label')}
                </p>
                <ul className={cn('flex flex-col gap-2')}>
                  {content.data.recommendAgencies
                    .slice(0, 3)
                    .map((recommendAgency, index) => (
                      <li key={index} className={cn('flex items-center gap-2')}>
                        <span className={cn('text-sm text-gray-500')}>
                          {index + 1}.
                        </span>
                        <span className={cn('text-sm')}>
                          {recommendAgency.organizationName}
                        </span>
                      </li>
                    ))}
                </ul>
              </CardContent>
            </div>
            <CardFooter>
              <Button asChild>
                {/* 
                - problem: createNavigation 사용시, asChild가 정상적으로 작동하지 않음
                - ref: https://github.com/radix-ui/primitives/issues/3165
                */}
                <Link
                  href={`/${locale}/${ROUTES.complaintAskDetail(content.id)}`}
                >
                  {intl('recent-complaint-action')}
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HeroCards;
