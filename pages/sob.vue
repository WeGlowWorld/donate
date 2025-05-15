<template>
  <div
    class="w-screen h-screen relative overflow-hidden"
    style="background-image: linear-gradient(to bottom, #05162C, #AA3E02);"
  >
    <div class="qr-container h-1/4 absolute bottom-0 right-0">
      <img
        src="/assets/img/sob-qr.png"
        class="h-full w-fit object-contain object-right-bottom"
        alt="QR Code"
      >
    </div>
    <div class="center-flame-container h-full w-full absolute flex flex-col items-center justify-around text-white text-7xl font-bold">
      <h1>{{ lang === 'nl' ? 'Steek samen de vlam op!' : 'Allumer la flamme ensemble!' }}</h1>
      <img
        src="https://weglowdashboard.blob.core.windows.net/90f3c146-8b07-47cd-b36f-c0ef19d57bf5/40dac5ba-f915-4a65-a196-7d4599f87097"
        class="h-1/2 w-full object-contain"
        alt="Flame"
      >
      <h1>{{ count }}</h1>
    </div>
    <div class="logo-container h-1/5 absolute">
      <img
        src="/assets/img/sob-logo.svg"
        class="h-full w-fit object-contain object-left-top"
        alt="Logo"
      >
    </div>
    <div class="candles-container w-[calc(100%-4rem)] h-[calc(100%-24rem)] absolute top-48 left-8 text-white text-3xl">
      <template
        v-for="(don, i) in donations"
        :key="`${don.name}-${i}`"
      >
        <div
          v-if="don.show && don.location"
          class="absolute w-32 flex items-center justify-center flex-col transition-all duration-1000"
          :style="{
            left: don.animated ? `${don.location[0]}%` : '50%',
            top: don.animated ? `${don.location[1]}%` : '50%',
            opacity: don.animated && don.show ? '1' : '0',
          }"
        >
          <img
            src="/assets/img/sob-flame.svg"
            class="w-full h-full object-contain"
            alt="Candle Flame"
          >
          <span class="candle-text font-semibold text-justify">
            {{ don.name }}
          </span>
          <span class="candle-text text-sm text-justify w-full">
            {{ don.description }}
          </span>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'Sob',
  data() {
    return {
      lang: 'nl' as 'nl' | 'fr',
      donations: [] as {
        name: string;
        description: string;
        updatedAt: string;
        location?: [number, number];
        animated: boolean;
        show: boolean;
      }[],
      count: 0,
      sum: 0,
      lastSuccess: 0,
    };
  },
  computed: {
    firstIndexOfLastFalseGroup() {
      if (this.donations[this.donations.length - 1]?.show) return -1;
      const end = [...this.donations].reverse().findIndex(item => !item.show);
      if (end === -1) return -1;
      const lastFalseIndex = this.donations.length - 1 - end;
      let start = lastFalseIndex;
      while (start > 0 && !this.donations[start - 1].show) start--;
      return start;
    },
  },
  async mounted() {
    setInterval(() => {
      switch (this.lang) {
        case 'nl':
          this.lang = 'fr';
          break;
        case 'fr':
          this.lang = 'nl';
          break;
      }
    }, 10000);
    setInterval(() => {
      console.log(this.firstIndexOfLastFalseGroup);
      if (this.firstIndexOfLastFalseGroup === -1) {
        this.fetchDonations();
        return;
      }
      if (this.donations.filter(v => v.show).length > 9) {
        const shown = this.donations.find(v => v.show);
        if (shown) {
          shown.show = false;
          shown.animated = false;
        }
      }

      const newDonation = this.donations[this.firstIndexOfLastFalseGroup];
      newDonation.show = true;
      newDonation.location = this.chooseLocation();
      setTimeout(() => {
        newDonation.animated = true;
      }, 100);
    }, 5000);
  },
  methods: {
    async fetchDonations() {
      if (this.lastSuccess !== 0) {
        this.lastSuccess -= 1;
        return;
      };
      const counterData = await useAPI<{
        donations: {
          name: string;
          updatedAt: string;
          description: string;
        }[];
        count: number;
        sum: number;
      }>(`/donation/counter/N56779MO`, {
        query: {
          last: this.donations[this.donations.length - 1]?.updatedAt,
        },
      });
      if (!counterData) return;
      if (counterData.donations.length === 0) {
        this.lastSuccess = 3;
        return;
      }
      useRoute().query.last = counterData.donations[counterData.donations.length - 1]?.updatedAt;
      for (const d of counterData.donations) {
        this.donations.push({
          ...d,
          animated: false,
          show: false,
        });
      }
      this.count = counterData.count || this.count + counterData.donations.length;
    },
    chooseLocation(): [number, number] {
      const minDistance = 20;
      try {
        let randomX = Math.random() * 80;
        if (randomX > 40) randomX += 20;
        const randomY = Math.random() * 100;

        if (randomY < 30) {
          if (randomY < 10) throw new Error();
          if (randomX < 30 || randomX > 70) throw new Error();
        }
        if (randomY > 70) {
          if (randomX > 70 || (randomX > 40 && randomX < 60)) throw new Error();
        }
        if (randomY > 30 && randomY < 70) {
          if (randomX > 40 && randomX < 60) throw new Error();
        }

        // Proximity check to existing candles
        for (const don of this.donations) {
          if (!don.location || !don.show) continue; // Skip if location is not set
          const [x, y] = don.location;
          const dx = randomX - x;
          const dy = randomY - y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < minDistance) throw new Error(); // Too close to another candle
        }

        return [
          randomX,
          randomY,
        ];
      }
      catch {
        return this.chooseLocation();
      }
    },
  },
});
</script>
