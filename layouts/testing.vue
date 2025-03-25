<template>
  <div>
    <slot />
  </div>
</template>

<script lang="ts">
export default defineComponent({
  setup() {
    console.log('layout setup');
    const { data: content } = useAsyncData('data', () => useCampaignStore().init());
    useSeoMeta({
      title: content.value?.org.slug,
      description: content.value?.org.currency,
    });
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
