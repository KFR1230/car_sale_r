'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { PuffLoader } from 'react-spinners';
import { cn } from '../lib/utils';

const PageWrap = () => {
  const [previousPath, setPreviousPath] = useState<string>('');
  const pathname = usePathname();
  const isSamePath = pathname === previousPath;
  useEffect(() => {
    if (document.readyState !== 'complete') {
      const handler = () => {
        setPreviousPath(pathname);
      };
      window.addEventListener('load', handler);
      return () => {
        window.removeEventListener('load', handler);
      };
    } else {
      const timer = window.setTimeout(() => {
        setPreviousPath(pathname);
      }, 300);
      return () => {
        window.clearTimeout(timer);
      };
    }
  }, [pathname]);

  return (
    <div className="w-full h-full">
      {!isSamePath && (
        <div className="transition-all duration-500 ease-in-out fixed w-full h-full z-[999] opacity-100 bg-green-50 grid place-content-center">
          <div className="">
            <PuffLoader color="#999999" loading size={50} speedMultiplier={1} />
          </div>
        </div>
      )}
      <div
        className={cn(
          'transition-all duration-500 ease-in-out fixed w-full h-full z-[999] opacity-100 bg-green-50 grid place-content-center',
          { 'opacity-0 -z-10': isSamePath }
        )}
      >
        <div className="">
          <PuffLoader color="#999999" loading size={50} speedMultiplier={1} />
        </div>
      </div>
    </div>
  );
};

export default PageWrap;

// useEffect(() => {
//   setIsWrap(true);
//   if (document.readyState !== 'complete') {
//     const handler = () => {
//       console.log('load');
//       setIsWrap(false);
//     };
//     window.addEventListener('load', handler);

//     return () => {
//       window.removeEventListener('load', handler);
//     };
//   } else {
//     const timeout = window.setTimeout(() => {
//       console.log('timeout');
//       setIsWrap(false);
//     }, 1000);
//     return () => window.clearTimeout(timeout);
//   }
// }, [pathname]);
