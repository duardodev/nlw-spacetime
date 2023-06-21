'use client';

import { FormEvent } from 'react';
import { useRouter } from 'next/navigation';

import { MediaPicker } from './MediaPicker';
import { api } from '@/lib/api';

import { Camera } from 'lucide-react';
import Cookie from 'js-cookie';

export function NewMemoryForm() {
  const router = useRouter();

  async function handleCreateMemory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const token = Cookie.get('token');
    const formData = new FormData(event.currentTarget);
    const fileToUpload = formData.get('coverUrl');

    let coverUrl = '';

    if (fileToUpload) {
      const uploadFormData = new FormData();
      uploadFormData.set('file', fileToUpload);

      const uploadResponse = await api.post('/upload', uploadFormData);

      coverUrl = uploadResponse.data.fileUrl;
    }

    await api.post(
      '/memories',
      {
        coverUrl,
        content: formData.get('content'),
        isPublic: formData.get('isPublic')
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    router.push('/');
  }

  return (
    <form onSubmit={handleCreateMemory} className="flex flex-1 flex-col gap-2">
      <div className="flex items-center gap-4">
        <label
          htmlFor="media"
          className="text-sm text-gray-200 cursor-pointer flex items-center gap-1.5 hover:text-gray-100"
        >
          <Camera className="h-4 w-4" />
          Anexar mídia
        </label>

        <label
          htmlFor="isPublic"
          className="text-sm text-gray-200 flex items-center gap-1.5 hover:text-gray-100"
        >
          <input
            type="checkbox"
            name="isPublic"
            id="isPublic"
            value="true"
            className="h-4 w-4 bg-gray-700 border-gray-400 text-purple-500 rounded"
          />
          Tornar memória pública
        </label>
      </div>

      <MediaPicker />

      <textarea
        name="content"
        spellCheck={false}
        className="w-full bg-transparent text-lg text-gray-100 leading-relaxed resize-none rounded border-0 p-0 flex-1 placeholder:text-gray-400 focus:ring-0"
        placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre."
      />

      <button
        type="submit"
        className="bg-green-500 text-black text-sm uppercase font-alt leading-none px-5 py-3 rounded-full inline-block self-end hover:bg-green-600 transition-colors"
      >
        Salvar
      </button>
    </form>
  );
}
