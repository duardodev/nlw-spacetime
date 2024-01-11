import { EmptyMemories } from '@/components/EmptyMemories';
import { api } from '@/lib/api';
import { cookies } from 'next/headers';

import dayjs from 'dayjs';
import ptBr from 'dayjs/locale/pt-br';
import { Memory } from '@/components/Memory';

dayjs.locale(ptBr);

export interface MemoryType {
  id: string;
  coverUrl: string;
  excerpt: string;
  createdAt: string;
}

export default async function Home() {
  const isAuthenticated = Boolean(cookies().get('token'));

  if (!isAuthenticated) {
    return <EmptyMemories />;
  }

  const token = cookies().get('token')?.value;
  const response = await api.get('/memories', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const memories: MemoryType[] = response.data;

  if (memories.length === 0) {
    return <EmptyMemories />;
  }

  return (
    <div className="p-8 flex flex-col gap-10">
      {memories.map(memory => {
        return <Memory memory={memory} />;
      })}
    </div>
  );
}
