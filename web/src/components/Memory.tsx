import Image from 'next/image';
import Link from 'next/link';

import dayjs from 'dayjs';
import { MemoryType } from '@/app/page';
import { ArrowRight } from 'lucide-react';
import { RemoveMemory } from './RemoveMemory';

interface MemoryProps {
  memory: MemoryType;
}

export function Memory({ memory }: MemoryProps) {
  return (
    <div key={memory.id} className="space-y-4">
      <div className="flex items-center justify-between">
        <time className="text-gray-100 text-sm -ml-8 flex items-center gap-2 before:h-px before:w-5 before:bg-gray-50">
          {dayjs(memory.createdAt).format('D[ de ]MMM[, ]YYYY')}
        </time>

        <RemoveMemory id={memory.id} />
      </div>

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
}
