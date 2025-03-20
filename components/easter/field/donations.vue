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
        icon: campStore.content?.variables.find(v => v.title === `price_${i + 1}` && v.locale === campStore.locale)?.value,
      })) || [],
    };
  },
  computed: {
    donations() {
      const donations = [
        { coords: [3, 78.9], amount: 5, name: 'Alpha Point', description: 'A mysterious location in the east.' },
        { coords: [88.1, 23.4], amount: 67, name: 'Beta Ridge', description: 'Known for its stunning views.' },
        { coords: [34.7, 56.2], amount: 89, name: 'Gamma Valley', description: 'A lush valley with a hidden cave.' },
        { coords: [90.3, 11.6], amount: 21, name: 'Delta Peak', description: 'One of the highest peaks in the region.' },
        { coords: [48.9, 99.2], amount: 55, name: 'Epsilon Grove', description: 'A dense forest with ancient trees.' },
        { coords: [22.1, 44.3], amount: 74, name: 'Zeta Lake', description: 'A serene lake with crystal-clear water.' },
        { coords: [69.5, 30.8], amount: 33, name: 'Eta Falls', description: 'A breathtaking waterfall hidden in the hills.' },
        { coords: [15.2, 88.7], amount: 91, name: 'Theta Desert', description: 'A vast desert with shifting dunes.' },
        { coords: [59.4, 67.1], amount: 48, name: 'Iota Island', description: 'A secluded island with white sand beaches.' },
        { coords: [77.3, 19.5], amount: 60, name: 'Kappa Cliffs', description: 'Steep cliffs overlooking the ocean.' },
      ];

      return donations.map((v) => {
        let icon;
        if (v.amount < this.prices[0].amount) icon = this.prices[0].icon;
        if (v.amount >= this.prices[this.prices.length - 1].amount) icon = this.prices[this.prices.length - 1].icon;
        if (!icon) {
          for (let i = 0; i < this.prices.length - 1; i++) {
            if (v.amount >= this.prices[i].amount && v.amount < this.prices[i + 1].amount) {
              icon = this.prices[i].icon;
              break;
            }
          }
        }

        return {
          ...v,
          icon,
        };
      });
      // return this.donationStore.coordsFull;
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
  @apply bg-white p-2 rounded shadow-md flex-col w-60;
}

.donation:hover .donation__hover {
  @apply flex !important;
}
</style>
