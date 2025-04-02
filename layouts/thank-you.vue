<template>
  <div>
    <slot />
  </div>
</template>

<script lang="ts">
export default defineComponent({
  setup() {
    return {
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
});
</script>
