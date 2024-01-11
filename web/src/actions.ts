'use server';

import { revalidatePath } from 'next/cache';

export async function clearCachesByServerAction(path: string) {
  revalidatePath(path);
}
