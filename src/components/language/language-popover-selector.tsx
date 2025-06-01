'use client';

import { Globe as IconGlobe } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

import { usePathname, useRouter } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

//
//
//

const Language = {
  KO: 'ko',
  EN: 'en',
  JA: 'ja',
  ZH: 'zh',
} as const;

//
//
//

const LanguagePopoverSelector = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const intl = useTranslations('Language');

  /**
   *
   */
  const handleChangeLanguage = (newLocale: string) => {
    // Replace the current path with the same path but new locale
    router.replace(pathname, { locale: newLocale });
  };

  //
  //
  //

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          <IconGlobe />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className={cn('max-w-40 p-2')}>
        {Object.values(Language).map(language => {
          return (
            <Button
              key={language}
              variant="ghost"
              active={locale === language}
              className={cn('w-full')}
              onClick={() => handleChangeLanguage(language)}
            >
              {intl(language)}
            </Button>
          );
        })}
      </PopoverContent>
    </Popover>
  );
};

export default LanguagePopoverSelector;
