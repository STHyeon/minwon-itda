import { cn } from '@/utils/cn';

const Home: React.FC = () => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center max-w-5xl w-full min-h-dvh mx-auto'
      )}
    >
      <div className={cn('flex items-center gap-6')}>
        <div>이미지</div>
        <div className={cn('flex flex-col gap-2')}>
          <h1 className={cn('font-bold text-5xl')}>title</h1>

          <div className={cn('flex flex-col gap-2 max-w-96 w-full')}>
            <div className={cn('text-gray-500')}>description</div>
            <button
              className={cn('bg-blue-500 text-white px-4 py-2 rounded-md')}
            >
              버튼
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
