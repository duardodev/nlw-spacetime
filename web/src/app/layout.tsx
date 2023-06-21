import { Hero } from '@/components/Hero';
import { Profile } from '@/components/Profile';
import { SignIn } from '@/components/SignIn';
import { Copyright } from '@/components/Copyright';

import { Roboto_Flex as Roboto, Bai_Jamjuree as BaiJamjuree } from 'next/font/google';
import { cookies } from 'next/headers';

import './globals.css';

const roboto = Roboto({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-roboto',
  preload: true
});
const baiJamjuree = BaiJamjuree({
  subsets: ['latin'],
  weight: '700',
  variable: '--font-bai-jamjuree',
  preload: true
});

export const metadata = {
  title: 'NLW Spacetime',
  description: 'Uma cápsula do tempo construída com React, Next.js, TailwindCSS e TypeScript.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const isAuthenticated = cookies().has('token');

  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${baiJamjuree.variable} font-sans bg-gray-900 text-gray-100`}
      >
        <main className="min-h-screen grid grid-cols-2">
          <div className="px-28 py-16 bg-[url(../assets/bg-stars.svg)] bg-cover border-r border-white/10 flex flex-col items-start justify-between relative overflow-hidden">
            <div className="h-[288px] w-[526px] bg-purple-700 rounded-full absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 opacity-50 blur-full" />
            <div className="w-2 bg-stripes absolute right-2 top-0 bottom-0" />

            {isAuthenticated ? <Profile /> : <SignIn />}

            <Hero />
            <Copyright />
          </div>

          <div className="bg-[url(../assets/bg-stars.svg)] bg-cover max-h-screen flex flex-col overflow-y-scroll">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
