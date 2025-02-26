<template>
  <div
    v-if="content"
    class="w-full flex flex-col gap-8"
  >
    <div class="flex flex-col w-full">
      <div class="flex text-xl md:text-2xl justify-center gap-8 md:gap-16">
        <div class="circle">
          <img
            class="h-12 w-12 sm:h-16 sm:w-16 md:h-24 md:w-24 lg:h-32 lg:w-32"
            :src="icon"
          >
          <div class="font-bold">
            {{ content.campaign.raised.count }}
          </div>
        </div>
        <div class="circle">
          <div class="text-center">
            <b>{{ content.org.currencySign }}&nbsp;{{ content.campaign.raised.sum }}</b>
            <span
              v-if="content.campaign.goal"
              class="text-2xl"
            >/{{ content.campaign.goal }}</span>
            <div class="text-[1.125rem]">
              {{ $t('donate.raised') }}
            </div>
          </div>
        </div>
      </div>
      <progress-bar
        v-if="content.campaign.goal"
        class="mt-4"
        :value="progressBar"
        :pt:value:style="{ backgroundColor: 'var(--p-green-600)', maxWidth: '100%' }"
      />
    </div>
    <basic-classic-card :title="$t('donate.title')">
      <div class="px-2 py-4 flex flex-col gap-8">
        <p
          v-if="content.base.certificates"
          class="text-sm"
        >
          {{ $t('donate.fiscal') }}
        </p>
        <div class="flex flex-col gap-4">
          <div class="flex flex-wrap gap-2">
            <prime-button
              v-for="price of content.prices"
              :key="price.amount"
              :variant="amount === price.amount ? undefined : 'outlined'"
              :style="[
                amount === price.amount
                  ? 'border: 1px solid var(--t-button);'
                  : 'border: 1px solid var(--t-button); background-color: var(--t-button-text) !important;',
              ]"
              size="large"
              class="flex-1 min-w-48"
              @click="amount = price.amount"
            >
              <b>{{ content.org.currencySign }}&nbsp;{{ price.amount }}</b>{{ campaignStore.variable('price', $i18n.locale, VarType.TRANSLATION, VarRefType.PRICE, price.id) }}
            </prime-button>
          </div>
          <ifta-label>
            <input-number
              v-model="amount"
              :min="5"
              :max="9999"
              fluid
              :locale="$i18n.locale"
              :invalid="amount === null"
              mode="currency"
              :currency="content.org.currency"
            />
            <label for="in_label">{{ $t('donate.chooseAmount') }}</label>
          </ifta-label>
          <prime-button
            class="mt-4 w-64 ml-auto"
            :label="$t('donate.next')"
            raised
            @click="toDonate"
          />
        </div>
      </div>
    </basic-classic-card>
  </div>
</template>

<script lang="ts">
import { Button as PrimeButton } from 'primevue';
import { VarType, VarRefType } from '~/models/enums';

export default defineComponent({
  name: 'BasicModernDonate',
  components: {
    PrimeButton,
  },
  setup() {
    const campaignStore = useCampaignStore();
    return {
      amount: ref(campaignStore.content?.prices.find(v => v.selected)?.amount || campaignStore.content?.prices[0]?.amount || 0),
      campaignStore,
      content: ref(campaignStore.content),
      VarType: VarType,
      VarRefType: VarRefType,
      progressBar: ref(0),
    };
  },
  computed: {
    icon() {
      return this.campaignStore.variable('icon', this.campaignStore.locale, VarType.IMAGE);
    },
  },
  mounted() {
    setTimeout(() => {
      if (this.content && this.content.campaign.goal)
        this.progressBar = Math.round(this.content.campaign.raised.sum / this.content.campaign.goal * 100 * 100) / 100;
    }, 200);
  },
  methods: {
    toDonate() {
      if (this.amount === null) {
        return;
      }
      this.$router.push({
        path: `/o/${this.$route.params.orgSlug}/donate`,
        query: {
          amount: this.amount,
          slug: this.$route.params.campaignSlug,
        },
      });
    },
  },
});
</script>

<style scoped>
.circle {
  border-color: var(--t-title);
  background-color: var(--t-card);
  color: var(--t-card-text);
  @apply h-32 w-32 sm:h-48 sm:w-48 rounded-full shadow-xl gap-0 justify-center items-center flex flex-col border-2;
}
</style>
