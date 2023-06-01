import { cookies } from 'next/headers';

import { Copyright } from '@/components/Copyright';
import { EmptyMemories } from '@/components/EmptyMemories';
import { Hero } from '@/components/Hero';
import { SignIn } from '@/components/SignIn';
import { Profile } from '@/components/Profile';

export default function Home() {
  const isAuthenticad = cookies().has('token');

  return (
    <main className="min-h-screen grid grid-cols-2">
      <div className="px-28 py-16 bg-[url(../assets/bg-stars.svg)] bg-cover border-r border-white/10 flex flex-col items-start justify-between relative overflow-hidden">
        <div className="h-[288px] w-[526px] bg-purple-700 rounded-full absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 opacity-50 blur-full" />
        <div className="w-2 bg-stripes absolute right-2 top-0 bottom-0" />

        {isAuthenticad ? <Profile /> : <SignIn />}

        <Hero />
        <Copyright />
      </div>

      <div className="p-16 bg-[url(../assets/bg-stars.svg)] bg-cover flex flex-col">
        <EmptyMemories />
      </div>
    </main>
  );
}
