<template>
  <header class="modern-header h-32 w-full flex justify-center items-center shadow-lg">
    <nuxt-link
      :to="campaignStore.content?.org.website"
      class="p-2"
    >
      <img
        :src="logo"
        alt="Header image"
        class="object-contain h-24 max-w-96"
      >
    </nuxt-link>
  </header>
</template>

<script lang="ts">
import { VarRefType, VarType } from '~/models/enums';

export default defineComponent({
  name: 'BasicModernHeader',
  setup() {
    return {
      campaignStore: ref(useCampaignStore()),
    };
  },
  computed: {
    logo() {
      return this.campaignStore.variable('logo', this.campaignStore.locale, VarType.IMAGE, VarRefType.ORG)
        || this.campaignStore.variable('logo', undefined, VarType.IMAGE, VarRefType.CAMPAIGN);
    },
  },
});
</script>

<style scoped>
.modern-header {
  background-color: var(--t-header);
}
</style>
