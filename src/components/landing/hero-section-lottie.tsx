'use client';

import lottieHeroSection from '@/assets/lotties/hero-section.json';
import { LottiePlayer } from '@/lib/lottie-player';
import { cn } from '@/lib/utils';

//
//
//

const HeroSectionLottie = () => {
  return (
    <LottiePlayer
      animationData={lottieHeroSection}
      speed={0.25}
      className={cn('w-full flex-1 basis-[15.75rem]')}
      play
    />
  );
};

export default HeroSectionLottie;
