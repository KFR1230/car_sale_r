import ContentArea from '@/src/components/AboutPage/ContentArea';
import MaxWidthWrapper from '@/src/components/MaxWidthWrapper';
import PageBar from '@/src/components/PageBar';
import { getUserPayload } from '@/src/getUserPayload';
import Image from 'next/image';

const Page = async () => {
  const payload = await getUserPayload();
  const { docs: contents } = await payload.find({
    collection: 'about-us',
    limit: 1,
  });
  const [content] = contents;

  return (
    <>
      <PageBar pageName="關於我們" />
      <div className="flex flex-col relative w-full py-6">
        <MaxWidthWrapper>
          <div className="flex gap-4 flex-col items-center relative w-full">
            <div className="relative w-96 aspect-video z-10 ">
              <Image
                src={'/status/Logo_R.png'}
                alt="Logo"
                className="object-contain "
                fill
                sizes="(max-width:768px) 100vw , 700px"
              />
            </div>
            <div className="w-full border-4 rounded-xl border-amber-800/30 p-12">
              <ContentArea content={content} />
            </div>
          </div>
        </MaxWidthWrapper>
      </div>
    </>
  );
};

export default Page;
