import type { UseFetchOptions } from 'nuxt/app';

export async function useAPI<T>(
  url: string | (() => string),
  options?: UseFetchOptions<T>,
) {
  const { data, error } = await useFetch(url, {
    ...options,
    $fetch: useNuxtApp().$api as typeof $fetch,
  });
  if (error.value) throw error.value;
  return data.value as T;
}
