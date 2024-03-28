import Image from 'next/image';
import { BannerMedia } from '../payload-type';

interface RemarkProps {
  validRemarkArray: (
    | {
        Car_Title?: string | null | undefined;
        Car_Extra_Image?: BannerMedia;
        Car_Remark?: string | null | undefined;
        id?: string | null | undefined;
      }
    | undefined
  )[];
}
const RemarkComponent = (props: RemarkProps) => {
  const { validRemarkArray } = props;
  return (
    <div className="w-full space-y-4">
      {validRemarkArray?.map((remark) => {
        return (
          <div className="w-full flex flex-col gap-2 " key={remark?.id}>
            {remark?.Car_Title && (
              <div className="h-16 rounded-t grid place-content-center text-lg font-bold">
                <h3 className="py-1 px-6 rounded bg-gray-200 border border-slate-900">
                  {remark?.Car_Title}
                </h3>
              </div>
            )}
            {remark?.Car_Extra_Image?.url && (
              <div className="relative w-full aspect-video lg:aspect-[16/6]">
                <Image
                  src={
                    remark?.Car_Extra_Image?.url ||
                    '/status/default-placeholder.png'
                  }
                  alt="extra_Image"
                  fill
                  className="object-cover object-center"
                  sizes="(min-width:768px) 85vw,700px"
                />
              </div>
            )}
            {remark?.Car_Remark && (
              <pre className="font-semibold text-base -tracking-tighter whitespace-pre-line lg:mt-4">
                {remark?.Car_Remark}
              </pre>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default RemarkComponent;
