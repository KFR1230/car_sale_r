import { MoreHorizontal } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Car_Fuel, Car_Transmission as Transmission } from '../config';
import { cn, formatKilo, formatPrice } from '../lib/utils';
import { Product } from '../payload-type';
import deposit from '../app/assets/status/deposit.png';
import { Car_Color as FilterColor } from '../config/filterIndex';

const CarSmallFilterInfoList = ({ product }: { product: Product }) => {
  const {
    isDeposit,
    Car_Brand,
    Car_Name,
    Car_Info,
    price,
    onSale,
    Car_Year,
    Car_Color,
    Car_CC,
    Engin_fuel,
    Car_Transmission,
    Car_Mileage,
    id,
    is_onSale,
  } = product;

  const validUrls = product?.images
    .map(({ car_picture }) =>
      typeof car_picture === 'string' ? car_picture : car_picture.url
    )
    .filter(Boolean) as string[];
  const validInfo = Car_Info?.map(({ value }) =>
    typeof value === 'string' ? value : value.label
  );
  const color = FilterColor.filter((option) => option.equals === Car_Color)[0]
    .value;

  return (
    <div className="relative transition-all w-full shrink-0 flex flex-col items-start justify-center p-2 border  shadow-bottom shadow-slate-500/40 rounded-lg space-y-2 max-md:snap-center hover:scale-[1.02] hover:shadow-bottomRight bg-slate-50">
      <Link
        href={`carInfo/${id}`}
        className="flex w-full h-full gap-2"
        target="_blank"
      >
        {isDeposit && (
          <div className="absolute bottom-6 right-3 z-30" aria-hidden={true}>
            <Image
              src={deposit}
              alt=""
              width="100"
              height="32"
              priority
              sizes="(max-width:768px) 100vw , 700px"
            />
          </div>
        )}
        <div className="relative w-1/3 aspect-[438/300] rounded-lg overflow-hidden shrink-0">
          <Image
            src={validUrls[0]}
            alt="new car picture"
            className="relative w-full h-full object-contain object-center  group-hover:grayscale group-hover:brightness-50 transition-all duration-500 "
            fill
            sizes="(max-width:768px) 100vw,700px"
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="relative mt-4">
            {/* car brand */}
            <h3 className="text-sm sm:text-lg font-bold">{Car_Brand}</h3>
            {/* car name */}
            <p className="text-[14px] sm:text-sm font-bold line-clamp-2 min-h-[42px]">
              {/* min-h-[90px] 固定文字的高度*/}
              {Car_Name}
            </p>
          </div>
          {/* car price and more detail */}
          <div className="flex gap-2 text-[14px] font-semibold sm:text-sm">
            <span>{Car_Year}年</span>
            <span>{Car_CC}cc</span>
            <span>{formatKilo(Car_Mileage)}</span>
          </div>
          <div className="w-full h-full flex justify-between  items-end md:mb-2">
            <div className="relative">
              <div className="flex justify-between items-center">
                <div className="flex gap-1 items-center">
                  <p
                    className={cn(
                      'text-sm md:text-xl font-extrabold  tracking-wider line-clamp-1',
                      { 'line-through': is_onSale }
                    )}
                  >
                    ${formatPrice(price)}
                  </p>
                  {is_onSale ? (
                    <p className="text-sm md:text-xl font-semibold tracking-wider line-clamp-1">
                      ${formatPrice(onSale)}
                    </p>
                  ) : (
                    <p
                      className={cn(
                        'text-xl font-semibold tracking-wider line-clamp-1',
                        { 'text-transparent ': !is_onSale }
                      )}
                    >
                      __
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CarSmallFilterInfoList;
