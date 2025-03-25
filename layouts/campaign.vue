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
import { convert } from 'html-to-text';
import { VarType, type Locale } from '~/models/enums';

export default defineComponent({
  async setup() {
    const campStore = useCampaignStore();
    await useAsyncData('campaign-data', async () => {
      return await campStore.init();
    });
    const route = useRoute();

    const title = campStore.variable('campaign_name', campStore.locale, VarType.TRANSLATION)
      || campStore.variable('org_name', campStore.locale, VarType.TRANSLATION)
      || 'WeGlow Donate';
    const desc = convert(campStore.variable('description', campStore.locale, VarType.TRANSLATION) || '');
    const img = campStore.variable('description', campStore.locale, VarType.IMAGE)
      || campStore.variable('logo', campStore.locale, VarType.IMAGE);

    useSeoMeta(varsToSeo({
      title,
      description: desc,
      image: img,
    }));
    if (!route.params.campaignSlug) useRouter().push('/404');
    return {
      campStore: ref(campStore),
    };
  },
  async mounted() {
    try {
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
