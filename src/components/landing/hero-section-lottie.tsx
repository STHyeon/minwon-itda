'use client';

import Lottie from 'react-lottie-player';

import lottieHeroSection from '@/assets/lotties/hero-section.json';
import { cn } from '@/lib/utils';

//
//
//

const HeroSectionLottie = () => {
  return (
    <Lottie
      animationData={lottieHeroSection}
      speed={0.25}
      className={cn('w-full flex-1 basis-[15.75rem]')}
      play
    />
  );
};

export default HeroSectionLottie;
