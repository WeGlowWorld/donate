<template>
  <div
    id="basic-classic"
    class="flex-1 flex flex-col"
  >
    <basic-header />
    <div
      id="content"
      class="flex flex-col mx-auto w-full gap-8 xl:grid grid-cols-3 max-w-[75rem] py-16 px-4"
    >
      <basic-classic-description class="mx-auto xl:mx-0 col-span-3" />
      <basic-classic-donate class="mx-auto xl:mx-0 col-span-3" />
      <basic-classic-map class="col-span-2" />
      <basic-classic-messages />
      <basic-classic-links class="col-span-3" />
    </div>
    <basic-footer />
  </div>
</template>

<script lang="ts">
import { Locale, VarRefType, VarType } from '~/models/enums';

export default defineComponent({
  name: 'BasicClassic',
  setup() {
    const campaignStore = useCampaignStore();
    const i18n = useI18n();
    const route = useRoute();
    const locale = (route.params.locale || i18n.locale.value || Locale.NL_BE) as Locale;
    const [title, description, image] = [
      campaignStore.variable('campaign_name', locale, VarType.TRANSLATION, VarRefType.CAMPAIGN),
      campaignStore.variable('description', locale, VarType.TRANSLATION, VarRefType.CAMPAIGN),
      campaignStore.variable('description', locale, VarType.IMAGE, VarRefType.CAMPAIGN),
    ];
    useServerSeoMeta({
      title,
      description: description,
      contentType: 'text/html; charset=utf-8',
      robots: 'index, follow',

      ogTitle: title,
      ogDescription: description,
      ogImage: image,
      ogImageAlt: title,
      ogLocale: locale || i18n.locale || Locale.NL_BE,
      ogUrl: `https://donate.weglow.world/o/${route.params.orgSlug}/c/${route.params.campaignSlug}`,
      ogType: 'website',
      twitterCard: 'summary_large_image',
      twitterTitle: title,
      twitterDescription: description,
      twitterImage: image,
      viewport: 'width=device-width, initial-scale=1',
      charset: 'utf-8',
      author: 'WeGlow',
    });
  },
});
</script>

<style scoped>
#basic-classic {
  background-color: var(--t-background);
  color: var(--t-text);
}
</style>
