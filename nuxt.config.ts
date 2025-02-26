import Lara from '@primevue/themes/lara';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt',
    '@nuxt/eslint',
    '@nuxtjs/i18n',
    '@nuxtjs/tailwindcss',
    '@primevue/nuxt-module',
  ],
  ssr: true,
  app: {
    head: {
      link: [{
        rel: 'icon',
        type: 'image/x-icon',
        href: '/img/weglow-white.svg',
      }],
    },
  },
  runtimeConfig: {
    public: {
      apiUrl: process.env.API_URL,
      // apiUrl: 'https://weglow-backend.azurewebsites.net/api',
    },
  },
  compatibilityDate: '2025-01-12',
  nitro: {
    preset: 'azure',
  },
  eslint: {
    config: {
      stylistic: {
        indent: 2,
        commaDangle: 'always-multiline',
        quotes: 'single',
        semi: true,
      },
    },
  },
  i18n: {
    vueI18n: './i18n.config.ts',
  },
  primevue: {
    options: {
      theme: {
        preset: Lara,
      },
    },
  },
  tailwindcss: {
    config: {
      darkMode: ['selector', '[data-mode="dark-fake"]'],
    },
  },
});
