'use client';
import { Grip, PanelTopClose, Rows3 } from 'lucide-react';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface ImagesProps {
  productArray: {
    url: string;
    id: string;
  }[];
}

const CarImageCombination = ({ productArray }: ImagesProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.get('modal');
  const newArray = productArray.slice(1, 5);

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
  const handlerClickButton: React.ComponentProps<'div'>['onClick'] = (e) => {
    router.push(
      pathname + '?' + 'modal=' + 'PHOTO_SCROLL' + '&' + 'index=' + 0
    );
  };

  return (
    <>
      <div
        className="absolute bottom-2 right-4 w-[200px] h-6 bg-zinc-300 z-40 flex items-center justify-center p-4 cursor-pointer active:bg-zinc-400 rounded-sm group"
        onClick={handlerClickButton}
      >
        <PanelTopClose className="w-3 mr-2 text-slate-700 group-hover:animate-bounce" />
        <span className="text-[0.8rem]">顯示全部圖片</span>
      </div>
      <picture className="w-full h-full">
        <ul className="rounded-ul z-20 w-full h-full md:grid grid-cols-8 grid-rows-4 relative flex item-center gap-2 ">
          <li
            className="w-full h-full relative transition-all before:transition-all col-start-1 col-span-4 row-span-4 before:content-[''] before:rounded-l-lg before:absolute before:inset-0 before:w-full before:h-full before:hover:bg-slate-700/30 before:z-40 cursor-pointer"
            onClick={handlerClickImage}
            data-index={0}
          >
            <Image
              src={
                productArray[0].url
                  ? productArray[0].url
                  : '/status/default-placeholder.png'
              }
              alt="product-Image"
              fill
              priority
              className="object-cover  rounded-l-lg "
              id={productArray[0].id}
              sizes="(min-width:768px) 85vw,700px"
            />
          </li>
          {newArray?.map((item, index) => {
            return (
              <li
                className="w-full h-full transition-all before:transition-all relative col-span-2 row-span-2 before:content-[''] before:rounded-l-lg before:absolute before:inset-0 before:w-full before:h-full before:hover:bg-slate-700/30 before:z-40 cursor-pointer"
                key={item.id}
                data-index={++index}
                onClick={handlerClickImage}
              >
                <Image
                  src={item.url}
                  alt="product-Image"
                  fill
                  priority
                  className="object-cover "
                  id={item.id}
                  sizes="(min-width:768px) 85vw,700px"
                />
              </li>
            );
          })}
        </ul>
      </picture>
    </>
  );
};

export default CarImageCombination;
