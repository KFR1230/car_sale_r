'use client';
import { ChevronsUpDown, ChevronUp } from 'lucide-react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { cn } from '../lib/utils';
import { useProducts } from './hooks/useProducts';

interface SortProps {
  hasClicked: string;
  sortName: string;
  sortValue: string;
  setHasClicked: Dispatch<SetStateAction<string>>;
  toToggle: (sort: string) => void;
}

const SortOption = (props: SortProps) => {
  const { hasClicked, setHasClicked, sortName, sortValue, toToggle } = props;
  const [hasChange, setHasChange] = useState<boolean>(true);
  const { changSort, sortOption } = useProducts();
  useEffect(() => {
    setHasChange(true);
  }, [hasClicked]);

  return (
    <>
      {hasClicked === sortValue ? (
        //點選後
        <div
          className={cn(
            'flex justify-center items-center text-[14px] gap-1 rounded-full cursor-pointer relative before:content-[""] before:absolute before:w-full before:h-full before:border-t-[1px] before:border-slate-300/80 before:rounded-full before:transition-all before:ease-in-out before:duration-300  border-b-2 border-slate-800 before:active:border-[0.5px] before:active:border-zinc-800/55 active:border-none  before:-z-10',
            {
              'bg-gray-400 text-yellow-50 hover:bg-gray-500':
                hasClicked === sortValue,
            }
          )}
          // onClick={() => setIsCreateAtNearly((prev) => !prev)}
        >
          <label
            className={cn(
              'relative flex gap-1 items-center cursor-pointer px-2'
            )}
            htmlFor={`toggle_${sortValue}`}
          >
            {sortName}
            <ChevronUp
              size={16}
              strokeWidth={1.5}
              className={cn('transition-all ', {
                'rotate-180': hasChange,
              })}
            />
          </label>
          <input
            type="checkbox"
            id={`toggle_${sortValue}`}
            defaultChecked
            className="hidden"
            onChange={(e) => {
              setHasChange(e.target.checked);
              toToggle(e.target.checked ? `-${sortValue}` : `${sortValue}`);
            }}
          />
        </div>
      ) : (
        //點選前
        <div className='flex justify-center items-center text-[14px] gap-1 rounded-full cursor-pointer relative before:content-[""] before:absolute before:w-full before:h-full before:border-t-[1px] before:border-slate-300/80 before:rounded-full before:transition-all before:ease-in-out before:duration-300  border-b-2 border-slate-800 before:active:border-[0.5px] before:active:border-zinc-800/55 active:border-none before:-z-10 bg-background hover:bg-accent'>
          <div
            className={cn('relative flex gap-2 items-center cursor-pointer')}
          >
            <label
              htmlFor={`sort_${sortValue}`}
              className="flex items-center gap-1 cursor-pointer px-2"
            >
              {sortName}
              <ChevronsUpDown size={16} strokeWidth={1.25} />
            </label>
            <input
              type="radio"
              name="sort"
              value={sortValue}
              id={`sort_${sortValue}`}
              className="hidden checked:bg-slate-400"
              onChange={(e) => {
                setHasClicked(e.currentTarget.value);
                changSort(`-${e.currentTarget.value}`);
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default SortOption;
