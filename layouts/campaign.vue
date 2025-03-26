<template>
  <div class="min-h-dvh overflow-x-hidden">
    <slot />
    <translator :locales="campStore.content?.org.locales || [Locale.NL_BE]" />
  </div>
</template>

<script lang="ts">
import { Locale } from '~/models/enums';

export default defineComponent({
  async setup() {
    const route = useRoute();
    if (!route.params.campaignSlug) useRouter().push('/404');
    return {
      campStore: ref(useCampaignStore()),
      Locale: Locale,
    };
  },
});
</script>
