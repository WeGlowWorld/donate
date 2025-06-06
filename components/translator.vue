<template>
  <div
    v-if="locales && locales.length > 1"
    class="bottom-auto"
  >
    <button
      type="button"
      class="bg-slate-100 p-2 rounded-md flex items-center justify-center text-2xl"
      @click="opened = !opened"
    >
      <span
        class="fi"
        :class="`fi-${flag($i18n.locale as Locale)}`"
      />
    </button>
    <div
      v-if="opened"
      class="absolute top-[105%] left-1/2 -translate-x-1/2 bg-white flex flex-col border-2 border-slate-100 rounded-md z-50"
    >
      <div
        v-for="l in locales"
        :key="l"
        class="hover:bg-slate-100 p-2 cursor-pointer flex justify-center text-2xl"
        @click="changeLocale(l)"
      >
        <span
          class="fi"
          :class="`fi-${flag(l)}`"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Locale, Template } from '~/models/enums';
import 'flag-icons/css/flag-icons.min.css';

export default defineComponent({
  name: 'TranslatorComponent',
  props: {
    locales: {
      type: Array as () => Locale[],
      required: true,
    },
  },
  setup() {
    const campStore = useCampaignStore();
    if (!campStore.content?.org.locales.includes(useI18n().locale.value as Locale)) campStore.locale = campStore.content?.org.locales[0] || Locale.NL_BE;
    return {
      campaignStore: ref(campStore),
      Template: Template,
    };
  },
  data() {
    return {
      opened: false,
    };
  },
  watch: {
    '$i18n.locale': {
      immediate: true,
      handler(newVal) {
        this.campaignStore.locale = newVal as Locale;
      },
    },
  },
  methods: {
    changeLocale(l: string) {
      this.$i18n.locale = l as Locale;
      localStorage.setItem('locale', l);
      this.campaignStore.locale = l as Locale;
      this.opened = false;
    },
    flag(l: Locale) {
      switch (l) {
        case Locale.EN_US:
          return 'gb';
        case Locale.FR_FR:
          return 'fr';
        case Locale.NL_BE:
          return 'nl';
        case Locale.RO_RO:
          return 'ro';
      }
      throw new Error(`Unknown locale: ${l}`);
    },
  },
});
</script>
