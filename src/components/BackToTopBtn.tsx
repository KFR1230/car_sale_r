'use client';

import { ChevronUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from '../lib/utils';

const BackToTopBtn = () => {
  const [hasShow, setHasShow] = useState<boolean>(false);
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  function handlerBtnShow() {
    if (window.scrollY > 500) {
      setHasShow(true);
    } else {
      setHasShow(false);
    }
  }
  useEffect(() => {
    document.addEventListener('scroll', handlerBtnShow);
    return () => {
      document.removeEventListener('scroll', handlerBtnShow);
    };
  }, []);

  return (
    <div
      className={cn(
        'ease-in-out duration-300 fixed right-4 bottom-12 z-50 opacity-0',
        {
          'opacity-100 ': hasShow,
        }
      )}
    >
      <div
        className="relative grid place-content-center rounded-full h-6 w-6 bg-gray-300/60 cursor-pointer before:absolute before:content-[''] before:h-6 before:w-6 before:bg-gray-500/80 before:rounded-full before:hover:top-[0.15rem] before:hover:left-[0.15rem] before:-z-10 before:top-0 before:left-0 before:active:top-0 before:active:left-0 before:opacity-25 before:hover:opacity-100 before:transition-all before:duration-300 before:ease-in-out "
        onClick={() => scrollToTop()}
      >
        <ChevronUp size={16} strokeWidth={2.75} />
      </div>
    </div>
  );
};

export default BackToTopBtn;
