<template>
  <div class="w-screen overflow-x-hidden">
    <div
      v-if="orgStore.initialized && orgStore.content"
      class="donate-page min-h-dvh flex flex-col"
    >
      <div class="absolute right-4 top-4">
        <translator :locales="orgStore.content.general.locales" />
      </div>
      <div class="p-4 md:p-8">
        <div class="donate-form max-w-2xl mx-auto w-full h-fit p-4 md:p-8 shadow-lg">
          <!-- <Button @click="useRouter().push(`/o/${route.params.orgSlug}/c/${route.query.campaignSlug}`)" /> -->
          <slot />
        </div>
      </div>
      <basic-footer class="md:-p-16 mt-auto" />
    </div>
  </div>
</template>

<script lang="ts">
import type { Locale } from '~/models/enums';

export default defineComponent({
  setup() {
    const route = useRoute();
    if (!route.params.orgSlug) {
      useRouter().push('/404');
    }
    useSeoMeta({
      title: 'WeGlow Donate',
    });
    return {
      route: ref(route),
      i18n: ref(useI18n()),
      orgStore: ref(useOrgStore()),
    };
  },
  watch: {
    'orgStore.content': {
      handler(newVal) {
        // Set locale
        if (this.orgStore.content && !this.orgStore.content.general.locales.includes(this.i18n.locale as Locale))
          this.i18n.locale = this.orgStore.content.general.locales[0];
        if (newVal.brandIdentity) {
          const style = document.documentElement.style;
          style.setProperty('--d-primary', `#${newVal.brandIdentity.primaryC}`);
          style.setProperty('--d-primary-text', `#${newVal.brandIdentity.primaryTC}`);
          style.setProperty('--d-accent', `#${newVal.brandIdentity.accentC}`);
          style.setProperty('--d-accent-text', `#${newVal.brandIdentity.accentTC}`);
          style.setProperty('--d-background', `#${newVal.brandIdentity.backgroundC}`);
          style.setProperty('--d-background-text', `#${newVal.brandIdentity.backgroundTC}`);

          const c = `#${newVal.brandIdentity.primaryC}`;
          style.setProperty('--p-primary-500', c);
          style.setProperty('--p-primary-600', darkenHexColor(c, 0.8));
          style.setProperty('--p-primary-700', darkenHexColor(c, 0.7));
          style.setProperty('--p-primary-400', darkenHexColor(c, 1.1));
          style.setProperty('--p-primary-300', darkenHexColor(c, 1.2));
          style.setProperty('--p-primary-200', darkenHexColor(c, 1.3));
          style.setProperty('--p-primary-100', darkenHexColor(c, 1.4));
        }
        useSeoMeta({
          title: this.orgStore.variable('org_name'),
        });
      },
      deep: true,
    },
  },
  async mounted() {
    try {
      await useOrgStore().init();
    }
    catch (err) {
      console.error(err);
      useRouter().push('/404');
    }
  },
});
</script>

<style scoped>
.donate-page {
  background-color: var(--d-accent);
}
.donate-form {
  background-color: var(--d-background);
  color: var(--d-background-text);
  @apply rounded-lg
}
label {
  @apply text-xl font-bold col-span-2;
}
</style>
