<template>
  <div class="min-h-screen w-screen overflow-x-hidden flex">
    <slot v-if="useCampaignStore().initialized" />
  </div>
</template>

<script lang="ts">
export default defineComponent({
  setup() {
    const route = useRoute();
    if (!route.params.campaignSlug) {
      useRouter().push('/404');
    }

    useSeoMeta({
      title: 'WeGlow pagina',
    });
  },
  async mounted() {
    try {
      useCampaignStore().init();
      useDonationsStore().init(this.$route.params.campaignSlug as string, this.$route.params.orgSlug as string);
    }
    catch (err) {
      console.error(err);
      useRouter().push('/404');
    }
  },
});
</script>
