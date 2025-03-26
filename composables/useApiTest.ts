import type { AsyncDataOptions } from '#app';

export async function useApiTest<T>(
  key: string, // Unique key for the cache
  url: string | (() => string),
  options?: AsyncDataOptions<T>,
) {
  const nuxtApp = useNuxtApp();
  const { data, error } = await nuxtApp.runWithContext(() => useAsyncData<T>(key, () => useNuxtApp().$api<T>(typeof url === 'function' ? url() : url), options));
  if (error.value) throw error.value;
  return data.value as T;
}
