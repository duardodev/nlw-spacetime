'use client';

import { clearCachesByServerAction } from '@/actions';
import { Trash2 } from 'lucide-react';
import { api } from '@/lib/api';
import Cookie from 'js-cookie';

interface RemoveMemoryProps {
  id: string;
}

export function RemoveMemory({ id }: RemoveMemoryProps) {
  const token = Cookie.get('token');

  async function handleRemoveMemory() {
    console.log(id);

    await api.delete(`/memories/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    clearCachesByServerAction('/');
  }

  return (
    <button
      onClick={handleRemoveMemory}
      className="text-gray-200 hover:text-red-500 transition-colors"
    >
      <Trash2 size={18} />
    </button>
  );
}
