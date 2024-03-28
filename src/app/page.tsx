import ContactInfo2 from '../components/ContactInfo2';
import MaxWidthWrapper from '../components/MaxWidthWrapper';
import ProductsArea from '../components/ProductsArea';
import SliderProductsArea from '../components/SliderProductsArea';
import TopInfoArea from '../components/TopInfoArea';

export default function Home() {
  return (
    //內容的部分
    <MaxWidthWrapper>
      <div className="flex flex-col py-0 items-center">
        <TopInfoArea />
        <ContactInfo2 />
        {/* 特售車輛 */}
        <SliderProductsArea />
        {/* 所有車輛資料 */}
        <section className="w-full mt-4 ">
          <div className="relative flex flex-col w-full px-4">
            <h1 className="text-title-clamp font-extrabold tracking-tighter title-shadow">
              所有車輛
            </h1>
            <p className="text-subTitle-clamp font-medium text-zinc-500/85">
              All Vehicle
            </p>
          </div>
          <div className="relative w-full flex flex-col items-center px-4 mt-2">
            {/* 建立一個新的  component 之後篩選 */}
            <ProductsArea />
          </div>
        </section>
      </div>
    </MaxWidthWrapper>
  );
}
