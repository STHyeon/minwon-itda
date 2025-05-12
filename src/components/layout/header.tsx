import { LanguageSelector } from '../language';

import { cn } from '@/lib/utils';

//
//
//

const Header = () => {
  return (
    <header className={cn('flex h-16 items-center justify-end px-4')}>
      <LanguageSelector />
    </header>
  );
};

export default Header;
