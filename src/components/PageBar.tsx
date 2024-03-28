'use client';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';
import MaxWidthWrapper from './MaxWidthWrapper';

interface pageProps {
  pageName: string | null | undefined;
  children?: ReactNode;
}
const PageBar = ({ children, pageName }: pageProps) => {
  const router = useRouter();

  return (
    <div className="w-full py-2 bg-neutral-400/50">
      <MaxWidthWrapper>
        <div className="w-full flex justify-between text-[0.625rem] text-slate-700/50 ">
          <div className="w-full flex space-x-4 ">
            <span
              className="whitespace-nowrap cursor-pointer underline-offset-4 hover:underline"
              onClick={() => router.push('/')}
            >
              首頁
            </span>
            <span>&gt;</span>
            <span className="line-clamp-1 w-3/4">{pageName}</span>
          </div>
          {children}
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default PageBar;
