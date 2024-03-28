import { cn } from '@/src/lib/utils';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';
import BackToTopBtn from '../components/BackToTopBtn';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import PageWrap from '../components/PageWrap';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '車欣汽車 CHE-XIN',
  //給別人網址時會看到的描述
  description: '車欣汽車 CHE-XIN',
  icons: {
    icon: '/favicon.icon',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={cn(
          'relative h-full font-sans antialiased bg-[#E0E0E0]',
          inter.className
        )}
      >
        <main className="relative min-h-screen flex flex-col ">
          <PageWrap />
          <Navbar />
          <BackToTopBtn />
          <div className="flex-1 flex-grow ">{children}</div>
          <Footer />
        </main>
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
