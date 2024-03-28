'use client';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { PuffLoader } from 'react-spinners';
import { cn } from '../lib/utils';
import CarSmallFilterInfo from './CarSmallFilterInfo';
import CarSmallFilterInfoList from './CarSmallFilterInfoList';
import EndSection from './EndSection';
import { useLayout } from './hooks/useLayout';
import { useProducts } from './hooks/useProducts';
import SkeletonCard from './skeleton/SkeletonCard';
import SkeletonCardList from './skeleton/SkeletonCardList';
import { Separator } from './ui/separator';

//cookie 只能在伺服器端修改

const FilterProducts = (props: {
  filterType: object[] | null;
  tagsArray: object[] | null;
  status: string | null;
}) => {
  const { filterType, tagsArray, status } = props;
  const [isEndOfSection, setIsEndOfSection] = useState<boolean>(false);
  const pathname = usePathname();
  const {
    firstRound,
    products,
    isLoading,
    hasNextPage,
    nextPage,
    updateFilter,
    filterArray,
    firstRender,
    sortOption,
    setNewProducts,
    updateNewProducts,
    setDefaultValueTags,
    setFirstRound,
    setIsLoading,
  } = useProducts();

  const { currentLayout } = useLayout();
  const getProductsArray = useCallback(
    async (options: object[]) => {
      // 整理成要發送api的參數
      const searchPayload = status
        ? {
            where: {
              and: [...options],
            },
          }
        : {
            where: {
              and: [
                ...options,
                {
                  status: {
                    equals: 'sell',
                  },
                },
              ],
            },
          };

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/sibling-products`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application / json = charset = uft-8',
            },
            body: JSON.stringify({
              searchPayload: searchPayload,
              limit: filterArray.length === 0 ? 8 : 0,
              cursor: null,
              sortOption: sortOption,
            }),
          }
        );
        const data = await res.json();
        // console.log(
        //   'firestRound',
        //   data.products,
        //   data.hasNextPage,
        //   data.nextPage
        // );
        setNewProducts(data.products, data.hasNextPage, data.nextPage);
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filterArray, status, nextPage]
  );
  const updateProductsArray = async () => {
    const searchPayload = status
      ? {
          where: {
            and: [],
          },
        }
      : {
          where: {
            and: [
              {
                status: {
                  equals: 'sell',
                },
              },
            ],
          },
        };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/sibling-products`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application / json = charset = uft-8',
          },
          body: JSON.stringify({
            searchPayload: searchPayload,
            cursor: nextPage,
            limit: 8,
            sortOption: sortOption,
          }),
        }
      );
      const data = await res.json();
      // console.log('secondRound', data.hasNextPage, data.nextPage);
      updateNewProducts(data.products, data.hasNextPage, data.nextPage);
      return data;
    } catch (err) {
      console.log(err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  //擺在這裡有點奇怪，因為這是跟篩選block有關
  useEffect(() => {
    // addFilter({ Car_Color: { equals: 'red' } });
    //第一次執行會根據傳進來的篩選條件，來發出取得資料的api，
    //並且存入於zustand中
    setIsLoading(true);
    if (filterType?.length && tagsArray?.length) {
      firstRender(filterType, tagsArray, []);
    }
    getProductsArray(filterType ? filterType : []);
    setFirstRound();
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!firstRound) return;
    setIsLoading(true);
    getProductsArray(filterArray);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterArray, status, sortOption]);
  // console.log('filterType', filterType);
  // console.log('getProducts', products, hasNextPage, nextPage);
  useEffect(() => {
    if (!firstRound) return;
    if (filterArray.length > 0) return;
    if (isEndOfSection) {
      updateProductsArray();
    }
  }, [isEndOfSection]);

  return (
    <>
      {isLoading && (
        <div className="">
          <PuffLoader color="#999999" loading size={30} speedMultiplier={1} />
        </div>
      )}
      {/* Loading 後 */}
      {currentLayout === 'Card' && (
        <div
          className={cn(
            'relative w-full px-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-3 grid opacity-100 transition-opacity duration-100 ease-out',
            { 'hidden opacity-0': isLoading }
          )}
        >
          {products?.map((p, i) => {
            return (
              <CarSmallFilterInfo product={p} key={`FilterProducts_${p.id}`} />
            );
          })}
          {hasNextPage && (
            <EndSection
              setIsEndOfSection={setIsEndOfSection}
              hasNextPage={hasNextPage}
              isLoading={isLoading}
            />
          )}
        </div>
      )}
      {currentLayout === 'List' && (
        <div
          className={cn(
            'relative w-full grid-cols-1 lg:grid-cols-2 gap-4 grid opacity-100 transition-opacity duration-100 ease-out',
            { 'hidden opacity-0': isLoading }
          )}
        >
          {products?.map((p, i) => {
            return (
              <CarSmallFilterInfoList
                product={p}
                key={`FilterProductsList_${p.id}`}
              />
            );
          })}
          {hasNextPage && (
            <EndSection
              setIsEndOfSection={setIsEndOfSection}
              hasNextPage={hasNextPage}
              isLoading={isLoading}
            />
          )}
        </div>
      )}
      {/* firstRound 不是那麼直觀，true表示不是第一次render */}
      {firstRound &&
        !isLoading &&
        products?.length !== 0 &&
        filterArray.length === 0 && (
          <div className="relative flex h-[1px] w-full after:content-['底'] after:absolute after:px-2 after:bg-[#E0E0E0] after:text-[12px] after:text-gray-500 after:-bottom-[50%] after:translate-y-[50%] after:left-2 mt-2">
            {' '}
            <Separator className="bg-gray-400 w-full" />
          </div>
        )}
      {/* Loading 前 */}
      {isLoading && currentLayout === 'Card' && (
        <div className="relative w-full px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-3">
          {Array(products?.length)
            .fill(null)
            .map((_, i) => (
              <SkeletonCard key={`FilterSkeleton_${i}`} />
            ))}
        </div>
      )}

      {isLoading && currentLayout === 'List' && (
        <div className=" w-full grid-cols-1 lg:grid-cols-2 gap-4 grid ">
          {Array(products?.length)
            .fill(null)
            .map((_, i) => (
              <SkeletonCardList key={`FilterSkeletonList_${i}`} />
            ))}
        </div>
      )}
    </>
  );
};

export default FilterProducts;
