<template>
  <div class="donate-div">
    <div class="flex flex-col items-center justify-center h-full max-w-screen-lg mx-auto gap-8">
      <button
        class="text-center"
        @click="donateClick"
      >
        <h1 class="text-4xl font-bold">
          {{ $t('campaign.donate') }}
        </h1>
        <span
          class="pi pi-angle-down"
          style="font-size: 2rem;"
        />
      </button>
      <div
        class="description"
        v-html="description"
      />
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-2 w-full">
        <button
          v-for="price in prices"
          :key="price.icon"
          class="flex flex-col font-bold items-center justify-center gap-2 w-full py-4 shadow-md hover:-translate-y-1 duration-150 rounded-md"
          :style="price.amount === selectedPrice ? {
            backgroundColor: `#${btnColor.bg}`,
            color: `#${btnColor.text}`,
            border: 'none',
          } : {
            backgroundColor: `#${btnColor.text}`,
            color: `#${btnColor.bg}`,
            border: `1px solid #${btnColor.bg}`,
          }"
          @click="amount = price.amount"
        >
          <img
            :src="price.icon"
            alt="icon"
            class="h-32 w-32 object-contain"
          >
          <span class="font-bold"> {{ campaign.org.currencySign }} {{ price.amount }} </span>
          <span> {{ price.text }} </span>
        </button>
      </div>
      <ifta-label class="w-full">
        <input-number
          v-model="amount"
          :max="9999"
          fluid
          :locale="$i18n.locale"
          :invalid="amount === null"
          mode="currency"
          :currency="campaignStore.content?.org.currency"
        />
        <label for="in_label">{{ $t('donate.chooseAmount') }}</label>
      </ifta-label>
      <Button
        id="donate-btn"
        :disabled="amount === null"
        class="ml-auto bg-[var(--t-button)] text-[var(--t-button-text)] hover:bg-[var(--t-button-dark)]"
        size="large"
        raised
        :as="specialForm ? 'a' : 'router-link'"
        :to="{ path: `/o/${$route.params.orgSlug}/donate`, query: { amount: amount, slug: $route.params.campaignSlug, noLocation: null } }"
        :href="specialForm"
        :label="$t('campaign.donate')"
      />
    </div>
  </div>
</template>

<script lang="ts">
import type { Content } from '~/models/content';
import { Locale, VarRefType, VarType } from '~/models/enums';

export default defineComponent({
  name: 'EasterFieldDonate',
  setup() {
    const campaignStore = useCampaignStore();
    return {
      campaign: ref(campaignStore.content as Content),
      campaignStore: ref(campaignStore),
      amount: ref(campaignStore.content?.prices.find(p => p.selected)?.amount || campaignStore.content?.prices[0].amount || 0),
    };
  },
  computed: {
    description() {
      return this.campaignStore.variable('description', this.campaignStore.locale, VarType.TRANSLATION, VarRefType.CAMPAIGN);
    },
    prices() {
      return this.campaign.prices.map((p, i) => ({
        amount: p.amount,
        icon: this.campaignStore.variable(`price_${i + 1}`, this.campaignStore.locale),
        text: this.campaignStore.variable('price', this.campaignStore.locale),
      }));
    },
    selectedPrice() {
      const prices = this.campaign.prices.map(v => v.amount).sort((a, b) => a - b);
      for (let i = prices.length - 1; i >= 0; i--) {
        if (this.amount >= prices[i]) return prices[i];
      }
      return prices[0];
    },
    btnColor() {
      return {
        bg: this.campaign.variables.find(v => v.title === 'button')?.value,
        text: this.campaign.variables.find(v => v.title === 'button_text')?.value,
      };
    },
    specialForm() {
      return this.campaignStore.content?.campaign.specialForm?.replace('{locale}', this.localeToKoalect(this.campaignStore.locale));
    },
  },
  methods: {
    localeToKoalect(locale: Locale) {
      switch (locale) {
        case Locale.EN_US:
          return 'en-GB';
        case Locale.FR_FR:
          return 'fr-FR';
        case Locale.NL_BE:
          return 'nl-NL';
      }
    },
    donateClick() {
      const element = document.querySelector('.donate-div');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    },
  },
});
</script>

<style scoped>
.donate-div {
  top: calc(100dvh - 6rem);
  background-color: var(--t-background);
  color: var(--t-background-text);
  @apply absolute z-10 w-screen p-4 shadow-[rgb(0,0,15,0.5)_0px_0px_16px_0px] !important;
}
.donate-div .description {
  background-color: inherit !important;
}
</style>
