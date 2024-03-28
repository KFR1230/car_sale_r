'use client';
import { Dialog } from '@headlessui/react';
import { ChevronLeft, X } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import SwiperSlider from './SwiperSlider';

interface ImagesProps {
  productArray: {
    url: string;
    id: string;
  }[];
}

const ModalImageSwiper = (props: ImagesProps) => {
  const [currentIndex, setCurrentIndex] = useState<number>(1);
  const { productArray } = props;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.get('modal');
  const index = searchParams.get('index');
  const clickId = searchParams.get('search');

  const handlerModalClose = () => {
    // router.push(
    //   pathname + '?' + 'modal=' + 'PHOTO_SCROLL' + '&' + 'index=' + index
    // );
    router.back();
  };
  const handlerChangeCurrentIndex = (index: number) => {
    setCurrentIndex(index);
  };
  const isLoaded = search === 'PHOTO_SCROLL' && clickId ? true : false;

  return (
    <Dialog
      open={isLoaded}
      onClose={handlerModalClose}
      className=" w-full h-full fixed top-0 left-0 z-50"
    >
      <Dialog.Panel className="relative flex flex-col w-full h-full bg-zinc-900 animate-accordion-up origin-bottom justify-center items-center">
        <nav className="sticky top-0 left-0 w-full bg-black z-50">
          <div className="border-b-2 border-white/55">
            <div className="w-full h-12 py-2 px-4 flex items-center justify-between bg-zinc-900">
              <div
                onClick={(e) => {
                  e.stopPropagation();

                  handlerModalClose();
                }}
                className="hidden  md:flex cursor-pointer relative before:content-[''] before:absolute before:w-8 before:h-8 before:-top-2 before:-left-2 before:hover:bg-slate-500/75 before:rounded-lg "
              >
                <X
                  width={25}
                  height={25}
                  className="relative z-10 text-zinc-300 "
                />
              </div>
              <div
                onClick={(e) => {
                  e.stopPropagation();

                  handlerModalClose();
                }}
                className="flex md:hidden cursor-pointer relative before:content-[''] before:absolute before:w-8 before:h-8 before:-top-2 before:-left-2 before:hover:bg-slate-500/75 before:rounded-full "
              >
                <ChevronLeft
                  width={25}
                  height={25}
                  className="relative z-10 text-zinc-300 md:hidden"
                />
              </div>

              <div className="text-sm -tracking-tighter text-zinc-300">
                {currentIndex}
                <span>/</span>
                {productArray?.length}
              </div>
            </div>
          </div>
        </nav>
        <div className="opacity-0 w-full flex-1 py-6 px-4 md:px-8 relative animate-show-content transition-all  overflow-auto">
          <SwiperSlider
            productArray={productArray}
            clickId={clickId}
            onChange={handlerChangeCurrentIndex}
          />
        </div>
      </Dialog.Panel>
    </Dialog>
  );
};

export default ModalImageSwiper;
