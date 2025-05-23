<template>
  <div>
    <div
      ref="easter"
      class="easter"
    >
      <div class="absolute top-4 right-4 z-40 flex gap-2 flex-wrap justify-end flex-row-reverse sm:flex-row">
        <div>
          <translator :locales="availableLocales" />
        </div>
        <!-- <custom-input-select
          ref="searchName"
          v-model="selectedCoord"
          class="w-60"
          :options="filteredOptions"
        /> -->
      </div>

      <img
        :src="logo"
        class="absolute top-4 left-4 h-32 w-32 z-40 object-contain"
      >
      <!-- CPZ -->
      <img
        v-if="$route.params.campaignSlug !== '0J2ADWT5'"
        src="/img/bunny.svg"
        class="bunny bottom-[30%] right-12"
      >
      <div class="w-screen h-screen absolute top-0 left-0 z-10 overflow-hidden">
        <img
          src="/img/bush.svg"
          class="bush"
        >
      </div>
      <img
        src="/img/tree.svg"
        class="tree"
      >
      <div
        class="cloud"
        style="animation: moveClouds 30s linear infinite; top: 2rem;"
      />
      <div
        class="cloud"
        style="animation: moveClouds 20s linear infinite; animation-delay: 5s; top: 3rem;"
      />
      <div
        class="cloud"
        style="animation: moveClouds 40s linear infinite; top: 1rem;"
      />
      <div
        class="cloud"
        style="animation: moveClouds 60s linear infinite; top: 5rem;"
      />
      <template v-if="position !== 'full'">
        <span
          v-if="position !== 'left'"
          class="arrow left-4 pi pi-angle-left"
        />
        <span
          v-if="position !== 'right'"
          class="arrow right-4 pi pi-angle-right"
        />
      </template>
      <div
        class="easter__field"
        :class="`w-[${fieldWidth}]`"
      >
        <easter-field-donations :selected="selectedCoord" />
      </div>
    </div>
    <easter-field-donate />
  </div>
</template>

<script lang="ts">
import type { Locale } from '~/models/enums';
import { VarRefType, VarType } from '~/models/enums';

export default defineComponent({
  name: 'EasterTemplate',
  setup() {
    return {
      easterField: useTemplateRef<HTMLDivElement>('easter'),
      donationStore: ref(useDonationsStore()),
      campaignStore: ref(useCampaignStore()),
    };
  },
  data() {
    return {
      isFocused: false,
      selectedCoord: '',
      position: 'center',
    };
  },
  computed: {
    filteredOptions() {
      return this.donationStore.coordsFull.filter(v => v.name).map(v => ({
        label: v.name as string,
        value: `(${v.coords[0]},${v.coords[1]})`,
      }));
    },
    availableLocales() {
      return this.campaignStore.content?.org.locales || this.$i18n.availableLocales as Locale[];
    },
    fieldWidth() {
      const l = this.donationStore.coordsFull.length;
      switch (true) {
        case l < 100: return '100vw';
        case l < 200: return '200vw';
        case l < 500: return '500vw';
        default: return '500vw';
      }
    },
    logo() {
      return this.campaignStore.variable('logo', this.campaignStore.locale, VarType.IMAGE, VarRefType.ORG);
    },
  },
  mounted() {
    if (!this.easterField) return;
    if (this.fieldWidth === '100vw') this.position = 'full';
    this.easterField.scrollLeft = this.easterField.scrollWidth / 2 - this.easterField.clientWidth / 2;
    this.easterField.addEventListener('scroll', () => {
      if (!this.easterField) return;
      if (this.easterField.scrollLeft < 100) this.position = 'left';
      else if (this.easterField.scrollLeft > this.easterField.scrollWidth - this.easterField.clientWidth - 100) this.position = 'right';
      else this.position = 'center';
    });
  },
});
</script>

<style>
.easter {
  @apply bg-sky-500 h-dvh w-screen fixed flex flex-col justify-end top-0 left-0 overflow-x-scroll;
  background: linear-gradient(to bottom, #87CEEB, #FFFFFF);;
  background-position: cover;
}

.easter__field {
  background: linear-gradient(0deg, rgb(147, 200, 8, 0.7) 0%, rgb(110, 153, 1, 0.7) 100%), url("/img/easter-grass.png");
  background-size: 10%;
  @apply relative h-1/2 mb-24 shadow-[rgba(0,0,15,0.5)_0px_0px_16px_0px];
}

.easter .arrow {
  font-size: 2.5em !important;
  @apply fixed bottom-40 top-1/2 z-40 h-fit w-fit text-white;
}
.cloud {
  position: absolute;
  z-index: -1;
  left: -200px;
  width: 150px;
  height: 80px;
  background: white;
  border-radius: 50px;
  box-shadow: 30px 10px 0px rgba(255, 255, 255, 0.8), 60px 20px 0px rgba(255, 255, 255, 0.6);
}
@keyframes moveClouds {
  from {
    transform: translateX(-200px);
  }
  to {
    transform: translateX(120vw);
  }
}

.bush {
  position: absolute;
  z-index: 2;
  transform: translateY(2rem);
  @apply w-[150vw] sm:min-w-[150vw] md:min-w-[104vw];
  @apply left-[calc(50%-75vw)] md:left-[calc(50%-52vw)];
  @apply bottom-[calc(50%+6rem)] sm:bottom-[calc(50%+5rem)] md:bottom-[calc(50%+4rem)];
  @apply max-w-[100rem]
}

.tree {
  position: absolute;
  height: 40%;
  z-index: 0;
  top: 3%;
  right: 10%;
}

.bunny {
  position: absolute;
  height: 7rem;
  z-index: 3;
  right: 3rem;
  top: 60%;
}
</style>
