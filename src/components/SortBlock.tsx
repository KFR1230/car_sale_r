'use client';

import { ChevronsUpDown, ChevronUp, MoveDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from '../lib/utils';
import { useProducts } from './hooks/useProducts';
import SortOption from './SortOption';
//這裡是要建立物件，讓下方直接map元件就好
const sortOptions = {
  createAt: {
    name: '加入時間',
    value: 'createAt',
  },
};

const SortBlock = () => {
  const [hasClicked, setHasClicked] = useState<string>('createAt');
  const { changSort, sortOption } = useProducts();
  const sortToggleHandler = (sort: string) => {
    changSort(sort);
    return;
  };
  useEffect(() => {
    const str = sortOption.includes('-') ? sortOption.slice(1) : sortOption;
    setHasClicked(str);
  }, []);

  return (
    <div className="my-2 flex gap-2 items-center self-end">
      {/* price */}
      <SortOption
        sortName="加入時間"
        sortValue="createdAt"
        hasClicked={hasClicked}
        setHasClicked={setHasClicked}
        toToggle={sortToggleHandler}
      />
      {/* year */}
      <SortOption
        sortName="年份"
        sortValue="Car_Year"
        hasClicked={hasClicked}
        setHasClicked={setHasClicked}
        toToggle={sortToggleHandler}
      />
      {/* CC */}
      <SortOption
        sortName="排氣量"
        sortValue="Car_CC"
        hasClicked={hasClicked}
        setHasClicked={setHasClicked}
        toToggle={sortToggleHandler}
      />
    </div>
  );
};

export default SortBlock;
