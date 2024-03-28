'use client';

import { Filter, X } from 'lucide-react';
import {
  Car_CC,
  Car_Color,
  Car_Fuel,
  Car_Mileage,
  Car_Transmission,
  Car_Brand,
  Car_Year,
  price,
} from '../config/filterIndex';

import { cn } from '../lib/utils';
import FilterPriceCard from './FilterPriceCard';
import FilterMinMaxCard from './FilterMinMaxCard';
import { useProducts } from './hooks/useProducts';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/doalog';

const FilterBlock = ({
  defaultFilterValue,
  tagsArray,
}: {
  defaultFilterValue: object[] | null;
  tagsArray: object[] | null;
}) => {
  const {
    products,
    isLoading,
    hasNextPage,
    nextPage,
    updateFilter,
    filterArray,
    defaultValueTags,
    firstRender,
    setNewProducts,
    updateNewProducts,
    setDefaultValueTags,
  } = useProducts();

  const addNewFilter = (filterType: object[], filterName: string) => {
    //做一個判斷式，確認要加入時，原先的陣列是否已經含有，如果有就重新組合成新的，如果沒有就直接加入
    if (filterArray.length === 0) {
      updateFilter([...filterType]);
      return;
    } else {
      const newArray = [
        ...filterArray.filter((type) => Object.keys(type)[0] !== filterName),
        ...filterType,
      ];
      updateFilter(newArray);
    }
  };
  const removeFilter = (filterType: object[], filterName: string) => {
    //直接移除不符合的陣列，重新儲存新的值
    //因為price比較特殊，會判斷on Sale  和 price的價格，有任一方小就符合。
    const name = filterName !== 'price' ? filterName : 'or';
    const newArray = filterArray.filter(
      (type) => Object.keys(type)[0] !== name
    );
    updateFilter(newArray);
  };
  const addFilterTags = (value: string, filterName: string) => {
    const tag = { [filterName]: value };
    if (defaultValueTags.length === 0) {
      return setDefaultValueTags([tag]);
    } else {
      const newArray = [
        ...defaultValueTags.filter((tag) => Object.keys(tag)[0] !== filterName),
        tag,
      ];
      return setDefaultValueTags(newArray);
    }
  };
  const removeFilterTag = (filterName: string) => {
    const newArray = defaultValueTags.filter(
      (tag) => Object.keys(tag)[0] !== filterName
    );

    return setDefaultValueTags(newArray);
  };
  const removeAllFilter = () => {
    updateFilter([]);
    setDefaultValueTags([]);
  };
  // console.log('defaultValueTags');
  // console.log('filterArray', filterArray);
  return (
    <div className="w-[2/3] flex items-center sm:flex-col sm:justify-start sm:items-start">
      <div className="relative py-1 sm:w-full h-auto flex flex-col justify-start items-start sm:items-center sm:flex-row">
        {/* filter options */}
        <Dialog>
          <DialogTrigger
            asChild
            className={cn({
              'hover:bg-gray-500': filterArray.length !== 0,
            })}
          >
            <Button
              variant="ghost"
              className={cn(
                'relative w-18 h-18 bg-background rounded-full mr-2 before:content-[""] before:absolute before:w-full before:h-full before:border-t-[1px] before:border-slate-300/60 before:rounded-full before:transition-all before:ease-in-out before:duration-300 border-b-2 border-slate-800 before:active:border-[0.5px] before:active:border-zinc-800/55 active:border-none',
                {
                  'bg-gray-400': filterArray.length !== 0,
                }
              )}
            >
              <Filter
                width={16}
                height={16}
                className={cn('text-black', {
                  'text-yellow-50 ': filterArray.length !== 0,
                })}
              />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogHeader>
                <DialogTitle>篩選條件</DialogTitle>
                <DialogDescription>
                  <div className="w-full flex flex-col ">
                    {/* equals filter*/}
                    <div className="grid grid-cols-2 grid-flow-row gap-2 ">
                      <FilterMinMaxCard
                        filterName="Car_Brand"
                        filterTitle="品牌"
                        addNewFilter={addNewFilter}
                        removeFilter={removeFilter}
                        addFilterTags={addFilterTags}
                        removeFilterTag={removeFilterTag}
                        defaultValue={filterArray}
                        filterMinMaxOptions={Car_Brand}
                        key="Car_Brand"
                      />
                      <FilterMinMaxCard
                        filterName="Car_Color"
                        filterTitle="顏色"
                        addNewFilter={addNewFilter}
                        removeFilter={removeFilter}
                        addFilterTags={addFilterTags}
                        removeFilterTag={removeFilterTag}
                        defaultValue={filterArray}
                        filterMinMaxOptions={Car_Color}
                        key="Car_Color"
                      />
                      <FilterMinMaxCard
                        filterName="Car_Transmission"
                        filterTitle="變速系統"
                        addNewFilter={addNewFilter}
                        removeFilter={removeFilter}
                        addFilterTags={addFilterTags}
                        removeFilterTag={removeFilterTag}
                        defaultValue={filterArray}
                        filterMinMaxOptions={Car_Transmission}
                        key="Car_Transmission"
                      />
                      <FilterMinMaxCard
                        filterName="Engin_fuel"
                        filterTitle="引擎燃料"
                        addNewFilter={addNewFilter}
                        removeFilter={removeFilter}
                        addFilterTags={addFilterTags}
                        removeFilterTag={removeFilterTag}
                        defaultValue={filterArray}
                        filterMinMaxOptions={Car_Fuel}
                        key="Engin_fuel"
                      />
                      {/* than_equal filter */}
                      <FilterMinMaxCard
                        filterName="Car_Mileage"
                        filterTitle="里程"
                        addNewFilter={addNewFilter}
                        removeFilter={removeFilter}
                        addFilterTags={addFilterTags}
                        removeFilterTag={removeFilterTag}
                        defaultValue={filterArray}
                        filterMinMaxOptions={Car_Mileage}
                        key="Car_Mileage"
                      />
                      <FilterMinMaxCard
                        filterName="Car_CC"
                        filterTitle="排氣量"
                        addNewFilter={addNewFilter}
                        removeFilter={removeFilter}
                        addFilterTags={addFilterTags}
                        removeFilterTag={removeFilterTag}
                        defaultValue={filterArray}
                        filterMinMaxOptions={Car_CC}
                        key="Car_CC"
                      />
                      <FilterMinMaxCard
                        filterName="Car_Year"
                        filterTitle="年代範圍"
                        addNewFilter={addNewFilter}
                        removeFilter={removeFilter}
                        addFilterTags={addFilterTags}
                        removeFilterTag={removeFilterTag}
                        defaultValue={filterArray}
                        filterMinMaxOptions={Car_Year}
                        key="Car_Year"
                      />
                      {/* price filter */}
                      <FilterPriceCard
                        filterName="price"
                        filterTitle="價位"
                        addNewFilter={addNewFilter}
                        removeFilter={removeFilter}
                        addFilterTags={addFilterTags}
                        removeFilterTag={removeFilterTag}
                        defaultValue={filterArray}
                        filterMinMaxOptions={price}
                        key="price"
                      />
                    </div>
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogHeader>
            <DialogFooter>
              <DialogDescription className="w-full flex justify-between items-center">
                <div
                  className="relative p-1 hover:underline decoration-1 underline-offset-4 text-[0.7rem] cursor-pointer  transition-all no-underline "
                  onClick={removeAllFilter}
                >
                  全部移除
                </div>
                {filterArray.length !== 0 && (
                  <div className="flex justify-end gap-1 text-sm font-extrabold -tracking-tighter">
                    {!isLoading && (
                      <>
                        <span>共有</span>
                        <span>{products?.length}</span>
                        <span>個結果</span>
                      </>
                    )}
                  </div>
                )}
              </DialogDescription>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <div className="hidden sm:flex flex-wrap items-center justify-start sm:justify-start mt-2 sm:mt-0">
          {defaultValueTags.map((tag, i) => (
            <div
              className=" px-1 rounded shrink-0 flex items-center justify-start hover:bg-zinc-400/20  cursor-pointer gap"
              key={Object.keys(tag)[0]}
              onClick={() => {
                removeFilterTag(Object.keys(tag)[0]);
                removeFilter([], Object.keys(tag)[0]);
              }}
            >
              <X width={16} height={16} />
              <span className="ml-1 text-[18px] -tracking-tighter">
                {Object.values(tag)[0]}
              </span>
            </div>
          ))}
        </div>
      </div>
      {filterArray?.length !== 0 ? (
        <div className="flex gap-1 text-[0.65rem] font-extrabold sm:mt-2">
          {products?.length === 0 && <span>目前沒有相關車輛</span>}
          {products?.length !== 0 && (
            <>
              <span>共有</span>
              <span>{products?.length}</span>
              <span>個</span>
            </>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default FilterBlock;
