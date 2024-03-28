import { Skeleton } from '../ui/skeleton';

const SkeletonSliderCard = () => {
  return (
    <div className="relative transition-all w-[75%] md:w-1/2 lg:w-1/4 shrink-0 flex flex-col items-start justify-center p-2 border shadow-bottom shadow-slate-500/40 rounded-lg space-y-2 ">
      <div className="flex flex-col w-full h-full">
        <div className="relative w-full h-full aspect-square rounded-lg ">
          <Skeleton className="w-full h-full " />
        </div>

        <div className="relative mt-4 space-y-2">
          <Skeleton className="h-4 w-[150px]" />
          <div className="min-h-[90px] flex flex-col gap-2">
            <Skeleton className="h-2 w-full " />
            <Skeleton className="h-2 w-full " />
            <Skeleton className="h-2 w-1/3 " />
          </div>
          <div className="h-[10px]" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonSliderCard;
