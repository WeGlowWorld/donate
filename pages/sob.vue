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
    <div class="candles-container w-[calc(100%-4rem)] h-[calc(100%-4rem)] absolute bottom-8 left-8 text-white text-3xl">
      <div
        v-for="don in donations"
        :key="don.location[0]"
        class="absolute w-32 flex items-center justify-center flex-col transition-all duration-1000"
        :style="{
          left: don.animated ? `${don.location[0]}%` : '50%',
          top: don.animated ? `${don.location[1]}%` : '50%',
          opacity: don.animated && don.show ? '1' : '0',
          translate: 'translate(-50%, -50%)',
        }"
      >
        <img
          src="/assets/img/sob-flame.svg"
          class="w-full h-full object-contain"
          alt="Candle Flame"
        >
        <span
          class="candle-text"
          style="text-shadow: 0px 1px 0px rgb(0 0 0 / 0.075);"
        >{{ don.name }}</span>
      </div>
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
        updatedAt: string;
        location: [number, number];
        animated: boolean;
        show: boolean;
      }[],
      count: 0,
      sum: 0,
      lastSuccess: 0,
    };
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
      if (this.donations.length > 10) {
        const firstShow = this.donations.findIndex(v => v.show);
        const next = this.donations[firstShow + 10];
        if (next) {
          this.donations[firstShow].show = false;
          next.show = true;

          setTimeout(() => {
            next.animated = true;
          }, 100);
        }
      }
      else {
        const next = this.donations[this.donations.length - 1];
        if (next) {
          next.show = true;
          setTimeout(() => {
            next.animated = true;
          }, 100);
        }
      }
      if (this.donations.length === 0 || this.donations[this.donations.length - 1].show) {
        this.fetchDonations();
      }
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
      // useRoute().query.last = counterData.donations[counterData.donations.length - 1]?.updatedAt;
      this.donations.push(...counterData.donations.map(v => ({
        ...v,
        location: this.chooseLocation(),
        animated: false,
        show: false,
      })));
      this.count = counterData.count;
      this.sum = counterData.sum;
    },
    chooseLocation(): [number, number] {
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
