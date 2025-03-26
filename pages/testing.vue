<template>
  <div>
    Testing
  </div>
</template>

<script lang="ts" setup>
import { convert } from 'html-to-text';
import { VarRefType, VarType } from '~/models/enums';

const campaignStore = useCampaignStore();
await campaignStore.init();
const content = campaignStore.content;
// const content = await useApiTest<Content>(`content-4H3OBDBO`, '/campaign/content/feestvarken-vzw/4H3OBDBO');
definePageMeta({
  layout: 'testing',
});
if (content) {
  const title = campaignStore.variable('campaign_name', campaignStore.locale) || campaignStore.variable('org_name', campaignStore.locale);
  const description = campaignStore.variable('description', campaignStore.locale, VarType.TRANSLATION, VarRefType.CAMPAIGN)
    || campaignStore.variable('description', campaignStore.locale, VarType.TRANSLATION, VarRefType.ORG) || '';
  const image = campaignStore.variable('description', campaignStore.locale, VarType.IMAGE, VarRefType.CAMPAIGN)
    || campaignStore.variable('cover', campaignStore.locale, VarType.IMAGE, VarRefType.ORG)
    || campaignStore.variable('logo', campaignStore.locale, VarType.IMAGE, VarRefType.ORG);
  useServerSeoMeta(varsToSeo({
    title,
    description: convert(description),
    image,
  }));
}
</script>
