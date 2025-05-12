import { cn } from '@/lib/utils';

//
//
//

interface ComplaintAskLayoutProps {
  children: React.ReactNode;
}

//
//
//

export default function ComplaintAskLayout({
  children,
}: ComplaintAskLayoutProps) {
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
