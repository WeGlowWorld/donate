<template>
  <div>
    <slot />
  </div>
</template>

<script lang="ts">
export default defineComponent({
  async setup() {
    console.log('layout setup');
    const { data: content } = await useAsyncData('data', () => useCampaignStore().init());
    useSeoMeta({
      title: content.value?.org.slug,
      description: content.value?.org.currency,
      ogTitle: content.value?.org.slug,
      ogDescription: content.value?.org.currency,
    });
    console.log(content);
    console.log('layout setup end');

    return {
      content,
    };
  },
  watch: {
    content: {
      immediate: true,
      deep: true,
      handler() {
        useSeoMeta({
          title: this.content?.org.slug,
          description: this.content?.org.currency,
        });
      },
    },
  },
  mounted() {
    console.log('layout mounted');
  },
});
</script>
