import { LanguagePopoverSelector } from '../language';

import { cn } from '@/lib/utils';

//
//
//

const Header = () => {
  return (
    <header
      className={cn(
        'mx-auto flex h-16 w-full max-w-5xl items-center justify-end px-4'
      )}
    >
      <LanguagePopoverSelector />
    </header>
  );
};

export default Header;
