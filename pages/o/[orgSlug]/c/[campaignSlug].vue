<template>
  <div
    v-if="colorsLoaded"
    class="w-full flex"
  >
    <basic-classic v-if="campStore.content?.base.template === Template.BASIC_CLASSIC" />
    <basic-modern v-else-if="campStore.content?.base.template === Template.BASIC_MODERN" />
    <easter-field v-else-if="campStore.content?.base.template === Template.EASTER_FIELD" />
    <div v-else-if="campStore.initialized">
      This template has ended
    </div>
    <div v-else>
      <span class="pi pi-spinner pi-spin h-fit w-fit m-4" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { convert } from 'html-to-text';
import { Template, VarRefType, VarType } from '~/models/enums';

definePageMeta({
  layout: 'campaign',
});

const campStore = useCampaignStore();
await campStore.init();
const content = campStore.content;
if (content) {
  // Set SEO meta tags
  const title = campStore.variable('campaign_name', campStore.locale) || campStore.variable('org_name', campStore.locale);
  const description = campStore.variable('description', campStore.locale, VarType.TRANSLATION, VarRefType.CAMPAIGN)
    || campStore.variable('description', campStore.locale, VarType.TRANSLATION, VarRefType.ORG) || '';
  const image = campStore.variable('description', campStore.locale, VarType.IMAGE, VarRefType.CAMPAIGN)
    || campStore.variable('cover', campStore.locale, VarType.IMAGE, VarRefType.ORG)
    || campStore.variable('logo', campStore.locale, VarType.IMAGE, VarRefType.ORG);
  useServerSeoMeta(varsToSeo({
    title,
    description: convert(description),
    image,
  }));
}

const colorsLoaded = ref(false);
onMounted(() => {
  const style = document.documentElement.style;
  content?.variables.filter(v => v.type === VarType.COLOR).forEach((color) => {
    const c = `#${color.value}`;
    style.setProperty(`--t-${color.title.replace(/_/g, '-')}`, c);
    style.setProperty(`--t-${color.title.replace(/_/g, '-')}-dark`, darkenHexColor(c, 0.8));
    style.setProperty(`--t-${color.title.replace(/_/g, '-')}-light`, darkenHexColor(c, 1.2));
    if (color.title === 'button') {
      style.setProperty('--p-primary-500', c);
      style.setProperty('--p-primary-600', darkenHexColor(c, 0.8));
      style.setProperty('--p-primary-700', darkenHexColor(c, 0.7));
      style.setProperty('--p-primary-400', darkenHexColor(c, 1.1));
      style.setProperty('--p-primary-300', darkenHexColor(c, 1.2));
      style.setProperty('--p-primary-200', darkenHexColor(c, 1.3));
      style.setProperty('--p-primary-100', darkenHexColor(c, 1.4));
    }
    else if (color.title === 'background') {
      style.setProperty('--p-button-outlined-primary-hover-background', c);
    }
  });
  colorsLoaded.value = true;
});
</script>

<style>
.p-button-outlined {
  background-color: var(--t-background) !important;
  &:hover {
    background-color: var(--t-background-light) !important;
  }
}
</style>
