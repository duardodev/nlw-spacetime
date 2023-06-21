import Link from 'next/link';

import { NewMemoryForm } from '@/components/NewMemoryForm';
import { ChevronLeft } from 'lucide-react';

export default function NewMemory() {
  return (
    <div className="p-16 flex flex-1 flex-col gap-4">
      <Link href="/" className="text-sm text-gray-200 flex items-center gap-1 hover:text-gray-100">
        <ChevronLeft className="h-4 w-4" />
        voltar à timeline
      </Link>

      <NewMemoryForm />
    </div>
  );
}
