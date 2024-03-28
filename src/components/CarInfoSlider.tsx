'use client';
import { useEffect, useRef, useState } from 'react';
import { boolean } from 'zod';
import { cn } from '../lib/utils';
import { Product } from '../payload-type';
import CarSmallInfo from './CarSmallInfo';
import EndSection from './EndSection';
import SkeletonSliderCard from './skeleton/SkeletonSliderCard';
import { Separator } from './ui/separator';

interface saleCategoryProps {
  title: string;
  subTitle: string;
  condition: object[];
  status: string | null;
}

//首頁記錄著不同的Slider, 每個Slider應該要自行發送req，根據滑動選擇取用的量，形成無限滑動
const CarInfoSlider = (props: saleCategoryProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDown, setIsDown] = useState<boolean>(false);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [cursor, setCursor] = useState<number>(1);
  const [hasNextPage, setHasNextPage] = useState<boolean | null>(true);
  const [isEndOfSection, setIsEndOfSection] = useState<boolean>(false);
  const limit = 4;
  const { title, subTitle, condition, status } = props;
  // 整理成要發送api的參數
  // const array = condition.map((obj) => {
  //   return {
  //     [Object.keys(obj)[0]]: {
  //       equals: [Object.values(obj)[0]],
  //     },
  //   };
  // });
  //if have user  get all products
  const searchPayload = status
    ? {
        where: {
          is_onSale: {
            equals: true,
          },
        },
      }
    : {
        where: {
          is_onSale: {
            equals: true,
          },
          status: {
            equals: 'sell',
          },
        },
      };

  const realRef = useRef({
    startX: 0, //初始事件點擊位置
    startY: 0,
    scrollLeft: 0, //滑軌初始距離
    scrollTop: 0,
  });

  const handlerDragStart: React.ComponentProps<'div'>['onMouseDown'] = (e) => {
    e.preventDefault();

    if (!sliderRef) return;
    //抓到目前點擊的位置
    //計算出實際滑軌要移動的距離
    const slider = sliderRef.current;
    const startX = e.pageX - (slider?.offsetLeft || 0);
    const startY = e.pageY - (slider?.offsetTop || 0);
    //此時滑軌距離
    const scrollLeft = slider?.scrollLeft;
    const scrollTop = slider?.scrollTop;

    realRef.current = {
      startX: startX,
      startY: startY,
      scrollLeft: scrollLeft || 0,
      scrollTop: scrollTop || 0,
    };
    setIsDown(true);
    //TS 必須要先確認slider 存在
    if (slider) {
      slider.style.cursor = 'grabbing';
    }
    // slider?.classList.remove('cursor-grab');
    // slider?.classList.add('cursor-grabbing');
  };

  const handlerMouseUp: React.ComponentProps<'div'>['onMouseDown'] = (e) => {
    e.preventDefault();
    setIsDown(false);
    const slider = sliderRef.current;
    if (slider) {
      slider.style.cursor = 'default';
    }
  };

  const handlerMouseMove: React.ComponentProps<'div'>['onMouseMove'] = (e) => {
    e.preventDefault();

    if (!isDown) return;
    if (!sliderRef) return;
    //e.preventDefault() 有加有差，會避免觸發到拖移到其他行為，比如圖片、底部，防止默認行為。

    const slider = sliderRef.current;
    const startX = e.pageX - (slider?.offsetLeft || 0);
    const startY = e.pageY - (slider?.offsetTop || 0);
    const walkX = (startX - realRef.current.startX) * 2;
    const walkY = startY - realRef.current.startY;
    // * 3 增加滑動值
    if (slider) {
      slider.scrollLeft = realRef.current.scrollLeft - walkX;
      slider.scrollTop = realRef.current.scrollTop - walkY;
    }
  };
  const getProductReel = async () => {
    setIsLoading(true);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/sibling-products`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application / json; charset = utf-8',
        },
        body: JSON.stringify({ searchPayload, cursor, limit }),
      }
    );
    const data = await res.json();

    setProducts([...products, ...data.products]);
    setCursor(data.nextPage);
    setHasNextPage(data.hasNextPage);
  };
  //發送api取得資料，status, cursor, limit
  //需要什麼資料，products array, nextPage, hasNextPage, isLoading
  //要用什麼方式紀錄
  useEffect(() => {
    getProductReel();
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  useEffect(() => {
    if (hasNextPage && isEndOfSection) {
      getProductReel();
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasNextPage, isEndOfSection]);

  return (
    <section className="mt-4 pb-4 w-full border-b-2 border-gray-400">
      <div className="flex flex-col w-full items-start px-4 ">
        <h2 className="text-title-clamp font-extrabold tracking-tight title-shadow">
          {subTitle}
        </h2>
        <p className="text-subTitle-clamp font-medium text-zinc-500/85">
          {' '}
          {title}
        </p>
        {/* <span className="ml-2">&#8213;&#8213;&#8213;</span> */}
      </div>
      <div className="relative px-4">
        <div
          className="w-full flex items-start gap-4 p-4 overflow-x-auto snap-mandatory snap-x"
          ref={sliderRef}
          onMouseDown={handlerDragStart}
          onMouseUp={handlerMouseUp}
          onMouseMove={handlerMouseMove}
          onMouseLeave={handlerMouseUp}
        >
          {!isLoading && (
            <>
              {products.map((p, i) => {
                return <CarSmallInfo product={p} key={`CarSmallInfo_${i}`} />;
              })}
              {hasNextPage && (
                <EndSection
                  setIsEndOfSection={setIsEndOfSection}
                  hasNextPage={hasNextPage}
                  isLoading={isLoading}
                />
              )}
            </>
          )}
          {products.length !== 0 && (
            <div
              className={cn(
                "relative flex h-[200px] w-[1px] after:content-['底'] after:absolute after:top-2 after:-right-[50%] after:translate-x-[50%] after:py-2 after:bg-[#E0E0E0] after:text-[12px] after:text-gray-500",
                { hidden: isLoading }
              )}
            >
              {' '}
              <Separator orientation="vertical" className="bg-gray-400" />
            </div>
          )}

          {isLoading &&
            Array(products?.length)
              .fill(null)
              .map((_, i) => <SkeletonSliderCard key={`carInfoSlider_${i}`} />)}
        </div>
      </div>
    </section>
  );
};

export default CarInfoSlider;
