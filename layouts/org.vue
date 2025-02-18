<template>
  <div class="w-screen overflow-x-hidden">
    <div
      v-if="orgStore.initialized"
      class="donate-page min-h-screen flex p-4 md:p-16"
    >
      <div class="donate-form max-w-4xl mx-auto w-full h-fit p-4 md:p-8 shadow-lg">
        <!-- <Button @click="useRouter().push(`/o/${route.params.orgSlug}/c/${route.query.campaignSlug}`)" /> -->
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  setup() {
    const route = useRoute();
    if (!route.params.orgSlug) {
      useRouter().push('/404');
    }
    useSeoMeta({
      title: 'WeGlow pagina',
    });
    return {
      route: ref(route),
      orgStore: ref(useOrgStore()),
    };
  },
  watch: {
    'orgStore.content': {
      handler(newVal) {
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
}
label {
  @apply text-xl font-bold col-span-2;
}
</style>
