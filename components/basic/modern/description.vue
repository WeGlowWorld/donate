<!-- eslint-disable vue/no-v-html -->
<template>
  <basic-modern-card :title="title || 'Title'">
    <div v-if="tab === 0">
      <div class="min-h-[26rem]">
        <div
          v-if="descriptionImage"
          class="lg:float-right lg:w-1/2 lg:pl-2 lg:pb-2"
        >
          <img
            class="w-full max-h-96 object-contain lg:object-cover lg:rounded-bl-lg"
            :src="descriptionImage"
            alt="Description"
          >
        </div>
        <div
          class="p-2 text-justify h-full"
          v-html="description"
        />
      </div>
      <div class="flex justify-between flex-col md:flex-row items-end p-2 gap-4">
        <div
          v-if="campaignStore.content?.campaign.goal"
          class="w-full"
        >
          <div>
            <span class="text-3xl font-semibold">{{ campaignStore.content.org.currencySign }}{{ campaignStore.content.campaign.raised.sum }}</span>
            <span
              v-if="campaignStore.content.campaign.goal"
              class="text-5xl font-semibold"
            >&nbsp;/&nbsp;{{ campaignStore.content.org.currencySign }}{{ campaignStore.content.campaign.goal }}</span>
          </div>
          <progress-bar
            :value="progressBar"
            :pt:value:style="{ backgroundColor: 'var(--p-green-600)' }"
            :pt:root:style="{ border: '1px solid var(--p-green-800)' }"
            class="w-full"
          />
        </div>
        <Button
          :pt:root:style="{ overflow: 'visible', fontSize: '1.5rem', marginLeft: 'auto' }"
          @click="tab=1"
        >
          {{ $t('campaign.donate') }}
          <div class="absolute -top-8 -right-2">
            <img
              class="h-12 w-12 object-contain"
              :src="iconImage"
            >
          </div>
        </Button>
      </div>
    </div>
    <div
      v-else-if="campaignStore.content"
      class="px-2 py-4 flex flex-col gap-8"
    >
      <p
        v-if="campaignStore.content.base.certificates"
        class="text-sm"
      >
        {{ $t('donate.fiscal') }}
      </p>
      <div class="flex flex-col gap-4">
        <div class="flex flex-wrap gap-2">
          <prime-button
            v-for="price of campaignStore.content.prices"
            :key="price.amount"
            :variant="amount === price.amount ? undefined : 'outlined'"
            size="large"
            class="flex-1 min-w-48"
            @click="amount = price.amount"
          >
            <b>{{ campaignStore.content.org.currencySign }}&nbsp;{{ price.amount }}</b>{{ campaignStore.variable('price', $i18n.locale, VarType.TRANSLATION, VarRefType.PRICE, price.id) }}
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
            :currency="campaignStore.content.org.currency"
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
  </basic-modern-card>
</template>

<script lang="ts">
import { Button as PrimeButton } from 'primevue';
import { VarRefType, VarType } from '~/models/enums';

export default defineComponent({
  name: 'BasicModernDescription',
  components: {
    PrimeButton,
  },
  setup() {
    const campaignStore = useCampaignStore();
    return {
      campaignStore,
      tab: ref(0),
      amount: ref(0),
      progressBar: ref(0),
      VarType: VarType,
      VarRefType: VarRefType,
    };
  },
  computed: {
    title() {
      return this.campaignStore.variable('campaign_name', this.campaignStore.locale, VarType.TRANSLATION, VarRefType.CAMPAIGN);
    },
    descriptionImage() {
      return this.campaignStore.variable('description', this.campaignStore.locale, VarType.IMAGE, VarRefType.CAMPAIGN);
    },
    iconImage() {
      return this.campaignStore.variable('icon', this.campaignStore.locale, VarType.IMAGE, VarRefType.CAMPAIGN);
    },
    description() {
      return this.campaignStore.variable('description', this.campaignStore.locale, VarType.TRANSLATION, VarRefType.CAMPAIGN);
    },
  },
  mounted() {
    setTimeout(() => {
      if (this.campaignStore.content && this.campaignStore.content.campaign.goal)
        this.progressBar = Math.min(Math.round(this.campaignStore.content.campaign.raised.sum / this.campaignStore.content.campaign.goal * 10000) / 100, 100);
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
