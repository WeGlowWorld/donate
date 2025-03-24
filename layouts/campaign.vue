<template>
  <div class="min-h-dvh w-screen overflow-x-hidden flex">
    <slot v-if="campStore.initialized" />
    <translator
      v-if="campStore.content"
      :locales="campStore.content.org.locales"
    />
  </div>
</template>

<script lang="ts">
import type { Locale } from '~/models/enums';

export default defineComponent({
  setup() {
    const route = useRoute();
    if (!route.params.campaignSlug) useRouter().push('/404');

    useSeoMeta({ title: 'WeGlow Donate' });

    return {
      campStore: ref(useCampaignStore()),
    };
  },
  async mounted() {
    try {
      await this.campStore.init();
      if (!this.campStore.content?.org.locales.includes(this.$i18n.locale as Locale))
        this.$i18n.locale = this.campStore.content?.org.locales[0] as Locale;

      await useDonationsStore().init(this.$route.params.campaignSlug as string, this.$route.params.orgSlug as string);
    }
    catch (err) {
      console.error(err);
      useRouter().push('/404');
    }
  },
});
</script>
