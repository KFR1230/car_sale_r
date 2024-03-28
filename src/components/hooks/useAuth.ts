import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export const useAuth = () => {
  const router = useRouter();
  const SignOut = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/logout`,
        {
          method: 'POST',
          credentials: 'include', //包含cookie憑證
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (!res.ok) throw new Error();
      toast.success('登出成功');
      router.push('/signIn');
      router.refresh();
    } catch (err) {
      toast.error('登出失敗');
    }
  };
  return { SignOut };
};
