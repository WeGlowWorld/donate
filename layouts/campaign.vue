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
    const route = useRoute();
    if (!route.params.campaignSlug) useRouter().push('/404');
    const campStore = useCampaignStore();

    await useAsyncData('data', () => campStore.init());

    const title = campStore.variable('campaign_name', campStore.locale, VarType.TRANSLATION)
      || campStore.variable('campaign_name', undefined, VarType.TRANSLATION)
      || campStore.variable('org_name', campStore.locale, VarType.TRANSLATION)
      || campStore.variable('org_name', undefined, VarType.TRANSLATION)
      || 'WeGlow Donate';
    const desc
      = convert(campStore.variable('description', campStore.locale, VarType.TRANSLATION)
        || campStore.variable('description', undefined, VarType.TRANSLATION)
        || '',
      );
    const img
      = campStore.variable('description', campStore.locale, VarType.IMAGE)
      || campStore.variable('description', undefined, VarType.IMAGE)
      || campStore.variable('logo', campStore.locale, VarType.IMAGE)
      || campStore.variable('logo', undefined, VarType.IMAGE);

    console.log(title, desc, img);

    useSeoMeta(varsToSeo({
      title,
      description: desc,
      image: img,
    }), {
      tagPosition: 'head',
      tagPriority: 'critical',
    });

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
