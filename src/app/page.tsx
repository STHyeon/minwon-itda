import { HeroCards, HeroSection } from '@/components';
import { cn } from '@/lib/utils';

//
//
//

const Home = () => {
  return (
    <div
      className={cn(
        'mx-auto flex min-h-dvh w-full max-w-5xl flex-col items-center justify-center gap-20 px-4'
      )}
    >
      <HeroSection />
      <HeroCards />
    </div>
  );
};

export default Home;
