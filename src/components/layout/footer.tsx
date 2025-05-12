import { cn } from '@/lib/utils';

//
//
//

const Footer = () => {
  return (
    <footer
      className={cn(
        'mx-auto flex h-12 w-full max-w-5xl items-center px-4 font-light text-gray-400'
      )}
    >
      © {new Date().getFullYear()} 민원잇다
    </footer>
  );
};

export default Footer;
