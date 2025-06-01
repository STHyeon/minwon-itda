'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';

import type { SavingStorage } from '@/typings/etc';

import {
  ComplaintAgencies,
  ComplaintAgencyResolution,
  ComplaintCaseExamples,
  ComplaintQuestion,
} from '@/components/complaint-detail';
import { Button } from '@/components/ui/button';
import { COMPLIANT_STORAGE_KEY } from '@/constants/complaint';
import { ROUTES } from '@/constants/routes';
import { getFromLocalStorage } from '@/lib/complaint-saving';
import { ensureMinimumResponseTime } from '@/lib/time-utils';
import { cn } from '@/lib/utils';

//
//
//

const MIN_LOADING_TIME = 1000; // 최소 1초

//
//
//

const ComplaintAnswer = () => {
  const intl = useTranslations('ComplaintDetailPage');
  const commonIntl = useTranslations('Common');
  const locale = useLocale();
  const params = useParams();

  const complaintId = params.complaintId as string;

  const [complaintData, setComplaintData] =
    React.useState<null | SavingStorage>(null);

  const [isLoading, setLoading] = React.useState(true);

  /**
   *
   */
  const renderComplaintData = () => {
    const isDataLoading = isLoading || !complaintData;
    const isDataNotFound = !complaintData && !isLoading;

    if (isDataNotFound) {
      return (
        <div className={cn('flex w-full flex-col items-center gap-4')}>
          <p className={cn('text-2xl font-bold')}>{commonIntl('empty-data')}</p>
          <Image
            src="/images/errors/not-found.jpg"
            alt="not found"
            width={400}
            height={400}
            quality={100}
            priority
          />
        </div>
      );
    }

    return (
      <div className={cn('relative flex w-full flex-col gap-8 md:flex-row')}>
        <div
          className={cn(
            'flex h-fit w-full flex-col gap-6 md:sticky md:top-4 md:max-w-80'
          )}
        >
          <ComplaintQuestion
            data={isDataLoading ? 'skeleton' : complaintData}
          />

          <ComplaintAgencyResolution isLoading={isDataLoading} />
        </div>

        <div className={cn('flex flex-1 flex-col gap-6')}>
          <ComplaintAgencies
            data={
              isDataLoading ? 'skeleton' : complaintData.data.recommendAgencies
            }
          />

          {complaintData?.data.policyQnaItem ? (
            <ComplaintCaseExamples
              data={
                isDataLoading ? 'skeleton' : complaintData.data.policyQnaItem
              }
            />
          ) : null}
        </div>
      </div>
    );
  };

  //
  // Get complaint data from localStorage
  //
  React.useEffect(() => {
    setLoading(true);
    const startTime = Date.now();

    const loadData = async () => {
      try {
        const storedComplaints = getFromLocalStorage(COMPLIANT_STORAGE_KEY);
        const complaint = storedComplaints.find(
          item => item.id === complaintId
        );

        if (complaint) {
          setComplaintData(complaint);
        }
      } catch {
        setComplaintData(null);
      } finally {
        await ensureMinimumResponseTime(startTime, MIN_LOADING_TIME);
        setLoading(false);
      }
    };

    void loadData();
  }, [complaintId]);

  //
  //
  //

  return (
    <div className={cn('relative flex w-full flex-col items-center gap-16')}>
      <h2 className={cn('text-5xl font-bold')}>{intl('title')}</h2>

      {renderComplaintData()}

      <div className={cn('sticky bottom-10 z-10 w-full max-w-lg shadow-xl/30')}>
        <Button className={cn('w-full')} disabled={isLoading} asChild>
          {/* 
          - problem: createNavigation 사용시, asChild가 정상적으로 작동하지 않음
          - ref: https://github.com/radix-ui/primitives/issues/3165
          */}
          <Link href={`/${locale}/${ROUTES.home}`}>{intl('action-reset')}</Link>
        </Button>
      </div>
    </div>
  );
};

export default ComplaintAnswer;
