<template>
  <div class="min-h-screen w-screen overflow-x-hidden flex">
    <slot v-if="campStore.initialized" />
    <translator
      v-if="campStore.content"
      :locales="campStore.content.org.locales"
    />
  </div>
</template>

<script lang="ts">
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
      await useDonationsStore().init(this.$route.params.campaignSlug as string, this.$route.params.orgSlug as string);
    }
    catch (err) {
      console.error(err);
      useRouter().push('/404');
    }
  },
});
</script>
