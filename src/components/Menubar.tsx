'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { cn } from '../lib/utils';
import { User } from '../payload-type';
import { useOnClickOutside } from './hooks/useOnClick';
import SignOutIcon from './SignOutIcon';

interface linkMapProps {
  linkMap: {
    name: string;
    href: string;
  }[];
  user: User | null;
}

const Menubar = ({ linkMap, user }: linkMapProps) => {
  const [isOpen, setIsOpen] = useState<string | null>(null);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement | null>(null);
  useOnClickOutside(menuRef, () => setIsOpen('Close'));

  useEffect(() => {
    if (isOpen === 'Open' || isOpen === null) return;
    const timer = setTimeout(() => {
      setIsOpen(null);
    }, 500);

    return () => clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    setIsOpen('Close');
  }, [pathname]);

  return (
    <>
      {isOpen === 'Open' ? (
        <div className="fixed top-12 md:hidden" ref={menuRef}>
          <div
            className={cn('w-screen h-screen bg-zinc-100 p-4', {
              'animate-accordion-left origin-right flex flex-col':
                isOpen === 'Open',
            })}
          >
            {/* mobile menuItem */}
            <div
              className={'opacity-0 flex flex-col space-y-4 animate-show-text'}
            >
              {linkMap.map((link, i) => (
                <Link
                  href={link.href}
                  key={i}
                  className="relative p-4 rounded-sm cursor-pointer opacity-1 translate-x-0 before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0  before:hover:inset-0 before:hover:bg-black before:transition-all before:ease-in-out before:duration-300 before:bg-black before:right-[100%] before:-z-10 hover:text-white"
                >
                  <h3 className="text-xl font-extrabold">{link.name} </h3>
                </Link>
              ))}
            </div>
            <div className="flex md:hidden md:justify-center md:items-center self-end mt-20 mr-8 opacity-0 animate-show-text">
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
        </div>
      ) : (
        <div className="fixed top-12 md:hidden">
          <div
            className={cn('w-screen h-screen bg-zinc-100 p-4', {
              'animate-accordion-right origin-right': isOpen === 'Close',
              hidden: isOpen === null,
            })}
          >
            {/* mobile menuItem */}
            <div
              className={
                'opacity-1 flex flex-col space-y-4 animate-close-content '
              }
            ></div>
          </div>
        </div>
      )}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 flex ml-auto mr-2 md:hidden">
        {isOpen === 'Open' ? (
          <div
            className="flex h-8 w-8 items-center justify-center fade-in-0 animate-in cursor-pointer"
            onClick={() => setIsOpen('Close')}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-x"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </div>
        ) : (
          <button
            className="flex flex-col items-center justify-center group w-8 h-8 animate-in fade-in-0"
            onClick={() => setIsOpen('Open')}
          >
            <div
              className="inset-0 w-6 h-0.5 rounded bg-gray-500 transition duration-300 group-hover:translate-x-1
                "
            />
            <div className="inset-0 w-6 h-0.5 mt-1 rounded bg-gray-500 transition duration-100 " />
            <div className="inset-0 w-6 h-0.5 mt-1 rounded bg-gray-500 transition duration-300   group-hover:-translate-x-1 " />
          </button>
        )}
      </div>
    </>
  );
};

export default Menubar;
