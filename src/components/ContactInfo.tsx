import Image from 'next/image';
import Link from 'next/link';
// import lineID from '../app/assets/status/LineChatID.jpg';
// import mapIcon from '../app/assets/status/MapIcon.png';
const ContactInfo = () => {
  return (
    <div className="hidden sm:block relative w-full sm:aspect-[4/3]  sm:w-1/3 shadow-banner bg-black/15 backdrop-blur-md rounded-r-sm">
      <div className=" w-full h-full flex flex-col items-center rounded-sm">
        <div className="w-full h-full flex items-center justify-center xl:justify-evenly flex-col text-[0.6rem] xl:text-sm 2xl:text-lg text-shadow text-white font-semibold -tracking-tight text-slated-700">
          <ul
            className="transition-all duration-300 flex flex-col 
          space-y-2 p-2"
          >
            <li className=" flex justify-start flex-wrap">
              <p className="whitespace-nowrap">聯絡人：</p>
              <span>呂睿恩</span>
            </li>
            <li className="flex justify-start flex-wrap">
              <p className="whitespace-nowrap">地址：</p>
              <span>桃園市蘆竹區大長路66號</span>
            </li>
            <li className="flex justify-start flex-wrap">
              <p className="whitespace-nowrap">手機：</p>
              <span>0903-377-235</span>
            </li>
          </ul>
          <div className="w-full flex md:mt-4 items-center md:flex-row  justify-evenly">
            <div className="relative w-6 h-6 md:w-8 md:h-8 lg:w-12 lg:h-12 xl:w-16 xl:h-16">
              <Image
                src={'/status/LineChatID.png'}
                alt="line_icon"
                fill
                priority
              />
            </div>
            <Link
              className="relative w-6 h-6 md:w-8 md:h-8 xl:w-16 lg:w-12 lg:h-12 xl:h-16"
              href="https://www.google.com/maps/place/%E8%BB%8A%E6%AC%A3%E6%B1%BD%E8%BB%8A%E5%95%86%E8%A1%8C/@25.0364308,121.2848605,17z/data=!3m1!4b1!4m6!3m5!1s0x34681fc280c0afe3:0xb72db85b79f300c6!8m2!3d25.0364308!4d121.2848605!16s%2Fg%2F11c329tbf3?entry=ttu"
              target="_blank"
            >
              <Image
                src={'/status/MapIcon.png'}
                alt="line_icon"
                fill
                priority
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
