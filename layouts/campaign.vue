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
    try {
      useCampaignStore();
      useDonationsStore();
    }
    catch (err) {
      console.error(err);
      useRouter().push('/404');
    }

    useSeoMeta({
      title: 'WeGlow pagina',
    });
  },
});
</script>
