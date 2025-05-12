import { HeroCards, HeroSection } from '@/components/landing';
import { Footer } from '@/components/layout';
import { cn } from '@/lib/utils';

//
//
//

const Home = () => {
  return (
    <div
      className={cn(
        'mx-auto flex w-full flex-1 flex-col items-center justify-center gap-20'
      )}
    >
      <div
        className={cn(
          'flex w-full max-w-5xl flex-1 flex-col justify-center gap-20 px-4'
        )}
      >
        <HeroSection />
        <HeroCards />
      </div>

      <div className={cn('w-full')}>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
