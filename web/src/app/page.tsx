import { User } from 'lucide-react';
import Image from 'next/image';

import nlwLogo from '../assets/nlw-spacetime-logo.svg';

export default function Home() {
  return (
    <main className="min-h-screen grid grid-cols-2">
      <div className="px-28 py-16 bg-[url(../assets/bg-stars.svg)] bg-cover border-r border-white/10 flex flex-col items-start justify-between relative overflow-hidden">
        <div className="h-[288px] w-[526px] bg-purple-700 rounded-full absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 opacity-50 blur-full" />
        <div className="w-2 bg-stripes absolute right-2 top-0 bottom-0" />

        <a
          href=""
          className="text-left flex items-center gap-3 hover:text-gray-50 transition-colors"
        >
          <div className="h-10 w-10 bg-gray-400 rounded-full flex items-center justify-center">
            <User className="h-5 w-5 text-gray-500" />
          </div>

          <p className="max-w-[140px] text-sm leading-snug">
            <span className="underline">Crie sua conta</span> e salve suas memórias!
          </p>
        </a>

        <div className="space-y-5">
          <Image src={nlwLogo} alt="NLW Spacetime" />

          <div className="max-w-[420px] space-y-1">
            <h1 className="text-5xl text-gray-50 font-bold leading-tight">Sua cápsula do tempo</h1>
            <p className="text-lg leading-relaxed">
              Colecione momentos marcantes da sua jornada e compartilhe (se quiser) com o mundo!
            </p>
          </div>

          <a
            href=""
            className="bg-green-500 text-black text-sm uppercase font-alt leading-none px-5 py-3 rounded-full inline-block hover:bg-green-600 transition-colors"
          >
            CADASTRAR LEMBRANÇA
          </a>
        </div>

        <div className="text-gray-200 text-sm leading-relaxed">
          Feito com 💜 no NLW da{' '}
          <a
            href="https://rocketseat.com.br"
            target="_blank"
            rel="moreferrer"
            className="underline hover:text-gray-100 transition-colors"
          >
            Rocketseat
          </a>
        </div>
      </div>

      <div className="p-16 bg-[url(../assets/bg-stars.svg)] bg-cover flex flex-col">
        <div className="flex flex-1 items-center justify-center">
          <p className="w-[360px] text-center leading-relaxed">
            Você ainda não registrou nenhuma lembrança, começe a{' '}
            <a href="" className="underline hover:text-gray-50 transition-colors">
              criar agora
            </a>
            !
          </p>
        </div>
      </div>
    </main>
  );
}
