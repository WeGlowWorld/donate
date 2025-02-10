<!-- eslint-disable vue/no-v-html -->
<template>
  <basic-classic-card :title="title || 'Title'">
    <div
      v-if="descriptionImage"
      class="w-full"
    >
      <img
        class="w-full max-h-96 object-contain"
        :src="descriptionImage"
        alt="Description"
      >
    </div>
    <div
      class="p-2 text-justify"
      v-html="description"
    />
  </basic-classic-card>
</template>

<script lang="ts">
import { VarRefType, VarType } from '~/models/enums';

export default defineComponent({
  name: 'BasicModernDescription',
  setup() {
    const campaignStore = useCampaignStore();
    return {
      campaignStore,
    };
  },
  computed: {
    title() {
      return this.campaignStore.variable('campaign_name', this.campaignStore.locale, VarType.TRANSLATION, VarRefType.CAMPAIGN);
    },
    descriptionImage() {
      return this.campaignStore.variable('description', this.campaignStore.locale, VarType.IMAGE, VarRefType.CAMPAIGN);
    },
    description() {
      return this.campaignStore.variable('description', this.campaignStore.locale, VarType.TRANSLATION, VarRefType.CAMPAIGN);
    },
  },
});
</script>
