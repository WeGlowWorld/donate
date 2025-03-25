<template>
  <div>
    {{ content }}
  </div>
</template>

<script lang="ts">
import type { Locale } from '~/models/enums';

export default defineComponent({
  async setup() {
    const campStore = useCampaignStore();
    const { data: content } = await useAsyncData(async () => {
      const content = await campStore.init();
      useSeoMeta({
        title: content?.variables.find(v => v.title === 'campaign_name')?.value || 'Wrong Title',
        description: content?.variables.find(v => v.title === 'description')?.value || 'Wrong Title',
      });
    });
    return {
      content,
      campStore: ref(campStore),
    };
  },
  async mounted() {
    try {
      if (!this.campStore.content?.org.locales.includes(this.$i18n.locale as Locale))
        this.$i18n.locale = this.campStore.content?.org.locales[0] as Locale;

      // await useDonationsStore().init('4H3OBDBO', 'feestvarken-vzw');
    }
    catch (err) {
      console.error(err);
      useRouter().push('/404');
    }
  },
});
</script>
