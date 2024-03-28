'use client';

import { Swiper, SwiperSlide, SwiperRef } from 'swiper/react';
import SwiperCore from 'swiper';
import { useEffect, useRef, useState } from 'react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import Image from 'next/image';
interface swiperProps {
  productArray: {
    url: string;
    id: string;
  }[];
  clickId: string | null;
  onChange: (index: number) => void;
}

const SwiperSlider = (props: swiperProps) => {
  const { productArray, clickId, onChange } = props;
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore>();
  const swiperRef = useRef<SwiperRef>() as any;
  /*
  ** 
   1. 取得在上一頁的位置，紀錄在網址中，並在useEffect中取得項次號，讓swiper 移動該項次號位置
   2. 讓swiper監聽每一次transition後的位置，取得activeIndex，讓父層的nav 頁數變更
  
  */

  useEffect(() => {
    //realIndex: active Index
    //slideTo(number) move to Index position
    const index =
      productArray.findIndex((product) => product.id === clickId) || 0;

    const swiper: SwiperCore = swiperRef.current?.swiper;

    swiper.slideTo(index);
    onChange?.(1);
    swiper.on('transitionEnd', function () {
      let activeIndex = swiper.activeIndex;
      onChange?.(++activeIndex);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Swiper
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="transition-all aspect-video mb-3 lg:w-[70%]"
        ref={swiperRef}
      >
        {productArray.map((product, index) => {
          return (
            <SwiperSlide key={product.id} className="relative">
              <Image
                src={product.url}
                alt="product_image"
                loading="eager"
                fill
                className="object-contain"
                sizes="(min-width:768px) 85vw,700px"
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={8}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="transition-all w-[80%] md:w-[60%] "
      >
        {productArray.map((product, index) => {
          return (
            <SwiperSlide key={product.id} className="relative aspect-square">
              <Image
                src={product.url}
                className="object-cover"
                loading="eager"
                fill
                alt="product_img"
                sizes="(max-width:768px) 100vw,700px"
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default SwiperSlider;
