<!-- eslint-disable vue/no-v-html -->
<template>
  <basic-classic-card
    v-if="extra"
    :title="$t('campaign.extra')"
  >
    <div
      class="p-2 text-justify"
      v-html="extra"
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
    extra() {
      return this.campaignStore.variable('extra', this.campaignStore.locale, VarType.TRANSLATION, VarRefType.CAMPAIGN);
    },
  },
});
</script>
