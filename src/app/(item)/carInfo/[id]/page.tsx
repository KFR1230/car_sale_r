import CarImageCombination from '@/src/components/CarImageCombination';
import CarImageSlider from '@/src/components/CarImageSlider';
import MaxWidthWrapper from '@/src/components/MaxWidthWrapper';
import ModalImageScroll from '@/src/components/ModalImageScroll';
import ModalImageSwiper from '@/src/components/ModalImageSwiper';
import { cn, formatKilo, formatPrice } from '@/src/lib/utils';
import { getUserPayload } from '@/src/getUserPayload';
import ProductTags from '@/src/components/ProductTags';
import { Car_Transmission } from '@/src/config';
import RemarkComponent from '@/src/components/RemarkComponent';
import PageBar from '@/src/components/PageBar';
import { cookies } from 'next/headers';
import { getServerSideUser } from '@/src/lib/payload-utilis';
import ShareOptions from '@/src/components/ShareOptions';
import { Car_Color, Car_Fuel } from '../../../../config/filterIndex';

interface PageProps {
  params: {
    id: string;
  };
}

const page = async ({ params }: PageProps) => {
  const { id } = params;
  const nextCookie = cookies();
  const { user } = await getServerSideUser(nextCookie);
  const payload = await getUserPayload();
  const { docs: Products } = await payload.find({
    collection: 'Products',
    limit: 1,
    where: user
      ? {
          id: {
            equals: id,
          },
        }
      : ({
          id: {
            equals: id,
          },
          status: {
            equals: 'sell',
          },
        } as any),
  });

  const [Product] = Products;
  const productArray = Product?.images
    .map(({ car_picture, id }) => {
      const url =
        typeof car_picture === 'string' ? car_picture : car_picture.url;
      return { url, id };
    })
    .filter(Boolean) as {
    url: string;
    id: string;
  }[];

  const validRemarkArray = Product?.Car_OtherInfo?.map((remark) => {
    if (!remark) return;
    return remark;
  });
  const color = Car_Color.filter(
    (option) => option.equals === Product?.Car_Color
  )[0].value;
  const fuel = Car_Fuel.filter(
    (option) => option.equals === Product?.Engin_fuel
  )[0].value;
  return (
    <>
      <ModalImageSwiper productArray={productArray} />
      {/* current route info */}
      <PageBar pageName={Product?.Car_Name}>
        <ShareOptions />
      </PageBar>
      {/* product content */}
      <MaxWidthWrapper>
        <div className="relative flex flex-col items-center py-6">
          {/* product */}
          {/* Image */}
          <section className="w-full relative flex items-start">
            <div className="md:hidden w-full aspect-[5/3] relative rounded-xl ">
              {/* Image Slider media */}
              <CarImageSlider productArray={productArray} />
            </div>
            {/* Image Combiner laptop */}
            <div className="hidden relative md:flex  w-full md:aspect-[16/8] lg:aspect-[16/6] z-10">
              <CarImageCombination productArray={productArray} />
            </div>
          </section>

          {/* Text */}
          <section className="py-2 w-full relative ">
            <h1 className="font-bold text-lg sm:text-text-clamp">
              {Product?.Car_Name}
            </h1>
            {/* Tags */}
            <div className="w-full p-2 relative mt-2">
              <ProductTags Product={Product} />
            </div>
            {/* Info */}
            <div className="mt-2 relative w-full flex flex-col items-center justify-center">
              {/* first Info */}
              <div className="flex">
                {' '}
                <div className="p-2  flex flex-wrap gap-2">
                  <div className="flex justify-start items-center rounded shrink-0">
                    <div className="w-full flex flex-col items-center text-info-clamp gap-2 font-light">
                      <h3 className="font-bold">{Product?.Car_Type}</h3>
                      <span className="text-[0.6rem] ">車型</span>
                    </div>
                  </div>
                </div>
                <div className="p-2  flex flex-wrap gap-2">
                  <div className="flex justify-start items-center rounded shrink-0">
                    <div className="w-full flex flex-col items-center text-info-clamp gap-2 font-light">
                      <h3 className="font-bold">{color}</h3>
                      <span className="text-[0.6rem]">顏色</span>
                    </div>
                  </div>
                </div>
                <div className="p-2  flex flex-wrap gap-2">
                  <div className="flex justify-start items-center rounded shrink-0">
                    <div className="w-full flex flex-col items-center text-info-clamp gap-2 font-light">
                      <h3 className="font-bold">{Product?.Car_Year}</h3>
                      <span className="text-[0.6rem]">年份</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* second Info */}
              <div className="flex flex-wrap items-center justify-center mt-2">
                {' '}
                <div className="p-2  flex flex-wrap gap-2">
                  <div className="flex justify-start items-center rounded shrink-0">
                    <div className="w-full flex flex-col items-center text-info-clamp gap-2 font-light">
                      <h3 className="font-bold -tracking-tight">
                        {formatKilo(Product?.Car_Mileage)}{' '}
                      </h3>
                      <span className="text-[0.6rem]">里程</span>
                    </div>
                  </div>
                </div>
                <div className="p-2  flex flex-wrap gap-2">
                  <div className="flex justify-start items-center rounded shrink-0">
                    <div className="w-full flex flex-col items-center text-info-clamp gap-2 font-light">
                      <h3 className="font-bold">{Product?.Car_CC} </h3>
                      <span className="text-[0.6rem]">排氣量</span>
                    </div>
                  </div>
                </div>
                <div className="p-2  flex flex-wrap gap-2">
                  <div className="flex justify-start items-center rounded shrink-0">
                    <div className="w-full flex flex-col items-center text-info-clamp gap-2 font-light">
                      <h3 className="font-bold">{fuel}</h3>
                      <span className="text-[0.6rem]">引擎燃料</span>
                    </div>
                  </div>
                </div>
                <div className="p-2  flex flex-wrap gap-2">
                  <div className="flex justify-start items-center rounded shrink-0">
                    <div className="w-full flex flex-col items-center text-info-clamp gap-2 font-light">
                      <h3 className="font-bold">
                        {
                          Car_Transmission.find(
                            ({ name }) => name === Product?.Car_Transmission
                          )?.value
                        }
                      </h3>
                      <span className="text-[0.6rem]">變速系統</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* price */}
            <div className="relative flex mt-2 justify-center items-center gap-6">
              <div className="flex">
                <div className="w-full flex flex-col p-2 items-center ">
                  <div
                    className={
                      'w-full flex flex-col justify-center items-center'
                    }
                  >
                    <span
                      className={cn('text-sm', {
                        'text-[0.8rem]': Product?.onSale,
                      })}
                    >
                      定價
                    </span>
                    <h2
                      className={cn('text-3xl font-extrabold', {
                        'text-lg line-through': Product?.is_onSale,
                      })}
                    >
                      ＄{formatPrice(Product?.price ? Product?.price : 0)}
                    </h2>
                  </div>
                </div>
              </div>
              {Product?.is_onSale && (
                <div className="flex">
                  <div className="w-full flex flex-col p-2 items-center ">
                    <div className="w-full flex flex-col justify-center items-center">
                      <span className="text-sm ">特售</span>
                      <h2 className="text-3xl font-extrabold">
                        ＄{formatPrice(Product?.price ? Product?.onSale : 0)}
                      </h2>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>
          <hr className="my-2 h-[1.5px] bg-slate-800 w-full" />
          {/* Remark */}
          <section className="mt-2 p-2 w-full relative flex flex-col">
            {validRemarkArray && validRemarkArray?.length !== 0 ? (
              <RemarkComponent validRemarkArray={validRemarkArray} />
            ) : null}
          </section>
        </div>
        <ModalImageScroll productArray={productArray} />
      </MaxWidthWrapper>
    </>
  );
};

export default page;
