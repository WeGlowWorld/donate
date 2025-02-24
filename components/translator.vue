<template>
  <div
    v-if="locales && locales.length > 1"
    class="fixed bottom-4 right-4"
  >
    <Button
      type="button"
      severity="secondary"
      class="h-full w-16 p-1"
      @click="opened = !opened"
    >
      <span class="text-nowrap">{{ lang($i18n.locale) }}</span>
    </Button>
    <div
      v-if="opened"
      class="absolute bottom-[105%] w-full left-0 bg-white flex flex-col gap-1 border-2 border-slate-100 rounded-md z-50 transition-all duration-300"
    >
      <div
        v-for="l in locales"
        :key="l"
        class="hover:bg-slate-100 p-2 cursor-pointer flex justify-center"
        @click="changeLocale(l)"
      >
        <span>{{ lang(l) }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { Locale } from '~/models/enums';

export default defineComponent({
  name: 'TranslatorComponent',
  props: {
    locales: {
      type: Array as () => Locale[],
      required: true,
    },
  },
  data() {
    return {
      opened: false,
    };
  },
  methods: {
    changeLocale(l: string) {
      this.$i18n.locale = l as Locale;
      localStorage.setItem('locale', l);
      this.opened = false;
    },
    lang(l: string) {
      return l.split('-')[0].toUpperCase() || 'NL';
    },
  },
});
</script>
