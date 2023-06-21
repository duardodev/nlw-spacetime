import Image from 'next/image';
import Link from 'next/link';

import { EmptyMemories } from '@/components/EmptyMemories';
import { api } from '@/lib/api';
import { cookies } from 'next/headers';
import { ArrowRight } from 'lucide-react';

import dayjs from 'dayjs';
import ptBr from 'dayjs/locale/pt-br';

dayjs.locale(ptBr);

interface Memory {
  id: string;
  coverUrl: string;
  excerpt: string;
  createdAt: string;
}

export default async function Home() {
  const isAuthenticated = cookies().has('token');

  if (!isAuthenticated) {
    return <EmptyMemories />;
  }

  const token = cookies().get('token')?.value;
  const response = await api.get('/memories', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const memories: Memory[] = response.data;

  if (memories.length === 0) {
    return <EmptyMemories />;
  }

  return (
    <div className="p-8 flex flex-col gap-10">
      {memories.map(memory => {
        return (
          <div key={memory.id} className="space-y-4">
            <time className="text-gray-100 text-sm -ml-8 flex items-center gap-2 before:h-px before:w-5 before:bg-gray-50">
              {dayjs(memory.createdAt).format('D[ de ]MMM[, ]YYYY')}
            </time>

            <Image
              src={memory.coverUrl}
              width={592}
              height={280}
              alt=""
              className="w-full rounded-lg aspect-video object-cover"
            />

            <p className="text-gray-100 text-lg leading-relaxed">{memory.excerpt}</p>

            <Link
              href={`/memories/${memory.id}`}
              className="text-gray-200 text-sm flex items-center gap-2 hover:text-gray-100"
            >
              Ler mais
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        );
      })}
    </div>
  );
}
