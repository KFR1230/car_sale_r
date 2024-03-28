'use client';
import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';
import {
  AuthCredentialsValidator,
  TAuthCredentialsValidator,
} from '@/src/lib/validator/account-credential-vaidator';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
// import logo from '../../assets/status/Logo.jpg';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@/src/lib/utils';
import { Button } from '@/src/components/ui/button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

type Tstatus = {
  status: 'success' | 'failed';
};

const Page = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthCredentialsValidator>({
    resolver: zodResolver(AuthCredentialsValidator),
  });
  const router = useRouter();

  const signIn = async ({ email, password }: TAuthCredentialsValidator) => {
    setIsLoading(true);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/sign-in`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application / json; charset = utf-8',
        },
        body: JSON.stringify({ email, password }),
      }
    );
    const { status }: Tstatus = await res.json();
    if (!status) return;
    if (status === 'success') {
      toast.success('登入成功 ！');
      router.push('/sell');
      router.refresh;
    }
    if (status === 'failed') {
      toast.error('登入失敗');
    }
  };

  const onSubmit = async ({ email, password }: TAuthCredentialsValidator) => {
    const res = await signIn({ email, password });
    setIsLoading(false);
  };

  return (
    <div className="container relative flex flex-col justify-center items-center pt-16 ">
      <div className="flex flex-col relative justify-center space-y-6 sm:w-[350px]">
        <div className="relative flex flex-col items-center space-y-2 text-center h-20 w-20 self-center">
          <Image
            src={'/status/Logo.png'}
            alt="login_logo"
            className="object-cover"
            fill
            loading="eager"
          />
          {/* <h1 className="text-2xl text-bold">登入</h1> */}
        </div>
        <div className="flex flex-col">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-2">
              <Label htmlFor="email">帳號</Label>
              <Input
                type="email"
                placeholder="輸入電子郵件"
                {...register('email')}
                className={cn({
                  'focus-visible:ring-red-500 text-[16px]': errors.email,
                })}
              />
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="grid gap-2 mt-4">
              <Label htmlFor="email">密碼</Label>
              <Input
                type="password"
                placeholder="輸入密碼"
                {...register('password')}
                className={cn({
                  'focus-visible:ring-red-500 text-[16px]': errors.password,
                })}
              />
              {errors.password && (
                <p className="text-xs text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
            <Button className="mt-4 w-full " disabled={isLoading}>
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
                <span>登入</span>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
