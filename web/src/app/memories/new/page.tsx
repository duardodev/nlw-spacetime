import Link from 'next/link';
import { Camera, ChevronLeft } from 'lucide-react';

export default function NewMemory() {
  return (
    <div className="flex flex-1 flex-col gap-4">
      <Link href="/" className="text-sm text-gray-200 flex items-center gap-1 hover:text-gray-100">
        <ChevronLeft className="h-4 w-4" />
        voltar à timeline
      </Link>

      <form className="flex flex-1 flex-col gap-2">
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

        <input type="file" id="media" className="invisible h-0 w-0" />

        <textarea
          name="content"
          spellCheck={false}
          className="w-full bg-transparent text-lg text-gray-100 leading-relaxed resize-none rounded border-0 p-0 flex-1 placeholder:text-gray-400 focus:ring-0"
          placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre."
        />
      </form>
    </div>
  );
}
