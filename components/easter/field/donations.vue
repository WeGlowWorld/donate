<template>
  <div
    v-for="don in donations"
    :key="don.coords.join(',')"
    class="donation absolute z-10 hover:z-20"
    :style="{ top: `calc(${don.coords[1]}% - 3rem)`, left: `${don.coords[0]}%` }"
  >
    <img
      class="donation__img h-12 w-12 object-contain"
      :src="don.icon"
    >
    <div
      class="donation__hover"
      :style="`
        ${don.coords[0] > 50 ? 'right: 100%;' : 'left: 100%;'}
        ${don.coords[1] > 50 ? 'bottom: 0%;' : 'top: 0%;'}
      `"
    >
      <h2 class="font-bold">
        {{ don.name }}
      </h2>
      <span>{{ don.description }}</span>
    </div>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'EasterFieldDonations',
  setup() {
    const campStore = useCampaignStore();
    return {
      campaignStore: ref(),
      donationStore: ref(useDonationsStore()),
      prices: campStore.content?.prices.map((p, i) => ({
        amount: p.amount,
        icon: campStore.variable(`price_${i + 1}`, campStore.locale),
      })) || [],
    };
  },
  computed: {
    donations() {
      return this.donationStore.coordsFull.map((v) => {
        let icon;
        // for (let i = this.prices.length - 1; i >= 0; i--) {
        //   if (v.amount || 0 >= this.prices[i].amount) {
        //     icon = this.prices[i].icon;
        //     console.log(v.amount, i);
        //     break;
        //   }
        // }
        if (v.amount as number < this.prices[0].amount) icon = this.prices[0].icon;
        if (v.amount as number >= this.prices[this.prices.length - 1].amount) icon = this.prices[this.prices.length - 1].icon;
        if (!icon) {
          for (let i = 0; i < this.prices.length - 1; i++) {
            if (v.amount as number >= this.prices[i].amount && v.amount as number < this.prices[i + 1].amount) {
              icon = this.prices[i].icon;
              break;
            }
          }
        }

        return {
          ...v,
          icon,
        };
      }).sort((a, b) => (a.amount || 0) - (b.amount || 0));
    },
  },
});
</script>

<style scoped>
.donation__img {
  -webkit-filter: drop-shadow(0px 0px 2px rgba(0, 0, 0, .5));
  filter: drop-shadow(0px 0px 2px rgba(0, 0, 0, .5));
}

.donation__hover {
  display: none;
  position: absolute;
  @apply bg-white p-2 rounded shadow-md flex-col w-40 md:w-60 text-sm md:text-base;
}

.donation:hover .donation__hover {
  @apply flex !important;
}
</style>
