'use client';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import SwiperCore from 'swiper';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

const BannerSlider = ({ validBannerUrl }: { validBannerUrl: string[] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperRef>() as any;
  const pagination = {
    clickable: true,
    renderBullet: (_: any, className: any) => {
      return `<span class='transition ${className}'></span>`;
    },
  };
  useEffect(() => {
    const swiper: SwiperCore = swiperRef.current?.swiper;
    swiper.on('transitionEnd', () => {
      setActiveIndex(swiper.activeIndex);
    });
  }, []);

  return (
    <>
      <div className="hidden sm:flex absolute inset-0 -z-10">
        <Image
          src={validBannerUrl[activeIndex]}
          alt=""
          aria-hidden={true}
          fill
          className="object-cover object-center -z-10"
          sizes="(max-width:768px) 100vw,700px"
        />
      </div>
      <div className="relative overflow-hidden aspect-[16/9] w-full sm:w-2/3 sm:aspect-[368/250] shadow-banner">
        <Swiper
          pagination={pagination}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          modules={[Pagination, Autoplay]}
          className="w-full h-full sm:rounded-sm sm:rounded-r-none"
          ref={swiperRef}
        >
          {validBannerUrl?.map((url, index) => {
            if (!url) return;
            return (
              <SwiperSlide className="h-full w-full" key={index}>
                <Image
                  src={url ? url : '/status/default-placeholder.png'}
                  fill
                  priority
                  alt="banner image"
                  className="h-full w-full object-cover object-center"
                  sizes="(min-width:768px) 85vw,700px"
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </>
  );
};

export default BannerSlider;

{
  /* <div className="w-full h-full absolute top-0 left-0 z-10 grid place-content-center text-clamp-title font-black bg-white bg-clip-text text-transparent">
        <span className="uppercase">easy drive</span>
      </div>
      <div className="mouse ">
        <span></span>
      </div> */
}

// before:content-['SAAB'] before:absolute before:bg-white before:w-full before:h-full before:grid before:place-content-center before:text-[10rem] before:font-black before:text-transparent before:bg-clip-text

<div className="relative w-full h-full object-cover object-center">
  {/* <Image
          src={validUrl ? validUrl : ''}
          alt="banner_Image"
          loading="eager"
          className="w-full h-full"
          fill
        /> */}
</div>;
{
  /* <div className="absolute w-full h-full top-0 left-0 flex justify-start items-center px-6 ">
        <div className="grid place-content-center w-1/2 aspect-square text-white ">
          <p className="relative font-extrabold text-title-clamp bg-gradient-to-r from-orange-900/30 to-rose-500/30 p-2 rounded-sm backdrop-blur-md before:content-['123']  before:absolute before:top-3 before:left-3 before:text-slate-500/70 before:-z-10">
            123
          </p>
        </div>
      </div> */
}
