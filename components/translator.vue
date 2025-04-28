<template>
  <div
    v-if="locales && locales.length > 1"
    class="bottom-auto"
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
      class="absolute top-[105%] w-full left-0 bg-white flex flex-col gap-1 border-2 border-slate-100 rounded-md z-50 transition-all duration-300"
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
import { Locale, Template } from '~/models/enums';

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
    lang(l: string) {
      return l.split('-')[0].toUpperCase() || 'NL';
    },
  },
});
</script>
