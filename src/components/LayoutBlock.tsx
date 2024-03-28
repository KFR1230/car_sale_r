'use client';
import { LayoutGrid, LayoutList } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../lib/utils';
import { useLayout } from './hooks/useLayout';

const LayoutBlock = () => {
  const { changeLayout, currentLayout } = useLayout();

  return (
    <div
      className={cn(
        "relative flex px-3 py-1 rounded-full before:content-[''] before:absolute before:inset-0 before:bg-gray-400/30 before:transition-all before:duration-300 before:rounded-full ",
        {
          'before:right-[50%] before:left-[15%]': currentLayout === 'Card',
          'before:left-[50%] before:right-[15%]': currentLayout === 'List',
        }
      )}
    >
      <div
        className={cn(
          ' relative z-10 flex items-center px-1 cursor-pointer transition-all',
          {
            'text-muted-foreground scale-[0.8]': currentLayout !== 'Card',
          }
        )}
        onClick={() => changeLayout('Card')}
      >
        <LayoutGrid size={24} strokeWidth={1.75} />
      </div>
      <div
        className={cn(
          'transition-all relative z-10  flex items-center px-1 cursor-pointer ',
          {
            'text-muted-foreground scale-[0.8]': currentLayout !== 'List',
          }
        )}
        onClick={() => changeLayout('List')}
      >
        <LayoutList size={24} strokeWidth={1.75} />
      </div>
    </div>
  );
};

export default LayoutBlock;
