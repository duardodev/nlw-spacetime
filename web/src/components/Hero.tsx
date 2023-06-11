import Image from 'next/image';
import Link from 'next/link';
import nlwLogo from '../assets/nlw-spacetime-logo.svg';

export function Hero() {
  return (
    <div className="space-y-5">
      <Image src={nlwLogo} alt="NLW Spacetime" />

      <div className="max-w-[420px] space-y-1">
        <h1 className="text-5xl text-gray-50 font-bold leading-tight">Sua cápsula do tempo</h1>
        <p className="text-lg leading-relaxed">
          Colecione momentos marcantes da sua jornada e compartilhe (se quiser) com o mundo!
        </p>
      </div>

      <Link
        href="/memories/new"
        className="bg-green-500 text-black text-sm uppercase font-alt leading-none px-5 py-3 rounded-full inline-block hover:bg-green-600 transition-colors"
      >
        CADASTRAR LEMBRANÇA
      </Link>
    </div>
  );
}
