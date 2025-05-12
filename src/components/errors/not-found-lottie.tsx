'use client';

import lottieNotFound from '@/assets/lotties/not-found.json';
import { LottiePlayer } from '@/lib/lottie-player';
import { cn } from '@/lib/utils';

//
//
//

const NotFoundLottie = () => {
  return (
    <LottiePlayer
      animationData={lottieNotFound}
      speed={0.5}
      play
      className={cn('w-full max-w-96')}
    />
  );
};

export default NotFoundLottie;
