'use client';

import { useTranslations } from 'next-intl';

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';

import lottieLoading from '@/assets/lotties/loading.json';
import { LottiePlayer } from '@/lib/lottie-player';

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
        <AlertDialogDescription>
          <LottiePlayer animationData={lottieLoading} play />
        </AlertDialogDescription>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ComplaintFormLoadingDialog;
