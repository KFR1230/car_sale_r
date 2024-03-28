'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useRef } from 'react';
import { ChevronLeft } from 'lucide-react';
import Image from 'next/image';

interface DialogProps {
  productArray: object[];
}

interface ImagesProps {
  productArray: {
    url: string;
    id: string;
  }[];
}

const ModalImageScroll = (props: ImagesProps) => {
  const { productArray } = props;
  const router = useRouter();
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement | null>(null);
  const searchParams = useSearchParams();
  const index = searchParams.get('index');
  const search = searchParams.get('modal');
  const handlerModalClose = () => {
    router.push(pathname);
  };
  const handlerImageClick: React.ComponentProps<'img'>['onClick'] = (
    event: React.SyntheticEvent<EventTarget>
  ) => {
    if (!(event.target instanceof HTMLImageElement)) return;
    router.push(
      pathname +
        '?' +
        'modal=' +
        'PHOTO_SCROLL' +
        '&' +
        'index=' +
        index +
        '&' +
        'search=' +
        event.target.dataset.id
    );
  };

  useEffect(() => {
    const slider = ref?.current;
    if (!slider) return;
    if (!index) return;
    const element = slider.querySelectorAll('li')[Number(index)];
    document.body.classList.add('overflow-hidden');
    if (element) {
      const walkY = element.offsetTop - slider.offsetTop;
      // 這裡想要做到點擊圖片後，移動至該圖片，但是overflow在body，沒辦法再跳出視窗調整//弔詭的是之前可以現在不行，而之前不行現在又可以？？
      slider.scrollTo(0, walkY);
    }
    //'clean function';
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [index]);

  return (
    <>
      {search === 'PHOTO_SCROLL' && (
        <div className="h-full w-full fixed top-0 left-0 z-50 ">
          <div className="relative flex flex-col w-full h-full bg-white animate-accordion-up origin-bottom ">
            <nav className="sticky top-0 left-0 w-full bg-black z-50">
              <div className="border-b-2 border-zinc-00">
                <div className="w-full h-12 py-2 px-4 flex items-center justify-between bg-white">
                  <div
                    onClick={handlerModalClose}
                    className="flex cursor-pointer relative before:content-[''] before:absolute before:w-8 before:h-8 before:-top-2 before:-left-2 before:hover:bg-slate-100/75 before:rounded-full"
                  >
                    <ChevronLeft
                      width={25}
                      height={25}
                      className="relative z-10 text-zinc-800 "
                    />
                  </div>
                </div>
              </div>
            </nav>
            <div
              className="opacity-0 w-full flex-1 py-6 px-4 relative animate-show-content transition-all overflow-auto"
              ref={ref}
            >
              <ul className=" w-full md:w-[50%] aspect-[4/3]  flex flex-col gap-4 md:mx-auto ">
                {productArray?.map((item, index) => (
                  <li
                    className="w-full h-full relative shrink-0 rounded-lg cursor-pointer"
                    key={item.id}
                  >
                    <Image
                      src={
                        item.url ? item.url : '/status/default-placeholder.png'
                      }
                      alt="product-Image"
                      fill
                      data-id={item.id}
                      className="rounded-lg object-cover object-center"
                      onClick={handlerImageClick}
                      sizes="(min-width:768px) 85vw,700px"
                    />
                  </li>
                ))}
                <hr />
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalImageScroll;
