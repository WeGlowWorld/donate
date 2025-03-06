export default defineNuxtPlugin(() => {
  const baseURL = useRuntimeConfig().public.apiUrl;
  if (!baseURL) throw new Error('Base URL not provided in runtime config');

  const api = $fetch.create({
    baseURL,
    // async onResponseError({ response }) {
    //   if (response.status === 401) {
    //     await nuxtApp.runWithContext(() => navigateTo('/login'));
    //   }
    // },
  });

  // Expose to useNuxtApp().$api
  return {
    provide: {
      api,
    },
  };
});
