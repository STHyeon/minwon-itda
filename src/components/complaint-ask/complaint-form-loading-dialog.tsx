'use client';

import { useTranslations } from 'next-intl';

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';

import lottieLoading from '@/assets/lotties/loading.json';
import { LottiePlayer } from '@/lib/lottie-player';
import { cn } from '@/lib/utils';

//
//
//

interface ComplaintFormLoadingDialogProps {
  open: boolean;
}

//
//
//

const ComplaintFormLoadingDialog = ({
  open = false,
}: ComplaintFormLoadingDialogProps) => {
  const intl = useTranslations('ComplaintAskPage');

  //
  //
  //

  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{intl('loading-dialog.title')}</AlertDialogTitle>
        </AlertDialogHeader>
        <div className={cn('flex min-h-64 w-full items-center justify-center')}>
          <LottiePlayer animationData={lottieLoading} play />
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ComplaintFormLoadingDialog;
