<template>
  <div v-if="loaded">
    <slot />
  </div>
</template>

<script lang="ts">
import type { Content } from '~/models/content';

export default defineComponent({
  async setup() {
    console.log('layout setup');
    const { data: content } = await useAsyncData('content', () => useAPI<Content>(`/campaign/content/${'feestvarken-vzw'}/${'4H3OBDBO'}`));
    // const { data: content } = await useAsyncData('data', () => useCampaignStore().init());
    useSeoMeta({
      title: content.value?.org.slug,
      description: content.value?.org.currency,
      ogTitle: content.value?.org.slug,
      ogDescription: content.value?.org.currency,
    });
    // console.log(content);
    console.log('layout setup end');

    // return {
    //   content,
    // };
  },
  data() {
    return {
      loaded: false,
    };
  },
  mounted() {
    console.log('layout mounted');
    this.loaded = true;
  },
});
</script>
