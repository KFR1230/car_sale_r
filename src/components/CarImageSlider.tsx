'use client';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

interface ImagesProps {
  productArray: {
    url: string;
    id: string;
  }[];
}

const CarImageSlider = ({ productArray }: ImagesProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const handlerClickImage: React.ComponentProps<'li'>['onClick'] = (
    e: React.SyntheticEvent<EventTarget>
  ) => {
    if (!(e.target instanceof HTMLLIElement)) return;
    router.push(
      pathname +
        '?' +
        'modal=' +
        'PHOTO_SCROLL' +
        '&' +
        'index=' +
        e.target.dataset.index
    );
  };

  return (
    <picture>
      <ul className="w-full h-full relative overflow-auto flex item-center rounded-lg snap-mandatory snap-x">
        {productArray?.map((item, index) => (
          <li
            className="w-full h-full relative shrink-0 snap-center before:content-[''] before:rounded-l-lg before:absolute before:inset-0 before:w-full before:h-full before:hover:bg-slate-700/30 before:z-40 cursor-pointer before:transition-all"
            key={item.id}
            onClick={handlerClickImage}
            data-index={index}
          >
            <Image
              src={item.url ? item.url : '/status/default-placeholder.png'}
              alt="product-Image"
              fill
              priority
              className="object-cover object-center"
              id={item.id}
              sizes="(min-width:768px) 85vw,700px"
            />
          </li>
        ))}
      </ul>

      {/* <div className="bg-zinc-800/50 text-white text-[14px] tracking-[0.25em] absolute right-4 bottom-2 px-4 py-1 rounded-sm">
        {' '}
        1 / {validUrls.length}
      </div> */}
    </picture>
  );
};

export default CarImageSlider;
