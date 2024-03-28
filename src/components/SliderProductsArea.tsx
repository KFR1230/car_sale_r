import { cookies } from 'next/headers';
import { SALE_CATEGORIES } from '../config/filterIndex';
import { getServerSideUser } from '../lib/payload-utilis';
import CarInfoSlider from './CarInfoSlider';

const SliderProductsArea = async () => {
  const nextCookie = cookies();
  const { user } = await getServerSideUser(nextCookie);
  //確認是否有user決定是否要更改顯示的內容
  return (
    <>
      {SALE_CATEGORIES.map((saleCategory, i) => (
        <CarInfoSlider
          key={`category_${i}`}
          title={saleCategory.title}
          subTitle={saleCategory.subTitle}
          condition={[{ is_onSale: true }, { status: 'sell' }]}
          status={user ? 'preview' : null}
        />
      ))}
    </>
  );
};

export default SliderProductsArea;
