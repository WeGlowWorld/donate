<template>
  <link
    rel="preconnect"
    href="https://fonts.googleapis.com"
  >
  <link
    rel="preconnect"
    href="https://fonts.gstatic.com"
  >
  <link
    href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Titillium+Web:ital,wght@0,200;0,300;0,400;0,600;0,700;0,900;1,200;1,300;1,400;1,600;1,700&display=swap"
    rel="stylesheet"
  >
  <NuxtLayout v-if="mounted || $route.path === '/testing'">
    <Toast position="bottom-center" />
    <NuxtPage />
  </NuxtLayout>
</template>

<script lang="ts">
import { useColorMode } from '@vueuse/core';
import 'primeicons/primeicons.css';
import { Locale } from './models/enums';

const LS_LOCALE = 'locale';

export default defineComponent({
  setup() {
    const colorMode = useColorMode();
    colorMode.value = 'light';
    const i18n = useI18n();
    const route = useRoute();
    if (route.query.share_lang) i18n.setLocale(route.query.share_lang as string);
    return {
      i18n: ref(i18n),
      router: ref(useRouter()),
    };
  },
  data() {
    return {
      mounted: true,
    };
  },
  watch: {
    'i18n.locale': {
      immediate: true,
      handler(newLocale) {
        if (import.meta.client) {
          this.router.replace({
            query: {
              ...this.$route.query,
              share_lang: newLocale,
            },
          });
          localStorage.setItem(LS_LOCALE, newLocale);
        }
      },
    },
  },
  async mounted() {
    let locale = localStorage.getItem(LS_LOCALE);
    if (!locale) {
      const navLocale = navigator.language;
      if (navLocale) {
        const baseLanguage = navLocale.split('-')[0]; // Get the base language, e.g., "en"
        // Match against available locales
        const matchingLocale = Object.values(Locale).find(locale =>
          locale.toLowerCase().startsWith(baseLanguage),
        );
        if (matchingLocale) {
          locale = matchingLocale;
        }
      }
    }
    if (!locale) locale = Locale.NL_BE;
    localStorage.setItem(LS_LOCALE, locale);
    this.$i18n.locale = locale;
    this.mounted = true;
  },
});
</script>

<style>
:root {
  font-family: 'Titillium Web';
  color-scheme: light !important;
}
input {
  background-color: white !important;
  color: black !important;
  border-color: var(--p-button-outlined-primary-border-color) !important;
}
.p-select {
  background-color: white !important;
  color: black !important;
  border-color: var(--p-button-outlined-primary-border-color) !important;
}
</style>
