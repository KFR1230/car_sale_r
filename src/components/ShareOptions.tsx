'use client';
import { Copy, Share } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { toast } from 'sonner';

const ShareOptions = () => {
  const pathname = usePathname();
  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/${pathname}`;

  const handlerCopyUrl = () => {
    navigator.clipboard.writeText(url);
    toast.message('已複製網址');
  };
  return (
    <div
      className="cursor-pointer mx-2 flex justify-center items-center"
      onClick={handlerCopyUrl}
    >
      <Copy size={16} strokeWidth={1.75} />
    </div>
  );
};

export default ShareOptions;
