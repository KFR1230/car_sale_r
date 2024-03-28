import { getUserPayload } from '../getUserPayload';
import BannerSlider from './BannerSlider';
import ContactInfo from './ContactInfo';

const TopInfoArea = async () => {
  const payload = await getUserPayload();
  const { docs: Pictures } = await payload.find({
    collection: 'HomePage',
    limit: 1,
  });
  const [Homepage] = Pictures;
  const { bannerArray } = Homepage ? Homepage : { bannerArray: [] };
  const validBannerArray =
    typeof bannerArray === 'string'
      ? bannerArray
      : bannerArray?.map((object) => object.banner);
  const validBannerUrl = validBannerArray?.map((object) => {
    return typeof object === 'string' ? object : object.url;
  }) as string[] | [];
  const v = validBannerUrl[0];
  return (
    <div
      className={`relative w-full h-full flex flex-col gap-4 justify-between sm:flex-row max-sm:pb-1  before:absolute before:content-[''] before:w-full before:h-full before:top-0 before:left-0 bg-no-repeat bg-center  sm:p-4 sm:before:bg-gray-300/30`}
    >
      <BannerSlider validBannerUrl={validBannerUrl} />
      <ContactInfo />
    </div>
  );
};

export default TopInfoArea;
