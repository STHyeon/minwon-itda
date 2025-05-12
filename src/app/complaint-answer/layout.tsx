import { cn } from '@/lib/utils';

//
//
//

interface ComplaintAnswerLayoutProps {
  children: React.ReactNode;
}

//
//
//

export default function ComplaintAnswerLayout({
  children,
}: ComplaintAnswerLayoutProps) {
  return (
    <div
      className={cn(
        'mx-auto flex w-full max-w-5xl flex-col items-center justify-center gap-12 pt-14'
      )}
    >
      {children}
    </div>
  );
}
