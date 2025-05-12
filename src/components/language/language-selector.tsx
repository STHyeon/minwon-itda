import { Globe as IconGlobe } from 'lucide-react';

import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

import { cn } from '@/lib/utils';

//
//
//

const LanguageSelector = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          <IconGlobe />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className={cn('max-w-40 p-2')}>
        <Button variant="ghost" active className={cn('w-full')}>
          한국어
        </Button>
        <Button variant="ghost" className={cn('w-full')}>
          English (영어)
        </Button>
        <Button variant="ghost" className={cn('w-full')}>
          日本語 (일본어)
        </Button>
        <Button variant="ghost" className={cn('w-full')}>
          中文 (중국어)
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default LanguageSelector;
