import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';

import { Button } from '../ui/button';
import HeroSectionLottie from './hero-section-lottie';

import { ROUTES } from '@/constants/routes';
import { cn } from '@/lib/utils';

//
//
//

const HeroSection = () => {
  const intl = useTranslations('LandingPage');
  const locale = useLocale();

  //
  //
  //

  return (
    <div
      className={cn(
        'flex w-full flex-wrap items-center justify-center gap-12 pt-14 sm:flex-col md:flex-row'
      )}
    >
      <HeroSectionLottie />

      <div className={cn('flex w-full max-w-96 flex-col gap-4')}>
        <div className={cn('flex flex-col gap-1.5')}>
          <div className={cn('flex items-center gap-2')}>
            <Image
              src="/images/etc/incheon-symbol.svg"
              alt="incheon-symbol"
              width={20}
              height={20}
            />
            <p className={cn('text-sm text-gray-500')}>{intl('symbol')}</p>
          </div>
          <h2 className={cn('text-5xl font-bold')}>{intl('title')}</h2>
        </div>

        <div className={cn('flex w-full flex-col gap-8')}>
          <div className={cn('text-gray-500')}>{intl('description')}</div>
          <Button className="w-full" asChild>
            {/* 
            - problem: createNavigation 사용시, asChild가 정상적으로 작동하지 않음
            - ref: https://github.com/radix-ui/primitives/issues/3165
            */}
            <Link href={`/${locale}/${ROUTES.complaintAsk}`}>
              {intl('action-find')}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
