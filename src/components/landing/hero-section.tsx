import Link from 'next/link';

import { Button } from '../ui/button';
import HeroSectionLottie from './hero-section-lottie';

import { cn } from '@/lib/utils';

//
//
//

const HeroSection = () => {
  return (
    <div
      className={cn(
        'flex w-full flex-wrap items-center justify-center gap-12 pt-14 sm:flex-col md:flex-row'
      )}
    >
      <HeroSectionLottie />

      <div className={cn('flex w-full max-w-96 flex-col gap-4')}>
        <h2 className={cn('text-5xl font-bold')}>민원잇다</h2>

        <div className={cn('flex w-full flex-col gap-8')}>
          <div className={cn('text-gray-500')}>description</div>
          <Button className="w-full" asChild>
            <Link href="/complaint-ask">민원 문의하기</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
