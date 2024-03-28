import { Skeleton } from '../ui/skeleton';

const SkeletonCardList = () => {
  return (
    <div className="relative w-full shrink-0 flex flex-col items-start justify-center p-2 border shadow-bottom shadow-slate-500/40 rounded-lg space-y-2  bg-slate-50">
      <div className="flex w-full h-full gap-2">
        <div className="relative w-1/3 aspect-[438/300] rounded-lg bg-white overflow-hidden shrink-0">
          <Skeleton className="relative w-full h-full object-cover object-center" />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <div className="relative mt-2">
            {/* car brand */}
            {/* car name */}
            <Skeleton className="text-[14px] sm:text-sm font-bold line-clamp-2 min-h-2 w-24" />
          </div>
          {/* car price and more detail */}
          <div className="flex w-full flex-col gap-2 text-[14px] font-semibold sm:text-sm mt-3">
            <Skeleton className="text-[14px] sm:text-sm font-bold line-clamp-2 min-h-2 w-3/4" />
            <Skeleton className="text-[14px] sm:text-sm font-bold line-clamp-2 min-h-2 w-3/4" />
            <Skeleton className="text-[14px] sm:text-sm font-bold line-clamp-2 min-h-2 w-1/4" />
            <div className="text-[14px] sm:text-sm font-bold line-clamp-2 min-h-6 w-1/4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCardList;
