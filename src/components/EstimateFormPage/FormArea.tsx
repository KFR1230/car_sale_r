'use client';

import { cn } from '@/src/lib/utils';
import {
  FormCredentialsValidator,
  TFormCredentialsValidator,
} from '@/src/lib/validator/account-credential-vaidator';
import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from '@radix-ui/react-label';
import { X } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import MaxWidthWrapper from '../MaxWidthWrapper';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

const FormArea = (props: {
  upload: (
    data: FormData,
    formInfo: TFormCredentialsValidator
  ) => Promise<{
    success: boolean;
  }>;
}) => {
  const { upload } = props;
  const [remarkLength, setRemarkLength] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentImage, setCurrentImage] = useState<{ [keys: string]: File }>(
    {}
  );
  const [isSend, setIsSend] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<TFormCredentialsValidator>({
    resolver: zodResolver(FormCredentialsValidator),
  });
  // const watchRemark = watch('remark');

  const handleAddImage = (e: React.SyntheticEvent<EventTarget>) => {
    if (!(e.target instanceof HTMLInputElement)) return;
    const file = e.target.files?.[0].type;

    setCurrentImage({
      ...currentImage,
      [e.target.name]: e.target.files?.[0] as unknown as File,
    });
  };

  const onSubmit = async (data: TFormCredentialsValidator) => {
    setIsLoading(true);
    const formData = new FormData();
    const array = Object.entries(currentImage).filter(
      ([key, value]) => value !== undefined
    );
    array.forEach((arr) => {
      formData.append('imageFile', arr[1]);
    });

    const { success } = await upload(formData, data);
    setTimeout(() => {
      if (success) {
        toast.success('成功送出');
        setIsSend(true);
      } else {
        toast.error('圖片送出失敗，檔案過大');
      }
      setIsLoading(false);
      reset();
    }, 500);
  };

  return (
    <>
      <div className="w-full h-full relative">
        <MaxWidthWrapper>
          <div className="w-full h-full flex flex-col items-center sm:items-start sm:flex-row gap-6 ">
            {/* 注意事項 */}
            {/* <section className="relative h-full w-full px-6 sm:w-1/2 sm:px-0 pt-12">
              <div className="w-full flex flex-col overflow-auto ">
                  <h3 className="w-full h-[60px] flex justify-center items-center bg-slate-800/70 text-white rounded">
                    填表說明
                  </h3>
                </div>
            </section> */}
            {/* 表單 */}
            {!isSend && (
              <section className="relative flex flex-col w-full items-center px-6  sm:px-0 pt-12">
                <div className="w-full h-[60px]  text-black flex justify-start items-end font-black border-b-2 border-slate-500 py-2 text-xl">
                  表單
                </div>
                <form className="mt-2 w-full" onSubmit={handleSubmit(onSubmit)}>
                  <div className="mt-2">
                    <Label className="text-sm font-semibold">
                      姓名
                      <Input
                        placeholder="輸入姓名"
                        {...register('name')}
                        className="focus-visible:ring-purple-700 rounded-none text-[16px]"
                        required={true}
                      />
                    </Label>
                  </div>
                  <div className="mt-2 max-sm:text-[16px]">
                    <Label className="text-sm font-semibold">
                      手機號碼
                      <Input
                        placeholder="輸入電話號碼"
                        type="number"
                        pattern="[0-9]*"
                        {...register('phone')}
                        className="focus-visible:ring-purple-700 rounded-none text-[16px]"
                      />
                      {errors && (
                        <p className="text-rose-700 text-sm">
                          {errors.phone?.message}
                        </p>
                      )}
                    </Label>
                  </div>
                  <div className="mt-2">
                    <Label className="text-sm font-semibold">
                      e-mail
                      <Input
                        placeholder="e-mail"
                        type="email"
                        {...register('mail')}
                        className="focus-visible:ring-purple-700 rounded-none text-[16px]"
                      />
                      {errors && (
                        <p className="text-rose-700 text-sm">
                          {errors.mail?.message}
                        </p>
                      )}
                    </Label>
                  </div>
                  <div className="mt-2">
                    <Label className="text-sm font-semibold">
                      Line ID
                      <Input
                        placeholder="Line ID"
                        {...register('lineID')}
                        className="focus-visible:ring-purple-700 rounded-none text-[16px]"
                        required={true}
                      />
                    </Label>
                  </div>
                  <div className="mt-2">
                    <Label className="text-sm font-semibold">
                      品牌
                      <Input
                        placeholder="品牌"
                        {...register('brand')}
                        className="focus-visible:ring-purple-700 rounded-none text-[16px]"
                        required={true}
                      />
                    </Label>
                  </div>
                  <div className="mt-2">
                    <Label className="text-sm font-semibold">
                      車型
                      <Input
                        placeholder="車型"
                        {...register('type')}
                        className="focus-visible:ring-purple-700 rounded-none text-[16px]"
                        required={true}
                      />
                    </Label>
                  </div>
                  <div className="mt-2">
                    <Label className="text-sm font-semibold">
                      年份
                      <Input
                        placeholder="年份"
                        {...register('year')}
                        className="focus-visible:ring-purple-700 rounded-none text-[16px]"
                        type="number"
                        pattern="[0-9]*"
                        required={true}
                      />
                    </Label>
                  </div>
                  <div className="mt-2">
                    <Label className="text-sm font-semibold">
                      里程數
                      <Input
                        placeholder="里程數"
                        {...register('mileage')}
                        className="focus-visible:ring-purple-700 rounded-none text-[16px]"
                        type="number"
                        pattern="[0-9]*"
                        required={true}
                      />
                    </Label>
                  </div>
                  <div className="mt-2 flex flex-col">
                    <Label className="text-sm font-semibold">
                      備註
                      <textarea
                        {...register('remark', { required: true, max: 250 })}
                        className="flex min-h-[60px] w-full  border border-input px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:ring-purple-700 rounded-none text-[16px] bg-slate-100 mt-1"
                        onChange={(e) => setRemarkLength(e.target.value.length)}
                      />
                    </Label>
                    <p
                      className={cn(
                        'text-[12px] self-end mt-1 text-muted-foreground',
                        { 'text-rose-600 font-medium': remarkLength > 250 }
                      )}
                    >
                      {remarkLength} / 250
                    </p>
                    {errors.remark && <p>{errors.remark.message}</p>}
                  </div>
                  <div className="flex flex-col">
                    {/* <p>上傳圖片</p> */}
                    <div className="grid grid-cols-2 grid-flow-row gap-2">
                      <div>
                        <label className="text-sm font-extrabold">圖片1</label>
                        <div className="flex items-center gap-2">
                          {' '}
                          <Input
                            type="file"
                            name="圖片1"
                            accept="image/png, image/jpeg"
                            onChange={handleAddImage}
                            className="rounded-none text-[16px]"
                          />
                          <X
                            onClick={(e) => {
                              const input = e.currentTarget
                                .previousElementSibling as HTMLInputElement;
                              if (!input) return;
                              delete currentImage[input.name];
                              setCurrentImage({ ...currentImage });
                              input.value = '';
                            }}
                            className="cursor-pointer hover:bg-white active:bg-slate-300 "
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-extrabold">圖片2</label>
                        <div className="flex items-center gap-2">
                          {' '}
                          <Input
                            type="file"
                            name="圖片2"
                            accept="image/png, image/jpeg"
                            onChange={handleAddImage}
                            className="rounded-none text-[16px]"
                          />
                          <X
                            onClick={(e) => {
                              const input = e.currentTarget
                                .previousElementSibling as HTMLInputElement;
                              if (!input) return;
                              delete currentImage[input.name];
                              setCurrentImage({ ...currentImage });
                              input.value = '';
                            }}
                            className="cursor-pointer hover:bg-white active:bg-slate-300 "
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-extrabold">圖片3</label>
                        <div className="flex items-center gap-2">
                          {' '}
                          <Input
                            type="file"
                            name="圖片3"
                            accept="image/png, image/jpeg"
                            onChange={handleAddImage}
                            className="rounded-none text-[16px]"
                          />
                          <X
                            onClick={(e) => {
                              const input = e.currentTarget
                                .previousElementSibling as HTMLInputElement;
                              if (!input) return;
                              delete currentImage[input.name];
                              setCurrentImage({ ...currentImage });
                              input.value = '';
                            }}
                            className="cursor-pointer hover:bg-white active:bg-slate-300 "
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-extrabold">圖片4</label>
                        <div className="flex items-center gap-2">
                          {' '}
                          <Input
                            type="file"
                            name="圖片4"
                            onChange={handleAddImage}
                            accept="image/png, image/jpeg"
                            className="rounded-none text-[16px]"
                          />
                          <X
                            onClick={(e) => {
                              const input = e.currentTarget
                                .previousElementSibling as HTMLInputElement;
                              if (!input) return;
                              delete currentImage[input.name];
                              setCurrentImage({ ...currentImage });
                              input.value = '';
                            }}
                            className="cursor-pointer hover:bg-white active:bg-slate-300 "
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button
                    className="mt-6 w-full bg-translate text-black ring-2 ring-black active:bg-slate-300 hover:text-white rounded-none"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-loader-2  animate-spin text-blue-400 "
                      >
                        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                      </svg>
                    ) : (
                      <span>送出</span>
                    )}
                  </Button>
                </form>
              </section>
            )}
            {isSend && (
              <section className="relative flex flex-col w-full items-center px-6  sm:px-0 pt-12">
                <div className="w-full h-[60px]  text-black flex justify-start items-end font-black border-b-2 border-slate-500 py-2 text-xl">
                  表單
                </div>
                <p className="h-[160px] grid place-content-center text-sm font-bold">
                  {' '}
                  已成功送出表單，我們會盡快的回覆您！
                </p>
                <div className="relative w-16 h-20 before:content-[''] before:w-16 before:h-16 before:bg-yellow-500/70 before:absolute before:rounded-full before:-top-4 ">
                  <Image
                    src="/status/thank_you.png"
                    alt="thank_you"
                    arria-hidden={true}
                    fill
                  />
                </div>
              </section>
            )}
          </div>
        </MaxWidthWrapper>
      </div>
    </>
  );
};

export default FormArea;

// const {
//   register,
//   watch,
//   handleSubmit,
//   formState: { errors },
// } = useForm<TFormCredentialsValidator>({
//   resolver: zodResolver(FormCredentialsValidator),
// });
// const onSubmit = async (data: TFormCredentialsValidator) => {
//   // const formData = new FormData();
//   // if (currentImage instanceof File) {
//   //   formData.append('file', currentImage);
//   // }
//   // formData.append('file', 'currentImage');
//   try {
//     const res = fetch(
//       `${process.env.NEXT_PUBLIC_SERVER_URL}/api/Send-Line-Notify`,
//       {
//         method: 'POST',
//         body: JSON.stringify(data),
//       }
//     );
//     const { status } = await (await res).json();
//     if (status === 200) {
//       return;
//     } else {
//       throw new Error('傳送有誤');
//     }
//   } catch (err) {
//     console.log(err);
//   }
// };

{
  /* className="relative w-1/2 aspect-square">
                  <Image src={''} alt="" fill />
                </div> */
}
