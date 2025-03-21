<template>
  <div class="donate-div">
    <div class="flex flex-col items-center justify-center h-full max-w-screen-lg mx-auto gap-8">
      <div class="text-center">
        <h1 class="text-4xl font-bold">
          {{ $t('campaign.donate') }}
        </h1>
        <span
          class="pi pi-angle-down"
          style="font-size: 2rem;"
        />
      </div>
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
          <span> {{ campaign.org.currencySign }} {{ price.amount }} </span>
        </button>
      </div>
      <Button
        :disabled="amount === null"
        class="ml-auto bg-[var(--t-button)] text-[var(--t-button-text)] hover:bg-[var(--t-button-dark)]"
        size="large"
        raised
        as="router-link"
        :to="{ path: `/o/${$route.params.orgSlug}/donate`, query: { amount: amount, slug: $route.params.campaignSlug, noLocation: '1' } }"
        :label="$t('campaign.donate')"
      />
    </div>
  </div>
</template>

<script lang="ts">
import type { Content } from '~/models/content';
import { VarRefType, VarType } from '~/models/enums';

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
        icon: this.campaign.variables.find(v => v.title === `price_${i + 1}` && v.locale === this.campaignStore.locale)?.value,
        text: this.campaign.variables.find(v => v.refId === p.id && v.title === 'price' && v.locale === this.campaignStore.locale)?.value,
      }));
    },
    selectedPrice() {
      const prices = this.campaign.prices.map(v => v.amount).sort((a, b) => a - b);
      for (let i = 0; i < prices.length; i++) {
        if (prices[i] >= this.amount) return prices[i];
      }
      return prices[0];
    },
    btnColor() {
      return {
        bg: this.campaign.variables.find(v => v.title === 'button')?.value,
        text: this.campaign.variables.find(v => v.title === 'button_text')?.value,
      };
    },
  },
});
</script>

<style scoped>
.donate-div {
  top: calc(100vh - 6rem);
  background-color: var(--t-background);
  color: var(--t-background-text);
  @apply relative z-10 min-h-96 w-screen p-4 shadow-[rgb(0,0,15,0.5)_0px_0px_16px_0px] !important;
}
.donate-div .description {
  background-color: inherit !important;
}
</style>
