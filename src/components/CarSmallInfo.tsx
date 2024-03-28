import { MoreHorizontal } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Car_Fuel, Car_Transmission as Transmission } from '../config';
import { cn, formatKilo, formatPrice } from '../lib/utils';
import { Product } from '../payload-type';
import deposit from '../app/assets/status/deposit.png';
import { Car_Color as FilterColor } from '../config/filterIndex';
const CarSmallInfo = ({ product }: { product: Product }) => {
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
    <div
      className="relative transition-all w-[75%] md:w-1/2 lg:w-1/4 shrink-0 flex flex-col items-start justify-center p-2 border shadow-bottom shadow-slate-500/40 rounded-lg space-y-2 max-md:snap-center hover:scale-[1.02] hover:shadow-bottomRight bg-slate-50"
      key={id}
    >
      <Link
        href={`carInfo/${id}`}
        className="flex flex-col w-full h-full"
        target="_blank"
      >
        {isDeposit && (
          <div className="absolute bottom-6 right-3 z-30" aria-hidden={true}>
            <Image src={deposit} alt="" width="100" height="32" priority />
          </div>
        )}
        <div className="relative w-full h-full aspect-square rounded-lg bg-white overflow-hidden ">
          <div className="relative group w-full h-full overflow-hidden">
            <div
              className="top-0 absolute w-full h-full z-10 
          after:content-[''] after:absolute after:inset-0 after:border-2 after:border-solid after:rounded-lg after:border-white after:ease-in-out after:duration-300 after:opacity-0 after:hover:inset-3 after:hover:opacity-100
          "
            >
              <div className="absolute inset-7 flex flex-wrap gap-2 items-center content-center justify-center -translate-y-52 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 ease-out duration-500">
                <span className="text-sm text-white shrink-0 font-medium">
                  {color}
                </span>
                <span className="text-sm text-white shrink-0 font-medium">
                  {Car_Year}
                </span>
                <span className="text-sm text-white shrink-0 font-medium">
                  {Car_CC}cc
                </span>
                <span className="text-sm text-white shrink-0 font-medium">
                  {Car_Fuel.find(({ name }) => name === Engin_fuel)?.value}
                </span>
                <span className="text-sm text-white shrink-0 font-medium">
                  {
                    Transmission.find(({ name }) => name === Car_Transmission)
                      ?.value
                  }
                </span>
                <span className="text-sm text-white shrink-0 font-medium -tracking-tight">
                  {formatKilo(Car_Mileage)}
                </span>
              </div>
            </div>

            <Image
              src={validUrls[0]}
              alt="new car picture"
              className="relative w-full h-full object-cover object-center  group-hover:grayscale group-hover:brightness-50 transition-all duration-500 "
              priority
              fill
              sizes="(min-width:768px) 85vw,700px"
            />
          </div>
        </div>
        <div className="relative mt-4">
          {/* car brand */}
          <h3 className="text-lg font-bold">{Car_Brand}</h3>
          {/* car name */}
          <p className="text-sm font-bold line-clamp-3 min-h-[90px]">
            {/* min-h-[90px] 固定文字的高度*/}
            {Car_Name}
          </p>
        </div>
        {/* car price and more detail */}

        <div className="w-full flex justify-between items-end">
          <div className="relative">
            <div className="flex justify-between items-center">
              <div className="flex flex-col items-center">
                <p
                  className={cn('text-2xl font-extrabold  tracking-wider', {
                    'line-through': is_onSale,
                  })}
                >
                  ${formatPrice(price)}
                </p>
                {is_onSale ? (
                  <p className="text-xl font-semibold tracking-wider ">
                    ${formatPrice(onSale)}
                  </p>
                ) : (
                  <p
                    className={cn('text-xl font-semibold tracking-wider ', {
                      'text-transparent': !is_onSale,
                    })}
                  >
                    __
                  </p>
                )}
              </div>
            </div>
          </div>
          <MoreHorizontal />
        </div>
      </Link>
    </div>
  );
};

export default CarSmallInfo;
