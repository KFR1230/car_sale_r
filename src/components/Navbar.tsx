import Image from '@/node_modules/next/image';
import Link from '@/node_modules/next/link';
import MaxWidthWrapper from './MaxWidthWrapper';
import Menubar from './Menubar';
import { cookies } from 'next/headers';
import { getServerSideUser } from '../lib/payload-utilis';
import SignOutIcon from './SignOutIcon';
import { getUserPayload } from '../getUserPayload';
import { usePathname } from 'next/navigation';

const Navbar = async () => {
  const linkMap: { name: string; href: string }[] = [
    {
      name: '首頁',
      href: '/',
    },
    {
      name: '關於我們',
      href: '/about',
    },
    {
      name: '線上估車',
      href: '/estimate-form',
    },
    {
      name: '在店車輛',
      href: '/',
    },
  ];
  const payload = await getUserPayload();
  const { docs: Homepage } = await payload.find({
    collection: 'HomePage',
    limit: 1,
  });
  const [HomePage] = Homepage;
  const nextCookie = cookies();
  const { user } = await getServerSideUser(nextCookie);
  return (
    <div className="sticky top-0 inset-x-0 z-50 bg-white/50 backdrop-blur-sm">
      <header className="transition-all relative h-12 md:h-12 bg-white/50 border-b border-gray-200">
        <MaxWidthWrapper>
          <div className="transition-all h-12 md:h-12 flex items-center">
            <div className="relative ml-2 flex w-12 h-12 md:ml-0 ">
              <Link href="/">
                <Image
                  src={'/status/Logo_R.png'}
                  alt="logo"
                  loading="eager"
                  className="w-full h-full object-contain"
                  fill
                ></Image>
              </Link>
            </div>
            <div className="hidden md:flex ml-auto items-center space-x-4">
              <div className="relative flex p-1 before:content-[''] before:absolute before:right-1/2 before:left-1/2 before:top-0 before:bottom-0 before:hover:inset-0 before:opacity-0 before:hover:opacity-100 before:hover:bg-black before:transition-all before:duration-500 before:ease-in-out before:z-10 hover:text-white z-20">
                <Link href="/about" className="relative z-20">
                  <h3 className="text-sm font-extrabold ">關於我們</h3>
                </Link>
              </div>
              <div className="relative flex p-1 before:content-[''] before:absolute before:right-1/2 before:left-1/2 before:top-0 before:bottom-0 before:hover:inset-0 before:opacity-0 before:hover:opacity-100 before:hover:bg-black before:transition-all before:duration-500 before:ease-in-out before:z-10 hover:text-white z-20">
                <Link href="estimate-form" className="relative z-20">
                  <h3 className="text-sm font-extrabold">線上估車</h3>
                </Link>
              </div>
              <div className="relative flex p-1 before:content-[''] before:absolute before:right-1/2 before:left-1/2 before:top-0 before:bottom-0 before:hover:inset-0 before:opacity-0 before:hover:opacity-100 before:hover:bg-black before:transition-all before:duration-500 before:ease-in-out before:z-10 hover:text-white z-20">
                <Link href="/" className="relative z-20">
                  <h3 className="text-sm font-extrabold">在店車輛</h3>
                </Link>
              </div>
              <div className="hidden md:flex md:justify-center md:items-center">
                {user ? (
                  <SignOutIcon />
                ) : (
                  <Link
                    href="/signIn"
                    className="flex hover:text-gray-400 active:text-gray-800"
                  >
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
                      className="lucide lucide-circle-user-round"
                    >
                      <path d="M18 20a6 6 0 0 0-12 0" />
                      <circle cx="12" cy="10" r="4" />
                      <circle cx="12" cy="12" r="10" />
                    </svg>
                  </Link>
                )}
              </div>
            </div>
            {/* TODO:修改成X animate */}
          </div>
        </MaxWidthWrapper>
        <Menubar linkMap={linkMap} user={user} />
      </header>
    </div>
  );
};

export default Navbar;
