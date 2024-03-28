import { SetStateAction, Dispatch, useEffect, useState } from 'react';
import { PuffLoader } from 'react-spinners';
import useIntersectionObserver from './hooks/useIntersectionObserver';

interface IProps {
  setIsEndOfSection: Dispatch<SetStateAction<boolean>>;
  hasNextPage: boolean | null;
  isLoading: boolean;
}

const EndSection = ({ setIsEndOfSection, hasNextPage, isLoading }: IProps) => {
  const [isIntersecting, ref] = useIntersectionObserver();

  useEffect(() => {
    if (isIntersecting) {
      setIsEndOfSection(true);
    } else {
      setIsEndOfSection(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasNextPage, isIntersecting]);

  return (
    <div ref={ref}>
      {isLoading ? (
        <div>
          {isLoading && (
            <div className="">
              <PuffLoader
                color="#999999"
                loading
                size={30}
                speedMultiplier={1}
              />
            </div>
          )}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default EndSection;
