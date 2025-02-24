<!-- eslint-disable vue/no-v-html -->
<template>
  <basic-classic-card :title="title || 'Title'">
    <div
      v-if="descriptionImage"
      class="md:float-right md:ml-4 md:max-w-[50%]"
    >
      <img
        class="max-h-96 w-full ml-auto"
        :src="descriptionImage"
        alt="Description"
      >
    </div>
    <div
      v-if="description"
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
      const d = this.campaignStore.variable('description', this.campaignStore.locale, VarType.TRANSLATION, VarRefType.CAMPAIGN);
      console.log(d);
      return d;
    },
  },
});
</script>
