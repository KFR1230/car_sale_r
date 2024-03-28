import { cn } from '@/src/lib/utils';
import { ReactNode } from 'react';

const MaxWidthWrapper = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <>
      <div className={cn('w-full mx-auto px-2.5 md:px-12', className)}>
        {children}
      </div>
    </>
  );
};

export default MaxWidthWrapper;
