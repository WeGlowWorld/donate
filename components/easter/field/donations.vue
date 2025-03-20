<template>
  <div class="absolute top-0 left-0 h-16 w-48 bg-red-100 z-50">
    Hello
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'EasterFieldDonations',
  setup() {
    return {
      campaignStore: ref(useCampaignStore()),
      donationStore: ref(useDonationsStore()),
    };
  },
  computed: {
    donations() {
      console.log(this.donationStore.coordsFull);
      return this.donationStore.coordsFull;
    },
  },
});
</script>
