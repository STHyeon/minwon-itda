'use client';

import Lottie from 'react-lottie-player';

import lottieNotFound from '@/assets/lotties/not-found.json';
import { cn } from '@/lib/utils';

//
//
//

const NotFoundLottie = () => {
  return (
    <Lottie
      animationData={lottieNotFound}
      speed={0.5}
      play
      className={cn('w-full max-w-96')}
    />
  );
};

export default NotFoundLottie;
