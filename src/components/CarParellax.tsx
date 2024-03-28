'use client';
import Image from 'next/image';
import { MouseParallax } from 'react-just-parallax';
import mattingCar from '../app/assets/status/matting-car.png';
const CarParellax = () => {
  return (
    <MouseParallax isAbsolutelyPositioned strength={0.2}>
      <div className="absolute top-0 left-0 w-full h-full">
        <Image
          src={mattingCar}
          alt="banner_car"
          aria-hidden={true}
          className="w-1/2 absolute -bottom-10 -left-8 rotate-[6deg]"
        />
      </div>
    </MouseParallax>
  );
};
export default CarParellax;
