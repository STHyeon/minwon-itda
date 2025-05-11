'use client';

import Lottie from 'react-lottie-player';

import { Button } from '../ui/button';

import heroSection from '@/assets/lotties/hero-section.json';
import { cn } from '@/lib/utils';

//
//
//

const HeroSection = () => {
  return (
    <div
      className={cn(
        'flex w-full flex-wrap items-center justify-center gap-12 sm:flex-col md:flex-row'
      )}
    >
      <Lottie
        animationData={heroSection}
        play
        loop={false}
        className={cn('w-full flex-1 basis-[15.75rem]')}
      />
      <div className={cn('flex w-full max-w-96 flex-col gap-4')}>
        <h1 className={cn('text-5xl font-bold')}>민원잇다</h1>

        <div className={cn('flex w-full flex-col gap-8')}>
          <div className={cn('text-gray-500')}>description</div>
          <Button className="w-full">버튼</Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
