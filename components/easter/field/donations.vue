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
        { coords: [10.3, 57.2], amount: 93, name: 'DT Grove', description: 'A breathtaking location with ancient trees.' },
        { coords: [92.1, 4.9], amount: 14, name: 'FL Cliffs', description: 'A hidden location with crystal-clear water.' },
        { coords: [39.7, 95.5], amount: 68, name: 'XO Peak', description: 'A mysterious location with a cascading waterfall.' },
        { coords: [29.9, 31.4], amount: 20, name: 'CW Lake', description: 'A stunning location with rolling hills.' },
        { coords: [56.7, 64.8], amount: 5, name: 'NZ Falls', description: 'A remote location with ancient trees.' },
        { coords: [23.4, 82.6], amount: 87, name: 'LM Island', description: 'A lush location with white sand beaches.' },
        { coords: [41.0, 25.3], amount: 44, name: 'KX Ridge', description: 'A hidden location with a cascading waterfall.' },
        { coords: [15.6, 3.1], amount: 92, name: 'QV Valley', description: 'A secluded location with shifting sands.' },
        { coords: [67.2, 90.9], amount: 17, name: 'ZU Point', description: 'A breathtaking location with a hidden cave.' },
        { coords: [82.4, 58.7], amount: 38, name: 'YW Desert', description: 'A mysterious location with towering cliffs.' },
        { coords: [45.7, 67.3], amount: 39, name: 'Sirius Peak', description: 'Famous for its breathtaking scenery.' },
        { coords: [91.2, 12.6], amount: 84, name: 'Aether Island', description: 'A place shrouded in mystery.' },
        { coords: [77.5, 56.4], amount: 22, name: 'Phoenix Grove', description: 'A hidden gem among the landscapes.' },
        { coords: [14.8, 89.9], amount: 76, name: 'Polaris Valley', description: 'A tranquil retreat.' },
        { coords: [6.3, 48.2], amount: 33, name: 'Orion Cliffs', description: 'A land of legends and myths.' },
        { coords: [52.6, 31.1], amount: 15, name: 'Nebula Desert', description: 'A challenging destination for adventurers.' },
        { coords: [62.8, 94.4], amount: 47, name: 'Lyra Falls', description: 'Known for its stunning sunsets.' },
        { coords: [27.3, 72.5], amount: 65, name: 'Draco Cove', description: 'An untouched paradise.' },
        { coords: [81.9, 29.7], amount: 90, name: 'Andromeda Ridge', description: 'Home to rare wildlife.' },
        { coords: [36.5, 10.2], amount: 51, name: 'Pegasus Lake', description: 'A location of great historical significance.' },
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
