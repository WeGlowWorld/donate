<template>
  <div
    v-if="content"
    class="w-full flex flex-col"
  >
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
    <div class="flex flex-col max-w-5xl w-full mx-auto mt-8">
      <div class="flex justify-start items-end text-2xl">
        <div class="flex-1">
          {{ content.campaign.raised.count }} {{ $t('donate.donations') }}
        </div>
        <div class="h-16 w-16 md:h-24 md:w-24 lg:h-32 lg:w-32 mx-auto">
          <img
            class="h-full w-full"
            :src="icon"
          >
        </div>
        <div class="flex-1 text-right">
          <b>{{ content.org.currencySign }}&nbsp;{{ content.campaign.raised.sum }}</b>
          <span
            v-if="content.campaign.goal"
            class="text-4xl"
          >/{{ content.org.currencySign }}&nbsp;{{ content.campaign.goal }}</span>
        </div>
      </div>
      <progress-bar
        v-if="content.campaign.goal"
        :value="progressBar"
        :pt:value:style="{ backgroundColor: 'var(--p-green-600)' }"
      />
    </div>
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
      amount: ref(campaignStore.content?.prices.find(v => v.selected)?.amount || 0),
      campaignStore,
      content: ref(campaignStore.content),
      VarType: VarType,
      VarRefType: VarRefType,
      progressBar: ref(0),
    };
  },
  computed: {
    icon() {
      return this.campaignStore.variable('icon', this.campaignStore.locale, VarType.IMAGE, VarRefType.CAMPAIGN);
    },
  },
  mounted() {
    setTimeout(() => {
      if (this.content && this.content.campaign.goal)
        this.progressBar = Math.round(this.content.campaign.raised.sum / this.content.campaign.goal * 10000) / 100;
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
