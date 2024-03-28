import MaxWidthWrapper from './MaxWidthWrapper';
import Image from 'next/image';
import { getUserPayload } from '../getUserPayload';
const Footer = async () => {
  const payload = await getUserPayload();
  const { docs: Homepage } = await payload.find({
    collection: 'HomePage',
    limit: 1,
  });
  const [HomePage] = Homepage;
  // const validUrl =
  //   typeof HomePage.logo === 'string' ? HomePage.logo : HomePage.logo.url;
  return (
    <>
      <footer className="w-full bg-black/80 mt-12">
        <MaxWidthWrapper>
          <div className="relative w-full py-4 flex items-center justify-between">
            <div className="relative w-24 h-24 flex text-white">
              <Image
                src={'/status/Logo.png'}
                alt="logo"
                loading="eager"
                fill
                className="w-full h-full object-contain py-4"
              />
            </div>
            <div className="relative flex flex-col gap-1 ">
              <div className="text-white text-xs font-semibold -tracking-tight">
                <ul>
                  <h5 className="text-sm mb-2">聯絡資訊</h5>
                  <li className="pl-4 flex justify-start items-center">
                    <p>地址：</p>
                    <span>桃園市蘆竹區大長路66號</span>
                  </li>
                  {/* <li className="pl-4 flex justify-start items-center">
                    <p>電話：</p>
                    <span>03-3681966</span>
                  </li> */}
                  <li className="pl-4 flex justify-start items-center">
                    <p>服務業務：</p>
                    <span>呂睿恩</span>
                  </li>
                  <li className="pl-4 flex justify-start items-center">
                    <p>手機：</p>
                    <span>0903-377-235</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="w-full py-2 text-white grid place-content-center text-[0.55rem] font-semibold">
            CopyRight © 2024
          </div>
        </MaxWidthWrapper>
      </footer>
    </>
  );
};

export default Footer;
