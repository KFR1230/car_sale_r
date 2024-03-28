'use client';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="w-full h-full py-12 flex flex-col justify-center items-center text-sm gap-4 font-bold">
      <h1>找不到該頁面</h1>

      <div
        className="p-2 bg-background rounded-lg ring-1 ring-accent-foreground hover:bg-accent group cursor-pointer"
        onClick={() => {
          router.replace(`${process.env.NEXT_PUBLIC_SERVER_URL}`);
          router.refresh();
        }}
      >
        <span className="relative left-0 group-hover:-left-1 transition-all">
          &larr;
        </span>{' '}
        回到首頁{' '}
      </div>
    </div>
  );
}
