import React, { useEffect, useRef, useState } from 'react';

const useIntersectionObserver = (
  threshold = 0
): [boolean, React.RefObject<HTMLDivElement>] => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasRendered, setHasRendered] = useState(false);
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observe = new IntersectionObserver(
      ([entry]) => {
        //是否已經進入了觀察點
        setIsIntersecting(entry.isIntersecting);
        if (entry.isIntersecting && !hasRendered) {
          if (count > 1) setHasRendered(true);
          else setCount((prev) => ++prev);
        }
      },
      { threshold }
    );
    //確認是否有監聽的值了
    const element = ref.current;
    if (element) {
      observe.observe(element);
    }
    return () => {
      if (element) {
        observe.unobserve(element);
      }
    };
  }, [threshold, hasRendered, count]);

  return [isIntersecting, ref];
};

export default useIntersectionObserver;
