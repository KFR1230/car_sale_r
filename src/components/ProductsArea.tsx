import { LayoutGrid, LayoutList } from 'lucide-react';
import { cookies } from 'next/headers';
import { getServerSideUser } from '../lib/payload-utilis';
import FilterBlock from './FilterBlock';
import FilterProducts from './FilterProducts';
import LayoutBlock from './LayoutBlock';
import SortBlock from './SortBlock';

const ProductsArea = async () => {
  //首次載入或重新載入都會到cookie找尋是否有存在的條件
  //排序和篩選都是object[]
  const nextCookie = cookies();
  const data = nextCookie.get('filter-type')?.value;
  const tagCookie = nextCookie.get('filter-tag')?.value;
  const tagsArray = tagCookie ? JSON.parse(tagCookie) : null;
  const filterType: object[] | null = data ? JSON.parse(data) : null;
  const { user } = await getServerSideUser(nextCookie);
  // defaultFilterValue 目前沒用到
  const defaultFilterValue: object[] | null = filterType;
  //只有第重新整理會catch 所以可以在這裡發出api，取得資料。

  return (
    <>
      <div className="w-full flex flex-col">
        <div className="w-full flex justify-between items-center">
          {/* 篩選 */}
          <FilterBlock
            defaultFilterValue={defaultFilterValue}
            tagsArray={tagsArray}
          />
          {/* 不同顯示方式 */}
          <LayoutBlock />
        </div>
        {/* 排序 */}
        <SortBlock />
      </div>
      {/* Products */}
      <div className="relative w-full flex flex-col gap-4 items-center mt-4">
        <FilterProducts
          filterType={filterType}
          tagsArray={tagsArray}
          status={user ? 'preview' : null}
        />
      </div>
    </>
  );
};

export default ProductsArea;
